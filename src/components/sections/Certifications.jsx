import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CERTIFICATIONS } from '../../constants.jsx';

const CertificationCard = ({ cert }) => {
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
      className="w-[320px] md:w-[350px] flex-shrink-0 group perspective-1000 py-10"
    >
      {/* Outer Glow */}
      <div className="absolute -inset-4 bg-white/5 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Card */}
      <div className="relative h-[420px] rounded-[2rem] bg-[#030712]/60 backdrop-blur-xl border border-white/5 group-hover:border-white/30 transition-colors duration-500 overflow-hidden shadow-2xl flex flex-col">
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

        {/* Content Container with translateZ for depth */}
        <div className="relative flex flex-col h-full p-8 preserve-3d">
          {/* Top Section: Issuer Badge */}
          <div className="flex justify-between items-start mb-8 translate-z-20">
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
                {cert.issuer}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">
                ID: {cert.id.slice(0, 6)}
              </span>
            </div>
          </div>

          {/* Visual: Center Icon / Certificate Branding */}
          <div className="flex-1 flex flex-col items-center justify-center mb-8 translate-z-40">
            <div className="relative group-hover:scale-110 transition-transform duration-700">
              {/* Animated rings behind icon */}
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl animate-pulse" />
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-gray-600/20 to-gray-900/40 border border-white/10 flex items-center justify-center shadow-inner relative z-10 overflow-hidden">
                <i className="fas fa-award text-4xl text-gray-200 group-hover:text-white group-hover:rotate-12 transition-all duration-500" />
                {/* Inner shimmer on icon box */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="translate-z-30 text-center">
            <h3 className="text-xl font-black text-white mb-2 leading-tight tracking-tight group-hover:text-gray-300 transition-colors">
              {cert.title}
            </h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-6">
              Issued {cert.date}
            </p>

            <div className="flex flex-wrap justify-center gap-1.5 mb-8">
              {cert.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[8px] font-black text-gray-400 uppercase tracking-widest group-hover:border-white/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Footer: Action - Re-engineered for maximum impact */}
          <div className="mt-auto translate-z-50">
            <a
              href={cert.link}
              target="_blank"
              className="relative flex items-center justify-center gap-3 w-full py-4 rounded-xl overflow-hidden group/btn"
            >
              {/* Button Background & Border */}
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 group-hover/btn:bg-white group-hover/btn:border-white group-hover/btn:shadow-[0_0_25px_rgba(255,255,255,0.2)]" />

              {/* Shimmer Sweep Animation on Hover */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-black/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite]" />

              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 group-hover/btn:text-black transition-colors duration-300">
                Verify Credential
              </span>
              <i className="fas fa-external-link-alt relative z-10 text-[10px] text-gray-400 group-hover/btn:text-black group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* Dynamic Inner Mesh Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  // Triple the data for seamless infinite loop
  const displayCerts = [
    ...CERTIFICATIONS,
    ...CERTIFICATIONS,
    ...CERTIFICATIONS
  ];

  return (
    <section
      id="certifications"
      className="py-32 bg-transparent overflow-hidden relative scroll-mt-24"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[400px] bg-white/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.95]">
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
          <div className="flex items-stretch gap-8 px-4 animate-marquee-refined group-hover/marquee:pause">
            {displayCerts.map((cert, idx) => (
              <CertificationCard key={`${cert.id}-${idx}`} cert={cert} />
            ))}
          </div>
        </div>
      </div>

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
