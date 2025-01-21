import React from "react";
import LanguageSwitch from "./LanguageSwitch";
import BTCBudapestLogo from "./BTCBudapestLogo";
import NavbarWebComponent from "./NavbarWebComponent";
import GetYourPassCTAButton from "./GetYourPassCTAButton";
import Link from "next/link";
import BudapestMainLogo from "./BudapestMainLogo";
import NavHamburgerIcon from "./NavHamburgerIcon";

async function fetchNavLinks(locale) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/navbar-menu-items?locale=${locale}&sort=order`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch navbar links");
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchGYPButton(locale) {
  const res = await fetch(
    `https://strapi.budapestbitcoin.com/api/get-your-pass-button?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch navbar links");
  }

  const data = await res.json();
  return data.data || [];
}

const Navbar = async ({ locale }) => {
  // const locale = "hu"; // Változtasd dinamikusan, ha van nyelvkezelés
  const navLinks = await fetchNavLinks(locale);
  const buttonText = await fetchGYPButton(locale);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center items-center bg-neutral-900 p-[10px] z-50 h-[60px] lx:h-[80px]">
      <header className="flex flex-row w-full max-w-[1400px] justify-between items-center px-10">
        <div className="w-[156px]">
          <BTCBudapestLogo />
        </div>
        <div className="hidden lx:flex">
          <NavbarWebComponent navLinks={navLinks} />
        </div>
        <div className="hidden lx:flex justify-end items-center gap-4 xl:gap-8">
          <LanguageSwitch currentLocale={locale} />
          <GetYourPassCTAButton buttonText={buttonText} />
          <div className="flex lx:hidden">{<NavHamburgerIcon />}</div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
