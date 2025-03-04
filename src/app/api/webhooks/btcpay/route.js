// app/api/webhooks/btcpay/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "../../../../../utils/db";
import logger from "../../../../../utils/logger";
import { PaymentStatus, Currency } from "@prisma/client";
import { OrderStatus } from "@prisma/client";
import { getTicket } from "@/app/actions/ticket";
import { getOrder } from "@/app/actions/orders";
import { createVoucher } from "@/app/actions/voucher";
import { generateOrderQrCodes } from "../../../../../utils/generateOrderQrCodes";
import { sendTransactionalEmail } from "../../../../../utils/sendTransactionalEmail";
import { generateDownloadToken } from "@/app/actions/generateDownloadToken";
import { createInvoice } from "@/app/actions/szamlazzInvoice";
import { generateNewTicketPdf } from "@/app/actions/generateNewTicketPDF";
import { handleContactSubscription } from "@/app/actions/brevoReminderContact";

import fs from "fs";
import path from "path";

function verifyBtcPaySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return signature === expectedSignature;
}

export async function POST(req) {
  const body = await req.text();

  const headers = JSON.stringify([...req.headers.entries()], null, 2);

  const logData = `Date: ${new Date().toISOString()}\nHeaders: ${headers}\nBody: ${body}\n\n`;

  const logFilePath = path.join(process.cwd(), "webhook_logs.txt");

  fs.appendFile(logFilePath, logData, (err) => {
    if (err) {
      logger.error("Error appending to file:", err);
    }
  });

  const headerSignature = req.headers.get("btcpay-sig");
  if (!headerSignature) {
    logger.error("Missing BTCPay signature header.");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }
  const signature = headerSignature.startsWith("sha256=")
    ? headerSignature.slice("sha256=".length)
    : headerSignature;
  if (
    !verifyBtcPaySignature(body, signature, process.env.BTCPAY_WEBHOOK_SECRET)
  ) {
    logger.error("Invalid BTCPay signature.");
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch (error) {
    logger.error(`Webhook JSON parse hiba: ${error}`);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event && event.type === "InvoiceCreated") {
    logger.info("InvoiceCreated event received; no further processing.");
    return NextResponse.json({ received: true }, { status: 200 });
  }

  if (event && event.type === "InvoiceProcessing") {
    logger.info("InvoiceProcessing event received; no further action.");
    return NextResponse.json({ received: true }, { status: 200 });
  }

  if (
    event &&
    (event.type === "InvoicePaymentSettled" ||
      event.type === "InvoiceReceivedPayment")
  ) {
    if (event.payment && event.payment.status === "Settled") {
      const invoice = event.payment;

      const orderId = event.metadata.orderId;

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

      if (order.status === "PAID") {
        logger.info(`Order ${order.id} already paid.`);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      const amountPaid = invoice.value;
      const satoshiAmount = Math.round(parseFloat(amountPaid) * 100000000);

      try {
        await prisma.$transaction(async (tx) => {
          await tx.payment.create({
            data: {
              orderId: order.id,
              providerId: invoice.id,
              amountInCents: satoshiAmount,
              currency: Currency.SATS,
              status: PaymentStatus.SUCCESS,
              errorMessage: null,
            },
          });
          await tx.order.update({
            where: { id: order.id },
            data: { status: OrderStatus.PAID, currency: Currency.SATS },
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

      const result = await generateNewTicketPdf(ticketData);
      logger.info("generateTicketPdf result:", result);
      const { voucherId, pdfPath, expiresAt } = result;
      await createVoucher(voucherId, order.id, pdfPath, expiresAt);

      let token;
      try {
        token = await generateDownloadToken(voucherId, expiresAt);
        logger.info("JWT token:", token);
      } catch (error) {
        logger.error(`Error generating token: ${error}`);
      }

      const downloadUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/download-ticket?token=${token}`;

      const defaultInvoiceData = {
        buyerName: "",
        email: order.email,
        zip: "",
        city: "",
        address: "",
        taxNumber: "",
        currency: order.currency,
        items: order.items.map((item) => {
          const isEUR = order.currency.toUpperCase() === "EUR";
          let grossUnitPrice;
          if (isEUR) {
            grossUnitPrice = item.priceAtPurchase / 100;
          } else {
            grossUnitPrice = item.priceAtPurchase;
          }

          if (order.coupon && order.coupon.discountValue != null) {
            if (order.coupon.discountType === "PERCENTAGE") {
              grossUnitPrice =
                grossUnitPrice * (1 - order.coupon.discountValue / 100);
            } else if (order.coupon.discountType === "FIXED") {
              grossUnitPrice = grossUnitPrice - order.coupon.discountValue;
              if (grossUnitPrice < 0) grossUnitPrice = 0;
            }
          }

          if (isEUR) {
            grossUnitPrice = parseFloat(grossUnitPrice.toFixed(2));
          }
          return {
            label: "Konferencia jegy",
            quantity: item.quantity,
            vat: 27,
            grossUnitPrice: grossUnitPrice,
            unit: "pcs",
          };
        }),
      };

      const invoiceResult = await createInvoice(defaultInvoiceData);
      logger.info("Invoice result:", invoiceResult);

      await sendTransactionalEmail(order, downloadUrl, invoiceResult.pdf);

      const orderEmail = order.email && order.email.trim();
      if (!orderEmail) {
        console.error("No valid email found on order.");
      } else {
        try {
          await handleContactSubscription({
            email: orderEmail,
            subscribe: false,
          });
        } catch (error) {
          console.error(
            "Error unsubscribing contact from Brevo list:",
            error.stack
          );
        }
      }
      return NextResponse.json({ received: true }, { status: 200 });
    }
  } else if (
    event &&
    (event.type === "InvoiceExpired" || event.type === "InvoiceInvalid")
  ) {
    const invoice = event?.payment;

    const orderId = event.metadata.orderId;

    const order = await getOrder(parseInt(orderId, 10));
    if (order == null) {
      return new NextResponse("Bad request", { status: 400 });
    }

    try {
      await prisma.$transaction(async (tx) => {
        await tx.payment.create({
          data: {
            orderId: order.id,
            providerId: invoice.id,
            amountInCents: order.finalAmountInCents,
            currency: "EUR",
            status: PaymentStatus.FAILED,
            errorMessage: event.type,
          },
        });

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
  return NextResponse.json({ received: true }, { status: 200 });
}
