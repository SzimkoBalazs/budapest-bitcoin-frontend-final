"use server";

import logger from "../../../utils/logger";
import fs from "fs";
import path from "path";

import {
  Client,
  Seller,
  Buyer,
  Invoice,
  Item,
  PaymentMethods,
  Currencies,
  Languages,
} from "szamlazz.js";

/**
 * IMPORTANT (Next build safety):
 * Next may evaluate route modules during `next build` (route data collection).
 * If we instantiate `szamlazz.js` Client at module scope and env vars are missing,
 * it can crash the build. Keep initialization lazy and validate env at call-time.
 */
let _szamlazzClient;

function getSzamlazzClient() {
  if (_szamlazzClient) return _szamlazzClient;

  const authToken = process.env.SZAMLAZZ_AGENT_KEY;
  const user = process.env.SZAMLAZZ_USERNAME;
  const password = process.env.SZAMLAZZ_PASSWORD;

  if (!authToken && !(user && password)) {
    throw new Error(
      "Missing Számlázz.hu credentials. Set either SZAMLAZZ_AGENT_KEY or both SZAMLAZZ_USERNAME and SZAMLAZZ_PASSWORD."
    );
  }

  // Some szamlazz.js versions assert on missing `user` even when authToken is used,
  // so pass it if available.
  const options = {
    ...(authToken ? { authToken } : { user, password }),
    ...(user ? { user } : {}),
    eInvoice: true,
    requestInvoiceDownload: true,
    timeout: 5000,
  };

  _szamlazzClient = new Client(options);
  return _szamlazzClient;
}

const seller = new Seller({
  bank: {
    name: "Raiffeisen Bank",
    accountNumber: "HU17120107210202845600100000",
  },
  email: {
    replyToAddress: "hello@budapestbitcoin.com",
    subject: "Invoice Notification",
    message:
      "Dear Customer, your invoice is attached for your review. Thank you for choosing our service.",
  },
  issuerName: "Road 21 Limited",
});

// Add data from form
function createBuyer(orderData) {
  return new Buyer({
    name: orderData.buyerName || orderData.email,
    zip: orderData.zip || "0000",
    city: orderData.city || "N/A",
    address: orderData.address || "N/A",
    taxNumber: orderData.taxNumber || "",
  });
}

export async function createInvoice(orderData) {
  try {
    logger.info(`📄 Szamla keszitese elindult.`);

    // 🔍 Bemeneti adatok loggolása
    logger.info(`Bemeneti adatok: ${JSON.stringify(orderData, null, 2)}`);
    // Buyer objektum létrehozása
    const buyer = createBuyer(orderData);

    // Invoice Items létrehozása a orderData.items alapján
    const items = orderData.items.map(
      (item) =>
        new Item({
          label: item.label,
          quantity: item.quantity,
          vat: item.vat,
          grossUnitPrice: parseFloat(item.grossUnitPrice), // String -> Number

          comment: item.comment || "",
          unit: item.unit || "pcs",
        })
    );

    // Invoice létrehozása
    const invoice = new Invoice({
      paymentMethod: PaymentMethods.CreditCard,
      currency:
        orderData.currency.toUpperCase() === "EUR"
          ? Currencies.EUR
          : Currencies.HUF,
      language: Languages.English,
      seller: seller,
      buyer: buyer,
      items: items,
      noNavReport: undefined, // ha nem akarod NAV felé jelenteni a számlát
      prepaymentInvoice: false,
    });

    logger.info(
      `🔧 Számla objektum előkészítve: ${JSON.stringify(invoice, null, 2)}`
    );

    // Számla kibocsátása
    const szamlazzClient = getSzamlazzClient();
    const result = await szamlazzClient.issueInvoice(invoice);
    console.log("Invoice issued:", result);
    let invoiceFilePath;
    let relativeInvoicePath;
    if (result.pdf) {
      const invoicesFolder = path.join(process.cwd(), "invoices");

      if (!fs.existsSync(invoicesFolder)) {
        fs.mkdirSync(invoicesFolder);
      }
      // Fájl név: invoice_order_<orderId>.pdf
      const orderId = orderData.orderID || orderData.Id;
      const invoiceFilename = `invoicefor_${orderId}.pdf`;
      invoiceFilePath = path.join(invoicesFolder, invoiceFilename);
      fs.writeFileSync(invoiceFilePath, result.pdf);
      logger.info(`Invoice PDF saved at ${invoiceFilePath}`);
      relativeInvoicePath = path.join("invoices", invoiceFilename);
    } else {
      logger.error("Invoice result does not contain a PDF.");
    }
    return { ...result, invoiceFilePath: relativeInvoicePath }; // result tartalmazza az invoiceId, netTotal, grossTotal, customerAccountUrl, pdf (Buffer) stb.
  } catch (error) {
    logger.error(`🚨 Hiba a számla létrehozásakor: ${error.message}`, {
      stack: error.stack,
    });
    throw error;
  }
}
