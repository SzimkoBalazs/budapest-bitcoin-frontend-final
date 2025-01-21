import React from "react";

const MoreSpeakersTag = ({ speakerSectionTag }) => {
  return (
    <div className="flex min-w-[320px] p-[40px_32px] justify-center items-center gap-[10px] rounded-[8px] border border-white bg-black">
      <p className="text-white font-exo text-[18px] font-medium leading-[100%] flex-[1_0_0]">
        {speakerSectionTag.MainText}
      </p>
      <p className="text-white font-exo text-[18px] font-bold leading-[18px]">
        {speakerSectionTag.SecondaryText}
      </p>
    </div>
  );
};

export default MoreSpeakersTag;
