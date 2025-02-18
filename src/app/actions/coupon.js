"use server";

import prisma from "../../../utils/db";

export async function validateCoupon(code, selectedTickets) {
  console.log(selectedTickets);
  try {
    if (!code.trim()) {
      throw new Error("Coupon code is required.");
    }

    // 🔹 Megkeressük a kupont az adatbázisban
    const coupon = await prisma.coupon.findUnique({ where: { code } });

    if (!coupon) {
      throw new Error("Invalid coupon.");
    }

    // 🔹 Ellenőrizzük, hogy érvényes-e időben
    const now = new Date();
    if (
      (coupon.validFrom && now < coupon.validFrom) ||
      (coupon.validUntil && now > coupon.validUntil) ||
      !coupon.isActive
    ) {
      throw new Error("Coupon is expired or not active yet.");
    }

    // 🔹 Ellenőrizzük a max használati számot
    if (
      coupon.maxRedemptions &&
      coupon.usedRedemptions >= coupon.maxRedemptions
    ) {
      throw new Error("Coupon has reached its usage limit.");
    }

    const eligibleTickets = selectedTickets.filter((ticket) => ticket.id !== 1);
    const totalEligibleQuantity = eligibleTickets.reduce(
      (sum, ticket) => sum + ticket.quantity,
      0
    );

    if (totalEligibleQuantity < coupon.minTicketsRequired) {
      throw new Error(
        `Coupon requires at least ${coupon.minTicketsRequired} eligible tickets.`
      );
    }

    // 🔹 Visszaküldjük a kupon adatait (milyen kedvezményt ad)
    return {
      success: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minTicketsRequired: coupon.minTicketsRequired,
    };
  } catch (error) {
    console.error("Coupon validation error:", error.message);
    return { success: false, error: error.message };
  }
}

export async function getCouponById(id) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { id: parseInt(id, 10) },
    });
    return coupon;
  } catch (error) {
    console.error("Hiba a kupon lekérdezése közben:", error);
    return null;
  }
}

export async function getAllCoupons() {
  try {
    const coupons = await prisma.coupon.findMany();
    return coupons;
  } catch (error) {
    console.error("Hiba a kuponok lekérdezése közben:", error);
    return [];
  }
}

export async function createCoupon(data) {
  try {
    const newCoupon = await prisma.coupon.create({
      data: {
        code: data.code,
        discountType: data.discountType,
        discountValue:
          data.discountValue !== "" ? parseInt(data.discountValue, 10) : 0,
        maxRedemptions:
          data.maxRedemptions !== "" ? parseInt(data.maxRedemptions, 10) : null,
        minTicketsRequired:
          data.minTicketsRequired !== ""
            ? parseInt(data.minTicketsRequired, 10)
            : 0,
        validFrom: data.validFrom ? new Date(data.validFrom) : null,
        validUntil: data.validUntil ? new Date(data.validUntil) : null,
        isActive:
          data.isActive === true || data.isActive === "true" ? true : false,
      },
    });

    return { success: true, coupon: newCoupon };
  } catch (error) {
    console.error("Hiba a kupon létrehozásakor:", error);
    return { success: false, message: "Nem sikerült létrehozni a kupont." };
  }
}

export async function updateCoupon(data) {
  try {
    const updatedCoupon = await prisma.coupon.update({
      where: { id: parseInt(data.id, 10) },
      data: {
        code: data.code,
        discountType: data.discountType,
        discountValue: parseInt(data.discountValue, 10),
        maxRedemptions: data.maxRedemptions
          ? parseInt(data.maxRedemptions, 10)
          : null,
        minTicketsRequired: parseInt(data.minTicketsRequired, 10),
        validFrom: data.validFrom ? new Date(data.validFrom) : null,
        validUntil: data.validUntil ? new Date(data.validUntil) : null,
        isActive:
          data.isActive === true || data.isActive === "true" ? true : false,
      },
    });

    return { success: true, coupon: updatedCoupon };
  } catch (error) {
    console.error("Hiba a kupon frissítése közben:", error);
    return { success: false, message: "Nem sikerült frissíteni a kupont." };
  }
}
