"use server";

export async function sendTransactionalEmail(order, downloadUrl, pdf) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_TRANSACTIONAL_TEMPLATE_ID =
    process.env.BREVO_TRANSACTIONAL_TEMPLATE_ID;

  if (!BREVO_API_KEY || !BREVO_TRANSACTIONAL_TEMPLATE_ID) {
    throw new Error("Brevo API key vagy Template ID hiányzik.");
  }

  const base64Pdf = pdf.toString("base64");

  const emailPayload = {
    to: [{ email: order.email }],
    templateId: parseInt(BREVO_TRANSACTIONAL_TEMPLATE_ID, 10),
    params: {
      email: order.email,
      download_url: downloadUrl,
      // Egyéb sablon paraméterek, például fizetési összeg, jegy adatok stb.
    },
    attachment: [
      {
        name: "invoice.pdf",
        content: base64Pdf,
      },
    ],
  };

  try {
    const response = await fetch(`${process.env.BREVO_API_URL}/smtp/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(emailPayload),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("❌ Email küldés sikertelen:", errorResponse);
      throw new Error("Nem sikerült elküldeni az e-mailt.");
    }
    console.log("✅ Email sikeresen elküldve!");
  } catch (error) {
    console.error("Hiba történt az e-mail küldés során:", error);
  }
}
