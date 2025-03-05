'use client';
import React from 'react';
import { cln } from '@/utilities/classnames';

const SelectButton = ({ isCardPayment, onClick, children, isSelected }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cln(
        isCardPayment
          ? isSelected
            ? 'border-white border-2 bg-secondary-600'
            : 'border-secondary-600 hover:bg-secondary-600/10 border-[1px]'
          : isSelected
          ? 'border-white border-2 bg-primary-600'
          : 'border-primary-600 hover:bg-primary-600/10 border-[1px]',
        'group cursor-pointer w-[50%] min-w-[136px] relative flex h-[64px] px-2 items-center rounded-[10px] justify-center',
      )}
    >
      <h3
        className={cln(
          isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white',
          'text-[14px] font-exo font-bold tracking-[0.5px]',
        )}
        style={{ fontWeight: 800, marginBottom: 2 }}
      >
        {children}
      </h3>
    </button>
  );
};

export default SelectButton;
