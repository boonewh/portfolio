import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

export const metadata = {
  title: 'PathSix CRM — Project Deep Dive | Will Boone',
  description:
    'A production multi-tenant SaaS CRM built from scratch with React, Quart, and PostgreSQL. Full architecture breakdown, technical highlights, and engineering decisions.',
};

const STACK = ['Vite', 'React', 'TypeScript', 'Quart', 'SQLAlchemy', 'PostgreSQL', 'Alembic', 'Tailwind', 'Fly.io', 'Vercel', 'Backblaze B2'];

const FEATURES = [
  {
    label: 'Multi-tenant architecture',
    body: 'Complete data isolation enforced at the query layer on every endpoint — not just the auth layer — via per-request tenant_id scoping. No possibility of cross-tenant leakage.',
  },
  {
    label: 'White-label tenant config',
    body: 'Each tenant\'s branding, labels, lead statuses, business types, currency, date format, and feature toggles are stored as a JSON blob in PostgreSQL and surfaced to the frontend via a typed useCRMConfig() hook. Full customization with zero code changes or redeployments.',
  },
  {
    label: 'Lead → Client conversion workflow',
    body: 'Full lifecycle state machine: lead capture, assignment, follow-up, conversion to client, project creation, and historical analytics. Interaction history transfers automatically on conversion. Source lead tracked for funnel attribution.',
  },
  {
    label: '13 reporting endpoints',
    body: 'Sales pipeline, lead source conversion rates, revenue by client, MRR/ARR forecasting, follow-up risk, client retention, project performance, upcoming renewals, and converted-lead traceability — covering the full business intelligence surface.',
  },
  {
    label: 'Role-based access control',
    body: 'Many-to-many User ↔ Role model with a reusable @requires_auth(roles=[...]) decorator. Fine-grained capability roles (e.g. file_uploads) beyond simple admin/user splits. JWT with role claims embedded in the token payload.',
  },
  {
    label: 'CSV / XLSX lead import',
    body: 'File preview, dynamic column mapping, encoding detection with fallback, per-row validation, failure capture with diagnostics, and assignment email notifications — built for real-world messy datasets.',
  },
  {
    label: 'Calendar integration',
    body: 'FullCalendar with event styling by status and entity type, drag-and-drop date updates, and backend-generated .ics downloads. Direct Google Calendar and Outlook links from interaction modals.',
  },
  {
    label: 'Encrypted backup pipeline',
    body: 'pg_dump → GPG AES-256 encryption → SHA-256 checksum → Backblaze B2 upload with metadata tracking and retention cleanup. Restore pipeline includes checksum verification, pre-restore safety snapshot, and durable audit logs written to B2.',
  },
];

const TECH = [
  {
    heading: 'Architecture',
    points: [
      'Entity lifecycle state machine: created → assigned → soft-deleted → restored → purged and lead → converted → client',
      'Many-to-many Role model with reusable auth decorators',
      'Storage abstraction layer supporting local disk and S3-compatible vendors — decoupled from application logic',
      'Alembic migrations for all schema changes: foreign keys, JSON columns, composite indexes, new tables',
    ],
  },
  {
    heading: 'Backend',
    points: [
      'Async Python API with Quart (async Flask) and SQLAlchemy ORM — async/await throughout',
      'Pydantic validation schemas on every create/update endpoint with structured error feedback',
      'N+1 eliminated via bulk entity hydration on activity log aggregation',
      'Composite indexes on tenant_id, deleted_at, assigned_to, created_at, contact_date, project_id',
      'Global cross-entity search across clients, leads, projects, accounts, and users with field-level match metadata',
    ],
  },
  {
    heading: 'Frontend',
    points: [
      'React + TypeScript SPA (Vite) — typed throughout with Zod schemas and react-hook-form on all flows',
      'Dynamic tenant-aware UX via useCRMConfig() — labels, statuses, icons, and feature toggles adapt per tenant',
      'Admin workspaces with cross-user filtering, bulk actions, and inline edit flows',
      'Persistent per-user pagination, sort order, and view preferences synced to a backend preferences API',
    ],
  },
  {
    heading: 'Security',
    points: [
      'Stateless JWT (Authlib) with 30-day expiry and role claims in the token payload',
      'bcrypt password hashing + timed itsdangerous reset tokens for account recovery',
      'IP-based sliding-window rate limiting on /login and /forgot-password',
      'Cache-Control: no-store on all sensitive list responses',
    ],
  },
  {
    heading: 'Deployment',
    points: [
      'Backend: Fly.io with region pinning (iad), TLS enforcement, auto-start/stop, and startup DB warm-up retries',
      'Frontend: Vercel with multi-origin CORS allowlist for production, staging, and local',
      'Sentry in both backend and frontend for runtime error capture and performance telemetry',
    ],
  },
];

