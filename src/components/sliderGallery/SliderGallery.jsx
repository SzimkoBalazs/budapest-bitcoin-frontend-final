"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./SliderGallery.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { gallerySliderData } from "@/utilities/constants";

const SliderGallery = ({ data }) => {
  return (
    <div className="slider-container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {data.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`flex relative justify-center transition-all duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 transition-all duration-700 scale-100"
                    : "opacity-50 transition-all duration-700 scale-75"
                }`}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.CardImage.formats.large.url}`}
                  alt="slide_image"
                />
                <div
                  className={`card-content absolute flex flex-col gl:flex-row w-full bottom-0 min-h-[192px] p-[12px] gl:px-0 gl:py-[24px] 
                      justify-center items-center gap-[16px] gl:gap-[30px] flex-[1_0_0] 
                      rounded-b-[30px] border-b-[4px] border-neutral-700 bg-black transition-opacity !duration-700
                      ${
                        isActive
                          ? "opacity-100 transition-opacity ease-in-out !duration-700"
                          : "opacity-0 transition-opacity ease-in-out !duration-700"
                      }`}
                >
                  <p className="text-primary-500 w-[268px] text-center gl:text-right font-exo text-[22px] gl:text-[32px] font-extrabold leading-[110%] tracking-[3.3px] gl:tracking-[4.8px]">
                    {slide.LeftText}
                  </p>
                  <p className="text-white/80 w-[257px] text-center gl:text-left font-exo text-[18px] gl:text-[24px] font-medium leading-[150%] tracking-[0.9px] gl:tracking-[1.2px]">
                    {slide.RightText}
                  </p>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="relative  w-full">
            <div
              className="swiper-button-prev slider-arrow"
              style={{ left: "-15%" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="48"
                viewBox="0 0 28 48"
                fill="none"
              >
                <path
                  d="M25 3L3 24L25 45"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="swiper-button-next slider-arrow"
              style={{ right: "-13%" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="48"
                viewBox="0 0 28 48"
                fill="none"
              >
                <path
                  d="M3 45L25 24L3 3"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default SliderGallery;
