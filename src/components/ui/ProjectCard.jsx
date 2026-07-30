import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const LiveButton = ({ href }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[11px] font-bold tracking-wider uppercase text-gray-900 shadow-[0_4px_20px_rgba(255,255,255,0.12)] hover:bg-amber-300 hover:shadow-[0_4px_24px_rgba(251,191,36,0.28)] transition-colors duration-200"
    >
      <span>Live Demo</span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.a>
  );
};

const GithubButton = ({ href }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 border border-white/15 text-[11px] font-semibold tracking-wider uppercase text-white/70 hover:bg-white/15 hover:text-white hover:border-white/25 transition-all duration-200"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
      <span>GitHub</span>
    </motion.a>
  );
};

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 28 };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    springConfig
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
      style={{ perspective: '1100px' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-md border border-white/10 transition-shadow duration-700 group-hover:shadow-[0_28px_56px_-14px_rgba(0,0,0,0.6)]"
      >
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(500px circle at 50% 30%, rgba(255,255,255,0.03), transparent 65%)',
          }}
        />

        {project.featured && (
          <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-full">
            <span className="w-[5px] h-[5px] rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[8.5px] font-semibold tracking-[0.2em] uppercase text-amber-300">
              Featured
            </span>
          </div>
        )}

        <div className="relative aspect-[16/9] overflow-hidden shrink-0">
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            initial={{ scale: 1.0 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/20 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col flex-1 px-6 pt-5 pb-6 gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-[1.1rem] font-bold text-white leading-snug tracking-tight">
              {project.title}
            </h3>
            <p className="text-[12.5px] text-gray-400 leading-[1.75] line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-gray-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.caseStudy && (
            <div className="flex gap-3 items-start">
              <div className="shrink-0 w-px self-stretch bg-gradient-to-b from-white/25 via-white/10 to-transparent mt-0.5" />
              <p className="text-[11.5px] text-gray-500 italic leading-[1.7] group-hover:text-gray-300 transition-colors duration-500">
                {project.caseStudy}
              </p>
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center gap-3 flex-wrap">
            {project.live && <LiveButton href={project.live} />}
            {project.github && <GithubButton href={project.github} />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
