"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  List,
  X,
  MagnifyingGlass,
  Users,
  Buildings,
  GraduationCap,
  BookOpen,
  Info,
} from "@phosphor-icons/react";

const desktopNavLinks = [
  { name: "Find Jobs", href: "/jobs" },
  { name: "Hire a Talent", href: "/talent" },
  { name: "Companies", href: "/companies" },
  { name: "About Us", href: "/about" },
];

const mobileNavLinks = [
  { name: "Find Jobs", href: "/jobs", icon: MagnifyingGlass },
  { name: "Hire a Talent", href: "/talent", icon: Users },
  { name: "Companies", href: "/companies", icon: Buildings },
  { name: "Learning Hub", href: "/learning", icon: GraduationCap },
  { name: "Career Guides", href: "/guides", icon: BookOpen },
  { name: "About Us", href: "/about", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
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
    <header className="w-full bg-white border-b border-zinc-100 relative z-40">
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
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {desktopNavLinks.map((link) => {
                const isActive = pathname === link.href;
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

          {/* Right: Desktop Submit a Job Pill Button */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/submit-job"
              className="inline-flex items-center justify-center px-7 py-2.5 rounded-full text-[14px] font-semibold bg-[#fce8e0] text-[#E7040D] hover:bg-[#f9cbb9] transition-colors cursor-pointer"
            >
              Submit a job
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -mr-1.5 rounded-lg text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <List size={26} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-Out Side Drawer (Jobberman layout structure, Trax design system) */}
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
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-full text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X size={22} weight="bold" />
            </button>
          </div>

          {/* Top Action Pills (Reference layout: light pill + solid primary pill) */}
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
              const isActive = pathname === item.href;
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
