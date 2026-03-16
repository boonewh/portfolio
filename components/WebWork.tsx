'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const TECH_COLORS: Record<string, string> = {
  'Next.js':              '#22d3ee',
  'WordPress / Bricks':   '#a855f7',
  'Flask':                '#22c55e',
};

const sites = [
  { img: 'allseasons',      name: 'All Seasons Foam',      domain: 'allseasonsfoam.com',       tech: 'Next.js',            span: 1, mt: 0,    rot: -0.8 },
  { img: 'asfi',            name: 'ASFI Construction',     domain: 'asficonstruction.com',     tech: 'Next.js',            span: 1, mt: 40,   rot: 1.2  },
  { img: 'cssdallas',       name: 'CSS Dallas',            domain: 'cssdallas.com',            tech: 'WordPress / Bricks', span: 1, mt: -12,  rot: -1.4 },
  { img: 'osg',             name: 'Odessa Symphony Guild', domain: 'odessasymphonyguild.com',   tech: 'Next.js',            span: 2, mt: 24,   rot: 0.6  },
  { img: 'lonestar',        name: 'Lone Star Glass',       domain: 'lsglassandshower.com',     tech: 'Next.js',            span: 1, mt: -8,   rot: -0.5 },
  { img: 'lotusrpg',        name: 'Lotus RPG',             domain: 'lotusrpg.com',             tech: 'WordPress / Bricks', span: 1, mt: 36,   rot: 1.8  },
  { img: 'games',           name: 'PathSix Games',         domain: 'pathsix.games',            tech: 'Next.js',            span: 1, mt: 0,    rot: -1.1 },
  { img: 'permian_alliance',name: 'Permian Alliance',      domain: 'permianalliance.com',       tech: 'Flask',              span: 1, mt: 28,   rot: 0.9  },
];

export default function WebWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const isMobile = useIsMobile();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ paddingTop: '100px', paddingBottom: '120px' }}
      id="web-work"
      aria-label="Web development work"
    >
      {/* ── Ghost "03" numeral — bottom-left ── */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 'clamp(140px, 20vw, 300px)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(34,211,238,0.07)',
          bottom: '10px',
          left: '-1%',
          zIndex: 0,
          letterSpacing: '-0.06em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0, rotate: -8 }}
        animate={isInView ? { opacity: 1, rotate: -8 } : {}}
        transition={{ duration: 1.1, ease: EXPO_OUT }}
      >
        03
      </motion.span>

      {/* ── Ambient glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: '50%',
          height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Section header ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          paddingLeft: 'clamp(32px, 4vw, 72px)',
          marginBottom: '56px',
        }}
      >
        <motion.p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            letterSpacing: '0.22em',
            color: '#22d3ee',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Web development
        </motion.p>
        <motion.h2
          style={{
            fontFamily: 'var(--font-alkatra)',
            fontSize: 'clamp(42px, 6vw, 88px)',
            lineHeight: 1.0,
            color: '#ffffff',
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: EXPO_OUT }}
        >
          Sites I built,{' '}
          <span style={{ color: '#22d3ee' }}>sites I maintain</span>
        </motion.h2>
      </div>

      {/* ── Grid ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '16px' : 'clamp(12px, 1.5vw, 24px)',
          paddingLeft: isMobile ? '24px' : 'clamp(32px, 4vw, 72px)',
          paddingRight: isMobile ? '24px' : 'clamp(32px, 4vw, 72px)',
        }}
      >
        {sites.map((site, i) => (
          <SiteCard key={site.img} site={site} index={i} globalInView={isInView} isMobile={isMobile} />
        ))}
      </div>

      {/* ── Bottom label ── */}
      <motion.p
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(34,211,238,0.35)',
          textTransform: 'uppercase',
          marginTop: '52px',
          paddingLeft: 'clamp(32px, 4vw, 72px)',
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        — Built & maintained · 2023–present
      </motion.p>
    </section>
  );
}

function SiteCard({
  site,
  index,
  globalInView,
  isMobile,
}: {
  site: (typeof sites)[number];
  index: number;
  globalInView: boolean;
  isMobile: boolean;
}) {
  const color = TECH_COLORS[site.tech];

  return (
    <motion.a
      href={`https://${site.domain}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        gridColumn: (!isMobile && site.span > 1) ? `span ${site.span}` : undefined,
        alignSelf: 'start',
        marginTop: isMobile ? 0 : `${site.mt}px`,
        display: 'block',
        textDecoration: 'none',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        border: `1px solid rgba(255,255,255,0.07)`,
        cursor: 'pointer',
        transform: isMobile ? 'none' : `rotate(${site.rot}deg)`,
        transformOrigin: 'center center',
      }}
      initial={{ opacity: 0, y: 36 }}
      animate={globalInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.3 + index * 0.08,
        ease: EXPO_OUT,
      }}
      whileHover={{
        scale: 1.03,
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
    >
      {/* Screenshot */}
      <div style={{ position: 'relative', aspectRatio: (!isMobile && site.span > 1) ? '16/5' : '16/9', background: '#111' }}>
        <Image
          src={`/images/${site.img}.jpg`}
          alt={site.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover', display: 'block' }}
        />
        {/* Hover overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0)',
          }}
          whileHover={{ background: 'rgba(0,0,0,0.25)' }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Info bar */}
      <div
        style={{
          background: 'rgba(10,10,10,0.95)',
          borderTop: `1px solid ${color}28`,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '13px',
              fontWeight: 500,
              color: '#ffffff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '2px',
            }}
          >
            {site.name}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.3)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {site.domain}
          </p>
        </div>

        {/* Tech badge */}
        <span
          style={{
            flexShrink: 0,
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: color,
            border: `1px solid ${color}40`,
            borderRadius: '3px',
            padding: '2px 8px',
            whiteSpace: 'nowrap',
            background: `${color}0d`,
          }}
        >
          {site.tech}
        </span>
      </div>
    </motion.a>
  );
}
