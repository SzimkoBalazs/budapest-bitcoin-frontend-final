// utils/generateQrCode.js
import QRCode from "qrcode";

/**
 * Generál egy QR kód data URL-t a megadott URL-ből.
 * @param {string} url - Az URL, amit a QR kódnak tartalmaznia kell.
 * @returns {Promise<string>} - A QR kód data URL.
 */
export async function generateQrCode(url) {
  try {
    const dataUrl = await QRCode.toDataURL(url);
    return dataUrl;
  } catch (error) {
    console.error("QR code generation error:", error);
    throw error;
  }
}
