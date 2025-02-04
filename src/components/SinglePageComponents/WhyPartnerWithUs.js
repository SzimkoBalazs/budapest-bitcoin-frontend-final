import ContentWrapper from "@/utilities/ContentWrapper";
import React from "react";
import SecondaryCTAButton from "../SecondaryCTAButton";
import WhyPartnerUsHODLSVG from "@/utilities/WhyPartnerUsHODLSVG";
import MainMediaPartnerSVG from "@/utilities/MainMediaPartnerSVG";
import SectionMainTitle from "@/components/SectionMainTitle";

async function fetchPartnerUsSectionData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/partner-us?locale=${locale}&populate=*`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch partner section's data");
  }

  const data = await res.json();
  return data.data || [];
}

const WhyPartnerWithUs = async ({ locale }) => {
  const partnerUsSectionData = await fetchPartnerUsSectionData(locale);
  return (
    <div
      id="partners"
      className="flex flex-col w-full items-center bg-neutral-950 pt-[56px] pb-[56px] scroll-mt-[40px] sm:scroll-mt-[80px]"
    >
      <ContentWrapper>
        <div className="flex w-full flex-col md:flex-row mx-auto mb-[80px] pb-[80px] pop:justify-between items-center pop:items-end self-stretch border-b-2 border-neutral-200">
          <div className="flex pop:pr-[16px] w-full md:w-[50%] flex-col items-center pop:items-start gap-[24px]">
            <div className="flex flex-col items-start gap-[64px] self-stretch">
              <div className="flex flex-col items-start">
                <SectionMainTitle
                  textTop={partnerUsSectionData.TitleTopText}
                  textBottom={partnerUsSectionData.TitleBottomText}
                  color="bg-primary-500"
                  topTextClass={'text-nowrap tracking-[2px]'}
                  textSize={locale === 'hu' && 'text-[30px] xxs:text-[34px] sm:text-[52px]'}
                  widthClass={locale === 'hu' ? 'w-[250px] xxs:w-[270px] sm:w-[440px]' : "w-[210px] sm:w-[310px]"}
                  minWidth={210}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
              <p className="flex-[1_0_0] text-white font-exo text-[18px] font-normal leading-[150%] tracking-[1px]">
                {partnerUsSectionData.Description}
              </p>
            </div>
            <div className="flex items-start w-full">
              <SecondaryCTAButton
                text={partnerUsSectionData.ButtonText}
                type="button"
                href="fanny@budapestbitcoin.com"
                actionType="mailto"
              />
            </div>
          </div>
          <div className="flex w-full md:w-[50%]">
            <WhyPartnerUsHODLSVG />
          </div>
        </div>
        <div className="flex flex-col items-center gap-[40px]">
          <div className="flex p-[10px] justify-center items-center gap-[10px]">
            <h3 className="text-neutral-200 text-center font-exo text-[28px] xs:text-[32px] md:text-[40px] font-extrabold leading-[130%] tracking-[2.5px]">
              {partnerUsSectionData.MediaPartnerText}
            </h3>
          </div>
          <div className="flex max-w-[440px] px-[16px] flex-col items-center gap-[40px]">
            <div className="flex w-full max-w-full">
              <MainMediaPartnerSVG />
            </div>
            <p className="self-stretch text-white text-center font-exo text-[18px] font-medium leading-[150%] tracking-[1px]">
              {partnerUsSectionData.MediaPartnerDescription}
            </p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default WhyPartnerWithUs;
