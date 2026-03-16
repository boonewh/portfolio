'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export default function PathSixCRM() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();

  return (
    <section
      ref={sectionRef}
      id="crm"
      className="relative overflow-hidden"
      style={{
        minHeight: isMobile ? 'auto' : '620px',
        paddingTop: isMobile ? '100px' : '180px',
        paddingBottom: '100px',
      }}
      aria-label="PathSix CRM — Built with AI"
    >
      {/* ── Ambient glow pools ── */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '8%', width: '50%', height: '350px', background: 'radial-gradient(ellipse at center bottom, rgba(168,85,247,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '5%', right: '5%', width: '40%', height: '300px', background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── Ghost "01" editorial numeral ── */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 'clamp(140px, 20vw, 300px)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(34,211,238,0.06)',
          top: '10px',
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
        01
      </motion.span>

      {/* ── Screenshot — desktop only (absolute) ── */}
      {!isMobile && (
        <div style={{ position: 'absolute', top: '160px', right: 'clamp(40px, 10vw, 160px)', width: 'clamp(300px, 46vw, 640px)', zIndex: 2, perspective: '1000px' }}>
          <motion.div
            style={{ transformOrigin: 'right center' }}
            initial={{ opacity: 0, x: 80, rotateY: -30, rotateX: 4, rotate: 1.5 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: -12, rotateX: 4, rotate: 1.5 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: EXPO_OUT }}
          >
            <div aria-hidden="true" style={{ position: 'absolute', inset: '-80px', zIndex: -1, borderRadius: '16px', background: 'radial-gradient(ellipse at 70% 50%, rgba(34,211,238,0.12) 0%, transparent 70%)', filter: 'blur(28px)' }} />
            <Image src="/images/dashboard.jpg" alt="PathSix CRM dashboard" width={720} height={460} priority style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '10px', border: '1px solid rgba(34,211,238,0.16)', boxShadow: '0 0 0 1px rgba(34,211,238,0.06), 0 40px 90px rgba(0,0,0,0.75), 0 12px 30px rgba(34,211,238,0.07)' }} />
          </motion.div>
        </div>
      )}

      {/* ── "Built with AI" badge — desktop only ── */}
      {!isMobile && (
        <motion.div
          style={{ position: 'absolute', top: '140px', right: 'clamp(280px, 42vw, 580px)', zIndex: 5 }}
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: -14 } : {}}
          transition={{ duration: 0.7, delay: 0.55, type: 'spring', stiffness: 180, damping: 14 }}
        >
          <div style={{ padding: '5px 13px', border: '1px solid #22c55e', borderRadius: '4px', background: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 0 14px rgba(34,197,94,0.22)' }}>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', color: '#22c55e', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              ✦ Built with the help of AI
            </span>
          </div>
        </motion.div>
      )}

      {/* ── Text content block ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          paddingLeft: isMobile ? '24px' : 'clamp(32px, 4vw, 72px)',
          paddingRight: isMobile ? '24px' : 0,
          maxWidth: isMobile ? '100%' : 'clamp(440px, 58vw, 840px)',
        }}
      >
        <motion.p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.22em', color: '#ec4899', textTransform: 'uppercase', marginBottom: '14px' }} initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          Full-stack build
        </motion.p>

        <motion.h2
          style={{ fontFamily: 'var(--font-kaushan-script)', fontSize: isMobile ? '56px' : 'clamp(56px, 7.5vw, 110px)', lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EXPO_OUT }}
        >
          PathSix <span style={{ color: '#22d3ee' }}>CRM</span>
        </motion.h2>

        <motion.p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: '24px' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.42 }}>
          A complete customer relationship platform built from scratch.
          AI was in the room the whole time — not a shortcut, a collaborator.
          Every module, every edge case, architected together.
        </motion.p>

        <motion.div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.52 }}>
          {['Vite', 'React', 'Quart', 'PostgreSQL', 'Tailwind'].map((tag) => (
            <span key={tag} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '3px', padding: '3px 9px' }}>
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.a
          href="https://pathsixsolutions.com/crm"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: isMobile ? '32px' : 0 }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: EXPO_OUT }}
          whileHover={{ x: 5 }}
        >
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px', letterSpacing: '0.14em', color: '#22d3ee', textTransform: 'uppercase' }}>
            View live site
          </span>
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" style={{ overflow: 'visible' }} aria-hidden="true">
            <motion.path d="M3 10h14M11 4l6 6-6 6" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.6, delay: 0.9 }} />
          </svg>
        </motion.a>

        <motion.p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(168,85,247,0.5)', textTransform: 'uppercase', marginTop: '28px' }} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.75 }}>
          — AI + Human · 2024
        </motion.p>
      </div>

      {/* ── Screenshot — mobile only (in-flow) ── */}
      {isMobile && (
        <motion.div
          style={{ marginTop: '40px', paddingLeft: '24px', paddingRight: '24px', position: 'relative', zIndex: 2 }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: EXPO_OUT }}
        >
          {/* Built with AI badge on mobile */}
          <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
            <div style={{ padding: '4px 10px', border: '1px solid #22c55e', borderRadius: '4px', background: 'rgba(5,5,5,0.9)' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.14em', color: '#22c55e', textTransform: 'uppercase' }}>
                ✦ Built with the help of AI
              </span>
            </div>
          </div>
          <Image src="/images/dashboard.jpg" alt="PathSix CRM dashboard" width={720} height={460} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '10px', border: '1px solid rgba(34,211,238,0.16)', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }} />
        </motion.div>
      )}
    </section>
  );
}
