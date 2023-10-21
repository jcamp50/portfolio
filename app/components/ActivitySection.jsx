'use client';
import React from 'react';
import GithubContributions from './GithubContributions';
import LinkedInFeed from './LinkedInFeed';
import Slider from 'react-slick';

const ActivitySection = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // update active slide index after slide change
  };

  return (
    <section id='activity'>
      <h2 className='flex text-4xl font-bold justify-center mt-10 text-white mb-6'>
        Activity
      </h2>
      <div className='font-mono'>
        <Slider {...settings}>
          <div>
            <GithubContributions />
          </div>
          <div>
            <LinkedInFeed />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default ActivitySection;
