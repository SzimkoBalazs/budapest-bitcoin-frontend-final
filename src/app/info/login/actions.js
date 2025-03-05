"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import prisma from "../../../../utils/db";
import bcrypt from "bcryptjs";

// ✅ Login validáció a Zod segítségével
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState, formData) {
  try {
    // 🛑 Validáció
    const result = loginSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors };
    }

    const { email, password } = result.data;

    // 🔍 Felhasználó lekérése az adatbázisból
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { errors: { email: ["Invalid email or password"] } };
    }

    // 🔑 Jelszó ellenőrzése bcrypt.compare segítségével
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { errors: { email: ["Invalid email or password"] } };
    }

    // ✅ Sikeres bejelentkezés → Session létrehozása
    await createSession(user.id);

    console.log("✅ User logged in:", user.email);
    return { redirectTo: "/info/admin" };
  } catch (error) {
    console.error("❌ Login error:", error);
    return { errors: { general: ["Something went wrong. Try again."] } };
  }
}

export async function logout() {
  await deleteSession();
  return { redirectTo: "/info/login" };
}
