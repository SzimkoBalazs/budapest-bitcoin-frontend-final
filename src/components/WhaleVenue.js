import React from "react";
import SecondaryCTAButton from "./SecondaryCTAButton";
import ContentWrapper from "@/utilities/ContentWrapper";
import SectionMainTitle from "@/components/SectionMainTitle";

const WhaleVenue = ({ whaleVenueSectionData, locale }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col w-full md:w-[80%] lg:w-[50%] gap-[24px]">
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start">
            <div className="flex relative flex-col justify-center items-center gap-[10px]">
              <SectionMainTitle
                textTop={whaleVenueSectionData.TitleTopText}
                textBottom={whaleVenueSectionData.TitleBottomText}
                color="bg-secondary-600"
                widthClass={locale === 'hu' ? "w-[195px] whaleTextXs:w-[97%] lg:w-[290px]" : "w-[143px] whaleTextXsHu:w-[97%]"}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-white font-exo text-[18px] font-normal leading-[150%] tracking-[1px]">
            {whaleVenueSectionData.Description}
          </p>
        </div>
        <div className="flex items-start w-full">
          <SecondaryCTAButton
            text={whaleVenueSectionData.ButtonText}
            type="button"
            actionType="googleMaps"
          />
        </div>
      </div>
    </div>
  );
};

export default WhaleVenue;
