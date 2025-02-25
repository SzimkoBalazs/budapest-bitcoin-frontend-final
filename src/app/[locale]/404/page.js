import React from 'react';
import GetYourPassCTAButton from '@/components/GetYourPassCTAButton';

async function fetchErrorPageData(locale) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/error-404?locale=${locale}`);

  if (!res.ok) {
    throw new Error("Failed to fetch checkout data page's data");
  }

  const data = await res.json();
  return data.data || [];
}

export default async function PageNotFound({ params }) {
  const { locale } = await params;
  const errorText = await fetchErrorPageData(locale);

  return (
    <div className="gap-y-10 flex flex-col w-full h-full items-center justify-center">
      <div>
        <h2
          className="font-exo text-center font-black text-[48px] sm:text-[240px] text-white"
          style={{ lineHeight: '100%' }}
        >
          404
        </h2>
        <p className="font-exo font-bold text-white text-center text-[32px]">{errorText.title}</p>
        <p className="font-exo font-normal text-white/80 text-center text-[18px]">
          {errorText.subtitle}
        </p>
      </div>
      <GetYourPassCTAButton href={`home-page`} buttonText={errorText.buttonText} />
    </div>
  );
}
