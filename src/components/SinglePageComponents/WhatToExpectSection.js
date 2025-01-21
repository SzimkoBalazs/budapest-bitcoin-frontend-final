import React from "react";
import ContentWrapper from "@/utilities/ContentWrapper";

const WhatToExpectSection = () => {
  return (
    <div className="flex py-[56px] flex-col items-center gap-[80px] bg-neutral-950">
      <ContentWrapper className="">
        <div className="flex flex-col lg:flex-row max-w-[465px] lg:max-w-[1210px] mx-auto justify-between items-center gap-[40px] self-stretch">
          <div className="flex lg:w-[554px] w-[464px] flex-col items-start gap-[24px]">
            <div className="flex flex-col items-start gap-[64px] self-stretch">
              <div className="flex flex-col items-start gap-[34px] w-[672px]">
                <div className="flex flex-col max-w-[400px] relative justify-center items-center gap-[10px] self-stretch">
                  <span className="w-[284px] h-[24px] z-0 left-0 absolute bottom-[10px] bg-neutral-700" />
                  <p
                    className="text-white z-[10] text-[56px] font-exo font-extrabold leading-[100%] tracking-[8.4px] uppercase self-stretch 
            [-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:#1F1F1F]"
                  >
                    What to expect
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-start gap-[10px] self-stretch">
              <p className="flex-[1_0_0] text-white font-exo text-[20px] font-medium leading-[150%] tracking-[1px]">
                Bitcoin Budapest is where real connections come alive. No
                distractions, no noise - just Bitcoin, networking, and good
                Budapest vibes. From learning the fundamentals to diving into
                advanced topics, this is your chance to reconnect to the roots
                of Bitcoin while enjoying the charm of one of Europe’s most
                captivating cities.
              </p>
            </div>
          </div>
          <div className="flex gap-[24px] items-start">
            <div className="flex flex-col justify-center items-center gap-[24px]">
              <div className="flex w-[220px] h-[160px] p-[16px] flex-col justify-end items-start gap-[8px] rounded-[20px] border-2 border-primary-500">
                <p className="text-white text-center font-exo text-[40px] font-extrabold leading-[100%] tracking-[6px]">
                  1000+
                </p>
                <p className="text-white text-center font-exo text-[24px] font-normal leading-[100%] tracking-[3.6px]">
                  Attendees
                </p>
              </div>
              <div className="flex w-[220px] h-[160px] p-[16px] flex-col justify-end items-start gap-[8px] rounded-[20px] border-2 border-primary-500">
                <p className="text-white text-center font-exo text-[40px] font-extrabold leading-[100%] tracking-[6px]">
                  3
                </p>
                <p className="text-white text-center font-exo text-[24px] font-normal leading-[100%] tracking-[3.6px]">
                  Stages
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[24px]">
              <div className="flex w-[220px] h-[160px] p-[16px] flex-col justify-end items-start gap-[8px] rounded-[20px] border-2 border-primary-500">
                <p className="text-white text-center font-exo text-[40px] font-extrabold leading-[100%] tracking-[6px]">
                  70+
                </p>
                <p className="text-white text-center font-exo text-[24px] font-normal leading-[100%] tracking-[3.6px]">
                  Speakers
                </p>
              </div>
              <div className="flex w-[220px] h-[160px] p-[16px] flex-col justify-end items-start gap-[8px] rounded-[20px] border-2 border-primary-500">
                <p className="text-white text-center font-exo text-[40px] font-extrabold leading-[100%] tracking-[6px]">
                  2
                </p>
                <p className="text-white text-center font-exo text-[24px] font-normal leading-[100%] tracking-[3.6px]">
                  Days
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default WhatToExpectSection;
