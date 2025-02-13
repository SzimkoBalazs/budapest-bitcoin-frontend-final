// app/api/download-ticket/route.js
import { promises as fs } from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import prisma from "../../../../utils/db";

export async function GET(request) {
  // A URL-ből kiolvassuk a query paramétereket
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) {
    return new Response(JSON.stringify({ error: "Hiányzó token" }), {
      status: 400,
    });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_DOWNLOAD_SECRET);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Érvénytelen vagy lejárt token" }),
      { status: 403 }
    );
  }

  const voucherId = payload.voucherId;
  if (!voucherId) {
    return new Response(JSON.stringify({ error: "Érvénytelen token adat" }), {
      status: 400,
    });
  }
  console.log("VoucherId from token:", voucherId, typeof voucherId);

  // Lekérdezzük a voucher rekordot az adatbázisból
  const voucher = await prisma.voucher.findUnique({
    where: { id: BigInt(voucherId) },
  });
  console.log("Voucher from DB:", voucher);
  if (!voucher) {
    return new Response(JSON.stringify({ error: "Voucher nem található" }), {
      status: 404,
    });
  }

  // Ellenőrizzük, hogy a voucher nem járt-e le
  if (new Date(voucher.expiresAt) < new Date()) {
    return new Response(JSON.stringify({ error: "A letöltési link lejárt" }), {
      status: 403,
    });
  }

  const pdfFilePath = path.join(process.cwd(), voucher.pdfPath);
  try {
    await fs.access(pdfFilePath);
    const pdfBuffer = await fs.readFile(pdfFilePath);
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="ticket-${voucherId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF letöltési hiba:", error);
    return new Response(JSON.stringify({ error: "Hiba a PDF letöltésekor" }), {
      status: 500,
    });
  }
}
