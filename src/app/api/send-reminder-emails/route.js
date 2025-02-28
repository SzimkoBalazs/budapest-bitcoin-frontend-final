
import { NextResponse } from 'next/server';
import prisma from '../../../../utils/db';
import { sendReminderEmail } from '@/app/actions/sendReminderEmail';
import logger from '../../../../utils/logger';

export async function GET(req) {
  const now = new Date();
  // Például 6 órás késés után küldünk emlékeztetőt
  const threshold = new Date(now.getTime() - 6 * 60 * 60 * 1000);

  // Lekérjük azokat a PENDING rendeléseket, amelyeknél még nem küldtük el az emlékeztetőt
  const pendingOrders = await prisma.order.findMany({
    where: {
      status: 'PENDING',
      createdAt: { lte: threshold },
      reminderSent: false,
    },
  });

  for (const order of pendingOrders) {
    try {
      
      await sendReminderEmail(order);
      
      await prisma.order.update({
        where: { id: order.id },
        data: { reminderSent: true },
      });
      logger.info(`Reminder sent for order ${order.id}`);
    } catch (error) {
      logger.error(`Error sending reminder for order ${order.id}:`, error.stack);
      
    }
  }

  return NextResponse.json({ message: "Reminder emails processed" });
}
