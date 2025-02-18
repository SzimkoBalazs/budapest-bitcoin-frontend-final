// app/api/webhooks/btcpay/route.js
import { NextResponse } from "next/server";
import prisma from "../../../../../utils/db";

export async function POST(req) {
  const body = await req.text();
  let event;
  try {
    event = JSON.parse(body);
  } catch (error) {
    console.error("Webhook JSON parse hiba:", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Például: Ha az invoice státusza "complete", akkor a fizetés sikeres volt
  if (
    event &&
    event.data &&
    event.data.invoice &&
    event.data.invoice.status === "complete"
  ) {
    const invoice = event.data.invoice;
    // A metadata-ban érdemes elhelyezni a rendelés azonosítóját a BTCPay invoice létrehozásakor
    const orderId = invoice.metadata?.orderId;
    if (orderId) {
      try {
        await prisma.order.update({
          where: { id: parseInt(orderId, 10) },
          data: { status: "PAID" },
        });
      } catch (error) {
        console.error("Order frissítési hiba:", error);
        return NextResponse.json(
          { error: "Order update failed" },
          { status: 500 }
        );
      }
    }
  }
  return NextResponse.json({ received: true });
}
