Counselors Review — Resume/Portfolio Bullets
Agents consulted: codex-5.3-high (1,151 words), gemini-2.5-flash (667 words)
Failed: claude-opus (path error on Windows), opencode (0 words returned)

Consensus: Both models agreed this project is genuinely impressive — production-deployed, compliance-aware, AI-integrated, and architecturally thoughtful. The state machine + AI parsing combination was called out as especially strong. Here's the full synthesized list:

Architecture & Monorepo Design
Architected a pnpm monorepo with two production Next.js apps and a shared TypeScript core package (@nudge/core), centralizing scheduling, timezone, AI, Twilio, rate-limiting, and logging logic into a single source of truth
Eliminated a separate build/publish step for the shared package using transpilePackages in each app, so Next.js compiles TypeScript directly — improving iteration speed and reducing release complexity
Designed sub-path exports (@nudge/core/timezone, @nudge/core/recurrence, etc.) to prevent Node-only modules (Twilio's fs/tls dependencies) from leaking into browser bundles — a non-obvious architectural boundary that prevents production bundle errors
Enforced product-level DB isolation with separate Neon databases per app, enabling clean compliance and consent boundaries as the product line scales
Structured both apps with shared API conventions and independent schema surfaces, demonstrating scalable multi-product thinking within a single codebase
AI / ML Integration
Integrated Anthropic Claude Haiku as a tool-use-based structured parser for natural-language SMS scheduling, extracting intent, title, datetime, recurrence, and confidence fields from free-text input
Enforced schema-validated AI outputs with Zod to prevent malformed model responses from reaching business logic
Applied deterministic inference controls (temperature: 0, explicit system prompt rules, locked tool_choice) to produce consistent extraction quality across diverse user inputs
Implemented confidence-gated automation: parses scoring ≥ 0.8 auto-commit to DB; lower-confidence parses are routed to clarification states, preventing silent scheduling mistakes
Engineered timezone-aware AI prompts that inject the user's current local time and timezone, avoiding day-boundary errors when interpreting relative dates like "tomorrow" or "next Friday"
Conversation & State Machine Systems
Built a persistent SMS conversation state machine (states: idle, awaiting_title, awaiting_datetime, awaiting_confirm, awaiting_edit_confirm, awaiting_delete, awaiting_snooze) to support multi-turn workflows over stateless SMS
Stored durable pending payloads as JSONB to carry context across conversation turns — title, datetime, recurrence intent, fuzzy-matched edit targets, and deletion candidates
Implemented TTL-backed state expiry and refresh logic to prevent stale conversation context from causing incorrect writes
Designed explicit confirmation gates for ambiguous parses and past-time scheduling, including "advance to tomorrow" confirmation flows
Scheduling, Recurrence & Timezone Engineering
Built a recurring reminders engine supporting daily, weekly, monthly, yearly, weekdays, and custom day-list patterns (days:mon,wed,fri) with human-readable labels and validation
Implemented DST-safe "wall clock intent" scheduling by storing remindAtLocal and re-anchoring UTC remindAt on each cron pass — ensuring a 9am reminder stays at 9am after daylight saving transitions
Added legacy migration logic for events missing remindAtLocal, including offset-drift correction across historical DST transitions
Handled calendar edge cases (month overflow, leap-year rollover) so recurrence remains semantically correct across real-world date boundaries
Built timezone conversion utilities (formatLocalIso, localIsoToUtc, formatInUserTimezone, getLocalHour) used consistently across AI parsing, cron, and dashboard UI paths
Cron-Based Delivery System
Engineered a multi-pass cron job for reliable, idempotent reminder delivery:
Pre-pass A: Re-anchor wall-clock reminders after DST
Pre-pass B: Normalize legacy reminder records
Pass 1: Send due reminders, mark as reminded
Pass 2: Send one follow-up for reminders ignored for 30–90 minutes
Pass 3: Purge stale reminded records after 14 days
Implemented quiet hours enforcement (quietStart/quietEnd) that postpones sends to the next quiet-window exit rather than dropping them silently
Added pause semantics (pausedUntil) allowing users to temporarily suspend delivery without data loss
Used idempotency guards (WHERE reminderSentAt IS NULL, WHERE followUpSentAt IS NULL) to prevent duplicate sends under concurrent cron execution
SMS Product Features
Implemented full command routing for 14+ SMS commands: LIST, NEXT, DONE, UNDO, DELETE, SNOOZE, STOP, START, HELP, WEB/LOGIN, QUIET, TIMEZONE, PAUSE, RESUME
Added fast-path command detection so keyword commands bypass AI parsing entirely, reducing latency and API cost
Delivered "quick reschedule after fire" — users can reply with a new time after a reminder fires and it reschedules in place, resetting send markers for cron pickup
Implemented snooze (5–120 min) by converting a fired reminder back to scheduled state with refreshed send metadata
Supported inline note parsing ("message | note") and propagated notes into reminder sends and follow-ups for richer context
Backend & Database
Designed a normalized PostgreSQL schema using Drizzle ORM with explicit enums, indexes, and relational modeling across users, events, conversations, and message logs
Built a custom in-memory rate limiter in the shared core package to protect against SMS abuse, with progressive warnings before blocking
Implemented Twilio webhook signature validation on all inbound routes to reject spoofed traffic
Enforced API input validation with Zod across webhook, auth, and dashboard endpoints
Web Dashboard & Auth
Built a full-featured authenticated web dashboard with reminder CRUD, history pagination, timezone controls, quiet hours configuration, pause windows, and Sunday check-in settings
Implemented email+password auth with bcrypt hashing, 32-byte random session tokens, httpOnly+secure cookies, session expiration, and logout revocation
Added constant-time dummy-hash login path to reduce timing side-channel leakage
Built admin tooling for user inspection, consent/status monitoring, and plan tier management (trial, friends_family, paid)
Implemented trial monetization guardrails (3 active reminder limit) wired into the conversational create/confirm flow
DevOps & Infrastructure
Deployed and maintain a production SMS application at sundaynudge.com on Vercel, integrated with a verified Twilio toll-free number (+18555946672)
Configured a pnpm monorepo on Vercel with per-app root directories, shared dependency installation, and environment separation
Instrumented server workflows with structured JSON logging (info/warn/error) for observable operations and incident debugging
Secured cron endpoints behind bearer-secret authorization (CRON_SECRET) for safe scheduled execution in a serverless environment
Compliance & Security
Implemented mandatory Twilio consent gating (consentedAt) — unconsented users are blocked until an affirmative YES reply is received
Enforced STOP/START compliance with immediate unsubscribe/reactivation semantics, satisfying carrier and TCPA requirements
Maintained separate database instances per app to ensure per-number consent records are never shared across products
Testing
Authored 55+ passing Vitest unit tests covering SMS commands, recurrence logic, timezone conversion, rate limiting, AI parsing, and conversation state transitions
Designed a resilient mock strategy: mock internal package files by direct file path (e.g., packages/core/src/ai/client) rather than barrel imports, ensuring relative imports inside @nudge/core are correctly intercepted
Covered critical edge cases: DST/local-date conversions, recurrence overflow and leap-year behavior, AI parser timeout/fallback paths, and command normalization
Problem Solving / Debugging
Diagnosed and fixed a subtle production lifecycle bug: rescheduled reminded events became permanently stuck because reminderSentAt was not cleared on reschedule — required tracing the interaction between status, reminderSentAt, and the cron's WHERE clause to identify the root cause
Engineered DST-safe recurrence scheduling by identifying that storing only UTC timestamps causes wall-clock drift across daylight saving transitions, then added remindAtLocal and a cron pre-pass to correct it
Identified and resolved browser bundle contamination caused by importing from a shared package barrel — fixed via sub-path exports that isolate Node-only code
Reports saved to: agents/counselors/1776220333-resume-portfolio-bullets/

That's a lot of strong material. A few bullets that codex flagged as particularly impressive to a senior engineer:

The DST wall-clock intent solution — storing remindAtLocal and re-anchoring on cron is a genuinely hard problem that most scheduling systems get wrong
The confidence-gated AI → state-machine clarification path — not just calling AI but handling the failure modes gracefully
The multi-pass cron with idempotency guards — production-grade thinking about concurrent execution
The sub-path export browser bundle isolation — the kind of subtle architectural decision that demonstrates deep understanding of how module systems work