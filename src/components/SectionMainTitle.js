import React from "react";
import {cln} from "@/utilities/classnames";

const SectionMainTitle = ({ text,textTop, textBottom, color, underlineWidth, minWidth, widthClass }) => {
  return (
    <div className="relative flex items-center">
      {/* Wrapper a szöveghez és a kék csíkhoz */}
      <div className="relative inline-block">
        {/* Kék csík */}
        <div
          className={cln("absolute bottom-[6px] xs:bottom-2 left-0 right-0 h-[12px] sm:h-[24px] z-0", color, widthClass)}
          style={{ width: underlineWidth ? underlineWidth : widthClass ? null : '97%', minWidth:minWidth }}
        />
        {/* Szöveg */}
        <h3 style={{fontWeight:800, textShadow:'2px 2px 2px rgba(0,0,0,1)'}} className="text-white font-exo text-[40px] sm:text-[56px] leading-[100%] tracking-[8.4px] uppercase z-10 relative">
          {text ? text : textTop}
        </h3>
          {textBottom && <h3 style={{fontWeight: 800, textShadow: '2px 2px 2px rgba(0,0,0,1)'}}
               className="text-white font-exo text-[40px] sm:text-[56px] leading-[100%] tracking-[8.4px] uppercase z-10 relative">
              {textBottom}
          </h3>}
      </div>
    </div>
  );
};

export default SectionMainTitle;
