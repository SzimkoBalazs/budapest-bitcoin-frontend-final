import React from "react";
import ContentWrapper from "@/utilities/ContentWrapper";
import WhatToExpectCard from "@/components/WhatToExpectCard";
import SectionMainTitle from "@/components/SectionMainTitle";
import TopicAccordion from '@/components/Topics/TopicAccordion';

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

const TopicsSection = async ({ locale }) => {
  const whatToExpectSectionData = await fetchWhatToExpectSectionData(locale);

  return (
    <div
      id="topics"
      className="flex w-full py-[56px] flex-col items-center scroll-mt-[40px] sm:scroll-mt-[60px]"
    >
      <ContentWrapper className="w-full">
        <div className="flex flex-col gap-y-6">
          <TopicAccordion isOpened={true}/>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default TopicsSection;
