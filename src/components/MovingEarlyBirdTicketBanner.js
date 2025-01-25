import React from "react";
import MovingEarlyBirdTicketBannerContent from "./MovingEarlyBirdTicketBannerContent";

const MovingEarlyBirdTicketBanner = ({ firstText, secondText }) => {
  return (
    <div
      className="bg-[#000] overflow-hidden"
      style={{
        borderTop: "2px solid #4d4d4d",
        borderBottom: "2px solid #4d4d4d",
      }}
    >
      <div className="inline-flex p-[10px] justify-center items-center gap-[10px] animate-marquee whitespace-nowrap">
        <MovingEarlyBirdTicketBannerContent
          firstText={firstText}
          secondText={secondText}
        />
        <MovingEarlyBirdTicketBannerContent
          firstText={firstText}
          secondText={secondText}
        />
        <MovingEarlyBirdTicketBannerContent
          firstText={firstText}
          secondText={secondText}
        />
        <MovingEarlyBirdTicketBannerContent
          firstText={firstText}
          secondText={secondText}
        />
      </div>
    </div>
  );
};

export default MovingEarlyBirdTicketBanner;
