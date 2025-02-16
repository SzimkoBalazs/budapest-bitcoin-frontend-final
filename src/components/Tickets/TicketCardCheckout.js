'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import TicketSvg from '../../../public/ticket.svg';
import BarCodeUp from '../../../public/barcode_up.svg';
import { cln } from '@/utilities/classnames';

import TicketInfo from '@/components/Tickets/TicketInfo';
import ticketInfo from '@/components/Tickets/TicketInfo';
import { priceWithSpace } from '@/components/TicketCard';

const TicketCardCheckout = ({
  name,
  price,
  numberOfTickets,
  date,
  details,
  locale,
  beforePrice,
}) => {
  const [animate, setAnimate] = useState(false);
  const [prevTickets, setPrevTickets] = useState(numberOfTickets);
  const ticketRef = useRef(null);
  const [barcodeHeight, setBarcodeHeight] = useState(50);

  const [isTicketInfoVisible, setIsTicketInfoVisible] = useState(false);

  useEffect(() => {
    setPrevTickets((prev) => {
      if (numberOfTickets !== prev) {
        if (numberOfTickets > prev) {
          setAnimate('animate-bounceUp');
        } else {
          setAnimate('animate-bounceDown');
        }
        setTimeout(() => setAnimate(''), 300);
      }
      return numberOfTickets; // Update previous ticket count
    });
  }, [numberOfTickets]);

  useEffect(() => {
    if (ticketRef.current) {
      setBarcodeHeight(ticketRef.current.offsetHeight);
    }
    console.log('ticket ref height', ticketRef.current.offsetHeight);
  }, [ticketRef.current]);

  return (
    //   OUTSIDE CONTAINER
    <div
      ref={ticketRef}
      className="flex relative flex-row min-w-[256px] w-full items-center justify-between rounded-[10px] border-[2px]  bg-black"
      style={{
        borderColor: numberOfTickets === 0 ? 'white' : '#FFAE0B',
        boxShadow:
          numberOfTickets === 0
            ? `1px 1px 0px #FFF, 2px 2px 0px #FFF, 3px 3px 0px #FFF, 4px 4px 0px #FFF, 5px 5px 0px #FFF`
            : `1px 1px 0px #FFAE0B, 2px 2px 0px #FFAE0B, 3px 3px 0px #FFAE0B, 4px 4px 0px #FFAE0B, 5px 5px 0px #FFAE0B, 7px 7px 7px 2px rgba(255, 174, 11, 0.15)`,
      }}
    >
      {/*INSIDE CONTAINER FOR BOTH TEXTS*/}
      <div
        className="flex flex-col h-full p-3 lg:p-4 justify-between items-end"
        style={{ width: 'calc( 100% - 48px )' }}
      >
        {/*CONTAINER FOR NAME DATE AND INFO ICON*/}
        <div className="flex flex-row w-full justify-between">
          {/*NAME AND DATE*/}
          <div className="flex flex-col gap-y-1">
            <h3 className="text-white text-nowrap text-left font-exo text-[18px] sm:text-[24px] font-extrabold leading-[100%] tracking-[1px]">
              {name}
            </h3>
            <h3 className="font-exo text-nowrap font-regular text-neutral-200 text-[14px]">
              {date}
            </h3>
          </div>

          {/*INFO ICON*/}
          <button
            className="flex items-center justify-center w-6 h-6 rounded-2xl border-2 border-neutral-300"
            onClick={() => setIsTicketInfoVisible(true)}
          >
            <span className="text-neutral-300 text-[14px] font-exo font-bold">i</span>
          </button>
          {isTicketInfoVisible && (
            <TicketInfo
              details={details}
              name={name}
              onCloseClick={() => setIsTicketInfoVisible(false)}
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-y-1 mt-[-8px]">
          {/*BEFORE PRICE*/}
          <div className="relative flex items-end justify-center">
            <h5
              className="text-neutral-700 text-[22px] lg:text-[28px] left-[-40%]"
              style={{ fontWeight: 800, lineHeight: '100%' }}
            >
              {priceWithSpace(beforePrice, false)}
            </h5>
            <h3
              className="text-neutral-700 absolute right-[-30px] lg:right-[-42px] text-[12px] lg:text-[18px] mb-[1px] lg:mb-[2px] tracking-[1px]"
              style={{ fontWeight: 400, lineHeight: '100%' }}
            >
              {locale === 'hu' ? 'HUF' : 'EUR'}
            </h3>
            <span
              className="flex absolute w-full h-[1px] lg:h-[2px] bg-primary-600 top-[11px]"
              style={{ transform: `rotate(${beforePrice < 9999 ? '-22deg' : '-7deg'})` }}
            />
          </div>

          {/*ACTUAL PRICE*/}
          <div className="flex relative items-end justify-center gap-x-1">
            <h3
              className="text-white text-[24px] lg:text-[34px] tracking-[2.4px]"
              style={{ fontWeight: 800, lineHeight: '100%' }}
            >
              {priceWithSpace(price)}
            </h3>
            <h3
              className="text-white right-[-36px] lg:right-[-50px] text-[16px] lg:text-[22px] mb-[2px]"
              style={{ fontWeight: 400, lineHeight: '100%' }}
            >
              {locale === 'en' ? 'EUR' : 'HUF'}
            </h3>
          </div>
        </div>
      </div>
      <div
        className={cln('flex w-[48px] px-2 border-l-2')}
        style={{
          borderColor: numberOfTickets === 0 ? 'white' : '#FFAE0B',
          height: barcodeHeight,
        }}
      >
        <Image
          src={BarCodeUp}
          alt={'Barcode'}
          height={barcodeHeight}
          style={{ height: barcodeHeight }}
        />
      </div>
      {/*TICKET COUNTER BLUE BOX*/}
      {numberOfTickets > 0 && (
        <div
          className={cln(
            animate,
            'flex items-center justify-center w-[36px] h-[36px] absolute bottom-[-16px] left-[-8px] secondary-600 rounded-[6px] bg-secondary-600',
          )}
        >
          <span className="font-exo text-white text-[24px] font-bold">{numberOfTickets}</span>
        </div>
      )}
    </div>
  );
};

export default TicketCardCheckout;
