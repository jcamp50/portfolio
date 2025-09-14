
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import Navbar from './components/Navbar';

import Footer from './components/Footer';

import ProjectSection from './components/ProjectSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <main
      className='min-h-screen bg-[#ffffff] [background-image:radial-gradient(circle,rgba(0,0,0,0.04)_2px,transparent_1px)]
                 [background-size:20px_20px]'
    >
      {/* <Navbar /> */}
      <div className='w-full flex flex-col gap-20 mt-24 px-12'>
        <HeroSection />
        <ExperienceSection />
        <ProjectSection/>
        <ContactSection />

        {/* <ActivitySection /> */}
        {/* <AboutSection /> */}
        {/* <EmailSection /> */}
      </div>
      {/* <Footer /> */}
    </main>
  );
}
