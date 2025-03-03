"use client";

import { useEffect, useState } from "react";

export default function PaymentStatusPoller({ orderId, pollInterval = 5000 }) {
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(`/api/order-status?orderId=${orderId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch order status");
        }
        const data = await res.json();
        setOrderStatus(data.status);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch order status", err);
        setError(err.message);
      }
    }

    // Indítsd el az első lekérdezést
    fetchStatus();
    // Majd pollolj időközönként
    const intervalId = setInterval(fetchStatus, pollInterval);
    return () => clearInterval(intervalId);
  }, [orderId, pollInterval]);

  if (loading) return <p>Loading order status...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-4">
      <p className="text-white">Order status: {orderStatus}</p>
    </div>
  );
}
