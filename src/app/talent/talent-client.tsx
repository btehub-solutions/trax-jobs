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
  SealCheck,
  Check,
  Faders,
  Briefcase,
  Clock,
} from "@phosphor-icons/react";
import { AppHeader } from "@/components/navigation/app-header";
import { HireTalentModal } from "@/components/talent/hire-talent-modal";

export interface SanityTalentItem {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  avatar: string;
  coverImage: string;
  experienceLevel: string;
  experienceYears: string;
  location: string;
  workPreference: string;
  skills: string[];
  bio: string;
  highlightMetric: string;
  rate: string;
  availability: string;
  preferredContactMethod: string;
  email: string;
  whatsapp: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  publishedAt: string;
}

const DISCIPLINES = ["All Disciplines", "Engineering", "Design", "Product", "Data & AI", "DevOps & Cloud"];
const EXPERIENCES = ["All Experience", "Senior (5-8 yrs)", "Lead / Staff (8+ yrs)", "Mid-level (3-5 yrs)", "Expert (10+ yrs)"];
const AVAILABILITIES = ["All Availability", "Available immediately", "2 weeks notice", "Part-time / Contract"];
const LOCATIONS = ["All Locations", "Nigeria", "Lagos, Nigeria", "Abuja, Nigeria", "Abeokuta, Ogun State", "Nairobi, Kenya", "Accra, Ghana", "Kigali, Rwanda", "Cape Town, South Africa", "Remote Africa"];

