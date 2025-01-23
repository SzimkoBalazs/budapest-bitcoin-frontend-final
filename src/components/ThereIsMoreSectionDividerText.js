import React from "react";

const ThereIsMoreSectionDividerText = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-[24px] justify-center overflow-hidden">
      <div className="flex justify-center items-center">
        <p className="text-neutral-300 font-exo font-extrabold leading-[100%] text-nowrap">
          WAIT...
        </p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-primary-500 text-right font-exo font-extrabold leading-[100%] text-nowrap">
          THERE IS MORE
        </p>
      </div>
    </div>
  );
};

export default ThereIsMoreSectionDividerText;
