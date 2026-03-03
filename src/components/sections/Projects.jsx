import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../constants.jsx';
import ProjectCard from '../ui/ProjectCard.jsx';

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-transparent scroll-mt-20 md:scroll-mt-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 gap-8 text-center lg:text-left">
          <div className="max-w-2xl">

            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
              Crafting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                Digital
              </span>{' '}
              Excellence.
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Showcasing the intersection of robust engineering and creative
              product design.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/abimad123"
              target="_blank"
              className="group flex items-center gap-3 py-3 px-6 rounded-xl border border-gray-800 hover:border-gray-400 transition-all bg-gray-950/50 backdrop-blur text-sm font-bold text-gray-400 hover:text-white"
            >
              View GitHub
              <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform text-[10px]"></i>
              </div>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
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
