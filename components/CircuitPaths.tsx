'use client';

import { motion } from 'framer-motion';

// Circuit board paths with 45-degree angles and terminal points
const paths = [
  // Connections from column 1
  { d: 'M 70 35 L 75 35 L 75 43 L 78 43', color: '#22d3ee', terminals: [] },
  { d: 'M 70 50 L 74 50 L 74 30 L 78 30', color: '#a855f7', terminals: [] },
  { d: 'M 70 65 L 76 65 L 76 56 L 78 56', color: '#ec4899', terminals: [{x: 70, y: 65}] },

  // Connections from column 2
  { d: 'M 78 30 L 82 30 L 82 38 L 86 38', color: '#22c55e', terminals: [] },
  { d: 'M 78 43 L 82 43 L 82 52 L 86 52', color: '#22d3ee', terminals: [] },
  { d: 'M 78 56 L 80 56 L 80 66 L 86 66', color: '#a855f7', terminals: [] },
  { d: 'M 78 69 L 82 69 L 82 66 L 86 66', color: '#ec4899', terminals: [{x: 78, y: 69}] },

  // Connections from column 3
  { d: 'M 86 38 L 90 38 L 90 40 L 94 40', color: '#22c55e', terminals: [] },
  { d: 'M 86 52 L 90 52 L 90 60 L 94 60', color: '#22d3ee', terminals: [] },
  { d: 'M 86 66 L 90 66 L 90 60 L 94 60', color: '#a855f7', terminals: [] },

  // Cross connections for complexity
  { d: 'M 70 35 L 68 35 L 68 50 L 70 50', color: '#ec4899', terminals: [] },
  { d: 'M 78 30 L 78 25 L 86 25 L 86 38', color: '#22c55e', terminals: [] },
  { d: 'M 86 52 L 88 52 L 88 38 L 86 38', color: '#22d3ee', terminals: [] },

  // Extended paths to left side (through name area)
  { d: 'M 10 30 L 25 30 L 25 35 L 40 35 L 40 50 L 50 50', color: '#22d3ee', terminals: [{x: 10, y: 30}] },
  { d: 'M 15 45 L 30 45 L 30 50 L 45 50 L 45 65 L 60 65', color: '#a855f7', terminals: [{x: 15, y: 45}, {x: 60, y: 65}] },
  { d: 'M 20 60 L 35 60 L 35 50 L 50 50', color: '#ec4899', terminals: [{x: 20, y: 60}] },
  { d: 'M 10 25 L 35 25 L 35 35 L 55 35 L 55 20 L 70 20', color: '#22c55e', terminals: [{x: 10, y: 25}] },
  { d: 'M 25 70 L 40 70 L 40 65 L 55 65 L 55 80 L 68 80', color: '#22d3ee', terminals: [{x: 25, y: 70}] },
  { d: 'M 12 40 L 20 40 L 20 35 L 40 35', color: '#a855f7', terminals: [{x: 12, y: 40}] },
  { d: 'M 18 55 L 28 55 L 28 65 L 45 65', color: '#ec4899', terminals: [{x: 18, y: 55}] },
  { d: 'M 8 35 L 15 35 L 15 45 L 25 45', color: '#22c55e', terminals: [{x: 8, y: 35}, {x: 25, y: 45}] },

  // Extended paths to right side
  { d: 'M 94 40 L 98 40 L 98 25 L 105 25 L 105 15', color: '#22c55e', terminals: [{x: 105, y: 15}] },
  { d: 'M 94 60 L 100 60 L 100 75 L 110 75 L 110 85', color: '#22d3ee', terminals: [{x: 110, y: 85}] },
  { d: 'M 98 50 L 105 50 L 105 40 L 115 40', color: '#a855f7', terminals: [{x: 98, y: 50}, {x: 115, y: 40}] },
  { d: 'M 100 70 L 108 70 L 108 60 L 115 60', color: '#ec4899', terminals: [{x: 100, y: 70}, {x: 115, y: 60}] },

  // Top connections
  { d: 'M 70 10 L 70 20 L 78 20 L 78 25', color: '#a855f7', terminals: [{x: 70, y: 10}] },
  { d: 'M 86 10 L 86 25 L 78 25', color: '#ec4899', terminals: [{x: 86, y: 10}] },
  { d: 'M 55 15 L 65 15 L 65 20 L 70 20', color: '#22c55e', terminals: [{x: 55, y: 15}] },
  { d: 'M 45 12 L 55 12 L 55 20 L 60 20 L 60 35', color: '#22d3ee', terminals: [{x: 45, y: 12}, {x: 60, y: 35}] },

  // Bottom connections
  { d: 'M 78 90 L 78 75 L 86 75 L 86 66', color: '#22c55e', terminals: [{x: 78, y: 90}] },
  { d: 'M 94 90 L 94 75 L 100 75 L 100 60', color: '#22d3ee', terminals: [{x: 94, y: 90}, {x: 100, y: 60}] },
  { d: 'M 68 85 L 68 75 L 78 75', color: '#a855f7', terminals: [{x: 68, y: 85}] }, // ends at 78,75 connecting to line 51
  { d: 'M 55 88 L 55 80 L 68 80', color: '#ec4899', terminals: [{x: 55, y: 88}] },

  // Additional horizontal spans
  { d: 'M 30 38 L 50 38 L 50 35', color: '#22c55e', terminals: [{x: 30, y: 38}, {x: 50, y: 35}] },
  { d: 'M 35 52 L 48 52 L 48 50', color: '#22d3ee', terminals: [{x: 35, y: 52}, {x: 48, y: 50}] },
  { d: 'M 40 68 L 52 68 L 52 65', color: '#a855f7', terminals: [{x: 40, y: 68}, {x: 52, y: 65}] },

  // NEW: 45-degree diagonal paths for visual interest
  { d: 'M 22 28 L 28 28 L 35 21 L 42 21', color: '#22d3ee', terminals: [{x: 22, y: 28}, {x: 42, y: 21}] },
  { d: 'M 16 48 L 22 48 L 28 42 L 28 38', color: '#a855f7', terminals: [{x: 16, y: 48}, {x: 28, y: 38}] },
  { d: 'M 32 75 L 38 75 L 45 68 L 45 65', color: '#ec4899', terminals: [{x: 32, y: 75}] }, // ends at 45,65 which connects to line 30 & 35
  { d: 'M 62 18 L 62 22 L 68 28 L 72 28', color: '#22c55e', terminals: [{x: 62, y: 18}, {x: 72, y: 28}] },
  { d: 'M 96 48 L 100 48 L 106 54 L 110 54', color: '#22d3ee', terminals: [{x: 96, y: 48}, {x: 110, y: 54}] },
  { d: 'M 98 65 L 102 65 L 108 71 L 112 71', color: '#a855f7', terminals: [{x: 98, y: 65}, {x: 112, y: 71}] },
  { d: 'M 72 82 L 72 78 L 78 72 L 82 72', color: '#ec4899', terminals: [{x: 72, y: 82}, {x: 82, y: 72}] },
  { d: 'M 14 62 L 18 62 L 24 56 L 28 56', color: '#22c55e', terminals: [{x: 14, y: 62}, {x: 28, y: 56}] },
  { d: 'M 88 15 L 88 18 L 94 24 L 98 24', color: '#ec4899', terminals: [{x: 88, y: 15}, {x: 98, y: 24}] },
  { d: 'M 48 8 L 52 8 L 58 14 L 62 14', color: '#a855f7', terminals: [{x: 48, y: 8}, {x: 62, y: 14}] },
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

      {/* Render terminal circles (pads/vias) */}
      {paths.map((path, i) =>
        path.terminals.map((terminal, j) => (
          <g key={`terminal-${i}-${j}`}>
            {/* Outer glow circle */}
            <circle
              cx={terminal.x}
              cy={terminal.y}
              r="0.5"
              fill="none"
              stroke={path.color}
              strokeWidth="0.05"
              opacity="0.15"
            />
            {/* Main terminal pad */}
            <circle
              cx={terminal.x}
              cy={terminal.y}
              r="0.3"
              fill={path.color}
              opacity="0.2"
            />
            {/* Center via hole */}
            <circle
              cx={terminal.x}
              cy={terminal.y}
              r="0.1"
              fill={path.color}
              opacity="0.4"
            />
          </g>
        ))
      )}

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
