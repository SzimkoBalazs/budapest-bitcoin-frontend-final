import ContentWrapper from "@/utilities/ContentWrapper";
import React from "react";
import SecondaryCTAButton from "../SecondaryCTAButton";
import WhyPartnerUsHODLSVG from "@/utilities/WhyPartnerUsHODLSVG";
import MainMediaPartnerSVG from "@/utilities/MainMediaPartnerSVG";
import SectionMainTitle from "@/components/SectionMainTitle";

const WhyPartnerWithUs = () => {
  return (
    <div
      id="partners"
      className="flex flex-col w-full items-center bg-neutral-950 pt-[56px] scroll-mt-[80px]"
    >
      <ContentWrapper className={"max-w-[1128px]"}>
        <div className="flex flex-col md:flex-row mx-auto mb-[80px] pb-[80px] pop:justify-between items-center pop:items-end self-stretch border-b-2 border-neutral-200">
          <div className="flex pop:pr-[16px] w-full md:w-[50%] flex-col items-center pop:items-start gap-[24px]">
            <div className="flex flex-col items-start gap-[64px] self-stretch">
              <div className="flex flex-col items-start gap-[34px]">
                <SectionMainTitle
                  text={"WHY PARTNER WITH US"}
                  color="bg-primary-500"
                  underlineWidth={"55%"}
                  minWidth={280}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
              <p className="flex-[1_0_0] text-white font-exo text-[18px] font-normal leading-[150%] tracking-[1px]">
                Budapest is not just the host of the world’s first Satoshi
                Nakamoto statue; it’s also a hub for Bitcoin pioneers like Nick
                Szabo and Laszlo Hanyecz. Being an untapped market, with a
                rapidly growing Bitcoin community and favorable taxation
                policies, Hungary is a prime destination for businesses and
                investors looking to expand in Europe.
              </p>
            </div>
            <div className="flex items-start w-full">
              <SecondaryCTAButton
                text="Become a partner"
                type="button"
                href="random@gmail.com"
                actionType="mailto"
              />
            </div>
          </div>

          <div className="h-[231px] flex justify-end">
            <WhyPartnerUsHODLSVG />
          </div>
        </div>
        <div className="flex flex-col items-center gap-[40px]">
          <div className="flex p-[10px] justify-center items-center gap-[10px]">
            <p className="text-neutral-200 text-center font-exo text-[50px] font-extrabold leading-[130%] tracking-[2.5px]">
              Main Media Partner
            </p>
          </div>
          <div className="flex max-w-[440px] px-[16px] flex-col items-center gap-[40px]">
            <div className="flex flex-col items-center gap-[24px] self-stretch">
              <MainMediaPartnerSVG />
              <p className="self-stretch text-white text-center font-exo text-[18px] font-medium leading-[150%] tracking-[1px]">
                Hungary’s oldest and largest Bitcoin news portal
              </p>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default WhyPartnerWithUs;
