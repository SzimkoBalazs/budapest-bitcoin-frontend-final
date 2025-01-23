import React from "react";

const WhatToExpectSection = ({number,text}) => {
    return(
            <div className="flex w-full h-[120px] speaker:h-[160px] p-[16px] flex-col justify-end items-start gap-[8px] rounded-[20px] border-2 border-primary-500">
                <p className="text-white text-center font-exo text-[40px] font-extrabold leading-[100%] tracking-[6px]">
                    {number}
                </p>
                <p className="text-white text-center font-exo text-[24px] font-normal leading-[100%] tracking-[3.6px]">
                    {text}
                </p>
              </div>
    )
}

export default WhatToExpectSection;