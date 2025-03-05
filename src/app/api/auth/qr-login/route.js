import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token hiányzik" }, { status: 400 });
  }
  const secret = process.env.AUTH_TOKEN_SECRET;
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (error) {
    return NextResponse.json(
      { error: "Érvénytelen vagy lejárt token" },
      { status: 400 }
    );
  }
  // Token valid, hitelesítő cookie beállítása
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const redirectUrl = new URL("/authorized-ticket-verification", baseUrl);
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set("auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400, // 24 óra
    path: "/",
  });
  return response;
}
