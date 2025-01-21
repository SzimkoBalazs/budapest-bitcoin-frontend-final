import ContentWrapper from "@/utilities/ContentWrapper";
import React from "react";
import FirstConference from "../FirstConference";
import ThereIsMoreSectionDividerText from "../ThereIsMoreSectionDividerText";
import ProofOfPalinka from "../ProofOfPalinka";
import BudapestCultureGallery from "../BudapestCultureGallery";
import WhaleVenue from "../WhaleVenue";

const ThereIsMore = () => {
  return (
    <ContentWrapper className="pt-[156px]">
      <div className="flex flex-col gap-[156px]">
        <FirstConference />
        <ThereIsMoreSectionDividerText />
        <ProofOfPalinka />
        <BudapestCultureGallery />
        <WhaleVenue />
      </div>
    </ContentWrapper>
  );
};

export default ThereIsMore;
