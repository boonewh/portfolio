import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

export const metadata = {
  title: 'OSG Belles & Beaux Platform — Project Deep Dive | Will Boone',
  description:
    'A production QuickBooks Online integration and student registration system for the Odessa Symphony Guild — built against a hard deadline, with automated invoice creation, signed webhooks, and a dual-format CloudEvents migration.',
};

const STACK = ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'QuickBooks Online API', 'Intuit OAuth 2.0', 'Zod', 'React Hook Form', 'Web Crypto API', 'Vercel'];

const FEATURES = [
  {
    label: 'QuickBooks OAuth 2.0',
    body: 'Full Intuit OAuth flow: authorization endpoint, callback handler, token exchange, and secure storage. Tokens encrypted at rest with AES-256-GCM using environment-managed keys. Automatic access token refresh on expiry, including refresh-token expiry handling.',
  },
  {
    label: 'Webhook-driven paid status',
    body: 'When payment clears in QuickBooks, a signed HMAC-SHA256 webhook fires and updates the student\'s record in Supabase. Payment events don\'t contain Invoice IDs directly — the handler traverses Payment.Line[].LinkedTxn[] to find the linked invoice, then matches against the stored qb_invoice_id. The handler also detects and supports Intuit\'s CloudEvents envelope format alongside the legacy eventNotifications structure, covering their mandatory 2026 migration.',
  },
  {
    label: 'Edge-compatible session security',
    body: 'Admin session validation originally used Node.js crypto — which breaks on the Next.js Edge runtime. Rewrote HMAC-SHA256 verification using Web Crypto API (crypto.subtle) for full Edge middleware compatibility. httpOnly, sameSite=strict, secure cookies with 8-hour bounded lifetime.',
  },
  {
    label: '3-step enrollment flow',
    body: 'Student registration with React Hook Form + Zod step-aware validation. Dynamic guardian system (1–4 guardians) with useFieldArray, relationship selection, and a "same address as Guardian 1" checkbox that auto-copies fields. Zod superRefine enforces cross-field rules: at least one guardian email required for invoice delivery.',
  },
  {
    label: 'Live dues and reCAPTCHA',
    body: 'Dues and late fees loaded from a settings API at runtime with resilient hardcoded fallback. Grade-aware membership logic auto-assigns freshman pricing. Google reCAPTCHA v2 on the client with server-side token verification to prevent bot submissions.',
  },
  {
    label: 'Legal consent and e-signature',
    body: 'Media release authorization embedded directly into the signup flow — capturing guardian consent, social media opt-out, e-signature, and submission timestamp. Stored per-student alongside the enrollment record.',
  },
  {
    label: 'Graceful degradation',
    body: 'QuickBooks failures at any stage — invoice creation, customer lookup, payment link generation — do not block student registration persistence. The enrollment saves to Supabase first; QB operations are best-effort with logged errors and retry paths.',
  },
  {
    label: 'Admin tooling',
    body: 'Real-time roster with search, grade filter, paid/unpaid filter, KPI summary cards, and one-click payment status toggle. Print-optimized layout with hidden controls. Pricing panel for 6 configurable dues/fee keys with live updates reflected immediately on the public join form.',
  },
];

