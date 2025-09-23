'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// tweak these to match your routes / anchors
const NAV_LINKS = [
  { href: '#experience', label: 'EXPERIENCE' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#contact', label: 'CONTACT' },
];

const SECTION_IDS = ['home', 'experience', 'projects', 'contact'];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Observe sections in viewport to drive active link
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (els.length === 0) return;

    // Create a "center band": only ~10% tall, in the middle of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries.filter((e) => e.isIntersecting);
        if (inBand.length === 0) return;

        const centerY = window.innerHeight / 2;
        const best = inBand
          .map((e) => {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            return {
              id: (e.target as HTMLElement).id,
              d: Math.abs(rect.top - centerY),
            };
          })
          .sort((a, b) => a.d - b.d)[0];

        if (best?.id) setActiveId(best.id);
      },
      {
        // 45% margins leave a ~10% tall band in the middle
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Sync with hash on mount + when hash changes (clicking nav)
  useEffect(() => {
    const setFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && SECTION_IDS.includes(hash)) setActiveId(hash);
    };
    setFromHash();
    window.addEventListener('hashchange', setFromHash);
    return () => window.removeEventListener('hashchange', setFromHash);
  }, []);

  // shared link styles (Gestura caps, tighter tracking, thin underline on hover)
  const linkBase =
    'relative px-2 py-1 text-sm tracking-tight uppercase font-normal ' +
    'transition-colors duration-150';
  const linkUnderline =
    'after:absolute after:left-0 after:-bottom-[2px] after:h-px after:w-0 ' +
    'after:bg-black after:transition-all after:duration-200 hover:after:w-full';
  const linkInactive = 'text-black/80 hover:text-black';
  const linkActive = 'text-black after:w-full'; // active shows underline by default

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50',
        'transition-all duration-200',
        scrolled ? 'bg-white border-b border-black/5' : 'bg-white',
      ].join(' ')}
      role='banner'
    >
      <nav
        className='mx-auto max-w-[120rem] px-5 sm:px-12'
        aria-label='Primary'
      >
        {/* Flex row: left logo • center nav • right cta */}
        <div className='flex flex-row items-center h-16 w-full'>
          {/* Left: Logo */}
          <div className='flex flex-1 justify-start'>
            <Link
              href='#home'
              onClick={() => setActiveId('home')}
              className='inline-flex items-center gap-2'
              aria-label='Jordan Campbell — Home'
            >
              <Image
                src='/logo.svg'
                alt='Jordan Campbell Logo'
                width={40}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Center: Nav (desktop) */}
          <ul className='hidden md:flex flex-1 justify-center gap-7'>
            {NAV_LINKS.map((item) => {
              const isActive = item.href === `#${activeId}`;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      const id = item.href.replace('#', '');
                      setActiveId(id);
                    }}
                    className={[
                      linkBase,
                      linkUnderline,
                      isActive ? linkActive : linkInactive,
                      'font-gestura',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: CTA (balances the centered nav) */}
          <div className='hidden md:flex flex-1 justify-end items-center gap-4'>
            <Link
              href='https://github.com/jcamp50'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
              className='text-black/80 hover:text-black transition-colors'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
                className='h-5 w-5'
              >
                <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.94.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.23 3.32.94.1-.74.4-1.23.72-1.51-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18.91-.25 1.88-.38 2.85-.38.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.85 1.18 3.11 0 4.42-2.69 5.4-5.25 5.68.41.36.77 1.07.77 2.16 0 1.56-.01 2.82-.01 3.21 0 .3.21.66.8.55C20.21 21.41 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5z' />
              </svg>
            </Link>

            <Link
              href='https://www.linkedin.com/in/campbell-jordan'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
              className='text-black/80 hover:text-black transition-colors'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
                className='h-5 w-5'
              >
                <path d='M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5s-2-.9-2-2 1-2 2-2 2 .9 2 2zM.5 8h5v14h-5V8zm7.5 0h4.7v2h.1c.7-1.2 2.5-2.5 5.2-2.5 5.5 0 6.5 3.6 6.5 8.3V22h-5v-7c0-1.7 0-3.8-2.3-3.8-2.3 0-2.7 1.8-2.7 3.7v7h-5V8z' />
              </svg>
            </Link>
          </div>

          {/* Mobile: hamburger */}
          <div className='md:hidden flex flex-1 justify-end'>
            <button
              aria-label='Toggle menu'
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className='group inline-flex h-8 w-8 items-center justify-center rounded-md border border-black/10'
            >
              <span className='sr-only'>Menu</span>
              <div className='h-[1px] w-4 bg-black transition-all group-aria-expanded:rotate-45' />
              <div className='h-[1px] w-4 bg-black mt-[5px] transition-all group-aria-expanded:opacity-0' />
              <div className='h-[1px] w-4 bg-black mt-[5px] transition-all group-aria-expanded:-rotate-45' />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className='md:hidden pb-4'>
            <ul className='flex flex-col items-center gap-3 pt-2'>
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={[
                      'block px-3 py-2 text-base uppercase tracking-tight',
                      'text-black/80 hover:text-black',
                      'relative after:absolute after:left-0 after:-bottom-[2px] after:h-px after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-200',
                      'font-gestura',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href='/resume.pdf'
                  onClick={() => setOpen(false)}
                  className='text-base underline underline-offset-4'
                >
                  Resume
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
