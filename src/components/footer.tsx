"use client";

import Image from "next/image";
import Link from "next/link";
import {
  XLogo,
  LinkedinLogo,
  InstagramLogo,
  YoutubeLogo,
  ArrowUpRight,
} from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0C1222] text-white rounded-t-[40px] sm:rounded-t-[56px] relative z-20 overflow-hidden pt-16 sm:pt-20 pb-12 shadow-[0_-16px_48px_rgba(12,18,34,0.15)]">
      
      {/* Inner Centered Content Container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Top Grid: Logo + 3 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/trax-logo.png"
                  alt="Trax Jobs"
                  width={110}
                  height={32}
                  className="h-7 w-auto object-contain brightness-0 invert"
                />
              </Link>

              <p className="text-[14.5px] text-zinc-400 leading-[1.7] max-w-sm mb-6">
                Curated tech opportunities and vetted talent profiles across Nigeria and the wider African startup ecosystem.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-[#E7040D] animate-pulse" />
                <span>Editorial standard by Trax Media (<strong className="text-white">trax.ng</strong>)</span>
              </div>
            </div>
          </div>

          {/* Column 1: Find your next job (Col 5-7) */}
          <div className="lg:col-span-3">
            <h3 className="text-[16px] font-bold text-white tracking-tight mb-5">
              Find your next role
            </h3>
            <ul className="space-y-3.5 text-[14px]">
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
                <Link href="/jobs?type=remote" className="text-zinc-400 hover:text-white transition-colors">
                  Remote African roles
                </Link>
              </li>
              <li>
                <Link href="/about?tab=contact&topic=talent" className="text-zinc-400 hover:text-[#E7040D] transition-colors font-medium inline-flex items-center gap-1">
                  <span>Submit your profile</span>
                  <ArrowUpRight size={13} weight="bold" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Hire the right talent (Col 8-9) */}
          <div className="lg:col-span-3">
            <h3 className="text-[16px] font-bold text-white tracking-tight mb-5">
              Hire vetted talent
            </h3>
            <ul className="space-y-3.5 text-[14px]">
              <li>
                <Link href="/talent" className="text-zinc-400 hover:text-white transition-colors">
                  Explore talent directory
                </Link>
              </li>
              <li>
                <Link href="/about?tab=contact&topic=hiring" className="text-zinc-400 hover:text-[#E7040D] transition-colors font-medium inline-flex items-center gap-1">
                  <span>Post an open job</span>
                  <ArrowUpRight size={13} weight="bold" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  Recruiter verification
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  Direct WhatsApp hiring
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About Trax Media & Socials (Col 10-12) */}
          <div className="lg:col-span-2">
            <h3 className="text-[16px] font-bold text-white tracking-tight mb-5">
              About us
            </h3>
            <ul className="space-y-3.5 text-[14px] mb-6">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  Our concept & story
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  Careers at Trax
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  Editorial trust & safety
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  Press & media kit
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-zinc-400">
              <a
                href="https://x.com/traxmedia"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#E7040D] hover:border-[#E7040D] hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="X Twitter"
              >
                <XLogo size={15} weight="bold" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#E7040D] hover:border-[#E7040D] hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={15} weight="fill" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#E7040D] hover:border-[#E7040D] hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramLogo size={15} weight="bold" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#E7040D] hover:border-[#E7040D] hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="YouTube"
              >
                <YoutubeLogo size={15} weight="fill" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[13px] text-zinc-500">
          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="hover:text-zinc-300 transition-colors">
              Legal notice
            </Link>
            <Link href="/about" className="hover:text-zinc-300 transition-colors">
              Terms of service
            </Link>
            <Link href="/about" className="hover:text-zinc-300 transition-colors">
              Privacy policy
            </Link>
            <Link href="/about" className="hover:text-zinc-300 transition-colors">
              Manage cookies
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2">
            <span>&copy; 2026 Trax Jobs. Rooted in Ogun State, built for Africa.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
