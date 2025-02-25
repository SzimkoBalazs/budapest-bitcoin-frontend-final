'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cln } from '@/utilities/classnames';

const SecondaryButton = ({
  type,
  onClick,
  style,
  text,
  disabled,
  locale,
  isHomePageNavigation,
}) => {
  const router = useRouter();
  function homePageNavigation(e) {
    e.preventDefault();
    router.push(`/${locale || 'en'}#home-page`);
  }

  return (
    <button
      type={type}
      onClick={isHomePageNavigation ? homePageNavigation : onClick}
      className={cln(
        !disabled &&
          'hover:bg-neutral-700 active:bg-secondary-600 active:shadow-none active:translate-y-[6px] cursor-pointer',
        'flex h-[50px] flex-col min-w-[136px] px-[16px] justify-center items-center rounded-[40px] border-2 border-secondary-600 bg-neutral-900 shadow-[0px_6px_0px_0px_#000] transition-all duration-100',
      )}
      style={style}
      disabled={disabled}
    >
      <p className="text-white text-center font-exo text-[14px] uppercase font-extrabold leading-normal">
        {text}
      </p>
    </button>
  );
};

export default SecondaryButton;
