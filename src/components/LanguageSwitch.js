"use client";

import React, { useState } from "react";

const LanguageSwitch = () => {
  const [activeLanguage, setActiveLanguage] = useState("EN");

  // Nyelvváltás funkció
  const toggleLanguage = () => {
    setActiveLanguage(activeLanguage === "EN" ? "HU" : "EN");
  };

  return (
    <div
      onClick={toggleLanguage}
      className="inline-flex items-center rounded-[4px] border-2 border-white bg-neutral-900 shadow-[-1px_1px_0px_0px_#000,_-2px_2px_0px_0px_#000,_-3px_3px_0px_0px_#000,_-4px_4px_0px_0px_#000] cursor-pointer"
    >
      {/* Kék csúszka */}
      <div
        className={`absolute flex w-[40px] p-2 justify-center items-center gap-[10px] rounded-[4px] border-2 border-white bg-secondary-600 transform transition-transform duration-300 -m-[2px] ${
          activeLanguage === "HU" ? "translate-x-[44px]" : "translate-x-0"
        }`}
      >
        <p className="text-white text-[14px] font-[600] leading-[100%] tracking-[2.1px]">
          {activeLanguage}
        </p>
      </div>

      {/* EN szöveg */}
      <div className="flex w-[40px] p-2 justify-center items-center gap-[10px] rounded-[4px]">
        <p className="text-white text-[14px] font-[600] font-exo leading-[100%] tracking-[2.1px]">
          EN
        </p>
      </div>

      {/* HU szöveg */}
      <div className="flex w-[40px] p-2 justify-center items-center gap-[10px] rounded-[4px]">
        <p className="text-white text-[14px] font-[600] font-exo leading-[100%] tracking-[2.1px]">
          HU
        </p>
      </div>
    </div>
  );
};

export default LanguageSwitch;
