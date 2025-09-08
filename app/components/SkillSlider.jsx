import React from 'react';
import Image from 'next/image';

const SkillSlider = () => {
  const skills = [
    'git-icon.svg',
    'javascript-icon.svg',
    'nextjs-icon.svg',
    'nodejs-icon.svg',
    'python-icon.svg',
    'react-icon.svg',
    'tailwind-css-icon.svg',
    'typescript-icon.svg',
    'mongo-db-48.png',
    'html-logo.svg',
    'css.svg',
    'java.svg',
    'matlab.svg',
    'vercel.svg',
    'c++.svg',
    'firebase.svg',
  ];

  return (
    <div className='relative overflow-hidden w-full h-36 mt-16 group'>
      {/* Blur effect at the left */}
      <div className='absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#2e2e2e] via-[#2e2e2e]/50 to-transparent z-10 pointer-events-none'></div>

      {/* Blur effect at the right */}
      <div className='absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#2e2e2e] via-[#2e2e2e]/50 to-transparent z-10 pointer-events-none'></div>

      {/* Skills slider container */}
      <div className='flex w-[200%] items-center gap-4 animate-scroll group-hover:animate-pause'>
        {skills.concat(skills).map((skill, index) => (
          <div
            key={index}
            className='flex-shrink-0 w-32 h-32 flex items-center justify-center  bg-[#353535] rounded-2xl shadow-lg '
          >
            <Image
              src={`/${skill}`}
              alt={skill.replace('-icon.svg', '')}
              width={80}
              height={80}
              className='object-contain'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSlider;
