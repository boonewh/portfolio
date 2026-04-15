import Link from 'next/link';
import Header from '@/components/Header';

export const metadata = {
  title: 'The Nudge Products — Project Deep Dive | Will Boone',
  description:
    'Sunday Nudge and Nudge Together — production SMS reminder apps built on a shared pnpm monorepo with Claude Haiku AI parsing, DST-safe scheduling, and TCPA compliance.',
};

const STACK = ['Next.js', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'Twilio', 'Claude Haiku', 'Vitest', 'Vercel', 'pnpm monorepo'];

const SUNDAY_FEATURES = [
  {
    label: 'Natural-language SMS scheduling',
    body: 'Claude Haiku parses free-text messages ("Call Acme Plumbing Tue 2pm") into structured scheduling intents using tool-use mode with Zod-validated output. Confidence scoring below 0.8 routes to a clarification state instead of silently committing bad data.',
  },
  {
    label: 'DST-safe wall clock scheduling',
    body: 'Most scheduling systems store only UTC and drift after daylight saving transitions. Sunday Nudge stores remindAtLocal alongside UTC and re-anchors the UTC value on each cron pass — so a 9am reminder stays at 9am year-round.',
  },
  {
    label: 'Multi-pass cron delivery',
    body: 'A five-pass cron job handles DST re-anchoring, legacy record normalization, primary delivery, 30–90 minute follow-up for ignored reminders, and 14-day purge of stale records. Idempotency guards on reminderSentAt prevent duplicate sends under concurrent execution.',
  },
  {
    label: '14+ SMS commands',
    body: 'LIST, NEXT, DONE, UNDO, DELETE, SNOOZE, STOP, START, HELP, WEB/LOGIN, QUIET, TIMEZONE, PAUSE, RESUME. Fast-path command detection bypasses AI parsing entirely for known keywords — reducing latency and API cost.',
  },
  {
    label: 'Persistent conversation state machine',
    body: 'Multi-turn SMS flows (create, edit, delete, snooze) are handled by a state machine with JSONB-stored pending payloads. States include TTL-backed expiry to prevent stale context from causing incorrect writes.',
  },
  {
    label: 'Full web dashboard',
    body: 'Authenticated dashboard for reminder CRUD, history pagination, timezone config, quiet hours, pause windows, and Sunday check-in settings. Email+password auth with bcrypt, httpOnly cookies, session expiration, and constant-time dummy-hash login.',
  },
];

const TECH_SECTIONS = [
  {
    heading: 'Monorepo',
    points: [
      'pnpm monorepo with two production Next.js apps and a shared @nudge/core TypeScript package',
      'transpilePackages in each app lets Next.js compile TypeScript directly — no separate build step for the shared package',
      'Sub-path exports (@nudge/core/timezone, @nudge/core/recurrence) prevent Node-only modules (Twilio\'s fs/tls dependencies) from leaking into browser bundles',
      'Separate Neon database instances per app for clean compliance and consent isolation',
    ],
  },
  {
    heading: 'AI Integration',
    points: [
      'Claude Haiku in tool-use mode for structured extraction: intent, title, datetime, recurrence, confidence',
      'Zod schema validation on all AI outputs — malformed responses never reach business logic',
      'Deterministic inference: temperature 0, explicit system prompt rules, locked tool_choice',
      'Timezone-aware prompts inject the user\'s local time and timezone to avoid day-boundary errors on relative dates',
    ],
  },
  {
    heading: 'Scheduling',
    points: [
      'Recurrence engine: daily, weekly, monthly, yearly, weekdays, and custom day-list patterns (days:mon,wed,fri)',
      'Calendar edge case handling: month overflow, leap-year rollover, DST transition correction',
      'Quiet hours (quietStart/quietEnd) postpone sends to next window exit — never dropped silently',
      'Pause semantics (pausedUntil) suspend delivery without data loss',
    ],
  },
  {
    heading: 'Security & Compliance',
    points: [
      'Twilio webhook signature validation on all inbound routes to reject spoofed traffic',
      'Mandatory consent gating (consentedAt) — unconsented users blocked until affirmative YES reply',
      'STOP/START compliance with immediate unsubscribe/reactivation semantics (TCPA)',
      'Custom in-memory rate limiter in @nudge/core with progressive warnings before blocking',
      'Cron endpoints secured behind bearer-secret authorization (CRON_SECRET)',
    ],
  },
  {
    heading: 'Testing',
    points: [
      '55+ passing Vitest unit tests covering SMS commands, recurrence, timezone conversion, rate limiting, AI parsing, and state transitions',
      'Mock strategy targets internal package files by direct path rather than barrel imports — ensuring relative imports inside @nudge/core are correctly intercepted',
      'Critical edge cases covered: DST/local-date conversions, leap-year recurrence, AI parser timeout/fallback, command normalization',
    ],
  },
];

