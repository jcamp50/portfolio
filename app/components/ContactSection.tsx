'use client';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView, useAnimate } from 'framer-motion';

const BadgeCard = dynamic(() => import('./BadgeCard'), { ssr: false });

export default function ContactSection() {
  const [played, setPlayed] = useState(false); // run once per load
  const [introPlay, setIntroPlay] = useState(false); // tells BadgeCard to drop

  const [scope, animate] = useAnimate();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(headerRef, { amount: 0.6, once: true });

  useEffect(() => {
    if (!inView || played) return;
    setPlayed(true);

    (async () => {
      // 1) Shrink the header to strap-ish proportions + shrink text to ~11px
      await Promise.all([
        animate(
          '#tab',
          {
            height: 40, // optional: keeps a strap-like height
            width: 120, // optional: keeps a strap-like width
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 8, // add top padding explicitly
            paddingBottom: 8, // bottom padding now visible
            borderRadius: 0,
          },
          { duration: 0.25, ease: 'easeOut' }
        ),
        animate('#title', { scale: 0.3 }, { duration: 0.25, ease: 'easeOut' }), // 7xl → ~11px
      ]);

      // 2) Fade header out (optional: add a tiny delay here if you want)
      animate('#tab', { opacity: 0 }, { duration: 0.1, ease: 'linear' });

      // 3) Start the lanyard/card intro
      setIntroPlay(true);
    })();
  }, [inView, played, animate]);

  return (
    <section
      id='contact'
      className='scroll-mt-24 mt-16 flex flex-col items-center'
    >
      <div ref={scope} className='relative flex flex-col items-center'>
        {/* Header (only element we animate) */}
        <div
          ref={headerRef}
          id='tab'
          className='bg-[#F61111] w-fit will-change-transform flex items-center justify-center'
          style={{ transformOrigin: '50% 50%' }}
        >
          <h1
            id='title'
            className='text-white text-7xl px-4 pb-2 font-futura leading-none'
            style={{ transformOrigin: '50% 50%' }}
          >
            Contact
          </h1>
        </div>
      </div>

      {/* Real lanyard + badge (unchanged) */}
      <div className='-mt-4'>
        <BadgeCard introPlay={introPlay} />
      </div>
    </section>
  );
}
