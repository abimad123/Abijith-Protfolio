import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion';
import { cn } from '../../lib/utils';

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
      setOpen(false);
    }
  };

  return (
    <div className={cn('relative block md:hidden', className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 border border-gray-800 shadow-2xl text-white hover:bg-white hover:text-black transition-all"
      >
        <i
          className={`fas ${open ? 'fa-times' : 'fa-bars-staggered'} text-xl`}
        ></i>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 top-full mt-4 flex flex-col gap-3 items-center md:items-end pr-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { delay: idx * 0.05 }
                }}
                transition={{ delay: idx * 0.05 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="flex h-12 w-fit items-center gap-3 rounded-full bg-gray-900 border border-gray-800 shadow-xl px-4 hover:bg-white hover:border-white transition-colors group"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black ml-1 whitespace-nowrap">
                    {item.title}
                  </span>
                  <div className="h-6 w-6 text-gray-400 flex items-center justify-center group-hover:text-black transition-colors shrink-0">
                    {item.icon}
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto hidden h-16 items-center gap-4 rounded-2xl bg-gray-950/80 backdrop-blur-xl border border-gray-800/50 px-4 md:flex shadow-2xl',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          title={item.title}
          icon={item.icon}
          href={item.href}
        />
      ))}
    </motion.div>
  );
};

// Fixed: Defined IconContainerProps interface with optional key to explicitly type props and resolve TypeScript's JSX property validation issues

// Fixed: Using the interface and refined MotionValue type to fix parameter mismatch and property errors
function IconContainer({ mouseX, title, icon, href }) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });

  const [hovered, setHovered] = useState(false);

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <a href={href} onClick={(e) => handleLinkClick(e, href)}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-900 border border-gray-800 hover:bg-white hover:border-white transition-colors group"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -2, x: '-50%' }}
              className="absolute top-full mt-3 left-1/2 w-fit rounded-lg border border-white/20 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest whitespace-pre text-black shadow-xl z-50 pointer-events-none"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-gray-400 group-hover:text-black transition-colors"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