const TECH_SECTIONS = [
  {
    heading: 'Security',
    points: [
      'AES-256-GCM encryption for QuickBooks OAuth tokens at rest',
      'HMAC-SHA256 webhook signature verification with timingSafeEqual (timing-safe comparison)',
      'Web Crypto API (crypto.subtle) for Edge-compatible admin session validation',
      'httpOnly, sameSite=strict, secure session cookies with 8-hour lifetime',
      'All /admin/* routes protected via Next.js middleware with Edge-compatible session verification',
      'Secure response headers: no-cache, nosniff, DENY framing on all sensitive API routes',
    ],
  },
  {
    heading: 'Database',
    points: [
      'Supabase migration set covering students, encrypted QB tokens, settings, guardian expansion, and media-release fields',
      'Flexible 1–4 guardian arrays mapped to 36 relational DB columns with zero data loss for existing records',
      'Student records scoped by school year for clean multi-year data isolation',
      'Backward compatibility: supports both new guardian_N_* columns and legacy mom_*/dad_* records in display',
      'Supabase service role key for trusted server-side operations; RLS preserved for public routes',
    ],
  },
  {
    heading: 'QuickBooks',
    points: [
      'Dual-format webhook handler: runtime detection of legacy eventNotifications vs CloudEvents envelope — both paths normalize to the same downstream logic, making the Intuit portal toggle the deployment mechanism rather than a code deployment',
      'Customer find-or-create flow keyed by primary email to avoid duplicate payer records',
      'Invoices with due dates, line items, and ACH/credit-card online payment enabled (AllowOnlinePayment: true)',
      'Multi-recipient invoice delivery for additional guardian email addresses',
      'intuit_tid correlation IDs logged on all QB API calls for production debugging',
      'MOCK_PAYMENT_MODE feature flag with singleton mock QB client — full local dev without live credentials',
    ],
  },
  {
    heading: 'Frontend',
    points: [
      'React Hook Form + Zod with step-aware validation and progressive completion UX',
      'useFieldArray for dynamic guardian management with add/remove and conditional field copying',
      'Zod superRefine for cross-field business rules across dynamic arrays',
      'Live phone number formatting during keypress for student and guardian inputs',
      'Live dues loaded from settings API with resilient hardcoded fallback',
    ],
  },
];

const CHALLENGES = [
  {
    label: "Navigating Intuit's production approval process against a hard deadline",
    body: "The deadline wasn't a project milestone — it was a parent and student meeting where the system needed to be live and working that night. Intuit's production app review process, however, is sequential: one issue is surfaced per round, a rejection is sent, and the reviewer waits for resubmission before looking further. The first rejection arrived with no explanation — a follow-up email was required just to find out what needed fixing. Subsequent rounds surfaced a legal counsel review requirement and two separate reCAPTCHA flags. Approval came through in time. Getting there required treating every resubmission as the last available opportunity — proactively documenting compliance and anticipating what a reviewer might flag next rather than waiting to be told.",
  },
  {
    label: 'QuickBooks webhook reliability',
    body: "QuickBooks does not reliably fire Invoice Update events when a payment is applied. Relying on Invoice events alone would mean payments that go through in QuickBooks silently fail to update the roster. The solution listens primarily for Payment Create and Update events — when one arrives, a secondary QBO API call fetches the payment record, traverses the linked transaction list, and extracts the invoice ID. That ID is matched against the stored qb_invoice_id in Supabase. The Invoice Update path is retained as a secondary route but is not the primary mechanism.",
  },
  {
    label: 'Edge runtime crypto rewrite',
    body: 'The original admin session validation used Node.js crypto module, which is unavailable in the Next.js Edge runtime. Middleware runs on the Edge, so all Node APIs break silently or throw. The fix was a full rewrite to Web Crypto API (crypto.subtle) — same algorithm, different API surface, with async/await throughout since crypto.subtle is promise-based unlike the synchronous Node version.',
  },
  {
    label: 'Mandatory platform migration with a live production system',
    body: "Intuit mandated that all webhook consumers migrate from their legacy payload format to the CloudEvents envelope structure. The legacy format wraps events in an eventNotifications object; the CloudEvents format is a top-level JSON array where entity name and operation are encoded in a type field like qbo.payment.created.v1. Rather than a hard cutover, the handler was updated to detect the format at runtime and route to the appropriate parser — both paths normalize to the same downstream logic. The portal toggle in the Intuit Developer Portal becomes the deployment mechanism: it can be flipped on, tested, and rolled back without touching code.",
  },
];

