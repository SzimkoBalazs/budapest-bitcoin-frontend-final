"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../i18nConfig";

const LanguageSwitch = ({ currentLocale }) => {
  const router = useRouter();
  const currentPathname = usePathname();

  const toggleLanguage = () => {
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
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <div
      onClick={toggleLanguage}
      className="inline-flex items-center rounded-[4px] border-2 border-white bg-neutral-900 shadow-[-1px_1px_0px_0px_#000,_-2px_2px_0px_0px_#000,_-3px_3px_0px_0px_#000,_-4px_4px_0px_0px_#000] cursor-pointer"
    >
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
      <div className="flex w-[40px] p-2 justify-center items-center gap-[10px] rounded-[4px]">
        <p className="text-white text-[14px] font-[700] font-exo leading-[100%] tracking-[2.1px]">
          EN
        </p>
      </div>

      {/* HU szöveg */}
      <div className="flex w-[40px] p-2 justify-center items-center gap-[10px] rounded-[4px]">
        <p className="text-white text-[14px] font-[700] font-exo leading-[100%] tracking-[2.1px]">
          HU
        </p>
      </div>
    </div>
  );
};

export default LanguageSwitch;
