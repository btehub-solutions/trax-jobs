"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  List,
  X,
  CaretDown,
  ArrowUpRight,
} from "@phosphor-icons/react";

const desktopNavLinks = [
  { name: "Find Jobs", href: "/jobs" },
  { name: "Hire a Talent", href: "/talent" },
  { name: "Companies", href: "/companies" },
];

const resourcesLinks = [
  { name: "Courses & Learning", href: "/learning", desc: "Free and curated tech courses" },
  { name: "Career Guides", href: "/guides", desc: "Playbooks for African tech careers" },
  { name: "About Trax", href: "/about", desc: "Our story, team, and mission" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [desktopResourcesOpen, setDesktopResourcesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close desktop Resources dropdown on click outside
  useEffect(() => {
    if (!desktopResourcesOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(e.target as Node)) {
        setDesktopResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [desktopResourcesOpen]);

  // Close desktop Resources dropdown on route change
  useEffect(() => {
    setDesktopResourcesOpen(false);
  }, [pathname]);

  // Context-aware CTA button calculation
  const isTalentPage = activeTab === "talent" || pathname.startsWith("/talent");
  const isCompaniesPage = activeTab === "companies" || pathname.startsWith("/companies");
  const isJobsPage = activeTab === "jobs" || pathname.startsWith("/jobs");

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
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setDesktopResourcesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Check if Resources dropdown has an active child
  const isResourcesActive = pathname.startsWith("/learning") || pathname.startsWith("/guides") || pathname.startsWith("/about") ||
    activeTab === "learning" || activeTab === "guides" || activeTab === "about";

  return (
    <header className={`w-full bg-white/95 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-40 ${className}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">
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
                    (activeTab === "companies" && link.href === "/companies")
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

              {/* Resources Dropdown */}
              <div ref={resourcesDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setDesktopResourcesOpen(!desktopResourcesOpen)}
                  className={`inline-flex items-center gap-1 text-[15px] font-medium transition-colors cursor-pointer ${
                    isResourcesActive
                      ? "text-[#e7040d] font-semibold"
                      : "text-[#333333] hover:text-[#000000]"
                  }`}
                >
                  <span>Resources</span>
                  <CaretDown
                    size={13}
                    weight="bold"
                    className={`transition-transform duration-200 ${desktopResourcesOpen ? "rotate-180" : ""} ${
                      isResourcesActive ? "text-[#e7040d]" : "text-zinc-400"
                    }`}
                  />
                </button>

                {desktopResourcesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[260px] bg-white rounded-xl border border-zinc-200/90 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {resourcesLinks.map((link) => {
                      const isChildActive = pathname.startsWith(link.href) ||
                        (activeTab === "learning" && link.href === "/learning") ||
                        (activeTab === "guides" && link.href === "/guides") ||
                        (activeTab === "about" && link.href === "/about");
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setDesktopResourcesOpen(false)}
                          className={`block px-4 py-2.5 transition-colors ${
                            isChildActive
                              ? "bg-[#fdf2ee]"
                              : "hover:bg-zinc-50"
                          }`}
                        >
                          <span className={`block text-[14px] font-semibold ${
                            isChildActive ? "text-[#E7040D]" : "text-zinc-900"
                          }`}>
                            {link.name}
                          </span>
                          <span className="block text-[12px] text-zinc-500 mt-0.5">{link.desc}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <a
                href="https://trax.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium text-[#333333] hover:text-[#e7040d] transition-colors inline-flex items-center gap-1 group/media"
              >
                <span>Trax Media</span>
                <ArrowUpRight size={13} weight="bold" className="text-zinc-400 group-hover/media:text-[#e7040d] transition-colors" />
              </a>
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
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center"
            aria-label="Trax Home"
          >
            <Image
              src="/images/trax-logo.png"
              alt="Trax"
              width={110}
              height={32}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-8 h-8 rounded-lg border border-zinc-200/90 text-[#E7040D] hover:bg-zinc-50 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-7 py-6 overscroll-contain">
          {/* Primary Navigation Group */}
          <div className="space-y-1">
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-[16px] font-medium text-zinc-900 hover:text-[#E7040D] transition-colors"
            >
              Find a job
            </Link>
            <Link
              href="/companies"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-[16px] font-medium text-zinc-900 hover:text-[#E7040D] transition-colors"
            >
              Explore companies
            </Link>
            <Link
              href="/talent"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-[16px] font-medium text-zinc-900 hover:text-[#E7040D] transition-colors"
            >
              Hire a Talent
            </Link>

            {/* Resources Dropdown Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="w-full flex items-center justify-between py-3 text-[16px] font-medium text-zinc-900 hover:text-[#E7040D] transition-colors cursor-pointer text-left"
              >
                <span>Resources</span>
                <CaretDown
                  size={16}
                  weight="bold"
                  className={`text-zinc-500 transition-transform duration-200 ${
                    resourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {resourcesOpen && (
                <div className="pl-4 pb-2 space-y-2 pt-1 animate-in fade-in duration-150">
                  <Link
                    href="/learning"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-[15px] font-medium text-zinc-600 hover:text-[#E7040D] transition-colors"
                  >
                    Courses & Learning
                  </Link>
                  <Link
                    href="/guides"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-[15px] font-medium text-zinc-600 hover:text-[#E7040D] transition-colors"
                  >
                    Career Guides
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-100 my-4" />

          {/* Secondary / Recruiter & Platform Group */}
          <div className="space-y-1">
            <Link
              href="/about?tab=post-and-submit&type=job"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-[16px] font-medium text-zinc-900 hover:text-[#E7040D] transition-colors"
            >
              Post a Job
            </Link>
            <Link
              href="/about?tab=post-and-submit&type=talent"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-[16px] font-medium text-zinc-900 hover:text-[#E7040D] transition-colors"
            >
              Submit Talent Profile
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-[16px] font-medium text-zinc-900 hover:text-[#E7040D] transition-colors"
            >
              About Trax
            </Link>
            <a
              href="https://trax.ng"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 text-[16px] font-medium text-zinc-900 hover:text-[#E7040D] transition-colors"
            >
              <span>Trax Media</span>
              <ArrowUpRight size={16} weight="bold" className="text-zinc-400" />
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-100 my-4" />

          {/* Trax Talent Network Banner Ad (Preserved per explicit instruction) */}
          <div className="pt-2">
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
        </div>

        {/* Drawer Footer */}
        <div className="pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] px-7 border-t border-zinc-100 text-center text-zinc-400 text-[11.5px] shrink-0 bg-white">
          <p>© 2026 Trax Media Ltd. All rights reserved.</p>
        </div>
      </aside>,
      document.body
    )}
  </header>
);
}
