// app/api/webhooks/btcpay/route.js
import { NextResponse } from "next/server";
import prisma from "../../../../../utils/db";
import logger from "@/utils/logger"; // Importáld a logger-t

export async function POST(req) {
  const body = await req.text();
  let event;
  try {
    event = JSON.parse(body);
  } catch (error) {
    logger.error(`Webhook JSON parse hiba: ${error}`); // console.error helyett
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Például: Ha az invoice státusza "complete", akkor a fizetés sikeres volt
  if (
    event &&
    event.data &&
    event.data.invoice &&
    event.data.invoice.status === "complete"
  ) {
    const invoice = event.data.invoice;
    // A metadata-ban érdemes elhelyezni a rendelés azonosítóját a BTCPay invoice létrehozásakor
    const orderId = invoice.metadata?.orderId;

    if (!orderId) {
      logger.error("Missing orderId in invoice metadata");
      return NextResponse.json(
        { error: "Missing orderId in invoice metadata" },
        { status: 400 }
      );
    }

    const order = await getOrder(parseInt(orderId, 10));
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Ha az order már PAID, nem dolgozzuk fel újból
    if (order.status === "PAID") {
      logger.info(`Order ${order.id} already paid.`);
      return NextResponse.json({ received: true });
    }

    const amountPaid = invoice.amount;

    try {
      await prisma.$transaction(async (tx) => {
        await tx.payment.create({
          data: {
            orderId: order.id,
            providerId: invoice.id, // A BTCPay invoice ID-t használjuk providerId-ként
            amountInCents: amountPaid,
            currency: invoice.currency.toUpperCase(),
            status: PaymentStatus.SUCCESS,
            errorMessage: null,
          },
        });
        await tx.order.update({
          where: { id: order.id },
          data: { status: OrderStatus.PAID },
        });
        if (order.couponId && order.coupon) {
          await tx.coupon.update({
            where: { id: order.coupon.id },
            data: { usedRedemptions: { increment: 1 } },
          });
        }
      });
    } catch (error) {
      logger.error(
        `Error processing BTCPay payment transaction: ${error.stack}`
      );
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    const qrCodesByItem = await generateOrderQrCodes(order);
    logger.info("QR Codes:", qrCodesByItem);

    const ticketData = {
      orderId: order.id,
      email: order.email,
      // Az items tömb tartalmazza az egyes jegyek adatait:
      items: await Promise.all(
        qrCodesByItem.map(async (item) => {
          // Itt lehet egy függvény, ami lekéri a ticket nevét a ticketId alapján
          const ticket = await getTicket(item.ticketId);
          const ticketName = await ticket.name;
          return {
            ticketId: item.ticketId,
            ticketName,
            quantity: item.quantity,
            qrCodes: item.codes,
          };
        })
      ),
    };

    const result = await generateTicketPdf(ticketData);
    logger.info("generateTicketPdf result:", result);
    const { voucherId, pdfPath, expiresAt } = result;
    await createVoucher(voucherId, order.id, pdfPath, expiresAt);

    // Generálunk egy JWT-t a voucherId alapján
    let token;
    try {
      token = await generateDownloadToken(voucherId, expiresAt);
      logger.info("JWT token:", token);
    } catch (error) {
      logger.error(`Error generating token: ${error}`);
    }
    // Összeállítjuk a letöltési URL-t
    const downloadUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/download-ticket?token=${token}`;

    const invoiceData = {
      buyerName: "Pisti",
      email: order.email,
      zip: "7274234",
      city: "Maribor",
      address: "pontott",
      taxNumber: "minekaz",
      items: order.items.map((item) => ({
        label: "Konferencia jegy",
        quantity: item.quantity,
        vat: 27,
        netUnitPrice: item.priceAtPurchase / 100,
        unit: "db",
      })),
    };

    const invoiceResult = await createInvoice(invoiceData);
    logger.info("Invoice result:", invoiceResult);

    await sendTransactionalEmail(order, downloadUrl, invoiceResult.pdf);
  } else if (event.data.invoice.status === "failed") {
    const invoice = event.data.invoice;
    const amountPaid = invoice.amount;
    const orderId = invoice.metadata?.orderId;

    const order = await getOrder(parseInt(orderId, 10));
    if (order == null) {
      return new NextResponse("Bad request", { status: 400 });
    }

    try {
      await prisma.$transaction(async (tx) => {
        // Payment rekord létrehozása FAILED státusszal,
        // invoice.id-t használjuk providerId-ként
        await tx.payment.create({
          data: {
            orderId: order.id,
            providerId: invoice.id,
            amountInCents: invoice.amount,
            currency: invoice.currency.toUpperCase(),
            status: PaymentStatus.FAILED,
            errorMessage: invoice.last_payment_error
              ? invoice.last_payment_error.message
              : "Payment failed",
          },
        });
        // Frissítjük az order státuszát FAILED-re
        await tx.order.update({
          where: { id: order.id },
          data: { status: OrderStatus.FAILED },
        });
      });
    } catch (error) {
      logger.error(
        `Error processing failed payment transaction: ${error.stack}`
      );
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
    logger.error(`Payment failed for Order ID ${order.id}`);
  }
  return NextResponse.json({ received: true });
}
