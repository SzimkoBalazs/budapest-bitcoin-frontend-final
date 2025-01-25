import FirstConference from "@/components/FirstConference";
import ThereIsMoreSectionDividerText from "@/components/ThereIsMoreSectionDividerText";
import ProofOfPalinka from "@/components/ProofOfPalinka";
import BudapestCultureGallery from "@/components/BudapestCultureGallery";
import WhaleVenue from "@/components/WhaleVenue";
import ContentWrapper from "@/utilities/ContentWrapper";

async function fetchGallerySectionData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/gallery-section-title?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch gallery section's data");
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchGalleryCardData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/gallery-cards?locale=${locale}&populate=*&sort=order:asc`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch speaker card data");
  }

  const data = await res.json();
  return data.data || [];
}

const GallerySection = async ({ locale }) => {
  const gallerySectionData = await fetchGallerySectionData(locale);
  const galleryCardsData = await fetchGalleryCardData(locale);
  return (
    <ContentWrapper>
      <div className="flex flex-col gap-[156px]">
        <BudapestCultureGallery
          title={gallerySectionData.TitleText}
          galleryData={galleryCardsData}
        />
      </div>
    </ContentWrapper>
  );
};

export default GallerySection;
