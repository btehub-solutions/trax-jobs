"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { name: "Find Jobs", href: "/jobs" },
  { name: "Hire a Talent", href: "/talent" },
  { name: "Companies", href: "/companies" },
  { name: "About Us", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-zinc-100 relative z-50">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo & Nav Links */}
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
              {navLinks.map((link) => {
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

          {/* Right: Submit a Job Pill Button */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/submit-job"
              className="inline-flex items-center justify-center px-7 py-2.5 rounded-full text-[14px] font-semibold bg-[#fce8e0] text-[#E7040D] hover:bg-[#f9cbb9] transition-colors"
            >
              Submit a job
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/submit-job"
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#fce8e0] text-[#E7040D]"
            >
              Submit a job
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X size={22} weight="bold" />
              ) : (
                <List size={22} weight="bold" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-6 pt-3 pb-6 space-y-1 shadow-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "text-[#e7040d] bg-red-50/70 font-semibold"
                    : "text-zinc-800 hover:bg-zinc-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
