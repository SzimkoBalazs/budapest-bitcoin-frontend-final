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
      id="speakers"
      className="pt-[80px] relative mb-[200px]"
      styleProp={{
        background: `url('/SpeakersBG.jpeg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-1 gap-10 max-w-[1440px] justify-between opacity-[0.05] z-0 absolute left-0 top-0 px-[40px] pt-[80px] mx-auto">
        <div className="flex-1">
          <SpeakersBigTextOutline />
        </div>
        <div className="flex-1">
          <SpeakersBigTextOutline />
        </div>
        <div className="hidden sm:flex sm:flex-1">
          <SpeakersBigTextOutline />
        </div>
      </div>
      <div className="relative z-10 mx-auto">
        <div className="flex flex-col gap-[16px] sm:gap-[24px] pt-[40px] max-w-[1128px] px-[16px] sm:px-[40px] mx-auto">
          <SectionMainTitle
            text={speakersTitle.SpeakersSectionTitleText}
            color="bg-secondary-600"
            underlineWidth={"97%"}
          />
          <p className="text-[rgba(255,255,255,0.80)] font-exo text-[18px] sm:text-[26px] font-normal leading-[130%] tracking-[4px] self-stretch">
            {speakersTitle.SpeakersSectionDescription}
          </p>
          <SecondaryCTAButton text="Become a speaker" />
        </div>

        <div className="flex justify-center items-start mt-[64px] content-start gap-y-[80px] self-stretch speaker:flex-wrap overflow-x-auto overflow-hidden scroll-container">
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
          <div className="flex items-center justify-center self-center">
            <MoreSpeakersTag speakerSectionTag={speakerSectionTag} />
          </div>
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
