"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function BtcpayPage() {
  const router = useRouter();
  const params = useParams();
  const { id, locale } = params;
  const [error, setError] = useState(null);

  useEffect(() => {
    async function createInvoice() {
      try {
        const res = await fetch(
          `/api/create-btcpay-invoice?orderId=${id}&locale=${locale}`
        );
        if (!res.ok) throw new Error("Hiba az invoice létrehozása során");
        const data = await res.json();
        // Az invoice URL-t használjuk az átirányításhoz
        router.push(data.checkoutLink || data.url);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }
    if (id && locale) {
      createInvoice();
    }
  }, [id, locale, router]);

  if (error) {
    return <div className="p-6 text-red-600">Hiba: {error}</div>;
  }
  return <div className="p-6">Fizetés előkészítése...</div>;
}
