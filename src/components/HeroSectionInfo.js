"use client";

import React, {useState} from "react";
import CloseButton from '../components/Buttons/CloseButton';

const HeroSectionInfo = ({heroSectionData}) => {
    const [isClosed, setIsClosed] = useState(false)
    return(
         <div style={{display: isClosed ? 'none' : 'flex'}} className="relative items-center mx-auto mb-4 sm:absolute sm:top-[100px] sm:right-[100px] max-w-[310px] sm:max-w-[400px] gap-x-4 bg-neutral-800 p-4 rounded-[20px] border-neutral-600 border-2">
             <div className="absolute top-[16px] right-[16px]">
                 <CloseButton onClick={()=>setIsClosed(true)}/>
             </div>
             <div className="flex flex-col gap-y-4 sm:gap-y-2">
                 {heroSectionData?.infoTitle && <h2 className="font-exo font-bold text-[18px] sm:text-[22px] text-primary-600">{heroSectionData.infoTitle}</h2>}
                 {heroSectionData?.infoTextFirst && <p className="font-exo text-[15px] sm:text-[16px] leading-[130%] text-white">{heroSectionData.infoTextFirst}</p>}
                 {heroSectionData?.infoTextSecond && <p className="font-exo text-[15px] sm:text-[16px] leading-[130%] text-white">{heroSectionData.infoTextSecond}</p>}
             </div>
             <h3 className="font-exo font-medium text-[140px] text-neutral-300 mt-12" style={{lineHeight:'100%'}}>!</h3>
        </div>
    )
}

export default HeroSectionInfo;