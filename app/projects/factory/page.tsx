import Link from 'next/link';
import Header from '@/components/Header';

export const metadata = {
  title: 'The Factory — A Three-Agent AI Development Setup',
  description:
    'How I run a lead, a reviewer and a tester as separate AI agents that build, review, test and deploy real features, and what happened on the first real task.',
};

const ACCENT = '#22c55e';

const STACK = ['Solo', 'Claude Code', 'Codex CLI', 'OpenCode', 'Python', 'PostgreSQL', 'Fly.io'];

const CAST = [
  {
    role: 'Lead',
    who: 'Claude Code · Claude Opus',
    does: 'Owns the task from start to finish: plans, writes code, hands off work, reads the reports, fixes, merges and deploys to dev.',
    not: 'Runs no tests and never waits on them.',
    color: '#22c55e',
  },
  {
    role: 'Reviewer',
    who: 'OpenAI Codex',
    does: 'Reviews every change against the acceptance criteria. Writes code when the lead assigns it.',
    not: 'Can’t push, merge, deploy or run tests.',
    color: '#a855f7',
  },
  {
    role: 'Tester',
    who: 'OpenCode · free open-weight model',
    does: 'Writes tests, and is the only agent that runs anything: test suites, linters, builds, migration rehearsals.',
    not: 'Can’t push, merge or deploy.',
    color: '#22d3ee',
  },
  {
    role: 'Owner',
    who: 'Me',
    does: 'Sets the scope, makes product and risk decisions, and approves anything that touches production.',
    not: '',
    color: '#ec4899',
  },
];

const WHY = [
  {
    label: 'Independence',
    body: 'The agent that wrote the code is the worst one to judge it. A separate reviewer and a separate tester catch what the author misses, and on the first run they did.',
  },
  {
    label: 'Cost',
    body: 'Running tests is slow and uses a lot of tokens, but it doesn’t need a frontier model. Giving all test execution to a free model keeps the expensive models on the thinking work.',
  },
  {
    label: 'Throughput',
    body: 'While the tester spends fifteen minutes on a full run, the reviewer reads the diff and the lead moves on. Nobody sits waiting.',
  },
];

const LOOP = [
  'The lead updates the task record and sends a short instruction straight into the other agent’s terminal.',
  'It checks that agent’s output to confirm the work actually started.',
  'It sets a Solo timer that wakes it when that agent goes idle. Idle means “go check for a report”, not “done”.',
  'It reads the report, records it on the task, fixes confirmed issues and asks for a recheck against the new commit.',
  'If something hasn’t settled after two review rounds, or the decision belongs to me, it escalates.',
];

const GUARDRAILS = [
  { label: 'Production is off-limits', body: 'Nothing touches production unless I say so, every time. Deploys go to a dedicated dev environment that runs the same row-level security as production.' },
  { label: 'Synthetic data only', body: 'Tests and the dev environment never see real customer data.' },
  { label: 'No secrets in prompts', body: 'The admin database credential is encrypted on my machine and only ever piped into commands, never printed.' },
  { label: 'Scope lock', body: 'The approved plan is the authorized work. Agents may fix bugs they find; anything new is written down as a future consideration and brought to me.' },
  { label: 'Isolated branches', body: 'Each coding task gets its own git worktree and branch, so two agents can write code at once. Work merges to an integration branch, and CI runs the full suite on every push.' },
  { label: 'Honest reporting', body: 'Every report lists what was not verified as plainly as what was.' },
];

const RUN = [
  { label: 'Implementation', body: 'The lead built the change, and while reading the surrounding code it found a latent bug: an archive feature serialized every column to JSON, and a UUID value would have crashed it. Fixed before anything shipped.' },
  { label: 'Review and test in parallel', body: 'The reviewer came back with two medium findings and one low. Meanwhile the tester wrote six acceptance tests and ran them alongside about 700 existing ones.' },
  { label: 'A real regression, caught', body: 'One existing security test failed. The tester ran it against the previous commit, showed it passed there, proved the new code caused the failure, diagnosed why, and reported it without touching the code.' },
  { label: 'Fixes and one disagreement', body: 'The lead fixed the regression and accepted the review findings, except one it accepted only in part. It told me which, and why.' },
  { label: 'Stronger tests', body: 'The reviewer pushed for tighter tests, and the lead wrote two more.' },
  { label: 'A bug in the test itself', body: 'In round three, two agents independently found the same bug in the lead’s new test (a database savepoint released after PostgreSQL had already aborted it) and proposed the same fix. My rule is to escalate after two rounds; the lead went ahead because the fix was mechanical and agreed on, and told me it had. I was fine with that.' },
  { label: 'Green', body: 'All 8 new tests passed, along with every relevant test tier and the full CI run.' },
  { label: 'Deployed and verified', body: 'The lead merged, deployed and migrated the dev environment, then connected as the app’s restricted database user and confirmed that all 129 existing records had a unique UUID and that tenant isolation still held.' },
];

