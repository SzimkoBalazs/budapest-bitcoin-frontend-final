"use server";

// Email validáció regex
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function subscribeToNewsletter(email) {
  if (!email || !isValidEmail(email)) {
    return {
      message: "Kérlek adj meg egy érvényes email címet!",
      success: false,
    };
  }

  try {
    const response = await fetch(`${process.env.BREVO_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(process.env.BREVO_LIST_ID, 10)],
        updateEnabled: true, // Ha az email már létezik, frissíti
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.code === "duplicate_parameter") {
        return { message: "Már fel vagy iratkozva!", success: false };
      }
      throw new Error("Feliratkozás sikertelen.");
    }

    return { message: "Sikeresen feliratkoztál!", success: true };
  } catch (error) {
    console.error("Hiba történt a feliratkozás során:", error.message);
    return {
      message: "Hiba történt a feliratkozás során, próbáld újra később.",
      success: false,
    };
  }
}
