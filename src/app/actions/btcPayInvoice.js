"use server";

import logger from "../../../utils/logger";
import fs from "fs";
import path from "path";

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
    checkout: {
      redirectURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/${locale}/payment-success-btc?orderId=${order.id}`,
    },
    notificationURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/btcpay`,
    metadata: {
      orderId: order.id.toString(),
      email: order.email,
    },
  };

  logger.info(`Invoice Data: ${JSON.stringify(invoiceData, null, 2)}`);

  const apiEndpoint = `/api/v1/stores/${btcpayConfig.storeId}/invoices`;

  // Az invoice létrehozásához szükséges URL
  const url = `${btcpayConfig.apiUrl}`;

  try {
    logger.info(
      `Invoice létrehozása elindult: Order ID: ${order.id}, Amount: ${amount}, Currency: ${order.currency}`
    );
    // Fetch hívás a BTCPay API felé POST módszerrel
    const res = await fetch(url + apiEndpoint, {
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
      logger.error(
        `BTCPay invoice létrehozási hiba (HTTP ${res.status}): ${errorData}`
      );
      throw new Error(`BTCPay invoice létrehozási hiba: ${errorData}`);
    }
    // A válasz JSON-ként kerül feldolgozásra, amely tartalmazza az invoice URL-t és egyéb adatokat
    const data = await res.json();
    logger.info(`BTCPay invoice sikeresen létrejött: ${data.id}`);
    return data;
  } catch (error) {
    logger.error(`BTCPay invoice létrehozási hiba: ${error.stack}`);
    throw error;
  }
}
