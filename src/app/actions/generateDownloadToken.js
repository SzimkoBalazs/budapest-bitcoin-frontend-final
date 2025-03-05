"use server";
import jwt from "jsonwebtoken";

export async function generateDownloadToken(voucherId, expiresAt) {
  console.log("generateDownloadToken params:", { voucherId, expiresAt });
  if (voucherId == null) {
    throw new Error("voucherId is required");
  }
  if (!expiresAt || typeof expiresAt.toISOString !== "function") {
    throw new Error("expiresAt must be a valid Date");
  }
  const payload = { voucherId, expiresAt: expiresAt.toISOString() };
  console.log("JWT payload:", payload);
  const secret = process.env.JWT_DOWNLOAD_SECRET;
  return jwt.sign(payload, secret, { expiresIn: "365d" });
}
