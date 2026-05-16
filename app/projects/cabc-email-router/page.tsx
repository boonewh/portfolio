import Link from 'next/link';
import Header from '@/components/Header';

export const metadata = {
  title: 'CABC Email Router — Project Deep Dive | Will Boone',
  description:
    'A production Stripe webhook processor and email routing system for the Compass Athletic Booster Club. Full architecture breakdown, technical decisions, and engineering challenges.',
};

const STACK = ['Next.js', 'TypeScript', 'React', 'Supabase', 'PostgreSQL', 'Resend', 'Stripe', 'Vercel'];

const FEATURES = [
  {
    label: 'Configurable email routing',
    body: 'Routes map Stripe product and price IDs to recipient email lists, subject templates, and branded message content. Adding a new product or reassigning who gets notified is a form submission in the admin — no code changes, no redeployment.',
  },
  {
    label: 'Stripe data normalization',
    body: 'Customer data arrives from Stripe fragmented across checkout custom fields, the customer object, customer_details, collected_information, and billing details on the payment intent. The system resolves the correct name, email, phone, business name, student name, and organization across all of them — using fuzzy label matching to handle variations like "customer name," "full name," and "buyer name" across different form designs.',
  },
  {
    label: 'Webhook idempotency',
    body: 'Events are recorded and processed in two separate phases. A unique constraint on stripe_event_id catches duplicates at the database layer before any processing begins. Purchase notifications deduplicate independently on stripe_checkout_session_id + stripe_price_id, so retries and replays never double-send.',
  },
  {
    label: 'Per-recipient attempt tracking',
    body: 'Every email send is recorded individually — recipient, subject, Resend message ID, status, and any error. A notification is only marked "sent" if every recipient succeeds. One failure marks the whole notification "failed" with enough detail to know exactly which address had issues.',
  },
  {
    label: 'Fulfillment workflow',
    body: 'Notifications carry two independent status tracks: delivery status (pending → sent / failed) and fulfillment status (new → in progress → fulfilled / blocked). Admins update fulfillment manually with notes after the purchase has been acted on.',
  },
  {
    label: 'Purchase reporting and CSV export',
    body: 'Report pages aggregate purchases by product with revenue totals, filter by date range and fulfillment status, and export filtered datasets to CSV. The same filter object drives both the query and the export URL — no duplicated logic.',
  },
  {
    label: 'Health monitoring',
    body: 'A health check page verifies all six required environment variables, surfaces the last successfully processed webhook event, and shows the last failed event with its error — enough to diagnose configuration problems without touching logs.',
  },
  {
    label: 'Magic link authentication',
    body: 'Admin access requires a verified email address in the admin_users table. Sign-in is passwordless — an email with a sign-in link, no credentials to manage. Supabase Auth handles the OTP flow with a route callback that supports both PKCE code exchange and token hash verification, covering first-time and returning users correctly.',
  },
];

const TECH = [
  {
    heading: 'Architecture',
    points: [
      'Stripe webhook → two-phase record/process pipeline → route match → per-recipient email dispatch → attempt logging → fulfillment tracking',
      'Dual-status model separating delivery outcome from business fulfillment state',
      'Service client / user client separation in Supabase: service role for backend writes, anon key for auth-dependent operations',
      'revalidatePath cache invalidation on all admin mutations for fresh server-rendered data',
    ],
  },
  {
    heading: 'Backend',
    points: [
      'Single expanded Stripe API call per event: customer, payment_intent.latest_charge, and line_items.data.price.product resolved in one request',
      'Fuzzy custom field matching normalizes keys across any form design variation',
      'Customer name deduplication: if resolved name equals business name, returns null rather than repeating data',
      'Database-layer duplicate detection via Postgres error code 23505 — no pre-query needed',
      'Resend sender normalization handles accidental env var prefix duplication and quoted values',
    ],
  },
  {
    heading: 'Admin UI',
    points: [
      'Server Components throughout with server actions for mutations — no client-side data fetching',
      'Zod schema validation on every server action before any database write',
      'Raw Stripe event JSON viewer on notification detail pages for debugging',
      'Route editor with expandable inline forms — no page navigation required to manage configuration',
    ],
  },
  {
    heading: 'Auth',
    points: [
      'Supabase magic link with PKCE flow: code verifier stored in server action cookies for proper exchange at callback',
      'Callback route handles both ?code= (returning users) and ?token_hash=&type= (first-time confirmation) — two different URL formats Supabase sends depending on whether the user exists',
      'requireAdmin() enforces email allow-list check on every protected route after session verification',
    ],
  },
];

