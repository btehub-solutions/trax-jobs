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
  CaretUp,
  ArrowClockwise,
} from "@phosphor-icons/react";
import { AppHeader } from "@/components/navigation/app-header";
import { formatTalentExperience } from "@/lib/utils";

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
const LOCATIONS = ["All Locations", "Nigeria", "Lagos, Nigeria", "Abuja, Nigeria", "Abeokuta, Ogun State", "Ibadan, Nigeria", "Nairobi, Kenya", "Accra, Ghana", "Kigali, Rwanda", "Cape Town, South Africa", "Remote Africa"];

function TalentSquareMark({ item }: { item: SanityTalentItem }) {
  const [imageError, setImageError] = useState(false);
  if (!imageError && item.avatar) {
    return (
      <Image
        src={item.avatar}
        alt={item.name}
        width={72}
        height={72}
        className="w-full h-full object-cover object-top rounded-lg"
        onError={() => setImageError(true)}
        unoptimized
      />
    );
  }
  return (
    <div className="w-full h-full bg-[#1F1F1F] text-white font-bold flex items-center justify-center text-lg rounded-lg">
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

  const [openSections, setOpenSections] = useState({
    discipline: true,
    experience: true,
    availability: false,
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
    if (selectedDiscipline && selectedDiscipline !== "All Disciplines") count++;
    if (selectedExperience && selectedExperience !== "All Experience") count++;
    if (selectedAvailability && selectedAvailability !== "All Availability") count++;
    return count;
  }, [searchTerm, selectedLocation, selectedDiscipline, selectedExperience, selectedAvailability]);

  const resetFilterOptions = () => {
    setSearchTerm("");
    setKeywordInput("");
    setSelectedLocation("");
    setLocationInput("");
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
          <div className="bg-white rounded-lg border border-zinc-200/90 shadow-2xs flex items-center gap-2 p-1.5 pl-3">
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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold border transition-all cursor-pointer shrink-0 select-none ${
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
        <div ref={searchBarRef} className="hidden md:flex flex-row items-stretch bg-white rounded-lg border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative z-40 overflow-hidden">

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
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-zinc-200/90 rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
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
                    className={`absolute top-full mt-1 w-56 sm:w-60 bg-white border border-zinc-200/90 rounded-lg shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 ${
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
              <h1 className="text-[24px] sm:text-[30px] font-black text-[#1F1F1F] tracking-[-0.02em] min-w-0">
                Vetted talent to explore
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[11px] font-bold border border-zinc-200/70 rounded-lg">
                {filteredTalent.length}
              </span>
            </div>
            <button
              type="button"
              onClick={handleDiscoverAll}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg bg-white border border-zinc-200/90 text-[12.5px] font-bold text-[#1F1F1F] hover:bg-zinc-50 hover:border-[#E7040D] hover:text-[#E7040D] active:scale-95 transition-all duration-150 shadow-2xs cursor-pointer shrink-0 whitespace-nowrap"
              title="View all vetted talent"
            >
              <span>Discover all ({talent.length})</span>
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
            {filteredTalent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-zinc-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden group min-h-[410px] w-full max-w-[320px] mx-auto sm:max-w-none"
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
                </Link>

                {/* Card Content Area */}
                <div className="px-6 pb-5 pt-0 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Overlapping Logo / Avatar Box */}
                    <Link href={`/talent/${item.slug}`} className="block -mt-10 mb-4 relative z-10">
                      <div className="w-[76px] h-[76px] rounded-lg bg-white p-1 border border-zinc-200 shadow-2xs overflow-hidden flex items-center justify-center group-hover:border-zinc-400 transition-colors">
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
                          {formatTalentExperience(item.experienceYears, item.experienceLevel)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Area: Direct link to talent profile */}
                  <div className="pt-6 mt-auto">
                    <Link
                      href={`/talent/${item.slug}`}
                      className="block w-full py-2 rounded-lg text-[12.5px] font-bold border border-zinc-200 bg-white hover:bg-[#E7040D] hover:text-white hover:border-[#E7040D] text-[#1F1F1F] shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all duration-150 cursor-pointer text-center group-hover:border-[#E7040D] whitespace-nowrap"
                    >
                      Hire Talent
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTalent.length === 0 && (
            <div className="py-20 px-4 text-center flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 bg-[#A7F3D0] rounded-sm p-4 shadow-[12px_18px_32px_-6px_rgba(5,150,105,0.22)] transform -rotate-2 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between select-none">
                <div className="absolute top-0 left-0 right-0 h-4 bg-black/5 pointer-events-none" />
                <div className="w-full h-full border border-emerald-500/40 rounded-sm p-2 flex flex-col items-center justify-center">
                  <svg viewBox="0 0 100 100" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20 opacity-85">
                    {/* Talent Profile Card / Verified Professional Badge */}
                    <rect x="20" y="20" width="60" height="65" rx="3" />
                    {/* User Avatar Circle */}
                    <circle cx="50" cy="42" r="12" />
                    {/* Shoulders */}
                    <path d="M34 64c0-8.837 7.163-12 16-12s16 3.163 16 12" />
                    {/* Verified Badge Checkmark */}
                    <circle cx="68" cy="30" r="7" fill="#047857" stroke="none" />
                    <path d="M65 30l2 2 4-4" stroke="white" strokeWidth="1.8" />
                    {/* Skills/Meta lines */}
                    <path d="M35 73h30" strokeWidth="2" />
                    <path d="M42 79h16" strokeWidth="2" />
                    {/* Decorative Sparkles */}
                    <path d="M14 26l3 3M17 26l-3 3" strokeWidth="1.5" />
                    <path d="M84 55l3 3M87 55l-3 3" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
              <h3 className="text-[24px] sm:text-[26px] font-black text-zinc-950 mt-10 mb-2 tracking-tight">No talent in sight</h3>
              <p className="text-[14.5px] sm:text-[15.5px] text-zinc-600 leading-relaxed max-w-md">No vetted professionals match these filters right now.</p>
              <p className="text-[14.5px] sm:text-[15.5px] text-zinc-600 leading-relaxed max-w-md mt-0.5">Try clearing one or more filters to explore available talent.</p>
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
          aria-label="Filter Vetted Talent"
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
                      <Briefcase size={12} weight="bold" className="text-[#E7040D] shrink-0" />
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

                  {selectedDiscipline && selectedDiscipline !== "All Disciplines" && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-white/20 text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs">
                      <span>{selectedDiscipline}</span>
                      <button
                        onClick={() => setSelectedDiscipline("")}
                        className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer transition-colors"
                        aria-label="Remove discipline filter"
                      >
                        <X size={11} weight="bold" />
                      </button>
                    </div>
                  )}

                  {selectedExperience && selectedExperience !== "All Experience" && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-white/20 text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs">
                      <span>{selectedExperience.split(" ")[0]}</span>
                      <button
                        onClick={() => setSelectedExperience("")}
                        className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer transition-colors"
                        aria-label="Remove experience filter"
                      >
                        <X size={11} weight="bold" />
                      </button>
                    </div>
                  )}

                  {selectedAvailability && selectedAvailability !== "All Availability" && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-white/20 text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs">
                      <Clock size={12} weight="bold" className="text-[#E7040D] shrink-0" />
                      <span>{selectedAvailability}</span>
                      <button
                        onClick={() => setSelectedAvailability("")}
                        className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer transition-colors"
                        aria-label="Remove availability filter"
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

              {/* Accordion Item: Role & Title */}
              <div className="border-b border-zinc-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleSection("discipline")}
                  className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase size={15} weight="bold" className="text-zinc-700" />
                    <span>Role & Title</span>
                  </div>
                  {openSections.discipline ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                </button>

                {openSections.discipline && (
                  <div className="mt-2.5 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleApplyKeyword();
                        }}
                        placeholder="e.g. AI Engineer, Product..."
                        className="flex-1 h-9 px-3 rounded-lg bg-white border border-zinc-200 text-[13px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#E7040D] transition-all shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={handleApplyKeyword}
                        className="h-9 px-3.5 rounded-lg bg-[#E7040D] hover:bg-[#CB030B] active:scale-95 text-white text-[12px] font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {DISCIPLINES.filter((d) => d !== "All Disciplines").map((disc) => {
                        const isSelected = selectedDiscipline === disc;
                        return (
                          <button
                            key={disc}
                            type="button"
                            onClick={() => setSelectedDiscipline(isSelected ? "" : disc)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#fce8e0] text-[#E7040D] border-[#E7040D] font-bold"
                                : "bg-[#FAFAFA] text-zinc-600 border-zinc-200 hover:border-zinc-300"
                            }`}
                          >
                            {disc}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion Item: Experience Level */}
              <div className="border-b border-zinc-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleSection("experience")}
                  className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase size={15} weight="bold" className="text-zinc-700" />
                    <span>Experience level</span>
                  </div>
                  {openSections.experience ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                </button>

                {openSections.experience && (
                  <div className="mt-2 space-y-1.5">
                    {EXPERIENCES.filter((exp) => exp !== "All Experience").map((exp) => {
                      const isSelected = selectedExperience === exp;
                      return (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setSelectedExperience(isSelected ? "" : exp)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-[#fce8e0] text-[#E7040D] border border-[#E7040D] font-bold"
                              : "bg-[#F9F9FB] hover:bg-[#F0F0F3] text-[#1F1F1F] border border-zinc-200/50"
                          }`}
                        >
                          <span className="truncate">{exp}</span>
                          {isSelected && <Check size={12} weight="bold" className="text-[#E7040D]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion Item: Availability */}
              <div className="border-b border-zinc-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleSection("availability")}
                  className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Clock size={15} weight="bold" className="text-zinc-700" />
                    <span>Availability</span>
                  </div>
                  {openSections.availability ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                </button>

                {openSections.availability && (
                  <div className="mt-2 space-y-1.5">
                    {AVAILABILITIES.filter((avail) => avail !== "All Availability").map((avail) => {
                      const isSelected = selectedAvailability === avail;
                      return (
                        <button
                          key={avail}
                          type="button"
                          onClick={() => setSelectedAvailability(isSelected ? "" : avail)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-[#fce8e0] text-[#E7040D] border border-[#E7040D] font-bold"
                            : "bg-[#F9F9FB] hover:bg-[#F0F0F3] text-[#1F1F1F] border border-zinc-200/50"
                          }`}
                        >
                          <span className="truncate">{avail}</span>
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
                        className="h-9 px-3.5 rounded-lg bg-[#E7040D] hover:bg-[#CB030B] active:scale-95 text-white text-[12px] font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Lagos", "Abuja", "Ogun", "Remote"].map((loc) => {
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
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
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
                const el = document.getElementById("talent-results");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-full py-3 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.99] text-white text-[13.5px] font-bold rounded-lg shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Show {filteredTalent.length} {filteredTalent.length === 1 ? "Profile" : "Profiles"}</span>
            </button>
          </div>
        </div>
      </div>
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
