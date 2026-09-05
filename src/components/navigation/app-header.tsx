"use client";

import Image from "next/image";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react";

export type NavTab = "jobs" | "talent" | "companies" | "about" | "recruiter";

interface AppHeaderProps {
  activeTab?: NavTab;
  children?: React.ReactNode;
  className?: string;
}

export function AppHeader({ activeTab = "jobs", children, className = "" }: AppHeaderProps) {
  return (
    <header className={`w-full bg-[#FAF8F5] pt-3 pb-4 px-6 sm:px-10 lg:px-16 sticky top-0 z-40 border-b border-zinc-200/60 shadow-xs ${className}`}>
      <div className="max-w-[1440px] mx-auto space-y-3">
        
        {/* Top Bar: Language Selector */}
        <div className="flex items-center gap-1 text-[12px] font-bold text-zinc-700">
          <span className="text-zinc-500">🌐</span>
          <span>EN</span>
          <CaretDown size={10} weight="bold" className="text-zinc-400" />
        </div>

        {/* Main Floating Header Row */}
        <div className="flex items-center justify-between">
          
          {/* Left: Brand Logo & Navigation Pills */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/trax-logo.png"
                alt="Trax"
                width={120}
                height={34}
                className="h-7 w-auto object-contain"
                priority
              />
            </Link>

            {/* Navigation Pills (Find a job, Hire a Talent, Explore companies, About Us) */}
            <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
              <Link
                href="/jobs"
                className={`px-4 py-2 rounded-lg text-[13.5px] font-bold transition-all ${
                  activeTab === "jobs"
                    ? "bg-[#E7040D] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                Find a job
              </Link>

              <Link
                href="/talent"
                className={`px-4 py-2 rounded-lg text-[13.5px] font-bold transition-all ${
                  activeTab === "talent"
                    ? "bg-[#E7040D] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                Hire a Talent
              </Link>
              
              <Link
                href="/companies"
                className={`px-4 py-2 rounded-lg text-[13.5px] font-bold transition-all ${
                  activeTab === "companies"
                    ? "bg-[#E7040D] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                Explore companies
              </Link>

              <Link
                href="/about"
                className={`px-4 py-2 rounded-lg text-[13.5px] font-bold transition-all ${
                  activeTab === "about"
                    ? "bg-[#E7040D] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {activeTab === "talent" ? (
              <>
                <Link
                  href="/submit-job"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-[13.5px] font-bold text-zinc-800 hover:text-zinc-950 transition-all"
                >
                  Post a job
                </Link>

                <Link
                  href="/submit-profile"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#0C1222] hover:bg-[#070b14] text-white text-[13.5px] font-bold transition-all shadow-2xs"
                >
                  Submit Your Profile
                </Link>
              </>
            ) : activeTab === "companies" ? (
              <>
                <Link
                  href="/submit-job"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-[13.5px] font-bold text-zinc-800 hover:text-zinc-950 transition-all"
                >
                  Post a job
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#0C1222] hover:bg-[#070b14] text-white text-[13.5px] font-bold transition-all shadow-2xs"
                >
                  Submit Company Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/talent"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-[13.5px] font-bold text-zinc-800 hover:text-zinc-950 transition-all"
                >
                  I&apos;m a recruiter
                </Link>

                <Link
                  href="/submit-job"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#0C1222] hover:bg-[#070b14] text-white text-[13.5px] font-bold transition-all shadow-2xs"
                >
                  Submit a job
                </Link>
              </>
            )}
          </div>

        </div>

        {/* Optional Fixed/Sticky Sub-Header (e.g. Search Bar Widget) */}
        {children && (
          <div className="w-full pt-1">
            {children}
          </div>
        )}

      </div>
    </header>
  );
}
