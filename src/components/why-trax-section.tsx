"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Play,
  Buildings,
  HouseLine,
  Briefcase,
  TrendUp,
  Clock,
  Globe,
  GraduationCap,
  CurrencyCircleDollar,
  MapPin,
  Link as LinkIcon,
  SealCheck,
} from "@phosphor-icons/react";

/* ─────────────────────────────────────────────────────────────
   Authentic African Tech Vector Brand Logos
───────────────────────────────────────────────────────────── */
function BrandLogo({ name }: { name: "Paystack" | "Flutterwave" | "Moniepoint" }) {
  if (name === "Paystack") {
    return (
      <div className="w-7 h-7 rounded-lg bg-[#E8F8FF] border border-[#C7EFFF] flex items-center justify-center shrink-0 shadow-2xs">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="3" rx="1.5" fill="#0BA4DB" />
          <rect x="3" y="10.5" width="12" height="3" rx="1.5" fill="#0BA4DB" />
          <rect x="3" y="17" width="18" height="3" rx="1.5" fill="#0BA4DB" />
        </svg>
      </div>
    );
  }
  if (name === "Flutterwave") {
    return (
      <div className="w-7 h-7 rounded-lg bg-[#FFF3ED] border border-[#FFE0D1] flex items-center justify-center shrink-0 shadow-2xs">
        <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
          <path
            d="M6 16C6 10.477 10.477 6 16 6C19.5 6 22.5 7.8 24.2 10.5L20.8 13.9C19.6 12.4 17.9 11.5 16 11.5C13.515 11.5 11.5 13.515 11.5 16C11.5 18.485 13.515 20.5 16 20.5C17.9 20.5 19.6 19.6 20.8 18.1L24.2 21.5C22.5 24.2 19.5 26 16 26C10.477 26 6 21.523 6 16Z"
            fill="#F56522"
          />
          <path
            d="M16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26"
            stroke="#FFBA00"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
  if (name === "Moniepoint") {
    return (
      <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] border border-[#D7E2FF] flex items-center justify-center shrink-0 shadow-2xs">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6C3 4.89543 3.89543 4 5 4H7.5L12 11.5L16.5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H16.5V11.5L12 19L7.5 11.5V20H5C3.89543 20 3 19.1046 3 18V6Z"
            fill="#0336FF"
          />
        </svg>
      </div>
    );
  }
  return null;
}

export function WhyTraxSection() {
  const [savedRole, setSavedRole] = useState(false);

  return (
    <section className="w-full bg-[#FAF8F5] py-16 sm:py-24 lg:py-28 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold tracking-tight text-zinc-950 leading-[1.14]">
              We are here for every step of your search
            </h2>
            <p className="text-[14px] sm:text-[16px] text-zinc-600 leading-relaxed mt-2.5 sm:mt-3">
              Trax curates every listing, every company profile, and every talent card on this platform. When you find something here, it has earned its place.
            </p>
          </div>
          <div className="hidden sm:block shrink-0">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E7040D] hover:bg-[#CB030B] text-white text-[14px] font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              <span>Browse all jobs</span>
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MOBILE VIEW: Native Horizontal Scroll Carousel (< lg)
        ───────────────────────────────────────────────────────────── */}
        <div className="block lg:hidden">
          {/* Native Horizontal Scroll Container with Snapping */}
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-3.5 pb-2 overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full max-w-[420px] mx-auto"
          >
            {/* CARD 0: Curated Roles */}
            <div className="w-full shrink-0 snap-center bg-white rounded-none overflow-hidden shadow-[0_16px_36px_-8px_rgba(15,16,18,0.12)] border border-black/10 select-none">
              {/* Visual Upper Block (Warm Peach #FCE8DC) */}
              <div className="p-5 sm:p-6 bg-[#FCE8DC] flex items-center justify-center min-h-[340px] sm:min-h-[360px] relative overflow-hidden">
                <div className="relative w-full max-w-[340px]">
                  {/* Ghost card layers with square edges */}
                  <div className="absolute -top-2 -left-2 w-[97%] h-[95%] bg-white/60 rounded-none -rotate-3 -z-20 border border-white/50 shadow-2xs" />
                  <div className="absolute top-1.5 -right-2 w-[98%] h-[96%] bg-white/80 rounded-none rotate-2 -z-10 border border-white/70 shadow-xs" />

                  {/* Floating Trax Yellow Sticker */}
                  <div className="absolute -top-3.5 right-1 z-30 bg-[#FBBF24] text-zinc-950 text-[10.5px] font-black px-2.5 py-0.5 rounded-none shadow-sm border border-amber-400 flex items-center gap-1.5 rotate-2">
                    <span>New matches</span>
                    <span className="w-4 h-4 rounded-none bg-zinc-950 text-white flex items-center justify-center text-[9px] font-black">
                      6
                    </span>
                  </div>

                  {/* Front Main Job Card */}
                  <div className="relative z-10 w-full bg-white rounded-none p-4 shadow-[0_14px_28px_-6px_rgba(15,16,18,0.14)] border border-black/10 space-y-3">
                    <div>
                      <h4 className="text-[16px] font-black text-black tracking-tight leading-tight">
                        Senior Frontend Engineer
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <BrandLogo name="Paystack" />
                        <div>
                          <p className="text-[12px] font-bold text-zinc-900 leading-tight">Paystack</p>
                          <p className="text-[10px] text-zinc-500">Payments &bull; Lagos, Nigeria</p>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="px-2 py-0.5 rounded-none bg-[#E2F2E6] text-[#14532D] text-[10px] font-bold flex items-center gap-1 border border-emerald-200">
                        <CurrencyCircleDollar size={11} weight="bold" />
                        <span>₦28M - ₦38M/yr</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-none bg-[#E2F2E6] text-[#14532D] text-[10px] font-bold border border-emerald-200">
                        Senior
                      </span>
                      <span className="px-2 py-0.5 rounded-none bg-[#E2F2E6] text-[#14532D] text-[10px] font-bold flex items-center gap-0.5 border border-emerald-200">
                        <MapPin size={11} weight="fill" />
                        <span>Lagos</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-none bg-zinc-100 text-zinc-700 border border-zinc-200/90 text-[10px] font-semibold">
                        Hybrid
                      </span>
                      <span className="px-2 py-0.5 rounded-none bg-zinc-100 text-zinc-700 border border-zinc-200/90 text-[10px] font-semibold">
                        React
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSavedRole(!savedRole)}
                        className={`flex-1 flex items-center justify-center gap-1 py-2 px-2.5 rounded-none text-[11.5px] font-black transition-all cursor-pointer ${
                          savedRole
                            ? "bg-emerald-600 text-white"
                            : "bg-[#E7040D] hover:bg-[#CB030B] text-white"
                        }`}
                      >
                        <Heart size={13} weight={savedRole ? "fill" : "bold"} />
                        <span>{savedRole ? "Saved" : "Save role"}</span>
                      </button>
                      <Link
                        href="/jobs"
                        className="flex-1 flex items-center justify-center gap-1 py-2 px-2.5 rounded-none bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[11.5px] font-bold border border-zinc-200 text-center"
                      >
                        <span>View details</span>
                        <ArrowRight size={11} weight="bold" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Lower Block */}
              <div className="py-8 px-6 sm:px-7 bg-white border-t border-zinc-100">
                <h3 className="text-[23px] sm:text-[25px] font-black text-black tracking-tight leading-[1.18] mb-3">
                  Looking for the{" "}
                  <span className="inline-block bg-[#FCE8E0] text-[#E7040D] px-2 py-0.5 rounded-none font-black border border-[#F9D5C7]">
                    right role?
                  </span>
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-zinc-600 leading-[1.7]">
                  <strong className="font-bold text-zinc-950">Start matching!</strong> Tell us who you are and what you build. Trax surfaces verified openings tailored to your craft, no ghost jobs or endless scrolling required.
                </p>
              </div>
            </div>

            {/* CARD 1: Direct Outreach */}
            <div className="w-full shrink-0 snap-center bg-white rounded-none overflow-hidden shadow-[0_16px_36px_-8px_rgba(15,16,18,0.12)] border border-black/10 select-none">
              {/* Visual Upper Block (Pale Honey #FBF4DC) */}
              <div className="p-5 sm:p-6 bg-[#FBF4DC] flex items-center justify-center min-h-[340px] sm:min-h-[360px] relative overflow-hidden">
                {/* Floating Notification 1 (Flutterwave) */}
                <div className="absolute top-3 left-2 sm:left-3 z-20 w-[205px] bg-white rounded-none p-2.5 shadow-md border border-zinc-200/80 flex items-start gap-2 -rotate-3">
                  <BrandLogo name="Flutterwave" />
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold text-zinc-950 truncate leading-tight">
                      Flutterwave Talent
                    </p>
                    <p className="text-[9px] text-zinc-600 line-clamp-1 leading-snug mt-0.5">
                      &ldquo;Hi Amara, your UX portfolio caught our eye...&rdquo;
                    </p>
                  </div>
                </div>

                {/* Main Candidate Card */}
                <div className="relative z-10 w-full max-w-[225px] bg-white rounded-none p-4 shadow-md border border-black/10 text-center flex flex-col items-center mt-3">
                  <p className="text-[9.5px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Curated Profile
                  </p>
                  <div className="relative w-16 h-16 rounded-none overflow-hidden shadow-2xs border-2 border-[#FBBF24] mb-2">
                    <Image
                      src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Amara Osei"
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    <h5 className="text-[14px] font-black text-black tracking-tight leading-tight">
                      Amara Osei
                    </h5>
                    <SealCheck size={14} weight="fill" className="text-[#E7040D]" />
                  </div>
                  <p className="text-[11px] font-medium text-zinc-600 mt-0.5">
                    Senior Product Designer
                  </p>
                  <p className="text-[9.5px] text-zinc-400">Ex-Paystack &bull; Lagos, NG</p>
                  <div className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-[#E2F2E6] text-[#14532D] text-[9.5px] font-bold border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>2 new recruiter requests</span>
                  </div>
                </div>

                {/* Floating Notification 2 (Moniepoint) */}
                <div className="absolute bottom-3 left-2 sm:left-3 z-20 w-[205px] bg-white rounded-none p-2.5 shadow-md border border-zinc-200/80 flex items-start gap-2 rotate-3">
                  <BrandLogo name="Moniepoint" />
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold text-zinc-950 truncate leading-tight">
                      Moniepoint Design
                    </p>
                    <p className="text-[9px] text-zinc-600 line-clamp-1 leading-snug mt-0.5">
                      &ldquo;We would love to invite you for a chat...&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Lower Block */}
              <div className="py-8 px-6 sm:px-7 bg-white border-t border-zinc-100">
                <h3 className="text-[23px] sm:text-[25px] font-black text-black tracking-tight leading-[1.18] mb-3">
                  What if recruiters{" "}
                  <span className="inline-block bg-[#FEF3C7] text-zinc-950 px-2 py-0.5 rounded-none font-black border border-amber-300">
                    came to you?
                  </span>
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-zinc-600 leading-[1.7]">
                  <strong className="font-bold text-zinc-950">Now they can.</strong> Publish your verified profile so leading African engineering and design teams reach out directly via WhatsApp or email with zero platform locks.
                </p>
              </div>
            </div>

            {/* CARD 2: Company Culture */}
            <div className="w-full shrink-0 snap-center bg-white rounded-none overflow-hidden shadow-[0_16px_36px_-8px_rgba(15,16,18,0.12)] border border-black/10 select-none">
              {/* Visual Upper Block (Celadon Mint #E2F2E6) */}
              <div className="p-4 sm:p-5 bg-[#E2F2E6] min-h-[340px] sm:min-h-[360px] flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3 px-0.5">
                  <div className="w-6 h-6 rounded-none bg-white shadow-2xs flex items-center justify-center text-zinc-900 shrink-0">
                    <Buildings size={12} weight="bold" />
                  </div>
                  <h4 className="text-[14px] font-black text-black tracking-tight">
                    You&apos;ll be part of
                  </h4>
                </div>

                {/* 3-column micro grid */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {/* Col 1: Office */}
                  <div className="bg-white rounded-none overflow-hidden shadow-2xs border border-black/10 flex flex-col h-[200px]">
                    <div className="h-6 border-b border-zinc-100 flex items-center justify-center text-[9.5px] font-bold text-zinc-800">
                      Office
                    </div>
                    <div className="relative w-full h-[120px] bg-[#E8EEF5] overflow-hidden">
                      <svg className="w-full h-full object-cover" viewBox="0 0 200 140" fill="none">
                        <rect width="200" height="140" fill="#E8EEF5" />
                        <path d="M-10 105 Q30 85 70 110 L50 150 L-10 150 Z" fill="#D3E4F4" />
                        <path d="M-10 32 L210 20" stroke="#FFFFFF" strokeWidth="12" />
                        <path d="M35 -10 L20 150" stroke="#FFFFFF" strokeWidth="9" />
                        <path d="M125 -10 L145 150" stroke="#FFFFFF" strokeWidth="12" />
                        <path d="M-10 90 L210 65" stroke="#FFFFFF" strokeWidth="14" />
                        <path d="M98 -10 L108 150" stroke="#FFE9A8" strokeWidth="8" />
                        <rect x="38" y="36" width="20" height="15" fill="#DDE4ED" />
                        <rect x="112" y="20" width="22" height="36" fill="#D4DEE8" />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-none bg-zinc-950 text-white flex items-center justify-center shadow-xs">
                          <Buildings size={10} weight="fill" />
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5 bg-white flex flex-col justify-center flex-1">
                      <p className="text-[10px] font-black text-black leading-tight truncate">Lagos, NG</p>
                      <p className="text-[8px] text-zinc-400 truncate mt-0.5">Victoria Island</p>
                    </div>
                  </div>

                  {/* Col 2: Benefits */}
                  <div className="bg-white rounded-none p-1.5 shadow-2xs border border-black/10 flex flex-col justify-between h-[200px] overflow-hidden">
                    <div className="h-6 border-b border-zinc-100 flex items-center justify-center text-[9.5px] font-bold text-zinc-800 -mx-1.5 -mt-1.5 mb-1.5">
                      Benefits
                    </div>
                    <div className="space-y-1 flex-1 flex flex-col justify-start overflow-hidden">
                      <div className="h-[18px] px-1 rounded-none bg-[#DCFCE7] text-[#14532D] text-[8px] font-semibold flex items-center gap-1 truncate">
                        <Heart size={8} weight="fill" className="text-emerald-700 shrink-0" />
                        <span className="truncate">Mental health</span>
                      </div>
                      <div className="h-[18px] px-1 rounded-none bg-[#DCFCE7] text-[#14532D] text-[8px] font-semibold flex items-center gap-1 truncate">
                        <Briefcase size={8} weight="fill" className="text-emerald-700 shrink-0" />
                        <span className="truncate">Bonus pay</span>
                      </div>
                      <div className="h-[18px] px-1 rounded-none bg-[#DCFCE7] text-[#14532D] text-[8px] font-semibold flex items-center gap-1 truncate">
                        <TrendUp size={8} weight="bold" className="text-emerald-700 shrink-0" />
                        <span className="truncate">Equity ESOP</span>
                      </div>
                      <div className="h-[18px] px-1 rounded-none bg-zinc-100 text-zinc-800 text-[8px] font-medium flex items-center gap-1 truncate">
                        <Buildings size={8} weight="bold" className="text-zinc-600 shrink-0" />
                        <span className="truncate">HMO care</span>
                      </div>
                      <div className="h-[18px] px-1 rounded-none bg-zinc-100 text-zinc-800 text-[8px] font-medium flex items-center gap-1 truncate">
                        <HouseLine size={8} weight="bold" className="text-zinc-600 shrink-0" />
                        <span className="truncate">Full remote</span>
                      </div>
                    </div>
                    <div className="pt-0.5">
                      <span className="inline-block px-1.5 py-0.2 rounded-none bg-zinc-100 text-zinc-600 text-[8px] font-bold border border-zinc-200">
                        +12
                      </span>
                    </div>
                  </div>

                  {/* Col 3: Team */}
                  <div className="bg-white rounded-none overflow-hidden shadow-2xs border border-black/10 flex flex-col h-[200px]">
                    <div className="h-6 border-b border-zinc-100 flex items-center justify-center text-[9.5px] font-bold text-zinc-800">
                      Meet team
                    </div>
                    <div className="relative w-full flex-1 overflow-hidden">
                      <Image
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Tolu, VP Engineering"
                        fill
                        sizes="110px"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-1.5 text-white">
                        <div className="flex items-center gap-1">
                          <span className="w-3.5 h-3.5 rounded-none bg-[#FBBF24] text-black flex items-center justify-center shrink-0">
                            <Play size={6} weight="fill" />
                          </span>
                          <p className="text-[8.5px] font-bold text-white leading-tight truncate">
                            Tolu Adelaja
                          </p>
                        </div>
                        <p className="text-[7px] text-zinc-300 line-clamp-1 mt-0.5">
                          VP Engineering
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Lower Block */}
              <div className="py-8 px-6 sm:px-7 bg-white border-t border-zinc-100">
                <h3 className="text-[23px] sm:text-[25px] font-black text-black tracking-tight leading-[1.18] mb-3">
                  Get a feel of what it&apos;s{" "}
                  <span className="inline-block bg-[#DCFCE7] text-emerald-900 px-2 py-0.5 rounded-none font-black border border-emerald-300">
                    really
                  </span>{" "}
                  like
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-zinc-600 leading-[1.7]">
                  <strong className="font-bold text-zinc-950">Go behind the scenes.</strong> Detailed company profiles with verified office locations across Lagos and Nairobi, actual team perks, and real engineering stories: apply with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            DESKTOP VIEW: 3 Showcase Blocks (>= lg breakpoint)
        ───────────────────────────────────────────────────────────── */}
        <div className="hidden lg:block space-y-20 lg:space-y-28">

          {/* ══════════════════════════════════════════════════════════
              BLOCK 1: Curated Roles (Trax Warm Peach Canvas #FCE8DC)
              Left: Notepad memo card
              Right: Stacked Paystack engineering job card
          ══════════════════════════════════════════════════════════ */}
          <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center pt-2 pb-8">
            
            {/* Left Notepad Card */}
            <div
              className="w-full max-w-[270px] lg:w-[270px] min-h-[255px] sm:min-h-[265px] bg-white rounded-t-[18px] rounded-b-[12px] p-5 sm:p-5.5 shadow-[0_12px_28px_-8px_rgba(15,16,18,0.1)] border border-black/5 relative z-20 lg:-rotate-3 lg:-mr-6 lg:mt-5 shrink-0 transition-transform duration-300 hover:rotate-0 flex flex-col justify-start"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 16px),
                  repeating-linear-gradient(90deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 16px)
                `,
              }}
            >
              {/* Torn fold detail on top-left */}
              <div className="absolute -top-[1px] -left-[1px] w-5 h-5 overflow-hidden pointer-events-none z-20">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M0 0 L20 0 L0 20 Z" fill="#FAF8F5" />
                  <path d="M0 20 L20 20 L20 0 Z" fill="#E8DFD3" stroke="#D3C7B5" strokeWidth="0.75" />
                </svg>
              </div>

              {/* Headline */}
              <h3 className="text-[22px] sm:text-[25px] font-black text-black tracking-[-0.03em] leading-[1.12] mb-3">
                Looking for
                <br />
                the{" "}
                <span className="inline-block bg-[#FCE8E0] text-[#E7040D] px-1.5 py-0.5 rounded-sm -rotate-2 font-black text-[20px] sm:text-[23px] border border-[#F9D5C7]">
                  right role?
                </span>
              </h3>

              {/* Body */}
              <p className="text-[12px] sm:text-[12.5px] text-zinc-700 leading-[1.6] font-normal">
                <strong className="font-bold text-black">Start matching!</strong> Tell us who you are and what you build. Trax surfaces verified openings tailored to your craft, no ghost jobs or endless scrolling required.
              </p>
            </div>

            {/* Right Container: Warm Peach Alabaster (#FCE8DC) with Stacked Job Cards */}
            <div className="w-full max-w-[600px] lg:w-[600px] bg-white rounded-[20px] overflow-hidden shadow-[0_16px_36px_-10px_rgba(231,4,13,0.08)] border border-black/5 relative z-10 mt-5 lg:mt-0 shrink-0">
              {/* White header bar */}
              <div className="h-7 bg-white border-b border-zinc-100" />

              {/* Trax Warm Peach Body */}
              <div className="p-6 sm:p-8 bg-[#FCE8DC] flex items-center justify-center min-h-[280px] relative overflow-hidden">
                
                {/* Relative Stack Wrapper */}
                <div className="relative w-full max-w-[400px]">
                  
                  {/* Ghost card 2 (deepest back layer) */}
                  <div className="absolute -top-1.5 -left-2.5 w-[96%] h-[94%] bg-white/60 rounded-[16px] -rotate-3 -z-20 border border-white/40 shadow-2xs" />

                  {/* Ghost card 1 (mid back layer) */}
                  <div className="absolute top-1 -right-2.5 w-[97%] h-[95%] bg-white/80 rounded-[16px] rotate-2 -z-10 border border-white/60 shadow-xs" />

                  {/* Floating Trax Yellow Sticker ("New matches 6") */}
                  <div className="absolute -top-3.5 right-2 sm:right-3 z-30 bg-[#FBBF24] text-zinc-950 text-[11px] font-black px-3 py-1 rounded-xl shadow-md border border-amber-300 flex items-center gap-1.5 rotate-2">
                    <span>New matches</span>
                    <span className="w-4 h-4 rounded-full bg-zinc-950 text-white flex items-center justify-center text-[9.5px] font-black">
                      6
                    </span>
                  </div>

                  {/* Front Main Job Card */}
                  <div className="relative z-10 w-full bg-white rounded-[16px] p-4 sm:p-5 shadow-[0_14px_30px_-6px_rgba(15,16,18,0.14)] border border-black/5 space-y-3">
                    
                    {/* Role Title & Company Header */}
                    <div>
                      <h4 className="text-[17px] sm:text-[19px] font-black text-black tracking-tight leading-tight">
                        Senior Frontend Engineer
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <BrandLogo name="Paystack" />
                        <div>
                          <p className="text-[12.5px] font-bold text-zinc-900 leading-tight">Paystack</p>
                          <p className="text-[10px] text-zinc-500">Payments &bull; Lagos, Nigeria</p>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Pills Row */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#E2F2E6] text-[#14532D] text-[10px] font-bold flex items-center gap-1 border border-emerald-200">
                        <CurrencyCircleDollar size={11} weight="bold" />
                        <span>₦28M - ₦38M/yr</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#E2F2E6] text-[#14532D] text-[10px] font-bold flex items-center gap-1 border border-emerald-200">
                        <LinkIcon size={11} weight="bold" />
                        <span>Senior</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#E2F2E6] text-[#14532D] text-[10px] font-bold flex items-center gap-1 border border-emerald-200">
                        <MapPin size={11} weight="fill" />
                        <span>Lagos</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200/90 text-[10px] font-semibold flex items-center gap-1">
                        <HouseLine size={11} weight="bold" />
                        <span>Hybrid / Remote</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200/90 text-[10px] font-semibold">
                        Fintech
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200/90 text-[10px] font-semibold">
                        React &bull; Next.js
                      </span>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-1.5 flex items-center gap-2.5">
                      <button
                        onClick={() => setSavedRole(!savedRole)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[12px] font-black transition-all cursor-pointer select-none active:scale-95 ${
                          savedRole
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "bg-[#E7040D] hover:bg-[#CB030B] text-white shadow-2xs"
                        }`}
                      >
                        <Heart size={14} weight={savedRole ? "fill" : "bold"} />
                        <span>{savedRole ? "Saved" : "Save role"}</span>
                      </button>

                      <Link
                        href="/jobs"
                        className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[12px] font-bold border border-zinc-200 shadow-2xs transition-colors"
                      >
                        <span>View details</span>
                        <ArrowRight size={12} weight="bold" />
                      </Link>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════
              BLOCK 2: Direct Outreach (Pale Honey Linen #FBF4DC)
              Left: Vetted African talent profile + inbound recruiter requests
              Right: Notepad memo card
          ══════════════════════════════════════════════════════════ */}
          <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center pt-2 pb-8">
            
            {/* Left Container: Pale Honey Linen with African Candidate Profile */}
            <div className="w-full max-w-[600px] lg:w-[600px] bg-white rounded-[20px] overflow-hidden shadow-[0_16px_36px_-10px_rgba(202,138,4,0.12)] border border-black/5 relative z-10 order-2 lg:order-1 mt-5 lg:mt-0 shrink-0">
              {/* White header bar */}
              <div className="h-7 bg-white border-b border-zinc-100" />

              {/* Pale Honey Linen Body */}
              <div className="p-6 sm:p-8 bg-[#FBF4DC] flex items-center justify-center min-h-[280px] relative overflow-hidden">
                
                {/* Floating Notification Bubble 1 (Top Left: Flutterwave) */}
                <div className="absolute top-3 left-3 sm:left-5 z-20 w-[205px] sm:w-[225px] bg-white rounded-xl p-2.5 shadow-[0_10px_24px_-4px_rgba(15,16,18,0.14)] border border-zinc-200/80 flex items-start gap-2 -rotate-3">
                  <BrandLogo name="Flutterwave" />
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold text-zinc-950 truncate leading-tight">
                      Flutterwave Talent Team
                    </p>
                    <p className="text-[9px] text-zinc-600 line-clamp-1 leading-snug mt-0.5">
                      &ldquo;Hi Amara, your fintech UX portfolio caught our eye...&rdquo;
                    </p>
                  </div>
                </div>

                {/* Main Candidate Card */}
                <div className="relative z-10 w-full max-w-[250px] bg-white rounded-[16px] p-4 sm:p-4.5 shadow-[0_14px_30px_-6px_rgba(15,16,18,0.14)] border border-black/5 text-center flex flex-col items-center">
                  
                  <p className="text-[9.5px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Curated Profile
                  </p>

                  {/* Avatar Portrait: Amara Osei */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-2xs border-2 border-[#FBBF24] mb-2">
                    <Image
                      src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Amara Osei"
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex items-center gap-1 justify-center">
                    <h5 className="text-[14.5px] font-black text-black tracking-tight leading-tight">
                      Amara Osei
                    </h5>
                    <SealCheck size={14} weight="fill" className="text-[#E7040D]" />
                  </div>

                  <p className="text-[11px] font-medium text-zinc-600 mt-0.5">
                    Senior Product Designer
                  </p>
                  <p className="text-[9.5px] text-zinc-400">
                    Ex-Paystack &bull; Lagos, NG
                  </p>

                  {/* Status Badge */}
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E2F2E6] text-[#14532D] text-[9.5px] font-bold border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>2 new recruiter requests</span>
                  </div>
                </div>

                {/* Floating Notification Bubble 2 (Bottom Left: Moniepoint) */}
                <div className="absolute bottom-3 left-3 sm:left-6 z-20 w-[205px] sm:w-[225px] bg-white rounded-xl p-2.5 shadow-[0_10px_24px_-4px_rgba(15,16,18,0.14)] border border-zinc-200/80 flex items-start gap-2 rotate-3">
                  <BrandLogo name="Moniepoint" />
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold text-zinc-950 truncate leading-tight">
                      Moniepoint Design Team
                    </p>
                    <p className="text-[9px] text-zinc-600 line-clamp-1 leading-snug mt-0.5">
                      &ldquo;We would love to invite you for a discovery chat...&rdquo;
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Notepad Card */}
            <div
              className="w-full max-w-[270px] lg:w-[270px] min-h-[255px] sm:min-h-[265px] bg-white rounded-t-[18px] rounded-b-[12px] p-5 sm:p-5.5 shadow-[0_12px_28px_-8px_rgba(15,16,18,0.1)] border border-black/5 relative z-20 order-1 lg:order-2 lg:rotate-2 lg:-ml-6 lg:mt-5 shrink-0 transition-transform duration-300 hover:rotate-0 flex flex-col justify-start"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 16px),
                  repeating-linear-gradient(90deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 16px)
                `,
              }}
            >
              {/* Torn fold detail on top-left */}
              <div className="absolute -top-[1px] -left-[1px] w-5 h-5 overflow-hidden pointer-events-none z-20">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M0 0 L20 0 L0 20 Z" fill="#FAF8F5" />
                  <path d="M0 20 L20 20 L20 0 Z" fill="#E8DFD3" stroke="#D3C7B5" strokeWidth="0.75" />
                </svg>
              </div>

              {/* Headline */}
              <h3 className="text-[22px] sm:text-[25px] font-black text-black tracking-[-0.03em] leading-[1.12] mb-3">
                What if
                <br />
                recruiters
                <br />
                <span className="inline-block bg-[#FEF3C7] text-zinc-950 px-1.5 py-0.5 rounded-sm rotate-1 font-black text-[20px] sm:text-[23px] border border-amber-300">
                  came to you?
                </span>
              </h3>

              {/* Body */}
              <p className="text-[12px] sm:text-[12.5px] text-zinc-700 leading-[1.6] font-normal">
                <strong className="font-bold text-black">Now they can.</strong> Publish your verified profile so leading African engineering and design teams reach out directly via WhatsApp or email with zero platform locks.
              </p>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════
              BLOCK 3: Verified Culture & Team (Celadon Mint Linen #E2F2E6)
              Left: Notepad memo card
              Right: 3-column culture tray (Lagos HQ, Real Perks, Meet Tolu)
          ══════════════════════════════════════════════════════════ */}
          <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center pt-2 pb-10">

            {/* Left Notepad Card */}
            <div
              className="w-full max-w-[270px] lg:w-[270px] min-h-[255px] sm:min-h-[265px] bg-white rounded-t-[18px] rounded-b-[12px] p-5 sm:p-5.5 shadow-[0_12px_28px_-8px_rgba(15,16,18,0.1)] border border-black/5 relative z-20 lg:-rotate-3 lg:-mr-6 lg:mt-5 shrink-0 transition-transform duration-300 hover:rotate-0 flex flex-col justify-start"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 16px),
                  repeating-linear-gradient(90deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 16px)
                `,
              }}
            >
              {/* Small torn-paper fold detail on top-left corner */}
              <div className="absolute -top-[1px] -left-[1px] w-5 h-5 overflow-hidden pointer-events-none z-20">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M0 0 L20 0 L0 20 Z" fill="#FAF8F5" />
                  <path d="M0 20 L20 20 L20 0 Z" fill="#E8DFD3" stroke="#D3C7B5" strokeWidth="0.75" />
                </svg>
              </div>

              {/* Headline */}
              <h3 className="text-[22px] sm:text-[25px] font-black text-black tracking-[-0.03em] leading-[1.12] mb-3">
                Get a feel of
                <br />
                what it&apos;s{" "}
                <span className="inline-block bg-[#DCFCE7] text-emerald-900 px-1.5 py-0.5 rounded-sm -rotate-2 font-black text-[20px] sm:text-[23px] border border-emerald-300">
                  really
                </span>
                <br />
                like
              </h3>

              {/* Body text */}
              <p className="text-[12px] sm:text-[12.5px] text-zinc-700 leading-[1.6] font-normal">
                <strong className="font-bold text-black">Go behind the scenes.</strong>{" "}
                Detailed company profiles with verified office locations across Lagos and Nairobi, actual team perks, and real engineering stories: apply with confidence.
              </p>
            </div>

            {/* Right Container: Celadon Mint Linen (#E2F2E6) with Culture Tray */}
            <div className="w-full max-w-[600px] lg:w-[600px] bg-white rounded-[20px] overflow-hidden shadow-[0_16px_36px_-10px_rgba(22,101,52,0.1)] border border-black/5 relative z-10 mt-5 lg:mt-0 shrink-0">
              
              {/* White header bar */}
              <div className="h-7 bg-white border-b border-zinc-100" />

              {/* Celadon Mint Body */}
              <div className="p-4 sm:p-4.5 bg-[#E2F2E6]">
                
                {/* Top row: icon + heading */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-md bg-white shadow-2xs flex items-center justify-center text-zinc-900 shrink-0">
                    <Buildings size={13} weight="bold" />
                  </div>
                  <h4 className="text-[15px] sm:text-[16px] font-black text-black tracking-tight">
                    You&apos;ll be part of
                  </h4>
                </div>

                {/* 3-column grid of equal-width white rounded cards with 10px gaps */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">

                  {/* Column 1: Lagos HQ Location */}
                  <div className="bg-white rounded-[14px] overflow-hidden shadow-2xs border border-black/5 flex flex-col h-[235px]">
                    <div className="h-7 border-b border-zinc-100 flex items-center justify-center text-[10.5px] font-bold text-zinc-800">
                      Office location
                    </div>
                    {/* Lagos Island Map Graphic */}
                    <div className="relative w-full h-[140px] bg-[#E8EEF5] overflow-hidden">
                      <svg className="w-full h-full object-cover" viewBox="0 0 200 140" fill="none" preserveAspectRatio="xMidYMid slice">
                        <rect width="200" height="140" fill="#E8EEF5" />
                        {/* Lagos lagoon coast */}
                        <path d="M-10 105 Q30 85 70 110 L50 150 L-10 150 Z" fill="#D3E4F4" />
                        {/* City streets (Sanusi Fafunwa, Adeola Odeku) */}
                        <path d="M-10 32 L210 20" stroke="#FFFFFF" strokeWidth="9" />
                        <path d="M35 -10 L20 150" stroke="#FFFFFF" strokeWidth="7" />
                        <path d="M125 -10 L145 150" stroke="#FFFFFF" strokeWidth="9" />
                        <path d="M-10 90 L210 65" stroke="#FFFFFF" strokeWidth="10" />
                        <path d="M65 14 L195 130" stroke="#FFFFFF" strokeWidth="7" />
                        <path d="M-10 56 L210 44" stroke="#FFFFFF" strokeWidth="12" />
                        <path d="M98 -10 L108 150" stroke="#FFE9A8" strokeWidth="6" />
                        <path d="M-10 56 L210 44" stroke="#F6C85F" strokeWidth="2" strokeDasharray="4 3" />
                        <rect x="38" y="36" width="16" height="12" rx="2" fill="#DDE4ED" />
                        <rect x="65" y="34" width="20" height="14" rx="2" fill="#D4DEE8" />
                        <rect x="38" y="60" width="42" height="22" rx="2" fill="#DDE4ED" />
                        <rect x="112" y="20" width="18" height="30" rx="2" fill="#D4DEE8" />
                        <rect x="145" y="48" width="22" height="14" rx="2" fill="#DDE4ED" />
                        <rect x="112" y="64" width="30" height="20" rx="2" fill="#CCD8E5" />
                      </svg>
                      {/* Dark location pin with building icon */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none drop-shadow-xs">
                        <div className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center shadow-xs border-[1.5px] border-white">
                          <Buildings size={11} weight="fill" className="text-white" />
                        </div>
                        <div className="w-1.5 h-1.5 bg-zinc-950 rotate-45 -mt-0.5" />
                      </div>
                    </div>
                    {/* Address Text */}
                    <div className="p-2 bg-white flex flex-col justify-center flex-1">
                      <p className="text-[11.5px] font-black text-black leading-tight">Lagos, Nigeria</p>
                      <p className="text-[9px] text-zinc-500 font-medium leading-tight mt-0.5">Victoria Island Tech Hub</p>
                      <p className="text-[8.5px] text-zinc-400 font-normal leading-tight mt-0.5 truncate">Plot 1684 Sanusi Fafunwa St</p>
                    </div>
                  </div>

                  {/* Column 2: Authentic Benefits */}
                  <div className="bg-white rounded-[14px] p-2 shadow-2xs border border-black/5 flex flex-col justify-between h-[235px] overflow-hidden">
                    <div className="h-7 border-b border-zinc-100 flex items-center justify-center text-[10.5px] font-bold text-zinc-800 -mx-2 -mt-2 mb-1.5 px-2">
                      Benefits
                    </div>
                    <div className="space-y-1 overflow-hidden flex-1 flex flex-col justify-start">
                      <div className="h-[20px] px-1.5 rounded-full bg-[#DCFCE7] text-[#14532D] text-[9px] font-semibold flex items-center gap-1 truncate shrink-0">
                        <Heart size={9} weight="fill" className="text-emerald-700 shrink-0" />
                        <span className="truncate">Mental health coverage</span>
                      </div>
                      <div className="h-[20px] px-1.5 rounded-full bg-[#DCFCE7] text-[#14532D] text-[9px] font-semibold flex items-center gap-1 truncate shrink-0">
                        <Briefcase size={9} weight="fill" className="text-emerald-700 shrink-0" />
                        <span className="truncate">Performance bonus</span>
                      </div>
                      <div className="h-[20px] px-1.5 rounded-full bg-[#DCFCE7] text-[#14532D] text-[9px] font-semibold flex items-center gap-1 truncate shrink-0">
                        <TrendUp size={9} weight="bold" className="text-emerald-700 shrink-0" />
                        <span className="truncate">Equity options (ESOP)</span>
                      </div>
                      <div className="h-[20px] px-1.5 rounded-full bg-zinc-100 text-zinc-800 text-[9px] font-medium flex items-center gap-1 truncate shrink-0">
                        <Buildings size={9} weight="bold" className="text-zinc-600 shrink-0" />
                        <span className="truncate">Comprehensive HMO</span>
                      </div>
                      <div className="h-[20px] px-1.5 rounded-full bg-zinc-100 text-zinc-800 text-[9px] font-medium flex items-center gap-1 truncate shrink-0">
                        <HouseLine size={9} weight="bold" className="text-zinc-600 shrink-0" />
                        <span className="truncate">Open to full remote</span>
                      </div>
                      <div className="h-[20px] px-1.5 rounded-full bg-zinc-100 text-zinc-800 text-[9px] font-medium flex items-center gap-1 truncate shrink-0">
                        <Clock size={9} weight="bold" className="text-zinc-600 shrink-0" />
                        <span className="truncate">Flexible working hours</span>
                      </div>
                      <div className="h-[20px] px-1.5 rounded-full bg-zinc-100 text-zinc-800 text-[9px] font-medium flex items-center gap-1 truncate shrink-0">
                        <Globe size={9} weight="bold" className="text-zinc-600 shrink-0" />
                        <span className="truncate">Work from anywhere</span>
                      </div>
                      <div className="h-[20px] px-1.5 rounded-full bg-zinc-100 text-zinc-800 text-[9px] font-medium flex items-center gap-1 truncate shrink-0">
                        <GraduationCap size={9} weight="bold" className="text-zinc-600 shrink-0" />
                        <span className="truncate">Annual learning budget</span>
                      </div>
                    </div>
                    <div className="pt-1">
                      <span className="inline-block px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[8.5px] font-bold border border-zinc-200">
                        +12
                      </span>
                    </div>
                  </div>

                  {/* Column 3: Meet African Engineering Lead */}
                  <div className="bg-white rounded-[14px] overflow-hidden shadow-2xs border border-black/5 flex flex-col h-[235px]">
                    <div className="h-7 border-b border-zinc-100 flex items-center justify-center text-[10.5px] font-bold text-zinc-800">
                      Meet your team
                    </div>
                    <div className="relative w-full flex-1 overflow-hidden">
                      <Image
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Meet Tolu, VP Engineering"
                        fill
                        sizes="(max-width: 640px) 100vw, 180px"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent flex flex-col justify-end p-2 text-white">
                        <div className="flex items-start gap-1.5">
                          <span className="w-4 h-4 rounded bg-[#FBBF24] text-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            <Play size={7} weight="fill" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[9.5px] font-bold text-white leading-tight">
                              Meet Tolu, <span className="font-normal text-zinc-300">VP Engineering</span>
                            </p>
                            <p className="text-[8px] text-zinc-300 line-clamp-1 leading-snug mt-0.5">
                              Building payment rails across 12 countries...
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
