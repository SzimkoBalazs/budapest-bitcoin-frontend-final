// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { OrderStatus } from "@prisma/client";
// import PayButton from "@/components/Buttons/PayButton";
// import {priceWithSpace} from "../../../../../../utils/priceWithSpace";
// import SpinningLoader from "@/components/SpinningLoader";

// export default function PayWithBtcpayButton({ order, locale, buttonText }) {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isPaid, setIsPaid] = useState(false);
//   const orderId = order.id;

//   if (order.status === OrderStatus.PAID) {
//     setIsPaid(true);
//   }

//   async function handlePay() {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(
//         `/api/create-btcpay-invoice?orderId=${orderId}&locale=${locale}`
//       );
//       if (!res.ok) throw new Error("Invoice creation failed");
//       const data = await res.json();
//       // Átirányítás a BTCPay checkout linkre
//       router.push(data.checkoutLink || data.url);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div>
//       {error && <p className="text-red-600 mb-2">Error: {error}</p>}
//       <PayButton
//           isCardPayment={false}
//           text={`${buttonText} - ${priceWithSpace(order.finalAmountInCents, true)} EUR`}
//           disabled={isLoading || isPaid}
//           onClick={handlePay}
//         >
//           {isPaid ? (
//             'Order Paid'
//           ) : isLoading ? (
//             <SpinningLoader />
//           ) : (
//             `${buttonText} - ${priceWithSpace(order.finalAmountInCents, true)} EUR`
//           )}
//         </PayButton>
//     </div>
//   );
// }
