
import { NextResponse } from 'next/server';
import prisma from '../../../../utils/db';
import { sendReminderEmail } from '@/app/actions/sendReminderEmail';
import logger from '../../../../utils/logger';

export async function GET(req) {

  
  
  console.log("GET /api/send-reminder-emails endpoint reached");
  logger.info("GET /api/send-reminder-emails endpoint reached");

  const now = new Date();
  logger.info("Current time: " + now.toISOString());
  const threshold = new Date(now.getTime() - 6 * 60 * 60 * 1000);
  logger.info("Threshold time: " + threshold.toISOString());

  try {
    const pendingOrders = await prisma.order.findMany({
      where: {
        status: 'PENDING',
        createdAt: { lte: threshold },
        reminderSent: false,
      },
    });
    logger.info(`Found ${pendingOrders.length} pending orders`);

    for (const order of pendingOrders) {
      try {
        logger.info(`Processing order ${order.id}`);
        await sendReminderEmail(order);
        await prisma.order.update({
          where: { id: order.id },
          data: { reminderSent: true },
        });
        logger.info(`Reminder sent for order ${order.id}`);
      } catch (error) {
        logger.error(`Error sending reminder for order ${order.id}:`, error.stack);
        return NextResponse.json(
          {
            error: "Internal Server Error",
            details: error.stack, 
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: "Reminder emails processed" });
  } catch (error) {
    logger.error("Global error in GET /api/send-reminder-emails:", error.stack);
    return NextResponse.json({ error: error.stack });
  }
}
