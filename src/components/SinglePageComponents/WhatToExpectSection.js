import React from "react";
import ContentWrapper from "@/utilities/ContentWrapper";
import WhatToExpectCard from "@/components/WhatToExpectCard";
import SectionMainTitle from "@/components/SectionMainTitle";

const WhatToExpectSection = () => {
  return (
    <div
      id="what-to-expect"
      className="flex py-[56px] flex-col items-center bg-neutral-950 scroll-mt-[250px]"
    >
      <ContentWrapper className={"max-w-[1128]"}>
        <div className="flex flex-col lg:flex-row lg:max-w-[1210px] mx-auto justify-between items-center gap-[40px] self-stretch">
          <div className="flex w-full lg:w-[50%] flex-col items-start gap-[24px]">
            <div className="flex flex-col items-start gap-[64px] self-stretch">
              <div className="flex flex-col items-start gap-[34px] max-w-[672px]">
                <SectionMainTitle
                  text={"WHAT TO EXPECT"}
                  color="bg-neutral-700"
                  underlineWidth={"45%"}
                />
              </div>
            </div>
            <div className="flex justify-center items-start gap-[10px] self-stretch">
              <p className="flex-[1_0_0] text-white font-exo text-[18px] font-medium leading-[150%] tracking-[1px]">
                Bitcoin Budapest is where real connections come alive. No
                distractions, no noise - just Bitcoin, networking, and good
                Budapest vibes. From learning the fundamentals to diving into
                advanced topics, this is your chance to reconnect to the roots
                of Bitcoin while enjoying the charm of one of Europe’s most
                captivating cities.
              </p>
            </div>
          </div>
          <div className="flex w-full lg:w-[40%] gap-[24px] items-start">
            <div className="flex flex-1 flex-col justify-center items-center gap-[24px]">
              <WhatToExpectCard number={"1000+"} text={"Attendees"} />
              <WhatToExpectCard number={"3"} text={"Stages"} />
            </div>
            <div className="flex flex-1 flex-col justify-center items-center gap-[24px]">
              <WhatToExpectCard number={"70+"} text={"Speakers"} />
              <WhatToExpectCard number={"2"} text={"Days"} />
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default WhatToExpectSection;
