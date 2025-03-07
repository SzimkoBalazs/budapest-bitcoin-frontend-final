import SpeakersBigTextOutline from "../SpeakersBigTextOutline";
import SectionMainTitle from "../SectionMainTitle";
import SpeakerCard from "../SpeakerCard";
import MoreSpeakersTag from "../MoreSpeakersTag";

import SecondaryCTAButton from "../SecondaryCTAButton";
import ContentWrapper from "@/utilities/ContentWrapper";
import GetYourPassCTAButton from "@/components/GetYourPassCTAButton";

async function fetchSpeakersSectionData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/speakers-section?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch speakers section's data");
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchSpeakerCardData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/speaker-cards?locale=${locale}&populate=*&sort=order:asc`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch speaker card data");
  }

  const data = await res.json();
  return data.data || [];
}

const SpeakersSection = async ({ locale }) => {
  const speakerSetionData = await fetchSpeakersSectionData(locale);
  const speakerCardData = await fetchSpeakerCardData(locale);

  return (
    <div
      id="speakers"
      className="mb-[80px] md:mb-[176px] relative scroll-mt-[0px]"
      style={{
        background: "linear-gradient(to top right, #1f1f1f 75%, #F7931A 35%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex w-full flex-row items-between opacity-[0.075] z-0 absolute left-0 top-0 px-[40px] pt-[80px]">
        <div className="flex justify-center flex-1">
          <SpeakersBigTextOutline />
        </div>
        <div className="flex justify-center flex-1">
          <SpeakersBigTextOutline />
        </div>
        <div className="hidden justify-center sm:flex sm:flex-1">
          <SpeakersBigTextOutline />
        </div>
      </div>
      <ContentWrapper className="pt-[80px]">
        <div className="relative z-10 mx-auto">
          <div className="flex flex-col gap-[16px] sm:gap-[24px] md:pt-[80px]">
            <SectionMainTitle
              text={speakerSetionData.MainTitle}
              color="bg-secondary-600"
              underlineWidth={"97%"}
            />
            <p className="text-[rgba(255,255,255,0.80)] font-exo text-[18px] sm:text-[26px] font-normal leading-[130%] tracking-[4px] self-stretch">
              {speakerSetionData.Description}
            </p>
            <SecondaryCTAButton
              text={speakerSetionData.ButtonText}
              type="button"
              href="hello@budapestbitcoin.com"
              actionType="mailto"
            />
          </div>
        </div>
      </ContentWrapper>
      {/*SPEAKER CARDS CONTAINER*/}
      <div className="max-w-[1128px] z-20 relative scrollbar-container px-[16px] sm:px-[40px] h-auto mt-10 flex gl:mx-auto gl:justify-center items-start content-center gap-x-[40px] md:gap-y-[80px] md:gap-x-[40px] pb-[24px] overflow-x-scroll flex-nowrap md:flex-wrap">
        {/*TODO: Show only 8 speakers */}
        {speakerCardData.map(
          (speaker, index) =>
            index < 12 && (
              <div
                key={index}
                className={`flex min-w-fit md:min-w-[200px] justify-center items-start gap-[10px] flex-[1_0_0] ${
                  index % 2 === 1 ? "mt-0 md:mt-[48px]" : ""
                }`}
              >
                <SpeakerCard
                  image={
                    speaker.Picture?.formats?.small?.url
                      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${speaker.Picture.formats.small.url}`
                      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${speaker.Picture.formats.thumbnail.url}`
                  }
                  speakerData={speaker}
                />
              </div>
            )
        )}
      </div>
      <div className="flex flex-col mt-[32px] sm:mt-10 w-full items-center">
        <GetYourPassCTAButton
          anchorOrButton={"anchor"}
          locale={locale}
          href={"/speakers"}
          buttonText={speakerSetionData.MoreSpeakersButton}
        />
      </div>
    </div>
  );
};

export default SpeakersSection;
