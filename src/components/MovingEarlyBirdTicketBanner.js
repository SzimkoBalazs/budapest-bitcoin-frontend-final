import React from "react";
import MovingEarlyBirdTicketBannerContent from "./MovingEarlyBirdTicketBannerContent";

const MovingEarlyBirdTicketBanner = ({ bannerContent }) => {
  return (
    <div className=" bg-[#000] border-2 border-neutral-700 overflow-hidden">
      <div className="inline-flex p-[10px] justify-center items-center gap-[10px] animate-marquee whitespace-nowrap">
        <MovingEarlyBirdTicketBannerContent bannerContent={bannerContent} />
        <MovingEarlyBirdTicketBannerContent bannerContent={bannerContent} />
        <MovingEarlyBirdTicketBannerContent bannerContent={bannerContent} />
        <MovingEarlyBirdTicketBannerContent bannerContent={bannerContent} />
      </div>
    </div>
  );
};

export default MovingEarlyBirdTicketBanner;
