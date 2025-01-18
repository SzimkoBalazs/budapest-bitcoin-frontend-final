import React from "react";
import LanguageSwitch from "./LanguageSwitch";
import BTCBudapestLogo from "./BTCBudapestLogo";
import NavbarWebComponent from "./NavbarWebComponent";
import GetYourPassCTAButton from "./GetYourPassCTAButton";
import Link from "next/link";
import BudapestMainLogo from "./BudapestMainLogo";
import NavHamburgerIcon from "./NavHamburgerIcon";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex shrink flex-col justify-center items-center bg-neutral-900 p-[10px] gap-[10px] z-50">
      <header className="flex flex-row w-full shrink max-w-[1360px] justify-between items-center">
        <BTCBudapestLogo />

        <nav>
          <NavbarWebComponent />
        </nav>
        <div className="flex justify-end items-center gap-[32px]">
          <LanguageSwitch />
          <GetYourPassCTAButton />
          {/* <NavHamburgerIcon /> */}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
