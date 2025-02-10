import jwt from "jsonwebtoken";

/**
 * Létrehoz egy autentikációs token-t, amelyet a QR kódba ágyazhatsz.
 * @returns {string} - A token, mely 24 órára érvényes.
 */
export function createAuthToken() {
  const secret = process.env.AUTH_TOKEN_SECRET;
  const payload = {}; // Nincs extra adat
  // 24 órára érvényes token
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}
