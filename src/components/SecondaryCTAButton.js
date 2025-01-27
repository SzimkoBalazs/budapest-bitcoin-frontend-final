"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

const SecondaryCTAButton = ({
  text,
  type,
  href,
  actionType,
  isChecked = true,
  submitted = false,
    setIsClicked,
    locale,
}) => {
  // Függvény, amely meghatározza a megfelelő hivatkozást az actionType alapján
  const getHref = () => {
    switch (actionType) {
      case "mailto":
        return `mailto:${href}`;
      case "googleMaps":
        return "https://www.google.com/maps/place/B%C3%A1lna/@47.4838729,19.0579799,17z/data=!3m1!4b1!4m6!3m5!1s0x4741dc513fce755f:0xaa41cbfa47a92ce6!8m2!3d47.4838729!4d19.0605548!16s%2Fg%2F1q6764n83?entry=ttu&g_ep=EgoyMDI1MDEyMC4wIKXMDSoASAFQAw%3D%3D";
      case "scroll":
        return `#${href}`;
      default:
        return "";
    }
  };

    const pathname = usePathname();
  const router = useRouter();
  const path = "/partners";
  const newpath = path.slice(1);

  const handleClick = (e) => {
    if (actionType === "scroll") {
      e.preventDefault();
      // Ellenőrizzük, hogy a homepage-en vagyunk-e
    if (pathname === "/" || pathname === "/en" || pathname === "/hu") {
      const section = document.getElementById(path.slice(1));
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigálás a home oldalra, majd hash érték hozzáadása a görgetéshez
      router.push(`/${locale || "en"}#${newpath}`);
    }
    document.body.classList.remove("no-scroll");
    setIsClicked && setIsClicked(false)
  }
  };

  return actionType === "mailto" || actionType === "googleMaps" ? (
    <a
      href={getHref()}
      target={actionType === "googleMaps" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      style={{width:'fit-content'}}
    >
      <button
        type={type}
        className="flex h-[54px] flex-col items-start cursor-pointer transition-all duration-500"
      >
        <div className="flex h-[50px] flex-col items-start gap-[10px] self-stretch">
          <div
            className={`flex h-[50px] min-w-[136px] px-[16px] py-[10px] justify-center items-center gap-[4px] 
              rounded-[40px] border-2 bg-neutral-900 hover:bg-neutral-700 active:bg-secondary-600 
              active:bg-none active:shadow-none active:translate-y-[6px] shadow-[0px_6px_0px_0px_#000] transition-all duration-200 
              ${
                submitted
                  ? "border-green-700 bg-green-500 text-white"
                  : "border-secondary-600 text-white"
              }`}
          >
            <div className="flex p-[4px_6px] justify-center items-center gap-[4px] rounded-[40px]">
              <p className="text-white text-center font-exo text-[14px] uppercase font-extrabold leading-normal">
                {text}
              </p>
            </div>
          </div>
        </div>
      </button>
    </a>
  ) : (
    <button
      type={type}
      onClick={handleClick}
      className="flex h-[54px] flex-col items-start cursor-pointer"
      style={{ opacity: isChecked && isChecked ? 1 : 0.4 }}
    >
      <div className="flex h-[50px] flex-col items-start gap-[10px] self-stretch">
        <div
          className={`flex h-[50px] min-w-[136px] px-[16px] py-[10px] justify-center items-center gap-[4px] 
              rounded-[40px] border-2 bg-neutral-900 hover:bg-neutral-700 active:bg-secondary-600 
              active:bg-none active:shadow-none active:translate-y-[6px] shadow-[0px_6px_0px_0px_#000] transition-all duration-200 
              ${
                submitted
                  ? "border-green-700 bg-green-500 text-white"
                  : "border-secondary-600 bg-neutral-900 hover:bg-neutral-700 active:bg-secondary-600"
              }`}
        >
          <div className="flex p-[4px_6px] justify-center items-center gap-[4px] rounded-[40px]">
            <p className="text-white text-center font-exo text-[14px] uppercase font-extrabold leading-normal">
              {text}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default SecondaryCTAButton;
