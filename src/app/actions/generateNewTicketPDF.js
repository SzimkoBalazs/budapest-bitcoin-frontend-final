"use server";

import fs from "fs/promises";
import path from "path";
import { renderToStream } from "@react-pdf/renderer";
import TicketPdf from "./TicketPdf";

export async function generateNewTicketPdf(ticketData) {
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

    // 🚀 PDF generálása streamként
    const pdfStream = await renderToStream(
      <TicketPdf ticketData={ticketData} />
    );
    const pdfBuffer = await new Response(pdfStream).arrayBuffer();

    // 📂 Mentsd el a fájlt
    await fs.writeFile(pdfFilePath, Buffer.from(pdfBuffer));

    return {
      voucherId,
      pdfPath: path.join("tickets", `${voucherId}.pdf`),
      expiresAt,
    };
  } catch (error) {
    throw error;
  }
}
