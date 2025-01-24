import HeroSectionBridgeSVG from "@/utilities/HeroSectionBridgeSVG";
import HeroSectionContent from "../HeroSectionContent";

const HeroSection = ({ locale }) => {
  return (
    <section className="flex flex-col pb-[5%] w-full h-[100dvh] px-4 md:px-10 bg-neutral-900 justify-end text-white hero-bg-mobile md:hero-bg"
             style={{
                 backgroundImage:`url('lanchid_nap.svg')`,
                 backgroundColor:'#1f1f1f',
                 backgroundRepeat:'no-repeat',
                }}>
        <HeroSectionContent />
    </section>
  );
};

export default HeroSection;
