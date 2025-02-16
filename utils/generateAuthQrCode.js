// utils/generateAuthQrCode.js
import { createAuthToken } from "./createAuthToken";
import QRCode from "qrcode";

/**
 * Generál egy autentikációs QR kódot.
 * Nem vár "phone" adatot, így egyszerűen csak a token-t generálja és beágyazza egy URL-be.
 * @returns {Promise<string>} - A QR kód data URL.
 */
export async function generateAuthQrCode() {
  // Token létrehozása phone nélkül
  const token = createAuthToken();
  // Az URL, amelyre a QR kód mutat: az API végpont, ami beállítja a cookie-t.
  const url = `${
    process.env.NEXT_PUBLIC_SERVER_URL
  }/api/auth/qr-login?token=${encodeURIComponent(token)}`;
  // Generáljuk a QR kódot (data URL formátumban)
  const qrDataUrl = await QRCode.toDataURL(url);
  return qrDataUrl;
}
