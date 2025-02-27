// sendReminderEmail.js
export async function sendReminderEmail(order, reminderType) {
    // Példa: A Brevo transactional email API endpointja
    const BREVO_API_URL = process.env.BREVO_API_URL;
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_REMINDER_TEMPLATE_ID = process.env.BREVO_REMINDER_TEMPLATE_ID; 
  
    if (!BREVO_API_KEY || !BREVO_REMINDER_TEMPLATE_ID) {
      throw new Error("Missing Brevo configuration.");
    }
  
    // Állítsd össze a payloadot
    const emailPayload = {
      to: [{ email: order.email }],
      templateId: parseInt(BREVO_REMINDER_TEMPLATE_ID, 10),
      params: {
        reminderType, 
        orderId: order.id,
       
      },
    };
  
    const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(emailPayload),
    });
  
    if (!res.ok) {
      const errorResponse = await res.text();
      throw new Error(`Failed to send reminder email: ${errorResponse}`);
    }
    return await res.json();
  }
  