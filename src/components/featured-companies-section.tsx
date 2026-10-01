"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CaretLeft,
  CaretRight,
  Users,
  MapPin,
  Tag,
  SealCheck,
  Briefcase,
} from "@phosphor-icons/react";
import { BrandWordmark, ALL_AFRICAN_BRANDS } from "@/components/brand-wordmark";
import { isValidImageUrl } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Company Logos (Authentic Vector SVGs)
───────────────────────────────────────────────────────────── */
function CompanyVector({ name, logo }: { name: string; logo?: string }) {
  if (isValidImageUrl(logo)) {
    return (
      <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center shrink-0 overflow-hidden p-1">
        <Image src={logo!} alt={name} width={40} height={40} className="w-full h-full object-contain" />
      </div>
    );
  }
  if (name === "Paystack") {
    return (
      <div className="w-full h-full rounded-[10px] bg-[#E8F8FF] flex items-center justify-center shrink-0 p-1.5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <rect x="3" y="4" width="18" height="3.5" rx="1.75" fill="#0BA4DB" />
          <rect x="3" y="10.25" width="12" height="3.5" rx="1.75" fill="#0BA4DB" />
          <rect x="3" y="16.5" width="18" height="3.5" rx="1.75" fill="#0BA4DB" />
        </svg>
      </div>
    );
  }
  if (name === "Flutterwave") {
    return (
      <div className="w-full h-full rounded-[10px] bg-[#FFF3ED] flex items-center justify-center shrink-0 p-1.5">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="w-full h-full">
          <path d="M6 16C6 10.477 10.477 6 16 6C19.5 6 22.5 7.8 24.2 10.5L20.8 13.9C19.6 12.4 17.9 11.5 16 11.5C13.515 11.5 11.5 13.515 11.5 16C11.5 18.485 13.515 20.5 16 20.5C17.9 20.5 19.6 19.6 20.8 18.1L24.2 21.5C22.5 24.2 19.5 26 16 26C10.477 26 6 21.523 6 16Z" fill="#F56522" />
          <path d="M16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26" stroke="#FFBA00" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (name === "Moniepoint") {
    return (
      <div className="w-full h-full rounded-[10px] bg-[#EEF2FF] flex items-center justify-center shrink-0 p-1.5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M3 6C3 4.89543 3.89543 4 5 4H7.5L12 11.5L16.5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H16.5V11.5L12 19L7.5 11.5V20H5C3.89543 20 3 19.1046 3 18V6Z" fill="#0336FF" />
        </svg>
      </div>
    );
  }
  if (name === "Andela") {
    return (
      <div className="w-full h-full rounded-[10px] bg-[#F0FDF4] flex items-center justify-center shrink-0 p-1.5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="9" stroke="#16A34A" strokeWidth="2.5" />
          <path d="M12 6.5L17 16.5H7L12 6.5Z" fill="#16A34A" />
        </svg>
      </div>
    );
  }
  if (name === "Kuda Bank") {
    return (
      <div className="w-full h-full rounded-[10px] bg-[#F5F3FF] flex items-center justify-center shrink-0 p-1.5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <rect width="24" height="24" rx="6" fill="#40196D" />
          <path d="M7 6V18M7 12L15 6M9.5 10L16.5 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (name === "Interswitch") {
    return (
      <div className="w-full h-full rounded-[10px] bg-[#FEF2F2] flex items-center justify-center shrink-0 p-1.5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="9" fill="#DC2626" />
          <circle cx="12" cy="12" r="4.5" fill="white" />
          <circle cx="12" cy="12" r="2" fill="#DC2626" />
        </svg>
      </div>
    );
  }
  if (name === "Moove") {
    return (
      <div className="w-full h-full rounded-[10px] bg-[#F0FDF4] flex items-center justify-center shrink-0 font-black text-[#16A34A] text-[17px]">
        M
      </div>
    );
  }
  if (name === "Cowrywise") {
    return (
      <div className="w-full h-full rounded-[10px] bg-[#EFF6FF] flex items-center justify-center shrink-0 font-black text-[#2563EB] text-[17px]">
        C
      </div>
    );
  }
  return (
    <div className="w-full h-full rounded-[10px] bg-zinc-100 flex items-center justify-center shrink-0 font-bold text-[13px] text-zinc-700">
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

function parseLocations(location?: string): string[] {
  if (!location) return ["Nigeria"];
  const cleaned = location.replace(/&bull;/g, "•");
  const parts = cleaned
    .split(/[•/,]/)
    .map((s) => s.trim().replace(/^NG$/i, "Nigeria").replace(/^Lagos,\s*NG$/i, "Lagos"))
    .filter((s) => s.length > 0 && s.toLowerCase() !== "ng" && s.toLowerCase() !== "remote across africa");

  if (cleaned.toLowerCase().includes("remote") && !parts.some((p) => p.toLowerCase().includes("remote"))) {
    parts.push("Remote");
  }
  return Array.from(new Set(parts)).slice(0, 2);
}

/* ─────────────────────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────────────────────── */
export function FeaturedCompaniesSection({ companies: dynamicCompanies }: { companies?: FeaturedCompanyItem[] } = {}) {
  const [activeCategory, setActiveCategory] = useState("Highlight");
  const [followedCompanies, setFollowedCompanies] = useState<Record<string, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFollow = (slug: string) => {
    setFollowedCompanies((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

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

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [filteredCompanies]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
      const offset = direction === "left" ? (isMobile ? -256 : -228) : (isMobile ? 256 : 228);
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-16 sm:py-20 lg:py-24 relative overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section Header */}
        <div className="max-w-3xl mb-10 md:mb-6">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black tracking-[-0.025em] text-[#1F1F1F] leading-[1.18] mb-4">
            Choose the company that&apos;s meant for you
          </h2>
          <p className="text-[15px] sm:text-[16.5px] text-zinc-600 leading-[1.7] max-w-2xl">
            Get to know leading companies across Nigeria and Africa. Explore their engineering story, team culture, and active openings. When you find the right one, you will just know.
          </p>
        </div>

        {/* Filter Pills & Carousel Controls Row */}
        <div className="flex items-center justify-between gap-4 mb-7 md:mb-4">
          {/* Scrollable Filter Badges */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 pr-4">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[13px] sm:text-[13.5px] font-bold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 select-none ${isActive
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
              disabled={!canScrollLeft}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-2xs ${
                canScrollLeft
                  ? "bg-white border-zinc-200/90 text-zinc-800 hover:text-[#E7040D] hover:bg-zinc-50 cursor-pointer active:scale-95"
                  : "bg-zinc-100/60 border-zinc-200/70 text-zinc-300 cursor-not-allowed"
              }`}
              aria-label="Previous companies"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-2xs ${
                canScrollRight
                  ? "bg-white border-zinc-200/90 text-zinc-800 hover:text-[#E7040D] hover:bg-zinc-50 cursor-pointer active:scale-95"
                  : "bg-zinc-100/60 border-zinc-200/70 text-zinc-300 cursor-not-allowed"
              }`}
              aria-label="Next companies"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* Contained Carousel Track */}
        <div className="w-full overflow-hidden">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-4 md:gap-2.5 overflow-x-auto no-scrollbar pb-6 pt-2 md:pb-4 md:pt-1 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredCompanies.map((company) => {
              const isFollowed = !!followedCompanies[company.slug];
              const locations = parseLocations(company.location);

              return (
                <div
                  key={company.name}
                  className="w-[240px] sm:w-[250px] md:w-[218px] min-h-[350px] sm:min-h-[360px] md:min-h-[325px] shrink-0 bg-white rounded-lg border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group snap-start select-none"
                >
                  <div>
                    {/* 1. Top Cover Image (Compact Landscape Ratio with Rounded Top Corners) */}
                    <Link
                      href={`/companies/${company.slug}`}
                      className="relative h-[125px] sm:h-[130px] md:h-[110px] w-full bg-zinc-100 overflow-hidden block"
                    >
                      <Image
                        src={company.coverImage || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800"}
                        alt={`${company.name} office`}
                        fill
                        sizes="(max-width: 640px) 240px, 218px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />

                      {/* Active Open Roles Badge */}
                      {typeof company.openRoles === "number" && company.openRoles > 0 ? (
                        <div className="absolute top-2 right-2 z-10">
                          <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold text-white bg-[#E7040D] shadow-xs px-2 py-0.5 rounded-full">
                            <Briefcase size={10} weight="bold" className="text-white" />
                            <span>
                              {company.openRoles} {company.openRoles === 1 ? "Role" : "Roles"}
                            </span>
                          </span>
                        </div>
                      ) : null}
                    </Link>

                    {/* 2. Card Body Content */}
                    <div className="p-3.5 sm:p-4 md:p-2.5">
                      {/* Company Identity: Logo Box + Name + Verified Badge */}
                      <Link
                        href={`/companies/${company.slug}`}
                        className="flex items-center gap-2 group/title mb-1"
                      >
                        <div className="w-9 h-9 md:w-8 md:h-8 rounded-lg bg-[#FAF8F5] border border-zinc-200/90 shadow-2xs flex items-center justify-center p-1 overflow-hidden shrink-0">
                          {company.logo ? (
                            <Image
                              src={company.logo}
                              alt={company.name}
                              width={32}
                              height={32}
                              className="w-full h-full object-contain"
                              unoptimized
                            />
                          ) : (
                            <CompanyVector name={company.name} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <h3 className="text-[14px] sm:text-[14.5px] md:text-[13.5px] font-bold text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-tight tracking-tight truncate">
                              {company.name}
                            </h3>
                            <SealCheck size={14} weight="fill" className="text-[#E7040D] shrink-0" />
                          </div>
                        </div>
                      </Link>

                      {/* 3. Welcome to the Jungle Style Tag Pills */}
                      <div className="flex flex-wrap gap-1 mt-2.5 md:mt-2">
                        {/* Team Size Tag */}
                        {company.size ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F4F4F6] text-zinc-700 text-[10.5px] sm:text-[11px] md:text-[10px] font-medium rounded-md">
                            <Users size={11} weight="regular" className="text-zinc-500 shrink-0" />
                            <span className="truncate max-w-[110px] md:max-w-[95px]">
                              {company.size.toLowerCase().includes("team") || company.size.toLowerCase().includes("employee")
                                ? company.size
                                : `${company.size} employees`}
                            </span>
                          </span>
                        ) : null}

                        {/* Individual Location Tags */}
                        {locations.map((loc) => (
                          <span
                            key={loc}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F4F4F6] text-zinc-700 text-[10.5px] sm:text-[11px] md:text-[10px] font-medium rounded-md"
                          >
                            <MapPin size={11} weight="regular" className="text-zinc-500 shrink-0" />
                            <span>{loc}</span>
                          </span>
                        ))}

                        {/* Primary Industry Tag */}
                        {company.industry || company.category ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F4F4F6] text-zinc-700 text-[10.5px] sm:text-[11px] md:text-[10px] font-medium rounded-md truncate max-w-[130px] md:max-w-[110px]">
                            <Tag size={11} weight="regular" className="text-zinc-500 shrink-0" />
                            <span className="truncate">{company.industry || company.category}</span>
                          </span>
                        ) : null}

                        {/* Sub-industry Tag if distinct */}
                        {company.subIndustry && company.subIndustry !== company.industry ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F4F4F6] text-zinc-700 text-[10.5px] sm:text-[11px] md:text-[10px] font-medium rounded-md truncate max-w-[130px] md:max-w-[110px]">
                            <Tag size={11} weight="regular" className="text-zinc-500 shrink-0" />
                            <span className="truncate">{company.subIndustry}</span>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* 4. Bottom Footer with Pinned Follow Button */}
                  <div className="p-3.5 sm:p-4 md:p-2.5 pt-0 mt-auto">
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFollow(company.slug);
                        }}
                        className={`px-3.5 py-1.5 md:px-3 md:py-1 rounded-lg text-[11.5px] md:text-[11px] font-bold border transition-all cursor-pointer select-none active:scale-95 ${
                          isFollowed
                            ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]"
                            : "bg-white hover:bg-zinc-50 border-zinc-200/90 text-zinc-800 hover:border-zinc-400 shadow-2xs"
                        }`}
                      >
                        {isFollowed ? "Following" : "Follow"}
                      </button>

                      <Link
                        href={`/companies/${company.slug}`}
                        className="text-[11.5px] md:text-[11px] font-semibold text-zinc-500 hover:text-[#E7040D] transition-colors"
                      >
                        View profile →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Carousel Navigation Controls matching reference layout */}
        <div className="flex sm:hidden items-center gap-2 mt-4 pt-1">
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all shadow-2xs ${
              canScrollLeft
                ? "bg-white border-zinc-200/90 text-zinc-800 hover:text-[#E7040D] hover:bg-zinc-50 cursor-pointer active:scale-95"
                : "bg-zinc-100/60 border-zinc-200/70 text-zinc-300 cursor-not-allowed"
            }`}
            aria-label="Previous company"
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all shadow-2xs ${
              canScrollRight
                ? "bg-white border-zinc-200/90 text-zinc-800 hover:text-[#E7040D] hover:bg-zinc-50 cursor-pointer active:scale-95"
                : "bg-zinc-100/60 border-zinc-200/70 text-zinc-300 cursor-not-allowed"
            }`}
            aria-label="Next company"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>

        {/* Seamless Hiring Callout */}
        <div className="mt-14 sm:mt-16">
          <p className="text-[14.5px] sm:text-[15.5px] text-zinc-900 font-normal">
            Are you{" "}
            <Link
              href="/about?tab=post-and-submit&type=job"
              className="font-bold underline decoration-[#E7040D] decoration-[2.5px] underline-offset-4 cursor-pointer hover:text-[#E7040D] transition-colors"
            >
              hiring?
            </Link>{" "}
            See how we help companies find the right people.
          </p>
        </div>
      </div>

      {/* Company Showcase: Static layout when <= 2 companies, infinite marquee when > 2 companies */}
      <div className="w-full py-6 mt-6">
        {ALL_AFRICAN_BRANDS.length > 2 ? (
          <div className="w-full overflow-hidden">
            <div className="marquee-scroll flex items-center gap-14 sm:gap-20 select-none">
              {[...ALL_AFRICAN_BRANDS, ...ALL_AFRICAN_BRANDS, ...ALL_AFRICAN_BRANDS].map((brand, idx) => (
                <div
                  key={`${brand}-${idx}`}
                  className="flex items-center shrink-0 opacity-95 hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-105"
                >
                  <BrandWordmark brand={brand} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-12 sm:gap-20 select-none flex-wrap">
            {ALL_AFRICAN_BRANDS.map((brand) => (
              <div
                key={brand}
                className="flex items-center shrink-0 opacity-95 hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-105"
              >
                <BrandWordmark brand={brand} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
