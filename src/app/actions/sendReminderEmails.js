// sendReminderEmails.js
import prisma from '@/utils/db';
import { sendReminderEmail } from '@/utils/sendReminderEmail'; 

export async function sendReminderEmails() {
  const now = new Date();
  // 6 órás határidő
  const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
  // 24 órás határidő
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  
  const orders6h = await prisma.order.findMany({
    where: {
      status: 'PENDING',
      createdAt: { lte: sixHoursAgo },
      reminder6hSent: false,
    },
  });

  for (const order of orders6h) {
    try {
      await sendReminderEmail(order, '6h'); 
      await prisma.order.update({
        where: { id: order.id },
        data: { reminder6hSent: true },
      });
      console.log(`6h reminder sent for order ${order.id}`);
    } catch (error) {
      console.error(`Error sending 6h reminder for order ${order.id}:`, error);
    }
  }

  
  const orders24h = await prisma.order.findMany({
    where: {
      status: 'PENDING',
      createdAt: { lte: twentyFourHoursAgo },
      reminder24hSent: false,
    },
  });

  for (const order of orders24h) {
    try {
      await sendReminderEmail(order, '24h'); 
      await prisma.order.update({
        where: { id: order.id },
        data: { reminder24hSent: true },
      });
      console.log(`24h reminder sent for order ${order.id}`);
    } catch (error) {
      console.error(`Error sending 24h reminder for order ${order.id}:`, error);
    }
  }

  return { message: "Reminder emails processed" };
}
