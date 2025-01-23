import React from "react";
import SecondaryCTAButton from "./SecondaryCTAButton";
import ContentWrapper from "@/utilities/ContentWrapper";

const WhaleVenue = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col w-full sm:w-[50%] gap-[24px]">
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start">
            <div className="flex relative flex-col justify-center items-center gap-[10px]">
              <span className="w-[217px] h-[24px] absolute bottom-[9px] left-0 z-0 bg-secondary-500" />
              <p className="text-white [-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:#1F1F1F] font-exo text-[56px] font-extrabold z-10 leading-[100%] tracking-[8.4px] uppercase self-stretch">
                OUR ICONIC WHALE VENUE
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-white font-exo text-[18px] font-normal leading-[150%] tracking-[1px]">
            The Bálna ('Whale') is a large-scale, glass-fronted building basking
            on the bank of the Danube. Just as Bitcoin whales drive the markets
            with their influence, this iconic venue commands attention with its
            bold, futuristic architecture.
          </p>
        </div>
        <div className="flex items-start w-full">
          <SecondaryCTAButton
            text="CHECK THE LOCATION"
            type="button"
            actionType="googleMaps"
          />
        </div>
      </div>
    </div>
  );
};

export default WhaleVenue;
