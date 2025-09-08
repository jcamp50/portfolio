import Image from 'next/image';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ProjectSection from './components/ProjectSection';
import EmailSection from './components/EmailSection';
import Footer from './components/Footer';
import ActivitySection from './components/ActivitySection';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col bg-[#ffffff]'>
      {/* <Navbar /> */}
      <div className='w-full mt-24 px-12'>
        <HeroSection />

        {/* <ActivitySection /> */}
        {/* <AboutSection /> */}
        {/* <ProjectSection /> */}
        {/* <EmailSection /> */}
      </div>
      {/* <Footer /> */}
    </main>
  );
}
