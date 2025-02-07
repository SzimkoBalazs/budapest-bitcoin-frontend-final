import { i18nRouter } from "next-i18n-router";
import i18nConfig from "../i18nConfig";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/info/lib/session";

const protectedRoutes = ["/info/admin"];
const publicRoutes = ["/info/login"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  console.log("Middleware fut path:", path);

  // 1️⃣ LOKALIZÁCIÓS MIDDLEWARE → Csak akkor fusson, ha NEM az `/info` route-on vagyunk
  if (!path.startsWith("/info") && !path.startsWith("/webhooks")) {
    console.log("Lokalizációs middleware fut");
    return i18nRouter(req, i18nConfig);
  }

  // 2️⃣ AUTENTIKÁCIÓS MIDDLEWARE → Csak akkor fusson, ha az `/info` route-on vagyunk
  if (path.startsWith("/info")) {
    console.log("Autentikációs middleware fut");

    // Használd a req.cookies-t a cookie értékének megszerzéséhez
    const cookie = req.cookies.get("session")?.value;

    let session = null;
    try {
      session = cookie ? await decrypt(cookie) : null;
    } catch (error) {
      console.error("Decryption error:", error);
    }

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    if (isProtectedRoute && !session?.userId) {
      console.log("Nincs jogosultság, átirányítás a login oldalra");
      return NextResponse.redirect(new URL("/info/login", req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
      console.log("Bejelentkezett user, átirányítás adminra");
      return NextResponse.redirect(new URL("/info/admin", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!info|webhooks|api|static|.*\\..*|_next).*)", // Lokalizációs middleware: mindenhol, kivéve az /info és egyéb kizárt útvonalak
    "/info/:path*", // Autentikációs middleware: csak az /info alatti útvonalakon
    "/payment/:path*",
    "/webhooks/:path*",
  ],
};
