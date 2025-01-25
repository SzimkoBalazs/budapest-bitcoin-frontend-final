import SocialIconsSVG from "@/utilities/SocialIconsSVG";
import React from "react";

const GetInTouch = ({ data }) => {
  const socialLinks = {
    fbLink: data.FacebookLink,
    linkedInLink: data.LinkedInLink,
    telegramLink: data.TelegramLink,
    xLink: data.XLink,
    instagramLink: data.InstagramLink,
  };
  return (
    <div className="flex flex-col w-fit gap-[40px]">
      <div className="flex flex-col items-center md:items-start gap-[16px] self-stretch">
        <div className="flex justify-center items-center gap-[10px]">
          <p className="text-[rgba(255,255,255,0.80)] font-exo text-[20px] md:text-[22px] font-extrabold leading-[110%] tracking-[1.8px] fullhd:tracking-[2.6px]">
            {data.FirstRigthText}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className="fullhd:flex-[1_0_0] text-[rgba(255,255,255,0.80)] font-exo text-[16px] font-medium leading-[150%] tracking-[1px]">
            {data.EmailText}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center md:items-start gap-[16px]">
        <div className="flex justify-center items-center gap-[10px]">
          <p className="text-[rgba(255,255,255,0.80)] font-exo text-[20px] md:text-[22px] font-extrabold leading-[110%] tracking-[1.8px] fullhd:tracking-[2.6px]">
            {data.SecondRightText}
          </p>
        </div>
        <div className="flex items-center gap-[24px] self-stretch">
          <SocialIconsSVG links={socialLinks} />
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
