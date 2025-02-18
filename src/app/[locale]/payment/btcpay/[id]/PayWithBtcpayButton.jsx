"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@prisma/client";

export default function PayWithBtcpayButton({ order, locale }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const orderId = order.id;

  if (order.status === OrderStatus.PAID) {
    setIsPaid(true);
  }

  async function handlePay() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/create-btcpay-invoice?orderId=${orderId}&locale=${locale}`
      );
      if (!res.ok) throw new Error("Invoice creation failed");
      const data = await res.json();
      // Átirányítás a BTCPay checkout linkre
      router.push(data.checkoutLink || data.url);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {error && <p className="text-red-600 mb-2">Error: {error}</p>}
      <button
        onClick={handlePay}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-500"
        disabled={isLoading || isPaid}
      >
        {isLoading ? "Processing..." : "Pay with BTCPay"}
      </button>
    </div>
  );
}
