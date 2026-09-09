# Trax Jobs: Official Design System & UI Specifications

This document defines the **single source of truth** for all visual styles, geometry, tokens, components, and data schemas across the Trax Jobs platform. Every new page, modal, card, backend query, and interaction **must follow this specification with 100% fidelity**.

---

## 1. Brand Color Palette

| Token | Hex Value | Role / Usage |
|---|---|---|
| **Primary Red** | `#E7040D` | Primary brand accent, active navigation pills, primary "Apply" CTA buttons, active tab underlines, author name underline accents |
| **Primary Red Hover** | `#CB030B` | Hover state for Primary Red buttons |
| **Light Red / Peach Tint** | `#fce8e0` / `#fdf2ee` | Editorial kicker badge backgrounds (`bg-[#fce8e0] text-[#E7040D]`), hero geometric backdrop blocks, active chips |
| **Dark Navy** | `#0C1222` | "Your preferences" container background, "Save" filter button, "Sign in" header button, primary full-width footer container |
| **Dark Navy Hover** | `#070b14` | Hover state for dark navy buttons |
| **Dark Charcoal** | `#1F1F1F` / `#161616` | Main page titles, job titles, company titles, high-emphasis heading text |
| **Warm Canvas** | `#FAF8F5` | Default page background, section wrapper backgrounds with graph-paper grid overlay |
| **Clean White** | `#FFFFFF` | Card surfaces, inputs, modal backgrounds |
| **Border Zinc** | `border-zinc-200/90` | Standard card border, input border, subtle divider |
| **WhatsApp Green** | `#25D366` / `#20BD5A` | Direct Enrol / Hire WhatsApp action button background with pure white typography and icon |
| **Duration Accent** | `#FBBF24` | Yellow course duration badge (`text-zinc-950 font-bold`) |
| **Level Pill** | `#E0F2FE` / `#0284C7` | Light blue course level badge |

> **STRICT RULE**: Do NOT introduce generic blue, purple, or non-brand gradient backgrounds anywhere on the platform.

---

## 2. Geometry & Structural Curvature Hierarchy

### A. Page-Level Container Symmetry
- **Hero Banner**: `w-full bg-zinc-900 rounded-b-[40px] sm:rounded-b-[56px] overflow-hidden` (Downward bottom curve).
- **Footer**: `w-full bg-[#0C1222] text-white rounded-t-[40px] sm:rounded-t-[56px] overflow-hidden` (Upward top curve, mirroring hero).
- **Graph-Paper Grid Canvas**: `bg-[#FAF8F5]` with `linear-gradient(to right, #e8e4dc 1px, transparent 1px)` at `28px 28px` pattern size. Continuous across sections with zero artificial horizontal divider lines.

### B. Cards & Components Architecture
- **Job Cards (`<JobCard />`)**: Strictly **90-degree square edges (`rounded-none`)** with `border border-zinc-200/90`.
- **Company Cards (`<CompanyCard />`)**: Strictly **90-degree square edges (`rounded-none`)** with `border border-zinc-200/90`.
- **Course Cards (`<CourseCard />`)**: Strictly **90-degree square edges (`rounded-none`)** with `border border-zinc-200/90` and floating yellow duration badge.
- **Guide Cards (`<GuideCard />`)**: Strictly **90-degree square edges (`rounded-none`)** with full-bleed cover image.
- **Action Buttons**:
  - `Apply ↗`: `rounded-none bg-[#E7040D] hover:bg-[#CB030B] text-white font-bold`
  - `Enrol on WhatsApp`: `rounded-none bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold`
  - `Save` (Filter): `rounded-none bg-[#0C1222] hover:bg-[#070b14] text-white font-bold`
  - `Save ♡` (Card): `rounded-none border border-zinc-200 bg-white font-semibold`
  - `Follow`: `rounded-none border border-zinc-200 bg-white font-bold`

---

## 3. Standard Navigation Header (`<AppHeader />` & `<Navbar />`)

- Logo: Official Trax logo asset (`/images/trax-logo.png` with red slash X).
- Navigation links: `Find Jobs`, `Hire a Talent`, `Companies`, `About Us`, `Submit a Job`.
- Right CTAs: `I'm a recruiter` + `Sign in` / `Submit a Job` button (`bg-[#0C1222] text-white font-bold rounded-xl px-6 py-2.5`).

---

## 4. Skills & Academy Specifications (`/learning/[id]`)

- **Hero Banner**: Clean, high-resolution photography of African tech professional with zero heavy text masks or stickers; floating `#FBBF24` duration badge.
- **Interactive Tabs**:
  - `Overview`: Dedicated, concise domain-specific 1-paragraph overview.
  - `Certificates`: Reference-styled verified credential preview card.
- **Direct Enrol CTA**: WhatsApp brand green (`#25D366`) button with white icon and white typography.

---

## 5. Guides & Editorial Playbooks Specifications (`/guides/[slug]`)

- **2-Column Layout**:
  - **Left Column (7 cols)**: Italicized lead paragraph, structured headings (`<h2>`, `<h3>`), quotes with red accent border (`border-l-3 border-[#E7040D]`), and bottom `TOPICS DISCUSSED` badges.
  - **Right Column (5 cols)**:
    - Top Hero Image with warm peach geometric offset backdrop (`bg-[#FCE8E0]`).
    - **Sticky Sidebar (`sticky top-24 self-start`)**:
      - **AUTHOR Widget**: Circular portrait, author name with Trax red underline (`border-b-2 border-[#E7040D]`), and verified role (`Ben Sam Oladoyin`, `AI/ML Engineer, Founder Trax Media Ltd`).
      - **YOU'LL ALSO LIKE Widget**: 5 interconnected story cards with square thumbnail images and hover color transitions.

---

## 6. Icons & Content Rules

- **Icon Library**: **Phosphor Icons exclusively** (`@phosphor-icons/react`). Zero Lucide icons under any circumstance.
- **Tone of Voice**: Authoritative African tech journalism (trax.ng standard). No em dashes, no generic SaaS filler words ("moreover", "furthermore", "in today's fast-paced world").
- **Authentic Assets**: Real African vector company logos (Paystack, Flutterwave, Moniepoint, Interswitch, Andela), real verified portrait photography. No dummy Latin text or empty skeleton bars.
