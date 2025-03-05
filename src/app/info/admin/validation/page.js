"use client";

import { useState } from "react";
import { generateAuthQrCode } from "../../../../../utils/generateAuthQrCode";

export default function ValidationPage() {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateQr = async () => {
    setLoading(true);
    try {
      // Hívjuk meg a szerveroldali API végpontot, amely visszaadja a QR kódot
      const res = await fetch("/api/auth/qr-code");
      if (!res.ok) {
        throw new Error("Hiba történt a QR kód generálása során");
      }
      const data = await res.json();
      setQrCode(data.qrDataUrl);
    } catch (error) {
      console.error("QR kód generálási hiba:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ticket Validation</h1>
      <button
        onClick={handleGenerateQr}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? "Generating QR Code..." : "Generate Auth QR Code"}
      </button>
      {qrCode && (
        <div className="mt-6">
          <p className="mb-2">Scan this QR code to authenticate:</p>
          <img src={qrCode} alt="Authentication QR Code" className="mx-auto" />
        </div>
      )}
    </div>
  );
}
