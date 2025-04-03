// import React from 'react';
// import ContentWrapper from '@/utilities/ContentWrapper';
// import SectionMainTitle from '@/components/SectionMainTitle';
// import SpeakerCard from '@/components/SpeakerCard';
// import Footer from '@/components/SinglePageComponents/Footer';
// import SpeakersBigTextOutline from '@/components/SpeakersBigTextOutline';
// import MoreSpeakersTag from '@/components/MoreSpeakersTag';

// async function fetchSpeakerCardData(locale) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/speaker-cards?locale=${locale}&populate=*&sort=order:asc`,
//   );

//   if (!res.ok) {
//     throw new Error('Failed to fetch speaker card data');
//   }

//   const data = await res.json();
//   return data.data || [];
// }

// async function fetchSpeakersSubpage(locale) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/speakers-subpage?locale=${locale}`,
//   );

//   if (!res.ok) {
//     throw new Error('Failed to fetch speaker card data');
//   }

//   const data = await res.json();
//   return data.data || [];
// }

// const speakersPage = async ({ params }) => {
//   const { locale } = await params;
//   const speakerCardData = await fetchSpeakerCardData(locale);
//   const pageData = await fetchSpeakersSubpage(locale);

//   return (
//     <div>
//       <div className="flex w-full flex-row items-between opacity-[0.03] z-0 absolute left-0 top-0 px-[40px] pt-[80px]">
//         <div className="flex justify-center flex-1">
//           <SpeakersBigTextOutline />
//         </div>
//         <div className="flex justify-center flex-1">
//           <SpeakersBigTextOutline />
//         </div>
//         <div className="hidden justify-center sm:flex sm:flex-1">
//           <SpeakersBigTextOutline />
//         </div>
//       </div>
//       <ContentWrapper className="mt-[96px] sm:mt-[120px] sm:pb-10">
//         <SectionMainTitle text={pageData.title} color="bg-secondary-600" underlineWidth={'97%'} />
//         <h2 className="text-white/80 mt-4 max-w-[760px] font-exo text-[16px] sm:text-[26px] font-normal leading-[130%] tracking-[2px] self-stretch">
//           {pageData.subtitle}
//         </h2>
//       </ContentWrapper>
//       <div className="max-w-[1128px] mb-10 z-20 relative scrollbar-container px-[16px] sm:px-[40px] h-auto mt-10 flex gl:mx-auto gl:justify-center items-start content-center gap-y-[56px] md:gap-y-[80px] md:gap-x-[40px] pb-[24px] overflow-x-scroll flex-wrap">
//         {speakerCardData.map((speaker, index) => (
//           <div
//             key={index}
//             className={`flex min-w-fit md:min-w-[240px] justify-center items-start gap-[10px] flex-[1_0_0]`}
//           >
//             <SpeakerCard
//               speakerData={speaker}
//               image={`${process.env.NEXT_PUBLIC_STRAPI_URL}${speaker.Picture.formats.small.url}`}
//             />
//           </div>
//         ))}
//         <MoreSpeakersTag
//           mainText={pageData.tagMainText}
//           secondaryText={pageData.tagSecondaryText}
//         />
//       </div>
//       <Footer locale={locale} />
//     </div>
//   );
// };

// export default speakersPage;
