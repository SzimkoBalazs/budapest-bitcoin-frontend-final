import React from "react";
import SliderGallery from "./sliderGallery/SliderGallery";

const BudapestCultureGallery = ({ title, galleryData }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="max-w-[800px] text-neutral-200 text-center font-exo text-[28px] xs:text-[32px] md:text-[50px] font-extrabold leading-[130%] tracking-[2.5px]">
        {title}
      </h3>
      <div className="w-full flex justify-center items-center overflow-hidden">
        <SliderGallery data={galleryData} />
      </div>
    </div>
  );
};

export default BudapestCultureGallery;
