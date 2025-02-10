"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image'
import BitcoinIcon from "../../public/bitcoin-icon.svg";

const GetYourPassCTAButton = ({
  locale,
  buttonText,
  setIsClicked,
  href,
  anchorOrButton = "anchor",
  type,
  handleButtonClick,
  isSubmitting,
  buttonStyle,
    image,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = isHovered || isTouched || isSubmitting;

  const pathname = usePathname();
  const router = useRouter();
  const path = "/tickets";
  const newpath = path.slice(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 560);
    }
  }, []);

  const handleClick = (e) => {
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
    setIsClicked && setIsClicked(false);
  };

  const buttonContent = (
    <>
      <p
        style={{
          textTransform: "uppercase",
          textAlign: "center",
          fontSize: 14,
          fontWeight: 800,
            lineHeight:'100%',
          padding: "6px 6px",
          borderRadius: 40,
          color: isActive ? "white" : "rgba(0,0,0,0.80)",
          backgroundColor: isActive ? "rgba(0,0,0,0)" : "white",
        }}
        className="transition-all duration-0 sm:duration-700 text-nowrap font-exo leading-normal z-10"
      >
        {buttonText}
      </p>
      <div
        className="transition-all duration-0 sm:duration-500"
        style={{
          display: "flex",
          height: "100%",
          width: isActive ? "100%" : "50%",
          //transition: "all 0.4s ease-in-out",
          position: "absolute",
          right: 0,
          backgroundColor: "#F7931A",
          borderTopLeftRadius: isActive ? 20 : 0,
          borderBottomLeftRadius: isActive ? 20 : 0,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />
        <div className="z-0 items-center ml-1">
          <Image alt={'bitcoin'} src={image ? image : BitcoinIcon} width={24} height={24} style={{opacity: isActive ? 1 : 0.6, transition:'opacity 0.3s ease-in-out'}}/>
        </div>
    </>
  );

  return anchorOrButton === "anchor" ? (
    <a
      href={href ? href : "#tickets"}
      onClick={!href ? handleClick : null}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsTouched(true)}
      onTouchEnd={() => isMobile && setIsTouched(false)}
      className="cursor-pointer min-w-[144px] relative flex h-[46px] px-[16px] items-center rounded-[40px] border-2 border-black shadow-[0px_6px_0px_0px_#000] transition-shadow duration-100 bg-white active:shadow-none active:translate-y-[6px] justify-center"
    >
      {buttonContent}
    </a>
  ) : (
    <button
      style={buttonStyle}
      type={type}
      onClick={handleButtonClick}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsTouched(true)}
      onTouchEnd={() => isMobile && setIsTouched(false)}
      className="cursor-pointer min-w-[144px] relative flex h-[46px] px-[16px] items-center rounded-[40px] border-2 border-black shadow-[0px_6px_0px_0px_#000] transition-shadow duration-100 bg-white active:shadow-none active:translate-y-[6px] justify-center"
    >
      {buttonContent}
    </button>
  );
};

export default GetYourPassCTAButton;
