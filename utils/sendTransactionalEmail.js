"use server";

export async function sendTransactionalEmail(order, qrCodes) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_TRANSACTIONAL_TEMPLATE_ID = "your_template_id_here";

  if (!BREVO_API_KEY) {
    throw new Error("Brevo API key is missing.");
  }

  const ticketDetails = order.items
    .map(
      (item) =>
        `- ${item.quantity}x Ticket (ID: ${item.ticketId}), Price: ${
          item.priceAtPurchase / 100
        } EUR`
    )
    .join("\n");

  const qrCodeHtml = qrCodes
    .map((qr) => `<img src="${qr}" alt="Ticket QR Code" width="150"/>`)
    .join("<br>");

  const emailPayload = {
    sender: { email: "info@bitcoinconf.com", name: "Bitcoin Conference" },
    to: [{ email: order.email }],
    templateId: parseInt(BREVO_TRANSACTIONAL_TEMPLATE_ID, 10),
    params: {
      email: order.email,
      ticket_details: ticketDetails,
      qr_codes: qrCodeHtml,
      total_amount: (order.finalAmountInCents / 100).toFixed(2) + " EUR",
    },
  };

  const response = await fetch(`${process.env.BREVO_API_URL}/smtp/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    console.error("❌ Email sending failed:", await response.json());
    throw new Error("Failed to send email.");
  }

  console.log("✅ Email sent successfully!");
}
