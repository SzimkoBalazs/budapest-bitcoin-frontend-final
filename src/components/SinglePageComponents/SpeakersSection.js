import ContentWrapper from "@/utilities/ContentWrapper";
import SpeakersBigTextOutline from "../SpeakersBigTextOutline";
import SectionMainTitle from "../SectionMainTitle";
import SpeakerCard from "../SpeakerCard";
import MoreSpeakersTag from "../MoreSpeakersTag";

import speakers from "@/utilities/constants";
import SecondaryCTAButton from "../SecondaryCTAButton";

async function fetchSpeakersTitle(locale) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/speakers-section-main-title?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch speakers section's title");
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchSpeakerCardData(locale) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/speaker-cards?locale=${locale}&populate=*`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch speaker card data");
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchSectionTag(locale) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/speakers-section-tag?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch speakers section's tag");
  }

  const data = await res.json();
  return data.data || [];
}

const SpeakersSection = async ({ locale }) => {
  const speakersTitle = await fetchSpeakersTitle(locale);
  const speakerCardData = await fetchSpeakerCardData(locale);
  const speakerSectionTag = await fetchSectionTag(locale);
  console.log(speakerSectionTag);
  return (
    <ContentWrapper
      className="pt-[80px] relative"
      styleProp={{
        background: `url('/SpeakersBG.jpeg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center">
        <div className=" inline-flex justify-center items-start fullhd:gap-[377px] gap-[100px] flex-shrink-0 opacity-[0.05] z-0 absolute top-0 max-w-[1440px] px-[40px] pt-[80px] mx-auto">
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
      </div>

      <div className="relative z-10 max-w-[1128] mx-auto ">
        <div className="flex flex-col gap-[34px] pt-[40px]">
          <SectionMainTitle
            text={speakersTitle.SpeakersSectionTitleText}
            color="#308ADB"
          />
          <p className="text-[rgba(255,255,255,0.80)] font-exo text-[26px] font-normal leading-[130%] tracking-[3.9px] self-stretch">
            {speakersTitle.SpeakersSectionDescription}
          </p>
          <SecondaryCTAButton text="Become a speaker" />
        </div>

        <div className="flex justify-between items-start mt-[64px] content-start gap-y-[144px] self-stretch speaker:flex-wrap overflow-x-auto overflow-hidden mb-[144px] scroll-container">
          {speakerCardData.map((speaker, index) => (
            <div
              key={index}
              className={`flex min-w-[280px] justify-center items-start gap-[10px] flex-[1_0_0] ${
                index % 2 === 1 ? "speaker:mt-[48px]" : ""
              }`}
            >
              <SpeakerCard
                name={speaker.Name}
                description={speaker.Position}
                image={`${process.env.STRAPI_URL}${speaker.Picture.formats.thumbnail.url}`}
                company={speaker.Company}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <MoreSpeakersTag speakerSectionTag={speakerSectionTag} />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default SpeakersSection;

// export async function getStaticProps({ params }) {
//   const locale = params?.locale || "en";

//   const [titleRes, tagRes] = await Promise.all([
//     fetch(
//       `${process.env.STRAPI_URL}/api/speakers-section-main-title?locale=${locale}`
//     ),
//     fetch(
//       `${process.env.STRAPI_URL}/api/speakers-section-tag?locale=${locale}`
//     ),
//   ]);

//   if (!titleRes.ok || !tagRes.ok) {
//     return { notFound: true }; // Ha a lekérdezés sikertelen, 404-et ad vissza
//   }

//   const [titleData, tagData] = await Promise.all([
//     titleRes.json(),
//     tagRes.json(),
//   ]);

//   return {
//     props: {
//       speakersTitle: titleData.data || [],
//       tag: tagData.data || [],
//     },
//     revalidate: 60, // Az oldal 60 másodpercenként frissül új adatokkal
//   };
// }
