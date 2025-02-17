'use server';
import prisma from '../../../utils/db';

// Összes elérhető jegy lekérése
export async function getTickets() {
  const tickets = await prisma.ticket.findMany({
    // where: {
    //   saleStart: { lte: new Date() }, // Csak azokat a jegyeket listázzuk, amik már elérhetőek
    //   saleEnd: { gte: new Date() }, // És még nem járt le az értékesítésük
    // },
    orderBy: {
      price: 'asc', // Legolcsóbb jegyek előre
    },
  });
  console.log('get Tickets', tickets);
  return tickets;
}

export async function getTicketsForAdmin() {
  try {
    const tickets = await prisma.ticket.findMany();
    return tickets;
  } catch (error) {
    console.error('Hiba a jegyek lekérdezése közben:', error);
    return [];
  }
}

export async function getTicket(ticketId) {
  if (!ticketId) throw new Error('Ticket ID is required');

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(ticketId) },
  });

  if (!ticket) throw new Error('Ticket not found');

  return ticket;
}

export async function createTicket(data) {
  try {
    // Ellenőrizzük, hogy minden szükséges adat megvan-e
    if (
      !data.name ||
      !data.price ||
      !data.currency ||
      !data.quantityAvailable ||
      !data.maxPerUser ||
      !data.saleStart ||
      !data.saleEnd
    ) {
      throw new Error('All fields are required.');
    }

    // Létrehozzuk az új jegyet az adatbázisban
    const newTicket = await prisma.ticket.create({
      data: {
        name: data.name,
        description: data.description || null,
        price: parseInt(data.price, 10),
        currency: data.currency,
        quantityAvailable: parseInt(data.quantityAvailable, 10),
        maxPerUser: parseInt(data.maxPerUser, 10),
        saleStart: new Date(data.saleStart),
        saleEnd: new Date(data.saleEnd),
      },
    });

    return { success: true, ticket: newTicket };
  } catch (error) {
    console.error('Error creating ticket:', error);
    return { success: false, error: error.message };
  }
}

export async function updateTicket(data) {
  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: parseInt(data.id, 10) },
      data: {
        name: data.name,
        description: data.description,
        price: parseInt(data.price, 10),
        currency: data.currency,
        quantityAvailable: data.quantityAvailable ? parseInt(data.quantityAvailable, 10) : null,
        maxPerUser: parseInt(data.maxPerUser, 10),
        saleStart: data.saleStart ? new Date(data.saleStart) : null,
        saleEnd: data.saleEnd ? new Date(data.saleEnd) : null,
      },
    });

    return { success: true, ticket: updatedTicket };
  } catch (error) {
    console.error('Hiba a jegy frissítése közben:', error);
    return { success: false, message: 'Nem sikerült frissíteni a jegyet.' };
  }
}
