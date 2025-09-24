'use client';

import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';

const ExperienceSection = () => {
  const items = [
    {
      logo: '/logos/Fidelity.svg',
      company: 'Fidelity Investments',
      role: 'Software Eng. Intern',
      dates: 'Jun - Aug 2025',
      align: 'left' as const,
      details: {
        summary:
          'Software Engineering Internship in the Workplace Investing Unit.',
        bullets: [
          'Built features for WingNav (AI code nav tool)',
          'Enhanced CI/CD pipeline',
          'Boosted test coverage in monorepo',
          'Agile squad collaboration',
          'Had fun',
        ],
        location: 'Durham, NC',
        stack:
          'Framework: 100% angular. Language: 100% typescript. Testing: 70% jest, 30% jasmine, Tools: 30% jenkins, 40% nx , 40% jira',
        showBarcode: true,
      },
    },
    {
      logo: '/logos/Lockheed.svg',
      company: 'Lockheed Martin',
      role: 'Systems Eng. Intern',
      dates: 'Jul - Dec 2024',
      align: 'right' as const,
      details: {
        summary:
          'Systems Engineering internship with Advanced Threat Warning Team.',
        bullets: [
          'Built real-time UI overlays',
          'Optimized backend pipelines',
          'Simulated sensor interactions',
          'Debugged under pressure',
          'Saw cool things',
        ],
        location: 'Orlando, FL',
        stack:
          'Language: 50% c++, 50% matlab. Tools: 40% simulations, 60% secret stuff',
        showBarcode: true,
      },
    },
    {
      logo: '/logos/Netflix.svg',
      company: 'Netflix + Formation',
      role: 'Software Eng. Fellow',
      dates: 'May - Dec 2024',
      align: 'left' as const,
      details: {
        summary:
          'Competitive engineering fellowship with the Netflix + Formation program.',
        bullets: [
          'Practiced system design',
          'Mastered DS & Algos',
          'Collaborated with industry engineers',
          'Built scalable mock systems',
          'Sharpened coding practices',
          'Went fun places',
        ],
        location: 'Remote',
        stack:
          'Language: 70% python, 30% javascript. Skills: 33% system design, 33% algorithms, 33% data structures',
        showBarcode: true,
      },
    },
    {
      logo: '/logos/Kairos.svg',
      company: 'Kairos, Inc',
      role: 'Additive Manufacturing Intern',
      dates: 'May - Aug 2023',
      align: 'right' as const,
      details: {
        summary: 'Hands-on additive manufacturing experience.',
        bullets: [
          'Programmed resin printers',
          'Integrated firmware drivers',
          'Built monitoring dashboards',
          'Validated mechanical tolerances',
          'Met cool people',
        ],
        location: 'California, MD',
        stack:
          'Language: 60% c++, 40% arduino. Tools: 50% solidworks, 50% 3D printing systems',
        showBarcode: true,
      },
    },
    {
      logo: '/logos/Kairos.svg',
      company: 'Kairos, Inc',
      role: 'IT Intern',
      dates: 'Jun - Sep 2022',
      align: 'left' as const,
      details: {
        summary: 'IT internship supporting engineers and office staff.',
        bullets: [
          'Configured user machines',
          'Installed custom software',
          'Managed account permissions',
          'Solved support tickets',
        ],
        location: 'California, MD',
        stack:
          'Tools: 40% sharepoint, 30% confluence, 30% powerpoint. Skills: 60% troubleshooting, 40% network administration',
        showBarcode: true,
      },
    },
  ];
  

  return (
    <section
      id='experience'
      className='scroll-mt-24 flex flex-col mt-16 items-center'
    >
      {/* Heading */}
      <div className='px-4 pb-2 bg-[#F61111] w-fit'>
        <h1 className='text-white text-7xl font-futura'>Experience</h1>
      </div>

      {/* Timeline container */}
      <div className='relative mt-16 w-full max-w-[84rem]'>
        {/* Center dashed line with red→white fade (no SVG) */}
        <div
          className='pointer-events-none absolute top-0 h-[86%] left-1/2 -translate-x-1/2 z-10 w-[2px]
             [background-image:linear-gradient(to_bottom,#F61111_0%,#F61111_85%,white_100%)]
             [mask-image:repeating-linear-gradient(to_bottom,black_0,black_8px,transparent_8px,transparent_20px)]
             [-webkit-mask-image:repeating-linear-gradient(to_bottom,black_0,black_8px,transparent_8px,transparent_20px)]'
          aria-hidden='true'
        />

        {/* Cards */}
        <div className='relative z-20 flex flex-col gap-28'>
          {items.map((it, i) => {
            const fromX = it.align === 'left' ? -24 : 24;

            return (
              <motion.div
                key={it.company + i}
                initial={{ opacity: 0, y: 16, x: fromX }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <ExperienceCard
                  logo={it.logo}
                  company={it.company}
                  role={it.role}
                  dates={it.dates}
                  align={it.align}
                  progress={items.length === 1 ? 0 : i / (items.length - 1)}
                  details={it.details}
                />
              </motion.div>
            );
          })}

          {/* Education at the bottom, centered */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} // ← fixed delay, not i * 0.06
            viewport={{ once: true, amount: 0.25 }}
          >
            {' '}
            <ExperienceCard
              variant='education'
              logo='/logos/UCF_tab.svg'
              school='University of Central Florida'
              degree='B.S. Computer Science'
              gpa='3.5'
              dates='Aug 2022 – May 2026'
              progress={1}
              // courses will be the details in the expanded section later
              courses={[
                'Artificial Intelligence',
                'Robot Vision',
                'Database Systems',
                'Mobile Device Software Development',
                'Software Engineering',
                'Object-Oriented Programming',
                'Computer Logic & Organization',
                'Discrete Structures I & II',
                'Matrix & Linear Algebra',
              ]}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
