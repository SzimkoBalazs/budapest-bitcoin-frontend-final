import { NextResponse } from "next/server";
import { verifyTicketToken } from "../../../../../../../../utils/generateTicketToken";
import prisma from "../../../../../../../../utils/db";
import { getOrder } from "@/app/actions/orders";
import { getTicket } from "@/app/actions/ticket";

export async function GET(request, { params }) {
  const { ticketId, orderId, instanceId, signature } = await params;

  // Állítsuk össze a token-t a várt formátumban
  const token = `${ticketId}/${orderId}/${instanceId}/${signature}`;

  // Ellenőrizzük a token érvényességét
  if (!verifyTicketToken(token)) {
    return NextResponse.json({ error: "Érvénytelen token" }, { status: 400 });
  }

  // Lekérdezzük a TicketInstance rekordot
  let instance;
  try {
    // Lekérdezzük a TicketInstance rekordot
    instance = await prisma.ticketInstance.findUnique({
      where: { id: parseInt(instanceId, 10) },
      include: {
        orderItem: {
          include: { ticket: true, order: true },
        },
      },
    });
    if (!instance) {
      throw new Error("TicketInstance nem található.");
    }
  } catch (error) {
    console.error("Hiba a TicketInstance lekérdezésekor:", error.stack);
    return new Response(
      JSON.stringify({ error: "Hiba a TicketInstance lekérdezésekor" }),
      { status: 500 }
    );
  }

  console.log("This is the instance:", instance);

  if (!instance) {
    return NextResponse.json(
      { error: "Ticket instance nem található" },
      { status: 404 }
    );
  }

  // Ha már validálva lett, adjuk vissza, hogy a jegy már felhasználásra került
  if (instance.validated) {
    return NextResponse.json(
      { error: "Jegy már validálva van" },
      { status: 400 }
    );
  }

  let updatedInstance;
  try {
    // Frissítjük a TicketInstance rekordot: markoljuk validáltnak
    updatedInstance = await prisma.ticketInstance.update({
      where: { id: parseInt(instanceId, 10) },
      data: { validated: true, validatedAt: new Date() },
    });
  } catch (error) {
    console.error("Hiba a TicketInstance frissítésekor:", error.stack);
    return new Response(
      JSON.stringify({ error: "Hiba a TicketInstance frissítésekor" }),
      { status: 500 }
    );
  }

  const orderDetails = instance.orderItem.order;
  const ticketDetails = instance.orderItem.ticket;

  // Visszaadunk egy választ a front-endnek:
  return NextResponse.json(
    {
      success: true,
      message: "Jegy sikeresen validálva.",
      orderId: orderId,
      email: orderDetails?.email,
      ticketName: ticketDetails?.name,
      validatedAt: updatedInstance.validatedAt,
    },
    { status: 200 }
  );
}
