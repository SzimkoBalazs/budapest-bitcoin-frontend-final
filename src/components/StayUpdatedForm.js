import React from "react";
import SecondaryCTAButton from "./SecondaryCTAButton";

const StayUpdatedForm = () => {
  return (
    <div className="flex w-[400px] fullhd:w-[554px] flex-col items-center justify-center fullhd:items-start gap-[40px]">
      <div className="flex flex-col items-start gap-[24px] self-stretch">
        <div className="flex w-[364px] flex-col items-start gap-[64px]">
          <div className="flex flex-col justify-center items-start gap-[34px]">
            <div className="flex relative w-[364px] flex-col justify-center items-start gap-[10px]">
              <span className="z-0 left-0 w-[352px] h-[16px] absolute bottom-[4px] bg-primary-500" />
              <p className="text-white z-10 [text-stroke-width:2px] [text-stroke-color:#1F1F1F] font-exo text-[40px] font-extrabold leading-[100%] tracking-[6px] uppercase">
                Stay updated
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[8px] self-stretch">
          <p className="w-[440px] text-[rgba(255,255,255,0.80)] font-exo text-[26px] font-extrabold leading-[110%] tracking-[2.6px]">
            True Bitcoiners Stay Ahead!
          </p>
          <p className="self-stretch text-[rgba(255,255,255,0.80)] font-exo text-[20px] font-medium leading-[150%] tracking-[1px]">
            Sign up for our newsletter to get the latest updates on Budapest
            Bitcoin 2025.
          </p>
        </div>
      </div>
      <div className="flex flex-col fullhd:flex-row fullhd:items-start gap-[16px] self-stretch">
        <div className="flex flex-col items-start gap-[8px] flex-[1_0_0]">
          <div className="flex h-[50px] px-[24px] py-[9px] items-center gap-[10px] self-stretch rounded-[43px] border-2 border-secondary-600 bg-neutral-950">
            <p className="text-neutral-300 text-center font-exo text-[14px] font-medium leading-normal">
              Email adress
            </p>
          </div>
          <div className="flex flex-col items-start gap-[10px] self-stretch">
            <div className="flex items-start gap-[10px] py-[12px] pl-[16px] pr-0">
              <div className="flex w-[16px] h-[16px] p-[10px] flex-col items-start gap-[10px] rounded-[4px] border border-neutral-300"></div>
              <p className="text-neutral-300 font-exo text-[14px] font-medium leading-normal">
                I accept the regular conditions
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center mx-auto">
          <SecondaryCTAButton text="Sign up" />
        </div>
      </div>
    </div>
  );
};

export default StayUpdatedForm;
