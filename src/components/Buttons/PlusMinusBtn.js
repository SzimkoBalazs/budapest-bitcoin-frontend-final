"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image'
import {cln} from "@/utilities/classnames";

const PlusMinusBtn = ({isPlus, onClick, isDisabled}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

    const isActive = isHovered || isTouched;

    useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 560);
    }
  }, []);

  return(
      <button onClick={!isDisabled ? onClick : null}
              onMouseEnter={() => !isMobile && !isDisabled && setIsHovered(true)}
              onMouseLeave={() => !isMobile && !isDisabled && setIsHovered(false)}
              onTouchStart={() => isMobile && !isDisabled && setIsTouched(true)}
              onTouchEnd={() => isMobile && !isDisabled && setIsTouched(false)}
              style={{
                opacity:isDisabled ? 0.5 : 1,
              }}
              className={cln(isPlus ? 'bg-primary-500' : 'bg-neutral-100',!isDisabled && "active:shadow-none active:translate-y-[6px]", "cursor-pointer w-[64px] relative flex h-[42px] items-center rounded-[10px] border-2 border-black shadow-[0px_6px_0px_0px_#000] transition-shadow duration-100 justify-center")}>
          <h5 className={cln(isPlus ? "text-white" : "text-black", "text-[24px]")} style={{fontWeight:600, marginBottom:2}}>{isPlus ? '+' : '-'}</h5>
      </button>
  )
};

export default PlusMinusBtn;
