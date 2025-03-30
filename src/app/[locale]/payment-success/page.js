// import { notFound } from "next/navigation";
// import React from "react";
// import Stripe from "stripe";
// import Image from "next/image";
// import prisma from "../../../../utils/db";
// import LikeBitcoin from "../../../../public/like_bitcoin.svg";
// import ContentWrapper from "@/utilities/ContentWrapper";
// import PaymentStatusPoller from "./PaymentStatusPoller";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// async function fetchSuccessData(locale) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/successful-payment?locale=${locale}`
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch ticket section's data");
//   }

//   const data = await res.json();
//   return data.data || [];
// }

// export default async function SuccessPage({ searchParams, params }) {
//   // TODO: Itt majd vissza a ki komentelt reszeket
//   const { locale } = await params;
//   const successText = await fetchSuccessData(locale);
//   const resolvedParams = await searchParams;
//   const payment_intent = resolvedParams.payment_intent;
//   const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

//   if (paymentIntent.metadata.orderId == null) return notFound();

//   const order = await prisma.order.findUnique({
//     where: { id: parseInt(paymentIntent.metadata.orderId, 10) },
//     include: {
//       items: true,
//       payments: true,
//       coupon: true,
//     },
//   });
//   if (order == null) return notFound();

//   const isSuccess = paymentIntent.status === "succeeded";
//   // const isPaid = order.status === "PAID";

//   // TODO: Ide meg felvinni a forditasokat strapibol

//   return (
//     <ContentWrapper
//       className="mt-[80px] sm:mt-[120px]"
//       maxWidth={"max-w-[800px]"}
//     >
//       {isSuccess ? (
//         <div className="flex flex-col">
//           <div className="flex flex-col">
//             <h1 className="text-white font-exo text-[32px] sm:text-[48px] font-black">
//               {successText.successfulPayment}
//             </h1>
//             <h2 className="text-white font-exo text-[20px] sm:text-[24px] font-normal">
//               {successText.youAreIn}
//             </h2>
//           </div>

//           <div className="flex flex-col gap-y-4 xxs:gap-y-0 xxs:flex-row justify-between">
//             <div className="flex flex-col gap-y-2 xxs:gap-y-4">
//               <div className="flex flex-col xxs:gap-y-1 mt-4 xxs:mt-8 flex-wrap">
//                 <h3 className="text-white/80 font-exo text-[18px] font-normal">
//                   {successText.paymentId}
//                 </h3>
//                 <h3 className="text-white font-exo text-[18px] font-bold">
//                   {order.id}
//                 </h3>
//               </div>
//               <div className="flex flex-col xxs:gap-y-1 flex-wrap">
//                 <h4 className="text-white/80 font-exo text-[18px] font-normal">
//                   {successText.ticketSentTo}{" "}
//                 </h4>
//                 <h4 className="text-white font-exo text-[18px] font-bold">
//                   {order.email}
//                 </h4>
//               </div>
//             </div>
//             <div className="flex justify-center">
//               <Image
//                 src={LikeBitcoin}
//                 alt={"Bitcoin figure likes this"}
//                 width={200}
//               />
//             </div>
//           </div>

//           <div className="flex gap-x-2 mt-[20px] xxs:mt-[44px] flex-wrap justify-center">
//             <h4 className="text-white font-exo text-[16px] text-center xxs:text-left font-normal">
//               {successText.needHelp}
//             </h4>
//             <h4 className="text-white font-exo text-[16px] font-bold">
//               info@bitcoinbudapest.com
//             </h4>
//           </div>
//           {/* Itt megjeleníthetsz további információkat a rendelésről */}
//         </div>
//       ) : (
//         <>
//           <h1 className="text-yellow-600 font-bold text-2xl">
//             {successText.processing}
//           </h1>
//           <PaymentStatusPoller orderId={order.id} pollInterval={5000} />
//         </>
//       )}
//     </ContentWrapper>
//   );
// }
