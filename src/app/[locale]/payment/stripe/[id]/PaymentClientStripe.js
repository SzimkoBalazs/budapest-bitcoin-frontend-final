"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

const PaymentClientStripe = ({ order, clientSecret, locale }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form priceInCents={order.finalAmountInCents} locale={locale} />
    </Elements>
  );
};

export default PaymentClientStripe;

function Form({ priceInCents, locale }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    if (stripe == null || elements == null) return;
    setIsLoading(true);

    //Check for existing order
    console.log(
      "Return URL:",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${locale}/payment-success`
    );

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${locale}/payment-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occured");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <PaymentElement />
      <button
        className="flex justify-center w-full items-center text-center text-white px-6 py-3 rounded-md border-[1px] bg-blue-700 border-blue-500 mt-4 disabled:bg-gray-600"
        disabled={stripe == null || elements == null || isLoading}
      >
        {isLoading ? "Purchasing..." : `Purchase - ${priceInCents / 100}`}
      </button>
    </form>
  );
}
