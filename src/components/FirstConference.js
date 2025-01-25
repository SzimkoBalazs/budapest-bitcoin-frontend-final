import FirstConferenceFirstSVG from "@/utilities/FirstConferenceFirstSVG";
import FirstConferenceSecondSVG from "@/utilities/FirstConferenceSecondSVG";
import FirstConferenceThirdSVG from "@/utilities/FirstConferenceThirdSVG";
import React from "react";

const FirstConference = ({ data }) => {
  return (
    <div className="flex flex-row flex-wrap items-start justify-center gap-[40px]">
      <div className="flex flex-1 min-w-[320px] gap-4 max-w-[440px] flex-col items-start">
        <div className="h-[200px] mx-auto">
          <FirstConferenceFirstSVG />
        </div>
        <div className="flex flex-col items-start gap-[24px]">
          <div>
            <h5 className="text-white/80 font-exo text-[22px] font-normal leading-[150%] tracking-[3.3px]">
              {data.FirstCardTextAboveTitle}
            </h5>
            <h3 className="text-primary-500 font-exo text-[32px] font-extrabold leading-[110%] tracking-[4.8px]">
              {data.FirstCardTitle}
            </h3>
          </div>
          <p className="text-white text-opacity-80 font-exo text-[16px] font-medium leading-[150%] tracking-[0.8px]">
            {data.FirstCardDescription}
          </p>
        </div>
      </div>
      <div className="flex flex-1 mt-[32px] min-w-[320px] gap-4 max-w-[440px] flex-col items-start">
        <div className="h-[200px] mx-auto">
          <FirstConferenceSecondSVG />
        </div>
        <div className="flex flex-col items-start gap-[24px]">
          <h3 className="text-[32px] font-exo font-extrabold leading-[110%] tracking-[4.8px] text-secondary-600">
            {data.SecondCardTitle}
          </h3>
          <p className="text-[rgba(255,255,255,0.80)] font-exo text-[16px] font-medium leading-[150%] tracking-[0.8px]">
            {data.SecondCardDescription}
          </p>
        </div>
      </div>
      <div className="flex flex-1 mt-[32px] min-w-[320px] gap-[24px] sm:gap-[40px] max-w-[440px] flex-col items-start">
        <div className="max-h-[200px] w-full">
          <FirstConferenceThirdSVG />
        </div>
        <div className="flex flex-col items-start gap-[24px] self-stretch">
          <h3 className="text-primary-500 font-exo text-[32px] font-extrabold leading-[110%] tracking-[4.8px]">
            {data.ThirdCardTitle}
          </h3>
          <p className="text-white/80 font-exo text-[16px] font-medium leading-[150%] tracking-[0.8px]">
            {data.ThirdCardDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstConference;
