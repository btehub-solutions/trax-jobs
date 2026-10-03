"use client";

import { useState, useMemo, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  SealCheck,
  Briefcase,
  Faders,
  CaretUp,
  ArrowClockwise,
} from "@phosphor-icons/react";
import { AppHeader } from "@/components/navigation/app-header";
import { isValidImageUrl } from "@/lib/utils";

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
  "1-50 employees",
  "50-250 employees",
  "250-500 employees",
  "500+ employees",
  "1,000+ employees",
];

const LOCATIONS = [
  "All Locations",
  "Nigeria",
  "Lagos, Nigeria",
  "Abuja, Nigeria",
  "Abeokuta, Ogun State",
  "Ibadan, Nigeria",
  "London & Lagos",
  "Lagos & San Francisco",
  "Remote Africa",
  "Remote",
];

const LANGUAGES = [
  "All Stacks",
  "TypeScript & React",
  "Python & AI",
  "Go & Kubernetes",
  "Mobile & Flutter",
  "Rust & Systems",
];

function parseCompanyHeadcount(str: string): number {
  if (!str) return 0;
  const cleaned = str.replace(/,/g, "");
  const matches = cleaned.match(/\d+/g);
  if (!matches || matches.length === 0) return 0;
  const nums = matches.map(Number);
  return Math.max(...nums);
}

function matchesSize(compSizeStr: string, selectedSize: string): boolean {
  if (!selectedSize || selectedSize === "All Sizes") return true;
  const count = parseCompanyHeadcount(compSizeStr);
  if (count === 0) return true;

  if (selectedSize.includes("1-50") || selectedSize.includes("1-10") || selectedSize.includes("10-50")) {
    return count <= 50;
  }
  if (selectedSize.includes("50-250") || selectedSize.includes("50 and 250") || selectedSize.includes("100 and 250")) {
    return count >= 50 && count <= 250;
  }
  if (selectedSize.includes("250-500") || selectedSize.includes("250 and 500")) {
    return count > 200 && count <= 500;
  }
  if (selectedSize.includes("1,000") || selectedSize.includes("1000")) {
    return count >= 1000;
  }
  if (selectedSize.includes("500+")) {
    return count >= 500;
  }
  return compSizeStr.toLowerCase().includes(selectedSize.toLowerCase());
}

