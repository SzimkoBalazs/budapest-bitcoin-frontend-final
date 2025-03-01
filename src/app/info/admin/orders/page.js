import React from "react";
import OrdersPage from "./OrdersPage";
import { getOrdersForAdmin } from "@/app/actions/orders";

export const dynamic = 'force-dynamic';

const page = async () => {
  const orders = await getOrdersForAdmin();
  return <OrdersPage orders={orders} />;
};

export default page;
