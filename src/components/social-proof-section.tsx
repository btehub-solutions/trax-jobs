"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quotes } from "@phosphor-icons/react";

export function SocialProofSection() {
  return (
    <section className="w-full bg-[#FAF8F5] pt-16 sm:pt-28 lg:pt-32 pb-8 sm:pb-20 lg:pb-28 relative overflow-hidden">
      {/* Subtle Graph-Paper Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e8e4dc 1px, transparent 1px),
            linear-gradient(to bottom, #e8e4dc 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Big Bold Headline & Callout */}
          <div className="lg:col-span-5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#fce8e0] text-[#E7040D] text-[11.5px] font-bold uppercase tracking-wider mb-4 border border-[#f9cbb9]">
              The Trax Standard
            </div>

            <h2 className="text-[34px] sm:text-[46px] lg:text-[50px] font-black tracking-[-0.03em] text-[#1F1F1F] leading-[1.12] mb-5">
              We are here for every step of your search.
            </h2>
            
            <p className="text-[15px] sm:text-[16.5px] text-zinc-600 leading-[1.7] mb-8">
              Trax curates every listing, every company profile, and every talent card on this platform. When you find something here, it has earned its place. Connect with verified teams that respect your craft, with zero ghost roles and direct outreach.
            </p>

            <div className="flex flex-row items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/jobs"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-3 sm:px-7 sm:py-3.5 rounded-full bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] sm:text-[15px] font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] whitespace-nowrap text-center"
              >
                <span>Find your next role</span>
                <ArrowRight size={15} weight="bold" className="shrink-0" />
              </Link>
              <Link
                href="/talent"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-3 sm:px-6 sm:py-3.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 text-[13.5px] sm:text-[15px] font-bold border border-zinc-200/90 shadow-2xs transition-all whitespace-nowrap text-center"
              >
                <span>Browse talent</span>
              </Link>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              MOBILE VIEW (< lg breakpoint):
              3 Stacked Cards (with White Index Tab) + Photo with Overlapping Post-it Card
          ───────────────────────────────────────────────────────────── */}
          <div className="block lg:hidden space-y-5 pt-2">
            {/* Card 1: Trax Warm Peach Canvas (#FDF2EE) with White Index Tab */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-[0_6px_20px_-4px_rgba(15,16,18,0.06)] overflow-hidden">
              <div className="h-5 bg-white border-b border-black/[0.03]" />
              <div className="bg-[#FDF2EE] p-5 sm:p-6">
                <h3 className="text-[25px] sm:text-[28px] font-black text-zinc-950 tracking-[-0.03em] leading-tight mb-2">
                  100% human-reviewed
                </h3>
                <p className="text-[14px] sm:text-[15px] font-medium text-zinc-800 leading-snug">
                  Every single job posting and talent profile is verified by Trax before going live. Zero ghost listings.
                </p>
              </div>
            </div>

            {/* Card 2: Soft Sky Blue (#E8F5FD) with White Index Tab */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-[0_6px_20px_-4px_rgba(15,16,18,0.06)] overflow-hidden">
              <div className="h-5 bg-white border-b border-black/[0.03]" />
              <div className="bg-[#E8F5FD] p-5 sm:p-6">
                <h3 className="text-[25px] sm:text-[28px] font-black text-zinc-950 tracking-[-0.03em] leading-tight mb-2">
                  Direct outreach
                </h3>
                <p className="text-[14px] sm:text-[15px] font-medium text-zinc-800 leading-snug">
                  Connect directly with hiring leads and founders via WhatsApp or email with zero platform locks.
                </p>
              </div>
            </div>

            {/* Card 3: Soft Celadon Mint (#EDFBEF) with White Index Tab */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-[0_6px_20px_-4px_rgba(15,16,18,0.06)] overflow-hidden">
              <div className="h-5 bg-white border-b border-black/[0.03]" />
              <div className="bg-[#EDFBEF] p-5 sm:p-6">
                <h3 className="text-[25px] sm:text-[28px] font-black text-zinc-950 tracking-[-0.03em] leading-tight mb-2">
                  Zero ghost roles
                </h3>
                <p className="text-[14px] sm:text-[15px] font-medium text-zinc-800 leading-snug">
                  No recycled vacancies or dead links. Real African tech teams actively hiring right now.
                </p>
              </div>
            </div>

            {/* Card 4: Photo Card with Overlapping Physical Post-it Sticky Note */}
            <div className="relative pt-2 pb-4">
              {/* Photo Card with White Index Tab */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-[0_8px_24px_-4px_rgba(15,16,18,0.08)] overflow-hidden">
                <div className="h-5 bg-white border-b border-black/[0.03]" />
                <div className="relative w-full h-[290px] sm:h-[330px]">
                  <Image
                    src="/images/social-proof-team.jpg"
                    alt="African tech team collaborating"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
              </div>

              {/* Overlapping Physical Post-it Note (Positioned lower to reveal more of the photo) */}
              <div className="relative -mt-24 sm:-mt-28 ml-auto mr-2 sm:mr-4 w-[88%] max-w-[325px] bg-[#FFF9C6] rounded-[3px] shadow-[0_20px_42px_-6px_rgba(15,16,18,0.22),0_8px_18px_-4px_rgba(15,16,18,0.12)] border border-[#EADB85] rotate-[2.2deg] z-20 overflow-hidden">
                {/* Darker Yellow Top Adhesive / Glue Strip */}
                <div className="h-7 sm:h-8 bg-[#F4E47E]/80 border-b border-[#E3CE5E]/60 w-full" />

                {/* Inner Sticky Note Body with Generous Vertical Length */}
                <div className="px-5 sm:px-6 pt-4 pb-7 sm:pb-8">
                  {/* Author Header with Trax Brand Red Icon Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-[5px] bg-[#E7040D] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Quotes size={14} weight="fill" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-bold tracking-tight text-zinc-950">
                      Maria&apos;s story
                    </span>
                  </div>

                  {/* Elongated Quote Text with Relaxed Editorial Line Height */}
                  <p className="text-[14.5px] sm:text-[15.5px] text-zinc-900 leading-[1.62] font-normal tracking-[-0.01em] mb-6">
                    &ldquo;When you find a team that respects your craft, that is when belonging stops being a word and starts being something real.&rdquo;
                  </p>

                  {/* Action Pill Button with Trax Red Hover Glow */}
                  <div>
                    <Link
                      href="/about"
                      className="inline-block px-5 py-2.5 rounded-full bg-black hover:bg-[#E7040D] text-white text-[12.5px] font-bold shadow-sm transition-all duration-150 active:scale-95"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              DESKTOP VIEW (>= lg breakpoint):
              Layered Collage with Floating Cards (100% Untouched)
          ───────────────────────────────────────────────────────────── */}
          <div className="hidden lg:flex lg:col-span-7 relative min-h-[440px] sm:min-h-[540px] items-center justify-center pt-6 sm:pt-8 pb-8 sm:pb-10">
            
            {/* Center Main Photograph */}
            <div className="relative w-[260px] xs:w-[290px] sm:w-[380px] md:w-[420px] h-[320px] xs:h-[360px] sm:h-[420px] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(15,16,18,0.15)] border-4 border-white">
              <Image
                src="/images/social-proof-team.jpg"
                alt="African tech team collaborating"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating Card 1: Top Right (Cream Yellow Post-it) */}
            <div className="absolute top-0 right-0 sm:right-4 md:right-8 w-[155px] xs:w-[175px] sm:w-[220px] bg-[#FEF6E4] rounded-2xl p-3 sm:p-5 shadow-[0_12px_28px_-6px_rgba(15,16,18,0.1)] border border-[#F6E6BF] hover:-translate-y-1 transition-transform duration-300">
              <p className="text-[17px] sm:text-[22px] font-black text-zinc-950 leading-tight mb-1">
                100%
              </p>
              <p className="text-[10.5px] sm:text-[12px] text-zinc-700 leading-snug">
                human-reviewed. Every opening is verified before publishing.
              </p>
            </div>

            {/* Floating Card 2: Left Side (Editorial Note Card) */}
            <div className="absolute bottom-8 left-0 sm:bottom-12 sm:left-0 md:left-2 w-[175px] xs:w-[200px] sm:w-[245px] bg-[#FEFBEA] rounded-2xl p-3 sm:p-5 shadow-[0_12px_28px_-6px_rgba(15,16,18,0.1)] border border-[#F4EDB8] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200">
              <div className="flex items-center gap-1.5 text-zinc-900 mb-1.5 sm:mb-2">
                <Quotes size={15} weight="fill" className="text-[#E7040D]" />
                <span className="text-[10.5px] sm:text-[11.5px] font-bold">The Trax Standard</span>
              </div>
              <p className="text-[10px] sm:text-[11.5px] text-zinc-700 leading-relaxed mb-2.5 sm:mb-3 italic">
                &ldquo;Our newsroom verifies every opening directly with founders and hiring leads across Africa before a single role goes live.&rdquo;
              </p>
              <Link
                href="/about"
                className="inline-block px-2.5 sm:px-3 py-1 rounded-md bg-zinc-950 text-white text-[9.5px] sm:text-[10.5px] font-bold hover:bg-[#E7040D] transition-colors"
              >
                About our review
              </Link>
            </div>

            {/* Floating Card 3: Bottom Center-Right (Soft Mint Trust Card) */}
            <div className="absolute -bottom-2 right-1 sm:-bottom-4 sm:right-12 md:right-20 w-[155px] xs:w-[175px] sm:w-[220px] bg-[#EDFBEF] rounded-2xl p-3 sm:p-5 shadow-[0_12px_28px_-6px_rgba(15,16,18,0.1)] border border-[#D1F2D6] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 z-20">
              <p className="text-[15px] sm:text-[19px] font-black text-zinc-950 leading-tight mb-0.5 sm:mb-1">
                Zero ghost roles
              </p>
              <p className="text-[10px] sm:text-[11.5px] text-zinc-700 leading-snug">
                No recycled vacancies or dead links. Active African tech openings only.
              </p>
            </div>

            {/* Floating Card 4: Top Left (Soft Ice Blue Direct Contact Card) */}
            <div className="hidden sm:block absolute top-4 left-4 md:left-10 w-[185px] bg-[#EEF6FC] rounded-2xl p-4 shadow-[0_12px_28px_-6px_rgba(15,16,18,0.1)] border border-[#D5E8F7] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200">
              <p className="text-[15px] sm:text-[18px] font-black text-zinc-950 leading-tight mb-1">
                Direct contact
              </p>
              <p className="text-[11px] text-zinc-700 leading-snug">
                Connect directly with founders and hiring leads via WhatsApp or email.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
