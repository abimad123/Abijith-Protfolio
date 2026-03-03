import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Refined parallax values for subtler flow
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || window.innerWidth < 1024) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotate({
      x: (y - 0.5) * 10,
      y: (x - 0.5) * -10
    });
    setMousePos({ x: (x - 0.5) * 30, y: (y - 0.5) * 30 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[80vh] py-20 md:py-32 flex items-center overflow-hidden bg-transparent scroll-mt-20 md:scroll-mt-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 right-[-5%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[140px] pointer-events-none"
      />

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] bg-white/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 w-full perspective-2000 hidden lg:block">
            <div
              className="relative aspect-square max-w-[460px] mx-auto transition-transform duration-700 ease-out preserve-3d"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
              }}
            >
              <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-full"></div>
              <div className="absolute inset-6 border-[1px] border-dashed border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>

              <div className="absolute inset-14 rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] group">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  alt="Abijith C G"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
              </div>


            </div>
          </div>

          <div className="lg:col-span-7 w-full text-center lg:text-left">
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 md:mb-10 tracking-tighter leading-tight md:leading-[1.05]">
                Bridging the gap between <br />
                <span className="text-gray-300">Imagination</span> and{' '}
                <span className="text-white/40">Deployment.</span>
              </h2>

              <div className="bg-[#0b101b] rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden mb-10 md:mb-12 shadow-3xl text-left">
                <div className="bg-white/[0.03] px-4 md:px-6 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-500/20 border border-gray-500/30"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-400/20 border border-gray-400/30"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-300/20 border border-gray-300/30"></div>
                  </div>
                  <div className="text-[9px] md:text-[10px] font-mono text-gray-500 tracking-wider">
                    abijith.sh
                  </div>
                </div>
                <div className="p-5 md:p-8 font-mono text-xs md:text-base leading-relaxed">
                  <div className="flex gap-2 mb-3 md:mb-4">
                    <span className="text-gray-400">visitor@abijith:~$</span>
                    <span className="text-white">cat bio.txt</span>
                  </div>
                  <p className="text-gray-300 mb-4 md:mb-6">
                    I am a Computer Science Engineer specializing in building
                    robust, scalable web architectures. I don't just write code;
                    I design systems that solve complex user problems with
                    surgical precision.
                  </p>
                  <p className="text-gray-400 mb-6 md:mb-8">
                    Currently pursuing B.Tech at Lovely Professional University.
                    Focused on React, Node.js, and Cloud infrastructures.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">visitor@abijith:~$</span>
                    <span className="w-2 h-4 md:h-5 bg-white/80 animate-pulse"></span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
                {[
                  {
                    label: 'Built Projects',
                    value: '12+',
                    icon: 'fa-code-merge'
                  },
                  {
                    label: 'GitHub Commits',
                    value: '250+',
                    icon: 'fa-github-alt'
                  },
                  {
                    label: 'Server Uptime',
                    value: '99.9%',
                    icon: 'fa-shield-halved'
                  }
                ].map((stat, i) => (
                  <div key={i} className="group relative">
                    <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter group-hover:text-gray-300 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] drop-shadow-sm">
                      {stat.label}
                    </div>
                    <div className="absolute -bottom-3 left-0 w-0 h-[1px] bg-white/50 lg:group-hover:w-full transition-all duration-700"></div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-10">
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 bg-white rounded-xl md:rounded-2xl text-black font-black text-[10px] md:text-xs uppercase tracking-[0.3em] hover:bg-gray-200 transition-all shadow-xl overflow-hidden w-full sm:w-auto justify-center"
                >
                  Contact Me
                  <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                </a>

                <div className="flex items-center gap-6">
                  <a
                    href="https://github.com/abimad123"
                    target="_blank"
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    <i className="fab fa-github text-xl md:text-2xl"></i>
                  </a>
                  <a
                    href="https://linkedin.com/in/abijith-c-g"
                    target="_blank"
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    <i className="fab fa-linkedin-in text-xl md:text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
