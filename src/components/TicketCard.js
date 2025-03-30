"use client";

import React from "react";
import { getTicketPrice } from "../../utils/getTicketPrice";

import TicketSvg from "../../public/ticket.svg";
import { priceWithSpace } from "../../utils/priceWithSpace";
import TicketBarcodeSVG from "./TicketBarcodeSVG";
import { cln } from "@/utilities/classnames";
import GetYourPassCTAButton from "@/components/GetYourPassCTAButton";

const TicketCard = ({
  ticketCardContent,
  ticketInfo,
  borderColor,
  beforePrice,
  locale,
}) => {
  function addTicket(id) {
    let selectedTickets = JSON.parse(
      localStorage.getItem("selectedTickets")
    ) || [
      { id: 1, quantity: 0 },
      { id: 2, quantity: 0 },
      { id: 3, quantity: 0 },
    ];
    selectedTickets = selectedTickets.map((ticket) => {
      return ticket.id === id ? { ...ticket, quantity: 1 } : ticket;
    });
    localStorage.setItem("selectedTickets", JSON.stringify(selectedTickets));
  }

  console.log("NwoContent:", ticketCardContent);

  return (
    //   OUTSIDE CONTAINER
    <div
      className="flex w-[260px] lg:w-[344px] h-[512px] lg:h-[584px] pt-[14px] lg:pt-[26px] flex-col items-center justify-between rounded-[20px] border-[4px]  bg-black shadow-[1px_1px_0px_0px_#FFF,_2px_2px_0px_0px_#FFF,_3px_3px_0px_0px_#FFF,_4px_4px_0px_0px_#FFF,_5px_5px_0px_0px_#FFF,_6px_6px_0px_0px_#FFF,_7px_7px_0px_0px_#FFF,_8px_8px_0px_0px_#FFF]"
      style={{
        borderColor: borderColor === "primary-500" ? "#F7931A" : "#FFF",
      }}
    >
      {/*INSIDE CONTAINER FOR BOTH TEXTS*/}
      <div className="flex px-[12px] lg:px-[24px] flex-col items-start gap-[16px] lg:gap-[20px] self-stretch">
        {/*CONTAINER FOR TITLE*/}
        <div className="flex flex-col px-[10px] justify-center items-center gap-[10px] self-stretch">
          <h3 className="flex-[1_0_0] text-white text-center font-exo text-[20px] sm:text-[24px] font-extrabold leading-[100%] tracking-[1.2px]">
            {ticketCardContent?.PassTitle
              ? ticketCardContent.PassTitle
              : "Unknown Pass"}
          </h3>
          {/* Commenting out until ticket sales */}
          {false && (
            <div className="flex flex-col items-center gap-y-1">
              {/*BEFORE PRICE*/}
              {beforePrice && (
                <div className="relative flex items-end justify-center">
                  <h5
                    className="text-neutral-700 text-[22px] lg:text-[28px] left-[-40%]"
                    style={{ fontWeight: 800, lineHeight: "100%" }}
                  >
                    {priceWithSpace(beforePrice, false)}
                  </h5>
                  <h3
                    className={cln(
                      locale === "hu"
                        ? "right-[-16px] lg:right-[-24px]"
                        : "right-[-28px] lg:right-[-40px]",
                      "text-neutral-700 absolute text-[12px] lg:text-[18px] mb-[1px] lg:mb-[2px] tracking-[1px]"
                    )}
                    style={{ fontWeight: 400, lineHeight: "100%" }}
                  >
                    {locale === "hu" ? "Ft" : "EUR"}
                  </h3>
                  <span
                    className="flex absolute w-full h-[1px] lg:h-[2px] bg-primary-600 top-[11px]"
                    style={{
                      transform: `rotate(${
                        beforePrice < 9999 ? "-22deg" : "-7deg"
                      })`,
                    }}
                  />
                </div>
              )}

              {/*ACTUAL PRICE*/}
              <div className="flex relative items-end justify-center gap-x-1">
                <h3
                  className="text-white text-[28px] lg:text-[38px] tracking-[2.4px]"
                  style={{ fontWeight: 800, lineHeight: "100%" }}
                >
                  {priceWithSpace(getTicketPrice(ticketInfo, locale), true)}
                </h3>
                <h3
                  className={cln(
                    locale === "hu"
                      ? "right-[-16px] lg:right-[-24px]"
                      : "right-[-36px] lg:right-[-48px]",
                    "text-white absolute text-[16px] lg:text-[22px] tracking-[1px] mb-[2px] lg:mb-[4px]"
                  )}
                  style={{ fontWeight: 400, lineHeight: "100%" }}
                >
                  {locale === "hu" ? "Ft" : "EUR"}
                </h3>
              </div>
            </div>
          )}
        </div>
        {/*container for title*/}
        {/*CONTAINER FOR BULLETPOINTS*/}
        <div className="flex flex-col items-start gap-[6px] lg:gap-[8px] self-stretch">
          {ticketCardContent?.PassDescription.map((text, index) => (
            <div
              key={index}
              className={`flex items-center gap-[10px] px-[6px] lg:px-[8px] py-[2px] lg:py-[4px] bg-[#4D4D4D] ${
                index === 0
                  ? "w-[260px] max-w-[100%]"
                  : text.length > 60
                  ? "w-[260px] max-w-[100%]"
                  : text.length > 40
                  ? "w-[240px] max-w-[100%]"
                  : "w-[220px] max-w-[100%]"
              }`}
            >
              <p
                className="text-white font-exo text-[13px] lg:text-[14px] leading-[125%] lg:leading-[130%] flex-1"
                style={{ fontWeight: 600 }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
        {/*  container for bulletpoints */}
      </div>
      <div className="flex flex-col w-full items-center gap-y-3 lg:gap-y-4">
        {/* <GetYourPassCTAButton
          buttonText={ticketCardContent?.ButtonText}
          anchorOrButton={"anchor"}
          // href={"/checkout"}
          href={"/"}
          image={TicketSvg}
          onClick={() => addTicket(ticketInfo.id)}
        /> */}
        {/*CONTAINER FOR BARCODE*/}
        <div
          className={cln(
            "w-full py-1 sm:py-2 px-2 border-t-4",
            `border-t-${borderColor}`
          )}
        >
          <TicketBarcodeSVG height={"50"} />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
