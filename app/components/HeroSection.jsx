'use client';
import React from 'react';
import Image from 'next/image';
import heroLaptop from '@/public/images/hero-image-laptop.png';
import ScrollPhrase from './ScrollPhrase';

const HeroSection = () => {
  return (
    <div className='flex flex-col gap-16'>
      <div className='flex flex-row items-center justify-around'>
        {/* Left: Gradient Text */}
        <div className='flex-1'>
          <h1 className='text-9xl font-gestura text-gradient-clip leading-tight'>
            Hey there, <br />
            I&rsquo;m Jordan.
          </h1>
        </div>
        {/* Right: Red Background with Image */}
        <div className='flex-1 flex justify-end'>
          <div
            className='w-[800px] h-[770px] p-10 flex items-center justify-center'
            style={{
              background:
                'linear-gradient(25deg, #F61111 10%, #D28484 40%, #D96D6D 65%, #F61111 100%)',
            }}
          >
            <Image
              src={heroLaptop}
              alt='Hero image'
              width={650}
              height={650}
              className='object-contain drop-shadow-xl'
              priority
              quality={100}
              sizes='(min-width: 1024px) 650px, 60vw'
            />
          </div>
        </div>
      </div>

      <div data-animate='true'>
        <ScrollPhrase />
      </div>
    </div>
  );
};

export default HeroSection;
