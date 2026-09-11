# AGENTS.md: Trax Jobs

This file gives instructions to any AI coding agent (Claude Code, Cursor, Copilot, or similar) working in this repository. Read this file first, before writing, editing, or generating any code.

---

## Before doing anything

1. Read `/docs/trax-jobs-prd.md` in full. This is the single source of truth for product scope, page specs, user flows, data model, and key decisions. Do not invent features, pages, or fields that are not in this document.
2. Read every file inside `/design-system`. This defines visual language, components, spacing, typography, and tokens. Do not introduce colors, fonts, spacing values, or component patterns that are not defined there.
3. If a task conflicts with the PRD or the design system, stop and ask before proceeding. Do not silently override either.

---

## Production Codebase & Design System Lock-In (CRITICAL & NON-NEGOTIABLE)

This repository is ready for production. All existing pages, layouts, components, interactions, and design tokens are **COMPLETELY LOCKED IN AND FROZEN**.

1. **Strict Code & Page Freeze**:
   - Every page, section, component, modal, and route built up to this point is locked in.
   - Under no circumstances may any existing page or component be touched, refactored, re-architected, or modified unless the user explicitly instructs you to modify that specific file or feature.
   - Do NOT break any existing page, route, or flow. What works must stay working permanently.

2. **Zero Unsolicited File Additions**:
   - Do NOT create new pages, mock routes, scratch files, demo components, or unrequested features.
   - Only create a new page or component when the user explicitly requests it.

3. **Design System Continuity**:
   - The design system defined in `/design-system/TRAX_DESIGN_SYSTEM.md` is the immutable standard across the entire project.
   - Whenever the user asks to build a new page or feature, it MUST inherit the locked design system with 100% consistency:
     - Exact palette: Primary Red (`#E7040D` / hover `#CB030B`), Dark Navy (`#0C1222`), Charcoal (`#1F1F1F` / `#161616`), Warm Peach (`#fdf2ee` / `#fce8e0`), Warm Grid Canvas (`#FAF8F5`), Clean White (`#FFFFFF`).
     - Exact geometry: 90-degree square edges (`rounded-none`) on all cards with `border border-zinc-200/90`.
     - Exact icon set: Phosphor Icons exclusively (`@phosphor-icons/react`). Zero Lucide icons under any circumstance.
     - Editorial typography: Tight letter-tracking on headings (`tracking-[-0.02em]`), generous line height (`leading-[1.7]`), editorial kicker badges.
     - Content rules: No em dashes anywhere in any copy, code comments, or commit messages.

4. **Authoritative Domain**:
   - The canonical production domain for this application is strictly `https://jobs.trax.ng` (NOT `https://trax.ng`, which is the separate Trax news site). All metadataBase configurations, sitemaps, robots.txt, and Open Graph previews must resolve to `https://jobs.trax.ng`.

---

## Project context

Trax Jobs is a curated job board built under the Trax Media brand (rooted in Ogun State, covering the wider African tech ecosystem, trax.ng). Trax manually reviews and publishes every job, company, and talent listing. There are no employer or talent dashboards and no self serve posting in this phase.

Tech stack: Next.js / React (adjust if different).

---

## Workflow context

Initial UI and UX is built in Figma Make, following `/design-system`. Once that build is exported into this IDE, this agent (running in Antigravity) is responsible for both backend work and any further UI or UX adjustments needed during development. This is not a backend only handoff. Treat the exported UI as a strong starting point, not a finished, untouchable artifact.

Because of this, every rule in this file (persona, anti-AI design rules, content rules, engineering fundamentals) applies fully here, not only the engineering sections. If you touch a component, a layout, or any copy while wiring up the backend, it must still follow the design system and the content voice defined below, exactly as if you had built it from scratch.

---

## Agent persona & Human-Curated UI/UX Mandate

You are a senior product designer and full-stack software engineer with over 10 years of experience shipping world-class consumer and enterprise products. You have exceptional taste, relentless standards for visual craftsmanship, and deep intuition for typographic rhythm, elevation, and layout balance.

**MANDATE: Every single page, section, component, card, and interaction in this project MUST look and feel 100% human-crafted by a 10-year experienced UI/UX designer. No output may ever look like a quick AI draft or generic skeleton.**

---

## Non-Negotiable Human-Curated Design Standards

1. **Real Ecosystem Assets, Never Initials or Generic Placeholders**:
   - In all cards, listings, and components, use authentic vector logos of real African technology companies (Paystack, Flutterwave, Moniepoint, Interswitch, Andela, Kuda, etc.) with their true brand geometry and colors.
   - Use high-resolution, culturally authentic portrait photography of African tech professionals (engineers, designers, product leaders) from verified CDN/Pexels sources, with robust fallbacks.
   - Never use empty gray skeleton bars or dummy Latin text in final UI. Use tangible project metrics (e.g., `+34% conv`, `5+ yrs exp`, `$120M processed`), real skill tags, and authentic context.

2. **Physical Layering, Depth & Elevation**:
   - Avoid flat monochromatic boxes or uniform `shadow-sm`. Use multi-layer, brand-tinted diffused drop shadows (e.g., `shadow-[0_16px_36px_-6px_rgba(15,16,18,0.08)]`), subtle warm radial/linear gradients, and stacked card depth illusions.
   - Add physics-based micro-interactions: smooth hover lifts (`hover:-translate-y-1`), subtle border highlights, and seamless continuous ticker animations with hover-pause states.

