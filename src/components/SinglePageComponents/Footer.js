import React from 'react';
import StayUpdatedForm from '../StayUpdatedForm';
import GetInTouch from '../GetInTouch';
import ContentWrapper from '@/utilities/ContentWrapper';
import BTCBudapestLogo from '@/components/BTCBudapestLogo';

async function fetchFooterData(locale) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footer?locale=${locale}`);

  if (!res.ok) {
    throw new Error("Failed to fetch footer section's data");
  }

  const data = await res.json();
  return data.data || [];
}

const Footer = async ({ locale }) => {
  const actualLocale = locale ? locale : "en";
  const partnerUsSectionData = await fetchFooterData(actualLocale);
  return (
    <div
      id="contact"
      className="flex flex-col items-center gap-y-[56px] gl:gap-y-[56px] w-full justify-center border-neutral-900 border-t-[4px] pt-[80px]"
      style={{
        background: `url('/bitcoin_background.svg')`,
        backgroundSize: '10%',
        backgroundColor: 'black',
      }}
    >
      <div className="flex flex-col gl:flex-row items-center gl:justify-between gl:items-start w-full max-w-[1128px] px-4 sm:px-10 gap-[56px]">
        <StayUpdatedForm data={partnerUsSectionData} locale={locale} />
        <GetInTouch data={partnerUsSectionData} locale={locale} />
      </div>
      <div
        className="flex flex-col gap-y-4 items-center w-full justify-center max-w-[400px] py-10"
        style={{ borderTop: '2px solid #4d4d4d' }}
      >
        <div className="w-[156px]">
          <BTCBudapestLogo />
        </div>
        <p className="text-neutral-300 font-exo text-[12px] font-medium leading-normal">
          {partnerUsSectionData.FooterBrandName}
        </p>
      </div>
    </div>
  );
};

export default Footer;
