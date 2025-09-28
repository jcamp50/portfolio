'use client';
import React from 'react';
import Image from 'next/image';
import heroLaptop from '@/public/images/hero-image-laptop.png';
import ScrollPhrase from './ScrollPhrase';
import ArrowDown from '@/public/Icons/ArrowDown.svg';

const HeroSection = () => {
  return (
    <div
      id='home'
      className='scroll-mt-24 flex flex-col mt-24 gap-12 md:gap-16 lg:gap-20'
    >
      <div className='flex flex-col md:flex-row items-center md:items-start'>
        {/* Left: Gradient Text */}
        <div className='order-2 md:order-1 flex-1 pt-14 sm:pt-14 md:pt-32 lg:pt-48'>
          <div className='inline-block text-center md:text-left'>
            <h1
              className='font-gestura text-gradient-clip leading-tight
                text-5xl sm:text-6xl md:text-6xl lg:text-9xl'
            >
              Hey there, <br />
              I&rsquo;m Jordan.
            </h1>

            <div className='mt-8 md:mt-20 text-center'>
              <p className='mt-8 sm:mt-4 text-[0.70rem] tracking-[0.24em] font-gestura uppercase font-light microcopy-reveal text-black/80'>
                Scroll
              </p>
              <Image
                src={ArrowDown}
                alt='Scroll down'
                className='inline-block arrow-reveal w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'
                unoptimized
              />
            </div>
          </div>
        </div>
        {/* Right: Red Background with Image */}
        <div className='order-1 md:order-2 flex-1 w-full flex justify-center md:justify-end'>
          <div
            className='w-[85vw] sm:w-[90vw] md:w-[680px] md:h-[640px] lg:w-[800px] lg:h-[770px]
             aspect-[4/3] md:aspect-auto
             p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center mx-auto'
            style={{
              background:
                'linear-gradient(25deg, #F61111 10%, #D28484 40%, #D96D6D 65%, #F61111 100%)',
            }}
          >
            <Image
              src={heroLaptop}
              alt='Hero image'
              priority
              quality={100}
              className='object-contain drop-shadow-md'
              width={650} // your original desktop visual; keeps lg look unchanged
              height={650}
              sizes='(min-width: 1024px) 650px, (min-width: 768px) 520px, 72vw'
              unoptimized
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