function matchesTechStack(comp: SanityCompany, selectedLanguage: string): boolean {
  if (!selectedLanguage || selectedLanguage === "All Stacks") return true;
  const lang = selectedLanguage.toLowerCase();
  const fullText = `${comp.name} ${comp.industry} ${comp.bio} ${comp.description}`.toLowerCase();

  if (lang.includes("typescript") || lang.includes("react")) {
    return (
      fullText.includes("react") ||
      fullText.includes("typescript") ||
      fullText.includes("javascript") ||
      fullText.includes("frontend") ||
      fullText.includes("web") ||
      fullText.includes("software") ||
      fullText.includes("engineering")
    );
  }
  if (lang.includes("python") || lang.includes("ai")) {
    return (
      fullText.includes("python") ||
      fullText.includes("ai") ||
      fullText.includes("ml") ||
      fullText.includes("data") ||
      fullText.includes("analytics") ||
      fullText.includes("intelligence")
    );
  }
  if (lang.includes("go") || lang.includes("kubernetes")) {
    return (
      fullText.includes("go") ||
      fullText.includes("golang") ||
      fullText.includes("kubernetes") ||
      fullText.includes("infrastructure") ||
      fullText.includes("backend") ||
      fullText.includes("cloud") ||
      fullText.includes("rails") ||
      fullText.includes("devops")
    );
  }
  if (lang.includes("mobile") || lang.includes("flutter")) {
    return (
      fullText.includes("mobile") ||
      fullText.includes("flutter") ||
      fullText.includes("app") ||
      fullText.includes("pos") ||
      fullText.includes("ios") ||
      fullText.includes("android")
    );
  }
  if (lang.includes("rust") || lang.includes("systems")) {
    return (
      fullText.includes("rust") ||
      fullText.includes("systems") ||
      fullText.includes("infrastructure") ||
      fullText.includes("payments") ||
      fullText.includes("security")
    );
  }

  return fullText.includes(lang);
}

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
  logo?: string;
  accentColor: string;
}) {
  if (isValidImageUrl(logo)) {
    return (
      <div className="w-full h-full rounded-lg bg-white flex items-center justify-center p-1 overflow-hidden">
        <Image
          src={logo}
          alt={name}
          width={40}
          height={40}
          className="object-contain w-full h-full rounded-md"
          unoptimized
        />
      </div>
    );
  }

  const n = name.toLowerCase();
  if (n.includes("paystack")) {
    return (
      <div className="w-full h-full rounded-lg bg-white flex items-center justify-center p-1.5">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#00C3F8]">
          <path d="M15 22h70v16H15zM15 44h45v16H15zM15 66h70v15H15z" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (n.includes("flutterwave")) {
    return (
      <div className="w-full h-full rounded-lg bg-white flex items-center justify-center p-1.5">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 50c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#FB4E2D" strokeWidth="12" strokeLinecap="round" />
          <path d="M32 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#FF9B00" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (n.includes("moniepoint")) {
    return (
      <div className="w-full h-full rounded-lg bg-[#0355D4] flex items-center justify-center p-1.5 text-white">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M22 22l28 28-28 28V22zM78 22L50 50l28 28V22z" fill="white" />
        </svg>
      </div>
    );
  }
  if (n.includes("andela")) {
    return (
      <div className="w-full h-full rounded-lg bg-white flex items-center justify-center p-1">
        <span className="text-[#3359DF] font-black text-xl tracking-tighter">A</span>
      </div>
    );
  }
  if (n.includes("kuda")) {
    return (
      <div className="w-full h-full rounded-lg bg-[#40196D] flex items-center justify-center p-1">
        <span className="text-white font-black text-xs tracking-tight">kuda.</span>
      </div>
    );
  }

  // Generic fallback using accentColor from Sanity
  return (
    <div
      className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold text-xs"
      style={{ backgroundColor: accentColor || "#1F1F1F" }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function CompaniesPageInner({ companies }: { companies: SanityCompany[] }) {
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") || searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(qParam);

  useEffect(() => {
    if (qParam !== undefined) {
      setSearchTerm(qParam);
    }
  }, [qParam]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [followedCompanies, setFollowedCompanies] = useState<Record<string, boolean>>({});
  const [openDropdown, setOpenDropdown] = useState<"location" | "sector" | "size" | "language" | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and handle ESC key when mobile filter drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFiltersOpen(false);
    };
    if (mobileFiltersOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const [openSections, setOpenSections] = useState({
    sector: true,
    size: true,
    stack: false,
    location: true,
  });
  const [keywordInput, setKeywordInput] = useState(searchTerm);
  const [locationInput, setLocationInput] = useState(selectedLocation);

  useEffect(() => {
    setKeywordInput(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setLocationInput(selectedLocation);
  }, [selectedLocation]);

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyKeyword = () => {
    setSearchTerm(keywordInput.trim());
  };

  const handleApplyLocation = () => {
    setSelectedLocation(locationInput.trim());
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedLocation && selectedLocation !== "All Locations") count++;
    if (selectedSector && selectedSector !== "All Sectors") count++;
    if (selectedSize && selectedSize !== "All Sizes") count++;
    if (selectedLanguage && selectedLanguage !== "All Stacks") count++;
    return count;
  }, [searchTerm, selectedLocation, selectedSector, selectedSize, selectedLanguage]);

  const resetFilterOptions = () => {
    setSearchTerm("");
    setKeywordInput("");
    setSelectedLocation("");
    setLocationInput("");
    setSelectedSector("");
    setSelectedSize("");
    setSelectedLanguage("");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (searchBarRef.current && !searchBarRef.current.contains(target)) {
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
      // 1. Keyword match
      if (searchTerm) {
        const q = searchTerm.toLowerCase().trim();
        const matchName = comp.name.toLowerCase().includes(q);
        const matchIndustry = comp.industry.toLowerCase().includes(q);
        const matchBio = comp.bio.toLowerCase().includes(q);
        const matchDesc = comp.description.toLowerCase().includes(q);
        const matchLoc = comp.location.toLowerCase().includes(q);
        if (!matchName && !matchIndustry && !matchBio && !matchDesc && !matchLoc) return false;
      }

      // 2. Location filter
      if (selectedLocation && selectedLocation !== "All Locations") {
        const loc = selectedLocation.toLowerCase().trim();
        const compLoc = (comp.location || "").toLowerCase();

        if (loc === "nigeria") {
          const isNigeria =
            compLoc.includes("nigeria") ||
            compLoc.includes("lagos") ||
            compLoc.includes("abuja") ||
            compLoc.includes("abeokuta") ||
            compLoc.includes("ogun") ||
            compLoc.includes("ibadan");
          if (!isNigeria) return false;
        } else if (loc === "remote" || loc === "remote africa") {
          if (!compLoc.includes("remote")) return false;
        } else if (loc.includes("lagos")) {
          if (!compLoc.includes("lagos")) return false;
        } else if (loc.includes("abuja")) {
          if (!compLoc.includes("abuja")) return false;
        } else if (loc.includes("abeokuta") || loc.includes("ogun")) {
          if (!compLoc.includes("abeokuta") && !compLoc.includes("ogun")) return false;
        } else if (loc.includes("london")) {
          if (!compLoc.includes("london")) return false;
        } else if (loc.includes("san francisco")) {
          if (!compLoc.includes("san francisco")) return false;
        } else if (!compLoc.includes(loc)) {
          return false;
        }
      }

      // 3. Sector filter
      if (selectedSector && selectedSector !== "All Sectors") {
        const sec = selectedSector.toLowerCase();
        const ind = (comp.industry || "").toLowerCase();
        const fullText = `${ind} ${(comp.bio || "").toLowerCase()} ${(comp.description || "").toLowerCase()}`;

        if (ind.includes(sec)) {
          // direct industry match
        } else if (sec.includes("payments") || sec.includes("banking") || sec.includes("fintech")) {
          const isFintech =
            ind.includes("payment") ||
            ind.includes("banking") ||
            ind.includes("fintech") ||
            ind.includes("wealth") ||
            fullText.includes("payment") ||
            fullText.includes("banking") ||
            fullText.includes("fintech");
          if (!isFintech) return false;
        } else if (sec.includes("health")) {
          if (!fullText.includes("health") && !fullText.includes("medical")) return false;
        } else if (sec.includes("delivery") || sec.includes("logistics")) {
          if (!fullText.includes("delivery") && !fullText.includes("logistics")) return false;
        } else if (sec.includes("talent") || sec.includes("network")) {
          if (!fullText.includes("talent") && !fullText.includes("network") && !fullText.includes("hiring")) return false;
        } else if (sec.includes("data") || sec.includes("ai") || sec.includes("ml")) {
          if (!fullText.includes("data") && !fullText.includes("ai") && !fullText.includes("ml")) return false;
        } else if (sec.includes("engineering") || sec.includes("software")) {
          if (!fullText.includes("software") && !fullText.includes("engineering") && !fullText.includes("tech")) return false;
        } else {
          if (!ind.includes(sec) && !fullText.includes(sec)) return false;
        }
      }

      // 4. Company Size filter
      if (selectedSize && selectedSize !== "All Sizes") {
        if (!matchesSize(comp.employeesCount, selectedSize)) {
          return false;
        }
      }

      // 5. Tech Stack / Language filter
      if (selectedLanguage && selectedLanguage !== "All Stacks") {
        if (!matchesTechStack(comp, selectedLanguage)) {
          return false;
        }
      }

      return true;
    });
  }, [companies, searchTerm, selectedLocation, selectedSector, selectedSize, selectedLanguage]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedSector("");
    setSelectedSize("");
    setSelectedLanguage("");
    setOpenDropdown(null);
  };

  const hasActiveFilters = Boolean(
    searchTerm ||
    selectedLocation ||
    selectedSector ||
    selectedSize ||
    selectedLanguage
  );

  const handleDiscoverAll = () => {
    resetFilters();
    const el = document.getElementById("companies-results");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setFeedbackMessage(
      hasActiveFilters
        ? `Filters cleared. Showing all ${companies.length} companies.`
        : `Showing all ${companies.length} companies.`
    );
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);
  };

  const handleSearchSubmit = () => {
    setOpenDropdown(null);
    const el = document.getElementById("companies-results");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <AppHeader activeTab="companies">
        {/* Mobile Sticky Search Bar (Pattern 1: Unified compact bar with inline Filters button) */}
        <div className="block md:hidden">
          <div className="bg-white rounded-lg border border-zinc-200/90 shadow-2xs flex items-center gap-2 p-1.5 pl-3">
            <MagnifyingGlass size={17} weight="bold" className="text-zinc-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies, keyword or tech ..."
              className="flex-1 min-w-0 bg-transparent text-[13.5px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="p-1 text-zinc-400 hover:text-zinc-700 cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Clear search query"
              >
                <X size={14} weight="bold" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold border transition-all cursor-pointer shrink-0 select-none ${
                activeFiltersCount > 0
                  ? "bg-[#FDF2EE] border-[#E7040D] text-[#E7040D]"
                  : "bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100"
              }`}
              aria-label="Open company filters"
            >
              <Faders size={14} weight="bold" className={activeFiltersCount > 0 ? "text-[#E7040D]" : "text-zinc-500"} />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#E7040D] text-white text-[10px] font-extrabold ml-0.5">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Full Horizontal Search/Filter Bar */}
        <div
          ref={searchBarRef}
          className="hidden md:flex flex-row items-stretch bg-white rounded-lg border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative z-40 overflow-hidden"
        >
          {/* Keyword Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-r border-zinc-200/80">
            <MagnifyingGlass size={18} weight="bold" className="text-zinc-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company, keyword or tech ..."
              className="w-full bg-transparent text-[13.5px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="p-2 -mr-2 text-zinc-400 hover:text-zinc-700 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Clear search query"
              >
                <X size={15} weight="bold" />
              </button>
            )}
          </div>

          {/* Location Dropdown */}
          <div className="relative border-r border-zinc-200/80 shrink-0">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
              className={`w-full h-full flex items-center gap-2 px-4 py-3 text-[13px] font-bold transition-colors cursor-pointer select-none ${selectedLocation ? "text-[#E7040D] bg-red-50/50" : "text-zinc-900 hover:bg-zinc-50"}`}
            >
              <MapPin size={16} weight="bold" className={selectedLocation ? "text-[#E7040D] shrink-0" : "text-zinc-400 shrink-0"} />
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
              <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-zinc-200/90 rounded-lg shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
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
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "sector" ? null : "sector")}
                className={`px-4 py-3 flex items-center gap-2 text-[13px] font-semibold transition-colors cursor-pointer select-none whitespace-nowrap ${selectedSector ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950"}`}
              >
                <span className="max-w-[120px] truncate">{selectedSector || "Sector"}</span>
                {selectedSector ? (
                  <span
                    onClick={(e) => { e.stopPropagation(); setSelectedSector(""); }}
                    className="text-zinc-400 hover:text-zinc-700 ml-0.5 p-0.5"
                  >
                    <X size={12} weight="bold" />
                  </span>
                ) : (
                  <CaretDown size={13} weight="bold" className="text-zinc-400 shrink-0" />
                )}
              </button>
              {openDropdown === "sector" && (
                <div className="absolute top-full left-0 mt-1 w-72 max-w-[calc(100vw-2rem)] bg-white border border-zinc-200/90 rounded-lg shadow-2xl py-1 z-50 max-h-72 overflow-y-auto">
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
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "size" ? null : "size")}
                className={`px-4 py-3 flex items-center gap-2 text-[13px] font-semibold transition-colors cursor-pointer select-none whitespace-nowrap ${selectedSize ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950"}`}
              >
                <span className="max-w-[120px] truncate">{selectedSize || "Size"}</span>
                {selectedSize ? (
                  <span
                    onClick={(e) => { e.stopPropagation(); setSelectedSize(""); }}
                    className="text-zinc-400 hover:text-zinc-700 ml-0.5 p-0.5"
                  >
                    <X size={12} weight="bold" />
                  </span>
                ) : (
                  <CaretDown size={13} weight="bold" className="text-zinc-400 shrink-0" />
                )}
              </button>
              {openDropdown === "size" && (
                <div className="absolute top-full left-0 mt-1 w-64 max-w-[calc(100vw-2rem)] bg-white border border-zinc-200/90 rounded-lg shadow-2xl py-1 z-50 overflow-hidden">
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
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "language" ? null : "language")}
                className={`px-4 py-3 flex items-center gap-2 text-[13px] font-semibold transition-colors cursor-pointer select-none whitespace-nowrap ${selectedLanguage ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950"}`}
              >
                <span className="max-w-[120px] truncate">{selectedLanguage || "Languages"}</span>
                {selectedLanguage ? (
                  <span
                    onClick={(e) => { e.stopPropagation(); setSelectedLanguage(""); }}
                    className="text-zinc-400 hover:text-zinc-700 ml-0.5 p-0.5"
                  >
                    <X size={12} weight="bold" />
                  </span>
                ) : (
                  <CaretDown size={13} weight="bold" className="text-zinc-400 shrink-0" />
                )}
              </button>
              {openDropdown === "language" && (
                <div className="absolute top-full right-0 mt-1 w-56 max-w-[calc(100vw-2rem)] bg-white border border-zinc-200/90 rounded-lg shadow-2xl py-1 z-50 overflow-hidden">
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
            type="button"
            onClick={handleSearchSubmit}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all cursor-pointer shrink-0"
          >
            <MagnifyingGlass size={16} weight="bold" />
            <span>Search</span>
          </button>
        </div>
      </AppHeader>

      {/* Main Content */}
      <main id="companies-results" className="flex-1 w-full max-w-[1360px] mx-auto py-6 sm:py-8 px-4 sm:px-8 lg:px-10 space-y-6 sm:space-y-10">
        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200/80 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <h1 className="text-[24px] sm:text-[30px] font-black text-[#1F1F1F] tracking-[-0.02em] min-w-0">
                New companies to explore
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[11px] font-bold border border-zinc-200/70 rounded-lg">
                {filteredCompanies.length}
              </span>
            </div>
            <button
              type="button"
              onClick={handleDiscoverAll}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg bg-white border border-zinc-200/90 text-[12.5px] font-bold text-[#1F1F1F] hover:bg-zinc-50 hover:border-[#E7040D] hover:text-[#E7040D] active:scale-95 transition-all duration-150 shadow-2xs cursor-pointer shrink-0 whitespace-nowrap"
              title="View all companies"
            >
              <span>Discover all ({companies.length})</span>
              <CaretRight size={13} weight="bold" />
            </button>
          </div>

          {feedbackMessage && (
            <div className="mt-3.5 px-4 py-2.5 bg-[#FDF2EE] border border-[#fce8e0] rounded-lg text-[#E7040D] text-[12.5px] font-semibold flex items-center justify-between transition-all">
              <span>{feedbackMessage}</span>
              <button
                type="button"
                onClick={() => setFeedbackMessage(null)}
                className="text-[#E7040D] hover:text-[#CB030B] font-bold text-xs cursor-pointer ml-3 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {filteredCompanies.map((comp) => {
              const isFollowed = !!followedCompanies[comp.id];
              return (
                <div
                  key={comp.id}
                  className="bg-white rounded-lg border border-zinc-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden group min-h-[410px] w-full max-w-[320px] mx-auto sm:max-w-none"
                >
                  {/* Top Cover Banner */}
                  <Link href={`/companies/${comp.slug}`} className="block relative h-[140px] w-full bg-[#E5E7EB] overflow-hidden shrink-0">
                    {comp.coverImage ? (
                      <Image
                        src={comp.coverImage}
                        alt={comp.name}
                        fill
                        sizes="320px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E2E4E8]" />
                    )}
                  </Link>

                  {/* Card Content Area */}
                  <div className="px-6 pb-5 pt-0 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Overlapping Logo Box */}
                      <Link href={`/companies/${comp.slug}`} className="block -mt-10 mb-4 relative z-10">
                        <div className="w-[76px] h-[76px] rounded-lg bg-white p-2 border border-zinc-200 shadow-2xs overflow-hidden flex items-center justify-center group-hover:border-zinc-400 transition-colors">
                          {isValidImageUrl(comp.logo) ? (
                            <Image
                              src={comp.logo}
                              alt={comp.name}
                              width={60}
                              height={60}
                              className="object-contain w-full h-full rounded-md"
                              unoptimized
                            />
                          ) : (
                            <CompanySquareMark name={comp.name} logo={comp.logo} accentColor={comp.accentColor} />
                          )}
                        </div>
                      </Link>

                      {/* Company Name */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <Link href={`/companies/${comp.slug}`} className="min-w-0">
                          <h2 className="text-[18px] font-bold text-black group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight truncate">
                            {comp.name}
                          </h2>
                        </Link>
                        {comp.verified && (
                          <SealCheck size={16} weight="fill" className="text-[#E7040D] shrink-0" />
                        )}
                      </div>

                      {/* 3-Row Vertical Metadata List */}
                      <div className="space-y-2 text-[13px] text-zinc-600">
                        <div className="flex items-center gap-2.5">
                          <Tag size={15} weight="bold" className="text-zinc-500 shrink-0" />
                          <span className="truncate">{comp.industry || "Technology"}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <MapPin size={15} weight="bold" className="text-zinc-500 shrink-0" />
                          <span className="truncate">{comp.location?.split("•")[0]?.split(",")?.slice(0, 2)?.join(",")?.trim() || "Nigeria"}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Users size={15} weight="bold" className="text-zinc-500 shrink-0" />
                          <span className="truncate">
                            {comp.employeesCount
                              ? comp.employeesCount.toLowerCase().includes("team") ||
                                comp.employeesCount.toLowerCase().includes("employee")
                                ? comp.employeesCount
                                : `Between ${comp.employeesCount} employees`
                              : "Between 20 and 500 employees"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Area (Generous white space, pinned Follow button on bottom right) */}
                    <div className="pt-6 mt-auto flex items-center justify-between">
                      <div>
                        {typeof comp.openJobsCount === "number" && comp.openJobsCount > 0 ? (
                          <Link
                            href={`/companies/${comp.slug}`}
                            className="text-[12px] font-bold text-[#E7040D] hover:underline"
                          >
                            {comp.openJobsCount} open {comp.openJobsCount === 1 ? "role" : "roles"}
                          </Link>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFollow(comp.id);
                        }}
                        className={`ml-auto px-4 py-1.5 text-[12px] font-medium rounded-lg border transition-colors cursor-pointer ${
                          isFollowed
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-black hover:bg-zinc-100"
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
            <div className="py-20 px-4 text-center flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 bg-[#FED7AA] rounded-sm p-4 shadow-[12px_18px_32px_-6px_rgba(217,119,6,0.22)] transform rotate-2 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between select-none">
                <div className="absolute top-0 left-0 right-0 h-4 bg-black/5 pointer-events-none" />
                <div className="w-full h-full border border-amber-500/40 rounded-sm p-2 flex flex-col items-center justify-center">
                  <svg viewBox="0 0 100 100" fill="none" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20 opacity-85">
                    {/* Modern Headquarters / Office Tower Silhouette */}
                    <path d="M15 85h70" />
                    <rect x="25" y="30" width="32" height="55" rx="1" />
                    <rect x="57" y="45" width="22" height="40" rx="1" />
                    {/* Tower Roof Spire */}
                    <path d="M41 18v12" />
                    <circle cx="41" cy="15" r="2.5" />
                    {/* Windows Grid */}
                    <path d="M33 40h4M45 40h4M33 50h4M45 50h4M33 60h4M45 60h4M33 70h4M45 70h4" strokeWidth="2" />
                    <path d="M65 55h6M65 65h6M65 75h6" strokeWidth="2" />
                    {/* Entrance */}
                    <path d="M37 85v-7h8v7" />
                    {/* Subtle decorative accents */}
                    <path d="M78 28l4 4M82 28l-4 4" strokeWidth="1.5" />
                    <path d="M16 42l3 3M19 42l-3 3" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
              <h3 className="text-[24px] sm:text-[26px] font-black text-zinc-950 mt-10 mb-2 tracking-tight">No companies in sight</h3>
              <p className="text-[14.5px] sm:text-[15.5px] text-zinc-600 leading-relaxed max-w-md">No companies match these filters right now.</p>
              <p className="text-[14.5px] sm:text-[15.5px] text-zinc-600 leading-relaxed max-w-md mt-0.5">Try widening your search or clearing selected filters.</p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-2.5 bg-[#0C1222] hover:bg-[#E7040D] text-white text-[13px] font-bold rounded-lg transition-colors cursor-pointer shadow-xs active:scale-98"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Filter Drawer (Replicated from Job Filter UI) */}
      <div
        className={`fixed inset-0 z-50 md:hidden flex justify-end transition-opacity duration-300 ${
          mobileFiltersOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileFiltersOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`relative w-full max-w-[400px] h-full bg-white z-10 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out overscroll-contain rounded-l-lg overflow-hidden ${
            mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Filter Companies"
        >
          {/* Drawer Pinned Top Header */}
          <div className="flex items-center justify-between pb-3 px-5 pt-4 border-b border-zinc-100 shrink-0 bg-white">
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] font-bold text-[#1F1F1F]">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="text-[11px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilterOptions}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#E7040D] hover:underline cursor-pointer"
                >
                  <ArrowClockwise size={13} weight="bold" />
                  <span>Reset all</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 -mr-1 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Close filters"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
          </div>

          {/* Drawer Body - Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
            {/* 1. "Active preferences" Dark Navy Card */}
            <div className="bg-[#0C1222] border border-[#0C1222] rounded-lg p-4 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-[13.5px] font-bold text-white tracking-tight">
                  Active preferences
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilterOptions}
                    className="text-[11px] font-bold text-[#FF4D55] hover:text-white hover:underline transition-colors cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {activeFiltersCount > 0 ? (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {searchTerm && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-white/20 text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs">
                      <Tag size={12} weight="bold" className="text-[#E7040D] shrink-0" />
                      <span className="truncate max-w-[120px]">{searchTerm}</span>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setKeywordInput("");
                        }}
                        className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer transition-colors"
                        aria-label="Remove search filter"
                      >
                        <X size={11} weight="bold" />
                      </button>
                    </div>
                  )}

                  {selectedSector && selectedSector !== "All Sectors" && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-white/20 text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs">
                      <span className="truncate max-w-[130px]">{selectedSector}</span>
                      <button
                        onClick={() => setSelectedSector("")}
                        className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer transition-colors"
                        aria-label="Remove sector filter"
                      >
                        <X size={11} weight="bold" />
                      </button>
                    </div>
                  )}

                  {selectedSize && selectedSize !== "All Sizes" && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-white/20 text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs">
                      <span>{selectedSize}</span>
                      <button
                        onClick={() => setSelectedSize("")}
                        className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer transition-colors"
                        aria-label="Remove size filter"
                      >
                        <X size={11} weight="bold" />
                      </button>
                    </div>
                  )}

                  {selectedLanguage && selectedLanguage !== "All Stacks" && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-white/20 text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs">
                      <span>{selectedLanguage}</span>
                      <button
                        onClick={() => setSelectedLanguage("")}
                        className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer transition-colors"
                        aria-label="Remove stack filter"
                      >
                        <X size={11} weight="bold" />
                      </button>
                    </div>
                  )}

                  {selectedLocation && selectedLocation !== "All Locations" && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-white/20 text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs">
                      <MapPin size={12} weight="bold" className="text-[#E7040D] shrink-0" />
                      <span>{selectedLocation}</span>
                      <button
                        onClick={() => {
                          setSelectedLocation("");
                          setLocationInput("");
                        }}
                        className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer transition-colors"
                        aria-label="Remove location filter"
                      >
                        <X size={11} weight="bold" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-[12px] text-white/70 leading-relaxed py-1">
                  No filters applied. Select from the criteria below to filter open roles.
                </p>
              )}
            </div>

            {/* 2. "Edit preferences" Accordion List */}
            <div className="space-y-3.5 pt-1">
              <h4 className="text-[13.5px] font-bold text-[#1F1F1F]">
                Edit preferences
              </h4>

              {/* Accordion Item: Sector & Industry */}
              <div className="border-b border-zinc-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleSection("sector")}
                  className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Tag size={15} weight="bold" className="text-zinc-700" />
                    <span>Sector & Industry</span>
                  </div>
                  {openSections.sector ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                </button>

                {openSections.sector && (
                  <div className="mt-2.5 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleApplyKeyword();
                        }}
                        placeholder="e.g. Fintech, Payments, Kuda..."
                        className="flex-1 h-9 px-3 rounded-lg bg-white border border-zinc-200 text-[13px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#E7040D] transition-all shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={handleApplyKeyword}
                        className="h-9 px-3.5 bg-[#E7040D] hover:bg-[#CB030B] active:scale-95 text-white text-[12px] font-bold rounded-lg transition-all cursor-pointer shadow-2xs"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        "Payments & Financial Infrastructure",
                        "Commercial Banking & POS Terminals",
                        "Neobanking & Consumer Fintech",
                        "Data, ML & AI",
                        "Engineering & Software",
                      ].map((sec) => {
                        const isSelected = selectedSector === sec;
                        return (
                          <button
                            key={sec}
                            type="button"
                            onClick={() => setSelectedSector(isSelected ? "" : sec)}
                            className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#fce8e0] text-[#E7040D] border-[#E7040D] font-bold"
                                : "bg-[#FAFAFA] text-zinc-600 border-zinc-200 hover:border-zinc-300"
                            }`}
                          >
                            {sec.split("&")[0].trim()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion Item: Company Size */}
              <div className="border-b border-zinc-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleSection("size")}
                  className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Users size={15} weight="bold" className="text-zinc-700" />
                    <span>Company Size</span>
                  </div>
                  {openSections.size ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                </button>

                {openSections.size && (
                  <div className="mt-2 space-y-1.5">
                    {SIZES.filter((sz) => sz !== "All Sizes").map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(isSelected ? "" : sz)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-[#fce8e0] text-[#E7040D] border border-[#E7040D] font-bold"
                              : "bg-[#F9F9FB] hover:bg-[#F0F0F3] text-[#1F1F1F] border border-zinc-200/50"
                          }`}
                        >
                          <span className="truncate">{sz}</span>
                          {isSelected && <Check size={12} weight="bold" className="text-[#E7040D]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion Item: Tech Stack */}
              <div className="border-b border-zinc-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleSection("stack")}
                  className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase size={15} weight="bold" className="text-zinc-700" />
                    <span>Tech Stack</span>
                  </div>
                  {openSections.stack ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                </button>

                {openSections.stack && (
                  <div className="mt-2 space-y-1.5">
                    {LANGUAGES.filter((lang) => lang !== "All Stacks").map((lang) => {
                      const isSelected = selectedLanguage === lang;
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setSelectedLanguage(isSelected ? "" : lang)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-[#fce8e0] text-[#E7040D] border border-[#E7040D] font-bold"
                              : "bg-[#F9F9FB] hover:bg-[#F0F0F3] text-[#1F1F1F] border border-zinc-200/50"
                          }`}
                        >
                          <span className="truncate">{lang}</span>
                          {isSelected && <Check size={12} weight="bold" className="text-[#E7040D]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion Item: Location */}
              <div className="border-b border-zinc-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleSection("location")}
                  className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={15} weight="bold" className="text-zinc-700" />
                    <span>Location</span>
                  </div>
                  {openSections.location ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                </button>

                {openSections.location && (
                  <div className="mt-2.5 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleApplyLocation();
                        }}
                        placeholder="e.g. Lagos, Ogun, Remote..."
                        className="flex-1 h-9 px-3 rounded-lg bg-white border border-zinc-200 text-[13px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#E7040D] transition-all shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={handleApplyLocation}
                        className="h-9 px-3.5 bg-[#E7040D] hover:bg-[#CB030B] active:scale-95 text-white text-[12px] font-bold rounded-lg transition-all cursor-pointer shadow-2xs"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Lagos", "Abuja", "Ogun", "London", "Remote"].map((loc) => {
                        const isSelected = selectedLocation.toLowerCase().includes(loc.toLowerCase());
                        return (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => {
                              const next = isSelected ? "" : loc;
                              setSelectedLocation(next);
                              setLocationInput(next);
                            }}
                            className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#fce8e0] text-[#E7040D] border-[#E7040D] font-bold"
                                : "bg-[#FAFAFA] text-zinc-600 border-zinc-200 hover:border-zinc-300"
                            }`}
                          >
                            {loc}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Drawer Pinned Bottom Action Button */}
          <div className="p-4 border-t border-zinc-100 shrink-0 bg-white">
            <button
              type="button"
              onClick={() => {
                setMobileFiltersOpen(false);
                const el = document.getElementById("companies-results");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-full py-3 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.99] text-white text-[13.5px] font-bold rounded-lg shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Show {filteredCompanies.length} {filteredCompanies.length === 1 ? "Company" : "Companies"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompaniesPageClient({ companies }: { companies: SanityCompany[] }) {
  return (
    <Suspense fallback={null}>
      <CompaniesPageInner companies={companies} />
    </Suspense>
  );
}