const CHALLENGES = [
  {
    label: 'DST and wall clock intent',
    body: 'Storing only UTC timestamps causes wall-clock drift when daylight saving transitions shift the offset. The solution: store remindAtLocal at creation time, then add a cron pre-pass that re-anchors the UTC remindAt on every DST boundary. This is the kind of problem most scheduling systems get wrong the first time — and only discover in production.',
  },
  {
    label: 'AI confidence gating',
    body: 'Calling an LLM and trusting the output is easy. Handling failure modes gracefully is not. Parses scoring below 0.8 don\'t auto-commit — they route to a clarification state where the user confirms before anything writes to the database. This required designing the state machine around the AI\'s uncertainty, not just its success path.',
  },
  {
    label: 'Browser bundle contamination',
    body: 'Importing from a shared package barrel (@nudge/core) caused Twilio\'s Node-only dependencies (fs, tls) to leak into browser bundles, breaking the frontend build. The fix was sub-path exports that create explicit boundaries between Node and browser code — a non-obvious architectural decision that required understanding how Next.js resolves module graphs.',
  },
  {
    label: 'Production lifecycle bug in rescheduling',
    body: 'Rescheduled reminders that had already fired were getting permanently stuck. The root cause: reminderSentAt was not being cleared on reschedule, so the cron\'s WHERE reminderSentAt IS NULL clause never picked them up again. Diagnosing it required tracing the interaction between event status, reminderSentAt, and the cron query — not obvious from any single layer.',
  },
];

