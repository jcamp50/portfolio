'use client';
import React, { useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import ProjectTag from './ProjectTag';
import { motion, useInView } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: 'React Portfolio Website',
    description: 'My personal portfolio website',
    image: '/images/projects/1.png',
    tag: ['All', 'Web'],
    gitUrl: 'https://github.com/jcamp50/portfolio',
    previewUrl: 'https://www.jordancampbell.me/',
  },
  {
    id: 2,
    title: 'FPL Prediction Web-App',
    description: 'ShellHacks 2023 Team Project',
    image: '/images/projects/2.png',
    tag: ['All', 'Web'],
    gitUrl: 'https://github.com/jcamp50/fpl-app',
    previewUrl: 'https://fpl-app-rho.vercel.app/',
  },
  {
    id: 3,
    title: 'Connect 4 Game Clone',
    description: 'My first React project',
    image: '/images/projects/3.png',
    tag: ['All', 'Web'],
    gitUrl: 'https://github.com/jcamp50/connect4',
    previewUrl: 'https://connect4-three-ruddy.vercel.app/',
  },
  {
    id: 4,
    title: 'Rogue Knight',
    description: 'KnightHacks 2023 Team Project',
    image: '/images/projects/4.png',
    tag: ['All', 'Game'],
    gitUrl: 'https://github.com/jcamp50/Roguelike',
    previewUrl: 'https://youtu.be/6BlmIkB09F8',
  },
];

const ProjectSection = () => {
  const [tag, setTag] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id='projects'>
      <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12'>
        My Projects
      </h2>
      <div className='font-mono text-white flex flex-row justify-center items-center gap-2 py-6'>
        <ProjectTag
          onClick={handleTagChange}
          name='All'
          isSelected={tag === 'All'}
        />
        <ProjectTag
          onClick={handleTagChange}
          name='Web'
          isSelected={tag === 'Web'}
        />
        <ProjectTag
          onClick={handleTagChange}
          name='Game'
          isSelected={tag === 'Game'}
        />
      </div>
      <ul
        ref={ref}
        className='font-mono grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12'
      >
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial='initial'
            animate={isInView ? 'animate' : 'initial'}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectSection;
