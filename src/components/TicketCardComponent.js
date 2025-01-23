import React from "react";
import TicketCard from "./TicketCard";

const TicketCardComponent = ({ ticketCardContent }) => {
  return (
    <div className="scroll-container flex px-[24px] justify-between items-center content-center gap-y-[24px] overflow-x-scroll flex-nowrap">
      <div className="flex min-w-[380px] pt-[16px] pb-[8px] justify-center items-start gap-[10px] flex-[1_0_0]">
        <TicketCard
          ticketCardContent={ticketCardContent[0]}
          borderColor="white"
        />
      </div>
      <div className="flex mb-4 min-w-[380px] flex-col items-center gap-[72px] flex-[1_0_0]">
        <TicketCard
          ticketCardContent={ticketCardContent[1]}
          borderColor="primary-500"
        />
        <span style={{background:'radial-gradient(50% 50% at 50% 50%, #000 0%, rgba(0, 0, 0, 0.10) 100%)'}} className="w-[406px] h-[28px] rounded-[406px] blur-[6.7px]" />
      </div>
      <div className="flex min-w-[380px] pt-[16px] pb-[8px] justify-center items-start gap-[10px] flex-[1_0_0]">
        <TicketCard
          ticketCardContent={ticketCardContent[2]}
          borderColor="white"
        />
      </div>
    </div>
  );
};

export default TicketCardComponent;
