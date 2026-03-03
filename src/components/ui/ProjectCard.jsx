import React, { useState, useRef } from 'react';

const ProjectCard = ({ project }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Calculate rotation
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 12; // Adjusted for slightly more subtle tilt
    const rotateY = (x - centerX) / 12;

    setRotate({ x: rotateX, y: rotateY });

    // Calculate glow position
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    setGlowPos({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className="group relative h-full perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer Ambient Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-purple-600/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* Main Card Body */}
      <div
        className="relative h-full bg-gray-950/40 rounded-[2rem] border border-gray-800/50 overflow-hidden flex flex-col transition-all duration-300 ease-out preserve-3d"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          boxShadow: `0 20px 40px -10px rgba(0, 0, 0, 0.5)`
        }}
      >
        {/* Dynamic Inner Glow/Shine */}
        <div
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.06) 0%, transparent 50%)`
          }}
        />

        {/* Visual Container (Compact Image) */}
        <div className="relative aspect-[16/9] overflow-hidden translate-z-10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out translate-z-[-10px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent opacity-90" />

          {/* Tags - Smaller for density */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 translate-z-40">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[8px] font-black uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/5 shadow-lg"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute bottom-4 right-4 translate-z-50 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-black shadow-xl hover:bg-blue-600 hover:text-white transition-colors">
              <i className="fas fa-arrow-up-right-from-square text-sm"></i>
            </div>
          </div>
        </div>

        {/* Content Area - Tighter Padding */}
        <div className="p-6 md:p-7 flex flex-col flex-1 translate-z-30">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-blue-400 transition-colors duration-500 tracking-tight leading-tight">
              {project.title}
            </h3>
            <span className="text-blue-500/10 text-3xl font-black select-none group-hover:text-blue-500/30 transition-colors">
              /
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
            {project.description}
          </p>

          {/* Impact Highlight - More compact */}
          {project.caseStudy && (
            <div className="relative mt-auto p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:border-blue-500/20 transition-all duration-500 translate-z-20 overflow-hidden">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-700"></div>
              <h4 className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">
                Impact
              </h4>
              <p className="text-[12px] text-gray-500 italic leading-snug group-hover:text-gray-300 transition-colors">
                {project.caseStudy}
              </p>
            </div>
          )}

          {/* Bottom Controls - Tighter spacing */}
          <div className="mt-6 pt-5 border-t border-gray-800/50 flex items-center justify-between">
            <div className="flex gap-3 translate-z-50">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <i className="fab fa-github text-lg"></i>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <i className="fas fa-link text-sm"></i>
                </a>
              )}
            </div>
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-gray-600 group-hover:text-blue-500 transition-colors">
              Case Study{' '}
              <i className="fas fa-plus scale-75 group-hover:rotate-90 transition-transform duration-500"></i>
            </div>
          </div>
        </div>

        <div className="absolute -inset-full h-full w-1/2 z-40 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:animate-[shimmer_2.5s_infinite] pointer-events-none" />
      </div>
    </div>
  );
};

export default ProjectCard;
