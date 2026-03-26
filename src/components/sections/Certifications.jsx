import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { CERTIFICATIONS } from '../../constants.jsx';

const CertificationCard = ({ cert, onSelect }) => {
  const cardRef = useRef(null);

  // Motion values for smooth 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 100,
    damping: 15
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    stiffness: 100,
    damping: 15
  });

  // Glare effect positioning
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), {
    stiffness: 100,
    damping: 15
  });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), {
    stiffness: 100,
    damping: 15
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className="w-[340px] md:w-[400px] flex-shrink-0 group perspective-1000 py-6"
    >
      {/* Outer Glow */}
      <div className="absolute -inset-4 bg-white/5 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Card */}
      <div className="relative h-[500px] rounded-[2rem] bg-[#030712]/60 backdrop-blur-xl border border-white/5 group-hover:border-white/30 transition-colors duration-500 overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Holographic Glare Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            )
          }}
        />

        {/* Dynamic Inner Mesh Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Content Container with translateZ for depth */}
        <div className="relative flex flex-col h-full p-6 md:p-8 preserve-3d">

          {/* Preview Image */}
          <div
            className="w-full h-[180px] rounded-2xl border border-white/10 mb-5 overflow-hidden cursor-pointer relative"
            onClick={() => onSelect(cert)}
          >
            <img
              src={cert.image}
              alt={cert.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1523289217630-0dd16184af8b?w=400&h=250&fit=crop";
              }}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                <i className="fas fa-search-plus"></i> View Certificate
              </span>
            </div>
          </div>

          {/* 2. Content Info */}
          <div className="flex-1 flex flex-col translate-z-30 h-full">
            <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight group-hover:text-yellow-500 transition-colors mb-1 pr-6 truncate">
              {cert.title}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                {cert.issuer}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-700"></span>
              <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">
                {cert.date}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-2 mt-2">
              {cert.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[8px] font-bold text-gray-400 uppercase tracking-wider group-hover:border-white/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Footer: Verify Button (Fixed Bottom) */}
          <div className="mt-auto pt-4 translate-z-40 w-full shrink-0 relative pointer-events-auto z-10">
            <a
              href={cert.link}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="relative flex items-center justify-center gap-3 w-full py-3.5 rounded-xl overflow-hidden group/btn bg-white/5 border border-white/10 hover:bg-white hover:border-white transition-all duration-300 pointer-events-auto"
            >
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover/btn:text-black transition-colors duration-300">
                Verify Credential
              </span>
              <i className="fas fa-external-link-alt relative z-10 text-[10px] text-gray-400 group-hover/btn:text-black group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  // Triple the data for seamless infinite loop
  const displayCerts = [
    ...CERTIFICATIONS,
    ...CERTIFICATIONS,
    ...CERTIFICATIONS
  ];

  return (
    <section
      id="certifications"
      className="w-screen relative left-1/2 -translate-x-1/2 py-32 bg-transparent overflow-hidden scroll-mt-24"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[400px] bg-white/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] w-full px-4 md:px-6 mb-16 relative z-10">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-wide leading-[0.95]">
            Milestones{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">
              &
            </span>{' '}
            Creds.
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl">
            Validating technical expertise through recognized industry standards
            and specialized certifications.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        {/* Advanced Row Masking */}
        <div className="mask-edges-wide overflow-hidden group/marquee">
          <div className="flex items-stretch gap-6 md:gap-8 px-4 animate-marquee-refined group-hover/marquee:pause">
            {displayCerts.map((cert, idx) => (
              <CertificationCard key={`${cert.id}-${idx}`} cert={cert} onSelect={setSelectedCert} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-12"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedCert(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl max-h-full bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
                <h3 className="text-sm md:text-base font-bold text-white">{selectedCert.title}</h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Image Preview Container */}
              <div className="relative flex-1 bg-black/50 overflow-auto flex items-center justify-center p-4 min-h-[40vh] md:min-h-[60vh]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1523289217630-0dd16184af8b?w=800&h=600&fit=crop'; }}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Footer / Verify Action */}
              <div className="p-4 bg-black/50 border-t border-white/10 flex justify-end">
                <a
                  href={selectedCert.link}
                  target="_blank"
                  className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  Verify Credential <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @keyframes marquee-refined {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-marquee-refined {
            display: flex;
            width: max-content;
            animation: marquee-refined 60s linear infinite;
          }
          .pause {
            animation-play-state: paused;
          }
          .mask-edges-wide {
            mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          }
          .translate-z-20 { transform: translateZ(20px); }
          .translate-z-30 { transform: translateZ(30px); }
          .translate-z-40 { transform: translateZ(40px); }
          .translate-z-50 { transform: translateZ(50px); }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
          }
        `}
      </style>
    </section>
  );
};

export default Certifications;
