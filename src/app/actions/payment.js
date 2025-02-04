"use server";

import prisma from "../../../utils/db";
import { PaymentStatus, OrderStatus } from "@prisma/client";

export async function createPayment(
  orderId,
  provider,
  providerId,
  amountInCents
) {
  try {
    //  1️⃣ Validáció
    const validProviders = ["BTCPAY", "STRIPE"];
    if (!validProviders.includes(provider)) {
      throw new Error("Invalid payment provider.");
    }

    //  2️⃣ Ellenőrizzük, hogy létezik-e az Order
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      throw new Error("Order not found.");
    }

    //  3️⃣ Payment létrehozása `PENDING` státusszal
    const payment = await prisma.payment.create({
      data: {
        orderId,
        provider,
        providerId, // Pl. Stripe PaymentIntent ID vagy BTCPay Invoice ID
        amountInCents,
        currency: "EUR",
        status: PaymentStatus.PENDING,
      },
    });

    return payment;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw new Error(error.message || "Internal server error.");
  }
}

export async function updatePaymentStatus(providerId, status) {
  try {
    //  1️⃣ Megkeressük a Payment rekordot
    const payment = await prisma.payment.findUnique({
      where: { providerId },
      include: { order: true },
    });

    if (!payment) {
      throw new Error("Payment not found.");
    }

    //  2️⃣ Frissítjük a Payment státuszát
    const updatedPayment = await prisma.payment.update({
      where: { providerId },
      data: { status },
    });

    //  3️⃣ Ha a fizetés sikeres, frissítjük az Order státuszát is
    if (status === PaymentStatus.SUCCESS) {
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: OrderStatus.PAID },
      });
    }

    return updatedPayment;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw new Error(error.message || "Internal server error.");
  }
}
