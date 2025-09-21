import React from 'react';
import StackBar from './StackBar';
import Image from 'next/image';
import ProjectStack from './ProjectStack';

const ProjectSection = () => {
  return (
    <section className='flex mt-16 flex-col items-center'>
      {/* Section label — keep the red tab style */}

      <div className='px-4 pb-2 bg-[#F61111] w-fit'>
        <h1 className='text-white text-7xl font-futura'>Projects</h1>
      </div>
      {/* --- Tech divider --- */}
      <div className='my-16 w-full'>
        <StackBar />
      </div>

      <div className='flex flex-col w-full gap-16'>
        {/* One project */}
        <article className='flex flex-col lg:flex-row gap-12 items-center'>
          {/* Image / gallery entry */}
          <div className='min-w-0 lg:flex-[2]'>
            <div className='relative aspect-[16/9] overflow-hidden'>
              {/* Background gradient placeholder */}
              {/* Warm editorial gradient */}
              <div className='absolute inset-0 bg-[linear-gradient(22deg,#faf7f4,#e9e6e2_50%,#faf7f4)]' />
              <div className='absolute inset-0 pointer-events-none [box-shadow:inset_0_0_160px_rgba(0,0,0,0.08)]' />
              <ProjectStack
                images={[
                  '/images/projects/goviral-1.svg',
                  '/images/projects/goviral-2.svg',
                  '/images/projects/goviral-3.svg',
                  '/images/projects/goviral-4.svg',
                ]}
              />
            </div>
          </div>

          {/* Text */}
          <div className='lg:flex-[1] flex border-t border-b border-black/20 py-8 flex-col'>
            <h2 className='font-gestura text-5xl uppercase leading-tight'>
              GoViral
            </h2>
            <p className='mt-1 text-xs font-gestura tracking-[0.18em] uppercase text-black/60'>
              TypeScript, React, Node.js, Express, GPT-4o, ElevenLabs
            </p>
            <div className='mt-60 font-gestura text-2xl leading-relaxed text-black/80 space-y-6'>
              <p>
                GoViral is a web app that helps creators easily repurpose and
                manage viral short-form videos across platforms.
              </p>
              <p>
                With a responsive interface, it automates transcription, script
                rewriting, and AI voiceovers, simplifying the creative pipeline
                end-to-end.
              </p>
            </div>

            {/* Optional: tiny red accent rule to echo brand */}
            {/* <div className='mt-8 h-px bg-black/10' /> */}
          </div>
        </article>

        {/* Gapdle */}
        <article className='flex flex-col lg:flex-row gap-12 lg:items-center'>
          {/* Text */}
          <div className='lg:flex-[1] border-t border-b border-black/20 py-8 flex flex-col'>
            <h2 className='font-gestura text-5xl uppercase leading-tight'>
              Gapdle
            </h2>
            <p className='mt-1 text-xs font-gestura tracking-[0.18em] uppercase text-black/60'>
              Angular, TypeScript, Spring Boot, PostgreSQL, AWS
            </p>
            <div className='mt-60 font-gestura text-2xl leading-relaxed text-black/80 space-y-6'>
              <p>
                Gapdle is a daily head-to-head car race game—guess the winner,
                watch the clip, compare your pick to the crowd.
              </p>
              <p>
                It’s built for speed and simplicity: clean UI, instant feedback,
                and a moderation pipeline that scales as the community grows.
              </p>
            </div>
          </div>

          {/* Image / gallery entry */}
          <div className='min-w-0 lg:flex-[2]'>
            <div className='relative aspect-[16/9] overflow-hidden'>
              {/* Gunmetal studio with subtle depth + red hint for brand continuity */}
              <div className='absolute inset-0 bg-[linear-gradient(22deg,#f5f6f7,#e2e4e8_52%,#f5f6f7)]' />
              <div className='absolute inset-0 pointer-events-none [box-shadow:inset_0_0_160px_rgba(0,0,0,0.08)]' />

              <ProjectStack
                images={[
                  '/images/projects/gapdle-1.svg',
                  '/images/projects/gapdle-2.svg',
                  '/images/projects/gapdle-3.svg',
                  '/images/projects/gapdle-4.svg',
                ]}
              />
            </div>
          </div>
        </article>

        {/* FPL Predictor */}
        <article className='flex flex-col lg:flex-row gap-12 lg:items-center'>
          {/* Image / gallery entry */}
          <div className='min-w-0 lg:flex-[2]'>
            <div className='relative aspect-[16/9] overflow-hidden'>
              {/* Night match editorial background */}
              <div className='absolute inset-0 bg-[linear-gradient(22deg,#0f1116,#1a1d24_55%,#0f1116)]' />
              {/* spotlight glow — cool white/blue */}
              <div className='absolute inset-0 opacity-[0.14] bg-[radial-gradient(900px_500px_at_60%_70%,#4fa3ff_0%,transparent_75%)]' />
              {/* faint vignette to frame content */}
              <div className='absolute inset-0 pointer-events-none [box-shadow:inset_0_0_160px_rgba(0,0,0,0.6)]' />

              <ProjectStack
                variant='dark'
                images={[
                  '/images/projects/fpl-1.svg',
                  '/images/projects/fpl-2.svg',
                  '/images/projects/fpl-3.svg',
                ]}
              />
            </div>
          </div>

          {/* Text */}
          <div className='lg:flex-[1] border-t border-b border-black/20 py-8 flex flex-col'>
            <h2 className='font-gestura text-5xl uppercase leading-tight'>
              FPL Predictor
            </h2>
            <p className='mt-1 text-xs font-gestura tracking-[0.18em] uppercase text-black/60'>
              TypeScript, Python, FastAPI, Postgres, Scraping, ML
            </p>
            <div className='mt-60 font-gestura text-2xl leading-relaxed text-black/80 space-y-6'>
              <p>
                FPL Predictor blends form, fixtures, and historical trends to
                surface smart captaincy and lineup calls—fast.
              </p>
              <p>
                The interface stays minimal and direct; the modeling does the
                heavy lifting so you can act with confidence.
              </p>
            </div>
          </div>
        </article>
      </div>
      {/* Archives / Past Collections link */}
      <div className='mt-20 flex flex-col items-center text-center'>
        <p className='font-gestura text-xl text-black/60'>
          Explore earlier releases and experimental builds in the{' '}
          <a
            href='https://github.com/jcamp50'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-4 hover:text-[#F61111] transition-colors'
          >
            archives →
          </a>
        </p>
      </div>
    </section>
  );
};

export default ProjectSection;
