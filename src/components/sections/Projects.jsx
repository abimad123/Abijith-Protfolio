import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../constants.jsx';
import ProjectCard from '../ui/ProjectCard.jsx';

const Projects = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      className="w-screen relative left-1/2 -translate-x-1/2 py-16 md:py-24 lg:py-32 bg-transparent scroll-mt-20 md:scroll-mt-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] w-full px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-6 lg:gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-wide leading-[0.95]">
              Crafting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                Digital Excellence.
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-md lg:max-w-none">
              A curated showcase of high-performance digital solutions across multiple industries.
            </p>
          </div>

          <div className="flex flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => scroll('left')}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-gray-700 hover:border-white text-white hover:bg-white/5'
                    : 'border-gray-900 text-gray-700 cursor-not-allowed opacity-50'
                }`}
                disabled={!canScrollLeft}
              >
                <i className="fas fa-arrow-left text-xs sm:text-sm"></i>
              </button>
              <button
                onClick={() => scroll('right')}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'border-gray-700 hover:border-white text-white hover:bg-white/5'
                    : 'border-gray-900 text-gray-700 cursor-not-allowed opacity-50'
                }`}
                disabled={!canScrollRight}
              >
                <i className="fas fa-arrow-right text-xs sm:text-sm"></i>
              </button>
            </div>

            <a
              href="https://github.com/abimad123"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 sm:gap-3 py-2.5 sm:py-3.5 px-4 sm:px-7 rounded-xl border border-gray-800 hover:border-gray-400 transition-all bg-gray-950/50 backdrop-blur text-xs sm:text-sm font-bold text-gray-400 hover:text-white whitespace-nowrap"
            >
              View GitHub
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform text-[9px] sm:text-[10px]"></i>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden mt-6 md:mt-10">
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-16 md:w-32 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-16 md:w-32 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto w-full gap-4 md:gap-6 pt-6 pb-12 md:pb-16 px-4 sm:px-8 md:px-[60px] lg:px-[100px] no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              className="flex-none w-[85vw] sm:w-[340px] md:w-[380px] snap-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