export default function NudgePage() {
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <Header />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) 120px' }}>

        {/* Back */}
        <Link
          href="/#ai-builds"
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '64px' }}
        >
          ← Back
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: '72px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.22em', color: '#a855f7', textTransform: 'uppercase', marginBottom: '16px' }}>
            Project deep dive
          </p>
          <h1 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: 1.0, color: '#ffffff', marginBottom: '24px' }}>
            The <span style={{ color: '#ec4899' }}>Nudge</span> Products
          </h1>
          <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '18px', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: '640px', marginBottom: '32px' }}>
            Two production SMS reminder apps — Sunday Nudge (personal) and Nudge Together (group) — built on a shared pnpm monorepo with Claude Haiku AI parsing, DST-safe scheduling, and full TCPA compliance. AI wrote most of the code. I designed the architecture, caught the edge cases, and shipped it.
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
            {STACK.map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '3px', padding: '3px 10px' }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="https://sundaynudge.com" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', color: '#ec4899', border: '1px solid rgba(236,72,153,0.3)', borderRadius: '4px', padding: '8px 18px' }}>
              Sunday Nudge ↗
            </a>
            <a href="https://nudgetogether.com" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '4px', padding: '8px 18px' }}>
              Nudge Together ↗
            </a>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' }} />

        {/* Overview */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#a855f7', textTransform: 'uppercase', marginBottom: '20px' }}>Overview</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'var(--font-geist-sans)', fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: '720px' }}>
            <p>
              The Nudge products start from a simple premise: SMS is the most reliable notification channel that exists, and nobody should need to download an app just to get a reminder. Sunday Nudge is the personal version — text it naturally, it figures out when you mean, and texts you back. Nudge Together extends that to groups.
            </p>
            <p>
              Both apps live in a single pnpm monorepo and share a TypeScript core package (@nudge/core) that centralizes scheduling, timezone conversion, AI parsing, Twilio integration, rate limiting, and logging. The shared package is compiled directly by each app via transpilePackages — no separate build or publish step.
            </p>
            <p>
              The hardest parts weren't the features — they were the edge cases that only show up in production: DST transitions drifting scheduled times, AI parses that are probably right but not certainly right, and browser bundles breaking because a shared package imported a Node-only module. Getting those right is what separates a deployed app from a demo.
            </p>
          </div>
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' }} />

        {/* Sunday Nudge features */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#ec4899', textTransform: 'uppercase', marginBottom: '20px' }}>Sunday Nudge</p>
          <h2 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(32px, 5vw, 52px)', color: '#ffffff', marginBottom: '12px', lineHeight: 1.1 }}>
            What it does
          </h2>
          <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', maxWidth: '600px', marginBottom: '48px' }}>
            A production SMS reminder app running at sundaynudge.com on a verified Twilio toll-free number. Real users, real reminders.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
            {SUNDAY_FEATURES.map((f) => (
              <div key={f.label} style={{ background: '#050505', padding: '28px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.12em', color: '#ec4899', marginBottom: '10px', textTransform: 'uppercase' }}>
                  {f.label}
                </p>
                <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '14px', lineHeight: 1.75, color: 'rgba(255,255,255,0.42)' }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Nudge Together */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#22d3ee', textTransform: 'uppercase', marginBottom: '20px' }}>Nudge Together</p>
          <h2 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(32px, 5vw, 52px)', color: '#ffffff', marginBottom: '12px', lineHeight: 1.1 }}>
            The group version
          </h2>
          <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', maxWidth: '640px', marginBottom: '32px' }}>
            Nudge Together extends the same SMS-native architecture to group accountability. Invite a team, family, or crew — everyone receives the reminder, everyone can mark it done. Built on the same @nudge/core shared package with separate database isolation per product for clean consent and compliance boundaries.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Shared group reminders delivered via SMS — no app, no login required for members',
              'Consent-gated onboarding: members blocked until affirmative YES reply (TCPA)',
              'STOP/START compliance with immediate unsubscribe and reactivation semantics',
              'Separate Neon database instance for clean per-product consent records',
              'Admin tooling: user inspection, consent monitoring, plan tier management (trial, friends_family, paid)',
            ].map((pt) => (
              <div key={pt} style={{ display: 'flex', gap: '12px', fontFamily: 'var(--font-geist-sans)', fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.42)' }}>
                <span style={{ color: '#22d3ee', flexShrink: 0 }}>—</span>
                {pt}
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' }} />

        {/* Technical Architecture */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#a855f7', textTransform: 'uppercase', marginBottom: '20px' }}>Technical Architecture</p>
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
                      <span style={{ color: '#a855f7', flexShrink: 0, marginTop: '2px' }}>—</span>
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
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#a855f7', textTransform: 'uppercase', marginBottom: '20px' }}>Engineering Challenges</p>
          <h2 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(32px, 5vw, 52px)', color: '#ffffff', marginBottom: '48px', lineHeight: 1.1 }}>
            Where it got interesting
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {CHALLENGES.map((c, i) => (
              <div key={c.label} style={{ display: 'flex', gap: '28px' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'rgba(168,85,247,0.25)', flexShrink: 0, paddingTop: '2px' }}>
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
            href="/#ai-builds"
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            ← Back to portfolio
          </Link>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="https://sundaynudge.com" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', color: '#ec4899', textTransform: 'uppercase', textDecoration: 'none' }}>
              Sunday Nudge ↗
            </a>
            <a href="https://nudgetogether.com" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', color: '#22d3ee', textTransform: 'uppercase', textDecoration: 'none' }}>
              Nudge Together ↗
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}
