import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='mt-80'>
      <div className='p-8 flex flex-col md:flex-row gap-4 md:gap-8 text-[10px] md:text-xs text-black/60 justify-center items-center text-center'>
        <p>Built with React, TypeScript, Motion, and Tailwind CSS</p>
        <p>© Jordan Campbell 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
