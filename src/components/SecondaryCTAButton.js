import React from "react";

const SecondaryCTAButton = ({ text }) => {
  return (
    <div className="flex h-[54px] flex-col items-start">
      <div className="flex h-[50px] flex-col items-start gap-[10px] flex-shrink-0 self-stretch">
        <div className="flex h-[50px] min-w-[136px] px-[16px] py-[10px] justify-center items-center gap-[4px] flex-shrink-0 rounded-[40px] border-2 border-secondary-600 bg-neutral-900 hover:bg-neutral-700 active:bg-secondary-600 active:bg-none active:shadow-none active:translate-y-[6px] shadow-[0px_6px_0px_0px_#000] transition-all duration-200">
          <div className="flex p-[4px_6px] justify-center items-center gap-[4px] rounded-[40px]">
            <p className="text-white text-center font-exo text-[14px] uppercase font-extrabold leading-normal">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryCTAButton;
