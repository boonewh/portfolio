'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const ACCENT = '#f97316';

const RECENT = [
  { time: '2:14 pm', event: 'Membership · M. Rodriguez' },
  { time: '1:47 pm', event: 'Yard Sign · P. Garcia' },
  { time: '11:23 am', event: 'Yard Sign · T. Kim' },
  { time: '9:41 am', event: 'Membership · C. Torres' },
];

const ROUTES = [
  { key: 'yard_signs', addr: 'athletics@cabc.org' },
  { key: 'membership', addr: 'membership@cabc.org' },
];

function DashboardWidget({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      style={{
        width: '320px',
        background: 'rgba(10,10,10,0.95)',
        border: '1px solid rgba(249,115,22,0.15)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: `0 0 0 1px rgba(249,115,22,0.06), 0 40px 90px rgba(0,0,0,0.75), 0 12px 30px rgba(249,115,22,0.07)`,
      }}
      initial={{ opacity: 0, x: 80, rotate: 1.5 }}
      animate={isInView ? { opacity: 1, x: 0, rotate: 1.5 } : {}}
      transition={{ duration: 1.2, delay: 0.1, ease: EXPO_OUT }}
      aria-label="CABC Email Router admin preview"
    >
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>
          Email Router
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <motion.div
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }}
            animate={isInView ? { opacity: [1, 0.35, 1] } : { opacity: 0.35 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: '#22c55e', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Live</span>
        </div>
      </div>

      {/* Routes */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', letterSpacing: '0.18em', color: ACCENT, textTransform: 'uppercase', marginBottom: '10px' }}>
          Configured Routes
        </p>
        {ROUTES.map((r, i) => (
          <motion.div
            key={r.key}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
          >
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>{r.key}</span>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.22)' }}>{r.addr}</span>
          </motion.div>
        ))}
      </div>

      {/* Recent activity */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', letterSpacing: '0.18em', color: ACCENT, textTransform: 'uppercase', marginBottom: '10px' }}>
          Recent Activity
        </p>
        {RECENT.map((item, i) => (
          <motion.div
            key={item.time}
            style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '7px' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.55 + i * 0.09 }}
          >
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.2)', flexShrink: 0, paddingTop: '1px', width: '52px' }}>{item.time}</span>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.4, flex: 1 }}>{item.event}</span>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '8px', color: '#22c55e', flexShrink: 0, paddingTop: '1px' }}>✓</span>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        style={{ padding: '12px 16px', display: 'flex', gap: '24px' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        {[
          { val: '47', label: 'events' },
          { val: '100%', label: 'delivered' },
          { val: '2', label: 'routes' },
        ].map((stat) => (
          <div key={stat.label}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '15px', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1 }}>{stat.val}</p>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3px' }}>{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function CABCEmailRouter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();

  return (
    <section
      ref={sectionRef}
      id="cabc"
      className="relative overflow-hidden"
      style={{
        minHeight: isMobile ? 'auto' : '640px',
        paddingTop: isMobile ? '100px' : '180px',
        paddingBottom: '100px',
      }}
      aria-label="CABC Email Router — Stripe webhook processor"
    >
      {/* Glow pools */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '8%', width: '50%', height: '350px', background: 'radial-gradient(ellipse at center bottom, rgba(249,115,22,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '5%', right: '5%', width: '40%', height: '300px', background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.03) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Ghost "04" numeral */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 'clamp(140px, 20vw, 300px)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(249,115,22,0.06)',
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
        03
      </motion.span>

      {/* Dashboard widget — desktop only (absolute) */}
      {!isMobile && (
        <div style={{ position: 'absolute', top: '160px', right: 'clamp(40px, 10vw, 160px)', zIndex: 2 }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: '-80px', zIndex: -1, borderRadius: '16px', background: 'radial-gradient(ellipse at 70% 50%, rgba(249,115,22,0.10) 0%, transparent 70%)', filter: 'blur(28px)', pointerEvents: 'none' }} />
          <DashboardWidget isInView={isInView} />
        </div>
      )}

      {/* "Client project" badge — desktop only */}
      {!isMobile && (
        <motion.div
          style={{ position: 'absolute', top: '140px', right: 'clamp(290px, 36vw, 520px)', zIndex: 5 }}
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: -14 } : {}}
          transition={{ duration: 0.7, delay: 0.55, type: 'spring', stiffness: 180, damping: 14 }}
        >
          <div style={{ padding: '5px 13px', border: `1px solid ${ACCENT}`, borderRadius: '4px', background: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(8px)', boxShadow: `0 0 14px rgba(249,115,22,0.2)` }}>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', color: ACCENT, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              ✦ Client project
            </span>
          </div>
        </motion.div>
      )}

      {/* Text content block */}
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
          Production build
        </motion.p>

        <motion.h2
          style={{ fontFamily: 'var(--font-alkatra)', fontSize: isMobile ? '52px' : 'clamp(52px, 7vw, 100px)', lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EXPO_OUT }}
        >
          CABC Email <span style={{ color: ACCENT }}>Router</span>
        </motion.h2>

        <motion.p
          style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.42 }}
        >
          A production Stripe webhook processor and email routing system for a real booster club.
          Ingests checkout events, normalizes customer data across ten different Stripe fields,
          matches each purchase to a configured route, and dispatches to the right inbox automatically.
        </motion.p>

        <motion.ul
          style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '9px' }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.48 }}
        >
          {[
            'Webhook → idempotency guard → route match → per-recipient dispatch pipeline',
            'Fuzzy normalization resolves customer data across 10+ Stripe sources',
            'Two-layer Postgres duplicate detection — no pre-queries, no race conditions',
            'Dual-status tracking: delivery outcome and fulfillment state are independent',
            'Passwordless admin — magic link with PKCE, email allow-list at every route',
          ].map((item) => (
            <li key={item} style={{ display: 'flex', gap: '10px', fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>
              <span style={{ color: ACCENT, flexShrink: 0 }}>—</span>
              {item}
            </li>
          ))}
        </motion.ul>

        <motion.div
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.52 }}
        >
          {['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Resend', 'Vercel'].map((tag) => (
            <span key={tag} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '3px', padding: '3px 9px' }}>
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center', marginBottom: isMobile ? '32px' : 0 }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: EXPO_OUT }}
        >
          <Link
            href="/projects/cabc-email-router"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
          >
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px', letterSpacing: '0.14em', color: ACCENT, textTransform: 'uppercase' }}>
              Case study
            </span>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" style={{ overflow: 'visible' }} aria-hidden="true">
              <motion.path d="M3 10h14M11 4l6 6-6 6" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.6, delay: 0.9 }} />
            </svg>
          </Link>
        </motion.div>

        <motion.p
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(249,115,22,0.4)', textTransform: 'uppercase', marginTop: '28px' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          — Client work · 2026
        </motion.p>
      </div>

      {/* Dashboard widget — mobile (in-flow) */}
      {isMobile && (
        <motion.div
          style={{ marginTop: '40px', paddingLeft: '24px', paddingRight: '24px', position: 'relative', zIndex: 2 }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: EXPO_OUT }}
        >
          <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
            <div style={{ padding: '4px 10px', border: `1px solid ${ACCENT}`, borderRadius: '4px', background: 'rgba(5,5,5,0.9)' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.14em', color: ACCENT, textTransform: 'uppercase' }}>
                ✦ Client project
              </span>
            </div>
          </div>
          <DashboardWidget isInView={isInView} />
        </motion.div>
      )}
    </section>
  );
}
