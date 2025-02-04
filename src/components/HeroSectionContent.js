import HeroSectionDots from "@/utilities/HeroSectionDots";
import React from "react";
import GetYourPassCTAButton from "./GetYourPassCTAButton";
import SecondaryCTAButton from "./SecondaryCTAButton";

const HeroSectionContent = ({ heroSectionData }) => {
  return (
    <div className="flex w-fit flex-col items-center gap-[48px] mx-auto">
      <div className="flex flex-col items-start lx:gap-[12px] gap-[24px]">
        <div className="flex flex-col gap-[-10px]">
          <h4 className="text-white self-center lx:self-end w-fit inline-flex text-right font-exo text-[16px] font-medium leading-[130%] tracking-[2.08px] bg-neutral-900 p-[10px]">
            {heroSectionData.TextAboveMainTitle}
          </h4>
          <h2
            className="big-title-mobile md:big-title w-fit inline-flex text-[48px] md:text-[72px] lg:text-[92px] tracking-[6.24px] speaker:tracking-[12.48px]"
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Fredoka",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "100%",
              textTransform: "uppercase",
            }}
          >
            {heroSectionData.HeroSectionMainTitle}
          </h2>
        </div>
        <div className="flex flex-col lx:flex-row relative lx:justify-between lx:gap-[0px] gap-[40px] items-center self-stretch">
          <div className="relative max-w-[343px] h-[52px] text-center lx:text-left">
            <h3 className="flex flex-col items-center lx:items-start text-white font-exo text-[16px] sm:text-[22px] font-medium leading-[130%] tracking-[2.2px]">
              {heroSectionData.HeroSectionDescriptionFirstPart}
              <span className="flex relative w-fit mx-auto lx:mx-0 text-white z-20 font-exo text-[18px] sm:text-[24px] font-bold leading-[130%] tracking-[2.4px]">
                {" "}
                {heroSectionData.HeroSectionDescriptionSecondPart}
              </span>
              <span className="flex z-0 absolute bottom-[12px] sm:bottom-[0px] w-[180px] sm:w-[230px] h-[6px] bg-secondary-600" />
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center gap-[10px]">
              <h5 className="text-white font-exo text-[18px] sm:text-[24px] font-extrabold leading-[150%] tracking-[3.12px]">
                {heroSectionData.HeroSectionDate}
              </h5>
            </div>
            <div className="w-[286.173px] h-[95.905px] absolute ">
              <div className="w-[286.173px] h-[95.905px]  opacity-30">
                <HeroSectionDots />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row md:items-start gap-[16px]">
        <GetYourPassCTAButton buttonText={heroSectionData.GetYourPassBTNText} />
        <SecondaryCTAButton
          text={heroSectionData.SecondaryButtonText}
          type="button"
          href="partners"
          actionType="scroll"
        />
      </div>
    </div>
  );
};

export default HeroSectionContent;
