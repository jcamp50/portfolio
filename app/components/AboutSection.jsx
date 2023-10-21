'use client';
import React, { useTransition, useState } from 'react';
import Image from 'next/image';
import SkillTag from './SkillTag';
import EducationTag from './EducationTag';
import TabButton from './TabButton';
import ReactIcon from 'public/react-icon.svg';
import NextJsIcon from 'public/nextjs-icon.svg';
import TailwindIcon from 'public/tailwind-css-icon.svg';
import TypeScriptIcon from 'public/typescript-icon.svg';
import NodeJsIcon from 'public/nodejs-icon.svg';
import GitIcon from 'public/git-icon.svg';
import PythonIcon from 'public/python-icon.svg';
import JavaScriptIcon from 'public/javascript-icon.svg';
import UCFIcon from 'public/ucf-icon.svg';

const SKILLS = [
  { icon: ReactIcon, name: 'React' },
  { icon: NextJsIcon, name: 'Next.js' },
  { icon: JavaScriptIcon, name: 'JavaScript' },
  { icon: NodeJsIcon, name: 'Node.js' },
  { icon: TypeScriptIcon, name: 'TypeScript' },
  { icon: TailwindIcon, name: 'Tailwind CSS' },
  { icon: PythonIcon, name: 'Python' },
  { icon: GitIcon, name: 'Git' },

  // ... add more skills here
];

const EDUCATIONS = [
  {
    icon: UCFIcon,
    name: 'University of Central Florida',
    degree: 'Bachelor of Science, Computer Science',
    date: 'May 2026',
    GPA: '3.6',
  },
];

const TAB_DATA = [
  {
    title: 'Skills',
    id: 'skills',
    content: (
      <div className='flex flex-row flex-wrap gap-3 '>
        {SKILLS.map((skill) => (
          <SkillTag key={skill.name} icon={skill.icon} name={skill.name} />
        ))}
      </div>
    ),
  },
  {
    title: 'Education',
    id: 'education',
    content: (
      <div className='flex flex-col gap-3 '>
        {EDUCATIONS.map((education) => (
          <EducationTag
            key={education.name}
            icon={education.icon}
            name={education.name}
            degree={education.degree}
            date={education.date}
            GPA={education.GPA}
          />
        ))}
      </div>
    ),
  },
  {
    title: 'Certifications',
    id: 'certifications',
    content: (
      <ul>
        <li>Coming soon...</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState('skills');
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className=' text-white' id='about'>
      <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
        <Image
          src='/images/about-image6.png'
          width={500}
          height={500}
          alt='about me image'
          className='rounded-2xl'
        />
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
          <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
          <p className='font-mono text-base text-[#ADB7BE] lg:text-lg'>
            I&apos;m a Computer Science major with a passion for bringing ideas
            to life. Developing and designing responsive websites and
            applications that offer engaging user experiences is what I enjoy
            most. As a quick learner, I continually seek to broaden my horizons
            and enhance my skills. Currently, I&apos;m on the lookout for new
            internship opportunities where I can leverage my abilities to make a
            significant impact.
          </p>
          <div className='flex flex-row justify-start mt-8'>
            <TabButton
              selectTab={() => handleTabChange('skills')}
              active={tab === 'skills'}
            >
              {' '}
              Skills{' '}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange('education')}
              active={tab === 'education'}
            >
              {' '}
              Education{' '}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange('certifications')}
              active={tab === 'certifications'}
            >
              {' '}
              Certifications{' '}
            </TabButton>
          </div>
          <div className='mt-8'>
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
