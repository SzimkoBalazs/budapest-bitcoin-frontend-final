import ContentWrapper from "@/utilities/ContentWrapper";
import React from "react";
import FirstConference from "../FirstConference";
import ThereIsMoreSectionDividerText from "../ThereIsMoreSectionDividerText";
import ProofOfPalinka from "../ProofOfPalinka";
import BudapestCultureGallery from "../BudapestCultureGallery";
import WhaleVenue from "../WhaleVenue";

async function fetchThereIsMoreSectionData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/there-is-more-section?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch there is more section's data");
  }

  const data = await res.json();
  return data.data || [];
}

const ThereIsMore = async ({ locale }) => {
  const thereIsMoreSectionData = await fetchThereIsMoreSectionData(locale);
  return (
    <div>
      <ContentWrapper className="pt-[56px] md:pt-[156px] mb-[220px] flex-col max-w-[1128] mx-auto">
        <FirstConference data={thereIsMoreSectionData} />
      </ContentWrapper>
      <ThereIsMoreSectionDividerText
        firstText={thereIsMoreSectionData.SectionDividerFirstText}
        secondText={thereIsMoreSectionData.SectionDividerSecondText}
        locale={locale}
      />
      <ContentWrapper className="mt-[220px] flex flex-col max-w-[1128] mx-auto">
        <ProofOfPalinka data={thereIsMoreSectionData} />
      </ContentWrapper>
    </div>
  );
};

export default ThereIsMore;
