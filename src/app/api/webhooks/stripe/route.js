import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../../utils/db";
import { getOrder } from "@/app/actions/orders";
import { PaymentStatus, OrderStatus } from "@prisma/client";
import { generateOrderQrCodes } from "../../../../../utils/generateOrderQrCodes";

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

    const qrCodes = await generateOrderQrCodes(order);
    console.log("QRCODES: ", qrCodes);
  }
  return NextResponse.json({ received: true });
}
