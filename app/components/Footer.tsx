import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='mt-80'>
      <div className='p-8 flex gap-8 text-xs  text-black/60 justify-center'>
        <p>Built with React, TypeScript, Motion, and Tailwind CSS</p>
        <p>© Jordan Campbell 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
