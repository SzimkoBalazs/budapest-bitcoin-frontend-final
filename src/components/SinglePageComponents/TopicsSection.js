import React from "react";
import ContentWrapper from "@/utilities/ContentWrapper";
import WhatToExpectCard from "@/components/WhatToExpectCard";
import SectionMainTitle from "@/components/SectionMainTitle";
import TopicAccordion from '@/components/Topics/TopicAccordion';
import TopicsContainer from "@/components/Topics/TopicsContainer";

async function fetchTopics(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/topic-accordions?locale=${locale}&populate=*&sort=order:asc`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch topics data');
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchTopicsSection(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/topics-section?locale=${locale}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch topics data');
  }

  const data = await res.json();
  return data.data || [];
}

const TopicsSection = async ({ locale }) => {
  const topics = await fetchTopics(locale);
  const topicsSection = await fetchTopicsSection(locale)

  return (
    <div
      id="topics"
      className="flex w-full py-[56px] sm:py-[80px] mb-[56px] md:mb-[72px] flex-col items-center scroll-mt-[40px] sm:scroll-mt-[60px]"
    >
      <ContentWrapper className="w-full flex flex-col gap-y-6">
        <SectionMainTitle
            textTop={topicsSection.title}
            color="bg-secondary-600"
        />
        <TopicsContainer topics={topics}/>
      </ContentWrapper>
    </div>
  );
};

export default TopicsSection;
