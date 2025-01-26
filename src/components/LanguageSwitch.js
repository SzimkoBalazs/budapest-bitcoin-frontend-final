"use client";

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../i18nConfig";
import SectionMainTitle from "@/components/SectionMainTitle";

const LanguageSwitch = ({ currentLocale }) => {
  const router = useRouter();
  const currentPathname = usePathname();
  const [isLoading, setIsLoading] = useState(false)
  const [ongoingLoading, setOngoingLoading] = useState(true)
  const [previousPath, setPreviousPath] = useState(currentPathname);

  const toggleLanguage = async () => {
    setIsLoading(true);
    // Új nyelv meghatározása
    const newLocale = currentLocale === "en" ? "hu" : "en";

    // Cookie beállítása a nyelvhez
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // Átirányítás az új nyelv URL-jére
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      await router.push("/" + newLocale + currentPathname);
    } else {
      await router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }
    router.refresh();
   setPreviousPath(currentPathname);
  };

  useEffect(() => {
    // Hide the loading screen once the pathname updates to the new language path
    if (currentPathname !== previousPath && isLoading) {
      setIsLoading(false); // Turn off loading screen
    }
  }, [currentPathname, previousPath, isLoading]);

  return (
    <div
      onClick={toggleLanguage}
      className="inline-flex items-center rounded-[4px] border-2 border-white bg-neutral-900 shadow-[-1px_1px_0px_0px_#000,_-2px_2px_0px_0px_#000,_-3px_3px_0px_0px_#000,_-4px_4px_0px_0px_#000] cursor-pointer"
    >
      {isLoading &&
          <div className="bg-neutral-900 items-center justify-center" style={{
                zIndex:50,
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                top: 0,
                left: 0,
                border: '2px solid black',
                borderRadius:30,
          }}>
            <SectionMainTitle
              text={'Loading....'}
              color="bg-secondary-600"
              underlineWidth={"97%"}
            />
            <span className="bg-neutral-900" style={{
              display:'flex',
              width:100,
              height:50,
              animation: ongoingLoading ? 'moveStopSequence 2s infinite' : 'none',
              position:'absolute',
              zIndex:100
            }}/>
          </div>
      }
      {/* Kék csúszka */}
      <div
        className={`absolute flex w-[40px] p-2 justify-center items-center gap-[10px] rounded-[4px] border-2 border-white bg-secondary-600 transform transition-transform duration-300 -m-[2px] ${
          currentLocale === "hu" ? "translate-x-[44px]" : "translate-x-0"
        }`}
      >
        <p className="text-white text-[14px] font-[700] leading-[100%] tracking-[2.1px]">
          {currentLocale.toUpperCase()}
        </p>
      </div>

      {/* EN szöveg */}
      <div className="flex w-[40px] bg-neutral-900 hover:bg-neutral-700 active:bg-secondary-600 p-2 justify-center items-center gap-[10px] rounded-[4px]">
        <p className="text-white text-[14px] font-[700] font-exo leading-[100%] tracking-[2.1px]">
          EN
        </p>
      </div>

      {/* HU szöveg */}
      <div className="flex w-[40px] bg-neutral-900 hover:bg-neutral-700 active:bg-secondary-600 p-2 justify-center items-center gap-[10px] rounded-[4px]">
        <p className="text-white text-[14px] font-[700] font-exo leading-[100%] tracking-[2.1px]">
          HU
        </p>
      </div>
    </div>
  );
};

export default LanguageSwitch;
