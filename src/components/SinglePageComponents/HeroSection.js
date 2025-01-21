import HeroSectionBridgeSVG from "@/utilities/HeroSectionBridgeSVG";
import HeroSectionContent from "../HeroSectionContent";

const HeroSection = ({ locale }) => {
  return (
    <section className="flex flex-col w-full h-[100vh] pb-[210px] bg-neutral-900 text-white">
      {/* Háttér */}

      <div
        className="flex h-[593px] justify-center items-center flex-shrink-0 hero-background"
        style={{
          background: `url('/lanchid_nap.svg') `,
          backgroundRepeat: "no-repeat",

          backgroundPosition: "50%",
        }}
      ></div>
      {/* Belső tartalom */}

      <div className="flex justify-center mx-auto mt-[-100px]">
        <HeroSectionContent />
      </div>
    </section>
  );
};

export default HeroSection;
