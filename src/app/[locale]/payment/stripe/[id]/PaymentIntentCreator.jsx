// "use client";

// import { useState, useEffect } from "react";
// import PaymentClientStripe from "./PaymentClientStripe";
// import { useRouter } from "next/navigation";

// export default function PaymentIntentCreator({ order, locale, buttonText, currency }) {
//   const [clientSecret, setClientSecret] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   async function createPaymentIntent() {
//     setIsLoading(true);
//     setError(null);
//     let additionalData = {};
//     try {

//       const invoiceData = JSON.parse(localStorage.getItem("invoiceData"));
//       const formData = JSON.parse(localStorage.getItem("formData"));
//       if (invoiceData && invoiceData.invoiceNeeded) {
//         additionalData = invoiceData;
//       } else if (formData) {
//         additionalData = formData;
//       }
//     } catch (err) {
//       console.error("Error reading additional data from localStorage:", err);
//     }
//     try {
//       const res = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           orderId: order.id,
//           amount: order.finalAmountInCents,
//           currency: order.currency,
//           additionalData,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok && data.clientSecret) {
//         setClientSecret(data.clientSecret);
//       } else {
//         setError(data.error || "Failed to create PaymentIntent");
//       }
//     } catch (err) {
//       console.error("Error in createPaymentIntent:", err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     createPaymentIntent();
//   }, []);

//   if (isLoading) return <div>Loading payment...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!clientSecret) return <div>No payment intent available</div>;

//   return <PaymentClientStripe order={order} clientSecret={clientSecret} locale={locale} buttonText={buttonText} currency={currency} />;
// }
