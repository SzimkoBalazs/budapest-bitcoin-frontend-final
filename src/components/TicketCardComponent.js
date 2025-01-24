import React from "react";
import TicketCard from "./TicketCard";

const TicketCardComponent = ({ ticketCardContent }) => {
  return (
    <div className="scrollbar-container px-[16px] md:px-[40px] mt-10 flex mx-auto gl:mx-0 gl:justify-center items-center content-center gap-x-[32px] md:gap-x-[40px] pb-[24px] overflow-x-scroll flex-nowrap">
        <TicketCard
          ticketCardContent={ticketCardContent[0]}
          borderColor="white"
        />

      <div className="flex flex-col gap-y-[56px]">
        <TicketCard
          ticketCardContent={ticketCardContent[1]}
          borderColor="primary-500"
        />
        <span style={{background:'radial-gradient(50% 50% at 50% 50%, #000 0%, rgba(0, 0, 0, 0.10) 100%)'}} className="w-full h-[28px] rounded-[406px] blur-[6.7px]" />
      </div>
        <TicketCard
          ticketCardContent={ticketCardContent[2]}
          borderColor="white"
        />
    </div>
  );
};

export default TicketCardComponent;
