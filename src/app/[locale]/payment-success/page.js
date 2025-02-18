import { notFound } from "next/navigation";
import React from "react";
import Stripe from "stripe";
import prisma from "../../../../utils/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function SuccessPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const payment_intent = resolvedParams.payment_intent;
  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  if (paymentIntent.metadata.orderId == null) return notFound();

  const order = await prisma.order.findUnique({
    where: { id: parseInt(paymentIntent.metadata.orderId, 10) },
    include: {
      items: true,
      payments: true,
      coupon: true,
    },
  });
  if (order == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";
  const isPaid = order.status === "PAID";

  return (
    <div className="mt-[100px] w-full max-w-4xl mx-auto flex flex-col items-center p-10">
      {isSuccess && isPaid ? (
        <>
          <h1 className="text-green-600 font-bold text-2xl">
            Fizetés sikeres!
          </h1>
          {/* Itt megjeleníthetsz további információkat a rendelésről */}
        </>
      ) : (
        <>
          <h1 className="text-yellow-600 font-bold text-2xl">
            Fizetés feldolgozása folyamatban…
          </h1>
          {/* Itt esetleg egy polling komponens is elhelyezhető, hogy frissítse a státuszt */}
        </>
      )}
    </div>
  );
}
