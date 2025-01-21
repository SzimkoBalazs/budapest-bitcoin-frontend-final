import React from "react";

const ThereIsMoreSectionDividerText = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-[24px] justify-center ">
      <div className="flex justify-center items-center">
        <p className="text-neutral-300 fullhd:text-[126px] text-[80px] font-exo font-extrabold leading-[100%]">
          WAIT...
        </p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-primary-500 text-right fullhd:text-[126px] text-[80px] font-exo font-extrabold leading-[100%]">
          THERE IS MORE
        </p>
      </div>
    </div>
  );
};

export default ThereIsMoreSectionDividerText;
