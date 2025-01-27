import React from "react";
import {cln} from "@/utilities/classnames";

const SectionMainTitle = ({ text,textTop, textBottom, color, underlineWidth, minWidth, widthClass, textSize }) => {
  return (
    <div className="relative flex items-center">
      {/* Wrapper a szöveghez és a kék csíkhoz */}
      <div className="relative inline-block">
        {/* Kék csík */}
        <div
          className={cln("absolute bottom-[4px] sm:bottom-2 left-0 right-0 h-[12px] sm:h-[24px] z-0", color, widthClass)}
          style={{ width: underlineWidth ? underlineWidth : widthClass ? null : '97%', minWidth:minWidth }}
        />
        {/* Szöveg */}
        <h3 style={{fontWeight:800, textShadow:'2px 2px 2px rgba(0,0,0,1)'}} className={cln("text-white font-exo leading-[100%] tracking-[4px] sm:tracking-[8.4px] uppercase z-10 relative", textSize ? textSize : 'text-[36px] xs:text-[40px] sm:text-[56px]')}>
          {text ? text : textTop}
        </h3>
          {textBottom && <h3 style={{fontWeight: 800, textShadow: '2px 2px 2px rgba(0,0,0,1)'}}
               className={cln("text-white font-exo leading-[100%] tracking-[4px] sm:tracking-[8.4px] uppercase z-10 relative", textSize ? textSize : 'text-[40px] sm:text-[56px]')}>
              {textBottom}
          </h3>}
      </div>
    </div>
  );
};

export default SectionMainTitle;
