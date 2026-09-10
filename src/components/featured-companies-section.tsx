"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CaretLeft,
  CaretRight,
  ArrowRight,
  Users,
  MapPin,
  Tag,
  SealCheck,
} from "@phosphor-icons/react";

/* ─────────────────────────────────────────────────────────────
   Company Logos (Authentic Vector SVGs)
───────────────────────────────────────────────────────────── */
function CompanyVector({ name, logo }: { name: string; logo?: string }) {
  if (logo) {
    return (
      <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shrink-0 shadow-xs overflow-hidden p-1">
        <Image src={logo} alt={name} width={36} height={36} className="w-full h-full object-contain" />
      </div>
    );
  }
  if (name === "Paystack") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#E8F8FF] border border-[#C7EFFF] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="3.5" rx="1.75" fill="#0BA4DB" />
          <rect x="3" y="10.25" width="12" height="3.5" rx="1.75" fill="#0BA4DB" />
          <rect x="3" y="16.5" width="18" height="3.5" rx="1.75" fill="#0BA4DB" />
        </svg>
      </div>
    );
  }
  if (name === "Flutterwave") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#FFF3ED] border border-[#FFE0D1] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <path d="M6 16C6 10.477 10.477 6 16 6C19.5 6 22.5 7.8 24.2 10.5L20.8 13.9C19.6 12.4 17.9 11.5 16 11.5C13.515 11.5 11.5 13.515 11.5 16C11.5 18.485 13.515 20.5 16 20.5C17.9 20.5 19.6 19.6 20.8 18.1L24.2 21.5C22.5 24.2 19.5 26 16 26C10.477 26 6 21.523 6 16Z" fill="#F56522" />
          <path d="M16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26" stroke="#FFBA00" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (name === "Moniepoint") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] border border-[#D7E2FF] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 6C3 4.89543 3.89543 4 5 4H7.5L12 11.5L16.5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H16.5V11.5L12 19L7.5 11.5V20H5C3.89543 20 3 19.1046 3 18V6Z" fill="#0336FF" />
        </svg>
      </div>
    );
  }
  if (name === "Andela") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#16A34A" strokeWidth="2.5" />
          <path d="M12 6.5L17 16.5H7L12 6.5Z" fill="#16A34A" />
        </svg>
      </div>
    );
  }
  if (name === "Kuda Bank") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] border border-[#E9E4FF] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#40196D" />
          <path d="M7 6V18M7 12L15 6M9.5 10L16.5 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (name === "Interswitch") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#DC2626" />
          <circle cx="12" cy="12" r="4.5" fill="white" />
          <circle cx="12" cy="12" r="2" fill="#DC2626" />
        </svg>
      </div>
    );
  }
  if (name === "Moove") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center shrink-0 shadow-xs font-black text-[#16A34A] text-[16px]">
        M
      </div>
    );
  }
  if (name === "Cowrywise") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0 shadow-xs font-black text-[#2563EB] text-[16px]">
        C
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 font-bold text-[14px] text-zinc-700">
      {name[0]}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Company Data
───────────────────────────────────────────────────────────── */
const CATEGORIES = [
  "Highlight",
  "Fintech",
  "Developer Tools",
  "Mobility / Logistics",
  "Talent & HR",
  "Banking Infrastructure",
];

export interface FeaturedCompanyItem {
  name: string;
  slug: string;
  category?: string;
  size?: string;
  location?: string;
  industry?: string;
  subIndustry?: string;
  description?: string;
  openRoles?: number;
  coverImage?: string;
  logo?: string;
}

const COMPANIES: FeaturedCompanyItem[] = [
  {
    name: "Paystack",
    slug: "paystack",
    category: "Fintech",
    size: "250 - 500 team",
    location: "Lagos, NG &bull; San Francisco",
    industry: "Payments Infrastructure",
    subIndustry: "FinTech / SaaS",
    description: "Modern online and offline payments gateway helping African businesses accept payments from anywhere in the world.",
    openRoles: 14,
    coverImage: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Flutterwave",
    slug: "flutterwave",
    category: "Fintech",
    size: "500+ employees",
    location: "Lagos &bull; Nairobi &bull; Remote",
    industry: "Cross-Border Payments",
    subIndustry: "Global Banking / API",
    description: "End-to-end payment technology connecting African businesses and global enterprises through unified APIs.",
    openRoles: 18,
    coverImage: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Moniepoint",
    slug: "moniepoint",
    category: "Fintech",
    size: "1,000+ employees",
    location: "Lagos &bull; London &bull; Remote",
    industry: "Business Banking",
    subIndustry: "POS & Agency Banking",
    description: "Financial services platform powering in-person retail banking and digital payment infrastructure for over 1.3M businesses.",
    openRoles: 11,
    coverImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Andela",
    slug: "andela",
    category: "Talent & HR",
    size: "500+ team",
    location: "Remote Across Africa",
    industry: "Global Tech Talent",
    subIndustry: "Cloud / Engineering",
    description: "Global talent marketplace connecting leading tech enterprises with vetted software engineers across Africa and emerging markets.",
    openRoles: 8,
    coverImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Kuda Bank",
    slug: "kuda-bank",
    category: "Fintech",
    size: "250 - 500 team",
    location: "Lagos &bull; London",
    industry: "Consumer Digital Bank",
    subIndustry: "Mobile Banking",
    description: "Full-service digital bank operating with zero fees, providing smart budgeting tools and seamless personal transfers.",
    openRoles: 6,
    coverImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Interswitch",
    slug: "interswitch",
    category: "Banking Infrastructure",
    size: "1,000+ employees",
    location: "Lagos &bull; Abuja &bull; Nairobi",
    industry: "Switching & Processing",
    subIndustry: "Card Systems / Quickteller",
    description: "Africa's foundational transaction switching and electronic payments processing company with 20+ years of ecosystem leadership.",
    openRoles: 9,
    coverImage: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Moove",
    slug: "moove",
    category: "Mobility / Logistics",
    size: "250 - 500 team",
    location: "Lagos &bull; Johannesburg &bull; Dubai",
    industry: "Mobility Fintech",
    subIndustry: "Fleet Financing",
    description: "First-of-its-kind mobility fintech providing revenue-based vehicle financing to mobility entrepreneurs across 4 continents.",
    openRoles: 5,
    coverImage: "https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Cowrywise",
    slug: "cowrywise",
    category: "Fintech",
    size: "50 - 150 team",
    location: "Lagos, Nigeria",
    industry: "Wealthtech / Investment",
    subIndustry: "Mutual Funds / Savings",
    description: "Automated wealth management and savings platform democratizing retail investment products across West Africa.",
    openRoles: 4,
    coverImage: "https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

/* ─────────────────────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────────────────────── */
export function FeaturedCompaniesSection({ companies: dynamicCompanies }: { companies?: FeaturedCompanyItem[] } = {}) {
  const [activeCategory, setActiveCategory] = useState("Highlight");
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeList = dynamicCompanies && dynamicCompanies.length > 0 ? dynamicCompanies : COMPANIES;

  const filteredCompanies =
    activeCategory === "Highlight"
      ? activeList
      : activeList.filter(
          (c) =>
            (c.category && c.category.toLowerCase().includes(activeCategory.toLowerCase())) ||
            (c.subIndustry && c.subIndustry.toLowerCase().includes(activeCategory.toLowerCase())) ||
            (c.industry && c.industry.toLowerCase().includes(activeCategory.toLowerCase()))
        );

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#fbf9f6] py-20 sm:py-28 border-t border-zinc-200/60 relative overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce8e0] text-[#E7040D] text-[11px] font-bold uppercase tracking-wider mb-4">
            <span>Curated Tech Ecosystem</span>
          </div>
          <h2 className="text-[32px] sm:text-[44px] lg:text-[50px] font-extrabold tracking-[-0.03em] text-zinc-950 leading-[1.15] mb-5">
            Choose the company that&apos;s meant for you
          </h2>
          <p className="text-[15px] sm:text-[17px] text-zinc-600 leading-[1.7] max-w-2xl mb-8">
            Get to know leading companies across Nigeria and Africa. Explore their engineering story, team culture, and active openings. When you find the right one, you will just know.
          </p>
          <div>
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E7040D] hover:bg-[#CB030B] text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              <span>Explore companies</span>
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>

        {/* Filter Pills & Carousel Controls Row */}
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Scrollable Filter Badges */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 pr-4">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[13.5px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#E7040D] text-white shadow-xs"
                      : "bg-white text-zinc-700 hover:text-zinc-950 border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleScroll("left")}
              className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 hover:bg-zinc-50 flex items-center justify-center text-zinc-800 hover:text-[#E7040D] transition-colors shadow-2xs cursor-pointer active:scale-95"
              aria-label="Previous companies"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 hover:bg-zinc-50 flex items-center justify-center text-zinc-800 hover:text-[#E7040D] transition-colors shadow-2xs cursor-pointer active:scale-95"
              aria-label="Next companies"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Company Cards Carousel / Grid */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-3 pt-2 snap-x snap-mandatory scroll-pl-5 sm:scroll-pl-10 lg:scroll-pl-16"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredCompanies.map((company) => (
            <div
              key={company.name}
              className="w-[84vw] min-w-[280px] max-w-[340px] sm:w-[270px] md:w-[280px] shrink-0 bg-white rounded-none border border-zinc-200/80 shadow-[0_8px_24px_-4px_rgba(15,16,18,0.05)] hover:shadow-[0_16px_32px_-6px_rgba(231,4,13,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group snap-start"
            >
              {/* Cover Media */}
              <div>
                <div className="relative h-[165px] sm:h-[150px] w-full bg-zinc-100 overflow-hidden rounded-none">
                  <Image
                    src={company.coverImage || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800"}
                    alt={`${company.name} office`}
                    fill
                    sizes="(max-width: 640px) 84vw, 280px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Floating Open Roles Pill */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-zinc-950 font-bold text-[11px] sm:text-[10px] shadow-xs border border-white/60">
                      {company.openRoles} roles
                    </span>
                  </div>
                </div>

                {/* Company Details Body */}
                <div className="p-5 sm:p-4">
                  {/* Logo + Name */}
                  <div className="flex items-center gap-3 mb-3.5">
                    <CompanyVector name={company.name} logo={company.logo} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-[16px] sm:text-[14.5px] font-bold text-zinc-950 truncate tracking-tight">
                          {company.name}
                        </h3>
                        <SealCheck size={16} weight="fill" className="text-[#E7040D] shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Metadata Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {company.size && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100/80 text-zinc-700 text-[11.5px] sm:text-[11px] font-medium">
                        <Users size={13} weight="bold" className="text-zinc-400" />
                        {company.size}
                      </span>
                    )}
                    {company.location && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100/80 text-zinc-700 text-[11.5px] sm:text-[11px] font-medium">
                        <MapPin size={13} weight="bold" className="text-zinc-400" />
                        <span dangerouslySetInnerHTML={{ __html: company.location.split("&bull;")[0] }} />
                      </span>
                    )}
                    {company.industry && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100/80 text-zinc-700 text-[11.5px] sm:text-[11px] font-medium">
                        <Tag size={13} weight="bold" className="text-zinc-400" />
                        {company.industry}
                      </span>
                    )}
                    {company.subIndustry && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100/80 text-zinc-700 text-[11.5px] sm:text-[11px] font-medium">
                        {company.subIndustry}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 sm:p-4 pt-0">
                <Link
                  href={`/companies/${company.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 sm:py-1.5 rounded-lg bg-zinc-50 hover:bg-[#E7040D] text-zinc-800 hover:text-white text-[13px] sm:text-[12px] font-bold transition-all duration-200 border border-zinc-200/90 hover:border-[#E7040D] shadow-2xs text-center"
                >
                  Explore company
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Seamless Hiring Callout */}
        <div className="mt-14 sm:mt-16">
          <p className="text-[14.5px] sm:text-[15.5px] text-zinc-900 font-normal">
            Are you{" "}
            <Link
              href="/about?tab=contact&topic=hiring"
              className="font-semibold underline decoration-[#E7040D] decoration-2 underline-offset-4 cursor-pointer hover:text-[#E7040D] transition-colors"
            >
              hiring?
            </Link>{" "}
            See how we help companies find the right people.
          </p>
        </div>
      </div>

      {/* Full-Bleed Infinite Horizontal Marquee Ticker (Cuts edge-to-edge across entire screen) */}
      <div className="w-full overflow-hidden py-4 mt-8">
        <div className="marquee-scroll flex items-center gap-12 sm:gap-20 select-none">
          {[
            { name: "paystack", style: "font-black tracking-[-0.04em]" },
            { name: "flutterwave", style: "font-extrabold tracking-[-0.03em]" },
            { name: "moniepoint", style: "font-extrabold tracking-[-0.03em]" },
            { name: "interswitch", style: "font-bold tracking-[-0.02em]", dot: true },
            { name: "kuda", style: "font-black tracking-[-0.04em]", dot: true },
            { name: "piggyvest", style: "font-black tracking-[-0.03em]" },
            { name: "andela", style: "font-black tracking-[-0.02em]" },
            { name: "moove", style: "font-extrabold tracking-[-0.02em]" },
            { name: "cowrywise", style: "font-black tracking-[-0.03em]" },
            { name: "paystack", style: "font-black tracking-[-0.04em]" },
            { name: "flutterwave", style: "font-extrabold tracking-[-0.03em]" },
            { name: "moniepoint", style: "font-extrabold tracking-[-0.03em]" },
            { name: "interswitch", style: "font-bold tracking-[-0.02em]", dot: true },
            { name: "kuda", style: "font-black tracking-[-0.04em]", dot: true },
            { name: "piggyvest", style: "font-black tracking-[-0.03em]" },
            { name: "andela", style: "font-black tracking-[-0.02em]" },
            { name: "moove", style: "font-extrabold tracking-[-0.02em]" },
            { name: "cowrywise", style: "font-black tracking-[-0.03em]" },
          ].map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center gap-1 shrink-0 opacity-80 hover:opacity-100 transition-opacity cursor-pointer text-zinc-950"
            >
              <span className={`text-[22px] sm:text-[28px] ${brand.style}`}>
                {brand.name}
                {brand.dot && <span className="text-[#E7040D]">.</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
