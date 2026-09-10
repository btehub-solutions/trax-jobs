"use client";

import Image from "next/image";
import Link from "next/link";
import {
  XLogo,
  LinkedinLogo,
  InstagramLogo,
  YoutubeLogo,
  ArrowUpRight,
  EnvelopeSimple,
} from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0C1222] text-white rounded-t-[32px] sm:rounded-t-[48px] lg:rounded-t-[56px] relative z-20 overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 shadow-[0_-16px_48px_rgba(12,18,34,0.15)]">
      
      {/* Inner Centered Content Container */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* Main Grid: Brand Column + Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-14 border-b border-white/10">
          
          {/* Brand Column (Full width on mobile, Col 1-4 on lg) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-3.5 sm:mb-5">
                <Image
                  src="/images/trax-logo.png"
                  alt="Trax Jobs"
                  width={110}
                  height={32}
                  className="h-6 sm:h-7 w-auto object-contain brightness-0 invert"
                />
              </Link>

              <p className="text-[13.5px] sm:text-[14.5px] text-zinc-400 leading-[1.6] max-w-sm mb-4 sm:mb-5">
                Curated tech opportunities and vetted talent profiles across Nigeria and the wider African startup ecosystem.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href="https://trax.ng"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11.5px] sm:text-[12px] text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E7040D] animate-pulse" />
                  <span>Editorial standard by Trax Media (<strong className="text-white">trax.ng</strong>)</span>
                </a>

                <a
                  href="mailto:jobs@trax.ng"
                  className="text-[12.5px] sm:text-[13px] text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5"
                >
                  <EnvelopeSimple size={14} className="text-[#E7040D]" />
                  <span>jobs@trax.ng</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links Grid (2-column on mobile, 3-column on sm/lg) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10">
            
            {/* Column 1: Find your next role */}
            <div>
              <h3 className="text-[13px] sm:text-[15px] font-bold text-white tracking-tight uppercase sm:normal-case tracking-wider sm:tracking-tight mb-3 sm:mb-4 text-zinc-200 sm:text-white">
                Find your next role
              </h3>
              <ul className="space-y-2.5 sm:space-y-3.5 text-[13px] sm:text-[14px]">
                <li>
                  <Link href="/jobs" className="text-zinc-400 hover:text-white transition-colors">
                    Explore open jobs
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="text-zinc-400 hover:text-white transition-colors">
                    Browse curated companies
                  </Link>
                </li>
                <li>
                  <Link href="/submit-profile" className="text-zinc-400 hover:text-[#E7040D] transition-colors font-medium inline-flex items-center gap-1">
                    <span>Submit your profile</span>
                    <ArrowUpRight size={12} weight="bold" />
                  </Link>
                </li>
                <li>
                  <Link href="/learning" className="text-zinc-400 hover:text-white transition-colors">
                    Learning Hub
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-zinc-400 hover:text-white transition-colors">
                    Career Guides
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Hire vetted talent */}
            <div>
              <h3 className="text-[13px] sm:text-[15px] font-bold text-white tracking-tight uppercase sm:normal-case tracking-wider sm:tracking-tight mb-3 sm:mb-4 text-zinc-200 sm:text-white">
                Hire vetted talent
              </h3>
              <ul className="space-y-2.5 sm:space-y-3.5 text-[13px] sm:text-[14px]">
                <li>
                  <Link href="/talent" className="text-zinc-400 hover:text-white transition-colors">
                    Explore talent directory
                  </Link>
                </li>
                <li>
                  <Link href="/submit-job" className="text-zinc-400 hover:text-[#E7040D] transition-colors font-medium inline-flex items-center gap-1">
                    <span>Post an open job</span>
                    <ArrowUpRight size={12} weight="bold" />
                  </Link>
                </li>
                <li>
                  <Link href="/about?tab=contact&topic=hiring" className="text-zinc-400 hover:text-white transition-colors">
                    Contact editorial desk
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: About us & Socials (Full width row on mobile, 3rd column on sm+) */}
            <div className="col-span-2 sm:col-span-1 pt-4 sm:pt-0 border-t border-white/5 sm:border-t-0">
              <h3 className="text-[13px] sm:text-[15px] font-bold text-white tracking-tight uppercase sm:normal-case tracking-wider sm:tracking-tight mb-3 sm:mb-4 text-zinc-200 sm:text-white">
                About us
              </h3>
              
              {/* On mobile: flex-row wrapping; on tablet/desktop: stacked column */}
              <ul className="flex flex-wrap sm:flex-col gap-x-5 sm:gap-x-0 gap-y-2 sm:gap-y-3.5 text-[13px] sm:text-[14px] mb-4 sm:mb-5">
                <li>
                  <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                    About Trax Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/about?tab=contact" className="text-zinc-400 hover:text-white transition-colors">
                    Contact us
                  </Link>
                </li>
                <li>
                  <a
                    href="https://trax.ng"
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Trax News</span>
                    <ArrowUpRight size={12} weight="bold" />
                  </a>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5 text-zinc-400 pt-1">
                <a
                  href="https://x.com/traxmedia"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#E7040D] hover:border-[#E7040D] hover:text-white flex items-center justify-center transition-all duration-200"
                  aria-label="Trax on X"
                >
                  <XLogo size={14} weight="bold" />
                </a>
                <a
                  href="https://linkedin.com/company/trax-media"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#E7040D] hover:border-[#E7040D] hover:text-white flex items-center justify-center transition-all duration-200"
                  aria-label="Trax on LinkedIn"
                >
                  <LinkedinLogo size={14} weight="fill" />
                </a>
                <a
                  href="https://instagram.com/traxmedia"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#E7040D] hover:border-[#E7040D] hover:text-white flex items-center justify-center transition-all duration-200"
                  aria-label="Trax on Instagram"
                >
                  <InstagramLogo size={14} weight="bold" />
                </a>
                <a
                  href="https://youtube.com/@traxmedia"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#E7040D] hover:border-[#E7040D] hover:text-white flex items-center justify-center transition-all duration-200"
                  aria-label="Trax on YouTube"
                >
                  <YoutubeLogo size={14} weight="fill" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Editorial & Copyright Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 text-[12px] sm:text-[13px] text-zinc-400">
          {/* Provenance & Standards Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Editorial Standards
            </Link>
            <Link href="/about?tab=contact" className="hover:text-white transition-colors">
              Contact & Inquiries
            </Link>
            <a
              href="https://trax.ng"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>trax.ng</span>
              <ArrowUpRight size={11} weight="bold" />
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-zinc-500 text-[11.5px] sm:text-[13px]">
            <span>&copy; 2026 Trax Jobs. Rooted in Ogun State, built for Africa.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
