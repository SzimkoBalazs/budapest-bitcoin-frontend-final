import { z } from "zod";

// Jegy validálása
export const ticketSchema = z.object({
  id: z.number().int().positive(),
  quantity: z.number().int().min(1).max(10),
});

// Rendelés validálása
export const orderSchema = z.object({
  email: z.string().email(),
  items: z.array(ticketSchema),
  paymentProvider: z.enum(["BTCPAY", "STRIPE"]),
});
