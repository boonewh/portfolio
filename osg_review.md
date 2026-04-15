Counselors Review
Agents consulted: Gemini 2.5 Flash, Codex 5.3 (xhigh) — Claude Opus errored on Windows path issue

Consensus: Both models independently flagged the same 4 things as genuinely impressive to a recruiter:

The QB Payment→Invoice reconciliation — non-obvious, real-world problem-solving
Web Crypto API rewrite for Edge middleware — shows platform-awareness most devs miss
Multi-layer security — AES-256-GCM + HMAC-SHA256 + httpOnly cookies + reCAPTCHA all in one project
Mock QB mode — signals professional engineering discipline, not just "it works on my machine"
Short Project Description
Built a production-grade membership and payment platform for the Odessa Symphony Guild using Next.js 16, TypeScript, Supabase, and QuickBooks Online. The system handles end-to-end student enrollment, secure payment orchestration, and admin operations — including live pricing, roster management, and automated paid-status updates via signed webhooks.

Long Project Description
Developed a full-stack web platform for the Odessa Symphony Guild's Belles & Beaux program that replaced manual membership intake and payment tracking with a structured, auditable workflow. Families complete a three-step registration flow with robust client/server validation, dynamic guardian capture (1–4 guardians), legal media-release consent with e-signature, reCAPTCHA bot protection, and real-time dues logic based on grade and membership type.

Implemented a full QuickBooks integration lifecycle: OAuth 2.0 authorization, AES-256-GCM encrypted token storage, automatic token refresh, invoice generation with online payment enabled, and webhook-driven payment reconciliation. Built secure admin tools for roster management and live pricing updates, with backward-compatible data handling for legacy records. The project demonstrates practical product engineering across frontend UX, API design, data modeling, third-party payment systems, and security hardening.

Resume Bullet Points
Registration & Forms

Architected a 3-step student membership enrollment flow using React Hook Form + Zod with step-aware validation and progressive completion UX
Built dynamic guardian system (1–4 guardians) with useFieldArray, relationship selection, and a "same address as Guardian 1" checkbox that auto-copies fields to reduce input duplication
Enforced cross-field business rules with Zod superRefine (at least one guardian email required for invoice delivery)
Implemented live phone number formatting for student and guardian inputs during keypress
Built grade-aware membership logic that auto-assigns freshman pricing and conditionally exposes non-freshman tier options
Integrated Google reCAPTCHA v2 on the client with server-side token verification to prevent bot submissions
Embedded legal media release authorization directly into signup, capturing guardian consent, social media opt-out, e-signature, and submission date
Loaded live dues and late fees from a settings API with resilient hardcoded fallback behavior
QuickBooks Integration

Implemented complete OAuth 2.0 flow with Intuit: authorization endpoint, callback handler, token exchange, and secure storage
Encrypted QuickBooks OAuth tokens at rest using AES-256-GCM with environment-managed keys
Built automatic access token refresh logic triggered on expiry, including refresh-token expiry handling
Implemented customer find-or-create flow keyed by primary email to avoid duplicate payer records in QuickBooks
Generated invoices with due dates, line items, and ACH/credit-card online payment enablement (AllowOnlinePayment: true)
Added multi-recipient invoice delivery for additional guardian email addresses
Logged intuit_tid correlation IDs from all QuickBooks API calls for production debugging
Built signed webhook endpoint for Intuit payment notifications with HMAC-SHA256 signature verification using timingSafeEqual
Solved non-obvious QuickBooks event modeling: resolved Payment events to Invoice IDs via Payment.Line[].LinkedTxn[], automating paid-status sync in Supabase
Designed graceful degradation so QuickBooks failures do not block student registration persistence
Security

Rewrote HMAC-SHA256 admin session validation from Node.js crypto to Web Crypto API (crypto.subtle) to support Next.js Edge runtime middleware
Issued httpOnly, sameSite=strict, secure session cookies with 8-hour bounded lifetime for admin authentication
Protected all /admin/* routes via Next.js middleware with Edge-compatible session verification
Applied secure response headers (no-cache, nosniff, DENY framing) across all sensitive API routes
Used Supabase service role key for trusted server-side operations while preserving RLS for public routes
Database & Backend

Authored Supabase migration set covering students, encrypted QB tokens, settings, guardian expansion, and media-release fields
Mapped flexible 1–4 guardian arrays to 36 relational DB columns with zero data loss for existing records
Scoped student records by school year for clean multi-year data isolation
Preserved backward compatibility by supporting both new guardian_N_* columns and legacy mom_*/dad_* records in display
Admin & Developer Experience

Built real-time admin roster with search, grade filter, paid/unpaid filter, KPI summary cards, and one-click payment status toggle
Designed print-optimized roster layout with hidden controls and clean print header
Built admin pricing panel for 6 configurable dues/fee keys with live updates reflected on the public join form
Implemented MOCK_PAYMENT_MODE feature flag with singleton mock QB client simulating the full customer/invoice/payment-link pipeline for local development without live credentials
Skills & Technologies
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · React Hook Form · useFieldArray · Zod · superRefine · Supabase · PostgreSQL · Schema Migrations · Row Level Security · QuickBooks Online API · Intuit OAuth 2.0 · Webhook Processing · AES-256-GCM · HMAC-SHA256 · Web Crypto API · crypto.subtle · timingSafeEqual · httpOnly Cookies · Next.js Middleware · Edge Runtime · Google reCAPTCHA v2 · Vercel · Feature Flags · Graceful Degradation · intuit_tid Logging · next/og · next/image

Top Interview Talking Points
QB Payment→Invoice reconciliation — what the problem was, how you debugged it from logs, and how you solved it via LinkedTxn[]
Edge runtime crypto rewrite — why Node.js crypto breaks on the Edge and what it takes to port to Web Crypto API
Zod superRefine cross-field validation — how you validated "at least one guardian email" across a dynamic array
AES-256-GCM token encryption — encryption at rest for OAuth credentials with environment-managed keys
Mock QB mode — how you made local development fully functional without live credentials
Graceful degradation — how you ensured student submissions succeed even when QuickBooks is down
Schema evolution — migrating from mom_*/dad_* to 4-guardian support without breaking historical data