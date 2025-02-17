'use client';

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { PaymentProvider } from '@prisma/client';
import { priceWithSpace } from '../../../../../../utils/priceWithSpace';
import SpinningLoader from '@/components/SpinningLoader';
import PayButton from '@/components/Buttons/PayButton';

const PaymentClientStripe = ({ order, clientSecret, locale, buttonText, currency }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form
        priceInCents={order.finalAmountInCents}
        locale={locale}
        buttonText={buttonText}
        currency={currency}
      />
    </Elements>
  );
};

export default PaymentClientStripe;

function Form({ priceInCents, locale, buttonText, currency }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    if (stripe == null || elements == null) return;
    setIsLoading(true);

    //Check for existing order
    console.log('Return URL:', `${process.env.NEXT_PUBLIC_SERVER_URL}/${locale}/payment-success`);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${locale}/payment-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occured');
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <PaymentElement />
      <div className="flex w-full justify-center mt-12">
        <PayButton
          isCardPayment={true}
          text={`${buttonText} - ${priceWithSpace(priceInCents)} ${currency}`}
          disabled={stripe == null || elements == null || isLoading}
        >
          {isLoading ? (
            <SpinningLoader />
          ) : (
            `${buttonText} - ${priceWithSpace(priceInCents)} ${currency}`
          )}
        </PayButton>
      </div>

      {/*<button*/}
      {/*  className="flex justify-center w-full items-center text-center font-bold text-white px-6 py-3 rounded-md border-[1px] bg-secondary-600 hover:bg-secondary-500 active:backdrop-invert mt-4 disabled:bg-secondary-600/80"*/}
      {/*  disabled={stripe == null || elements == null || isLoading}*/}
      {/*  style={{ boxShadow: '0px 4px 0px 0px rgba(0,0,0,1)' }}*/}
      {/*>*/}
      {/*  {isLoading ? (*/}
      {/*    <SpinningLoader />*/}
      {/*  ) : (*/}
      {/*    `${buttonText} - ${priceWithSpace(priceInCents)} ${currency}`*/}
      {/*  )}*/}
      {/*</button>*/}
    </form>
  );
}
