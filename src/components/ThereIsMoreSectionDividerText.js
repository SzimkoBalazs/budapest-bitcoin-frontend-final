import React from "react";
import {cln} from "@/utilities/classnames";

const ThereIsMoreSectionDividerText = ({ firstText, secondText, locale }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center overflow-hidden">
      <p className={cln("text-neutral-300 font-exo font-extrabold leading-[100%] text-wrap md:text-nowrap", locale === 'hu' ? 'text-[56px] md:text-[80px]' : 'text-[64px] md:text-[96px]')}>
        {firstText}
      </p>
      <p className={cln("text-primary-500 text-center md:text-left font-exo font-extrabold leading-[100%] text-wrap md:text-nowrap", locale === 'hu' ? 'text-[56px] md:text-[80px]' : 'text-[64px] md:text-[96px]')}>
        {secondText}
      </p>
    </div>
  );
};

export default ThereIsMoreSectionDividerText;
