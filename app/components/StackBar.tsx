'use client';
import React from 'react';
import Image from 'next/image';

type Tech = { src: string; alt: string; label?: string };

const DEFAUTLST_TECHS: Tech[] = [
  // Core Languages
  { src: '/logos/TS.svg', alt: 'TypeScript' },
  { src: '/logos/JS.svg', alt: 'JavaScript' },
  { src: '/logos/Python.svg', alt: 'Python' },
  { src: '/logos/Java.svg', alt: 'Java' },
  { src: '/logos/C++.svg', alt: 'C++' },

  // Frameworks & Libraries
  { src: '/logos/React.svg', alt: 'React' },
  { src: '/logos/Angular.svg', alt: 'Angular' },
  { src: '/logos/Next.svg', alt: 'Next.js' },
  { src: '/logos/SpringBoot.svg', alt: 'Spring Boot' },
  { src: '/logos/Express.svg', alt: 'Express.js' },

  // Styling & Animation
  { src: '/logos/Tailwind.svg', alt: 'Tailwind CSS' },
  { src: '/logos/Figma.svg', alt: 'Figma' },

  // Backend / Infra
  { src: '/logos/Node.svg', alt: 'Node.js' },
  { src: '/logos/Postgres.svg', alt: 'PostgreSQL' },
  { src: '/logos/AWS.svg', alt: 'AWS' },

  // Tooling / Testing
  { src: '/logos/Jest.svg', alt: 'Jest' },
  { src: '/logos/Nx.svg', alt: 'Nx' },
  { src: '/logos/Git.svg', alt: 'Git' },
  { src: '/logos/Jenkins.svg', alt: 'Jenkins' },
  { src: '/logos/Docker.svg', alt: 'Docker' },
  { src: '/logos/Jira.svg', alt: 'Jira' },
];
interface Props {
  items?: Tech[];
  speedSec?: number;
  grayscale?: boolean;
}

const StackBar = ({
  items = DEFAUTLST_TECHS,
  speedSec = 120,
  grayscale = true,
}) => {
  const tape = [...items, ...items, ...items, ...items];

  const itemWidth = 220; // min-w-[180px] + gap
  const moveDistance = items.length * itemWidth;

  return (
    <section aria-label='Languages, Frameworks, and Tools' className='w-full'>
      <div className='flex items-stretch gap-8'>
        {/* Left label column */}
        <div className='shrink-0 flex flex-col justify-evenly py-3 pr-4 border-y border-black/20'>
          <p className='font-gestura leading-none tracking-tight uppercase text-2xl'>
            Languages
          </p>
          <p className='font-gestura leading-none tracking-tight uppercase text-2xl'>
            Frameworks
          </p>
          <p className='font-gestura leading-none tracking-tight uppercase text-2xl'>
            Tools
          </p>
        </div>

        {/* Tape viewport */}
        <div className='relative flex-1 min-w-0 overflow-hidden'>
          {/* edge fades */}
          <div className='pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r z-10 from-white to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l z-10 from-white to-transparent' />

          {/* moving track */}
          <div
            className='tech-marquee flex gap-10 will-change-transform'
            style={{
              ['--speed' as any]: `${speedSec}s`,
              ['--move-distance' as any]: `-${moveDistance}px`,
            }}
            aria-hidden='true'
          >
            {tape.map((t, i) => (
              <div
                key={`${t.alt}-${i}`}
                className='flex items-end gap-3 min-w-[180px] px-4 py-3 border-y border-black/20'
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  width={80}
                  height={80}
                  className={`object-contain self-center ${grayscale ? 'grayscale' : ''}`}
                />
                <span className='font-gestura text-[0.60rem] tracking-[0.18em] uppercase text-black/70'>
                  {t.label ?? t.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackBar;
