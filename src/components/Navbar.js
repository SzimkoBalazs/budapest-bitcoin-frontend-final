import React from 'react';
import Link from 'next/link';
import LanguageSwitch from './LanguageSwitch';
import BTCBudapestLogo from './BTCBudapestLogo';
import NavbarWebComponent from './NavbarWebComponent';
import GetYourPassCTAButton from './GetYourPassCTAButton';
import BudapestMainLogo from './BudapestMainLogo';
import NavHamburgerIcon from './NavHamburgerIcon';

async function fetchNavLinks(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/navbar-menu-items?locale=${locale}&sort=order`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch navbar links');
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchGYPButton(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/get-your-pass-button?locale=${locale}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch navbar links');
  }

  const data = await res.json();
  return data.data || [];
}

const Navbar = async ({ locale, params }) => {
  // const locale = "hu"; // Változtasd dinamikusan, ha van nyelvkezelés
  const navLinks = await fetchNavLinks(locale);
  const buttonText = await fetchGYPButton(locale);

  return (
    <div
      className="fixed top-0 left-0 w-full flex justify-center items-center bg-neutral-900 z-50 h-[60px] navbarBreak:h-[80px]"
      style={{ borderBottom: '2px solid black' }}
    >
      <header className="flex flex-row w-full max-w-[1400px] justify-between items-center px-4 sm:px-10">
        <div className="w-[156px]">
          <BTCBudapestLogo locale={locale} />
        </div>
        <div
          className="hidden navbarBreak:flex"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <NavbarWebComponent navLinks={navLinks} locale={locale} />
        </div>
        <div className="hidden navbarBreak:flex justify-end items-center   gap-4 xl:gap-8">
          <LanguageSwitch currentLocale={locale} />
          <GetYourPassCTAButton buttonText={buttonText.ButtonText} locale={locale} />
        </div>
        <div className="flex navbarBreak:hidden">
          <NavHamburgerIcon
            navLinks={navLinks}
            currentLocale={locale}
            buttonText={buttonText.ButtonText}
          />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
