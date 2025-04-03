// import React from 'react';
// import linkedin from '../../../../../public/linkedin.svg';
// import x from '../../../../../public/x.svg';
// import nostr from '../../../../../public/nostr.svg';
// import facebook from '../../../../../public/facebook.svg';
// import instagram from '../../../../../public/instagram.svg';
// import youtube from '../../../../../public/youtube.svg';
// import ContentWrapper from '@/utilities/ContentWrapper';
// import Footer from '@/components/SinglePageComponents/Footer';
// import ImageForSpeakerCard from '@/components/ImageForSpeakerCard';
// import SectionMainTitle from '@/components/SectionMainTitle';
// import SocialIcon from '@/components/SocialIcon';
// import { cln } from '@/utilities/classnames';

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

// export default async function SpeakerPage({ params }) {
//   const { slug, locale } = await params;

//   const speakerData = await fetchSpeakerCardData(locale);
//   const speaker = speakerData.find((speaker) => speaker.url === slug);

//   const descriptionLength = speaker.description.length;
//   console.log('description length', descriptionLength);

//   return speaker ? (
//     <ContentWrapper className="mt-[96px] xs:mt-[120px] pb-10 sm:pb-20 flex flex-col gap-y-[48px] items-center">
//       <SectionMainTitle textTop={speaker.Name} color="bg-secondary-600" widthClass={'w-[97%]'} />
//       <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start gap-x-10 gap-y-10">
//         <div className="relative flex w-[216px] h-[192px] flex-col items-start">
//           <div className="w-[216px] h-[192px] rounded-[15px] border-[6px] border-white overflow-hidden">
//             <ImageForSpeakerCard
//               image_url={`${process.env.NEXT_PUBLIC_STRAPI_URL}${speaker.Picture.formats.small.url}`}
//             />
//           </div>
//         </div>
//         {/* Alsó tartalom */}
//         <div
//           className={cln(
//             'relative z-10',
//             descriptionLength > 800 ? 'max-w-[560px]' : 'max-w-[356px]',
//           )}
//         >
//           <div className="flex flex-col p-[24px] gap-[8px] self-stretch rounded-[8px] border-[4px] border-white shadow-[1px_1px_0px_2px_#FFF,_2px_2px_0px_2px_#FFF,_3px_3px_0px_2px_#FFF,_4px_4px_0px_2px_#FFF,_5px_5px_0px_2px_#FFF,_6px_6px_0px_2px_#FFF,_7px_7px_0px_2px_#FFF,_8px_8px_0px_2px_#FFF] bg-black overflow-hidden ">
//             <div className="flex flex-col items-start gap-[8px] self-stretch py-[4px]">
//               <div className="flex items-start gap-[10px] self-stretch">
//                 <h3 className="text-white font-exo text-[24px] font-bold leading-normal flex-[1_0_0]">
//                   {speaker?.Position}
//                 </h3>
//               </div>
//               <div className="flex items-start self-stretch mb-2">
//                 <a
//                   href={speaker?.websiteUrl}
//                   className="text-[#399BFC] font-exo text-[18px] py-[6px] font-bold leading-none flex-[1_0_0]"
//                 >
//                   {speaker?.Company}
//                 </a>
//               </div>
//               <p
//                 className="font-exo font-normal text-white/80 text-[16px]"
//                 style={{ lineHeight: '150%' }}
//               >
//                 {speaker?.description}
//               </p>
//             </div>
//             {/*SOCIAL MEDIA IKONOK*/}
//             <div className="flex gap-x-4 gap-y-4 mt-4 flex-wrap">
//               {speaker?.linkedin && (
//                 <SocialIcon type={'linkedin'} icon={linkedin} href={speaker?.linkedin} />
//               )}
//               {speaker?.x && <SocialIcon type={'x'} icon={x} href={speaker?.x} />}
//               {speaker?.nostr && <SocialIcon type={'nostr'} icon={nostr} href={speaker?.nostr} />}
//               {speaker?.youtube && (
//                 <SocialIcon type={'youtube'} icon={youtube} href={speaker?.youtube} />
//               )}
//               {speaker?.facebook && (
//                 <SocialIcon type={'facebook'} icon={facebook} href={speaker?.facebook} />
//               )}
//               {speaker?.instagram && (
//                 <SocialIcon type={'instagram'} icon={instagram} href={speaker?.instagram} />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </ContentWrapper>
//   ) : (
//     <h2>loading</h2>
//   );
// }
