import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      className="py-20 md:py-32 bg-transparent scroll-mt-20 md:scroll-mt-24 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 gap-8 text-center lg:text-left">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none whitespace-nowrap">
              Crafting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                Digital Excellence.
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-none mx-auto lg:mx-0 whitespace-nowrap">
              A curated showcase of high-performance digital solutions across multiple industries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Scroll Navigation Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll('left')}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-gray-700 hover:border-white text-white hover:bg-white/5'
                    : 'border-gray-900 text-gray-700 cursor-not-allowed opacity-50'
                }`}
                disabled={!canScrollLeft}
              >
                <i className="fas fa-arrow-left text-sm"></i>
              </button>
              <button
                onClick={() => scroll('right')}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'border-gray-700 hover:border-white text-white hover:bg-white/5'
                    : 'border-gray-900 text-gray-700 cursor-not-allowed opacity-50'
                }`}
                disabled={!canScrollRight}
              >
                <i className="fas fa-arrow-right text-sm"></i>
              </button>
            </div>

            <a
              href="https://github.com/abimad123"
              target="_blank"
              className="group flex items-center gap-3 py-3.5 px-7 rounded-xl border border-gray-800 hover:border-gray-400 transition-all bg-gray-950/50 backdrop-blur text-sm font-bold text-gray-400 hover:text-white"
            >
              View GitHub
              <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform text-[10px]"></i>
              </div>
            </a>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 md:gap-6 pb-12 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              className="flex-none w-[280px] sm:w-[320px] md:w-[360px] snap-center"
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
