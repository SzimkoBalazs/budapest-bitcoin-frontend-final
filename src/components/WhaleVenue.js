import React from "react";
import SecondaryCTAButton from "./SecondaryCTAButton";

const WhaleVenue = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col pop:items-start items-center gap-[24px] pop:w-[1120px]">
        <div className="flex flex-col items-start gap-[64px] pop:w-[795px]">
          <div className="flex w-[672px] flex-col items-start gap-[34px]">
            <div className="flex relative w-[795px] flex-col justify-center items-center gap-[10px]">
              <span className="w-[217px] h-[24px] absolute bottom-[9px] left-0 z-0 bg-secondary-500" />
              <p className="text-white [-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:#1F1F1F] font-exo text-[56px] font-extrabold z-10 leading-[100%] tracking-[8.4px] uppercase self-stretch">
                OUR ICONIC WHALE VENUE
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-[670px] justify-center items-center gap-[10px]">
          <p className="flex-[1_0_0] text-white font-exo text-[20px] font-normal leading-[150%] tracking-[1px]">
            The Bálna ('Whale') is a large-scale, glass-fronted building basking
            on the bank of the Danube. Just as Bitcoin whales drive the markets
            with their influence, this iconic venue commands attention with its
            bold, futuristic architecture.
          </p>
        </div>
        <div className="flex items-start w-full">
          <SecondaryCTAButton text="CHECK THE LOCATION" />
        </div>
      </div>
    </div>
  );
};

export default WhaleVenue;
