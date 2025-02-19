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
    name: 'Your Bank Name',
    accountNumber: '11111111-11111111-11111111',
  },
  email: {
    replyToAddress: 'your-company@example.com',
    subject: 'Számla értesítő',
    message: 'Kedves Vásárlónk, mellékelve megtalálja a számláját.',
  },
  issuerName: 'Your Company Name',
});

// Add data from form
function createBuyer(orderData) {
  return new Buyer({
    name: orderData.buyerName,
    zip: orderData.zip || '0000',
    city: orderData.city || 'City',
    address: orderData.address || 'Address',
    taxNumber: orderData.taxNumber || undefined,
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
          netUnitPrice: item.netUnitPrice, // vagy grossUnitPrice, attól függően, mit szeretnél számolni
          comment: item.comment || '',
          unit: item.unit || 'db',
        }),
    );

    // Invoice létrehozása
    const invoice = new Invoice({
      paymentMethod: PaymentMethods.CreditCard,
      currency: Currencies.EUR,
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
