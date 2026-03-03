import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: (centerY - y) / 20,
      y: (x - centerX) / 20
    });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  // Fixed: Explicitly typed as Variants to avoid inference issues with motion props
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // Fixed: Explicitly typed as Variants and cast ease to any to resolve string literal mismatch
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 relative overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 md:mb-24"
          >

            <h2 className="text-5xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-none">
              Let's{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Sync.
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Ready to turn your vision into high-performance reality. Reach out
              via the form or my social channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <motion.div
              variants={itemVariants}
              ref={cardRef}
              className="lg:col-span-5 perspective-2000 group/card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="h-full glass rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 border-white/5 relative overflow-hidden transition-all duration-700 ease-out preserve-3d shadow-2xl flex flex-col"
                style={{
                  transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
                }}
              >


                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-10 md:mb-12 tracking-tight">
                    Connection <br />
                    <span className="text-gray-400">Details.</span>
                  </h3>

                  <div className="space-y-6 md:space-y-8">
                    {[
                      {
                        icon: 'fa-envelope',
                        label: 'Inbound Mail',
                        value: 'abijithcg@example.com',
                        link: 'mailto:abijithcg@example.com'
                      },
                      {
                        icon: 'fa-linkedin-in',
                        label: 'Network',
                        value: 'abijith-c-g',
                        link: 'https://linkedin.com/in/abijith-c-g'
                      },
                      {
                        icon: 'fa-location-crosshairs',
                        label: 'Current Node',
                        value: 'Punjab, India',
                        link: '#'
                      }
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.link}
                        className="flex items-center gap-4 md:gap-6 group/item hover:translate-x-2 transition-transform duration-500"
                      >
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-900/50 border border-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-gray-500 group-hover/item:bg-white group-hover/item:text-black transition-all">
                          <i
                            className={`fas ${item.icon} text-lg md:text-xl`}
                          ></i>
                        </div>
                        <div>
                          <p className="text-[9px] md:text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-1">
                            {' '}
                            {item.label}
                          </p>
                          <p className="text-white font-black text-base md:text-lg tracking-tight truncate max-w-[200px] md:max-w-none">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-12 md:mt-auto pt-10 flex items-center justify-between">
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/abimad123"
                      target="_blank"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"
                    >
                      <i className="fab fa-github text-xl"></i>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"
                    >
                      <i className="fab fa-figma text-xl"></i>
                    </a>
                  </div>

                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-7">
              <div className="glass rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-14 border-white/5 relative overflow-hidden h-full shadow-2xl">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 md:space-y-10 relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    <div className="group/input relative">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4 block">
                        Identity
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          placeholder="Your Name"
                          className="w-full bg-gray-900/40 border border-white/5 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-white focus:outline-none transition-all placeholder:text-gray-700 font-bold tracking-tight z-10 relative"
                        />

                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-gray-400 to-white opacity-0 group-focus-within/input:opacity-100 blur-[2px] transition-opacity -z-0"></div>
                        <div className="absolute inset-[1px] rounded-xl md:rounded-2xl bg-[#030712] -z-0"></div>
                      </div>
                    </div>

                    <div className="group/input relative">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4 block">
                        Email Channel
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              email: e.target.value
                            })
                          }
                          placeholder="name@domain.com"
                          className="w-full bg-gray-900/40 border border-white/5 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-white focus:outline-none transition-all placeholder:text-gray-700 font-bold tracking-tight z-10 relative"
                        />

                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-gray-400 to-white opacity-0 group-focus-within/input:opacity-100 blur-[2px] transition-opacity -z-0"></div>
                        <div className="absolute inset-[1px] rounded-xl md:rounded-2xl bg-[#030712] -z-0"></div>
                      </div>
                    </div>
                  </div>

                  <div className="group/input relative">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4 block">
                      Message Payload
                    </label>
                    <div className="relative">
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value
                          })
                        }
                        placeholder="Detail your requirements here..."
                        className="w-full bg-gray-900/40 border border-white/5 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-white focus:outline-none transition-all placeholder:text-gray-700 font-bold tracking-tight resize-none z-10 relative"
                      ></textarea>
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-gray-400 to-white opacity-0 group-focus-within/input:opacity-100 blur-[2px] transition-opacity -z-0"></div>
                      <div className="absolute inset-[1px] rounded-xl md:rounded-2xl bg-[#030712] -z-0"></div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group/btn relative w-full inline-flex items-center justify-center px-8 md:px-10 py-5 md:py-6 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] transition-all duration-500 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 overflow-hidden rounded-xl md:rounded-2xl hover:rounded-[3rem]"
                  >
                    <div className="absolute inset-0 bg-white transition-all duration-500 group-hover/btn:bg-gray-300 rounded-xl md:rounded-2xl group-hover/btn:rounded-[3rem]"></div>
                    <div className="absolute inset-0 bg-white/60 blur-2xl opacity-0 group-hover/btn:opacity-100 transition-all duration-500 rounded-full"></div>

                    <AnimatePresence mode="wait">
                      {status === 'loading' ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="relative z-10 flex items-center gap-4 text-black"
                        >
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                          Processing...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="relative z-10 flex items-center gap-4 text-black"
                        >
                          Submit
                          <i className="fas fa-paper-plane group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"></i>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 md:p-6 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl md:rounded-2xl text-center text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4"
                      >
                        <i className="fas fa-check-double text-lg"></i>
                        Transmission successful.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
