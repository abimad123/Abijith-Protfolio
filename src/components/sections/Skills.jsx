import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SKILLS } from '../../constants.jsx';

const SkillCard = ({ cat, idx }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;

    x.set(mouseXVal / width - 0.5);
    y.set(mouseYVal / height - 0.5);
    mouseX.set(mouseXVal);
    mouseY.set(mouseYVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const isFeatured = idx === 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: window.innerWidth >= 1024 ? rotateX : 0,
        rotateY: window.innerWidth >= 1024 ? rotateY : 0,
        transformStyle: 'preserve-3d'
      }}
      className={`relative perspective-1000 group p-[1px] rounded-3xl md:rounded-[2rem] transition-all duration-700 h-full will-change-transform will-change-opacity`}
      initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`absolute inset-0 rounded-3xl md:rounded-[2rem] ${isFeatured ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-black' : 'bg-white/5 lg:group-hover:bg-white/10'} transition-all duration-500 opacity-20 lg:group-hover:opacity-100`}
      />

      <div
        className={`relative h-full w-full rounded-3xl md:rounded-[1.95rem] p-6 flex flex-col overflow-hidden bg-[#030712]/80 backdrop-blur-3xl border border-white/5`}
      >
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${isFeatured ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-gray-900 border border-gray-800 text-gray-400'}`}
          >
            <i className={`fas ${cat.icon} text-lg`}></i>
          </div>
          {isFeatured && (
            <span className="text-[8px] font-black uppercase tracking-[0.1em] px-2 py-0.5 bg-white/20 text-white rounded-full border border-white/20">
              CORE
            </span>
          )}
        </div>

        <h3 className="text-lg font-black text-white mb-6 tracking-tight group-hover:text-gray-300 transition-colors leading-tight">
          {cat.title}
        </h3>

        <div className="space-y-4">
          {cat.skills.map((skill, sIdx) => (
            <div key={skill} className="group/skill">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] md:text-xs font-bold text-gray-500 group-hover/skill:text-white transition-colors truncate pr-2">
                  {skill}
                </span>
                <div className="flex gap-0.5 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${i < 5 - (sIdx % 2) ? 'bg-white shadow-[0_0_5px_#ffffff]' : 'bg-gray-800'} transition-all`}
                    />
                  ))}
                </div>
              </div>
              <div className="h-[1px] w-full bg-gray-900 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${70 + Math.random() * 30}%` }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-400 to-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 md:py-24 bg-transparent relative overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-5 max-w-full mx-auto items-stretch">
          {SKILLS.map((cat, idx) => (
            <SkillCard key={idx} cat={cat} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
