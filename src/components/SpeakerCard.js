'use client';

import React from 'react';
import Link from 'next/link';
import linkedin from '../../public/linkedin.svg';
import x from '../../public/x.svg';
import nostr from '../../public/nostr.svg';
import ImageForSpeakerCard from './ImageForSpeakerCard';
import SocialIcon from '@/components/SocialIcon';
import {cln} from "@/utilities/classnames";

const SpeakerCard = ({ speakerData, image, isTeamMember }) => {
  return (
    <div className="flex flex-col items-start ">
      {/* Felső kép */}
      <div className="relative pl-[24px] flex w-[240px] h-[192px] flex-col items-start">
        {isTeamMember ? (
            <div
              className="w-full h-full rounded-[15px] border-[6px] border-white overflow-hidden"
            >
              <ImageForSpeakerCard image_url={image}/>
            </div>
        ) : (
            <Link
            href={`/speakers/${speakerData?.url}`}
            className="w-full h-full rounded-[15px] border-[6px] border-white overflow-hidden"
        >
          <ImageForSpeakerCard image_url={image}/>
        </Link>
        )}
      </div>

      {/* Alsó tartalom */}
      <div className="relative w-[240px] pr-[24px] mt-[-40px] z-10">
        <div className="flex flex-col p-[12px] gap-[8px] self-stretch rounded-[8px] border-[4px] border-white shadow-[1px_1px_0px_2px_#FFF,_2px_2px_0px_2px_#FFF,_3px_3px_0px_2px_#FFF,_4px_4px_0px_2px_#FFF,_5px_5px_0px_2px_#FFF,_6px_6px_0px_2px_#FFF,_7px_7px_0px_2px_#FFF,_8px_8px_0px_2px_#FFF] bg-black overflow-hidden ">
          {isTeamMember ? (
              <div className="flex h-[60px] flex-col gap-[12px] self-stretch">
                <p className="text-white font-exo text-[22px] font-bold leading-[110%]">
                  {speakerData?.Name}
                </p>
                <span className="w-[60px] h-[4px] bg-[#FFF]"/>
              </div>
          ) : (
              <Link
                href={`/speakers/${speakerData?.url}`}
                className="flex h-[60px] flex-col gap-[12px] self-stretch"
              >
                <p className="text-white font-exo text-[22px] font-bold leading-[110%]">
                  {speakerData?.Name}
                </p>
                <span className="w-[60px] h-[4px] bg-[#FFF]"/>
            </Link>
          )}
          <div className="flex flex-col items-start gap-[8px] self-stretch py-[4px]">
            <div className="flex items-start gap-[10px] self-stretch">
              <p className={cln(isTeamMember ? 'text-secondary-500 text-[15px]' : "text-[14px] text-[rgba(255,255,255,0.50)]", "font-exo  font-medium leading-normal flex-[1_0_0]")}>
                {speakerData?.Position}
              </p>
            </div>
            <div className="flex items-start self-stretch">
              <a
                href={speakerData?.websiteUrl}
                className="text-[#399BFC] font-exo text-[14px] py-[6px] font-bold leading-none flex-[1_0_0]"
              >
                {speakerData?.Company}
              </a>
            </div>
          </div>
          {/*SOCIAL MEDIA IKONOK*/}
          <div className="flex mt-2 gap-x-4">
            {speakerData?.linkedin && (
              <SocialIcon type={'linkedin'} icon={linkedin} href={speakerData?.linkedin} />
            )}
            {speakerData?.x && <SocialIcon type={'x'} icon={x} href={speakerData?.x} />}
            {speakerData?.nostr && (
              <SocialIcon type={'nostr'} icon={nostr} href={speakerData?.nostr} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;
