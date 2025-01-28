"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

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
          padding: "4px 6px",
          borderRadius: 40,
          color: isActive ? "white" : "rgba(0,0,0,0.80)",
          backgroundColor: isActive ? "rgba(0,0,0,0)" : "white",
        }}
        className="transition-all duration-0 sm:duration-600 text-nowrap font-exo leading-normal z-10"
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

      <div className="flex pb-[1px] items-center ml-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18.641"
          height="24.854"
          viewBox="0 0 18 25"
          fill="none"
          style={{ transform: "rotate(12.843deg)" }}
        >
          <g transform="rotate(-12.843 9 12.5)">
            <path
              d="M7.07882 0.136756L7.03588 3.70627L8.77708 3.72728L8.82002 0.157764L10.9794 0.184473L11.093 0.300961L11.0508 3.83356C12.7551 4.07428 15.075 4.52371 15.9304 6.22569C16.8068 7.95962 16.3823 10.4586 14.5206 11.3562C16.5434 12.0295 17.5827 13.2119 17.5597 15.4218C17.5157 19.4693 14.3111 20.4847 10.8544 20.6159L10.81 24.2593L8.54007 24.2302L8.58451 20.5869L6.84331 20.5658L6.79888 24.2092L4.52896 24.1801L4.5734 20.5368L0.180895 20.4818L0.590416 17.7565C1.27206 17.6516 2.81205 18.1365 3.01389 17.2132L3.13002 6.97144C3.05487 6.56141 2.50587 6.16295 2.12448 6.15804L0.346447 6.13624L0.373956 3.70476L4.76646 3.75976L4.80766 0.222794L4.92376 0.109055L7.08318 0.135763L7.07882 0.136756ZM7.02851 10.7677C8.63009 10.7792 12.0482 11.0012 12.13 8.66759C12.2179 6.19938 8.72567 6.37549 7.08191 6.35983L7.03187 10.7623L7.02851 10.7677ZM6.94847 17.8319C8.66478 17.9045 13.0723 18.126 13.1143 15.5167C13.1547 12.8205 8.78276 13.0364 7.00735 13.0461L6.95283 17.8309L6.94847 17.8319Z"
              fill="rgba(255, 255, 255, 0.6)"
              className="group-hover:fill-white group-active:fill-white transition-all duration-200"
            />
          </g>
        </svg>
      </div>
    </>
  );

  return anchorOrButton === "anchor" ? (
    <a
      href={href ? href : "#tickets"}
      onClick={handleClick}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsTouched(true)}
      onTouchEnd={() => isMobile && setIsTouched(false)}
      className="cursor-pointer min-w-[144px] relative flex h-[50px] px-[16px] items-center rounded-[40px] border-2 border-black shadow-[0px_6px_0px_0px_#000] transition-shadow duration-100 bg-white active:shadow-none active:translate-y-[6px] justify-center"
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
      className="cursor-pointer min-w-[144px] relative flex h-[50px] px-[16px] items-center rounded-[40px] border-2 border-black shadow-[0px_6px_0px_0px_#000] transition-shadow duration-100 bg-white active:shadow-none active:translate-y-[6px] justify-center"
    >
      {buttonContent}
    </button>
  );
};

export default GetYourPassCTAButton;
