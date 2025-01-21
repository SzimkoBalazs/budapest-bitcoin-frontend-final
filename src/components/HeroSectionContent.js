import HeroSectionDots from "@/utilities/HeroSectionDots";
import React from "react";
import GetYourPassCTAButton from "./GetYourPassCTAButton";
import SecondaryCTAButton from "./SecondaryCTAButton";

const buttonText = {
  ButtonText: "Get your pass",
};

const HeroSectionContent = () => {
  return (
    <div className="flex flex-col items-center gap-[48px] lx:gap-[23px] ">
      <div className="flex flex-col items-start lx:gap-[12px] gap-[24px] self-stretch">
        <div className="flex flex-col lx:items-end gap-[-10px] self-stretch">
          <div className="flex p-[10px] justify-center items-center gap-[10px] bg-[#1F1F1F]">
            <p className="text-white text-right font-exo text-[16px] font-medium leading-[130%] tracking-[2.08px]">
              Back to the roots.
            </p>
          </div>
          <div className="flex justify-center items-center self-stretch">
            <div className="flex  justify-center items-center gap-[10px]">
              <p
                className="text-[48px] speaker:text-[94px] tracking-[6.24px] speaker:tracking-[12.48px]"
                style={{
                  flex: "1 0 0",
                  color: "#FFF",
                  textAlign: "center",
                  textShadow:
                    "-1px 1px 0px #FFAE0B, -2px 2px 0px #FFAE0B, -3px 3px 0px #FFAE0B, -4px 4px 0px #FFAE0B, -5px 5px 0px #FFAE0B, -6px 6px 0px #FFAE0B, -7px 7px 0px #FFAE0B, -9px 9px 8px rgba(247, 147, 26, 0.20)",
                  WebkitTextStrokeWidth: "2px",
                  WebkitTextStrokeColor: "#4D4D4D",
                  fontFamily: "Fredoka",

                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "100%",

                  textTransform: "uppercase",
                }}
              >
                Budapest Bitcoin
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lx:flex-row relative lx:justify-between lx:gap-[50px] gap-[70px] items-center self-stretch">
          <div className="relative w-[343px] h-[52px] text-center lx:text-left">
            <span className="z-0 left-[15%] lx:left-0 absolute bottom-[-6px] w-[240px] h-[10px] flex-shrink-0 bg-secondary-600" />
            <p className="text-white font-exo text-[22px] font-medium leading-[130%] tracking-[2.2px]">
              The Bitcoin Conference with
              <span className="text-white relative z-10 font-exo text-[24px] font-bold leading-[130%] tracking-[2.4px]">
                {" "}
                a bit of difference
              </span>
            </p>
          </div>
          <div className="flex w-[286.173px] flex-col justify-center items-center">
            <div className="flex justify-center items-center gap-[10px]">
              <p className="text-white font-exo text-[24px] font-extrabold leading-[150%] tracking-[3.12px]">
                AUGUST 8-9, 2025
              </p>
            </div>
            <div className="w-[286.173px] h-[95.905px] absolute ">
              <div className="w-[286.173px] h-[95.905px] flex-shrink-0 opacity-30">
                <HeroSectionDots />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lx:flex-row lx:items-start gap-[16px]">
        <GetYourPassCTAButton buttonText={buttonText} />
        <SecondaryCTAButton text="Become a partner" />
      </div>
    </div>
  );
};

export default HeroSectionContent;