const NUMBERS = [
  { val: '8', label: 'review findings', sub: '7 accepted, 1 in part with reasoning' },
  { val: '1', label: 'regression caught', sub: 'by the tester, before it shipped' },
  { val: '1', label: 'latent crash fixed', sub: 'found by the lead along the way' },
  { val: '~700', label: 'existing tests rerun', sub: 'plus the full suite in CI' },
  { val: '3', label: 'review rounds', sub: 'one past the escalation rule, flagged' },
  { val: '0', label: 'production systems touched', sub: '' },
];

const ROUGH = [
  { label: 'Sandboxes', body: 'Each agent starts scoped to one folder. The reviewer couldn’t write to the backend repo until I restarted it with extra folders allowed. We checked access with a throwaway file before starting real work, which was the right call.' },
  { label: 'Message delivery', body: 'Messages sent to the reviewer often land in its input box without being submitted, so the lead learned to check and press Enter.' },
  { label: 'Reporting', body: 'The helper agents can’t comment on the shared task yet, so the lead copies their reports from the terminal into the record. It works, but it’s manual.' },
  { label: 'Windows', body: 'The first migration attempt failed harmlessly because PowerShell appended a carriage return to a piped connection string. It was caught before anything changed, fixed, and added to the runbook.' },
  { label: 'Speed', body: 'The free model is thorough but slow, around fifteen minutes per full set of test tiers. Running review in parallel hides most of that.' },
];

const LESSONS = [
  { label: 'Define “done” as tests, up front', body: 'Every acceptance criterion is written as a test before work starts. That ends arguments about whether something works.' },
  { label: 'Separate writing from verifying', body: 'The regression and the bug in the test were both caught by an agent that didn’t write the code.' },
  { label: 'Pin every claim to a commit', body: 'Reviews and test runs name the exact revision they covered, so nothing gets credit for code it never saw.' },
  { label: 'Let the lead disagree, but make it say so', body: 'Reviews get better when they’re treated as input rather than orders, and the reasoning is written down.' },
  { label: 'Write the boundaries down', body: 'Who can commit, push, merge and deploy, and where, lives in one short file every agent reads.' },
  { label: 'Prove it on one real task first', body: 'I didn’t hand the factory a backlog until it had finished one task end to end and I’d read the whole report.' },
];

const mono = 'var(--font-geist-mono)';
const sans = 'var(--font-geist-sans)';
const display = 'var(--font-alkatra)';

