import React from "react";
import StayUpdatedForm from "../StayUpdatedForm";
import GetInTouch from "../GetInTouch";

const Footer = () => {
  return (
    <div className="flex max-w-[1440px] mx-auto px-10 flex-col lg:flex-row gap-[56px] border-t-[4px] border-neutral-900 bg-[length:50px_50px] bg-repeat pt-[80px] pb-[80px] bg-black">
        <StayUpdatedForm />
        <GetInTouch />
    </div>
  );
};

export default Footer;
