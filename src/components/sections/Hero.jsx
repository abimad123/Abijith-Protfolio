import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = element.id === 'about' ? 80 : 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 overflow-hidden perspective-2000"
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-5 md:opacity-10"
        style={{
          transform: `translate3d(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px, 0)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <span className="text-[60vw] md:text-[40vw] font-black tracking-tighter text-white leading-none">
          ACG
        </span>
      </div>

      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div
          className="absolute top-[20%] left-[10%] animate-float transition-transform duration-300"
          style={{
            transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 100px)`
          }}
        >
          <div className="glass p-4 rounded-2xl border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-white/5 backdrop-blur-md rotate-[-12deg]">
            <i className="fab fa-react text-4xl text-white"></i>
          </div>
        </div>
        <div
          className="absolute bottom-[25%] right-[12%] animate-float-delayed transition-transform duration-300"
          style={{
            transform: `translate3d(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px, 150px)`
          }}
        >
          <div className="glass p-4 rounded-2xl border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-white/5 backdrop-blur-md rotate-[15deg]">
            <i className="fab fa-node-js text-4xl text-white"></i>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">


        <div className="relative mb-8 md:mb-10 group translate-z-50">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[1.25] md:leading-[1.15] inline-block">
            <span className="block animate-fade-in-up [animation-delay:200ms] drop-shadow-[0_0_15px_rgba(0,0,0,8)]">
              Engineering
            </span>
            <span className="block animate-fade-in-up [animation-delay:400ms] bg-clip-text bg-gradient-to-r text-black relative drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] hero-text-glow">
              Experience.
            </span>
          </h1>
        </div>

        <p className="max-w-xl md:max-w-2xl mx-auto text-lg md:text-2xl text-gray-300 mb-10 md:mb-14 leading-relaxed font-medium animate-fade-in-up [animation-delay:600ms] px-4">
          Architecting{' '}
          <span className="text-white font-black border-b-2 border-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            immersive
          </span>{' '}
          digital interfaces and high-performance full-stack systems.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 animate-fade-in-up [animation-delay:800ms] px-4">
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, 'projects')}
            className="group relative w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.25em] transition-all duration-500 hover:scale-105 active:scale-95 border border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 text-black hover:bg-gray-200 hover:border-gray-200"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Projects
              <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform"></i>
            </span>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="bg-black group relative w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 text-white hover:text-black rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.25em] transition-all border border-white/30 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:bg-white hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-3 justify-center"
          >
            <span className="relative z-10 flex items-center gap-3">
              Let's Collaborate
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white text-black group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all">
                <i className="fas fa-plus scale-75"></i>
              </span>
            </span>
          </a>
        </div>

        <div className="mt-20 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 max-w-4xl mx-auto animate-fade-in-up [animation-delay:1000ms] px-4">
          {[
            { value: '8+', label: 'Builds' },
            { value: '3+', label: 'Certs' },
            { value: '100%', label: 'Uptime' },
            { value: '∞', label: 'Curiosity' }
          ].map((stat, i) => (
            <div key={i} className="text-center group/stat">
              <div className="text-2xl md:text-3xl font-black text-white mb-1 group-hover/stat:text-gray-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.35em] drop-shadow-sm group-hover/stat:text-gray-200 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        onClick={(e) => handleScrollTo(e, 'about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-pointer hidden md:flex"
      >
        <div className="w-px h-12 md:h-16 bg-gradient-to-b from-white/60 to-transparent"></div>
      </div>


      <style>
        {`
          .hero-text-glow {
            text-shadow: 0 0 40px rgba(255, 255, 255, 0.4), 0 0 80px rgba(255, 255, 255, 0.1);
          }
          @keyframes textGlow {
            0%, 100% {
              text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1);
            }
            50% {
              text-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.2);
            }
          }
          @keyframes float {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, -20px, 0); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, 20px, 0); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
          .perspective-2000 { perspective: 2000px; }
          .translate-z-50 { transform: translateZ(50px); }
        `}
      </style>
    </section>
  );
};

export default Hero;