const CHALLENGES = [
  {
    label: 'Tenant isolation without query bloat',
    body: 'Every query touches tenant_id. The challenge was enforcing this at the query layer on every endpoint without making it a discipline problem — it needed to be structural. The solution was centralizing scoping in SQLAlchemy base queries so it was impossible to forget.',
  },
  {
    label: 'Project ownership inheritance',
    body: 'Visibility rules for projects were ambiguous: project-level assigned_to takes priority, but falls back to the linked client or lead\'s owner. Getting this logic right without creating access gaps required careful query design and explicit test cases for each ownership path.',
  },
  {
    label: 'Cross-entity search at speed',
    body: 'A global search across 5 entity types with field-level match metadata could easily become a performance problem. The solution used targeted indexed queries per entity type with a result union, avoiding full-table scans while still returning useful match context.',
  },
  {
    label: 'Async correctness across the stack',
    body: 'Quart is async Flask, which means mixing sync and async code breaks silently. Every route, helper, and I/O operation — including file handling, email notifications, and database calls — had to be consistently async or the event loop would block.',
  },
];

export default function PathSixCRMPage() {
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <Header />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) 120px' }}>

        {/* Back link */}
        <Link
          href="/#crm"
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '64px' }}
        >
          ← Back
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: '72px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.22em', color: '#ec4899', textTransform: 'uppercase', marginBottom: '16px' }}>
            Project deep dive
          </p>
          <h1 style={{ fontFamily: 'var(--font-alkatra)', fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: 1.0, color: '#ffffff', marginBottom: '24px' }}>
            PathSix <span style={{ color: '#22d3ee' }}>CRM</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '18px', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: '620px', marginBottom: '32px' }}>
            A production multi-tenant SaaS CRM built from scratch for real clients in the field services industry.
            Not a demo. Not a tutorial clone. Designed, architected, and shipped — with AI as a genuine collaborator throughout.
          </p>

          {/* Stack pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
            {STACK.map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '3px', padding: '3px 10px' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="https://pathsixsolutions.com/crm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '4px', padding: '8px 18px' }}
            >
              View live site ↗
            </a>
          </div>
        </div>

        {/* Screenshot */}
        <div style={{ marginBottom: '96px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(34,211,238,0.1)', boxShadow: '0 40px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(34,211,238,0.04)' }}>
          <Image
            src="/images/dashboard.jpg"
            alt="PathSix CRM dashboard"
            width={900}
            height={560}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' }} />

        {/* Overview */}
        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.22em', color: '#a855f7', textTransform: 'uppercase', marginBottom: '20px' }}>Overview</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'var(--font-geist-sans)', fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: '720px' }}>
            <p>
              PathSix CRM handles the full client lifecycle for small business operators — from the first lead contact through conversion, active project management, and subscription tracking. It was built because the off-the-shelf options were either overbuilt for enterprise or too generic to fit how field services businesses actually operate.
            </p>
            <p>
              Every data model, API route, and UI flow was designed intentionally. Multi-tenant isolation, white-label configuration, and a real reporting suite weren't bolted on after the fact — they were architectural decisions made at the start.
            </p>
            <p>
              AI was a genuine collaborator throughout, not autocomplete. Architecture reviews, edge case discovery, query design, and security considerations all happened in conversation. That changed what was achievable in the timeline without cutting corners on quality.
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
              <div key={f.label} style={{ background: '#050505', padding: '28px 28px 28px 28px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.12em', color: '#22d3ee', marginBottom: '10px', textTransform: 'uppercase' }}>
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
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'rgba(34,211,238,0.25)', flexShrink: 0, paddingTop: '2px' }}>
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
            href="/#crm"
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            ← Back to portfolio
          </Link>
          <a
            href="https://pathsixsolutions.com/crm"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.16em', color: '#22d3ee', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            View live site ↗
          </a>
        </div>

      </main>
    </div>
  );
}
