# October 30, 2026 maintenance

Next/config16.4.3, React/DOM19.3.1, ESLint10.14.0, Tailwind/plugin4.3.3,
PostCSS8.5.32, matching Node24/React19 types and current browser metadata replace
older dependencies. Pin Node24.22.1/npm11.17.0; retain TypeScript5.9.3.
Framer Motion14.9.0 follows the official React upgrade guidance:14 has no breaking
React API changes; the13 optional Emotion filtering change does not apply here
because the site does not use Emotion/Styled Components. Existing animation APIs
and visual styling remain. Native resize/height state that was never read is removed.

Blog MDX remains authored/tracked content, not a user-upload or remote-code service.
The loader now accepts only regular published files from `content/blog` and rejects
unknown/traversal slugs before reading content. The generated routes disable unknown
dynamic parameters. All four existing articles and URLs remain. Typed not-found
handling replaces the old function-scoped var; punctuation escapes retain copy.
Gray Matter4.0.3 and Next MDX Remote6.0.0 remain current, with compatible patched
YAML/glob/schema/ID dependencies. Never compile untrusted user-supplied MDX.

The existing Devicon stylesheet is pinned to2.18.0 instead of @latest; the exact
CSS matched the current latest response before changing the reference. Existing
Google fonts, contact mailto, case-study links/content and image configuration remain.
No application database/provider settings or content/design migration is introduced.

Live checks found the existing blog-card date formatter used the visitor's timezone,
while Vercel rendered in UTC. Central-time visitors saw the preceding day and a
recoverable React418 hydration error. Explicit UTC formatting now preserves the
written publication day for cards and article headers. Browser checks use a UTC
server plus UTC/Central visitor contexts; a unit test also covers Kiritimati.

Audit, lint, typecheck, two blog-security tests, build and browser/site checks run
on pinned Ubuntu24.04 CI. Tests cover every published page/article, referenced local
images, metadata, sitemap/robots/icons/noindex404, mobile menu and blog/case navigation,
responsive overflow, JS/asset errors and the unchanged contact email link.
Devicon CSS/fonts are read-only downloads; no messages or external app operations occur.
No force/legacy-peer installation flags or lint-rule suppressions are used.

Sources: [Motion React upgrade guide](https://motion.dev/docs/react-upgrade-guide),
[Next ESLint10 support](https://nextjs.org/docs/app/api-reference/config/eslint).
