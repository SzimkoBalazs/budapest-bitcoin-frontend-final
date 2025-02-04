"use server";

import prisma from "../../../utils/db";

export async function validateCoupon(code) {
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
      (coupon.validUntil && now > coupon.validUntil)
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

    // 🔹 Visszaküldjük a kupon adatait (milyen kedvezményt ad)
    return {
      success: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    };
  } catch (error) {
    console.error("Coupon validation error:", error.message);
    return { success: false, error: error.message };
  }
}
