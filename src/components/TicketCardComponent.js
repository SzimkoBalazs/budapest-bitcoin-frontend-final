import React from "react";
import TicketCard from "./TicketCard";
import { getTickets } from "@/app/actions/ticket";

const TicketCardComponent = async ({ ticketCardContent, locale }) => {
  const tickets = await getTickets();

  return (
    <div className="scrollbar-container px-[16px] md:px-[40px] mt-10 flex mx-auto gl:mx-0 gl:justify-center items-center content-center gap-x-[24px] lg:gap-x-[40px] pb-[24px] overflow-x-scroll flex-nowrap">
      <TicketCard
        ticketCardContent={ticketCardContent[0]}
        ticketInfo={tickets[0]}
        borderColor="white"
        beforePrice={2000}
        locale={locale}
      />

      <div className="flex flex-col gap-y-[56px]">
        <TicketCard
          ticketCardContent={ticketCardContent[1]}
          ticketInfo={tickets[1]}
          borderColor="primary-500"
          beforePrice={80000}
          locale={locale}
        />
        <span
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #000 0%, rgba(0, 0, 0, 0.10) 100%)",
          }}
          className="w-full h-[28px] rounded-[406px] blur-[6.7px]"
        />
      </div>
      <TicketCard
        ticketCardContent={ticketCardContent[2]}
        ticketInfo={tickets[2]}
        borderColor="white"
        beforePrice={360000}
        locale={locale}
      />
    </div>
  );
};

export default TicketCardComponent;
