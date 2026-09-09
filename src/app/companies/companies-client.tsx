"use client";

import { useState, useMemo, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlass,
  MapPin,
  CaretDown,
  CaretRight,
  Tag,
  Users,
  X,
  Check,
} from "@phosphor-icons/react";
import { AppHeader } from "@/components/navigation/app-header";

export interface SanityCompany {
  id: string;
  name: string;
  slug: string;
  industry: string;
  location: string;
  employeesCount: string;
  description: string;
  bio: string;
  logo: string;
  coverImage: string;
  accentColor: string;
  verified: boolean;
  openJobsCount: number;
}

const SECTORS = [
  "All Sectors",
  "Payments & Financial Infrastructure",
  "Global Banking & Cross-Border APIs",
  "Commercial Banking & POS Terminals",
  "Global Tech Talent Network",
  "Neobanking & Consumer Fintech",
  "On-Demand Delivery & Logistics",
  "WealthTech & Global Investments",
  "HealthTech & Electronic Records",
  "Data, ML & AI",
  "Engineering & Software",
];

const SIZES = [
  "All Sizes",
  "Between 50 and 250 employees",
  "Between 250 and 500 employees",
  "500+ employees",
  "1,000+ employees",
];

const LOCATIONS = [
  "All Locations",
  "Nigeria",
  "Lagos, Nigeria",
  "London & Lagos",
  "Lagos & San Francisco",
  "Remote Africa",
];

const LANGUAGES = [
  "All Stacks",
  "TypeScript & React",
  "Python & AI",
  "Go & Kubernetes",
  "Mobile & Flutter",
  "Rust & Systems",
];

