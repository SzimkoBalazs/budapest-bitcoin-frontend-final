import React from "react";
import StayUpdatedForm from "../StayUpdatedForm";
import GetInTouch from "../GetInTouch";
import ContentWrapper from "@/utilities/ContentWrapper";
import BTCBudapestLogo from "@/components/BTCBudapestLogo";

const Footer = () => {
  return (
    <div id="contact" className="flex flex-col items-center gap-y-[56px] md:gap-y-[56px] w-full justify-center border-neutral-900 border-t-[4px] pt-[80px]" style={{background: `url('/bitcoin_background.svg')`, backgroundSize:'10%', backgroundColor:'black'}}>
           <div className="flex flex-col md:flex-row items-center md:justify-between md:items-start w-full max-w-[1128px] px-4 sm:px-10 gap-[56px] md:gap-20">
                <StayUpdatedForm />
                <GetInTouch />
           </div>
            <div className="flex w-full justify-center max-w-[400px] py-10" style={{borderTop:'2px solid #4d4d4d'}}>
                 <div className="w-[156px]">
                <BTCBudapestLogo />
            </div>
            </div>



    </div>

  );
};

export default Footer;
