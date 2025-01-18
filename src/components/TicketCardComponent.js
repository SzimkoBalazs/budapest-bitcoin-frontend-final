import React from "react";
import TicketCard from "./TicketCard";

const TicketCardComponent = () => {
  return (
    <div className="flex w-[1358px] px-[24px] justify-between items-center content-center gap-y-[24px] flex-wrap">
      <div className="flex min-w-[380px] pt-[56px] pb-[8px] justify-center items-start gap-[10px] flex-[1_0_0]">
        <TicketCard borderColor="white" />
      </div>
      <div className="flex h-[668px] min-w-[380px] flex-col items-center gap-[56px] flex-[1_0_0]">
        <TicketCard borderColor="primary-500" />
        <span className="w-[406px] h-[28px] flex-shrink-0 rounded-[406px] bg-[radial-gradient(ellipse_at_center,_#000_0%,_rgba(0,0,0,0.2)_100%)] blur-[6.7px]" />
      </div>
      <div className="flex min-w-[380px] pt-[56px] pb-[8px] justify-center items-start gap-[10px] flex-[1_0_0]">
        <TicketCard borderColor="white" />
      </div>
    </div>
  );
};

export default TicketCardComponent;
