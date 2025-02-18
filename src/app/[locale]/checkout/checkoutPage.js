"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createOrder } from "@/app/actions/orders";
import { validateCoupon } from "@/app/actions/coupon";
import { PaymentProvider } from "@prisma/client";
import { getTicketPrice } from "../../../../utils/getTicketPrice";

export default function CheckoutPage({ tickets }) {
  const router = useRouter();
  const { locale } = useParams();

  // ✅ Jegyek állapotának kezelése
  const [selectedTickets, setSelectedTickets] = useState(
    tickets.map((ticket) => ({ ...ticket, quantity: 0 }))
  );

  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [paymentProvider, setPaymentProvider] = useState(
    PaymentProvider.STRIPE
  );
  const [error, setError] = useState(null);

  const totalQuantity = selectedTickets.reduce(
    (sum, ticket) => sum + ticket.quantity,
    0
  );

  useEffect(() => {
    if (appliedCoupon) {
      const totalTickets = selectedTickets.reduce(
        (sum, ticket) => sum + ticket.quantity,
        0
      );
      if (totalTickets < appliedCoupon.minTicketsRequired) {
        setAppliedCoupon(null);
        setError(
          `A kuponhoz minimum ${appliedCoupon.minTicketsRequired} jegy szükséges.`
        );
      }
    }
  }, [selectedTickets, appliedCoupon]);

  const handlePaymentRedirect = async (order) => {
    if (order.paymentProvider === PaymentProvider.BTCPAY) {
      router.push(`/payment/btcpay/${order.id}`);
    } else if (order.paymentProvider === PaymentProvider.STRIPE) {
      router.push(`/payment/stripe/${order.id}`);
    }
  };

  // ✅ Subtotal számítás (összes jegy ára)
  const subtotal = selectedTickets.reduce((sum, ticket) => {
    const price = getTicketPrice(ticket, locale);
    return sum + price * ticket.quantity;
  }, 0);

  // ✅ Kedvezmény levonása, ha van érvényes kupon
  const discountAmount = appliedCoupon?.discountValue
    ? appliedCoupon.discountType === "FIXED"
      ? appliedCoupon.discountValue
      : (subtotal * appliedCoupon.discountValue) / 100
    : 0;

  // ✅ Végső összeg (nem lehet negatív)
  const finalTotal = Math.max(subtotal - discountAmount, 0);

  // ✅ Jegyek mennyiségének módosítása (helyes frissítés)
  const handleQuantityChange = (ticketId, change) => {
    setSelectedTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, quantity: Math.max(0, ticket.quantity + change) }
          : ticket
      )
    );
  };

  // ✅ Kupon ellenőrzése és alkalmazása (server action)
  const handleApplyCoupon = async () => {
    setError(null);

    try {
      const couponData = await validateCoupon(coupon, selectedTickets);
      if (!couponData || couponData.error) {
        throw new Error(couponData?.error || "Invalid coupon");
      }

      setAppliedCoupon(couponData);
    } catch (err) {
      setError(err.message);
      setAppliedCoupon(null);
    }
  };

  // ✅ Rendelés létrehozása
  const handleOrder = async () => {
    setError(null);

    console.log("🎟 Applied Coupon before sending order:", appliedCoupon);

    try {
      const items = selectedTickets
        .filter((ticket) => ticket.quantity > 0)
        .map((ticket) => ({
          id: ticket.id,
          quantity: ticket.quantity,
        }));

      if (items.length === 0)
        throw new Error("Please select at least one ticket.");
      if (!email.trim()) throw new Error("Email is required.");

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format.");
      }

      const orderData = {
        email,
        items,
        paymentProvider,
        coupon: appliedCoupon ? appliedCoupon.code : null,
        discountInCents: discountAmount,
        finalAmountInCents: finalTotal,
        locale: locale,
      };

      console.log("🚀 Sending order data:", orderData);

      const order = await createOrder(orderData);

      if (!order || order.error) {
        throw new Error(order?.error || "Order creation failed.");
      }

      handlePaymentRedirect(order);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md mt-[100px] rounded-lg">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {error && <p className="text-red-500">{error}</p>}

      <label className="block mt-4">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Enter your email"
      />

      {tickets.map((ticket) => (
        <div key={ticket.id} className="mt-4">
          <h2 className="text-lg font-semibold">
            {ticket.name} -{" "}
            {locale == "en"
              ? `${getTicketPrice(ticket, locale) / 100} EUR`
              : `${getTicketPrice(ticket, locale)} FT`}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleQuantityChange(ticket.id, -1)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              -
            </button>
            <span className="p-2">
              {selectedTickets.find((t) => t.id === ticket.id)?.quantity || 0}
            </span>
            <button
              onClick={() => handleQuantityChange(ticket.id, 1)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Kupon mező */}
      <div className="mt-6">
        <label className="block">Coupon Code:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter coupon code"
          />
          <button
            onClick={handleApplyCoupon}
            className={`px-4 py-2 rounded ${
              totalQuantity > 0
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={totalQuantity === 0}
          >
            Apply
          </button>
        </div>
        {appliedCoupon && (
          <p className="text-green-600 mt-2">
            ✅ Coupon applied: {appliedCoupon.code} (-
            {locale === "hu"
              ? `${discountAmount} FT`
              : `${(discountAmount / 100).toFixed(2)} EUR`}
            )
          </p>
        )}
      </div>

      {/* Subtotal */}
      <h2 className="text-lg font-semibold mt-4">
        Subtotal:{" "}
        {locale === "en"
          ? `${(subtotal - discountAmount) / 100} EUR`
          : `${subtotal - discountAmount} FT`}
      </h2>

      {/* Fizetési lehetőségek */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Select Payment Method</h2>
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => setPaymentProvider(PaymentProvider.BTCPAY)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Pay with Bitcoin (BTCPay)
          </button>
          <button
            onClick={() => setPaymentProvider(PaymentProvider.STRIPE)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Pay with Card (Stripe)
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="flex mt-5 justify-center border-2 border-red-400 text-black px-6 py-2"
            onClick={handleOrder}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
