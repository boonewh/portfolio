Counselors Review — Portfolio Points
Agents consulted: codex-5.3-high, gemini-2.5-flash

Both agents read the full codebase and produced thorough, detailed lists. Here's everything combined, de-duplicated, and polished — ready to drop into a portfolio.

Architecture & System Design
Designed and built a production multi-tenant SaaS CRM from scratch — not a tutorial project, used by real clients — enforcing complete data isolation across all entities (clients, leads, projects, interactions, accounts, contacts, subscriptions, files, activity logs) via per-request tenant_id scoping at the query layer
Implemented a white-label configuration system where each tenant's branding, labels, lead statuses, business types, regional settings (currency, date format), and feature toggles are stored as a JSON blob in PostgreSQL and surfaced to the React frontend via a typed useCRMConfig() hook — enabling full customization without code changes or redeployments
Moved all CRM customization from hardcoded frontend config to backend-managed tenant config, so product behavior is centrally controlled and consistent per tenant
Designed a complete entity lifecycle state machine (created → updated → assigned → soft-deleted → restored → purged and lead → converted → client) that supports operational workflows, auditability, and historical reporting
Architected role-based user modeling with a many-to-many User ↔ Role association table, a reusable @requires_auth(roles=[...]) decorator, and fine-grained capability roles (e.g. file_uploads) beyond simple admin/user splits
Built lead-to-client lineage tracking (source_lead_id, converted_on) enabling end-to-end pipeline conversion analytics
Backend Engineering
Built a high-performance async Python API with Quart (async Flask) and SQLAlchemy ORM, using async/await throughout for efficient handling of database queries, file I/O, and external service calls
Implemented Pydantic validation schemas for every create/update endpoint (clients, leads, projects, interactions, subscriptions, contacts) — enforcing data integrity at the API boundary with structured error feedback
Designed complex project visibility queries with assignment inheritance logic: project-level assigned_to takes priority, falling back to the linked client or lead's ownership — resolving access ambiguity in mixed-ownership workflows
Built interaction management with strict "exactly one entity" linkage validation (client, lead, or project), and an interaction transfer workflow that preserves follow-up history when a lead converts to a client
Developed a CSV/XLSX lead import pipeline with file preview, dynamic column mapping, encoding detection/fallback, per-row validation, failure capture, and assignment email notifications
Generated iCalendar (.ics) files on-the-fly for follow-up scheduling — with entity-aware event composition — enabling users to add CRM tasks directly to Google Calendar, Outlook, or any calendar app
Built a global cross-entity search across clients, leads, projects, accounts, and users with field-level match metadata
Implemented activity log aggregation with "recently touched" feeds using subqueries and bulk entity hydration to eliminate N+1 patterns
Built subscription lifecycle management (create, update, renew, cancel) with automatic renewal-date computation and cancellation timestamp tracking
Normalized and validated phone numbers and email addresses at all API input boundaries to enforce data quality
Optimized database performance with strategic composite indexes on tenant_id, deleted_at, assigned_to, created_at, contact_date, and project_id — applied via Alembic migration
API Design & Security
Implemented stateless JWT authentication (Authlib) with 30-day expiry and role claims embedded in the token payload, with per-request verification via a reusable decorator on every protected route
Enforced tenant isolation at the database query level on every single endpoint — not just the auth layer — preventing any possibility of cross-tenant data leakage
Added IP-based sliding-window rate limiting on sensitive auth endpoints (/login, /forgot-password) to mitigate brute-force attacks
Secured passwords with bcrypt hashing and timed reset tokens (itsdangerous) for secure account recovery flows
Added Cache-Control: no-store headers on all sensitive list responses to prevent stale data exposure in client-side caches
Standardized all list endpoints with pagination, sorting, and filtering (page, per_page, sort, user_email) for clean frontend integration
Frontend Engineering
Built a full React + TypeScript SPA with Vite — typed throughout, with Zod schemas for form validation and react-hook-form for all create/update flows across clients, leads, projects, interactions, contacts, and subscriptions
Implemented dynamic, tenant-aware UX via useCRMConfig() — labels, statuses, icons, feature toggles, and business types all adapt automatically per tenant with zero frontend changes required
Integrated FullCalendar for follow-up scheduling with event styling by status/type, entity-type filtering, and drag-and-drop date updates
Added calendar interoperability (Google Calendar links, Outlook links, and backend-generated .ics downloads) directly from interaction modals
Built persistent per-user pagination, sort order, and view preferences synced to a backend preferences API — creating a personalized cross-session workspace
Developed admin workspaces (AdminClients, AdminLeads, AdminInteractions, AdminUsers, AdminProjects) with cross-user filtering, bulk actions, and inline edit flows
Built a dashboard with overdue/today/upcoming follow-up buckets and a "recently touched" entity feed for daily execution focus
Built resilient API client primitives with global auth handling, user-facing toast notifications, JSON/HTML error guards, and Sentry integration for production diagnostics
Data & Reporting
Built 13 distinct reporting endpoints covering the full business intelligence surface: sales pipeline, lead source analysis, conversion rates, revenue by client, user activity, follow-up/inactivity risk, client retention, project performance, upcoming tasks, revenue forecast, subscription income, upcoming renewals, and converted-leads traceability
Implemented lead-source conversion analytics with qualified/converted counts and per-source conversion rate calculations
Built revenue-by-client aggregation with project count, won/pending/total value, value type breakout, and derived MRR
Designed a weighted revenue forecasting model that annualizes recurring revenue (monthly/yearly) and rolls up MRR/ARR from completed and active projects
Implemented converted-lead traceability linking lead source, conversion date, pipeline duration, assignee, and resulting client record — enabling full funnel attribution
Built follow-up risk reporting (overdue tasks + inactive clients/leads) to surface neglected pipeline segments before they go cold
Implemented client retention metrics from active/churned cohorts based on interaction recency
Infrastructure & Deployment
Deployed backend to Fly.io with region pinning (iad), TLS enforcement, auto-start/auto-stop machine behavior, extended HTTP timeouts for long-running operations, and startup DB warm-up retries for connection stability
Deployed frontend to Vercel with CORS allowlisting for multiple production/staging/local origins
Built an encrypted database backup pipeline: pg_dump → GPG AES-256 encryption → SHA-256 checksum → Backblaze B2 upload — with metadata tracking and retention cleanup
Built a restore pipeline with checksum verification, GPG decryption, pg_restore --clean, pre-restore safety snapshots, and durable restore audit logs written to B2 so the history survives a destructive restore
Implemented a storage abstraction layer supporting both local disk and S3-compatible vendors (Backblaze B2), decoupling application logic from storage provider
Integrated Sentry in both backend and frontend for runtime error capture and performance telemetry in production
Managed all database schema changes with Alembic migrations, including foreign keys, JSON columns, composite indexes, and new tables — applied systematically across deployments
Product Features Built
Full CRM entity suite: clients, leads, projects, contacts, interactions, accounts, subscriptions, file storage, global search, reports, trash/restore, and admin tooling
Complete lead conversion workflow: creates client record, marks lead as won, transfers interaction history, records conversion analytics
Assignment workflows for leads, clients, and projects with user validation and email notifications
Multi-entity interaction timelines (client/lead/project) with completion tracking, follow-up scheduling, and calendar export
Trash management with soft-delete, restore, and permanent purge for clients, leads, and projects — including bulk destructive operations for admins
Full admin user management: create users, edit email, toggle active status, promote/demote roles, grant file-upload permissions
Lead import tooling for real-world messy datasets with preview, field mapping, and transparent per-row failure diagnostics
Client subscription management with renewal actions, lifecycle status badges, and MRR/ARR reporting integration
That's everything across both repos — solid material for a portfolio. The 13-report analytics suite, the encrypted backup pipeline, the multi-tenant config system, and the async Python architecture are the standout pieces worth highlighting prominently.