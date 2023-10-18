'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import GitHubButton from 'react-github-btn';

let username = 'jcamp50';

const AchievementsSection = () => {
  return (
    <section className='py-8'>
      <div className=''>
        <h2 className='text-4xl font-bold text-white mb-4'>Activity</h2>
        <GitHubButton
          href={`https://github.com/${username}`}
          data-color-scheme='no-preference: light; light: light; dark: dark;'
          data-icon='octicon-icon'
          data-size='large'
          data-show-count='false'
          aria-label="View jcamp50's profile on GitHub"
        >
          jcamp50
        </GitHubButton>
      </div>
      <div className='overflow-x-auto'>
        <GitHubCalendar username={username} fontSize={16} />
      </div>
    </section>
  );
};

export default AchievementsSection;
