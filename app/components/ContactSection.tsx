'use client';
import React from 'react'
import dynamic from 'next/dynamic';

const BadgeCard = dynamic(() => import('./BadgeCard'), {
  ssr: false,
});

const ContactSection = () => {
  return (
    <section
      id='contact'
      className='scroll-mt-24 flex mt-16 flex-col items-center'
    >
      {/* Section label — keep the red tab style */}

      <BadgeCard />
    </section>
  );
}

export default ContactSection