"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image'
import {cln} from "@/utilities/classnames";

const SelectButton = ({isCardPayment, onClick, children, isSelected}) => {
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 560);
    }
  }, []);

  return(
      <button onClick={(e)=>{
          e.preventDefault();
          onClick();
      }}
        className={cln(isCardPayment ? (isSelected ? "border-secondary-600 bg-secondary-600/30 border-[4px] shadow-[3px_3px_0_0_#308ADB]" : "border-secondary-600 hover:bg-secondary-600/10  border-2") : (isSelected ? "border-primary-600 bg-primary-600/30 border-4 shadow-[3px_3px_0_0_#F7931A]" : "border-primary-600 hover:bg-primary-600/10 border-2"), "cursor-pointer w-[50%] relative flex h-[64px] px-2 items-center rounded-[10px] justify-center"
        )}>
      <h3 className={cln("text-white text-[14px] font-exo font-bold tracking-[0.5px]")} style={{fontWeight:800, marginBottom:2}}>{children}</h3>
      </button>
  )
};

export default SelectButton;
