'use server';

import {
  Client,
  Seller,
  Buyer,
  Invoice,
  Item,
  PaymentMethods,
  Currencies,
  Languages,
} from 'szamlazz.js';

const szamlazzClient = new Client({
  //   user: process.env.SZAMLAZZ_USERNAME,
  //   password: process.env.SZAMLAZZ_PASSWORD,
  authToken: '97039xbwy2gws4iv7yn4xk8cniuird56tyamat6gy3',
  eInvoice: true, // (ha elektronikus számlát szeretnél)
  requestInvoiceDownload: true, // PDF letöltés kérésének engedélyezése
  timeout: 5000,
});

const seller = new Seller({
  bank: {
    name: 'Raiffeisen Bank',
    accountNumber: 'HU17120107210202845600100000',
  },
  email: {
    replyToAddress: 'hello@budapestbitcoin.com',
    subject: 'Invoice Notification',
    message: 'Dear Customer, your invoice is attached for your review. Thank you for choosing our service.',
  },
  issuerName: 'Road 21 Limited',
});

// Add data from form
function createBuyer(orderData) {
  return new Buyer({
    name: orderData.buyerName || orderData.email,
    zip: orderData.zip || '',
    city: orderData.city || '',
    address: orderData.address || '',
    taxNumber: orderData.taxNumber || "",
  });
}

export async function createInvoice(orderData) {
  try {
    // Buyer objektum létrehozása
    const buyer = createBuyer(orderData);

    // Invoice Items létrehozása a orderData.items alapján
    const items = orderData.items.map(
      (item) =>
        new Item({
          label: item.label,
          quantity: item.quantity,
          vat: item.vat,
          grossUnitPrice: parseFloat(item.grossUnitPrice),   // String -> Number
          
          comment: item.comment || '',
          unit: item.unit || 'pcs',
        }),
    );

    // Invoice létrehozása
    const invoice = new Invoice({
      paymentMethod: PaymentMethods.CreditCard,
      currency: (orderData.currency).toUpperCase() === "EUR" ? Currencies.EUR : Currencies.HUF,
      language: Languages.English,
      seller: seller,
      buyer: buyer,
      items: items,
      noNavReport: undefined, // ha nem akarod NAV felé jelenteni a számlát
      prepaymentInvoice: false,
    });

    console.log(invoice);

    // Számla kibocsátása
    const result = await szamlazzClient.issueInvoice(invoice);
    console.log('Invoice issued:', result);
    return result; // result tartalmazza az invoiceId, netTotal, grossTotal, customerAccountUrl, pdf (Buffer) stb.
  } catch (error) {
    console.error('Hiba a számla létrehozásakor:', error.stack);
    throw error;
  }
}
