'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

function Bubble({ side, text }: { side: 'left' | 'right'; text: string }) {
  const isRight = side === 'right';
  return (
    <div style={{ display: 'flex', justifyContent: isRight ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '82%',
          padding: '8px 12px',
          borderRadius: isRight ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: isRight
            ? 'rgba(34,211,238,0.12)'
            : 'rgba(255,255,255,0.05)',
          border: isRight
            ? '1px solid rgba(34,211,238,0.25)'
            : '1px solid rgba(255,255,255,0.07)',
          color: isRight ? '#a8f0f8' : 'rgba(255,255,255,0.6)',
          fontSize: '12px',
          lineHeight: 1.55,
          fontFamily: 'var(--font-geist-sans)',
        }}
      >
        {text}
      </div>
    </div>
  );
}

function AppCard({
  number,
  kicker,
  name,
  nameAccent,
  tagline,
  desc,
  href,
  comingSoon,
  accentColor,
  borderColor,
  rotation,
  delay,
  children,
}: {
  number: string;
  kicker: string;
  name: string;
  nameAccent: string;
  tagline: string;
  desc: string;
  href: string;
  comingSoon?: boolean;
  accentColor: string;
  borderColor: string;
  rotation: string;
  delay: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      style={{ flex: '1 1 0', minWidth: 0 }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: EXPO_OUT }}
    >
      {/* Card */}
      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Top accent stripe */}
        <div
          style={{
            height: '2px',
            background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          }}
        />

        {/* Card body */}
        <div style={{ padding: '24px 22px 28px' }}>
          {/* Card number + kicker */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: accentColor,
                opacity: 0.7,
              }}
            >
              {number}
            </span>
            <span
              style={{
                width: '20px',
                height: '1px',
                background: borderColor,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
              }}
            >
              {kicker}
            </span>
          </div>

          {/* App name */}
          <h3
            style={{
              fontFamily: 'var(--font-kaushan-script)',
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              lineHeight: 1.05,
              color: '#ffffff',
              marginBottom: '6px',
            }}
          >
            {name}{' '}
            <span style={{ color: accentColor }}>{nameAccent}</span>
          </h3>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: accentColor,
              textTransform: 'uppercase',
              marginBottom: '18px',
              opacity: 0.8,
            }}
          >
            {tagline}
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '13px',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '20px',
            }}
          >
            {desc}
          </p>

          {/* Conversation */}
          <div
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '22px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.2)',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              See it in action
            </p>
            {children}
          </div>

          {/* CTA */}
          {comingSoon ? (
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.2)',
                textTransform: 'uppercase',
              }}
            >
              ◌ Site coming soon
            </span>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: accentColor,
                  textTransform: 'uppercase',
                }}
              >
                Visit site
              </span>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 10h14M11 4l6 6-6 6"
                  stroke={accentColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AIBuilds() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ paddingTop: '100px', paddingBottom: '120px' }}
      id="ai-builds"
      aria-label="AI-first builds"
    >
      {/* ── Ghost "02" numeral — top-right this time ── */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 'clamp(140px, 20vw, 300px)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(168,85,247,0.09)',
          top: '0px',
          left: '52%',
          zIndex: 0,
          letterSpacing: '-0.06em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0, x: 60, rotate: 6 }}
        animate={isInView ? { opacity: 1, x: 0, rotate: 6 } : {}}
        transition={{ duration: 1.1, ease: EXPO_OUT }}
      >
        02
      </motion.span>

      {/* ── Ambient glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '60%',
          height: '40%',
          background:
            'radial-gradient(ellipse at center, rgba(168,85,247,0.05) 0%, transparent 70%)',
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
          marginBottom: '64px',
        }}
      >
        <motion.p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            letterSpacing: '0.22em',
            color: '#a855f7',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          AI-first builds
        </motion.p>
        <motion.h2
          style={{
            fontFamily: 'var(--font-kaushan-script)',
            fontSize: 'clamp(42px, 6vw, 88px)',
            lineHeight: 1.0,
            color: '#ffffff',
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: EXPO_OUT }}
        >
          What AI built,{' '}
          <span style={{ color: '#a855f7' }}>I guided</span>
        </motion.h2>
      </div>

      {/* ── Cards — asymmetric two-up ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '32px' : 'clamp(20px, 3vw, 48px)',
          paddingLeft: isMobile ? '24px' : 'clamp(32px, 9vw, 160px)',
          paddingRight: isMobile ? '24px' : 'clamp(32px, 9vw, 160px)',
          alignItems: 'flex-start',
        }}
      >
        {/* Sunday Nudge */}
        <div style={{ flex: '1 1 0', minWidth: 0, marginTop: isMobile ? 0 : '32px' }}>
          <AppCard
            number="02a"
            kicker="Personal reminders"
            name="Sunday"
            nameAccent="Nudge"
            tagline="Just Text. Just Done."
            desc="No app. No account. Text what you need to remember — get a text back when it's time. Pure SMS, zero friction."
            href="https://sundaynudge.com"
            accentColor="#ec4899"
            borderColor="rgba(236,72,153,0.2)"
            rotation="rotate(-2deg)"
            delay={0.3}
          >
            <Bubble side="left" text="You're all set! Text me what you want to be reminded about." />
            <Bubble side="right" text="Call Acme Plumbing Tue 2pm" />
            <Bubble side="left" text='Create: "Call Acme Plumbing" on Tue Feb 10 at 2:00 PM. Reply YES to save or NO to cancel.' />
            <Bubble side="right" text="YES" />
            <Bubble side="left" text={'Saved! I\'ll remind you about "Call Acme Plumbing" at Tue, Feb 10, 2026, 2:00 PM. Reply LIST anytime.'} />
          </AppCard>
        </div>

        {/* Nudge Together */}
        <div style={{ flex: '1 1 0', minWidth: 0, marginTop: 0 }}>
          <AppCard
            number="02b"
            kicker="Group accountability"
            name="Nudge"
            nameAccent="Together"
            tagline="Accountability, as a group."
            desc="The group version. Invite your team, family, or crew. Everyone gets the nudge. Everyone stays accountable."
            href=""
            comingSoon
            accentColor="#22d3ee"
            borderColor="rgba(34,211,238,0.18)"
            rotation="rotate(1.5deg)"
            delay={0.45}
          >
            <Bubble
              side="left"
              text={'You\'ve been invited to join "Morning Accountability" on Nudge Together! Reply YES to receive group SMS reminders. Msg & data rates may apply.'}
            />
            <Bubble side="right" text="YES" />
            <Bubble
              side="left"
              text={'You\'re in! You\'ve joined "Morning Accountability". Reply DONE when you complete a reminder, TODOS to see todos, or STOP to unsubscribe.'}
            />
          </AppCard>
        </div>
      </div>

      {/* ── Bottom label ── */}
      <motion.p
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(168,85,247,0.4)',
          textTransform: 'uppercase',
          marginTop: '48px',
          paddingLeft: 'clamp(32px, 4vw, 72px)',
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        — AI-led · Human-guided · 2026
      </motion.p>
    </section>
  );
}
