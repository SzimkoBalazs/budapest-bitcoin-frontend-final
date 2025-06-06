import React from "react";

const MoreSpeakersTag = ({ mainText, secondaryText }) => {
  return (
    <div className="flex flex-col min-w-[240px] p-[14px_12px] sm:p-[40px_32px] justify-center items-center self-center gap-[10px] rounded-[8px] border border-white bg-black">
      <p className="text-white text-center font-exo text-[18px] font-medium leading-[100%] flex-[1_0_0]">
        {mainText}
      </p>
      <p className="text-white font-exo text-[18px] font-bold leading-[18px]">
        {secondaryText}
      </p>
    </div>
  );
};

export default MoreSpeakersTag;
