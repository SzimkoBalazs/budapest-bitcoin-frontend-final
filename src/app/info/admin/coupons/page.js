import React from "react";
import CouponsPage from "./CouponsPage";
import { getAllCoupons } from "@/app/actions/coupon";

export const dynamic = 'force-dynamic';

const pages = async () => {
  const coupons = await getAllCoupons();
  return <CouponsPage coupons={coupons} />;
};

export default pages;
