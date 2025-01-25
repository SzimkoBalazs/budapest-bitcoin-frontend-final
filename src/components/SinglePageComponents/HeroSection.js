import HeroSectionBridgeSVG from "@/utilities/HeroSectionBridgeSVG";
import HeroSectionContent from "../HeroSectionContent";

async function fetchHeroSectionData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hero-section?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch hero section data");
  }

  const data = await res.json();
  return data.data || [];
}

const HeroSection = async ({ locale }) => {
  const heroSectionData = await fetchHeroSectionData(locale);
  return (
    <section
        id="home-page"
      className="flex flex-col pb-[5%] w-full h-hero-section-small xxs:h-hero-section sm:h-[100vh] px-4 md:px-10 bg-neutral-900 justify-end text-white hero-bg-mobile lg:hero-bg md:hero-bg-middle"
      style={{
        backgroundImage: `url('lanchid_nap.svg')`,
        backgroundColor: "#1f1f1f",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeroSectionContent heroSectionData={heroSectionData} />
    </section>
  );
};
export default HeroSection;
