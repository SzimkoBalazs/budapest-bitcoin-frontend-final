'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import BasketIcon from '../../../public/basket.svg';

const CheckoutIcon = () => {
  const currentPathname = usePathname();
  const pathNameEnd = currentPathname.split('/').pop();
  const isCheckoutPage = pathNameEnd === 'checkout' || currentPathname.includes('payment');

  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const [totalTicketNumber, setTotalTicketNumber] = useState(0);
  useEffect(() => {
    const checkoutData = JSON.parse(localStorage.getItem('selectedTickets'));
    const anyTicketsAdded = checkoutData?.some((ticket) => {
      return ticket.quantity > 0;
    });
    setTotalTicketNumber(checkoutData?.reduce((total, ticket) => total + ticket.quantity, 0));
    setIsCheckoutActive(anyTicketsAdded);
  }, [currentPathname]);

  return (
    <a
      className="cursor-pointer items-center bg-primary-600 justify-center fixed right-4 bottom-[32px] sm:right-[72px] sm:bottom-[72px] rounded-[40px] shadow-[0_3px_0_0_#000]"
      style={{
        display: isCheckoutActive && !isCheckoutPage ? 'flex' : 'none',
        width: 52,
        height: 52,
        zIndex: 100,
        border: '2px solid black',
        //background: 'linear-gradient(90deg, #F7931A 50.49%, #308ADB 50.5%)',
      }}
      href={'/checkout'}
    >
      <Image src={BasketIcon} alt={'Basket icon'} width={28} height={28} />
      <span className="flex bg-secondary-600 absolute bottom-[-8px] left-[-8px] w-[28px] h-[28px] text-white font-exo font-bold text-[16px] rounded-2xl items-center justify-center pr-[2px]">
        {totalTicketNumber}
      </span>
    </a>
  );
};

export default CheckoutIcon;