const CHALLENGES = [
  {
    label: "Extracting clean customer data from Stripe's fragmented model",
    body: 'Stripe surfaces customer information in at least ten places across a checkout session, and the right value for "customer name" depends on which fields the merchant configured and which ones the customer filled in. The normalization layer resolves a deterministic priority order across custom fields (with fuzzy label matching), the Stripe customer object, session customer_details, collected_information, and billing details — handling deleted objects, polymorphic fields, and the edge case where a sole proprietor\'s customer name and business name are identical.',
  },
  {
    label: 'Webhook idempotency without pessimistic locking',
    body: 'Stripe can and does send duplicate events. The solution uses two layers: a unique constraint on stripe_event_id catches duplicate webhook deliveries immediately, and a separate unique constraint on session_id + price_id catches cases where the same purchase appears through different events. Both are enforced at the database layer — no pre-query, no race condition.',
  },
  {
    label: 'The two-path auth callback',
    body: 'Supabase sends different URL formats for first-time versus returning users: ?code= for users who already exist, ?token_hash=&type= for new accounts going through email confirmation. The original callback only handled one path. Discovering the discrepancy required reading Supabase audit logs to compare user_recovery_requested versus user_confirmation_requested events, then updating the callback to branch on whichever parameter is present.',
  },
  {
    label: 'PKCE verifier storage in a server action',
    body: 'signInWithOtp generates a PKCE code verifier that needs to be stored in a cookie so the callback can exchange the code. Called from a Next.js server action using a client with a no-op setAll, the verifier was silently lost — causing "no auth token" at the callback for any user who requested a new link. The fix required creating the Supabase client inline in the action with a setAll implementation that actually writes to the cookie store, which is valid in server actions even though it isn\'t in Server Components.',
  },
];

const PIPELINE = [
  { label: 'Stripe Checkout', sub: 'checkout.session.completed' },
  { label: 'Webhook Handler', sub: 'record → idempotency guard' },
  { label: 'Route Match', sub: 'product_id → recipient config' },
  { label: 'Email Dispatch', sub: 'per-recipient + attempt log' },
  { label: 'Admin Dashboard', sub: 'fulfillment tracking + CSV export' },
];

export default function CABCEmailRouterPage() {
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <Header />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) 120px' }}>

        {/* Back link */}
        <Link
          href="/#cabc"
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '64px' }}
        >
          ← Back
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: '72px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.22em', color: '#ec4899', textTransform: 'uppercase', marginBottom: '16px' }}>
            Project deep dive
          </p>
          <h1 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 1.0, color: '#ffffff', marginBottom: '24px' }}>
            CABC Email <span style={{ color: '#f97316' }}>Router</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '18px', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: '620px', marginBottom: '32px' }}>
            A production Stripe webhook processor and email routing system built for a real booster club —
            not a demo, not a tutorial. Designed, architected, and shipped to handle real financial transactions
            and automate purchase fulfillment notifications end to end.
          </p>

          {/* Stack pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {STACK.map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '3px', padding: '3px 10px' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Admin access note */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 14px', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '4px', background: 'rgba(249,115,22,0.04)' }}>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(249,115,22,0.6)', textTransform: 'uppercase' }}>
              Admin access is passwordless — magic link protected
            </span>
          </div>
        </div>

        {/* Pipeline visualization (replaces screenshot) */}
        <div style={{ marginBottom: '96px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0, padding: '32px', background: 'rgba(249,115,22,0.02)', border: '1px solid rgba(249,115,22,0.08)', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(249,115,22,0.4)', textTransform: 'uppercase', marginBottom: '24px' }}>
              Event pipeline
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
              {PIPELINE.map((stage, i) => (
                <div key={stage.label}>
                  <div style={{ padding: '12px 18px', border: '1px solid rgba(249,115,22,0.18)', borderRadius: '5px', background: 'rgba(249,115,22,0.03)', minWidth: '260px' }}>
                    <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'rgba(249,115,22,0.85)', textTransform: 'uppercase', marginBottom: '3px' }}>
                      {stage.label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em' }}>
                      {stage.sub}
                    </p>
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <div style={{ marginLeft: '24px', height: '20px', width: '1px', background: 'rgba(249,115,22,0.2)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' }} />

        {/* Overview */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#a855f7', textTransform: 'uppercase', marginBottom: '20px' }}>Overview</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'var(--font-geist-sans)', fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: '720px' }}>
            <p>
              The Compass Athletic Booster Club needed a way to automatically route Stripe purchase notifications
              to the right people. A parent buys a spirit pack, a corporate sponsor submits a contribution, a
              student registers for an event — each of those needs to land in a different inbox, with the right
              context, immediately. No manual forwarding. No checking dashboards.
            </p>
            <p>
              CABC Email Router sits between Stripe and the people who need to act. It ingests webhook events,
              normalizes messy customer data from a dozen possible Stripe sources, matches each purchase to a
              configured route, and dispatches templated emails to the right recipients — then tracks every
              attempt and surfaces everything in an admin dashboard built for non-technical operators.
            </p>
            <p>
              The system handles real money and real people. That meant idempotency, auditability, and
              operational observability weren&apos;t afterthoughts — they were requirements from the start.
            </p>
          </div>
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' }} />

        {/* Core Features */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#a855f7', textTransform: 'uppercase', marginBottom: '20px' }}>Core Features</p>
          <h2 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(32px, 5vw, 52px)', color: '#ffffff', marginBottom: '48px', lineHeight: 1.1 }}>
            What it actually does
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
            {FEATURES.map((f) => (
              <div key={f.label} style={{ background: '#050505', padding: '28px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.12em', color: '#f97316', marginBottom: '10px', textTransform: 'uppercase' }}>
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

        {/* Technical Highlights */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#a855f7', textTransform: 'uppercase', marginBottom: '20px' }}>Technical Highlights</p>
          <h2 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(32px, 5vw, 52px)', color: '#ffffff', marginBottom: '56px', lineHeight: 1.1 }}>
            Under the hood
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
            {TECH.map((section) => (
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
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'rgba(249,115,22,0.25)', flexShrink: 0, paddingTop: '2px' }}>
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
            href="/#cabc"
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            ← Back to portfolio
          </Link>
        </div>

      </main>
    </div>
  );
}
