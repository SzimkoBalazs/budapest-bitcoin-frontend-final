import React from "react";
import StayUpdatedForm from "../StayUpdatedForm";
import GetInTouch from "../GetInTouch";
import ContentWrapper from "@/utilities/ContentWrapper";
import BTCBudapestLogo from "@/components/BTCBudapestLogo";

const MidFooter = () => {
  return (
    <div className="flex flex-col items-center gap-y-[56px] md:gap-y-[56px] w-full justify-center border-neutral-900 border-t-[4px] py-[40px] mb-[64px] md:mb-[160px] bg-neutral-700">
           <div className="flex justify-center w-full max-w-[1128px] px-4 sm:px-10 gap-[56px] md:gap-20">
                <StayUpdatedForm />
           </div>
    </div>

  );
};

export default MidFooter;
