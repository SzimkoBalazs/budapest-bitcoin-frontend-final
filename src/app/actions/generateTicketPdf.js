"use server";

import fs from 'fs/promises';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function generateTicketPdf(ticketData) {
  try {
    const ticketsDir = path.join(process.cwd(), "tickets");
    try {
      await fs.access(ticketsDir);
    } catch (e) {
      await fs.mkdir(ticketsDir);
    }

    const voucherId = Date.now();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const pdfFilePath = path.join(ticketsDir, `${voucherId}.pdf`);

    const pdfDoc = await PDFDocument.create();
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 🎨 Felső kép beágyazása (a public könyvtárból)
    const imagePath = path.join(
      process.cwd(),
      "public",
      "budapest_bitcoin_cover.jpeg"
    );
    const imageBytes = await fs.readFile(imagePath);
    const image = await pdfDoc.embedJpg(imageBytes);

    for (const item of ticketData.items) {
      for (let i = 0; i < item.quantity; i++) {
        const page = pdfDoc.addPage([595, 842]); // A4 méret

        const { width, height } = page.getSize();
        let yPosition = height - 50;

        // 🔹 Kép beszúrása az oldal tetejére
        const imageWidth = 500;
        const imageHeight = 100;
        page.drawImage(image, {
          x: (width - imageWidth) / 2,
          y: height - imageHeight - 20,
          width: imageWidth,
          height: imageHeight,
        });

        yPosition -= imageHeight + 40; // Mozgatás a kép alatt

        // 🔹 Bal oldali szöveg (jegyinformációk)
        page.drawText("Budapest Bitcoin Conference", {
          x: 50,
          y: yPosition,
          size: 22,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= 30;

        page.drawText(`Ticket: ${item.ticketName}`, {
          x: 50,
          y: yPosition,
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= 20;

        page.drawText("Validity: August 08, 2024 - August 09, 2024", {
          x: 50,
          y: yPosition,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // 🔹 QR-kód a jobb oldalon
        const qrBase64 = item.qrCodes[i].replace(
          /^data:image\/png;base64,/,
          ""
        );
        const qrBytes = Buffer.from(qrBase64, "base64");
        const qrImage = await pdfDoc.embedPng(qrBytes);

        const qrSize = 120;
        page.drawImage(qrImage, {
          x: width - qrSize - 50, // Jobb szélre igazítás
          y: yPosition - qrSize + 20,
          width: qrSize,
          height: qrSize,
        });

        // 🔹 Vízszintes vonal alul
        yPosition -= 60;
        page.drawLine({
          start: { x: 50, y: yPosition },
          end: { x: width - 50, y: yPosition },
          thickness: 1,
          color: rgb(0, 0, 0),
        });
      }
    }

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(pdfFilePath, pdfBytes);

    return {
      voucherId,
      pdfPath: path.join("tickets", `${voucherId}.pdf`),
      expiresAt,
    };
  } catch (error) {
    throw error;
  }
}
