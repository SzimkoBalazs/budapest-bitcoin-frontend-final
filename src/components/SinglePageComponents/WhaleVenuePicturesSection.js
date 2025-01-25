import React from "react";
import Image from "next/image";
import ContentWrapper from "@/utilities/ContentWrapper";
import WhaleVenue from "@/components/WhaleVenue";

async function fetchWhaleVenueSectionData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/whale-venue-section?locale=${locale}&populate=*`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch whale venue section's data");
  }

  const data = await res.json();
  return data.data || [];
}

const WhaleVenuePicturesSection = async ({ locale }) => {
  const whaleVenueSectionData = await fetchWhaleVenueSectionData(locale);

  return (
    <div className="mb-[80px] sm:mb-[200px]">
      <ContentWrapper className="mt-[64px] sm:mt-[160px] flex flex-col max-w-[1128] mx-auto">
        <WhaleVenue whaleVenueSectionData={whaleVenueSectionData} locale={locale}/>
      </ContentWrapper>
      <div className="flex overflow-hidden md:mt-[-56px] flex-col md:flex-row w-full items-center md:items-end gap-[20px]">
        <div className="flex w-[150%] sm:pr-0 md:w-[60%] h-[100%] md:h-auto max-h-[600px] rounded-[30px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${whaleVenueSectionData.LeftImage.formats.large.url}`}
            alt="Balna Left"
            width={1920}
            height={866}
            className="object-cover object-[20%_50%]"
          />
        </div>
        <div className="flex w-full md:w-[40%] h-[100%] md:h-auto max-h-[600px] rounded-[30px] overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${whaleVenueSectionData.RightImage.formats.large.url}`}
            alt="Balna Right"
            width={1400}
            height={1276}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default WhaleVenuePicturesSection;
