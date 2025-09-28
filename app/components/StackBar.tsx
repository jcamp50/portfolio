'use client';
import React from 'react';
import Image from 'next/image';
import tsImg from '@/public/images/logos/TS.svg';
import jsImg from '@/public/images/logos/JS.svg';
import pythonImg from '@/public/images/logos/Python.svg';
import javaImg from '@/public/images/logos/Java.svg';
import cppImg from '@/public/images/logos/C++.svg';
import reactImg from '@/public/images/logos/React.svg';
import angularImg from '@/public/images/logos/Angular.svg';
import nextImg from '@/public/images/logos/Next.svg';
import springBootImg from '@/public/images/logos/SpringBoot.svg';
import expressImg from '@/public/images/logos/Express.svg';
import tailwindImg from '@/public/images/logos/Tailwind.svg';
import figmaImg from '@/public/images/logos/Figma.svg';
import nodeImg from '@/public/images/logos/Node.svg';
import postgresImg from '@/public/images/logos/Postgres.svg';
import awsImg from '@/public/images/logos/AWS.svg';
import jestImg from '@/public/images/logos/Jest.svg';
import nxImg from '@/public/images/logos/Nx.svg';
import gitImg from '@/public/images/logos/Git.svg';
import jenkinsImg from '@/public/images/logos/Jenkins.svg';
import dockerImg from '@/public/images/logos/Docker.svg';
import jiraImg from '@/public/images/logos/Jira.svg';

type Tech = { src: string; alt: string; label?: string };

const DEFAUTLST_TECHS: Tech[] = [
  // Core Languages
  { src: tsImg, alt: 'TypeScript' },
  { src: jsImg, alt: 'JavaScript' },
  { src: pythonImg, alt: 'Python' },
  { src: javaImg, alt: 'Java' },
  { src: cppImg, alt: 'C++' },

  // Frameworks & Libraries
  { src: reactImg, alt: 'React' },
  { src: angularImg, alt: 'Angular' },
  { src: nextImg, alt: 'Next.js' },
  { src: springBootImg, alt: 'Spring Boot' },
  { src: expressImg, alt: 'Express.js' },

  // Styling & Animation
  { src: tailwindImg, alt: 'Tailwind CSS' },
  { src: figmaImg, alt: 'Figma' },

  // Backend / Infra
  { src: nodeImg, alt: 'Node.js' },
  { src: postgresImg, alt: 'PostgreSQL' },
  { src: awsImg, alt: 'AWS' },

  // Tooling / Testing /
  { src: jestImg, alt: 'Jest' },
  { src: nxImg, alt: 'Nx' },
  { src: gitImg, alt: 'Git' },
  { src: jenkinsImg, alt: 'Jenkins' },
  { src: dockerImg, alt: 'Docker' },
  { src: jiraImg, alt: 'Jira' },
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
                  className={`object-contain self-center ${
                    grayscale ? 'grayscale' : ''
                  }`}
                  unoptimized
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
