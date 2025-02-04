"use server";
import prisma from "../../../utils/db";

// Összes elérhető jegy lekérése
export async function getTickets() {
  const tickets = await prisma.ticket.findMany({
    where: {
      saleStart: { lte: new Date() }, // Csak azokat a jegyeket listázzuk, amik már elérhetőek
      saleEnd: { gte: new Date() }, // És még nem járt le az értékesítésük
    },
    orderBy: {
      price: "asc", // Legolcsóbb jegyek előre
    },
  });

  return tickets;
}

export async function getTicket(ticketId) {
  if (!ticketId) throw new Error("Ticket ID is required");

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(ticketId) },
  });

  if (!ticket) throw new Error("Ticket not found");

  return ticket;
}
