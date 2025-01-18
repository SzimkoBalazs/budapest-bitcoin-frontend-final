import React from "react";

const SectionMainTitle = ({ text, color }) => {
  return (
    <div className="relative flex items-center">
      {/* Wrapper a szöveghez és a kék csíkhoz */}
      <div className="relative inline-block">
        {/* Kék csík */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[32px] z-0"
          style={{ backgroundColor: color }}
        />
        {/* Szöveg */}
        <p className="text-white text-stroke font-exo text-[80px] font-bold leading-[100%] tracking-[12px] uppercase z-10 relative">
          {text}
        </p>
      </div>
    </div>
  );
};

export default SectionMainTitle;
