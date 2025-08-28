"use client";
import { cn } from "../../lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({ items }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();
      if (current < 0.05) setVisible(true);
      else setVisible(direction < 0);
    }
  });

  return (
    <>
      <FloatingNavbarDesktop items={items} visible={visible} />
      <FloatingNavbarMobile items={items} visible={visible} />
    </>
  );
};

const FloatingNavbarMobile = ({ items, visible }) => {
  const [open, setOpen] = useState(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 right-6 md:hidden z-50 flex flex-col items-end"
        >
          {open && (
            <motion.div
              layoutId="mobile-nav"
              className="mb-2 flex flex-col gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {items.map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 shadow-lg hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="h-6 w-6 text-white">{item.icon}</div>
                </motion.a>
              ))}
            </motion.div>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 shadow-lg hover:scale-110 transition-transform"
          >
            <IconLayoutNavbarCollapse className="h-6 w-6 text-white" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FloatingNavbarDesktop = ({ items, visible }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2 }}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="fixed top-6 left-1/2 z-50 hidden md:flex -translate-x-1/2 items-center gap-4 rounded-2xl bg-neutral-900 px-6 py-3 shadow-xl backdrop-blur-md bg-opacity-90"
        >
          {items.map((item) => (
            <NavbarIcon key={item.title} mouseX={mouseX} {...item} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NavbarIcon = ({ mouseX, title, icon, href }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(useTransform(distance, [-150, 0, 150], [50, 80, 50]), { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(useTransform(distance, [-150, 0, 150], [50, 80, 50]), { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(useTransform(distance, [-150, 0, 150], [24, 40, 24]));
  const heightIcon = useSpring(useTransform(distance, [-150, 0, 150], [24, 40, 24]));

  return (
    <a href={href} className="relative">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center justify-center rounded-full bg-neutral-800 shadow-lg cursor-pointer"
      >
        <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center text-white">
          {icon}
        </motion.div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-max rounded-md bg-neutral-900 border border-neutral-900 px-3 py-1 text-xs text-white shadow-md whitespace-nowrap"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </a>
  );
};
