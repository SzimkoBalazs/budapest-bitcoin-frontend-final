import { getOrder } from "@/app/actions/orders";
import PaymentClientStripe from "./PaymentClientStripe";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function PaymentPage({ params }) {
  const { id } = await params;
  const { locale } = await params;

  if (!id) {
    return <div className="text-red-500">❌ Invalid Order ID</div>;
  }

  let order;
  try {
    order = await getOrder(id);
    console.log("🟢 Order received:", order);
  } catch (err) {
    return <div className="text-red-500">❌ Error: {err.message}</div>;
  }

  if (
    order.status === "PENDING" ||
    order.status === "FAILED" ||
    order.status === "CANCELLED"
  ) {
  }

  console.log("stripe final amount", order.finalAmountInCents);
  console.log("orders currency: ", order.currency);
  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: order.finalAmountInCents,
      currency: order.currency.toLowerCase(),
      metadata: { orderId: order.id },
    },
    {
      idempotencyKey: `order_${order.id}`,
    }
  );

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md mt-[100px] rounded-lg">
      <h1 className="text-2xl font-bold">Order Summary</h1>

      {/* Email */}
      <p className="mt-2 text-gray-700">
        <strong>Email:</strong> {order.email}
      </p>

      {/* Order Items */}
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
                  : `${item.priceAtPurchase} Ft`}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Coupon Section */}
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

      {/* Payment Info */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold">Payment Details</h2>
        <p>
          <strong>Total:</strong>{" "}
          {locale === "en"
            ? `${(order.totalAmountInCents / 100).toFixed(2)} EUR`
            : `${order.totalAmountInCents} Ft`}
        </p>
        {order.discountInCents > 0 && (
          <p className="text-red-600">
            <strong>Discount:</strong> -
            {locale === "en"
              ? `${(order.discountInCents / 100).toFixed(2)} EUR`
              : `${order.discountInCents} Ft`}
          </p>
        )}
        <p className="text-xl font-bold">
          <strong>Final Amount:</strong>{" "}
          {locale === "en"
            ? `${(order.finalAmountInCents / 100).toFixed(2)} EUR`
            : `${order.finalAmountInCents} Ft`}
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
      <div className="mt-10">
        <PaymentClientStripe
          order={order}
          clientSecret={paymentIntent.client_secret}
          locale={locale}
        />
      </div>
    </div>
  );
}
