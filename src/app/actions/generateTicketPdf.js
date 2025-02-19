// app/actions/generateTicketPdfPdfLib.js
'use server';

import fs from 'fs/promises';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function generateTicketPdf(ticketData) {
  try {
    // 1. Ellenőrizzük, hogy létezik-e a "tickets" mappa, ha nem, létrehozzuk.
    const ticketsDir = path.join(process.cwd(), 'tickets');
    try {
      await fs.access(ticketsDir);
    } catch (e) {
      await fs.mkdir(ticketsDir);
    }

    // 2. Generálunk egy voucherId-t és beállítjuk a lejárati időt (24 óra múlva)
    // → A voucherId itt kizárólag a PDF fájl egyedi azonosítására szolgál,
    //    például a fájl nevének részeként és a letöltési link generálásánál.
    //    Ha az adatbázisodban autoincrement mező van, az arra a tároláshoz jó,
    //    de itt egy egyszerű, egyedi azonosítóként Date.now() használata megoldás.
    const voucherId = Date.now();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const pdfFilePath = path.join(ticketsDir, `${voucherId}.pdf`);

    // 3. Hozzuk létre a PDF dokumentumot a pdf‑lib segítségével
    const pdfDoc = await PDFDocument.create();

    // 4. Használjuk a beépített Standard Helvetica fontot (nincs szükség egyéni font regisztrációra)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 5. Adjunk hozzá egy oldalt, és mértékeket kérjünk le
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Kezdő Y koordináta (figyelem: a pdf‑lib-ben az origin a bal alsó sarok)
    let yPosition = height - 50;

    // 6. Fejléc: "Jegy(ek)"
    page.drawText('Jegy(ek)', {
      x: 50,
      y: yPosition,
      size: 20,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 30;

    // 7. Order adatok: Rendelés azonosító és Ügyfél e-mail
    page.drawText(`Rendelés azonosító: ${ticketData.orderId}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
    page.drawText(`Ügyfél: ${ticketData.email}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 30;

    // 8. Végigiterálunk a jegyek tömbjén
    for (const item of ticketData.items) {
      // Jegy neve (14pt) és aláhúzás szimulálása:
      const ticketText = `Jegy: ${item.ticketName}`;
      const textSize = 14;
      page.drawText(ticketText, {
        x: 50,
        y: yPosition,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      const textWidth = helveticaFont.widthOfTextAtSize(ticketText, textSize);
      page.drawLine({
        start: { x: 50, y: yPosition - 2 },
        end: { x: 50 + textWidth, y: yPosition - 2 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
      page.drawText(`Mennyiség: ${item.quantity}`, {
        x: 50,
        y: yPosition,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;

      // 9. QR kódok megjelenítése
      for (const qr of item.qrCodes) {
        // A QR kód dataURL-jét átalakítjuk byte tömbbé
        const base64Data = qr.replace(/^data:image\/png;base64,/, '');
        const qrBytes = Buffer.from(base64Data, 'base64');
        // Embedeljük a PNG képet
        const qrImage = await pdfDoc.embedPng(qrBytes);
        const qrWidth = 100;
        const qrHeight = 100;
        page.drawImage(qrImage, {
          x: 50,
          y: yPosition - qrHeight,
          width: qrWidth,
          height: qrHeight,
        });
        yPosition -= qrHeight + 10; // Térköz a képek között
      }

      // Vonalválasztó az egyes jegyek között
      page.drawLine({
        start: { x: 50, y: yPosition },
        end: { x: width - 50, y: yPosition },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
      // (Ha az oldal vége közelít, új oldalt is hozzáadhatsz – ez most nincs implementálva)
    }

    // 10. A PDF-et bájt tömbként mentjük
    const pdfBytes = await pdfDoc.save();
    // Írjuk ki a PDF-et a "tickets" mappába
    await fs.writeFile(pdfFilePath, pdfBytes);

    return {
      voucherId,
      pdfPath: path.join('tickets', `${voucherId}.pdf`), // relatív út a projekt gyökeréhez képest
      expiresAt,
    };
  } catch (error) {
    throw error;
  }
}
