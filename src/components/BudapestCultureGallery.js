import React from "react";
import SliderGallery from "./sliderGallery/SliderGallery";

const BudapestCultureGallery = () => {
  return (
    <div className="flex flex-col items-center gap-[80px]">
      <p className="max-w-[800px] text-neutral-200 text-center font-exo text-[50px] font-extrabold leading-[130%] tracking-[2.5px]">
        Explore Budapest’s rich culture with our exclusive side events:
      </p>
      <SliderGallery />
    </div>
  );
};

export default BudapestCultureGallery;
