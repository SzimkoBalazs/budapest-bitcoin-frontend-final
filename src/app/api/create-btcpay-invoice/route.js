import { NextResponse } from "next/server";
import { createBtcpayInvoice } from "@/app/actions/btcPayInvoice";
import { getOrder } from "@/app/actions/orders";
import logger from "../../../../utils/logger";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const locale = searchParams.get("locale") || "en";
  if (!orderId) {
    logger.error("OrderId hiányzik a kérésből.");
    return NextResponse.json({ error: "OrderId hiányzik" }, { status: 400 });
  }

  // Lekérjük a rendelést
  const order = await getOrder(parseInt(orderId, 10));
  if (!order) {
    logger.error(`Rendelés nem található: orderId ${orderId}`);
    return NextResponse.json(
      { error: "Rendelés nem található" },
      { status: 404 }
    );
  }

  try {
    const invoice = await createBtcpayInvoice(order, locale);
    logger.info(`Invoice létrejött: orderId ${order.id}, invoice: ${JSON.stringify(invoice)}`);
    return NextResponse.json(invoice);
  } catch (error) {
    logger.error(`BTCPay invoice létrehozási hiba orderId ${order.id}: ${error.stack}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
