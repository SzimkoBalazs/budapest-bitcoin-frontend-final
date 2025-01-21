import React from "react";
import TicketBarcodeSVG from "./TicketBarcodeSVG";

const grayBars = [
  "All benefits of the Conference Pass.",
  "Exclusive access to the VIP Whale Lounge with premium food and drinks.",
  "Entry to the private Whale Night VIP event.",
  "Priority access and premium seating at all stages.",
  "Network with speakers, industry leaders, and VIP guests in the Whale area.",
];

const TicketCard = ({ ticketCardContent, borderColor }) => {
  return (
    <div
      className="flex w-[344px] h-[584px] pt-[16px] flex-col justify-between items-center rounded-[20px] border-[4px]  bg-black shadow-[1px_1px_0px_0px_#FFF,_2px_2px_0px_0px_#FFF,_3px_3px_0px_0px_#FFF,_4px_4px_0px_0px_#FFF,_5px_5px_0px_0px_#FFF,_6px_6px_0px_0px_#FFF,_7px_7px_0px_0px_#FFF,_8px_8px_0px_0px_#FFF]"
      style={{
        borderColor: borderColor === "primary-500" ? "#F7931A" : "#FFF",
      }}
    >
      <div className="flex px-[24px] flex-col items-start gap-[20px] self-stretch">
        <div className="flex flex-col items-start self-stretch">
          <div className="flex px-[10px] py-[24px] justify-center items-center gap-[10px] self-stretch">
            <p className="flex-[1_0_0] text-white text-center font-exo text-[44px] font-extrabold leading-[100%] tracking-[2.2px]">
              {ticketCardContent.PassTitle}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[8px] self-stretch">
          {ticketCardContent.PassDescription.map((text, index) => (
            <div
              key={index}
              className={`flex items-center gap-[10px] px-[8px] py-[4px] bg-[#4D4D4D] ${
                index === 0
                  ? "w-[260px]"
                  : text.length > 60
                  ? "w-[280px]"
                  : text.length > 40
                  ? "w-[240px]"
                  : "w-[220px]"
              }`}
            >
              <p className="text-white font-exo text-[14px] font-bold leading-[130%] flex-1">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start gap-[8px] self-stretch">
        <div
          className="flex h-[88px] px-[24px] py-[16px] flex-col items-center gap-[20px] self-stretch rounded-b-[20px] border-t-[4px]"
          style={{
            borderColor: borderColor === "primary-500" ? "#F7931A" : "#FFF",
          }}
        >
          <div className="flex justify-center items-center flex-[1_0_0] self-stretch">
            <div className="w-[296px] h-[56px] shrink-0">
              <TicketBarcodeSVG />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
