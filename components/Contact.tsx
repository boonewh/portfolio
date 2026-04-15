'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      style={{ paddingTop: '120px', paddingBottom: '140px' }}
      aria-label="Contact"
    >
      {/* ── Ambient glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '30%',
          width: '50%',
          height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(34,197,94,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Ghost "05" — top right ── */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 'clamp(140px, 20vw, 300px)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(34,197,94,0.06)',
          top: '0px',
          left: '54%',
          zIndex: 0,
          letterSpacing: '-0.06em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0, rotate: 5 }}
        animate={isInView ? { opacity: 1, rotate: 5 } : {}}
        transition={{ duration: 1.1, ease: EXPO_OUT }}
      >
        05
      </motion.span>

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          paddingLeft: 'clamp(32px, 4vw, 72px)',
          paddingRight: 'clamp(32px, 4vw, 72px)',
          maxWidth: '700px',
        }}
      >
        <motion.p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            letterSpacing: '0.22em',
            color: '#22c55e',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Get in touch
        </motion.p>

        <motion.h2
          style={{
            fontFamily: 'var(--font-alkatra)',
            fontSize: 'clamp(42px, 6vw, 88px)',
            lineHeight: 1.0,
            color: '#ffffff',
            marginBottom: '24px',
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: EXPO_OUT }}
        >
          Let&apos;s build{' '}
          <span style={{ color: '#22c55e' }}>something</span>
        </motion.h2>

        <motion.p
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '48px',
            maxWidth: '500px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.32 }}
        >
          Whether it&apos;s a new site, an app idea, or something in between —
          reach out and let&apos;s talk about it.
        </motion.p>

        {/* Email CTA */}
        <motion.a
          href="mailto:will@pathsixsolutions.com"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            textDecoration: 'none',
            marginBottom: '48px',
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.42, ease: EXPO_OUT }}
          whileHover={{ x: 6 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-alkatra)',
              fontSize: 'clamp(22px, 3vw, 36px)',
              color: '#22c55e',
            }}
          >
            will@pathsixsolutions.com
          </span>
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M3 10h14M11 4l6 6-6 6"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>

        {/* Divider */}
        <motion.div
          style={{
            width: '48px',
            height: '1px',
            background: 'rgba(255,255,255,0.1)',
            marginBottom: '32px',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
        />

        {/* Social / external links */}
        <motion.div
          style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {[
            { label: 'GitHub', href: 'https://github.com/boonewh' },
            { label: 'PathSix Solutions', href: 'https://pathsixsolutions.com', accent: true },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: link.accent ? '#22d3ee' : 'rgba(255,255,255,0.35)',
                borderBottom: `1px solid ${link.accent ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.1)'}`,
                paddingBottom: '2px',
              }}
            >
              {link.label} ↗
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
