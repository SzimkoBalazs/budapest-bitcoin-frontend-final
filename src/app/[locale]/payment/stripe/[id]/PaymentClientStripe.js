"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState, useEffect, use } from "react";

const PaymentClientStripe = ({ order, clientSecret, locale }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  return (
    <Elements
      options={{
        clientSecret,
        appearance: { theme: "stripe" },
        locale: locale || "en",
      }}
      stripe={stripePromise}
    >
      <Form
        priceInCents={order.finalAmountInCents}
        locale={locale}
        order={order}
      />
    </Elements>
  );
};

export default PaymentClientStripe;

function Form({ priceInCents, locale, order }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isPaid, setIsPaid] = useState(false);

  const [isPaymentElementLoaded, setIsPaymentElementLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (!elements) return;
    const interval = setInterval(() => {
      const paymentElem = elements.getElement(PaymentElement);
      if (paymentElem) {
        setIsPaymentElementLoaded(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [elements]);

  useEffect(() => {
    if (order.status === "PAID") {
      setIsPaid(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (stripe == null || elements == null) return;
    setIsLoading(true);

    if (!isPaymentElementLoaded) {
      setErrorMessage("Payment element is still loading. Please wait.");
      return;
    }

    setIsSubmitting(true);

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

      {!isPaymentElementLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-black"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </div>
      )}

      <button
        className="flex justify-center w-full items-center text-center text-white px-6 py-3 rounded-md border-[1px] bg-blue-700 border-blue-500 mt-4 disabled:bg-gray-600"
        disabled={!stripe || !elements || isLoading || isPaid}
      >
        {isPaid ? (
          "Order Paid"
        ) : isLoading ? (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          "Purchase"
        )}
      </button>
    </form>
  );
}
