import React from "react";
import {cln} from "@/utilities/classnames";

const SectionMainTitle = ({ text, color, underlineWidth, minWidth }) => {
  return (
    <div className="relative flex items-center">
      {/* Wrapper a szöveghez és a kék csíkhoz */}
      <div className="relative inline-block">
        {/* Kék csík */}
        <div
          className={cln("absolute bottom-2 left-0 right-0 h-[24px] z-0", color)}
          style={{ width: underlineWidth ? underlineWidth : '97%', minWidth:minWidth }}
        />
        {/* Szöveg */}
        <h3 style={{fontWeight:800}} className="text-white text-stroke font-exo text-[56px] leading-[100%] tracking-[8.4px] uppercase z-10 relative">
          {text}
        </h3>
      </div>
    </div>
  );
};

export default SectionMainTitle;
