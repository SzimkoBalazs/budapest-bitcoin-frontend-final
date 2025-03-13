'use client';
import React from 'react';
import { cln } from '@/utilities/classnames';
import ChevronDown from '../../../public/chevron-down.svg';
import Image from 'next/image';

const TopicAccordion = ({ isOpened }) => {
  return (
    <div className={cln(isOpened ? 'w-full border-secondary-600' : 'w-fit border-neutral-700', "flex items-start p-6 sm:p-8 rounded-[15px] sm:rounded-[20px] border-[2px] hover:border-secondary-600 transition-all duration-300 cursor-pointer")}>
      <div className="flex w-full justify-between gap-x-8">
        <div className="flex gap-x-8 gap-y-2 flex-col sm:flex-row items-center relative">
          <h4 className="font-exo font-extrabold text-[20px] sm:text-[28px] text-white uppercase"
          style={{
            lineHeight:'120%',
            letterSpacing:'15%',
          }}
           >
            Bitcoiner lifestyle
          </h4>
          <h5 className="font-exo font-medium text-[16px] sm:text-[18px] text-white"
              style={{
                letterSpacing:'15%'
              }}
          >
            Elet hosszu tavra tervezve
          </h5>
            <h5 className="font-exo absolute whitespace-nowrap left-[0px] top-[-36px] font-extrabold text-[72px] text-neutral-800"
                style={{
                  letterSpacing: '20%',
                  opacity:0.1 ,
                  textShadow:'-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white',
                }}
            >
              BITCOINER LIFESTYLE
            </h5>
        </div>
      <Image src={ChevronDown} width={24} height={16} alt={'Chevron icon'} style={{rotate:isOpened ? '180deg' : '0deg'}}/>
      </div>
      {isOpened ? (
        <div className="flex h-[250px]">

        </div>
        ) : (
          <></>
        )
      }
    </div>
  );
};

export default TopicAccordion;
