'use client';

import { motion } from 'framer-motion';
import CircuitPaths from './CircuitPaths';

// Neon color cycling animation config
const neonColors = ['#22d3ee', '#a855f7', '#ec4899', '#22c55e']; // cyan, purple, pink, green

// Different durations for each icon to create varied, pseudo-random effect
const iconDurations = [7, 8.5, 6.5, 9, 7.5, 8, 6, 9.5, 7.2, 8.8, 6.8, 9.2];

interface AnimatedIconProps {
  iconClass: string;
  delay: number;
  index: number;
}

function AnimatedIcon({ iconClass, delay, index }: AnimatedIconProps) {
  return (
    <motion.i
      className={`${iconClass} text-8xl`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        color: neonColors,
        filter: [
          'drop-shadow(0 0 1px currentColor)',
          'drop-shadow(0 0 3px currentColor)',
          'drop-shadow(0 0 1px currentColor)',
        ],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        color: {
          duration: iconDurations[index],
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
        filter: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      }}
      whileHover={{
        scale: 1.1,
        filter: 'drop-shadow(0 0 3px currentColor)',
        transition: { duration: 0.2 },
      }}
    />
  );
}

export default function Hero() {
  const icons = [
    'devicon-react-original-wordmark',
    'devicon-nextjs-original-wordmark',
    'devicon-typescript-plain',
    'devicon-tailwindcss-original',
    'devicon-vitejs-plain',
    'devicon-javascript-plain',
    'devicon-sqlite-plain-wordmark',
    'devicon-vscode-plain-wordmark',
    'devicon-php-plain',
    'devicon-postgresql-plain-wordmark',
    'devicon-python-plain-wordmark',
    'devicon-flask-original-wordmark',
  ];

  return (
    <div className="relative isolate">
      <CircuitPaths />
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
                Will Boone
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none dark:text-gray-400">
                Software Engineer, specializing in building exceptional digital experiences.
              </p>
            </div>

            {/* Bento Grid - Tech Stack Icons */}
            <div className="mt-14 flex justify-end gap-6 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              {/* Column 1 */}
              <div className="ml-auto w-32 flex-none space-y-6 pt-8 sm:ml-0 sm:pt-32 lg:order-last lg:pt-8 xl:order-none xl:pt-32">
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[0]} delay={0.1} index={0} />
                </div>
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[1]} delay={0.2} index={1} />
                </div>
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[2]} delay={0.3} index={2} />
                </div>
              </div>

              {/* Column 2 */}
              <div className="mr-auto w-32 flex-none space-y-6 sm:mr-0 sm:pt-32 lg:pt-16">
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[3]} delay={0.4} index={3} />
                </div>
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[4]} delay={0.5} index={4} />
                </div>
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[5]} delay={0.6} index={5} />
                </div>
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[6]} delay={0.7} index={6} />
                </div>
              </div>

              {/* Column 3 */}
              <div className="w-32 flex-none space-y-6 pt-20 sm:pt-4">
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[7]} delay={0.8} index={7} />
                </div>
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[8]} delay={0.9} index={8} />
                </div>
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[9]} delay={1.0} index={9} />
                </div>
              </div>

              {/* Column 4 */}
              <div className="w-32 flex-none space-y-6 pt-12 sm:pt-28">
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[10]} delay={1.1} index={10} />
                </div>
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <AnimatedIcon iconClass={icons[11]} delay={1.2} index={11} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
