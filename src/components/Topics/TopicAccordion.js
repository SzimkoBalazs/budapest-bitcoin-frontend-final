'use client';
import React from 'react';
import { cln } from '@/utilities/classnames';
import ChevronDown from '../../../public/chevron-down.svg';
import Image from 'next/image';

const TopicAccordion = ({ data, onClick }) => {
    console.log('data subtitle length :', data.subTitle && data?.subTitle.length)
  return (
    <div className={cln(data?.isOpened ? 'w-full border-secondary-600 pb-4 xs:pb-6 md:pb-8' : 'w-full border-neutral-700', "flex relative flex-col items-start gap-y-0 md:gap-y-4 px-4 xs:px-6 md:px-8 rounded-[15px] md:rounded-[20px] border-[2px] hover:border-secondary-600 transition-all transition-width duration-300 overflow-hidden")}>
      <button style={{ padding:'24px 0px' }} onClick={onClick} className={cln("flex w-full justify-between gap-x-4 md:gap-x-8 items-center cursor-pointer")}>
        <div className="flex gap-x-8 gap-y-2 flex-col md:flex-row items-start justify-start md:items-center relative">
          <h4 className="font-exo text-left font-extrabold text-[20px] md:text-[28px] text-white uppercase"
          style={{
            lineHeight:'120%',
            letterSpacing:'15%',
          }}
           >
              {data?.title}
          </h4>
            {data.subTitle && <h5 className="font-exo text-left font-medium text-[16px] md:text-[18px] text-white"
                 style={{
                     letterSpacing: '15%'
                 }}
            >
                {data.subTitle}
            </h5>}
        </div>
          <h5 className={cln(data?.isOpened ? 'top-[8px]' : 'top-[50%] translate-y-[-50%]', "font-exo absolute whitespace-nowrap left-[16px] font-extrabold text-[72px] text-neutral-800")}
                style={{
                  letterSpacing: '20%',
                    lineHeight:'100%',
                  opacity:0.05,
                  textShadow:'-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white',
                }}
            >
                {data?.title}
            </h5>
      <Image src={ChevronDown} width={24} height={16} alt={'Chevron icon'} style={{rotate:data?.isOpened ? '180deg' : '0deg'}}/>
      </button>
        <div className={cln("h-full flex-col md:flex-row gap-y-6 gap-x-12 transition-all duration-500", data?.isOpened ? 'flex' : 'hidden')}>
                <div className="w-full md:w-[55%]">
                    <p className="font-exo font-medium text-[16px] leading-[150%] text-white/80">
                        {data?.mainText}
                    </p>
                </div>
                <div className="flex flex-col gap-y-2 w-full md:max-w-[45%]">
                    <h4 className="font-exo font-extrabold text-[18px] text-secondary-600" style={{letterSpacing:'5%'}}>
                        {data?.listTitle}
                    </h4>
                    <ul className="pl-4" style={{ listStyle: 'initial', color: 'white' }}>
                          {data?.listText[0].children.map((listItem, index) => {
                            const isLink = listItem.children.length > 1;
                            console.log('list item inside: ', listItem)

                            if (isLink) {
                              return (
                                  <li><a className="font-exo font-medium text-[16px] text-secondary-600 underline" href={listItem.children[1].url}>{listItem.children[1].children[0].text}</a></li>
                              );
                            } else {
                                return(
                                    <li className="font-exo font-medium text-[16px] text-white/80">{listItem.children[0].text}</li>
                                )
                            }
                          })}
                    </ul>

                </div>
        </div>
    </div>
  );
};

export default TopicAccordion;
