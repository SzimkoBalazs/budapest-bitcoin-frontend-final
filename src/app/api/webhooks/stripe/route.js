import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../../utils/db";
import { getOrder } from "@/app/actions/orders";
import { getTicket } from "@/app/actions/ticket";
import { createVoucher } from "@/app/actions/voucher";
import { PaymentStatus, OrderStatus } from "@prisma/client";
import { generateOrderQrCodes } from "../../../../../utils/generateOrderQrCodes";
import { sendTransactionalEmail } from "../../../../../utils/sendTransactionalEmail";
import { generateTicketPdf } from "@/app/actions/generateTicketPdf";
import { generateDownloadToken } from "@/app/actions/generateDownloadToken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const charge = event.data.object;
    const orderId = charge.metadata.orderId;

    const pricePaidInCents = charge.amount;

    const order = await getOrder(parseInt(orderId, 10));
    if (order == null) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        providerId: charge.id,
        amountInCents: pricePaidInCents,
        currency: charge.currency,
        status: PaymentStatus.SUCCESS,
        errorMessage: charge.last_payment_error
          ? charge.last_payment_error.message
          : null,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: OrderStatus.PAID,
      },
    });

    if (order.couponId) {
      await prisma.$transaction([
        prisma.coupon.update({
          where: {
            id: order.coupon.id,
            usedRedemptions: { lt: order.coupon.maxRedemptions },
          },
          data: {
            usedRedemptions: { increment: 1 },
          },
        }),
      ]);
    }

    // const qrCodes = await generateOrderQrCodes(order);
    // console.log("QRCODES: ", qrCodes);

    const qrCodesByItem = await generateOrderQrCodes(order);
    console.log("QR Codes: ", qrCodesByItem);

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

    // Legeneráljuk a PDF-et a ticketData alapján
    const result = await generateTicketPdf(ticketData);
    console.log("generateTicketPdf result:", result);
    const { voucherId, pdfPath, expiresAt } = result;
    await createVoucher(voucherId, order.id, pdfPath, expiresAt);

    // Generálunk egy JWT-t a voucherId alapján
    let token;
    try {
      token = await generateDownloadToken(voucherId, expiresAt);
      console.log("JWT token:", token);
    } catch (error) {
      console.error("Error generating token:", error);
    }
    // Összeállítjuk a letöltési URL-t (a JWT-t nem dekódolható formában látja majd a kliens)
    const downloadUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/download-ticket?token=${token}`;

    await sendTransactionalEmail(order, downloadUrl);

    // await sendTransactionalEmail(order, qrCodes);
  }
  return NextResponse.json({ received: true });
}
