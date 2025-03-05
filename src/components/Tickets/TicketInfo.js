"use client";

import React, {useState, useEffect} from "react";
import { cln } from "@/utilities/classnames";
import Image from 'next/image'
import CloseButton from "@/components/Buttons/CloseButton";

const TicketInfo = ({ name, details, onCloseClick }) => {

  return (
    <div className="flex w-screen h-screen items-center justify-center fixed top-0 left-0 z-50 backdrop-blur-sm"
         style={{
             background:'rgba(0,0,0,0.5)',
         }}
    >
        {/*BLACK CONTAINER */}
        <div className="w-full max-w-[440px] sm:rounded-[20px] flex bg-black px-6 py-8 flex-col gap-y-6 border-2 border-neutral-700">
            <div className="flex flex-row justify-between">
                <h3 className="text-[20px] text-white font-exo font-bold tracking-[1px]">{name}</h3>
                <CloseButton onClick={onCloseClick}/>
            </div>
              <div className="flex flex-col items-start gap-[6px] lg:gap-[8px] self-stretch">
          {details.map((text, index) => (
            <div
              key={index}
              className={`flex items-center gap-[10px] px-[6px] lg:px-[8px] py-[6px] lg:py-[4px] bg-[#4D4D4D] ${
                index === 0
                  ? "w-[280px] sm:w-[320px] max-w-[100%]"
                  : text.length > 60
                  ? "w-[280px] sm:w-[320px] max-w-[100%]"
                  : text.length > 40
                  ? "w-[260px] sm:w-[300px] max-w-[100%]"
                  : "w-[240px] sm:w-[280px] max-w-[100%]"
              }`}
            >
              <p
                className="text-white font-exo text-[14px] sm:text-[16px] leading-[125%] lg:leading-[130%] flex-1"
                style={{ fontWeight: 600 }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};

export default TicketInfo;