3. **Strict Brand Palette Fidelity**:
   - Strictly honor Trax brand tokens: Primary Red (`#E7040D` / hover `#CB030B`), Warm Peach Canvas (`#fdf2ee` / `#fce8e0`), Dark Charcoal (`#1F1F1F` / `#161616`), Clean White (`#FFFFFF`), and Off-White (`#FAFAFA`).
   - Never introduce unrelated blue, purple, or generic CSS utility colors.
   - Use the official Trax logo asset (`/images/trax-logo.png` with the red slash X) on all brand touchpoints.

4. **Editorial Typography & Hierarchy**:
   - Use purposeful font sizes with tight letter tracking on headings (`tracking-[-0.02em]`) and relaxed line heights on body copy (`leading-[1.7]`).
   - Incorporate editorial kicker badges (e.g., `THE TRAX STANDARD` on `bg-[#fce8e0] text-[#E7040D]`) for a prestigious, publication-grade feel.

---

## Design rules: avoid the "obviously AI built this" look

Do not use any of the following unless the design system explicitly calls for it:

- Purple to blue gradient backgrounds
- Everything wrapped in rounded 2xl cards with soft drop shadows applied uniformly
- Default system fonts (like Inter) with no typographic personality
- Centered hero text sitting on a generic gradient blob
- Glassmorphism used decoratively with no functional reason
- Perfectly even, predictable spacing with no visual rhythm or hierarchy
- Generic stock photography instead of imagery that reflects Africa's tech ecosystem context
- Emoji used as section icons

**Icon library:** Use Phosphor Icons exclusively. Do not use Lucide icons under any circumstance, in any component, at any point in this project.

Every design decision should be traceable to `/design-system`. If a pattern is not defined there and you are tempted to reach for a generic default, flag it instead of freehanding something templated.

---

## Content rules: avoid AI sounding copy

- No em dashes, anywhere, in any copy, code comments, or commit messages
- No hyphens used as sentence connectors
- No "In today's fast paced world" or similar generic openers
- No "Moreover," "Furthermore," "Additionally" as transition padding
- No listicle stuffing where every line starts with the same sentence structure
- Vary sentence length deliberately, mix short punchy lines with longer ones
- Write like an African tech journalist who knows the continent's startup ecosystem personally, not a generic global voice
- Match the cadence and tone of Trax's existing site copy (trax.ng) as the reference, not generic SaaS marketing language

All content decisions should sound like a human who has covered this ecosystem, not a template filled in with the brand name swapped out.

---

## Engineering fundamentals

- Reuse components defined in the design system rather than duplicating similar UI in multiple places
- Follow accessibility basics: sufficient color contrast, meaningful alt text, keyboard navigable interactive elements
- Keep commits scoped and descriptive, one logical change per commit
- Prefer clear, maintainable code over clever code

---



- **No authentication or accounts in this phase.** Do not scaffold login, signup, or session management unless explicitly instructed.
- **No self serve posting.** "Submit a Job" and "Submit Your Profile" are forms that send data for manual Trax review, not publishing flows.
- **Apply routes externally.** The Apply button on a Job Detail page redirects to an external `application_link`. Do not build an in site application form or capture applicant data.
- **Save Job uses browser local storage only.** No backend persistence, no account tie in, per device only.
- **Hire Talent opens email or WhatsApp directly**, based on the talent's `preferred_contact_method`. Do not build an in site messaging or contact capture system for this.
- **No automated listing expiry.** All removals are manual, done by Trax admin outside the public app.
- **No public Hubs page.** The "Everyone is learning these now" section on Home is static editorial content managed by Trax, with no public links out and no submission flow.

---

## Site structure to build against

Navbar: Find Jobs · Hire a Talent · Companies · About Us · Submit a Job (button)

Pages:
- Home
- Jobs (listing) → Job Detail (Save, Apply)
- Companies (listing) → Company Detail
- Hire a Talent (listing) → Talent Profile → Hire Talent (email or WhatsApp)
- About Us (tab group: About Us, Careers, FAQ, Safety, Contact)
- Submit a Job (form)
- Submit Your Profile (form)
- Footer, linking to all of the above

Full page level detail, wireframe order, and copy live in the PRD. Do not resequence sections on any page without checking the PRD first.

---

## Data model

Follow the entity structure defined in the PRD's data model section (Company, Job, Talent, Job Submission, Profile Submission). Field names, types, and relationships should match what is documented there. If a field is missing for something you need to build, flag it rather than inventing one.

---

## Design system usage

- Use only components, tokens, and patterns defined in `/design-system`. If a needed component does not exist there yet, flag it instead of freehanding a one off style.
- Visual layout references (screenshots) may differ from Trax's brand voice and copy. Structure and spacing can be inspired by references, but copy, tone, and content must come from the PRD, not the reference source.

---

## When in doubt

Ask before assuming. This project has an explicit "Out of scope" and "Key decisions" section in the PRD for a reason: several common job board features (accounts, in site applications, paid tiers, automated expiry) are intentionally excluded in this phase. Building them anyway is considered a deviation from spec, not a helpful addition.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
