import React from 'react';
import Image from 'next/image';
import Logo from 'public/logo.png';
const Footer = () => {
  return (
    <footer className='footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-[#33353F]'>
      <div className='container p-12 flex justify-between'>
        &lt;portfolio/&gt;
        <p className='text-slate-600'>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
