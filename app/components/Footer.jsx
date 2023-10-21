import React from 'react';
import Image from 'next/image';
import Logo from 'public/logo.png';
const Footer = () => {
  return (
    <footer className='font-mono footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-[#33353F]'>
      <div className='container p-12 flex gap-2 text-white justify-between'>
        <div className='text-md md:text-2xl'>&lt;/portfolio&gt;</div>
        <p>© Jordan Campbell 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
