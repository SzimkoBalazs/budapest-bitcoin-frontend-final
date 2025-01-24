import FirstConference from "@/components/FirstConference";
import ThereIsMoreSectionDividerText from "@/components/ThereIsMoreSectionDividerText";
import ProofOfPalinka from "@/components/ProofOfPalinka";
import BudapestCultureGallery from "@/components/BudapestCultureGallery";
import WhaleVenue from "@/components/WhaleVenue";
import ContentWrapper from "@/utilities/ContentWrapper";

const GallerySection = () => {
  return (
    <ContentWrapper>
      <div className="flex flex-col gap-[156px]">
        <BudapestCultureGallery />
      </div>
    </ContentWrapper>
  )
}

export default GallerySection