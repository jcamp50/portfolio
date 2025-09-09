'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WORDS = [
  'develop.',
  'design.',
  'debug.',
  'ship.',
  'collaborate.',
  'explore.',
  'learn.',
  'scale.',
  'innovate.',
  'inspire.',
  'create.',
];

export default function ScrollPhrase() {
  useEffect(() => {
    const supportsScrollLinked = CSS?.supports?.(
      '(animation-timeline: scroll()) and (animation-range: 0% 100%)'
    );

    if (!supportsScrollLinked) {
      gsap.registerPlugin(ScrollTrigger);

      const items = gsap.utils.toArray<HTMLElement>(
        'ul[data-scroll-phrase] li'
      );

      gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

      const t1 = gsap
        .timeline()
        .to(items.slice(1), { opacity: 1, stagger: 0.5 })
        .to(
          items.slice(0, items.length - 1),
          { opacity: 0.2, stagger: 0.5 },
          0
        );

      ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: 'center center',
        end: 'center center',
        animation: t1,
        scrub: 0.2,
        snap: {
          snapTo: (value) => {
            const n = items.length - 1;
            return Math.round(value * n) / n;
          },
          duration: 0.2,
          ease: 'power1.inOut',
        },
      });
    }
  }, []);

  return (
    <section className='content fluid'>
      <h2 className='sticky-lead'>
        <span aria-hidden='true' className='font-gestura font-normal'>
          I like to&nbsp;
        </span>
        <span className='sr-only font-gestura'>
          I like to {WORDS[WORDS.length - 1]}
        </span>
      </h2>

      <ul
        aria-hidden='true'
        data-scroll-phrase
        style={{ ['--count' as any]: WORDS.length }}
        className='font-futura'
      >
        {WORDS.map((w, i) => (
          <li key={w} style={{ ['--i' as any]: i } as React.CSSProperties}>
            {w}
          </li>
        ))}
      </ul>
    </section>
  );
}
