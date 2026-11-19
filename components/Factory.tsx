'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const ACCENT = '#22c55e';

const AGENTS = [
  { role: 'Lead', who: 'Claude Code', job: 'plans · codes · merges · deploys to dev', color: '#22c55e' },
  { role: 'Reviewer', who: 'Codex', job: 'reviews every change', color: '#a855f7' },
  { role: 'Tester', who: 'OpenCode', job: 'writes and runs every test', color: '#22d3ee' },
];

function FloorWidget({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      style={{
        width: '320px',
        maxWidth: '100%',
        background: 'rgba(10,10,10,0.95)',
        border: '1px solid rgba(34,197,94,0.15)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(34,197,94,0.06), 0 40px 90px rgba(0,0,0,0.75), 0 12px 30px rgba(34,197,94,0.07)',
      }}
      initial={{ opacity: 0, x: 80, rotate: -1.5 }}
      animate={isInView ? { opacity: 1, x: 0, rotate: -1.5 } : {}}
      transition={{ duration: 1.2, delay: 0.1, ease: EXPO_OUT }}
      aria-label="Factory agent roles"
    >
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>
          Factory floor
        </span>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Solo
        </span>
      </div>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {AGENTS.map((a, i) => (
          <motion.div
            key={a.role}
            style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.12 }}
          >
            <motion.div
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: a.color, flexShrink: 0 }}
              animate={isInView ? { opacity: [1, 0.3, 1] } : { opacity: 0.3 }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: a.color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {a.role} <span style={{ color: 'rgba(255,255,255,0.3)' }}>· {a.who}</span>
              </p>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{a.job}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '24px' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        {[
          { val: '8', label: 'findings' },
          { val: '1', label: 'regression caught' },
          { val: '0', label: 'relays by me' },
        ].map((s) => (
          <div key={s.label}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '15px', color: '#ffffff', lineHeight: 1 }}>{s.val}</p>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3px' }}>{s.label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Factory() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();

  return (
    <section
      ref={sectionRef}
      id="factory"
      className="relative overflow-hidden"
      style={{
        minHeight: isMobile ? 'auto' : '520px',
        paddingTop: isMobile ? '60px' : '120px',
        paddingBottom: '100px',
      }}
      aria-label="Factory — my multi-agent development setup"
    >
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '8%', width: '50%', height: '350px', background: 'radial-gradient(ellipse at center bottom, rgba(34,197,94,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Ghost "00" numeral — the process behind everything below */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 'clamp(140px, 20vw, 300px)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(34,197,94,0.06)',
          top: '-30px',
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
        00
      </motion.span>

      {!isMobile && (
        <div style={{ position: 'absolute', top: '120px', right: 'clamp(40px, 10vw, 160px)', zIndex: 2 }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: '-80px', zIndex: -1, background: 'radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.10) 0%, transparent 70%)', filter: 'blur(28px)', pointerEvents: 'none' }} />
          <FloorWidget isInView={isInView} />
        </div>
      )}

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          paddingLeft: isMobile ? '24px' : 'clamp(32px, 4vw, 72px)',
          paddingRight: isMobile ? '24px' : 0,
          maxWidth: isMobile ? '100%' : 'clamp(440px, 52vw, 780px)',
        }}
      >
        <motion.p
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.22em', color: '#ec4899', textTransform: 'uppercase', marginBottom: '14px' }}
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          How I build now
        </motion.p>

        <motion.h2
          style={{ fontFamily: 'var(--font-alkatra)', fontSize: isMobile ? '52px' : 'clamp(52px, 7vw, 100px)', lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EXPO_OUT }}
        >
          The <span style={{ color: ACCENT }}>Factory</span>
        </motion.h2>

        <motion.p
          style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: '28px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.42 }}
        >
          Three AI agents, one goal. A lead agent writes the code, a second agent reviews it, a third
          tests it, and the lead fixes what they find and deploys to dev. I set the scope, make the
          calls, and approve anything near production.
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center' }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EXPO_OUT }}
        >
          <Link href="/projects/factory" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px', letterSpacing: '0.14em', color: ACCENT, textTransform: 'uppercase' }}>
              Case study
            </span>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" style={{ overflow: 'visible' }} aria-hidden="true">
              <motion.path d="M3 10h14M11 4l6 6-6 6" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.6, delay: 0.85 }} />
            </svg>
          </Link>
        </motion.div>
      </div>

      {isMobile && (
        <motion.div
          style={{ marginTop: '40px', paddingLeft: '24px', paddingRight: '24px', position: 'relative', zIndex: 2 }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: EXPO_OUT }}
        >
          <FloorWidget isInView={isInView} />
        </motion.div>
      )}
    </section>
  );
}
