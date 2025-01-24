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
      <div className="mb-[80px] w-full flex flex-col md:mb-[176px] relative"
           style={{
               //background: `url('/SpeakersBG.jpeg')`,
               background:'linear-gradient(to top right, #1f1f1f 75%, #F7931A 35%)',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
           }}
      >
          <div className="flex w-full flex-row items-between opacity-[0.05] z-0 absolute left-0 top-0 px-[40px] pt-[80px]">
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
          <ContentWrapper
            className="pt-[80px] relative"
          >
      <div className="relative z-10 mx-auto">
        <div className="flex flex-col gap-[16px] sm:gap-[24px] md:pt-[80px] max-w-[1128px] mx-auto">
          <SectionMainTitle
            text={speakersTitle.SpeakersSectionTitleText}
            color='bg-secondary-600'
            underlineWidth={'97%'}
          />
          <p className="text-[rgba(255,255,255,0.80)] font-exo text-[18px] sm:text-[26px] font-normal leading-[130%] tracking-[4px] self-stretch">
            {speakersTitle.SpeakersSectionDescription}
          </p>
          <SecondaryCTAButton text="Become a speaker" />
        </div>
      </div>
    </ContentWrapper>
              {/*SPEAKER CARDS CONTAINER*/}
              <div className="max-w-[1128px] z-20 relative scrollbar-container px-[16px] sm:px-[40px] h-auto mt-10 flex gl:mx-auto gl:justify-center items-start content-center gap-x-[40px] md:gap-y-[80px] md:gap-x-[40px] pb-[24px] overflow-x-scroll flex-nowrap md:flex-wrap">
                  {speakerCardData.map((speaker, index) => (
            <div
              key={index}
              className={`flex min-w-fit md:min-w-[200px] justify-center items-start gap-[10px] flex-[1_0_0] ${
                index % 2 === 1 ? "mt-0 md:mt-[48px]" : ""
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
            <MoreSpeakersTag speakerSectionTag={speakerSectionTag} />
        </div>
      </div>

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
