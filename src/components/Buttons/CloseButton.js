"use client";

import React, { useState } from "react";
import Image from 'next/image'
import CloseIcon from '../../../public/close-icon.svg';


const CloseButton = ({onClick}) => {
  return (
    <button className="flex relative flex-col items-start cursor-pointer">
      <div
        className={`flex w-[44px] h-[38px] justify-center items-center rounded-[10px] border-2 border-black bg-neutral-700 hover:bg-white/40 shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none active:bg-neutral-200 transition-all duration-75`}
        onClick={onClick}
      >
          <Image src={CloseIcon} alt={'Close icon'} width={12} height={12}/>
      </div>
    </button>
  );
};

export default CloseButton;
