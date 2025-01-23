"use client";
import React, { useState } from "react";

const GetYourPassCTAButton = ({ buttonText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer relative flex h-[50px] px-[16px] items-center gap-1 rounded-[40px] border-2 border-black shadow-[0px_6px_0px_0px_#000] transition-shadow duration-100  bg-white active:shadow-none active:translate-y-[6px] group"
      >
        {/* A szöveges kapszula */}
        <div className="z-10 flex justify-center items-center gap-[4px] p-[4px_6px] rounded-[40px] bg-white group-hover:bg-transparent transition-all duration-75">
          <p style={{textTransform:'uppercase'}} className="text-nowrap text-[rgba(0,0,0,0.80)] font-exo text-center text-[14px] font-extrabold leading-normal group-hover:text-white">
            {buttonText.ButtonText}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            height: "100%",
            width: isHovered ? "100%" : "50%",
            transition: "all 0.6s ease-in-out",
            position: "absolute",
            right: 0,
            backgroundColor: "#F7931A",
            borderTopLeftRadius: isHovered ? 20 : 0,
            borderBottomLeftRadius: isHovered ? 20 : 0,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
        {/* Az SVG ikon */}
        <div className="flex pb-[1px] items-center gap-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.641"
            height="24.854"
            viewBox="0 0 18 25"
            fill="none"
            style={{ transform: "rotate(12.843deg)" }}
          >
            <g transform="rotate(-12.843 9 12.5)">
              <path
                d="M7.07882 0.136756L7.03588 3.70627L8.77708 3.72728L8.82002 0.157764L10.9794 0.184473L11.093 0.300961L11.0508 3.83356C12.7551 4.07428 15.075 4.52371 15.9304 6.22569C16.8068 7.95962 16.3823 10.4586 14.5206 11.3562C16.5434 12.0295 17.5827 13.2119 17.5597 15.4218C17.5157 19.4693 14.3111 20.4847 10.8544 20.6159L10.81 24.2593L8.54007 24.2302L8.58451 20.5869L6.84331 20.5658L6.79888 24.2092L4.52896 24.1801L4.5734 20.5368L0.180895 20.4818L0.590416 17.7565C1.27206 17.6516 2.81205 18.1365 3.01389 17.2132L3.13002 6.97144C3.05487 6.56141 2.50587 6.16295 2.12448 6.15804L0.346447 6.13624L0.373956 3.70476L4.76646 3.75976L4.80766 0.222794L4.92376 0.109055L7.08318 0.135763L7.07882 0.136756ZM7.02851 10.7677C8.63009 10.7792 12.0482 11.0012 12.13 8.66759C12.2179 6.19938 8.72567 6.37549 7.08191 6.35983L7.03187 10.7623L7.02851 10.7677ZM6.94847 17.8319C8.66478 17.9045 13.0723 18.126 13.1143 15.5167C13.1547 12.8205 8.78276 13.0364 7.00735 13.0461L6.95283 17.8309L6.94847 17.8319Z"
                fill="rgba(255, 255, 255, 0.6)"
                className="group-hover:fill-white group-active:fill-white transition-all duration-200"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GetYourPassCTAButton;
