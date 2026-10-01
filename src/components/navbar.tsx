"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  List,
  X,
  MagnifyingGlass,
} from "@phosphor-icons/react";

const desktopNavLinks = [
  { name: "Find Jobs", href: "/jobs" },
  { name: "Hire a Talent", href: "/talent" },
  { name: "Companies", href: "/companies" },
  { name: "Courses", href: "/learning" },
  { name: "Guides", href: "/guides" },
  { name: "About Us", href: "/about" },
];

const quickCategories = [
  { name: "All Jobs", href: "/jobs" },
  { name: "Hire Talent", href: "/talent" },
  { name: "Companies", href: "/companies" },
  { name: "Engineering", href: "/jobs?role=Engineering" },
  { name: "Design", href: "/jobs?role=Product+Design" },
  { name: "Product", href: "/jobs?role=Product+Management" },
  { name: "Courses", href: "/learning" },
  { name: "Guides", href: "/guides" },
];

export interface NavbarProps {
  children?: React.ReactNode;
  activeTab?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function Navbar({
  children,
  activeTab,
  ctaText,
  ctaHref,
  className = "",
}: NavbarProps = {}) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Context-aware CTA button & Search Scope calculation
  const isTalentPage = activeTab === "talent" || pathname.startsWith("/talent");
  const isCompaniesPage = activeTab === "companies" || pathname.startsWith("/companies");
  const isJobsPage = activeTab === "jobs" || pathname.startsWith("/jobs");

  const [searchScope, setSearchScope] = useState<"jobs" | "companies" | "talent">(
    isCompaniesPage ? "companies" : isTalentPage ? "talent" : "jobs"
  );

  useEffect(() => {
    if (pathname.startsWith("/companies")) {
      setSearchScope("companies");
    } else if (pathname.startsWith("/talent")) {
      setSearchScope("talent");
    } else {
      setSearchScope("jobs");
    }
  }, [pathname]);

