import React from "react";

const WhatToExpectSection = ({number,text}) => {
    return(
            <div className="flex w-full h-[120px] text-white hover:text-black speaker:h-[160px] p-[16px] flex-col justify-end items-start gap-[8px] rounded-[20px] border-2 border-primary-500 hover:bg-primary-500">
                <p className="text-center font-exo text-[24px] xxs:text-[28px] sm:text-[40px] font-extrabold leading-[100%] tracking-[6px]">
                    {number}
                </p>
                <h4 className="no-underline text-center font-exo text-[16px] xxs:text-[18px] sm:text-[24px] font-normal leading-[100%] tracking-[3.6px]">
                    {text}
                </h4>
              </div>
    )
}

export default WhatToExpectSection;