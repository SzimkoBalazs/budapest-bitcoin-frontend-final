"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

const SecondaryButton = ({type, onClick, style, text}) => {

  return (
    <button
      type={type}
      onClick={onClick}
      className="flex h-[50px] flex-col cursor-pointer min-w-[136px] px-[16px] justify-center items-center rounded-[40px] border-2 border-secondary-600 bg-neutral-900 hover:bg-neutral-700 active:bg-secondary-600 active:shadow-none active:translate-y-[6px] shadow-[0px_6px_0px_0px_#000] transition-all duration-100"
      style={style}
    >
        <p className="text-white text-center font-exo text-[14px] uppercase font-extrabold leading-normal">
            {text}
        </p>
    </button>
  );
};

export default SecondaryButton;
