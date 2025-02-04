import React from "react";
import TicketBarcodeSVG from "./TicketBarcodeSVG";
import { cln } from "@/utilities/classnames";
import Link from "next/link";

const TicketCard = ({ ticketCardContent, ticketInfo, borderColor }) => {
  return (
    //   OUTSIDE CONTAINER
    <div
      className="flex w-[256px] lg:w-[344px] h-[504px] lg:h-[584px] pt-[8px] lg:pt-[16px] flex-col items-center justify-between rounded-[20px] border-[4px]  bg-black shadow-[1px_1px_0px_0px_#FFF,_2px_2px_0px_0px_#FFF,_3px_3px_0px_0px_#FFF,_4px_4px_0px_0px_#FFF,_5px_5px_0px_0px_#FFF,_6px_6px_0px_0px_#FFF,_7px_7px_0px_0px_#FFF,_8px_8px_0px_0px_#FFF]"
      style={{
        borderColor: borderColor === "primary-500" ? "#F7931A" : "#FFF",
      }}
    >
      {/*INSIDE CONTAINER FOR BOTH TEXTS*/}
      <div className="flex px-[12px] lg:px-[24px] flex-col items-start gap-[12px] lg:gap-[20px] self-stretch">
        {/*CONTAINER FOR TITLE*/}
        <div className="flex px-[10px] py-[16px] lg:py-[24px] justify-center items-center gap-[10px] self-stretch">
          <h3 className="flex-[1_0_0] text-white text-center font-exo text-[28px] lg:text-[44px] font-extrabold leading-[100%] tracking-[2.2px]">
            {ticketCardContent.PassTitle}
          </h3>
          <p className="text-white">{ticketInfo.price / 100}</p>
        </div>
        {/*container for title*/}
        {/*CONTAINER FOR BULLETPOINTS*/}
        <div className="flex flex-col items-start gap-[8px] self-stretch">
          {ticketCardContent.PassDescription.map((text, index) => (
            <div
              key={index}
              className={`flex items-center gap-[10px] px-[8px] py-[4px] bg-[#4D4D4D] ${
                index === 0
                  ? "w-[260px] max-w-[100%]"
                  : text.length > 60
                  ? "w-[280px] max-w-[100%]"
                  : text.length > 40
                  ? "w-[240px] max-w-[100%]"
                  : "w-[220px] max-w-[100%]"
              }`}
            >
              <p
                className="text-white font-exo text-[14px] leading-[125%] lg:leading-[130%] flex-1"
                style={{ fontWeight: 600 }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
        {/*  container for bulletpoints */}
        <Link href="/checkout">
          <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
            Get Your Ticket
          </button>
        </Link>
      </div>
      {/*inside container for both texts*/}
      {/*CONTAINER FOR BARCODE*/}
      <div
        className={cln("w-full py-4 border-t-4", `"border-t-${borderColor}"`)}
      >
        <TicketBarcodeSVG />
      </div>
    </div>
  );
};

export default TicketCard;
