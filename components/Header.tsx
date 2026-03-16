'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Built w/ AI',  href: '#crm'       },
  { label: 'AI First',     href: '#ai-builds'  },
  { label: 'Web Work',     href: '#web-work'   },
  { label: 'Blog',         href: '/blog'       },
  { label: 'Contact',      href: '#contact'    },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <header
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: 50,
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(24px, 4vw, 48px)',
          height: '64px',
        }}
        aria-label="Global"
      >
        {/* Logo */}
        <a
          href="#"
          style={{ textDecoration: 'none', flexShrink: 0 }}
          aria-label="Will Boone — home"
        >
          <span
            style={{
              fontFamily: 'var(--font-kaushan-script)',
              fontSize: '22px',
              color: '#ffffff',
              letterSpacing: '0.01em',
            }}
          >
            Will Boone
          </span>
        </a>

        {/* Desktop nav */}
        <div
          className="hidden lg:flex"
          style={{ alignItems: 'center', gap: '32px' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.5)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {link.label}
            </a>
          ))}

          {/* PathSix Solutions — styled as external CTA */}
          <a
            href="https://pathsixsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: '#22d3ee',
              border: '1px solid rgba(34,211,238,0.3)',
              borderRadius: '4px',
              padding: '5px 12px',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(34,211,238,0.08)';
              e.currentTarget.style.borderColor = 'rgba(34,211,238,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)';
            }}
          >
            PathSix ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.7)',
            padding: '8px',
          }}
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>

    </header>

    {/* Mobile menu — outside <header> to avoid backdrop-filter containing block issue */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.6)' }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              inset: '0 0 0 auto',
              zIndex: 51,
              width: '280px',
              background: '#0d0d0d',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Close */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <span style={{ fontFamily: 'var(--font-kaushan-script)', fontSize: '20px', color: '#fff' }}>
                Will Boone
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '4px' }}
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '12px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: 'rgba(255,255,255,0.85)',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* PathSix Solutions */}
            <a
              href="https://pathsixsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                marginTop: '32px',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#22d3ee',
                border: '1px solid rgba(34,211,238,0.3)',
                borderRadius: '4px',
                padding: '10px 16px',
                textAlign: 'center',
              }}
            >
              PathSix Solutions ↗
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
