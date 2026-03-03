import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar.jsx';
import Hero from '@/components/sections/Hero.jsx';
import MouseBackground from '@/components/ui/MouseBackground.jsx';
import LoadingScreen from '@/components/ui/LoadingScreen.jsx';

// Lazy loaded components for better First Contentful Paint
const About = lazy(() => import('@/components/sections/About.jsx'));
const Skills = lazy(() => import('@/components/sections/Skills.jsx'));
const Projects = lazy(() => import('@/components/sections/Projects.jsx'));
const Certifications = lazy(() => import('@/components/sections/Certifications.jsx'));
const Contact = lazy(() => import('@/components/sections/Contact.jsx'));

const ScrollReveal = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.92, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px", amount: 0.1 }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Smooth premium curve
      }}
      className="will-change-transform will-change-opacity"
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 selection:bg-white/20 selection:text-white relative overflow-hidden">
      {/* Highest Z-index layer for initial loading */}
      <LoadingScreen />

      {/* Base Layer: WebGL Background (Always full bleed) */}
      <MouseBackground />

      {/* Layer 1: Global Background Mesh (Overlay for grain/mesh texture) */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-mesh opacity-5 mix-blend-screen"></div>

      {/* Layer 10: Content Wrapper centered at 1400px */}
      <div className="relative z-10 mx-auto max-w-[1400px] w-full px-4 md:px-6">
        <Navbar />

        <main className="relative">
          {/* Hero handles its own entrance for immediate impact */}
          <Hero />

          <div className="space-y-32 md:space-y-48">
            <Suspense fallback={<div className="h-[50vh] flex items-center justify-center text-gray-500">Loading Section...</div>}>
              <ScrollReveal>
                <About />
              </ScrollReveal>

              <ScrollReveal>
                <Skills />
              </ScrollReveal>

              <ScrollReveal>
                <Projects />
              </ScrollReveal>

              <ScrollReveal>
                <Certifications />
              </ScrollReveal>

              <ScrollReveal>
                <Contact />
              </ScrollReveal>
            </Suspense>
          </div>
        </main>

        <footer className="relative py-20 border-t border-white/5 bg-gray-950/40 backdrop-blur-2xl rounded-t-[4rem] mt-32 mb-10 overflow-hidden group">
          {/* Decorative Footer Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <div className="container mx-auto px-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              {/* BRAND MARK SECTION */}
              <div className="flex flex-col items-center md:items-start order-2 md:order-1">
                <div
                  className="relative cursor-pointer group/footer-logo"
                  onClick={scrollToTop}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="handwritten text-5xl font-bold text-white group-hover/footer-logo:text-gray-400 transition-colors duration-500">
                      Abijith
                    </span>
                    <span className="mono text-2xl font-black tracking-widest text-gray-500 group-hover/footer-logo:text-white transition-colors duration-500">
                      CG
                    </span>
                  </div>
                  <div className="h-px w-0 group-hover/footer-logo:w-full bg-white transition-all duration-700 mt-1"></div>
                </div>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                  Architecting Software Excellence
                </p>
              </div>

              {/* COPYRIGHT & STATUS SECTION */}
              <div className="text-center order-1 md:order-2">

                <p className="text-xs font-medium text-gray-500 leading-relaxed">
                  © 2025 Crafted with precision by{' '}
                  <span className="text-gray-300">Abijith C G</span>. <br />
                  Powered by <span className="text-gray-300">React</span> &{' '}
                  <span className="text-gray-400">Three.js</span>
                </p>
              </div>

              {/* SOCIAL & CONNECT SECTION */}
              <div className="flex justify-center md:justify-end gap-4 order-3">
                {[
                  {
                    name: 'GitHub',
                    icon: 'fab fa-github',
                    href: 'https://github.com/abimad123'
                  },
                  {
                    name: 'LinkedIn',
                    icon: 'fab fa-linkedin-in',
                    href: 'https://www.linkedin.com/in/abijith-c-g'
                  },
                  { name: 'Figma', icon: 'fab fa-figma', href: '#' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my ${social.name} profile`}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-black hover:bg-white hover:border-white transition-all duration-500 group/social shadow-xl"
                  >
                    <i
                      className={`${social.icon} text-lg group-hover:scale-110 transition-transform`}
                      aria-hidden="true"
                    ></i>
                  </a>
                ))}

                <button
                  onClick={scrollToTop}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-500"
                  aria-label="Back to top"
                >
                  <i className="fas fa-chevron-up"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Background Branding Watermark */}
          <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none select-none">
            <span className="text-[15vw] font-black tracking-tighter text-white">
              ACG
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
