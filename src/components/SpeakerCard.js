import React from "react";
import ImageForSpeakerCard from "./ImageForSpeakerCard";

const SpeakerCard = ({ name, description, image, company }) => {
  console.log(image);
  return (
    <div className="flex flex-col items-start ">
      {/* Felső kép */}
      <div className="relative pl-[24px] flex w-[240px] h-[192px] flex-col items-start">
        <div className="w-full h-full rounded-[15px] border-[6px] border-white overflow-hidden">
          <ImageForSpeakerCard image_url={image} />
        </div>
      </div>

      {/* Alsó tartalom */}
      <div className="relative w-[240px] pr-[24px] mt-[-40px] z-10">
        <div className="flex flex-col p-[12px] gap-[8px] self-stretch rounded-[8px] border-[4px] border-white shadow-[1px_1px_0px_2px_#FFF,_2px_2px_0px_2px_#FFF,_3px_3px_0px_2px_#FFF,_4px_4px_0px_2px_#FFF,_5px_5px_0px_2px_#FFF,_6px_6px_0px_2px_#FFF,_7px_7px_0px_2px_#FFF,_8px_8px_0px_2px_#FFF] bg-black overflow-hidden ">
          <div className="flex h-[60px] flex-col gap-[12px] self-stretch">
            <p className="text-white font-exo text-[22px] font-bold leading-[110%]">
              {name}
            </p>
            <span className="w-[60px] h-[4px] bg-[#FFF]" />
          </div>
          <div className="flex flex-col items-start gap-[8px] self-stretch py-[4px]">
            <div className="flex items-start gap-[10px] self-stretch">
              <p className="text-[rgba(255,255,255,0.50)] font-exo text-[14px] font-medium leading-normal flex-[1_0_0]">
                {description}
              </p>
            </div>
            <div className="flex items-start gap-[10px] self-stretch">
              <p className="text-[#399BFC] font-exo text-[14px] font-bold leading-none flex-[1_0_0]">
                {company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;
