import { createTicketToken } from "./generateTicketToken";
import { generateQrCode } from "./generateQrCode";
import QRCode from "qrcode";
import prisma from "../utils/db";

// export async function generateOrderQrCodes(order) {
//   // Minden OrderItem esetén, ahol a quantity több, generálunk annyi QR kódot, ahány jegyet vásároltak.
//   const qrCodesNested = await Promise.all(
//     order.items.map(async (item) => {
//       const codes = [];
//       // Iterálunk 0-tól item.quantity-ig (például, ha quantity = 2, akkor 2 ciklusfutás lesz)
//       for (let i = 0; i < item.quantity; i++) {
//         // A token generálásánál az egyediség érdekében kiegészítjük az order.createdAt értéket
//         // például: [order.createdAt.getTime()]-[index+1]
//         const uniqueTimestamp = `${order.createdAt.getTime()}-${i + 1}`;
//         const token = createTicketToken(
//           item.ticketId,
//           order.id,
//           uniqueTimestamp
//         );
//         const url = `${process.env.VALIDATE_TICKET_URL}/${token}`;
//         const qrDataUrl = await generateQrCode(url);
//         codes.push(qrDataUrl);
//       }
//       return codes;
//     })
//   );
//   // Flatteneljük a tömböt, hogy egy egyszerű listát kapjunk
//   return qrCodesNested.flat();
// }

export async function generateOrderQrCodes(order) {
  const results = await Promise.all(
    order.items.map(async (item) => {
      const instances = await prisma.ticketInstance.findMany({
        where: { orderItemId: item.id },
      });

      if (!instances || instances.length === 0) {
        return { ticketId: item.ticketId, quantity: item.quantity, codes: [] };
      }
      const codes = await Promise.all(
        instances.map(async (instance) => {
          // Most a token tartalmazza a ticketId, orderId és instance.id értékeket
          const token = createTicketToken(item.ticketId, order.id, instance.id);
          const url = `${process.env.VALIDATE_TICKET_URL}/${token}`;
          const qrDataUrl = await QRCode.toDataURL(url);
          return qrDataUrl;
        })
      );
      return { ticketId: item.ticketId, quantity: item.quantity, codes };
    })
  );
  return results;
}
