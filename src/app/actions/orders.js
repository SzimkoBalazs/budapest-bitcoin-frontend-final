"use server";

import prisma from "../../../utils/db";
import { orderSchema } from "../../../utils/validation";
import { PaymentProvider, Currency } from "@prisma/client";
import { handleContactSubscription } from "./brevoReminderContact";

export async function createOrder(data) {
  try {
    console.log("🚀 Received order data:", data);

    //  1. Validáció a Zod segítségével
    const validation = orderSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }

    const { items, paymentProvider, email, coupon, locale } = data;

    //  2. Ellenőrizzük, hogy érvényes fizetési szolgáltató
    const validProviders = [PaymentProvider.BTCPAY, PaymentProvider.STRIPE];
    if (!validProviders.includes(paymentProvider)) {
      throw new Error("Invalid payment provider.");
    }

    //  3. Ellenőrizzük, hogy az összes kért jegy létezik
    const ticketIds = items.map((t) => t.id);
    const foundTickets = await prisma.ticket.findMany({
      where: { id: { in: ticketIds } },
    });

    if (foundTickets.length !== items.length) {
      throw new Error("One or more tickets are invalid.");
    }

    const now = new Date();
    console.log("now", now);

    //  4. Ellenőrizzük a jegyek elérhetőségét, dátumát és mennyiségét
    let totalAmountInCents = 0;
    for (const ticket of items) {
      const foundTicket = foundTickets.find((t) => t.id === ticket.id);

      if (!foundTicket) {
        throw new Error("Ticket not found.");
      }

      // ⚠️ Ellenőrizzük, hogy a jegy még elérhető-e dátum szerint
      if (
        (foundTicket.saleStart && now < foundTicket.saleStart) ||
        (foundTicket.saleEnd && now > foundTicket.saleEnd)
      ) {
        throw new Error(`Ticket "${foundTicket.name}" is not available.`);
      }

      // ⚠️ Jegyek mennyiségi ellenőrzése (min. 1, max. 10)
      if (ticket.quantity < 1 || ticket.quantity > 10) {
        throw new Error(
          `Invalid quantity for "${foundTicket.name}". Must be between 1 and 10.`
        );
      }

      if (foundTicket.quantityAvailable < ticket.quantity) {
        throw new Error(
          `Not enough tickets available for "${foundTicket.name}".`
        );
      }

      console.log(foundTicket);

      if (paymentProvider === PaymentProvider.BTCPAY || locale === "en") {
        totalAmountInCents += foundTicket.priceInEur * ticket.quantity;
      } else {
        totalAmountInCents += foundTicket.priceInHuf * ticket.quantity;
      }
    }

    console.log("💰 Total before discount:", totalAmountInCents);

    //  5. Kupon érvényesítés, ha van
    let discountInCents = 0;
    let appliedCoupon = null;

    if (coupon) {
      const validCoupon = await prisma.coupon.findUnique({
        where: { code: coupon },
      });

      console.log("🔍 Found coupon:", validCoupon);

      if (!validCoupon) {
        throw new Error("Invalid coupon code.");
      }

      //  Ellenőrizzük a kupon lejárati dátumát és a felhasználhatóságot
      if (
        (validCoupon.validFrom && now < validCoupon.validFrom) ||
        (validCoupon.validUntil && now > validCoupon.validUntil)
      ) {
        throw new Error("Coupon is not valid at this time.");
      }

      //  Kedvezmény levonása
      discountInCents =
        validCoupon.discountType === "FIXED"
          ? validCoupon.discountValue
          : Math.round((totalAmountInCents * validCoupon.discountValue) / 100);

      appliedCoupon = validCoupon;

      console.log(
        `✅ Applied coupon: ${validCoupon.code}, Discount: ${discountInCents}`
      );
    }

    //  6. Végső ár számítása (nem lehet negatív)
    const finalAmountInCents = Math.max(
      totalAmountInCents - discountInCents,
      0
    );

    const finalCurrency =
      paymentProvider === PaymentProvider.STRIPE
        ? locale === "en"
          ? Currency.EUR
          : Currency.HUF
        : Currency.EUR;

    console.log("💰 Final amount after discount:", finalAmountInCents);

    //  7. TRANZAKCIÓ: Order + OrderItems létrehozása és jegyszám frissítése
    const order = await prisma.$transaction(async (prisma) => {
      //  Rendelés létrehozása
      const newOrder = await prisma.order.create({
        data: {
          email,
          totalAmountInCents,
          discountInCents,
          finalAmountInCents,
          currency: finalCurrency,
          status: "PENDING",
          paymentProvider,
          couponId: appliedCoupon ? appliedCoupon.id : null,
          items: {
            create: items.map((ticket) => {
              const foundTicket = foundTickets.find((t) => t.id === ticket.id);
              return {
                ticketId: ticket.id,
                quantity: ticket.quantity,
                priceAtPurchase:
                  locale === "en" || paymentProvider === PaymentProvider.BTCPAY
                    ? foundTicket.priceInEur
                    : foundTicket.priceInHuf,
              };
            }),
          },
        },
        include: {
          items: true,
        },
      });

      //  Frissítjük a jegyek elérhető mennyiségét
      for (const ticket of items) {
        await prisma.ticket.update({
          where: { id: ticket.id },
          data: { quantityAvailable: { decrement: ticket.quantity } },
        });
      }

      for (const orderItem of newOrder.items) {
        const instancesData = Array.from(
          { length: orderItem.quantity },
          () => ({
            orderItemId: orderItem.id,
            validated: false,
          })
        );
        // Használhatod a createMany függvényt:
        await prisma.ticketInstance.createMany({
          data: instancesData,
        });
      }

      console.log("✅ Order created successfully:", newOrder);
      // try {
      //   await handleContactSubscription({ email, subscribe: true });
      // } catch (error) {
      //   console.error("Error subscribing contact to Brevo list:", error.stack);
      //   // Nem kritikus, így nem állítjuk le a folyamatot
      // }
      return newOrder;
    });

    return order;
  } catch (error) {
    console.error("Hiba az order létrehozásakor:", error.stack);
    throw new Error(error.message || "Internal server error.");
  }
}

export async function getOrder(orderId) {
  if (!orderId) throw new Error("Order ID is required");

  const order = await prisma.order.findUnique({
    where: { id: Number(orderId) },
    include: {
      items: true,
      payments: true,
      coupon: true,
    },
  });

  if (!order) throw new Error("Order not found");

  return order;
}

export async function getOrdersForAdmin() {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch (error) {
    console.error("Hiba az orderek lekérdezése közben:", error);
    return [];
  }
}
