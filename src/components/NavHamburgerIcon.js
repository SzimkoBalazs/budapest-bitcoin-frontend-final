'use client';

import React, { useState } from 'react';
import NavLink from '@/components/NavLink';
import GetYourPassCTAButton from '@/components/GetYourPassCTAButton';
import SecondaryCTAButton from '@/components/SecondaryCTAButton';
import LanguageSwitch from '@/components/LanguageSwitch';

const NavHamburgerIcon = ({ navLinks, currentLocale, buttonText, secondaryButtonText }) => {
  const [isClicked, setIsClicked] = useState(false);

  // Gomb lenyomása
  // const handleMouseDown = () => {
  //   !isClicked && setIsClicked(true)
  // };

  const handleClick = () => {
    const nextState = !isClicked; // Determine the next state
    setIsClicked(nextState); // Update state
    if (nextState && window.innerWidth < 640) {
      document.body.classList.add('no-scroll'); // Add class if menu is opening
    } else {
      document.body.classList.remove('no-scroll'); // Remove class if menu is closing
    }
  };

  // Gomb felengedése
  // const handleMouseUp = () => {
  //   isClicked && setIsClicked(false);
  // };

  return (
    <div className="flex relative flex-col items-start">
      <div
        className={`flex w-[44px] h-[38px] p-[10px] flex-col justify-center items-center gap-[4px] rounded-[10px] border-2 border-black ${
          isClicked
            ? 'bg-neutral-700 shadow-[0_3px_0_0_#000] active:shadow-none active:bg-neutral-200 active:bg-none active:translate-y-[3px]' // Ha az X állapot aktív
            : 'bg-[linear-gradient(270deg,_#FFAE0B_50.49%,_#FFF_50.5%)] shadow-[0_3px_0_0_#000] active:bg-primary-500 active:bg-none active:shadow-none active:translate-y-[3px]'
        } transition-all duration-100`}
        onClick={handleClick}
        //onMouseUp={handleMouseUp}
      >
        {!isClicked ? (
          // Alapállapot: 3 vonal
          <>
            <span className="w-[14px] h-[2px] shrink-0 bg-neutral-900" />
            <span className="w-[14px] h-[2px] shrink-0 bg-neutral-900" />
            <span className="w-[14px] h-[2px] shrink-0 bg-neutral-900" />
          </>
        ) : (
          // Klikkelés után: X ikon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.00006 4.58575L1.75745 0.34314L0.343233 1.75735L4.58585 5.99997L0.34314 10.2427L1.75735 11.6569L6.00006 7.41418L10.2427 11.6568L11.6569 10.2426L7.41427 5.99997L11.6568 1.75739L10.2426 0.343181L6.00006 4.58575Z"
              fill="#999999"
            />
          </svg>
        )}
      </div>
      <div
        className="h-mobile-menu sm:h-auto w-screen sm:w-[320px] right-[-16px] sm:right-[0px] px-4 pt-[24px] pb-[40px] sm:pb-[24px] overflow-y-scroll gap-y-[32px]"
        style={{
          position: 'absolute',
          display: isClicked ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '2px solid black',
          top: 48,
          backgroundColor: '#1f1f1f',
        }}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((navLink) => (
            <li
              onClick={() => {
                setIsClicked(false);
                document.body.classList.remove('no-scroll');
              }}
              key={navLink.id}
              style={{ listStyleType: 'none' }}
            >
              <NavLink
                text={navLink.MenuItemText} // A megfelelő adatot használjuk
                path={navLink.url} // Az URL mezőt használjuk
                locale={currentLocale}
              />
            </li>
          ))}
        </div>
        <div className="flex flex-col w-full items-center gap-6">
          <LanguageSwitch currentLocale={currentLocale} />
          <GetYourPassCTAButton
            buttonText={buttonText}
            setIsClicked={setIsClicked}
            locale={currentLocale}
          />
          <SecondaryCTAButton
            text={secondaryButtonText}
            actionType={'scroll'}
            setIsClicked={setIsClicked}
            locale={currentLocale}
          />
        </div>
      </div>
    </div>
  );
};

export default NavHamburgerIcon;
