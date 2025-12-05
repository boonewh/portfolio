'use client';

import { motion } from 'framer-motion';

// Circuit board paths connecting icons with right-angle routes
const paths = [
  // Connections from column 1
  { d: 'M 70 35 L 75 35 L 75 43 L 78 43', color: '#22d3ee' },
  { d: 'M 70 50 L 74 50 L 74 30 L 78 30', color: '#a855f7' },
  { d: 'M 70 65 L 76 65 L 76 56 L 78 56', color: '#ec4899' },
  
  // Connections from column 2
  { d: 'M 78 30 L 82 30 L 82 38 L 86 38', color: '#22c55e' },
  { d: 'M 78 43 L 82 43 L 82 52 L 86 52', color: '#22d3ee' },
  { d: 'M 78 56 L 80 56 L 80 66 L 86 66', color: '#a855f7' },
  { d: 'M 78 69 L 82 69 L 82 66 L 86 66', color: '#ec4899' },
  
  // Connections from column 3
  { d: 'M 86 38 L 90 38 L 90 40 L 94 40', color: '#22c55e' },
  { d: 'M 86 52 L 90 52 L 90 60 L 94 60', color: '#22d3ee' },
  { d: 'M 86 66 L 90 66 L 90 60 L 94 60', color: '#a855f7' },
  
  // Cross connections for complexity
  { d: 'M 70 35 L 68 35 L 68 50 L 70 50', color: '#ec4899' },
  { d: 'M 78 30 L 78 25 L 86 25 L 86 38', color: '#22c55e' },
  { d: 'M 86 52 L 88 52 L 88 38 L 86 38', color: '#22d3ee' },
  
  // Extended paths to left side (through name area)
  { d: 'M 10 30 L 25 30 L 25 35 L 40 35 L 40 50 L 50 50', color: '#22d3ee' },
  { d: 'M 15 45 L 30 45 L 30 50 L 45 50 L 45 65 L 60 65', color: '#a855f7' },
  { d: 'M 20 60 L 35 60 L 35 50 L 50 50', color: '#ec4899' },
  { d: 'M 10 25 L 35 25 L 35 35 L 55 35 L 55 20 L 70 20', color: '#22c55e' },
  { d: 'M 25 70 L 40 70 L 40 65 L 55 65 L 55 80 L 68 80', color: '#22d3ee' },
  { d: 'M 12 40 L 20 40 L 20 35 L 40 35', color: '#a855f7' },
  { d: 'M 18 55 L 28 55 L 28 65 L 45 65', color: '#ec4899' },
  { d: 'M 8 35 L 15 35 L 15 45 L 25 45', color: '#22c55e' },
  
  // Extended paths to right side
  { d: 'M 94 40 L 98 40 L 98 25 L 105 25 L 105 15', color: '#22c55e' },
  { d: 'M 94 60 L 100 60 L 100 75 L 110 75 L 110 85', color: '#22d3ee' },
  { d: 'M 98 50 L 105 50 L 105 40 L 115 40', color: '#a855f7' },
  { d: 'M 100 70 L 108 70 L 108 60 L 115 60', color: '#ec4899' },
  
  // Top connections
  { d: 'M 70 10 L 70 20 L 78 20 L 78 25', color: '#a855f7' },
  { d: 'M 86 10 L 86 25 L 78 25', color: '#ec4899' },
  { d: 'M 55 15 L 65 15 L 65 20 L 70 20', color: '#22c55e' },
  { d: 'M 45 12 L 55 12 L 55 20 L 60 20 L 60 35', color: '#22d3ee' },
  
  // Bottom connections
  { d: 'M 78 90 L 78 75 L 86 75 L 86 66', color: '#22c55e' },
  { d: 'M 94 90 L 94 75 L 100 75 L 100 60', color: '#22d3ee' },
  { d: 'M 68 85 L 68 75 L 78 75', color: '#a855f7' },
  { d: 'M 55 88 L 55 80 L 68 80', color: '#ec4899' },
  
  // Additional horizontal spans
  { d: 'M 30 38 L 50 38 L 50 35', color: '#22c55e' },
  { d: 'M 35 52 L 48 52 L 48 50', color: '#22d3ee' },
  { d: 'M 40 68 L 52 68 L 52 65', color: '#a855f7' },
];

interface ParticleProps {
  path: string;
  color: string;
  delay: number;
  duration: number;
}

function TravelingParticle({ path, color, delay, duration }: ParticleProps) {
  return (
    <>
      {/* Main particle */}
      <motion.circle
        r="0.2"
        fill={color}
        style={{
          filter: `drop-shadow(0 0 1px ${color})`,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
          opacity: {
            times: [0, 0.1, 0.9, 1],
            duration,
          },
        }}
      >
        <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
          <mpath href={`#${path}`} />
        </animateMotion>
      </motion.circle>

      {/* Trail particle 1 */}
      <motion.circle
        r="0.125"
        fill={color}
        style={{
          opacity: 0.5,
          filter: `drop-shadow(0 0 0.75px ${color})`,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.5, 0.5, 0],
        }}
        transition={{
          duration,
          delay: delay + 0.15,
          repeat: Infinity,
          ease: 'linear',
          opacity: {
            times: [0, 0.1, 0.9, 1],
            duration,
          },
        }}
      >
        <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay + 0.15}s`}>
          <mpath href={`#${path}`} />
        </animateMotion>
      </motion.circle>

      {/* Trail particle 2 */}
      <motion.circle
        r="0.075"
        fill={color}
        style={{
          opacity: 0.25,
          filter: `drop-shadow(0 0 0.5px ${color})`,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.25, 0.25, 0],
        }}
        transition={{
          duration,
          delay: delay + 0.3,
          repeat: Infinity,
          ease: 'linear',
          opacity: {
            times: [0, 0.1, 0.9, 1],
            duration,
          },
        }}
      >
        <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay + 0.3}s`}>
          <mpath href={`#${path}`} />
        </animateMotion>
      </motion.circle>
    </>
  );
}

export default function CircuitPaths() {
  return (
    <svg
      className="absolute inset-0 -z-10 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Define all paths */}
        {paths.map((path, i) => (
          <path key={`path-${i}`} id={`circuit-path-${i}`} d={path.d} fill="none" />
        ))}
      </defs>

      {/* Render visible paths */}
      {paths.map((path, i) => (
        <path
          key={`visible-${i}`}
          d={path.d}
          fill="none"
          stroke={path.color}
          strokeWidth="0.08"
          opacity="0.12"
        />
      ))}

      {/* Render traveling particles */}
      {paths.map((path, i) => (
        <TravelingParticle
          key={`particle-${i}`}
          path={`circuit-path-${i}`}
          color={path.color}
          delay={i * 0.3}
          duration={4 + (i % 3)}
        />
      ))}
    </svg>
  );
}
