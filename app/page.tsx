import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import Navbar from './components/Navbar';

import Footer from './components/Footer';

import ProjectSection from './components/ProjectSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <main
      className='min-h-screen bg-[#ffffff] [background-image:radial-gradient(circle,rgba(0,0,0,0.03)_2px,transparent_1px)]
                [background-size:30px_30px]'
    >
      <Navbar />
      <div className='w-full flex flex-col gap-20 px-5 sm:px-6 md:px-12'>
        <HeroSection />
        <ExperienceSection />
        {/* Projects: flat-white island + seamless fades, no extra space */}
        <section className='relative -mx-5 sm:-mx-6 md:-mx-12 overflow-x-clip'>
          {/* 1) Flat white underlay just for the project block */}
          <div className='absolute inset-0 bg-white z-0' aria-hidden />

          {/* 2) Fade IN to white (overlap previous dotted bg) */}
          <div
            className='pointer-events-none absolute inset-x-0 -top-16 h-16
                        bg-gradient-to-b from-white/30 to-white z-10'
            aria-hidden
          />

          {/* 3) The actual project content sits above the white underlay */}
          <div className='relative z-20 px-5 sm:px-6 md:px-12'>
            <ProjectSection />
          </div>

          {/* 4) Fade OUT back to dots (overlap next dotted bg) */}
          <div
            className='pointer-events-none absolute inset-x-0 -bottom-16 h-16
                        bg-gradient-to-t from-white/30 to-white z-10'
            aria-hidden
          />
        </section>
        <ContactSection />

        {/* <ActivitySection /> */}
        {/* <AboutSection /> */}
        {/* <EmailSection /> */}
      </div>
      <Footer />
    </main>
  );
}