function TalentSquareMark({ item }: { item: SanityTalentItem }) {
  const [imageError, setImageError] = useState(false);
  if (!imageError && item.avatar) {
    return (
      <Image
        src={item.avatar}
        alt={item.name}
        width={72}
        height={72}
        className="w-full h-full object-cover object-top rounded-[2px]"
        onError={() => setImageError(true)}
        unoptimized
      />
    );
  }
  return (
    <div className="w-full h-full bg-[#1F1F1F] text-white font-bold flex items-center justify-center text-lg rounded-[2px]">
      {item.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function TalentPageInner({ talent }: { talent: SanityTalentItem[] }) {
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") || searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(qParam);

  useEffect(() => {
    if (qParam !== undefined) {
      setSearchTerm(qParam);
    }
  }, [qParam]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");
  const [activeHireTalent, setActiveHireTalent] = useState<SanityTalentItem | null>(null);
  const [openDropdown, setOpenDropdown] = useState<"location" | "discipline" | "experience" | "availability" | null>(null);
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

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedLocation) count++;
    if (selectedDiscipline) count++;
    if (selectedExperience) count++;
    if (selectedAvailability) count++;
    return count;
  }, [selectedLocation, selectedDiscipline, selectedExperience, selectedAvailability]);

  const resetFilterOptions = () => {
    setSelectedLocation("");
    setSelectedDiscipline("");
    setSelectedExperience("");
    setSelectedAvailability("");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTalent = useMemo(() => {
    return talent.filter((item) => {
      // 1. Search term match
      if (searchTerm) {
        const q = searchTerm.toLowerCase().trim();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.bio.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.skills.some((s) => s.toLowerCase().includes(q));
        if (!match) return false;
      }

      // 2. Location match
      if (selectedLocation && selectedLocation !== "All Locations") {
        const sel = selectedLocation.toLowerCase();
        const loc = (item.location || "").toLowerCase();
        const pref = (item.workPreference || "").toLowerCase();

        let matchesLocation = false;
        if (sel === "nigeria") {
          matchesLocation =
            loc.includes("nigeria") ||
            loc.includes("lagos") ||
            loc.includes("abuja") ||
            loc.includes("ogun") ||
            loc.includes("abeokuta") ||
            loc.includes("ibadan") ||
            pref.includes("nigeria");
        } else if (sel.includes("lagos")) {
          matchesLocation = loc.includes("lagos");
        } else if (sel.includes("abuja")) {
          matchesLocation = loc.includes("abuja");
        } else if (sel.includes("abeokuta") || sel.includes("ogun")) {
          matchesLocation = loc.includes("abeokuta") || loc.includes("ogun");
        } else if (sel.includes("nairobi") || sel.includes("kenya")) {
          matchesLocation = loc.includes("nairobi") || loc.includes("kenya");
        } else if (sel.includes("accra") || sel.includes("ghana")) {
          matchesLocation = loc.includes("accra") || loc.includes("ghana");
        } else if (sel.includes("kigali") || sel.includes("rwanda")) {
          matchesLocation = loc.includes("kigali") || loc.includes("rwanda");
        } else if (sel.includes("cape town") || sel.includes("south africa")) {
          matchesLocation = loc.includes("cape town") || loc.includes("south africa");
        } else if (sel.includes("remote")) {
          matchesLocation = loc.includes("remote") || pref.includes("remote");
        } else {
          matchesLocation = loc.includes(sel) || pref.includes(sel);
        }

        if (!matchesLocation) return false;
      }

      // 3. Discipline match
      if (selectedDiscipline && selectedDiscipline !== "All Disciplines") {
        const cat = (item.category || "").toLowerCase();
        const title = (item.title || "").toLowerCase();
        const sel = selectedDiscipline.toLowerCase();

        let matchesDiscipline = false;
        if (sel.includes("engineer")) {
          matchesDiscipline =
            cat.includes("engineer") ||
            title.includes("engineer") ||
            title.includes("developer") ||
            title.includes("architect");
        } else if (sel.includes("design")) {
          matchesDiscipline =
            cat.includes("design") ||
            title.includes("design") ||
            title.includes("ui") ||
            title.includes("ux");
        } else if (sel.includes("product")) {
          matchesDiscipline =
            cat.includes("product") ||
            title.includes("product") ||
            title.includes("pm");
        } else if (sel.includes("data") || sel.includes("ai")) {
          matchesDiscipline =
            cat.includes("data") ||
            cat.includes("ai") ||
            cat.includes("ml") ||
            title.includes("data") ||
            title.includes("ai") ||
            title.includes("ml") ||
            title.includes("machine learning");
        } else if (sel.includes("devops") || sel.includes("cloud")) {
          matchesDiscipline =
            cat.includes("devops") ||
            cat.includes("cloud") ||
            cat.includes("sre") ||
            title.includes("devops") ||
            title.includes("cloud") ||
            title.includes("infrastructure") ||
            title.includes("sre");
        } else {
          matchesDiscipline = cat.includes(sel) || title.includes(sel);
        }

        if (!matchesDiscipline) return false;
      }

      // 4. Experience match
      if (selectedExperience && selectedExperience !== "All Experience") {
        const exp = (item.experienceLevel || "").toLowerCase();
        const years = (item.experienceYears || "").toLowerCase();
        const sel = selectedExperience.toLowerCase();

        let matchesExp = false;
        if (sel.includes("junior") || sel.includes("1-3")) {
          matchesExp = exp.includes("junior") || exp.includes("1-3") || years.includes("1") || years.includes("2") || years.includes("3");
        } else if (sel.includes("mid") || sel.includes("3-5")) {
          matchesExp = exp.includes("mid") || exp.includes("3-5") || years.includes("3") || years.includes("4") || years.includes("5");
        } else if (sel.includes("senior") || sel.includes("5-8")) {
          matchesExp = exp.includes("senior") || exp.includes("5-8") || years.includes("5") || years.includes("6") || years.includes("7") || years.includes("8");
        } else if (sel.includes("lead") || sel.includes("staff") || sel.includes("8+")) {
          matchesExp = exp.includes("lead") || exp.includes("staff") || exp.includes("8+") || years.includes("8") || years.includes("9") || years.includes("10");
        } else if (sel.includes("expert") || sel.includes("10+")) {
          matchesExp = exp.includes("expert") || exp.includes("10+") || years.includes("10") || years.includes("12") || years.includes("15");
        } else {
          matchesExp = exp.includes(sel) || years.includes(sel);
        }

        if (!matchesExp) return false;
      }

      // 5. Availability match
      if (selectedAvailability && selectedAvailability !== "All Availability") {
        const avail = (item.availability || "").toLowerCase();
        const sel = selectedAvailability.toLowerCase();

        let matchesAvail = false;
        if (sel.includes("immediate")) {
          matchesAvail = avail.includes("immediate");
        } else if (sel.includes("notice") || sel.includes("2 week")) {
          matchesAvail = avail.includes("notice") || avail.includes("week");
        } else if (sel.includes("part-time") || sel.includes("contract")) {
          matchesAvail = avail.includes("part-time") || avail.includes("contract") || avail.includes("freelance");
        } else {
          matchesAvail = avail.includes(sel);
        }

        if (!matchesAvail) return false;
      }

      return true;
    });
  }, [talent, searchTerm, selectedLocation, selectedDiscipline, selectedExperience, selectedAvailability]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedDiscipline("");
    setSelectedExperience("");
    setSelectedAvailability("");
    setOpenDropdown(null);
  };

  const hasActiveFilters = Boolean(
    searchTerm ||
    selectedLocation ||
    selectedDiscipline ||
    selectedExperience ||
    selectedAvailability
  );

  const handleDiscoverAll = () => {
    resetFilters();
    const el = document.getElementById("talent-results");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setFeedbackMessage(
      hasActiveFilters
        ? `Filters cleared. Showing all ${talent.length} vetted profiles.`
        : `Showing all ${talent.length} vetted profiles.`
    );
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <AppHeader activeTab="talent">
        {/* Mobile Sticky Search Bar (Pattern 1: Unified compact bar with inline Filters button) */}
        <div className="block md:hidden">
          <div className="bg-white rounded-none border border-zinc-200/90 shadow-2xs flex items-center gap-2 p-1.5 pl-3">
            <MagnifyingGlass size={17} weight="bold" className="text-zinc-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate, role or skill ..."
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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-[12px] font-bold border transition-all cursor-pointer shrink-0 select-none ${
                activeFiltersCount > 0
                  ? "bg-[#FDF2EE] border-[#E7040D] text-[#E7040D]"
                  : "bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100"
              }`}
              aria-label="Open talent filters"
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
        <div ref={searchBarRef} className="hidden md:flex flex-row items-stretch bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative z-40">

          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-200/80">
            <MagnifyingGlass size={18} weight="bold" className="text-zinc-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by candidate, role or skill ..."
              className="w-full bg-transparent text-[16px] sm:text-[13.5px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="p-2 -mr-2 text-zinc-400 hover:text-zinc-700 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Clear search query"
              >
                <X size={15} weight="bold" />
              </button>
            )}
          </div>

          <div className="relative border-b md:border-b-0 md:border-r border-zinc-200/80 shrink-0">
            <button type="button" onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")} className="w-full h-full flex items-center gap-2 px-4 py-3 text-[13px] font-bold text-zinc-900 hover:bg-zinc-50 cursor-pointer">
              <MapPin size={16} weight="bold" className="text-zinc-400 shrink-0" />
              <span>{selectedLocation || "Add location"}</span>
              {selectedLocation && (
                <span onClick={(e) => { e.stopPropagation(); setSelectedLocation(""); }} className="text-zinc-400 hover:text-zinc-700 ml-1">
                  <X size={13} weight="bold" />
                </span>
              )}
            </button>
            {openDropdown === "location" && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-zinc-200/90 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {LOCATIONS.map((loc) => (
                  <button key={loc} onClick={() => { setSelectedLocation(loc === "All Locations" ? "" : loc); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black flex items-center justify-between cursor-pointer">
                    <span>{loc}</span>
                    {(selectedLocation === loc || (!selectedLocation && loc === "All Locations")) && <Check size={14} weight="bold" className="text-[#E7040D]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 md:flex md:items-center divide-x divide-zinc-200/80 border-b md:border-b-0 shrink-0">
            {[
              { key: "discipline", label: "Discipline", value: selectedDiscipline, set: setSelectedDiscipline, options: DISCIPLINES, allValue: "All Disciplines" },
              { key: "experience", label: "Experience", value: selectedExperience, set: setSelectedExperience, options: EXPERIENCES, allValue: "All Experience" },
              { key: "availability", label: "Availability", value: selectedAvailability, set: setSelectedAvailability, options: AVAILABILITIES, allValue: "All Availability" },
            ].map(({ key, label, value, set, options, allValue }, idx) => (
              <div key={key} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === (key as any) ? null : (key as any))}
                  className={`w-full h-full px-3 sm:px-4 py-3 flex items-center justify-between md:justify-start gap-2 text-[12.5px] sm:text-[13px] font-semibold transition-colors cursor-pointer select-none whitespace-nowrap ${
                    value ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50"
                  }`}
                >
                  <span className="max-w-[85px] sm:max-w-[120px] truncate">{value || label}</span>
                  {value ? (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        set("");
                      }}
                      className="text-zinc-400 hover:text-[#E7040D] p-0.5 cursor-pointer transition-colors"
                      aria-label={`Clear ${label}`}
                    >
                      <X size={12} weight="bold" />
                    </span>
                  ) : (
                    <CaretDown
                      size={13}
                      weight="bold"
                      className={`text-zinc-400 shrink-0 transition-transform ${
                        openDropdown === key ? "rotate-180 text-zinc-900" : ""
                      }`}
                    />
                  )}
                </button>
                {openDropdown === key && (
                  <div
                    className={`absolute top-full mt-1 w-56 sm:w-60 bg-white border border-zinc-200/90 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 ${
                      idx === 2
                        ? "right-0 left-auto"
                        : idx === 1
                        ? "left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0"
                        : "left-0"
                    }`}
                  >
                    {options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          set(opt === allValue ? "" : opt);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black flex items-center justify-between cursor-pointer"
                      >
                        <span>{opt}</span>
                        {(value === opt || (!value && opt === allValue)) && (
                          <Check size={14} weight="bold" className="text-[#E7040D]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setOpenDropdown(null);
              const el = document.getElementById("talent-results");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all cursor-pointer shrink-0"
          >
            <MagnifyingGlass size={16} weight="bold" />
            <span>Search</span>
          </button>
        </div>
      </AppHeader>

      <main id="talent-results" className="flex-1 w-full max-w-[1360px] mx-auto py-8 px-6 sm:px-8 lg:px-10 space-y-10">
        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200/80 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <h1 className="text-[24px] sm:text-[30px] font-black text-[#1F1F1F] tracking-tight min-w-0">
                Vetted talent to explore
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[11px] font-bold border border-zinc-200/70">
                {filteredTalent.length}
              </span>
            </div>
            <button
              type="button"
              onClick={handleDiscoverAll}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-none bg-white border border-zinc-200/90 text-[12.5px] font-bold text-[#1F1F1F] hover:bg-zinc-50 hover:border-[#E7040D] hover:text-[#E7040D] active:scale-95 transition-all duration-150 shadow-2xs cursor-pointer shrink-0 whitespace-nowrap"
              title="View all vetted talent"
            >
              <span>Discover all ({talent.length})</span>
              <CaretRight size={13} weight="bold" />
            </button>
          </div>

          {feedbackMessage && (
            <div className="mt-3.5 px-4 py-2.5 bg-[#FDF2EE] border border-[#fce8e0] text-[#E7040D] text-[12.5px] font-semibold flex items-center justify-between transition-all">
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
            {filteredTalent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[6px] border border-zinc-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden group min-h-[410px]"
              >
                {/* Top Cover Banner */}
                <Link href={`/talent/${item.slug}`} className="block relative h-[140px] w-full bg-[#E5E7EB] overflow-hidden shrink-0">
                  <Image
                    src={item.coverImage || "/images/trax-talent-cover-default.jpg"}
                    alt={item.name}
                    fill
                    sizes="320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    unoptimized
                  />
                  {item.availability && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs border border-white/20 px-2.5 py-0.5 rounded-full shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{item.availability}</span>
                      </span>
                    </div>
                  )}
                </Link>

                {/* Card Content Area */}
                <div className="px-6 pb-5 pt-0 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Overlapping Logo / Avatar Box */}
                    <Link href={`/talent/${item.slug}`} className="block -mt-10 mb-4 relative z-10">
                      <div className="w-[76px] h-[76px] rounded-[4px] bg-white p-1 border border-zinc-200 shadow-2xs overflow-hidden flex items-center justify-center group-hover:border-zinc-400 transition-colors">
                        <TalentSquareMark item={item} />
                      </div>
                    </Link>

                    {/* Talent Name */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <Link href={`/talent/${item.slug}`} className="min-w-0">
                        <h2 className="text-[18px] font-bold text-black group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight truncate">
                          {item.name}
                        </h2>
                      </Link>
                      <SealCheck size={16} weight="fill" className="text-[#E7040D] shrink-0" />
                    </div>

                    {/* 3-Row Vertical Metadata List */}
                    <div className="space-y-2 text-[13px] text-zinc-600">
                      <div className="flex items-center gap-2.5">
                        <Tag size={15} weight="bold" className="text-zinc-500 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin size={15} weight="bold" className="text-zinc-500 shrink-0" />
                        <span className="truncate">{item.location?.split("•")[0]?.split(",")?.slice(0, 2)?.join(",")?.trim() || "Nigeria"}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Users size={15} weight="bold" className="text-zinc-500 shrink-0" />
                        <span className="truncate">
                          {item.experienceYears ? `${item.experienceYears} experience` : item.experienceLevel || "Vetted Professional"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Area (Generous white space, pinned Hire button on bottom right) */}
                  <div className="pt-6 mt-auto flex items-center justify-between">
                    <div>
                      {item.rate ? (
                        <span className="text-[12px] font-bold text-[#E7040D]">
                          {item.rate}
                        </span>
                      ) : (
                        <Link
                          href={`/talent/${item.slug}`}
                          className="text-[12px] font-semibold text-zinc-500 hover:text-[#E7040D] transition-colors"
                        >
                          View profile →
                        </Link>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveHireTalent(item);
                      }}
                      className="ml-auto px-4 py-1.5 text-[12px] font-medium rounded-[4px] border border-zinc-300 bg-white text-zinc-800 hover:border-black hover:text-black transition-colors cursor-pointer select-none active:scale-95 shadow-2xs"
                    >
                      Hire Talent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTalent.length === 0 && (
            <div className="py-16 text-center text-zinc-500 bg-white border border-zinc-200 mt-6">
              <p className="text-[15px] font-bold text-zinc-900 mb-1">No talent matches these filters</p>
              <p className="text-[13px] text-zinc-500 mb-4">Try clearing one or more search filters.</p>
              <button onClick={resetFilters} className="px-4 py-2 bg-[#0C1222] text-white text-[12.5px] font-bold cursor-pointer">Reset all filters</button>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Filter Drawer (Pattern 1: Clean Slide-Over Sheet) */}
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
          className={`relative w-full max-w-[380px] h-full bg-white z-10 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out overscroll-contain ${
            mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Filter Vetted Talent"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-200/80 shrink-0 bg-white">
            <div className="flex items-center gap-2">
              <Faders size={18} weight="bold" className="text-[#E7040D]" />
              <h2 className="text-[17px] font-black text-[#1F1F1F] tracking-tight">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#E7040D] text-white text-[11px] font-extrabold">
                  {activeFiltersCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilterOptions}
                  className="text-[12px] font-bold text-[#E7040D] hover:underline cursor-pointer"
                >
                  Reset all
                </button>
              )}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-9 h-9 -mr-1.5 flex items-center justify-center text-zinc-600 hover:text-zinc-950 active:scale-95 transition-all cursor-pointer rounded-none border border-zinc-200"
                aria-label="Close filters"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
          </div>

          {/* Drawer Body - Scrollable Filters */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* 1. Location */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[12.5px] font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={15} weight="bold" className="text-zinc-500" />
                  <span>Location</span>
                </span>
                {selectedLocation && (
                  <button
                    type="button"
                    onClick={() => setSelectedLocation("")}
                    className="text-[11.5px] font-semibold text-zinc-400 hover:text-[#E7040D] cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LOCATIONS.map((loc) => {
                  const isSelected = selectedLocation === loc || (!selectedLocation && loc === "All Locations");
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSelectedLocation(loc === "All Locations" ? "" : loc)}
                      className={`px-3 py-1.5 rounded-none text-[12px] font-semibold border transition-all cursor-pointer select-none ${
                        isSelected
                          ? "bg-[#FDF2EE] border-[#E7040D] text-[#E7040D] font-bold shadow-2xs"
                          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {loc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Discipline */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[12.5px] font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag size={15} weight="bold" className="text-zinc-500" />
                  <span>Discipline</span>
                </span>
                {selectedDiscipline && (
                  <button
                    type="button"
                    onClick={() => setSelectedDiscipline("")}
                    className="text-[11.5px] font-semibold text-zinc-400 hover:text-[#E7040D] cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DISCIPLINES.map((disc) => {
                  const isSelected = selectedDiscipline === disc || (!selectedDiscipline && disc === "All Disciplines");
                  return (
                    <button
                      key={disc}
                      type="button"
                      onClick={() => setSelectedDiscipline(disc === "All Disciplines" ? "" : disc)}
                      className={`px-3 py-1.5 rounded-none text-[12px] font-semibold border transition-all cursor-pointer select-none text-left ${
                        isSelected
                          ? "bg-[#FDF2EE] border-[#E7040D] text-[#E7040D] font-bold shadow-2xs"
                          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {disc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Experience */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[12.5px] font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase size={15} weight="bold" className="text-zinc-500" />
                  <span>Experience Level</span>
                </span>
                {selectedExperience && (
                  <button
                    type="button"
                    onClick={() => setSelectedExperience("")}
                    className="text-[11.5px] font-semibold text-zinc-400 hover:text-[#E7040D] cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {EXPERIENCES.map((exp) => {
                  const isSelected = selectedExperience === exp || (!selectedExperience && exp === "All Experience");
                  return (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setSelectedExperience(exp === "All Experience" ? "" : exp)}
                      className={`px-3 py-1.5 rounded-none text-[12px] font-semibold border transition-all cursor-pointer select-none ${
                        isSelected
                          ? "bg-[#FDF2EE] border-[#E7040D] text-[#E7040D] font-bold shadow-2xs"
                          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {exp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Availability */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[12.5px] font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={15} weight="bold" className="text-zinc-500" />
                  <span>Availability</span>
                </span>
                {selectedAvailability && (
                  <button
                    type="button"
                    onClick={() => setSelectedAvailability("")}
                    className="text-[11.5px] font-semibold text-zinc-400 hover:text-[#E7040D] cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABILITIES.map((avail) => {
                  const isSelected = selectedAvailability === avail || (!selectedAvailability && avail === "All Availability");
                  return (
                    <button
                      key={avail}
                      type="button"
                      onClick={() => setSelectedAvailability(avail === "All Availability" ? "" : avail)}
                      className={`px-3 py-1.5 rounded-none text-[12px] font-semibold border transition-all cursor-pointer select-none ${
                        isSelected
                          ? "bg-[#FDF2EE] border-[#E7040D] text-[#E7040D] font-bold shadow-2xs"
                          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {avail}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Drawer Sticky Footer Action */}
          <div className="p-4 border-t border-zinc-200/80 bg-white shrink-0">
            <button
              type="button"
              onClick={() => {
                setMobileFiltersOpen(false);
                const el = document.getElementById("talent-results");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-full py-3 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.99] text-white text-[13.5px] font-bold rounded-none shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Show {filteredTalent.length} {filteredTalent.length === 1 ? "Profile" : "Profiles"}</span>
              <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <HireTalentModal talent={activeHireTalent as any} onClose={() => setActiveHireTalent(null)} />
    </div>
  );
}

export function TalentPageClient({ talent }: { talent: SanityTalentItem[] }) {
  return (
    <Suspense fallback={null}>
      <TalentPageInner talent={talent} />
    </Suspense>
  );
}
