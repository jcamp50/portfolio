'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavLink from './NavLink';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import MenuOverlay from './MenuOverlay';
import Logo from 'public/logo.png';
import Image from 'next/image';

const navLinks = [
  {
    title: 'Activity',
    path: '#activity',
  },
  {
    title: 'About',
    path: '#about',
  },
  {
    title: 'Projects',
    path: '#projects',
  },
  {
    title: 'Contact',
    path: '#contact',
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className='font-mono fixed inset-x-0 top-0 z-20 px-4 py-1 mx-auto left-0 right-0 bg-transparent backdrop-blur-sm'>
      <div
        className='slider bg-opacity-10'
        style={{
          transform:
            scrolled || navbarOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      ></div>
      <div className='flex container flex-wrap items-center justify-between mx-auto px-4 py-2'>
        <Link href={'/'} className='text-2xl md:text-3xl text-white '>
          &lt;portfolio&gt;
        </Link>
        <div className='mobile-menu block md:hidden'>
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className='flex  items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'
            >
              <Bars3Icon className='h-5 w-5' />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className='flex  items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'
            >
              <XMarkIcon className='h-5 w-5' />
            </button>
          )}
        </div>

        <div className='menu hidden md:block md:w-auto' id='navbar'>
          <ul className='flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
