'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SectionMainTitle from '@/components/SectionMainTitle';

export default function Loader() {
  return (
    <div
      className="bg-neutral-900 items-center justify-center"
      style={{
        zIndex: 50,
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        top: 0,
        left: 0,
        border: '2px solid black',
        borderRadius: 30,
      }}
    >
      <div style={{ display: 'flex', width: 'auto', height: 'auto' }}>
        <div
          style={{
            display: 'flex',
            overflow: 'hidden',
            animation: 'moveStopSequenceWidth 2s infinite',
          }}
        >
          <SectionMainTitle text={'Loading....'} color="bg-secondary-600" underlineWidth={'97%'} />
        </div>
      </div>
    </div>
  );
}
