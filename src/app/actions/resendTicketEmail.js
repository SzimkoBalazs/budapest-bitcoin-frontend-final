"use server";

import prisma from "../../../utils/db";
import logger from "../../../utils/logger";
import { reSendTransactionalEmail } from "../../../utils/reSendTransactionalEmail";

export async function resendTicketEmail(order) {
  if (!order) {
    throw new Error("Order is missing");
  }

  const voucher = await prisma.voucher.findFirst({
    where: { orderId: order.id },
  });

  if (!voucher || !voucher.downloadUrl || !voucher.invoicePath) {
    throw new Error("Voucher data is incomplete");
  }

  try {
    await reSendTransactionalEmail(
      order,
      voucher.downloadUrl,
      voucher.invoicePath
    );
    logger.info(`Ticket email re-sent for order ${order.id}`);
    return { message: "Ticket email re-sent successfully" };
  } catch (error) {
    logger.error(
      `Error re-sending ticket email for order ${order.id}: ${error.stack}`
    );
    throw error;
  }
}
