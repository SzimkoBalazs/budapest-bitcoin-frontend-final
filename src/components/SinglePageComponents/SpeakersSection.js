import ContentWrapper from "@/utilities/ContentWrapper";
import SpeakersBigTextOutline from "../SpeakersBigTextOutline";
import SectionMainTitle from "../SectionMainTitle";
import SpeakerCard from "../SpeakerCard";
import MoreSpeakersTag from "../MoreSpeakersTag";

import speakers from "@/utilities/constants";

const SpeakersSection = () => {
  return (
    <ContentWrapper
      className="pt-[80px]"
      styleProp={{
        background: `url('/SpeakersBG.jpeg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Reszponzivitás biztosítása
        backgroundPosition: "center", // Középre igazítás
      }}
    >
      <div className=" inline-flex justify-center items-start gap-[377px] flex-shrink-0 opacity-[0.05] z-0 absolute inset-0 max-w-[1440px] px-[40px] pt-[80px] mx-auto">
        <div className="flex h-[1304.756px] flex-col items-start gap-[10px]">
          <div className="w-[202px] h-[1304.756px]">
            <SpeakersBigTextOutline />
          </div>
        </div>
        <div className="flex h-[1458px] w-[266px] pt-[80px] flex-col justify-end items-center gap-[10px]">
          <div className="w-[202px] h-[1304.756px] shrink-0">
            <SpeakersBigTextOutline />
          </div>
        </div>
        <div className="flex h-[1304.756px] flex-col items-start gap-[10px]">
          <div className="w-[202px] h-[1304.756px]">
            <SpeakersBigTextOutline />
          </div>
        </div>
      </div>

      <div className="relative z-10 ">
        <div className="flex flex-col gap-[34px] pt-[40px]">
          <SectionMainTitle text="Speakers" color="#308ADB" />
          <p className="text-[rgba(255,255,255,0.80)] font-exo text-[26px] font-normal leading-[130%] tracking-[3.9px] self-stretch">
            Meet the Minds Shaping Bitcoin’s Future
          </p>
        </div>

        <div className="flex justify-between items-start mt-[64px] content-start gap-y-[144px] self-stretch flex-wrap mb-[144px]">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className={`flex min-w-[280px] justify-center items-start gap-[10px] flex-[1_0_0] ${
                index % 2 === 1 ? "mt-[48px]" : ""
              }`}
            >
              <SpeakerCard
                name={speaker.name}
                description={speaker.description}
                image={speaker.image}
                company={speaker.company}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <MoreSpeakersTag />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default SpeakersSection;
