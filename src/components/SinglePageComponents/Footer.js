import React from "react";
import StayUpdatedForm from "../StayUpdatedForm";
import GetInTouch from "../GetInTouch";

const Footer = () => {
  return (
    <div className="flex flex-col fullhd:flex-row justify-center items-center gap-[56px] fullhd:justify-between fullhd:items-start mx-auto self-stretch border-t-[4px] border-neutral-900 bg-[length:50px_50px] bg-repeat bg-lightgray px-[278px] pt-[80px] pb-[80px] pl-[280px] bg-black">
      <div className="">
        <StayUpdatedForm />
      </div>
      <div>
        <GetInTouch />
      </div>
    </div>
  );
};

export default Footer;