/* ─────────────────────────────────────────────────────────────
   Company Logo Mark: uses uploaded Sanity logo when available,
   falls back to styled initials
───────────────────────────────────────────────────────────── */
function CompanySquareMark({
  name,
  logo,
  accentColor,
}: {
  name: string;
  logo: string;
  accentColor: string;
}) {
  if (logo) {
    return (
      <div className="w-16 h-16 rounded-none bg-white border border-zinc-200/90 shadow-xs flex items-center justify-center p-2 overflow-hidden">
        <Image
          src={logo}
          alt={name}
          width={64}
          height={64}
          className="object-contain w-full h-full"
          unoptimized
        />
      </div>
    );
  }

  const n = name.toLowerCase();
  if (n.includes("paystack")) {
    return (
      <div className="w-16 h-16 rounded-none bg-white border border-zinc-200/90 shadow-xs flex items-center justify-center p-3">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#00C3F8]">
          <path d="M15 22h70v16H15zM15 44h45v16H15zM15 66h70v15H15z" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (n.includes("flutterwave")) {
    return (
      <div className="w-16 h-16 rounded-none bg-white border border-zinc-200/90 shadow-xs flex items-center justify-center p-3">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 50c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#FB4E2D" strokeWidth="12" strokeLinecap="round" />
          <path d="M32 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#FF9B00" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (n.includes("moniepoint")) {
    return (
      <div className="w-16 h-16 rounded-none bg-[#0355D4] border border-zinc-200/90 shadow-xs flex items-center justify-center p-3 text-white">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M22 22l28 28-28 28V22zM78 22L50 50l28 28V22z" fill="white" />
        </svg>
      </div>
    );
  }
  if (n.includes("andela")) {
    return (
      <div className="w-16 h-16 rounded-none bg-white border border-zinc-200/90 shadow-xs flex items-center justify-center p-2">
        <span className="text-[#3359DF] font-black text-2xl tracking-tighter">A</span>
      </div>
    );
  }
  if (n.includes("kuda")) {
    return (
      <div className="w-16 h-16 rounded-none bg-[#40196D] border border-zinc-200/90 shadow-xs flex items-center justify-center p-2">
        <span className="text-white font-black text-sm tracking-tight">kuda.</span>
      </div>
    );
  }

  // Generic fallback using accentColor from Sanity
  return (
    <div
      className="w-16 h-16 rounded-none border border-zinc-200/90 shadow-xs flex items-center justify-center text-white font-bold text-base"
      style={{ backgroundColor: accentColor || "#1F1F1F" }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function CompaniesPageClient({ companies }: { companies: SanityCompany[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("Nigeria");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [followedCompanies, setFollowedCompanies] = useState<Record<string, boolean>>({});
  const [openDropdown, setOpenDropdown] = useState<"location" | "sector" | "size" | "language" | null>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFollow = (companyId: string) => {
    setFollowedCompanies((prev) => ({
      ...prev,
      [companyId]: !prev[companyId],
    }));
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((comp) => {
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchName = comp.name.toLowerCase().includes(q);
        const matchIndustry = comp.industry.toLowerCase().includes(q);
        const matchBio = comp.bio.toLowerCase().includes(q);
        if (!matchName && !matchIndustry && !matchBio) return false;
      }
      if (selectedLocation && selectedLocation !== "All Locations") {
        const loc = selectedLocation.toLowerCase();
        if (selectedLocation === "Nigeria") {
          if (
            comp.location &&
            !comp.location.toLowerCase().includes("nigeria") &&
            !comp.location.toLowerCase().includes("lagos")
          ) {
            return false;
          }
        } else if (comp.location && !comp.location.toLowerCase().includes(loc)) {
          return false;
        }
      }
      if (selectedSector && selectedSector !== "All Sectors") {
        if (!comp.industry.toLowerCase().includes(selectedSector.toLowerCase())) {
          return false;
        }
      }
      if (selectedSize && selectedSize !== "All Sizes") {
        if (comp.employeesCount !== selectedSize) {
          return false;
        }
      }
      return true;
    });
  }, [companies, searchTerm, selectedLocation, selectedSector, selectedSize]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedSector("");
    setSelectedSize("");
    setSelectedLanguage("");
    setOpenDropdown(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <AppHeader activeTab="companies">
        <div
          ref={searchBarRef}
          className="bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-stretch relative z-40"
        >
          {/* Keyword Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-200/80">
            <MagnifyingGlass size={18} weight="bold" className="text-zinc-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company, keyword or tech ..."
              className="w-full bg-transparent text-[13.5px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          {/* Location Dropdown */}
          <div className="relative border-b md:border-b-0 md:border-r border-zinc-200/80 shrink-0">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
              className="w-full h-full flex items-center gap-2 px-4 py-3 text-[13px] font-bold text-zinc-900 hover:bg-zinc-50 cursor-pointer select-none"
            >
              <MapPin size={16} weight="bold" className="text-zinc-400 shrink-0" />
              <span>{selectedLocation || "Add location"}</span>
              {selectedLocation ? (
                <span
                  onClick={(e) => { e.stopPropagation(); setSelectedLocation(""); }}
                  className="text-zinc-400 hover:text-zinc-700 ml-1 p-0.5"
                >
                  <X size={13} weight="bold" />
                </span>
              ) : (
                <CaretDown size={12} weight="bold" className="text-zinc-400" />
              )}
            </button>
            {openDropdown === "location" && (
              <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-zinc-200/90 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { setSelectedLocation(loc === "All Locations" ? "" : loc); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-zinc-800 hover:bg-zinc-100 hover:text-black flex items-center justify-between cursor-pointer"
                  >
                    <span>{loc}</span>
                    {(selectedLocation === loc || (!selectedLocation && loc === "All Locations")) && (
                      <Check size={14} weight="bold" className="text-[#E7040D]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sector, Size, Language Dropdowns */}
          <div className="flex items-center divide-x divide-zinc-200/80 shrink-0">
            {/* Sector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "sector" ? null : "sector")}
                className={`px-4 py-3 flex items-center gap-2 text-[13px] font-semibold transition-colors cursor-pointer select-none ${selectedSector ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950"}`}
              >
                <span className="max-w-[120px] truncate">{selectedSector || "Sector"}</span>
                <CaretDown size={13} weight="bold" className="text-zinc-400 shrink-0" />
              </button>
              {openDropdown === "sector" && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-zinc-200/90 shadow-2xl py-1 z-50 max-h-72 overflow-y-auto">
                  {SECTORS.map((sec) => (
                    <button
                      key={sec}
                      onClick={() => { setSelectedSector(sec === "All Sectors" ? "" : sec); setOpenDropdown(null); }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-zinc-800 hover:bg-zinc-100 hover:text-black flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate pr-2">{sec}</span>
                      {(selectedSector === sec || (!selectedSector && sec === "All Sectors")) && (
                        <Check size={14} weight="bold" className="text-[#E7040D]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Size */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "size" ? null : "size")}
                className={`px-4 py-3 flex items-center gap-2 text-[13px] font-semibold transition-colors cursor-pointer select-none ${selectedSize ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950"}`}
              >
                <span className="max-w-[100px] truncate">{selectedSize ? "Selected" : "Size"}</span>
                <CaretDown size={13} weight="bold" className="text-zinc-400 shrink-0" />
              </button>
              {openDropdown === "size" && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-zinc-200/90 shadow-2xl py-1 z-50">
                  {SIZES.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => { setSelectedSize(sz === "All Sizes" ? "" : sz); setOpenDropdown(null); }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-zinc-800 hover:bg-zinc-100 hover:text-black flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate pr-2">{sz}</span>
                      {(selectedSize === sz || (!selectedSize && sz === "All Sizes")) && (
                        <Check size={14} weight="bold" className="text-[#E7040D]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Languages */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "language" ? null : "language")}
                className={`px-4 py-3 flex items-center gap-2 text-[13px] font-semibold transition-colors cursor-pointer select-none ${selectedLanguage ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950"}`}
              >
                <span>{selectedLanguage || "Languages"}</span>
                <CaretDown size={13} weight="bold" className="text-zinc-400 shrink-0" />
              </button>
              {openDropdown === "language" && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-zinc-200/90 shadow-2xl py-1 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setSelectedLanguage(lang === "All Stacks" ? "" : lang); setOpenDropdown(null); }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-zinc-800 hover:bg-zinc-100 hover:text-black flex items-center justify-between cursor-pointer"
                    >
                      <span>{lang}</span>
                      {(selectedLanguage === lang || (!selectedLanguage && lang === "All Stacks")) && (
                        <Check size={14} weight="bold" className="text-[#E7040D]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={() => setOpenDropdown(null)}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all cursor-pointer shrink-0"
          >
            <MagnifyingGlass size={16} weight="bold" />
            <span>Search</span>
          </button>
        </div>
      </AppHeader>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1360px] mx-auto py-8 px-6 sm:px-8 lg:px-10 space-y-10">
        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200/80">
            <h1 className="text-[26px] sm:text-[30px] font-black text-[#1F1F1F] tracking-tight">
              New companies to explore
            </h1>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-white border border-zinc-200/90 text-[12.5px] font-bold text-[#1F1F1F] hover:bg-zinc-50 transition-all shadow-2xs cursor-pointer"
            >
              <span>Discover all</span>
              <CaretRight size={13} weight="bold" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {filteredCompanies.map((comp) => {
              const isFollowed = !!followedCompanies[comp.id];
              return (
                <div
                  key={comp.id}
                  className="bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-zinc-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Cover Banner */}
                  <Link href={`/companies/${comp.slug}`} className="block relative h-32 w-full bg-[#E5E7EB] overflow-hidden">
                    {comp.coverImage && (
                      <Image
                        src={comp.coverImage}
                        alt={comp.name}
                        fill
                        sizes="320px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                        unoptimized
                      />
                    )}
                  </Link>

                  {/* Body */}
                  <div className="p-5 pt-0 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Floating Logo Badge */}
                      <Link href={`/companies/${comp.slug}`} className="block -mt-8 mb-3.5 relative z-10">
                        <CompanySquareMark name={comp.name} logo={comp.logo} accentColor={comp.accentColor} />
                      </Link>

                      {/* Company Name */}
                      <Link href={`/companies/${comp.slug}`}>
                        <h2 className="text-[17px] font-black text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight mb-2">
                          {comp.name}
                        </h2>
                      </Link>

                      {/* Metadata */}
                      <div className="space-y-1.5 text-[12.5px] text-zinc-600">
                        <div className="flex items-center gap-2">
                          <Tag size={14} weight="bold" className="text-zinc-400 shrink-0" />
                          <span className="truncate">{comp.industry || "General Tech"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} weight="bold" className="text-zinc-400 shrink-0" />
                          <span className="truncate">{comp.location || "Nigeria"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={14} weight="bold" className="text-zinc-400 shrink-0" />
                          <span className="truncate">{comp.employeesCount || "10+ team"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Follow Button */}
                    <div className="pt-6">
                      <button
                        onClick={() => toggleFollow(comp.id)}
                        className={`w-full py-2 rounded-none text-[12.5px] font-bold border transition-all cursor-pointer text-center ${
                          isFollowed
                            ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]"
                            : "bg-white hover:bg-zinc-50 border-zinc-200 text-[#1F1F1F] shadow-2xs"
                        }`}
                      >
                        {isFollowed ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="py-16 text-center text-zinc-500 bg-white border border-zinc-200 mt-6">
              <p className="text-[15px] font-bold text-zinc-900 mb-1">No companies match these filters</p>
              <p className="text-[13px] text-zinc-500 mb-4">Try widening your search or clearing selected filters.</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#0C1222] text-white text-[12.5px] font-bold cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