const eyebrow = { fontFamily: mono, fontSize: '10px', letterSpacing: '0.22em', color: '#a855f7', textTransform: 'uppercase' as const, marginBottom: '20px' };
const h2 = { fontFamily: display, fontSize: 'clamp(32px, 5vw, 52px)', color: '#ffffff', marginBottom: '40px', lineHeight: 1.1 };
const prose = { display: 'flex', flexDirection: 'column' as const, gap: '20px', fontFamily: sans, fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: '720px' };
const divider = { height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '96px' };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' };
const cellLabel = { fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', color: ACCENT, marginBottom: '10px', textTransform: 'uppercase' as const };
const cellBody = { fontFamily: sans, fontSize: '14px', lineHeight: 1.75, color: 'rgba(255,255,255,0.42)' };

function Numbered({ items }: { items: { label: string; body: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {items.map((c, i) => (
        <div key={c.label} style={{ display: 'flex', gap: '24px' }}>
          <span style={{ fontFamily: mono, fontSize: '13px', color: 'rgba(34,197,94,0.35)', flexShrink: 0, paddingTop: '2px' }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <p style={{ fontFamily: mono, fontSize: '12px', letterSpacing: '0.1em', color: '#ffffff', marginBottom: '10px', textTransform: 'uppercase' }}>{c.label}</p>
            <p style={{ fontFamily: sans, fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.42)', maxWidth: '640px' }}>{c.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FactoryPage() {
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <Header />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) 120px' }}>

        <Link
          href="/#factory"
          style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '64px' }}
        >
          ← Back
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: '72px' }}>
          <p style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.22em', color: '#ec4899', textTransform: 'uppercase', marginBottom: '16px' }}>
            Process deep dive · November 2026
          </p>
          <h1 style={{ fontFamily: display, fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 1.0, color: '#ffffff', marginBottom: '24px' }}>
            The <span style={{ color: ACCENT }}>Factory</span>
          </h1>
          <p style={{ fontFamily: sans, fontSize: '18px', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: '640px', marginBottom: '32px' }}>
            Instead of pairing with one AI assistant and relaying every message myself, I give one agent an
            outcome and let a small team of agents build it, review it, test it and deploy it to dev. This
            is how it&apos;s set up, what it did on its first real task, and what I learned.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {STACK.map((tag) => (
              <span key={tag} style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '3px', padding: '3px 10px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={divider} />

        {/* Overview */}
        <section style={{ marginBottom: '96px' }}>
          <p style={eyebrow}>Overview</p>
          <div style={prose}>
            <p>
              I run a small-business CRM, PathSix CRM, and I&apos;m building an offline-capable iPhone app
              for it. That means a lot of careful backend groundwork: migrations, row-level security, sync
              plumbing. It&apos;s exactly the kind of work where a single AI assistant marking its own
              homework is a risk.
            </p>
            <p>
              So I split the job. One agent is the <strong style={{ color: '#fff', fontWeight: 500 }}>lead</strong>.
              I give it a goal, such as &ldquo;add stable identifiers to the six syncable tables&rdquo;, and it
              owns the task until it&apos;s finished. It hands the work to a <strong style={{ color: '#fff', fontWeight: 500 }}>reviewer</strong> and
              a <strong style={{ color: '#fff', fontWeight: 500 }}>tester</strong>, reads their reports, fixes what they find, asks for a
              recheck, then merges, deploys to a development environment and checks the result.
            </p>
            <p>
              I step in to kick things off, to make the decisions that belong to me, and to approve anything
              that touches production. On the first real task, that came to one &ldquo;go&rdquo; and one
              agent restart. I relayed no messages.
            </p>
          </div>
        </section>

        <div style={divider} />

        {/* The cast */}
        <section style={{ marginBottom: '96px' }}>
          <p style={eyebrow}>The Cast</p>
          <h2 style={h2}>Who does what</h2>
          <div style={grid}>
            {CAST.map((c) => (
              <div key={c.role} style={{ background: '#050505', padding: '28px' }}>
                <p style={{ ...cellLabel, color: c.color, marginBottom: '4px' }}>{c.role}</p>
                <p style={{ fontFamily: mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}>{c.who}</p>
                <p style={cellBody}>{c.does}</p>
                {c.not && (
                  <p style={{ ...cellBody, marginTop: '10px', color: 'rgba(255,255,255,0.28)' }}>{c.not}</p>
                )}
              </div>
            ))}
          </div>
          <p style={{ ...prose, marginTop: '32px' }}>
            All three agents run side by side as terminal processes inside Solo, a workspace app that lets
            agents message each other, share task lists and scratchpads, and set timers that fire when
            another agent goes idle. Solo is the factory floor.
          </p>
        </section>

        <div style={divider} />

        {/* Why split */}
        <section style={{ marginBottom: '96px' }}>
          <p style={eyebrow}>Why split it this way</p>
          <h2 style={h2}>Three reasons</h2>
          <div style={grid}>
            {WHY.map((w) => (
              <div key={w.label} style={{ background: '#050505', padding: '28px' }}>
                <p style={cellLabel}>{w.label}</p>
                <p style={cellBody}>{w.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '48px', padding: '28px', border: '1px solid rgba(34,197,94,0.18)', borderRadius: '8px', background: 'rgba(34,197,94,0.03)' }}>
            <p style={{ ...cellLabel, marginBottom: '12px' }}>The rule I care about most: the reviewer isn&apos;t the boss</p>
            <p style={{ fontFamily: sans, fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>
              The reviewer&apos;s job is to find problems, not give orders. The lead may disagree with a
              finding and not implement it, but it has to tell me every time, and why. That keeps the reviewer
              honest and the lead accountable, and the disagreements are the part I read most closely.
            </p>
          </div>
        </section>

        <div style={divider} />

        {/* How a task moves */}
        <section style={{ marginBottom: '96px' }}>
          <p style={eyebrow}>The Workflow</p>
          <h2 style={h2}>How a task moves</h2>
          <div style={prose}>
            <p>
              Every task is one shared record with a fixed header. Every report is a comment on that record and
              names the commit it covers. &ldquo;Tests pass&rdquo; means nothing unless you know which code they
              passed against.
            </p>
          </div>
          <pre style={{ margin: '28px 0 48px', padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', fontFamily: mono, fontSize: '12px', lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', overflowX: 'auto' }}>
{`Task:       F-1 Stable UUID identifiers
Owner:      Claude (lead)
Scope:      plan section, and what is explicitly out of scope
Repo:       backend   Branch: f1-stable-uuids   Worktree: <path>
Revision:   <exact commit under review or test>
Acceptance: numbered criteria, each written as a test
Status:     planned | implementing | in review | in test
            | fixing | done | escalated`}
          </pre>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '720px' }}>
            {LOOP.map((step, i) => (
              <li key={step} style={{ display: 'flex', gap: '16px', fontFamily: sans, fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.48)' }}>
                <span style={{ fontFamily: mono, fontSize: '12px', color: ACCENT, flexShrink: 0, paddingTop: '3px' }}>{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <div style={divider} />

        {/* Guardrails */}
        <section style={{ marginBottom: '96px' }}>
          <p style={eyebrow}>Guardrails</p>
          <h2 style={h2}>What keeps it safe</h2>
          <div style={grid}>
            {GUARDRAILS.map((g) => (
              <div key={g.label} style={{ background: '#050505', padding: '28px' }}>
                <p style={cellLabel}>{g.label}</p>
                <p style={cellBody}>{g.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={divider} />

        {/* First run */}
        <section style={{ marginBottom: '96px' }}>
          <p style={eyebrow}>The First Real Run</p>
          <h2 style={h2}>Stable IDs for offline sync</h2>
          <div style={{ ...prose, marginBottom: '48px' }}>
            <p>
              To prove the setup, I picked one bounded backlog item: give six tables (clients, leads, projects,
              contacts, interactions, accounts) a stable UUID that a phone can generate offline, without
              disturbing the integer IDs the web app relies on. Small, but it touches a migration, row-level
              security, two test databases (SQLite and PostgreSQL) and a live deployment, so there was plenty
              of room to get it wrong.
            </p>
          </div>
          <Numbered items={RUN} />
        </section>

        <div style={divider} />

        {/* By the numbers */}
        <section style={{ marginBottom: '96px' }}>
          <p style={eyebrow}>By the Numbers</p>
          <h2 style={h2}>One task, end to end</h2>
          <div style={grid}>
            {NUMBERS.map((n) => (
              <div key={n.label} style={{ background: '#050505', padding: '28px' }}>
                <p style={{ fontFamily: mono, fontSize: '36px', color: '#ffffff', lineHeight: 1, letterSpacing: '-0.02em' }}>{n.val}</p>
                <p style={{ ...cellLabel, marginTop: '12px', marginBottom: '6px' }}>{n.label}</p>
                {n.sub && <p style={{ ...cellBody, fontSize: '13px' }}>{n.sub}</p>}
              </div>
            ))}
          </div>
        </section>

        <div style={divider} />

        {/* Rough edges */}
        <section style={{ marginBottom: '96px' }}>
          <p style={eyebrow}>Rough Edges</p>
          <h2 style={h2}>What didn&apos;t go smoothly</h2>
          <div style={{ ...prose, marginBottom: '40px' }}>
            <p>It works, but it isn&apos;t magic yet.</p>
          </div>
          <Numbered items={ROUGH} />
        </section>

        <div style={divider} />

        {/* Lessons */}
        <section style={{ marginBottom: '96px' }}>
          <p style={eyebrow}>Lessons</p>
          <h2 style={h2}>What I&apos;ve learned so far</h2>
          <Numbered items={LESSONS} />
        </section>

        <div style={divider} />

        {/* What's next */}
        <section style={{ marginBottom: '96px' }}>
          <p style={eyebrow}>What&apos;s Next</p>
          <div style={prose}>
            <p>
              The factory has finished one task and earned a little more autonomy. Next it works through the
              rest of the backend groundwork for the mobile app: change tracking, soft-delete tombstones, a
              sync change feed, idempotent writes and device authentication.
            </p>
            <p>
              I keep the decisions that matter (the sync engine, the conflict policy, how long a phone may
              work offline) and I approve anything that goes near production.
            </p>
            <p style={{ fontFamily: mono, fontSize: '12px', lineHeight: 1.9, color: 'rgba(255,255,255,0.32)' }}>
              Project: Python (Quart + SQLAlchemy) on PostgreSQL with row-level tenant security, hosted on
              Fly.io · React web frontend · React Native + Expo iPhone app in progress. Process docs:
              AGENTS.md (project rules), FACTORY.md (roles, handoffs, permissions) and the project plan, the
              single source of truth for scope and progress.
            </p>
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link
            href="/#factory"
            style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            ← Back to portfolio
          </Link>
          <Link
            href="/projects/pathsix-crm"
            style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.16em', color: ACCENT, textTransform: 'uppercase', textDecoration: 'none' }}
          >
            PathSix CRM case study →
          </Link>
        </div>

      </main>
    </div>
  );
}
