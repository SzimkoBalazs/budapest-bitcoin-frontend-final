import React from 'react';
import TicketCard from './TicketCard';
import { getTickets } from '@/app/actions/ticket';

const TicketCardComponent = async ({ ticketCardContent, locale }) => {
  const tickets = await getTickets();

  return (
    <div className="scrollbar-container px-[16px] md:px-[40px] mt-10 flex mx-auto gl:mx-0 gl:justify-center items-center content-center gap-x-[24px] lg:gap-x-[40px] pb-[24px] overflow-x-scroll flex-nowrap">
      {tickets.map((ticket, index) => {
        return index !== 1 ? (
          <TicketCard
            key={ticketCardContent[index].id}
            ticketCardContent={ticketCardContent[index]}
            ticketInfo={ticket}
            beforePrice={ticketCardContent[index].OldPrice}
            locale={locale}
          />
        ) : (
          <div className="flex flex-col gap-y-[56px]">
            <TicketCard
              key={ticketCardContent[index].id}
              ticketCardContent={ticketCardContent[index]}
              ticketInfo={ticket}
              borderColor="primary-500"
              beforePrice={ticketCardContent[index].OldPrice}
              locale={locale}
            />
            <span
              style={{
                background:
                  'radial-gradient(50% 50% at 50% 50%, #000 0%, rgba(0, 0, 0, 0.10) 100%)',
              }}
              className="w-full h-[28px] rounded-[406px] blur-[6.7px]"
            />
          </div>
        );
      })}
    </div>
  );
};

export default TicketCardComponent;
