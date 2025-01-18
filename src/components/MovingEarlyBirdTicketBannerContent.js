import React from "react";

const MovingEarlyBirdTicketBannerContent = () => {
  return (
    <>
      <p className="text-white font-exo text-[18px] font-extrabold leading-[130%] tracking-[2.7px]">
        Early Bird tickets are live
      </p>
      <p className="text-white font-exo text-[18px] font-normal leading-[130%] tracking-[2.7px]">
        {" "}
        - stack a few sats for post-event beers!
      </p>
      <div className=" flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="35"
          viewBox="0 0 36 35"
          fill="none"
        >
          <g opacity="0.7" clipPath="url(#clip0_49_2787)">
            <path
              d="M17.9971 1.09961C8.82588 1.09961 1.39011 8.44132 1.39011 17.5C1.39011 26.5588 8.82588 33.9005 17.9943 33.9005C27.1627 33.9005 34.5985 26.5559 34.5985 17.5C34.5985 8.44414 27.1684 1.09961 17.9971 1.09961Z"
              stroke="white"
              strokeMiterlimit="10"
            />
            <path
              d="M23.1922 16.7781C24.6794 16.0479 24.9962 14.0659 24.2769 12.6985C23.5718 11.3593 21.7051 11.0266 20.3321 10.8546V8.05775L20.2407 7.96753H18.5081V10.7954H17.1094V7.96753H15.3768L15.2855 8.05775V10.8546H11.7574V12.7802H13.1875C13.4929 12.7802 13.941 13.0904 14.0038 13.4146V21.526C13.8497 22.2619 12.608 21.8925 12.0628 21.9828L11.7574 24.148H15.2855V27.0351H17.1094V24.148H18.5081V27.0351H20.3321V24.148C23.1066 24.0099 25.6756 23.1754 25.6727 19.9697C25.6727 18.2217 24.8249 17.2941 23.1922 16.781V16.7781ZM17.1694 12.8987C18.491 12.893 21.294 12.7182 21.2483 14.6749C21.2055 16.5216 18.4596 16.3834 17.1694 16.3891V12.9015V12.8987ZM17.1694 21.9799V18.1907C18.5966 18.1653 22.1075 17.9482 22.1018 20.0853C22.0933 22.1519 18.5481 22.0194 17.1694 21.9799Z"
              stroke="white"
              strokeMiterlimit="10"
            />
          </g>
          <defs>
            <clipPath id="clip0_49_2787">
              <rect width="36" height="35" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default MovingEarlyBirdTicketBannerContent;
