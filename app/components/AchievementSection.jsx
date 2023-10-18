'use client';
import React from 'react';
import GithubContributions from './GithubContributions';
import LinkedInFeed from './LinkedInFeed';
import Slider from 'react-slick';

const AchievementSection = () => {
  const settings = {
    dots: true, // enable dot indicators
    infinite: true, // infinite looping
    speed: 500, // slide transition speed
    slidesToShow: 1, // number of slides to show at once
    slidesToScroll: 1, // number of slides to scroll at once
  };

  return (
    <section id='activity'>
      <Slider {...settings}>
        <div>
          <GithubContributions />
        </div>
        <div>
          <LinkedInFeed />
        </div>
      </Slider>
    </section>
  );
};

export default AchievementSection;
