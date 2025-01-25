import React from "react";
import ContentWrapper from "@/utilities/ContentWrapper";
import WhatToExpectCard from "@/components/WhatToExpectCard";
import SectionMainTitle from "@/components/SectionMainTitle";

async function fetchWhatToExpectSectionData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/what-to-expect-section?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch speakers section's data");
  }

  const data = await res.json();
  return data.data || [];
}

const WhatToExpectSection = async ({ locale }) => {
  const whatToExpectSectionData = await fetchWhatToExpectSectionData(locale);

  return (
    <div
      id="what-to-expect"
      className="flex py-[56px] flex-col items-center bg-neutral-950 scroll-mt-[200px]"
    >
      <ContentWrapper className={"max-w-[1128]"}>
        <div className="flex flex-col whatToExpectBreak:flex-row mx-auto justify-between items-center gap-[40px] self-stretch">
          <div className="flex w-full max-w-[560px] whatToExpectBreak:max-w-full  whatToExpectBreak:w-[50%] flex-col items-start gap-[24px]">
            <div className="flex flex-col items-start gap-[64px] self-stretch">
              <div className="flex flex-col items-start gap-[34px] max-w-[672px]">
                <SectionMainTitle
                  textTop={whatToExpectSectionData.TopTitleText}
                  textBottom={whatToExpectSectionData.BottomTitleText}
                  color="bg-neutral-700"
                  widthClass={locale === 'hu' ? "w-[97%]" : "w-[80%]"}
                  textSize={locale === 'hu' && 'text-[36px] sm:text-[52px]'}
                />
              </div>
            </div>
            <div className="flex justify-center items-start gap-[10px] self-stretch">
              <p className="flex-[1_0_0] text-white font-exo text-[18px] font-medium leading-[150%] tracking-[1px]">
                {whatToExpectSectionData.Description}
              </p>
            </div>
          </div>
          <div className="flex w-full whatToExpectBreak:w-[50%] gap-[24px] items-start">
            <div className="flex flex-1 flex-col justify-center items-center gap-[24px]">
              <WhatToExpectCard
                number={whatToExpectSectionData.FirstCardNumber}
                text={whatToExpectSectionData.FirstCardText}
              />
              <WhatToExpectCard
                number={whatToExpectSectionData.ThirdCardNumber}
                text={whatToExpectSectionData.ThirdCardText}
              />
            </div>
            <div className="flex flex-1 flex-col justify-center items-center gap-[24px]">
              <WhatToExpectCard
                number={whatToExpectSectionData.SecondCardNumber}
                text={whatToExpectSectionData.SecondCardText}
              />
              <WhatToExpectCard
                number={whatToExpectSectionData.FourthCardNumber}
                text={whatToExpectSectionData.FourthCardText}
              />
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default WhatToExpectSection;
