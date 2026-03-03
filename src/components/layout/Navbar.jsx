import React from 'react';
import { motion } from 'framer-motion';
import { FloatingDock } from '../ui/floating-dock.jsx';

const SignatureLogo = () => {
  const name = 'Abijith';
  const surname = 'CG';

  // Fixed: Explicitly typed as Variants and cast ease strings to any to resolve Type 'string' is not assignable to type 'Easing'
  const letterVariants = {
    initial: { opacity: 0, y: 10, rotate: -10 },
    animate: (i) => ({
      opacity: 1,
      y: [0, -4, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 },
        rotate: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.1
        },
        opacity: { duration: 0.5, delay: i * 0.05 }
      }
    }),
    hover: {
      y: -8,
      scale: 1.1,
      rotate: 0,
      color: '#ffffff',
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };

  // Fixed: Explicitly typed as Variants and cast ease strings to any to resolve Type 'string' is not assignable to type 'Easing'
  const surnameVariants = {
    initial: { opacity: 0, y: 10, rotate: 10 },
    animate: (i) => ({
      opacity: 1,
      y: [0, -3, 0],
      rotate: [0, -1, 1, 0],
      transition: {
        y: {
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5 + i * 0.1
        },
        rotate: {
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5 + i * 0.1
        },
        opacity: { duration: 0.5, delay: 0.4 + i * 0.05 }
      }
    }),
    hover: {
      y: -6,
      scale: 1.05,
      rotate: 2,
      color: '#ffffff',
      transition: { type: 'spring', stiffness: 400, damping: 15 }
    }
  };

  return (
    <motion.a
      href="#"
      className="pointer-events-auto group relative flex flex-col items-start"
      initial="initial"
      whileHover="hover"
    >
      <div className="flex items-baseline gap-1 md:gap-2">
        <div className="flex">
          {name.split('').map((char, i) => (
            <motion.span
              key={`name-${i}`}
              custom={i}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="handwritten text-2xl md:text-4xl lg:text-5xl font-bold text-white cursor-pointer select-none"
            >
              {char}
            </motion.span>
          ))}
        </div>
        <div className="flex">
          {surname.split('').map((char, i) => (
            <motion.span
              key={`surname-${i}`}
              custom={i}
              variants={surnameVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="handwritten text-2xl md:text-4xl lg:text-5xl font-light text-gray-400/80 cursor-pointer select-none"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="relative w-full h-1.5 mt-[-4px] md:mt-[-6px]">
        <svg
          width="100%"
          height="8"
          viewBox="0 0 200 10"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M5 5 Q 50 2, 100 5 T 195 5"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-gray-500/50 group-hover:text-white transition-colors"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              d: [
                'M5 5 Q 50 2, 100 5 T 195 5',
                'M5 5 Q 50 8, 100 5 T 195 5',
                'M5 5 Q 50 2, 100 5 T 195 5'
              ]
            }}
            transition={{
              pathLength: { duration: 1.5, delay: 1 },
              opacity: { duration: 0.5, delay: 1 },
              d: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        </svg>
      </div>
    </motion.a>
  );
};

const Navbar = () => {
  const links = [
    { title: 'Home', icon: <i className="fas fa-home"></i>, href: '#' },
    { title: 'About', icon: <i className="fas fa-user"></i>, href: '#about' },
    { title: 'Skills', icon: <i className="fas fa-bolt"></i>, href: '#skills' },
    {
      title: 'Projects',
      icon: <i className="fas fa-code"></i>,
      href: '#projects'
    },
    {
      title: 'Credentials',
      icon: <i className="fas fa-certificate"></i>,
      href: '#certifications'
    },
    {
      title: 'Contact',
      icon: <i className="fas fa-envelope"></i>,
      href: '#contact'
    },
    {
      title: 'GitHub',
      icon: <i className="fab fa-github"></i>,
      href: 'https://github.com/abimad123'
    }
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[40] py-4 md:py-6 px-4 md:px-10 pointer-events-none">
        <div className="max-w-[1500px] mx-auto flex justify-start items-center">
          <SignatureLogo />
        </div>
      </div>

      <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-fit px-4">
        <FloatingDock items={links} />
      </div>
    </>
  );
};

export default Navbar;
