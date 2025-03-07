'use client';

import React from 'react';
import Image from 'next/image';

export default function SocialIcon({ href, type, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={type}
      className="hover:scale-110 transition-transform duration-300 w-[40px] h-[40px]"
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={icon}
        alt={`${type}-icon`}
        width={40}
        height={40}
        className=" self-stretch rounded-[8px]"
      />
    </a>
  );
}
