'use client';

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState, useEffect } from 'react';
import { priceWithSpace } from '../../../../../../utils/priceWithSpace';
import SpinningLoader from '@/components/SpinningLoader';
import PayButton from '@/components/Buttons/PayButton';

const PaymentClientStripe = ({ order, clientSecret, locale, buttonText, currency }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  return (
    <Elements
      options={{
        clientSecret,
        appearance: { theme: 'stripe' },
        locale: locale || 'en',
      }}
      stripe={stripePromise}
    >
      <Form
        priceInCents={order.finalAmountInCents}
        locale={locale}
        buttonText={buttonText}
        currency={currency}
        order={order}
      />
    </Elements>
  );
};

export default PaymentClientStripe;

function Form({ priceInCents, locale, buttonText, currency, order }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isPaid, setIsPaid] = useState(false);

  const [isPaymentElementLoaded, setIsPaymentElementLoaded] = useState(false);

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
    if (order.status === 'PAID') {
      setIsPaid(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (stripe == null || elements == null) return;
    setIsLoading(true);

    if (!isPaymentElementLoaded) {
      setErrorMessage('Payment element is still loading. Please wait.');
      return;
    }

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
      <div className="flex w-full justify-center mt-12">
        <PayButton
          isCardPayment={true}
          text={`${buttonText} - ${priceWithSpace(priceInCents)} ${currency}`}
          disabled={!stripe || !elements || isLoading || isPaid}
        >
          {isPaid ? (
            'Order Paid'
          ) : isLoading ? (
            <SpinningLoader />
          ) : (
            `${buttonText} - ${priceWithSpace(priceInCents, locale !== 'hu')} ${currency}`
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
