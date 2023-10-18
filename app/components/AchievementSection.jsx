'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Calendar from 'react-github-calendar';



const achievementsList = [
  {
    metric: 'Projects',
    value: '100',
    postfix: '+',
  },
  {
    prefix: '~',
    metric: 'Users',
    value: '100,000',
  },
  {
    metric: 'Awards',
    value: '7',
  },
  {
    metric: 'Years',
    value: '5',
  },
];

const AchievementsSection = () => {
  return (
    <Image
      src='https://ghchart.rshah.org/jcamp50'
      alt="Year's contributions"
      width={900}
      height={100}

    />
  );
};

export default AchievementsSection;
