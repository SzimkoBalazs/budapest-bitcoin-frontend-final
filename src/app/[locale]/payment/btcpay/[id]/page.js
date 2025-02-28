// app/payment/btcpay/[id]/page.jsx
import { getOrder } from "@/app/actions/orders";
import { notFound } from "next/navigation";
import PayWithBtcpayButton from "./PayWithBtcpayButton";

export default async function BtcpayPaymentPage({ params }) {
  const { id, locale } = await params;
  const orderId = parseInt(id, 10);

  const order = await getOrder(orderId);
  if (!order) {
    return notFound();
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md mt-[100px] rounded-lg">
      <h1 className="text-2xl font-bold">Order Summary</h1>
      <p className="mt-2 text-gray-700">
        <strong>Email:</strong> {order.email}
      </p>

      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-semibold">Purchased Tickets</h2>
        <ul className="mt-2 space-y-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between border-b pb-2">
              <span>Ticket ID: {item.ticketId}</span>
              <span>
                {item.quantity} ×{" "}
                {locale === "en"
                  ? `${(item.priceAtPurchase / 100).toFixed(2)} EUR`
                  : `${(item.priceAtPurchase / 100).toFixed(2)} Ft`}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {order.coupon && (
        <div className="mt-4 bg-green-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-green-800">
            Discount Applied
          </h2>
          <p className="text-green-700">Code: {order.coupon.code}</p>
          <p className="text-green-700">
            Discount:{" "}
            {order.coupon.discountType === "FIXED"
              ? `-${(order.coupon.discountValue / 100).toFixed(2)} EUR`
              : `-${order.coupon.discountValue}%`}
          </p>
        </div>
      )}

      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold">Payment Details</h2>
        <p>
          <strong>Total:</strong>{" "}
          {locale === "en"
            ? `${(order.totalAmountInCents / 100).toFixed(2)} EUR`
            : `${(order.totalAmountInCents / 100).toFixed(2)} Ft`}
        </p>
        {order.discountInCents > 0 && (
          <p className="text-red-600">
            <strong>Discount:</strong>{" "}
            {locale === "en"
              ? `-${(order.discountInCents / 100).toFixed(2)} EUR`
              : `-${(order.discountInCents / 100).toFixed(2)} Ft`}
          </p>
        )}
        <p className="text-xl font-bold">
          <strong>Final Amount:</strong>{" "}
          {locale === "en"
            ? `${(order.finalAmountInCents / 100).toFixed(2)} EUR`
            : `${(order.finalAmountInCents / 100).toFixed(2)} Ft`}
        </p>
        <p>
          <strong>Payment Provider:</strong> {order.paymentProvider}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              order.status === "PENDING" ? "text-yellow-500" : "text-green-600"
            }
          >
            {order.status}
          </span>
        </p>
      </div>

      {/* Kliensoldali gomb komponens, ami elindítja a BTCPay invoice létrehozását */}
      <div className="mt-10">
        <PayWithBtcpayButton order={order} locale={locale} />
      </div>
    </div>
  );
}
