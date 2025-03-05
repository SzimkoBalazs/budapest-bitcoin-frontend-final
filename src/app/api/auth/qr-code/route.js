import { NextResponse } from "next/server";
import { generateAuthQrCode } from "../../../../../utils/generateAuthQrCode";

export async function GET(req) {
  try {
    const qrDataUrl = await generateAuthQrCode();
    return NextResponse.json({ qrDataUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
