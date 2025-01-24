import ContentWrapper from "@/utilities/ContentWrapper";
import React from "react";
import FirstConference from "../FirstConference";
import ThereIsMoreSectionDividerText from "../ThereIsMoreSectionDividerText";
import ProofOfPalinka from "../ProofOfPalinka";
import BudapestCultureGallery from "../BudapestCultureGallery";
import WhaleVenue from "../WhaleVenue";

const ThereIsMore = () => {
  return (
      <div>
          <ContentWrapper className="pt-[56px] md:pt-[156px] mb-[220px] flex-col max-w-[1128] mx-auto">
                <FirstConference />
          </ContentWrapper>
            <ThereIsMoreSectionDividerText />
            <ContentWrapper className="mt-[220px] flex flex-col max-w-[1128] mx-auto">
                <ProofOfPalinka />
          </ContentWrapper>
      </div>

  );
};

export default ThereIsMore;
