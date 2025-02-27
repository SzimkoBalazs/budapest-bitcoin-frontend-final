import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../../utils/db";
import { getOrder } from "@/app/actions/orders";
import { getTicket } from "@/app/actions/ticket";
import { createVoucher } from "@/app/actions/voucher";
import { PaymentStatus, OrderStatus } from "@prisma/client";
import { generateOrderQrCodes } from "../../../../../utils/generateOrderQrCodes";
import { sendTransactionalEmail } from "../../../../../utils/sendTransactionalEmail";
import { generateDownloadToken } from "@/app/actions/generateDownloadToken";
import { createInvoice } from "@/app/actions/szamlazzInvoice";
import { generateNewTicketPdf } from "@/app/actions/generateNewTicketPDF";
import { handleContactSubscription } from "@/app/actions/brevoReminderContact";
import logger from "../../../../../utils/logger";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Ellenőrizzük, hogy az esemény már feldolgozásra került-e
  // const existingEvent = await prisma.stripeWebhookEvent.findUnique({
  //   where: { eventId: event.id },
  // });
  // if (existingEvent) {
  //   console.log(`Event ${event.id} already processed.`);
  //   return NextResponse.json({ received: true });
  // }

  // // Ha még nem, akkor rögzíjük az esemény ID-t
  // await prisma.stripeWebhookEvent.create({
  //   data: { eventId: event.id },
  // });

  if (event.type === 'payment_intent.succeeded') {
    const charge = event.data.object;
    const orderId = charge.metadata.orderId;
    const metadata = event.data.object.metadata || {};
    

    console.log("metadata: ", metadata);

    const pricePaidInCents = charge.amount;

    const order = await getOrder(parseInt(orderId, 10));
    if (order == null) {
      return new NextResponse('Bad request', { status: 400 });
    }

    if (order.status === OrderStatus.PAID) {
      logger.info(`Order ${order.id} already paid.`);
      return new NextResponse("Order already paid", { status: 400 });
    }
    try {
      // Az adatbázis módosítások atomikus módon történnek egy tranzakcióban.
      await prisma.$transaction(async (tx) => {
        await tx.payment.create({
          data: {
            orderId: order.id,
            providerId: charge.id,
            amountInCents: pricePaidInCents,
            currency: charge.currency.toUpperCase(),
            status: PaymentStatus.SUCCESS,
            errorMessage: charge.last_payment_error ? charge.last_payment_error.message : null,
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
      logger.error(`Error processing payment transaction: ${error.stack}`);
      return new NextResponse("Internal server error", { status: 500 });
    }

    // const qrCodes = await generateOrderQrCodes(order);
    // console.log("QRCODES: ", qrCodes);

    const qrCodesByItem = await generateOrderQrCodes(order);
    logger.info("QR Codes: ", qrCodesByItem);

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
        }),
      ),
    };

    //Legeneráljuk a PDF-et a ticketData alapján
    // const result = await generateTicketPdf(ticketData);
    const result = await generateNewTicketPdf(ticketData);
    logger.info("generateTicketPdf result:", result);
    const { voucherId, pdfPath, expiresAt } = result;
    await createVoucher(voucherId, order.id, pdfPath, expiresAt);

    // Generálunk egy JWT-t a voucherId alapján
    let token;
    try {
      token = await generateDownloadToken(voucherId, expiresAt);
      logger.info("JWT token:", token);
    } catch (error) {
      logger.error(`Error generating download token: ${error}`);
    }
    // Összeállítjuk a letöltési URL-t
    const downloadUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/download-ticket?token=${token}`;

    const invoiceNeeded = metadata.invoiceNeeded === 'true';

// Ha invoiceNeeded true, akkor invoiceData mezőket használunk, különben formData mezőket.
const processedData = invoiceNeeded
  ? {
      // Invoice adatok (invoiceData)
      invoiceType: metadata.invoiceType || null,
      invoiceName: metadata.invoiceName || null,
      invoiceCountry: metadata.invoiceCountry || null,
      invoiceCity: metadata.invoiceCity || null,
      invoiceStreet: metadata.invoiceStreet || null,
      invoiceZip: metadata.invoiceZip || null,
      euVat: metadata.euVat || null,
      vat: metadata.vat || null,
    }
  : {
      // Form adatok (formData)
      firstName: metadata.firstName || null,
      lastName: metadata.lastName || null,
      email: metadata.email || null,
      country: metadata.country || null,
      city: metadata.city || null,
      street: metadata.street || null,
      zip: metadata.zip || null,
      marketingAccepted: metadata.marketingAccepted || null,
      termsAccepted: metadata.termsAccepted || null,
    };

console.log("Processed metadata:", processedData);

console.log("Order in the WEBHOOK:", order);

const defaultInvoiceData = {
  buyerName: '', // Ezt később beállíthatod
  email: order.email,
  zip: '',
  city: '',
  address: '',
  taxNumber: '',
  items: order.items.map((item) => {
    const isEUR = order.currency.toUpperCase() === 'EUR';
    let grossUnitPrice;
    if (isEUR) {
      // EUR esetén az adatbázisban centben tárolt értéket 100-zal osztjuk le.
      grossUnitPrice = item.priceAtPurchase / 100;
    } else {
      // Más valutában (pl. HUF) az érték változatlan (tax-inclusive)
      grossUnitPrice = item.priceAtPurchase;
    }
    // Ha van kupon, akkor módosítjuk az egyedi tétel bruttó árát:
    if (order.coupon && order.coupon.discountValue != null) {
      if (order.coupon.discountType === 'PERCENTAGE') {
        // Százalékos kedvezmény: például 50% kedvezmény esetén az ár feleződik.
        grossUnitPrice = grossUnitPrice * (1 - order.coupon.discountValue / 100);
      } else if (order.coupon.discountType === 'FIXED') {
        // Fix kedvezmény: egyszerűen levonjuk a discountValue-t.
        // Feltételezzük, hogy a discountValue mértékegysége megegyezik a grossUnitPrice-ével.
        grossUnitPrice = grossUnitPrice - order.coupon.discountValue;
        if (grossUnitPrice < 0) grossUnitPrice = 0;
      }
    }
    // Ha EUR, kerekítünk két tizedesjegyre:
    if (isEUR) {
      grossUnitPrice = parseFloat(grossUnitPrice.toFixed(2));
    }
    return {
      label: 'Konferencia jegy',
      quantity: item.quantity,
      vat: 27, // A VAT kulcs, amit a számlázó a végösszeghez használ (nettó + áfa = bruttó)
      grossUnitPrice: grossUnitPrice, // Csak a bruttó árat adjuk át, a számlázó rendszer onnan számolja a további értékeket
      unit: 'pcs',
    };
  }),
};

console.log("Default Invoice Data:", defaultInvoiceData);

    const finalInvoiceData = {
      buyerName: invoiceNeeded
        ? processedData.invoiceName || defaultInvoiceData.buyerName
        : (processedData.firstName && processedData.lastName
            ? `${processedData.firstName} ${processedData.lastName}`
            : defaultInvoiceData.buyerName),
      email: invoiceNeeded
        ? processedData.email || defaultInvoiceData.email
        : processedData.email || defaultInvoiceData.email,
      zip: invoiceNeeded
        ? processedData.invoiceZip || defaultInvoiceData.zip
        : processedData.zip || defaultInvoiceData.zip,
      city: invoiceNeeded
        ? processedData.invoiceCity || defaultInvoiceData.city
        : processedData.city || defaultInvoiceData.city,
      address: invoiceNeeded
        ? processedData.invoiceStreet || defaultInvoiceData.address
        : processedData.street || defaultInvoiceData.address,
      taxNumber: invoiceNeeded
        ? processedData.vat || defaultInvoiceData.taxNumber // vagy ha van külön taxNumber mező
        : defaultInvoiceData.taxNumber,
      items: defaultInvoiceData.items, // Az items rész nem változik
      currency: order.currency
    };

    console.log("Final invoiceData:", finalInvoiceData);


    const invoiceResult = await createInvoice(finalInvoiceData);
    logger.info("Invoice result:", invoiceResult);

    await sendTransactionalEmail(order, downloadUrl, invoiceResult.pdf);

    const orderEmail = order.email && order.email.trim();
if (!orderEmail) {
  console.error("No valid email found on order.");
} else {
  try {
    await handleContactSubscription({ email: orderEmail, subscribe: false });
  } catch (error) {
    console.error("Error unsubscribing contact from Brevo list:", error.stack);
    // Nem kritikus, így nem állítjuk le a folyamatot
  }
}
  } else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;
    const order = await getOrder(parseInt(orderId, 10));
    if (order == null) {
      return new NextResponse('Bad request', { status: 400 });
    }
    try {
      await prisma.$transaction(async (tx) => {
        // Létrehozunk egy Payment rekordot FAILED státusszal
        await tx.payment.create({
          data: {
            orderId: order.id,
            providerId: paymentIntent.id,
            amountInCents: paymentIntent.amount,
            currency: paymentIntent.currency.toUpperCase(),
            status: PaymentStatus.FAILED,
            errorMessage: paymentIntent.last_payment_error
              ? paymentIntent.last_payment_error.message
              : 'Payment failed',
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
    }
    console.error(`Payment failed for Order ID ${order.id}`);
  } else if (event.type === 'payment_intent.canceled') {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;
    const order = await getOrder(parseInt(orderId, 10));
    if (order == null) {
      return new NextResponse('Bad request', { status: 400 });
    }
    try {
      await prisma.$transaction(async (tx) => {
        // Létrehozunk egy Payment rekordot CANCELLED státusszal
        await tx.payment.create({
          data: {
            orderId: order.id,
            providerId: paymentIntent.id,
            amountInCents: paymentIntent.amount,
            currency: paymentIntent.currency.toUpperCase(),
            status: PaymentStatus.CANCELLED,
            errorMessage: paymentIntent.last_payment_error
              ? paymentIntent.last_payment_error.message
              : 'Payment Cancelled',
          },
        });
        // Frissítjük az order státuszát CANCELLED-re
        await tx.order.update({
          where: { id: order.id },
          data: { status: OrderStatus.CANCELLED },
        });
      });
    } catch (error) {
      logger.error(
        `Error processing cancelled payment transaction: ${error.stack}`
      );
    }
    logger.error(`Payment cancelled for Order ID ${order.id}`);
  }

  return NextResponse.json({ received: true });
}
