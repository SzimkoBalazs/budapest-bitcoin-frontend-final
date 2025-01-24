import React from "react";
import SecondaryCTAButton from "./SecondaryCTAButton";
import ContentWrapper from "@/utilities/ContentWrapper";
import SectionMainTitle from "@/components/SectionMainTitle";

const WhaleVenue = () => {
  return (
      <div className="flex flex-col items-start">
        <div className="flex flex-col w-full md:w-[70%] lg:w-[50%] gap-[24px]">
          <div className="flex flex-col items-start">
            <div className="flex relative flex-col justify-center items-center gap-[10px]">
              <SectionMainTitle
                  textTop={'OUR ICONIC'}
                  textBottom={'WHALE VENUE'}
            color='bg-secondary-600'
            widthClass={'w-[48%] xs:w-[98%]'}
          />
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
