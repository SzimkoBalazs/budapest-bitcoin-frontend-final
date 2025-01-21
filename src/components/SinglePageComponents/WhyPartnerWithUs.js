import ContentWrapper from "@/utilities/ContentWrapper";
import React from "react";
import SecondaryCTAButton from "../SecondaryCTAButton";
import WhyPartnerUsHODLSVG from "@/utilities/WhyPartnerUsHODLSVG";
import MainMediaPartnerSVG from "@/utilities/MainMediaPartnerSVG";

const WhyPartnerWithUs = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col items-center gap-[80px] p-[56px_10px_80px_10px] self-stretch bg-neutral-950">
        <ContentWrapper className="">
          <div className="flex flex-col pop:flex-row max-w-[1130px] mx-auto mb-[80px] pb-[80px] pop:justify-between items-center pop:items-end self-stretch border-b-2 border-neutral-200">
            <div className="flex w-[570px] pop:w-[670px] pop:pr-[16px] flex-col items-center pop:items-start gap-[24px]">
              <div className="flex flex-col items-start gap-[64px] self-stretch">
                <div className="flex w-[570px] pop:w-[672px] flex-col items-start gap-[34px]">
                  <div className="flex relative flex-col justify-center items-center gap-[10px] self-stretch">
                    <span className="w-[319px] h-[24px] absolute bottom-[9px] left-0 z-0 bg-primary-500" />
                    <p className="text-white [-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:#1F1F1F] z-10 font-exo text-[56px] font-extrabold leading-[100%] tracking-[8.4px] uppercase self-stretch">
                      Why partner with Us?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-[570px] pop:w-[670px] justify-center items-center gap-[10px]">
                <p className="flex-[1_0_0] text-white font-exo text-[20px] font-normal leading-[150%] tracking-[1px]">
                  Budapest is not just the host of the world’s first Satoshi
                  Nakamoto statue; it’s also a hub for Bitcoin pioneers like
                  Nick Szabo and Laszlo Hanyecz. Being an untapped market, with
                  a rapidly growing Bitcoin community and favorable taxation
                  policies, Hungary is a prime destination for businesses and
                  investors looking to expand in Europe.
                </p>
              </div>
              <div className="flex items-start w-full">
                <SecondaryCTAButton text="Become a partner" />
              </div>
            </div>
            <div className="flex w-[440px] h-[231px] justify-center items-center">
              <div className="w-[440px] h-[231px] flex-shrink-0">
                <WhyPartnerUsHODLSVG />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[40px]">
            <div className="flex p-[10px] justify-center items-center gap-[10px]">
              <p className="w-[894px] text-neutral-200 text-center font-exo text-[50px] font-extrabold leading-[130%] tracking-[2.5px]">
                Main Media Partner
              </p>
            </div>
            <div className="flex w-[440px] px-[16px] flex-col items-center gap-[40px]">
              <div className="flex flex-col items-center gap-[24px] self-stretch">
                <MainMediaPartnerSVG />
                <p className="self-stretch text-white text-center font-exo text-[20px] font-medium leading-[150%] tracking-[1px]">
                  Hungary’s oldest and largest Bitcoin news portal
                </p>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default WhyPartnerWithUs;
