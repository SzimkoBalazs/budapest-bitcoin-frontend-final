import { NextResponse } from "next/server";
import { createBtcpayInvoice } from "@/app/actions/btcPayInvoice";
import { getOrder } from "@/app/actions/orders";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const locale = searchParams.get("locale") || "en";
  if (!orderId) {
    return NextResponse.json({ error: "OrderId hiányzik" }, { status: 400 });
  }

  // Lekérjük a rendelést
  const order = await getOrder(parseInt(orderId, 10));
  if (!order) {
    return NextResponse.json(
      { error: "Rendelés nem található" },
      { status: 404 }
    );
  }

  try {
    const invoice = await createBtcpayInvoice(order, locale);
    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
