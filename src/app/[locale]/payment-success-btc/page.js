import { notFound } from 'next/navigation';
import React from 'react';
import prisma from '@/utils/db';
import ContentWrapper from '@/utilities/ContentWrapper';
import LikeBitcoin from '../../../../public/like_bitcoin.svg';
import Image from 'next/image';
import { getOrder } from '@/app/actions/orders';

async function fetchSuccessData(locale) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/successful-payment?locale=${locale}`,
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch ticket section's data");
    }
  
    const data = await res.json();
    return data.data || [];
  }

export default async function BTCPaySuccessPage({ searchParams, params }) {
    const { locale } = await params;
    const successText = await fetchSuccessData(locale);

  // Feltételezzük, hogy a redirect URL-ben a BTCPay a orderId-t is átadja, például ?orderId=123
  const orderId = searchParams.get('orderId');
  if (!orderId) return notFound();

  const order = await getOrder(parseInt(orderId, 10));
  if (!order) return notFound();

  const isSuccess = order.status === 'PAID';

  return (
    <ContentWrapper className="mt-[80px] sm:mt-[120px]" maxWidth="max-w-[800px]">
      {isSuccess ? (
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h1 className="text-white font-exo text-[32px] sm:text-[48px] font-black">
              {successText.successfulPayment}
            </h1>
            <h2 className="text-white font-exo text-[20px] sm:text-[24px] font-normal">
              Your payment was successful! Thank you for your order.
            </h2>
          </div>
          <div className="flex flex-col gap-y-4 xxs:gap-y-0 xxs:flex-row justify-between">
            <div className="flex flex-col gap-y-2 xxs:gap-y-4">
              <div className="flex flex-col xxs:gap-y-1 mt-4 xxs:mt-8">
                <h3 className="text-white/80 font-exo text-[18px] font-normal">Order ID:</h3>
                <h3 className="text-white font-exo text-[18px] font-bold">{order.id}</h3>
              </div>
              <div className="flex flex-col xxs:gap-y-1">
                <h4 className="text-white/80 font-exo text-[18px] font-normal">
                  A confirmation has been sent to:
                </h4>
                <h4 className="text-white font-exo text-[18px] font-bold">{order.email}</h4>
              </div>
            </div>
            <div className="flex justify-center">
              <Image src={LikeBitcoin} alt="Bitcoin likes this" width={200} />
            </div>
          </div>
          <div className="flex gap-x-2 mt-[20px] xxs:mt-[44px] flex-wrap justify-center">
            <h4 className="text-white font-exo text-[16px] text-center xxs:text-left font-normal">
              Need any help? Contact us at:
            </h4>
            <h4 className="text-white font-exo text-[16px] font-bold">info@yourdomain.com</h4>
          </div>
          {/* További információk megjeleníthetők itt, például jegyek adatai */}
        </div>
      ) : (
        <div>
          <h1 className="text-yellow-600 font-bold text-2xl">{successText.processing}</h1>
          {/* Itt opcionálisan elhelyezhetsz egy polling komponenst a státusz frissítéséhez */}
        </div>
      )}
    </ContentWrapper>
  );
}
