const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Ellenőrzi, hogy az email helyes formátumú-e.
 * @param {string} email - Az ellenőrizendő email cím
 * @returns {boolean} - Az email helyességének állapota
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Hírlevél feliratkozás API hívás
 * @param {string} email - A felhasználó email címe
 * @returns {Promise<{message: string, success: boolean}>} - A válasz üzenete és állapota
 */
export const subscribeToNewsletter = async (email) => {
  if (!isValidEmail(email)) {
    return { message: "Kérlek érvényes email címet adj meg!", success: false };
  }
  try {
    const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Feliratkozás sikertelen. Kérlek próbáld újra később!");
    }

    const data = await response.json();
    return { message: data.message, success: true };
  } catch (error) {
    console.error("Hiba a feliratkozás során:", error.message);
    return { message: error.message, success: false };
  }
};
