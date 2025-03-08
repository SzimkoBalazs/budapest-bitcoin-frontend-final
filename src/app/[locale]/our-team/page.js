import React from 'react';
import ContentWrapper from '@/utilities/ContentWrapper';
import SectionMainTitle from '@/components/SectionMainTitle';
import SpeakerCard from '@/components/SpeakerCard';
import Footer from '@/components/SinglePageComponents/Footer';
import SpeakersBigTextOutline from '@/components/SpeakersBigTextOutline';
import MoreSpeakersTag from '@/components/MoreSpeakersTag';

async function fetchOurTeam(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/team-members?locale=${locale}&populate=*&sort=order:asc`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch our team data');
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchOurTeamPage(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/our-team-page?locale=${locale}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch our team page data');
  }

  const data = await res.json();
  return data.data || [];
}

const ourTeam = async ({ params }) => {
  const { locale } = await params;
  const ourTeamData = await fetchOurTeam(locale);
  const pageData = await fetchOurTeamPage(locale);

  return (
    <div>
      <ContentWrapper className="mt-[96px] sm:mt-[120px] sm:pb-10 flex flex-col items-center">
        <SectionMainTitle text={pageData.title} color="bg-secondary-600" underlineWidth={'97%'} />
        <p className="mt-4 max-w-[760px] text-white/80 font-exo text-[16px] sm:text-[18px] font-medium leading-[150%] tracking-[1px]">
          {pageData.paragraph}
        </p>
      </ContentWrapper>
      <div className="max-w-[1128px] mb-10 z-20 relative scrollbar-container px-[16px] sm:px-[40px] h-auto mt-10 flex gl:mx-auto gl:justify-center items-start content-center gap-y-[56px] md:gap-y-[80px] md:gap-x-[40px] pb-[24px] overflow-x-scroll flex-wrap">
        {ourTeamData.map((member, index) => (
          <div
            key={index}
            className={`flex min-w-fit md:min-w-[240px] justify-center items-start gap-[10px] flex-[1_0_0]`}
          >
            <SpeakerCard
              speakerData={member}
              isTeamMember={true}
              image={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.Picture.formats.small.url}`}
            />
          </div>
        ))}
      </div>
      <Footer locale={locale} />
    </div>
  );
};

export default ourTeam;
