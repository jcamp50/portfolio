'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { log } from 'console';

interface ExperienceCardProps {
  logo: string;
  // experience fields
  company?: string;
  role?: string;
  // shared
  dates: string;
  progress?: number; // 0..1
  details?: DetailsProps;
  // layout
  align?: 'left' | 'right';
  variant?: 'experience' | 'education';
  // education-only fields
  school?: string;
  degree?: string;
  gpa?: string;
  courses?: string[]; // education details list
}

interface DetailsProps {
  summary?: string;
  bullets?: string[]; // e.g., ["Built X", "Improved Y"]
  location?: string; // "Durham, NC"
  stack?: string; // "Angular, TypeScript, Nx, Jest, Jenkins, Jira"
  showBarcode?: boolean; // if you want to render a faux barcode
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  logo,
  // experience
  company,
  role,
  // education
  school,
  degree,
  gpa,
  courses,
  // shared
  dates,
  align = 'left',
  progress = 0,
  details,
  variant = 'experience',
}) => {
  const halfWrapBase = 'relative w-1/2 flex'; // confines card to half the container (prevents hitting the center line)
  const centerWrap = 'relative w-full flex justify-center px-20';

  const halfWrapAlign =
    align === 'left'
      ? 'justify-end pr-20' // push card toward center, add gutter from line
      : 'ml-auto justify-start pl-20'; // move wrapper to right half, add gutter

  const p = Math.max(0, Math.min(1, progress)); // clamp progress between 0 and 1

  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState(0);

  const isEdu = variant === 'education';

  // card sizing / typography tweaks
  const logoSize = isEdu ? 100 : 150;
  const titleClass = isEdu
    ? 'font-gestura text-4xl tracking-tight uppercase'
    : 'font-gestura text-3xl tracking-tight uppercase';
  const subTitleClass = isEdu
    ? 'font-gestura text-2xl'
    : 'font-gestura font-light text-gray-500 text-xl';
  const dateClass = isEdu
    ? 'font-gestura text-xl font-light text-gray-500 mt-auto'
    : 'font-gestura text-xl font-light text-gray-500 mt-auto';

  // background
  const cardBg = isEdu
    ? 'bg-[linear-gradient(to_bottom_right,#FBFBFB,#F4EDB5)]'
    : 'bg-gradient-to-br from-white via-gray-20 to-gray-50';

  useEffect(() => {
    if (!contentRef.current) return;
    // measure full height of the hidden content
    const h = contentRef.current.scrollHeight;
    setMaxH(h);
  }, [open, details]); // recalc when opening or details change

  const toggle = () => setOpen((v) => !v);

  const bracketColor = open ? 'border-black' : 'border-gray-200';

  return (
    <div className='relative w-full'>
      {/* 1) cover a small window of the main line so we control the dash here */}
      {!isEdu && (
        <>
          <span
            aria-hidden='true'
            className='pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
             z-[18] w-[8px] h-[20px] bg-white'
          />

          <span
            aria-hidden='true'
            className='pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
             z-[19] w-[4px] h-[8px]'
            style={{
              backgroundImage:
                'linear-gradient(to bottom, #F61111 0%, #F61111 85%, white 100%)',
              backgroundSize: '100% 1000%',
              backgroundPosition: `center ${p * 100}%`, // same mapping as before
            }}
          />

          <span
            aria-hidden='true'
            className='pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
             z-[20] w-4 h-4 shadow-[0_0_0_2px_#fff]'
            style={{
              backgroundImage:
                'linear-gradient(to bottom, #F61111 0%, #F61111 85%, white 100%)',
              backgroundSize: '100% 1000%',
              backgroundPosition: `center ${p * 100}%`, // same mapping as before
            }}
          />
        </>
      )}
      {/* Half-width wrapper that keeps card on its side */}
      <div className={isEdu ? centerWrap : `${halfWrapBase} ${halfWrapAlign}`}>
        {/* Card */}
        <div
          role='button'
          tabIndex={0}
          aria-expanded={open}
          onClick={toggle}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()}
          className={`group relative flex items-stretch cursor-pointer
              ${cardBg}
              transition-all duration-300 ${
                open ? 'shadow-lg' : 'shadow-md'
              } flex flex-col ${
            isEdu ? 'w-full max-w-[900px] px-12 py-6' : ' p-6 min-w-full'
          } `}
        >
          {/* Corner brackets */}
          <span
            className={`absolute -top-2 -left-2 w-6 h-6 border-t-8 border-l-8 group-hover:border-black ${
              open ? 'border-black' : 'border-gray-200'
            } z-30`}
          />
          <span
            className={`absolute -top-2 -right-2 w-6 h-6 border-t-8 border-r-8 group-hover:border-black ${
              open ? 'border-black' : 'border-gray-200'
            } z-30`}
          />
          <span
            className={`absolute -bottom-2 -left-2 w-6 h-6 border-b-8 border-l-8 group-hover:border-black ${
              open ? 'border-black' : 'border-gray-200'
            } z-30`}
          />
          <span
            className={`absolute -bottom-2 -right-2 w-6 h-6 border-b-8 border-r-8 group-hover:border-black ${
              open ? 'border-black' : 'border-gray-200'
            } z-30`}
          />
          {isEdu && (
            <>
              {/* Watermark seal (only when expanded) */}
              {open && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute z-0 left-1/2 -translate-x-1/2
                bottom-8 w-[300px] h-[300px]
                bg-[url('/logos/UCF_seal.svg')] bg-no-repeat bg-contain
                opacity-30"
                />
              )}

              {/* Diagonal sheen / foil */}
              <div
                aria-hidden
                className='pointer-events-none absolute inset-0 z-10
               bg-[linear-gradient(135deg,rgba(255,255,255,0.6)_0%,transparent_40%)]
               mix-blend-overlay opacity-20'
              />
            </>
          )}

          {/* ===== HEADER ROW ===== */}
          <div
            className={`relative z-20 flex items-start gap-4 ${
              isEdu ? 'pl-[120px]' : ''
            }`}
          >
            {/* Logo */}
            {isEdu ? (
              // Education: absolute, top-left, no padding
              <Image
                src={logo}
                alt={`${school} logo`}
                width={logoSize}
                height={logoSize}
                className='absolute top-0 left-0 object-contain -translate-y-6'
                priority={false}
              />
            ) : (
              // Experience: keep inline in the row
              <div className='flex-shrink-0'>
                <Image
                  src={logo}
                  alt={`${company} logo`}
                  width={logoSize}
                  height={logoSize}
                  className='object-contain'
                  priority={false}
                />
              </div>
            )}

            {/* Text column */}
            <div className='flex-1 flex flex-col h-full'>
              {/* Company + role + caret (same row) */}
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <h2 className={titleClass}>{isEdu ? school : company}</h2>
                  <p className={subTitleClass}>{isEdu ? degree : role}</p>
                  {isEdu && gpa ? (
                    <p className='font-gestura text-xl text-gray-500'>
                      GPA: {gpa}
                    </p>
                  ) : null}
                </div>

                {/* caret indicator
                <div
                  className={`mt-1 transition-transform duration-300 ${
                    open ? 'rotate-180' : ''
                  }`}
                  aria-hidden='true'
                  title={open ? 'Collapse' : 'Expand'}
                >
                  <svg width='18' height='18' viewBox='0 0 20 20' fill='none'>
                    <path
                      d='M5 8l5 5 5-5'
                      stroke='#111'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div> */}
              </div>

              {/* Date pinned to bottom of the text column */}
              <p className={dateClass}>{dates}</p>
            </div>
          </div>

          {/* ===== DETAILS COLUMN (expand/collapse) ===== */}
          <div
            className='overflow-hidden transition-all duration-400 ease-out'
            style={{ maxHeight: open ? maxH : 0 }}
          >
            <div
              ref={contentRef}
              className={
                (isEdu
                  ? 'pt-16 font-gestura text-lg font-light text-gray-500'
                  : 'pt-5 font-gestura text-sm font-light text-gray-500') +
                ' relative z-20'
              }
            >
              {isEdu ? (
                // EDUCATION details: just courses list (if any)
                <>
                  <h2 className='font-gestura text-xl mb-8'>
                    Relevant Courses:
                  </h2>
                  {Array.isArray(courses) && courses.length > 0 && (
                    <ul className='space-y-1'>
                      {courses.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // EXPERIENCE details: existing block
                <>
                  <div className='max-w-[60%]'>
                    {details?.summary && (
                      <p className='mb-8'>{details.summary}</p>
                    )}
                    {details?.location && (
                      <p className='mb-8'>
                        <span>Location: </span>
                        {details.location}
                      </p>
                    )}
                    {details?.bullets?.length ? (
                      <ul className='mb-8'>
                        {details.bullets.map((b, i) => (
                          <li key={i} className='leading-relaxed'>
                            - {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {details?.stack && <p className='mb-8'>{details.stack}</p>}
                  </div>

                  {/* BARCODE only for experience */}
                  {details?.showBarcode && (
                    <div className='flex justify-center py-4'>
                      <Image
                        src='/images/barcode.svg'
                        alt='barcode'
                        width={250}
                        height={32}
                        className='opacity-60 object-contain'
                        priority={false}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
