'use client';
import React from 'react';
import Image from 'next/image';
import heroLaptop from '@/public/images/hero-image-laptop.png';
import ScrollPhrase from './ScrollPhrase';
import ArrowDown from '@/public/ArrowDown.svg';

const HeroSection = () => {
  return (
    <div className='flex flex-col gap-20'>
      <div className='flex flex-row items-start'>
        {/* Left: Gradient Text */}
        <div className='flex-1 pt-48'>
          <div className='inline-block text-left'>
            <h1 className='text-9xl font-gestura text-gradient-clip leading-tight'>
              Hey there, <br />
              I&rsquo;m Jordan.
            </h1>

            <div className='mt-20 text-center'>
              <p className='mt-4 text-[0.70rem] tracking-[0.24em] font-gestura uppercase font-light microcopy-reveal text-black/80'>
                Scroll
              </p>
              <Image
                src={ArrowDown}
                alt='Scroll down'
                className='inline-block arrow-reveal'
                width={48}
                height={48}
              />
            </div>
          </div>
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
