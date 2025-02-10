// utils/generateTicketToken.js
import crypto from "crypto";

/**
 * Létrehoz egy jegy token-t, amely tartalmazza a ticketId, orderId és egy időbélyeg értékét.
 * A token aláírása HMAC-SHA256 algoritmussal történik.
 *
 * @param {number} ticketId - A jegy azonosítója
 * @param {number} orderId - A rendelés azonosítója
 * @param {number} timestamp - Egy időbélyeg, pl. a jegy létrehozásának ideje (vagy a validUntil értéke)
 * @returns {string} - Az URL-ben használható token, amely tartalmazza a paramétereket és a signature-t.
 */
export function createTicketToken(ticketId, orderId, timestamp) {
  const secret = process.env.TICKET_SECRET;

  const data = `${ticketId}:${orderId}:${timestamp}`;
  // HMAC-SHA256 signature
  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");
  // token contains 3 parameters and signature
  return `${ticketId}/${orderId}/${timestamp}/${signature}`;
}

/**
 * Validálja a token-t.
 * @param {string} token - A token URL részét képező rész, pl. "ticketId/orderId/timestamp/signature"
 * @returns {boolean} - Igaz, ha a token érvényes, különben hamis.
 */
export function verifyTicketToken(token) {
  const secret = process.env.TICKET_SECRET;
  const parts = token.split("/");
  if (parts.length !== 4) return false;
  const [ticketId, orderId, timestamp, signature] = parts;
  const data = `${ticketId}:${orderId}:${timestamp}`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");
  return signature === expectedSignature;
}
