'use client';

import React from 'react';
import { cln } from '@/utilities/classnames';

const PayButton = ({ type, onClick, style, text, disabled, isCardPayment, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cln(
        isCardPayment
          ? `${
              !disabled && 'hover:bg-secondary-500 active:bg-secondary-500'
            } bg-secondary-600 shadow-[0px_6px_0px_0px_#000,0px_6px_8px_6px_rgba(48,138,219,0.3)]`
          : `${
              !disabled && 'hover:bg-primary-500 active:bg-primary-500'
            } bg-primary-600 shadow-[0px_6px_0px_0px_#000,0px_6px_8px_6px_rgba(255,174,11,0.3)]`,
        !disabled ? 'cursor-pointer active:translate-y-[6px] active:shadow-none' : 'opacity-50',
        'flex h-[50px] flex-col min-w-[208px] w-fit px-[24px] justify-center items-center rounded-[40px] transition-all duration-100',
        'text-white text-center font-exo text-[14px] uppercase font-extrabold leading-normal',
      )}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PayButton;