export default function OSGPage() {
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <Header />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) 120px' }}>

        {/* Back */}
        <Link
          href="/#osg"
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '64px' }}
        >
          ← Back
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: '72px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.22em', color: '#22c55e', textTransform: 'uppercase', marginBottom: '16px' }}>
            Project deep dive
          </p>
          <h1 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(42px, 7vw, 96px)', lineHeight: 1.0, color: '#ffffff', marginBottom: '24px' }}>
            Belles &amp; Beaux <span style={{ color: '#22c55e' }}>Platform</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '18px', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: '640px', marginBottom: '32px' }}>
            A production QuickBooks Online integration and student registration system built for a real
            performing arts organization — not a demo, not a tutorial. Designed, architected, and shipped
            to handle real dues payments and automate the entire signup-to-paid workflow against a fixed
            real-world deadline.
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
            {STACK.map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '3px', padding: '3px 10px' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="https://www.odessasymphonyguild.org/belles-beaux"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '4px', padding: '8px 18px' }}
            >
              Belles &amp; Beaux program ↗
            </a>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em' }}>
              public program page — not the admin system
            </span>
          </div>
        </div>

        {/* Screenshots */}
        <div style={{ marginBottom: '96px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(34,197,94,0.1)', boxShadow: '0 40px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(34,197,94,0.04)' }}>
            <Image
              src="/images/belles_beaux_hero_capture.jpg"
              alt="Odessa Symphony Guild Belles & Beaux public program page"
              width={900}
              height={560}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(34,197,94,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
            <Image
              src="/images/admin-panel-top.jpg"
              alt="Belles & Beaux admin roster"
              width={900}
              height={280}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' }} />

        {/* Overview */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#22c55e', textTransform: 'uppercase', marginBottom: '20px' }}>Overview</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'var(--font-geist-sans)', fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: '720px' }}>
            <p>
              The Odessa Symphony Guild&apos;s Belles &amp; Beaux program needed a way for incoming students
              and their parents to register and pay dues online. The existing process was manual —
              paper forms, chased invoices, no automation. The replacement needed to be live and working
              for one specific event: the program&apos;s parent and student meeting, where signups were
              expected to happen that night.
            </p>
            <p>
              That deadline wasn&apos;t a soft target. It was a room full of parents with phones in their hands.
            </p>
            <p>
              The system handles the full workflow end to end. A student fills out a multi-step registration
              form, a QuickBooks invoice is created automatically in the background, the parent is redirected
              to QuickBooks&apos; hosted payment page, and a signed webhook fires when payment clears —
              marking the student as paid in the roster without anyone touching a dashboard. If a parent
              exits before paying and returns days later via the invoice email, the webhook still fires
              and the roster still updates automatically.
            </p>
          </div>
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' }} />

        {/* Features */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#22c55e', textTransform: 'uppercase', marginBottom: '20px' }}>Features</p>
          <h2 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(32px, 5vw, 52px)', color: '#ffffff', marginBottom: '48px', lineHeight: 1.1 }}>
            What it does
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
            {FEATURES.map((f) => (
              <div key={f.label} style={{ background: '#050505', padding: '28px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.12em', color: '#22c55e', marginBottom: '10px', textTransform: 'uppercase' }}>
                  {f.label}
                </p>
                <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '14px', lineHeight: 1.75, color: 'rgba(255,255,255,0.42)' }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' }} />

        {/* Technical highlights */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#22c55e', textTransform: 'uppercase', marginBottom: '20px' }}>Technical Highlights</p>
          <h2 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(32px, 5vw, 52px)', color: '#ffffff', marginBottom: '56px', lineHeight: 1.1 }}>
            Under the hood
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
            {TECH_SECTIONS.map((section) => (
              <div key={section.heading} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '32px', alignItems: 'start' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', paddingTop: '4px' }}>
                  {section.heading}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {section.points.map((pt) => (
                    <li key={pt} style={{ display: 'flex', gap: '12px', fontFamily: 'var(--font-geist-sans)', fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.45)' }}>
                      <span style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }}>—</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' }} />

        {/* Engineering Challenges */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#22c55e', textTransform: 'uppercase', marginBottom: '20px' }}>Engineering Challenges</p>
          <h2 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(32px, 5vw, 52px)', color: '#ffffff', marginBottom: '48px', lineHeight: 1.1 }}>
            Where it got interesting
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {CHALLENGES.map((c, i) => (
              <div key={c.label} style={{ display: 'flex', gap: '28px' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'rgba(34,197,94,0.25)', flexShrink: 0, paddingTop: '2px' }}>
                  0{i + 1}
                </span>
                <div>
                  <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px', letterSpacing: '0.1em', color: '#ffffff', marginBottom: '10px', textTransform: 'uppercase' }}>
                    {c.label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.42)', maxWidth: '640px' }}>
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer nav */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link
            href="/#osg"
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            ← Back to portfolio
          </Link>
          <a
            href="https://www.odessasymphonyguild.org/belles-beaux"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', color: '#22c55e', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            Belles &amp; Beaux program ↗
          </a>
        </div>

      </main>
    </div>
  );
}
