"use server";

import { metadata } from "../[locale]/layout";

export async function createBtcpayInvoice(order, locale) {
  const btcpayConfig = {
    apiUrl: process.env.BTCPAY_API_URL,
    storeId: process.env.BTCPAY_STORE_ID,
    apiKey: process.env.BTCPAY_API_KEY,
  };

  const amount = (order.finalAmountInCents / 100).toFixed(2);

  // Invoice adatok összeállítása
  const invoiceData = {
    amount,
    currency: order.currency,
    orderId: order.id.toString(),

    redirectURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/payment/btcpay/${order.id}/success`,
    // A webhook URL, ahol a BTCPay visszaértesíti a fizetés állapotáról
    notificationURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/btcpay`,
    metadata: {
      orderId: order.id.toString(),
      email: order.email,
    },
  };

  // Az invoice létrehozásához szükséges URL
  const url = `${btcpayConfig.apiUrl}/stores/${btcpayConfig.storeId}/invoices`;

  try {
    // Fetch hívás a BTCPay API felé POST módszerrel
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `token ${btcpayConfig.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    // Ha a válasz nem OK, olvassuk ki az esetleges hibaszöveget
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`BTCPay invoice létrehozási hiba: ${errorData}`);
    }
    // A válasz JSON-ként kerül feldolgozásra, amely tartalmazza az invoice URL-t és egyéb adatokat
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("BTCPay invoice létrehozási hiba:", error.message);
    throw error;
  }
}
