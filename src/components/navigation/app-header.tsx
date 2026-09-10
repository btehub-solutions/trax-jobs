"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CaretDown,
  List,
  X,
  MagnifyingGlass,
  Users,
  Buildings,
  Info,
} from "@phosphor-icons/react";

export type NavTab = "jobs" | "talent" | "companies" | "about" | "recruiter";

interface AppHeaderProps {
  activeTab?: NavTab;
  children?: React.ReactNode;
  className?: string;
}

const mobileNavLinks = [
  { name: "Find Jobs", href: "/jobs", icon: MagnifyingGlass, tab: "jobs" },
  { name: "Hire a Talent", href: "/talent", icon: Users, tab: "talent" },
  { name: "Companies", href: "/companies", icon: Buildings, tab: "companies" },
  { name: "About Us", href: "/about", icon: Info, tab: "about" },
];

export function AppHeader({ activeTab = "jobs", children, className = "" }: AppHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock background body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className={`w-full bg-[#FAF8F5]/90 backdrop-blur-md pt-3 pb-4 px-4 sm:px-10 lg:px-16 sticky top-0 z-40 border-b border-zinc-200/60 shadow-xs transition-colors ${className}`}>
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
            <Link href="/" className="flex items-center active:scale-95 transition-transform duration-150">
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
                className={`px-4 py-2 rounded-lg text-[13.5px] font-bold transition-all active:scale-[0.97] duration-150 ${
                  activeTab === "jobs"
                    ? "bg-[#E7040D] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                Find a job
              </Link>

              <Link
                href="/talent"
                className={`px-4 py-2 rounded-lg text-[13.5px] font-bold transition-all active:scale-[0.97] duration-150 ${
                  activeTab === "talent"
                    ? "bg-[#E7040D] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                Hire a Talent
              </Link>
              
              <Link
                href="/companies"
                className={`px-4 py-2 rounded-lg text-[13.5px] font-bold transition-all active:scale-[0.97] duration-150 ${
                  activeTab === "companies"
                    ? "bg-[#E7040D] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                Explore companies
              </Link>

              <Link
                href="/about"
                className={`px-4 py-2 rounded-lg text-[13.5px] font-bold transition-all active:scale-[0.97] duration-150 ${
                  activeTab === "about"
                    ? "bg-[#E7040D] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {activeTab === "talent" ? (
              <>
                <Link
                  href="/submit-job"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-[13.5px] font-bold text-zinc-800 hover:text-zinc-950 transition-all active:scale-95 duration-150"
                >
                  Post a job
                </Link>

                <Link
                  href="/submit-profile"
                  className="inline-flex items-center justify-center px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#0C1222] hover:bg-[#070b14] active:scale-[0.97] text-white text-[12px] sm:text-[13.5px] font-bold transition-all duration-150 shadow-2xs text-center whitespace-nowrap shrink-0"
                >
                  Submit Your Profile
                </Link>
              </>
            ) : activeTab === "companies" ? (
              <>
                <Link
                  href="/submit-job"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-[13.5px] font-bold text-zinc-800 hover:text-zinc-950 transition-all active:scale-95 duration-150 shrink-0 whitespace-nowrap"
                >
                  Post a job
                </Link>

                <Link
                  href="/about?tab=contact&topic=company"
                  className="inline-flex items-center justify-center px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#0C1222] hover:bg-[#070b14] active:scale-[0.97] text-white text-[12px] sm:text-[13.5px] font-bold transition-all duration-150 shadow-2xs text-center whitespace-nowrap shrink-0"
                >
                  Submit Company Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/talent"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-[13.5px] font-bold text-zinc-800 hover:text-zinc-950 transition-all active:scale-95 duration-150 shrink-0 whitespace-nowrap"
                >
                  Explore Talent
                </Link>

                <Link
                  href="/submit-job"
                  className="inline-flex items-center justify-center px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#0C1222] hover:bg-[#070b14] active:scale-[0.97] text-white text-[12px] sm:text-[13.5px] font-bold transition-all duration-150 shadow-2xs text-center whitespace-nowrap shrink-0"
                >
                  Submit a job
                </Link>
              </>
            )}

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 -mr-1 rounded-lg text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <List size={24} weight="bold" />
              </button>
            </div>
          </div>

        </div>

        {/* Optional Fixed/Sticky Sub-Header (e.g. Search Bar Widget) */}
        {children && (
          <div className="w-full pt-1">
            {children}
          </div>
        )}

      </div>

      {/* Mobile Drawer Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-Out Side Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[82%] max-w-[320px] bg-white z-50 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:hidden overscroll-contain ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="p-6 overflow-y-auto overscroll-contain">
          {/* Top Close Button (Pinned Right) */}
          <div className="flex items-center justify-end pb-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-full text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X size={22} weight="bold" />
            </button>
          </div>

          {/* Top Action Pills */}
          <div className="grid grid-cols-2 gap-2.5 mb-7">
            <Link
              href="/talent"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center px-3 py-2.5 rounded-xl text-[13px] font-semibold bg-[#fce8e0] text-[#E7040D] hover:bg-[#f9cbb9] transition-colors text-center"
            >
              Hire Talent
            </Link>
            <Link
              href="/submit-job"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center px-3 py-2.5 rounded-xl text-[13px] font-semibold bg-[#E7040D] hover:bg-[#CB030B] text-white transition-colors text-center shadow-xs"
            >
              Submit a job
            </Link>
          </div>

          {/* Nav Items with Phosphor Icons */}
          <nav className="space-y-1">
            {mobileNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-[14.5px] font-medium transition-colors ${
                    isActive
                      ? "text-[#E7040D] bg-[#fdf2ee] font-semibold"
                      : "text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50"
                  }`}
                >
                  <Icon
                    size={20}
                    weight={isActive ? "fill" : "regular"}
                    className={isActive ? "text-[#E7040D]" : "text-zinc-600"}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer Branding */}
        <div className="p-6 border-t border-zinc-100 bg-zinc-50/60">
          <div className="flex items-center gap-2 mb-1.5">
            <Image
              src="/images/trax-logo.png"
              alt="Trax"
              width={75}
              height={22}
              className="h-5 w-auto object-contain opacity-80"
            />
          </div>
          <p className="text-[11.5px] text-zinc-500 leading-normal">
            Curated African tech opportunities and verified talent network.
          </p>
        </div>
      </aside>
    </header>
  );
}
