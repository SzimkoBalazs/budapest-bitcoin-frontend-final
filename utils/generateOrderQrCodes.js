import { createTicketToken } from "./generateTicketToken";
import { generateQrCode } from "./generateQrCode";

export async function generateOrderQrCodes(order) {
  // Minden OrderItem esetén, ahol a quantity több, generálunk annyi QR kódot, ahány jegyet vásároltak.
  const qrCodesNested = await Promise.all(
    order.items.map(async (item) => {
      const codes = [];
      // Iterálunk 0-tól item.quantity-ig (például, ha quantity = 2, akkor 2 ciklusfutás lesz)
      for (let i = 0; i < item.quantity; i++) {
        // A token generálásánál az egyediség érdekében kiegészítjük az order.createdAt értéket
        // például: [order.createdAt.getTime()]-[index+1]
        const uniqueTimestamp = `${order.createdAt.getTime()}-${i + 1}`;
        const token = createTicketToken(
          item.ticketId,
          order.id,
          uniqueTimestamp
        );
        const url = `${process.env.VALIDATE_TICKET_URL}/${token}`;
        const qrDataUrl = await generateQrCode(url);
        codes.push(qrDataUrl);
      }
      return codes;
    })
  );
  // Flatteneljük a tömböt, hogy egy egyszerű listát kapjunk
  return qrCodesNested.flat();
}
