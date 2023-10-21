'use client';
import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  
  

  return (
    <section className='lg:py-16'>
      <div className='grid grid-cols-1 sm:grid-cols-12'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='col-span-8 place-self-center text-center sm:text-left justify-self-start'
        >
          <h1 className='text-white mb-4 text-5xl sm:text-6xl lg:text-8xl lg:leading-normal font-extrabold'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-600'>
              Hello, I&apos;m{' '}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Jordan.',
                5000,
                'a Software Engineer.',
                2000,
                'a Front-End Dev.',
                2000,
                'a UI/UX Designer.',
                2000,
              ]}
              wrapper='span'
              speed={30}
              repeat={Infinity}
            />
          </h1>
          <p className='text-transparent text-base sm:text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum.
          </p>
          <div className='font-mono'>
            <Link
              href='/#contact'
              className='px-1 inline-block py-1 w-full sm:w-fit rounded-full mr-4 shadow-md shadow-teal-700 btn-gradient text-white'
            >
              <span className='block bg-[#121212] hover:bg-[#1f1f1f] rounded-full px-5 py-2 md:px-12 md:py-4 md:text-lg'>
                Contact Me
              </span>
            </Link>
            <Link
              className='px-1 inline-block py-1 w-full sm:w-fit rounded-full mr-4 shadow-md shadow-teal-700 btn-gradient text-white mt-3 mb-3'
              href='/Jordan_Campbell_Resume.pdf' // adjust this path to your actual file's location
              download
            >
              <span className='block bg-[#121212] hover:bg-[#1f1f1f] rounded-full px-5 py-2 md:px-12 md:py-4 md:text-lg'>
                My Resume
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='col-span-4 place-self-center mt-4 lg:mt-0'
        >
          <div className='rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative'>
            <Image
              src='/images/hero-image-laptop.png'
              alt='hero image'
              className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
