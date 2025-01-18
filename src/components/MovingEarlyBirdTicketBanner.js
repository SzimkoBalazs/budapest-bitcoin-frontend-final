import React from "react";
import MovingEarlyBirdTicketBannerContent from "./MovingEarlyBirdTicketBannerContent";

const MovingEarlyBirdTicketBanner = () => {
  return (
    <div className=" bg-[#000] flex-shrink-0 border-2 border-neutral-700 overflow-hidden">
      <div className="inline-flex p-[10px] justify-center items-center gap-[10px] animate-marquee whitespace-nowrap">
        <MovingEarlyBirdTicketBannerContent />
        <MovingEarlyBirdTicketBannerContent />
        <MovingEarlyBirdTicketBannerContent />
      </div>
    </div>
  );
};

export default MovingEarlyBirdTicketBanner;