  const executeSearch = (overrideQuery?: string) => {
    const q = (overrideQuery !== undefined ? overrideQuery : searchQuery).trim();
    if (!q) return;

    setMobileMenuOpen(false);

    let target = `/jobs?q=${encodeURIComponent(q)}`;
    if (searchScope === "companies") {
      target = `/companies?q=${encodeURIComponent(q)}`;
    } else if (searchScope === "talent") {
      target = `/talent?q=${encodeURIComponent(q)}`;
    }

    router.push(target);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  let defaultCtaText = "Submit a Job";
  let defaultCtaHref = "/about?tab=post-and-submit&type=job";

  if (isTalentPage) {
    defaultCtaText = "Submit Profile";
    defaultCtaHref = "/about?tab=post-and-submit&type=talent";
  } else if (isCompaniesPage) {
    defaultCtaText = "Register Company";
    defaultCtaHref = "/about?tab=post-and-submit&type=company";
  } else if (isJobsPage) {
    defaultCtaText = "Submit a Job";
    defaultCtaHref = "/about?tab=post-and-submit&type=job";
  }

  const finalCtaText = ctaText || defaultCtaText;
  const finalCtaHref = ctaHref || defaultCtaHref;

  // Clean background body scroll lock when mobile drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  // Close drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className={`w-full bg-white/95 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-40 ${className}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo & Desktop Nav Links */}
          <div className="flex items-center gap-10 lg:gap-14">
            <Link href="/" className="flex items-center group" aria-label="Trax Home">
              <Image
                src="/images/trax-logo.png"
                alt="Trax"
                width={130}
                height={38}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8">
              {desktopNavLinks.map((link) => {
                const isActive = activeTab
                  ? (activeTab === "jobs" && link.href === "/jobs") ||
                    (activeTab === "talent" && link.href === "/talent") ||
                    (activeTab === "companies" && link.href === "/companies") ||
                    (activeTab === "learning" && link.href === "/learning") ||
                    (activeTab === "guides" && link.href === "/guides") ||
                    (activeTab === "about" && link.href === "/about")
                  : pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[15px] font-medium transition-colors ${
                      isActive
                        ? "text-[#e7040d] font-semibold"
                        : "text-[#333333] hover:text-[#000000]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Context-aware CTA Pill Button */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href={finalCtaHref}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[14px] font-semibold bg-[#fce8e0] text-[#E7040D] hover:bg-[#f9cbb9] transition-colors cursor-pointer whitespace-nowrap"
            >
              {finalCtaText}
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-11 h-11 -mr-2 rounded-lg text-zinc-800 hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <List size={26} weight="bold" />
            </button>
          </div>
        </div>

        {/* Optional Sub-Header for Search/Filters (e.g. on /companies and /talent) */}
        {children && (
          <div className="w-full pb-4">
            {children}
          </div>
        )}
      </div>

      {/* Mobile Slide-In Menu (Teleported via React Portal to document.body for flawless viewport anchoring) */}
      {mounted &&
        createPortal(
          <aside
            className={`fixed inset-0 h-[100dvh] w-full bg-white z-[9999] flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:hidden overscroll-contain ${
              mobileMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            aria-hidden={!mobileMenuOpen}
          >
        {/* Top Header Bar inside Drawer */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-100 shrink-0 bg-white">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} aria-label="Trax Home" className="flex items-center">
            <Image
              src="/images/trax-logo.png"
              alt="Trax"
              width={105}
              height={30}
              className="h-6 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 -mr-2 text-zinc-600 hover:text-zinc-950 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Close menu"
          >
            <X size={22} weight="regular" />
          </button>
        </div>

        {/* Horizontal Quick-Filter Category Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 px-6 border-b border-zinc-100 shrink-0 bg-white">
          {quickCategories.map((cat) => {
            const isActive = cat.href === "/jobs"
              ? pathname === "/jobs"
              : cat.href.startsWith("/jobs?")
              ? false
              : pathname === cat.href || (cat.href !== "/" && pathname.startsWith(cat.href + "/"));

            return (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] whitespace-nowrap transition-all select-none ${
                  isActive
                    ? "border border-[#E7040D] bg-[#fdf2ee] text-[#E7040D] font-bold shadow-2xs"
                    : "border border-zinc-200/90 text-zinc-700 hover:text-zinc-950 hover:border-zinc-300 font-medium bg-white"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Scrollable Middle Content */}
        <div className="flex-1 overflow-y-auto px-6 pt-7 pb-10 space-y-8 overscroll-contain">
          {/* SEARCH PLATFORM */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#E7040D]">
                SEARCH PLATFORM
              </span>
              {/* Category Scope Switcher */}
              <div className="flex items-center gap-1 bg-[#f3f4f6] p-0.5 rounded-lg border border-zinc-200/80">
                {(
                  [
                    { id: "jobs", label: "Jobs" },
                    { id: "companies", label: "Companies" },
                    { id: "talent", label: "Talent" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSearchScope(tab.id)}
                    className={`px-2.5 py-1 text-[11.5px] font-bold transition-all rounded-lg select-none cursor-pointer ${
                      searchScope === tab.id
                        ? "bg-white text-[#1F1F1F] shadow-2xs"
                        : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSearchSubmit} role="search" className="flex items-center gap-2">
              <div className="relative flex-1 flex items-center">
                <MagnifyingGlass
                  size={17}
                  weight="regular"
                  className="absolute left-3.5 text-zinc-400 pointer-events-none"
                />
                <input
                  type="search"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      executeSearch();
                    }
                  }}
                  enterKeyHint="search"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  placeholder={
                    searchScope === "companies"
                      ? "Search companies, industry..."
                      : searchScope === "talent"
                      ? "Search talent by role, skill..."
                      : "Search jobs, roles, skills..."
                  }
                  className="w-full bg-[#f3f4f6] text-zinc-900 placeholder:text-zinc-400 pl-10 pr-8 py-2.5 rounded-lg text-[14px] font-normal border-0 focus:outline-none focus:ring-1 focus:ring-[#E7040D]/30 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-700 flex items-center justify-center cursor-pointer"
                    aria-label="Clear search query"
                  >
                    <X size={14} weight="bold" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-3.5 py-2.5 rounded-lg bg-[#E7040D] hover:bg-[#CB030B] active:scale-95 text-white text-[13px] font-bold shadow-2xs transition-all cursor-pointer shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* FOLLOW US */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#E7040D] mb-3.5">
              FOLLOW US
            </span>
            <div className="space-y-3 text-[14.5px] font-normal text-zinc-600">
              <a
                href="https://x.com/trax_newsng"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#E7040D] transition-colors"
              >
                X (Twitter)
              </a>
              <a
                href="https://linkedin.com/company/trax-media"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#E7040D] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/trax_newsng"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#E7040D] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/traxnewsng"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#E7040D] transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://youtube.com/@traxnewsng"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#E7040D] transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* CURATED DIRECTORIES */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-3.5 bg-[#E7040D] inline-block rounded-full" />
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#E7040D]">
                PLATFORM DIRECTORIES
              </span>
            </div>
            <div className="space-y-3.5">
              <Link
                href="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[16.5px] font-bold text-[#1F1F1F] hover:text-[#E7040D] transition-colors tracking-tight"
              >
                Verified Jobs
              </Link>
              <Link
                href="/talent"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[16.5px] font-bold text-[#1F1F1F] hover:text-[#E7040D] transition-colors tracking-tight"
              >
                Vetted Talent
              </Link>
              <Link
                href="/companies"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[16.5px] font-bold text-[#1F1F1F] hover:text-[#E7040D] transition-colors tracking-tight"
              >
                Tech Companies
              </Link>
              <Link
                href="/learning"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[16.5px] font-bold text-[#1F1F1F] hover:text-[#E7040D] transition-colors tracking-tight"
              >
                Learning Hub
              </Link>
              <Link
                href="/guides"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[16.5px] font-bold text-[#1F1F1F] hover:text-[#E7040D] transition-colors tracking-tight"
              >
                Career Guides
              </Link>
              <Link
                href="/about?tab=post-and-submit&type=job"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[16.5px] font-bold text-[#1F1F1F] hover:text-[#E7040D] transition-colors tracking-tight"
              >
                Post a Job
              </Link>
              <Link
                href="/about?tab=post-and-submit&type=talent"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[16.5px] font-bold text-[#1F1F1F] hover:text-[#E7040D] transition-colors tracking-tight"
              >
                Submit Talent Profile
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[16.5px] font-bold text-[#1F1F1F] hover:text-[#E7040D] transition-colors tracking-tight"
              >
                About Trax Media
              </Link>
            </div>
          </div>

          {/* Trax Talent Network Banner */}
          <Link
            href="/about?tab=post-and-submit&type=talent"
            onClick={() => setMobileMenuOpen(false)}
            className="group block relative w-full aspect-[16/9] overflow-hidden rounded-lg border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all active:scale-[0.99] bg-[#FAF8F5]"
          >
            <Image
              src="/images/trax-talent-network-banner.jpg"
              alt="Trax Talent Network - Get Discovered by Top Startups"
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] px-6 border-t border-zinc-100 text-center text-zinc-400 text-[11.5px] space-y-1.5 shrink-0 bg-white">
          <p>© 2026 Trax Media Ltd. All rights reserved.</p>
          <div className="flex items-center justify-center gap-2">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-zinc-600 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-zinc-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </aside>,
      document.body
    )}
  </header>
);
}
