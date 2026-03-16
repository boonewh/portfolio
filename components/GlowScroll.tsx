'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GlowScroll() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transform scroll progress to color cycle
  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#22d3ee', '#a855f7', '#ec4899', '#22c55e', '#22d3ee']
  );

  const glow = useTransform(
    scrollYProgress,
    (value) => `0 0 15px ${value < 0.25 ? '#22d3ee' : value < 0.5 ? '#a855f7' : value < 0.75 ? '#ec4899' : '#22c55e'}`
  );

  return (
    <>
      {/* Track */}
      <div className="fixed right-2 top-0 bottom-0 w-1 bg-white/5 z-50 rounded-full my-4 hidden sm:block" />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed right-2 top-0 w-1 origin-top z-50 rounded-full my-4 hidden sm:block"
        style={{
          scaleY,
          height: 'calc(100vh - 2rem)', // Match margins
          background,
          boxShadow: glow,
        }}
      />
    </>
  );
}
