# Human-Curated UI/UX Mandate (10-Year Senior Designer Standard)

Every page, section, component, card, and interaction in Trax Jobs must be designed and built as if by a 10-year experienced Senior Product Designer:

1. **Authentic Vector Logos & Real Photography**:
   - Always use official vector marks (SVG) for African tech companies (Paystack, Flutterwave, Moniepoint, Andela, Interswitch, Kuda, Cowrywise, PiggyVest). Never use text initials in colored squares.
   - Always use high-quality portrait photography of African tech professionals with graceful fallbacks.
   - Always use real, tangible ecosystem metrics (e.g. `+34% conv.`, `5+ yrs exp`, `$55k-$75k/yr`) rather than dummy gray placeholder skeleton bars.

2. **Depth, Gradients, and Elevation**:
   - Use multi-layer warm diffused shadows (`shadow-[0_16px_36px_-6px_rgba(15,16,18,0.08)]`), subtle warm radial/linear gradient canvases (`linear-gradient(145deg, #fdf2ee 0%, #fce4d6 45%, #f8d4c4 100%)`), and stacked card depth layers.
   - Include physics-based hover lifts (`group-hover:-translate-y-1`) and smooth transitions.

3. **Strict Brand Token Adherence**:
   - Primary Brand Red: `#E7040D` (hover `#CB030B`).
   - Warm Brand Peach: `#fce8e0` / `#fdf2ee` / `#faece7`.
   - Dark Slate / Charcoal: `#1F1F1F` / `#161616` / `#0C1222`.
   - Always use the official `/images/trax-logo.png` logo asset for Trax branding.

4. **Editorial Typography**:
   - Tight letter-tracking on titles (`tracking-[-0.02em]`), generous line height on descriptions (`leading-[1.7]`), and editorial kicker badges (`THE TRAX STANDARD`).

5. **Production Codebase & Design System Freeze**:
   - All existing pages, components, sections, and tokens in this repository are completely locked in for production.
   - Do NOT modify, refactor, or touch existing files unless explicitly asked by the user.
   - Do NOT create unprompted pages or features.
   - Any new page or component requested by the user in the future must strictly inherit these locked tokens and geometry with 100% consistency.
