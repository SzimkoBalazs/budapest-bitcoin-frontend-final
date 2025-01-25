import React from "react";

const ThereIsMoreSectionDividerText = ({ firstText, secondText }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center overflow-hidden">
      <p className="text-neutral-300 font-exo font-extrabold leading-[100%] text-wrap md:text-nowrap text-[64px] md:text-[96px]">
        {firstText}
      </p>
      <p className="text-primary-500 text-center md:text-left font-exo font-extrabold leading-[100%] text-wrap md:text-nowrap text-[64px] md:text-[96px]">
        {secondText}
      </p>
    </div>
  );
};

export default ThereIsMoreSectionDividerText;
