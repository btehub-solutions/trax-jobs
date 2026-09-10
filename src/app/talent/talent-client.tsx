"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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
  return (
    <div className="w-16 h-16 rounded-none bg-white border border-zinc-200/90 shadow-xs flex items-center justify-center overflow-hidden relative">
      {!imageError && item.avatar ? (
        <Image src={item.avatar} alt={item.name} width={64} height={64} className="w-full h-full object-cover object-top" onError={() => setImageError(true)} unoptimized />
      ) : (
        <div className="w-full h-full bg-[#1F1F1F] text-white font-bold flex items-center justify-center text-base">
          {item.name.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}

export function TalentPageClient({ talent }: { talent: SanityTalentItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");
  const [activeHireTalent, setActiveHireTalent] = useState<SanityTalentItem | null>(null);
  const [openDropdown, setOpenDropdown] = useState<"location" | "discipline" | "experience" | "availability" | null>(null);
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <AppHeader activeTab="talent">
        <div ref={searchBarRef} className="bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-stretch relative z-40">

          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-200/80">
            <MagnifyingGlass size={18} weight="bold" className="text-zinc-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by candidate, role or skill ..."
              className="w-full bg-transparent text-[13.5px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X size={14} weight="bold" />
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

          <div className="flex items-center divide-x divide-zinc-200/80 overflow-x-auto no-scrollbar max-w-full border-b md:border-b-0 shrink-0">
            {[
              { key: "discipline", label: "Discipline", value: selectedDiscipline, set: setSelectedDiscipline, options: DISCIPLINES, allValue: "All Disciplines" },
              { key: "experience", label: "Experience", value: selectedExperience, set: setSelectedExperience, options: EXPERIENCES, allValue: "All Experience" },
              { key: "availability", label: "Availability", value: selectedAvailability, set: setSelectedAvailability, options: AVAILABILITIES, allValue: "All Availability" },
            ].map(({ key, label, value, set, options, allValue }) => (
              <div key={key} className="relative shrink-0">
                <button type="button" onClick={() => setOpenDropdown(openDropdown === key as any ? null : key as any)} className={`px-4 py-3 flex items-center gap-2 text-[13px] font-semibold transition-colors cursor-pointer select-none whitespace-nowrap ${value ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950"}`}>
                  <span className="max-w-[120px] truncate">{value || label}</span>
                  <CaretDown size={13} weight="bold" className="text-zinc-400 shrink-0" />
                </button>
                {openDropdown === key && (
                  <div className="absolute top-full left-0 sm:left-0 right-auto mt-1 w-60 max-w-[calc(100vw-2rem)] bg-white border border-zinc-200/90 shadow-xl py-1 z-50">
                    {options.map((opt) => (
                      <button key={opt} onClick={() => { set(opt === allValue ? "" : opt); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black flex items-center justify-between cursor-pointer">
                        <span>{opt}</span>
                        {(value === opt || (!value && opt === allValue)) && <Check size={14} weight="bold" className="text-[#E7040D]" />}
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
            <h1 className="text-[24px] sm:text-[30px] font-black text-[#1F1F1F] tracking-tight min-w-0">Vetted talent to explore</h1>
            <button onClick={resetFilters} className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-none bg-white border border-zinc-200/90 text-[12.5px] font-bold text-[#1F1F1F] hover:bg-zinc-50 active:scale-95 transition-all duration-150 shadow-2xs cursor-pointer shrink-0 whitespace-nowrap">
              <span>Discover all</span>
              <CaretRight size={13} weight="bold" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {filteredTalent.map((item) => (
              <div key={item.id} className="bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_-6px_rgba(231,4,13,0.08)] hover:border-[#E7040D]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                <div className="relative h-32 w-full bg-[#E5E7EB] overflow-hidden">
                  {item.coverImage && (
                    <Image src={item.coverImage} alt="" fill sizes="320px" className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" unoptimized />
                  )}
                </div>

                <div className="p-5 pt-0 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/talent/${item.slug}`} className="block -mt-8 mb-3.5 relative z-10">
                      <TalentSquareMark item={item} />
                    </Link>

                    <div className="flex items-center gap-1.5 mb-2">
                      <Link href={`/talent/${item.slug}`}>
                        <h2 className="text-[17px] font-black text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight">{item.name}</h2>
                      </Link>
                      <SealCheck size={15} weight="fill" className="text-[#E7040D] shrink-0" />
                    </div>

                    <div className="space-y-1.5 text-[12.5px] text-zinc-600">
                      <div className="flex items-center gap-2">
                        <Tag size={14} weight="bold" className="text-zinc-400 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} weight="bold" className="text-zinc-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} weight="bold" className="text-zinc-400 shrink-0" />
                        <span className="truncate flex items-center gap-1.5">
                          <span>{item.experienceYears} • {item.availability}</span>
                          {item.availability?.toLowerCase().includes("immediately") && (
                            <span className="inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" title="Available now" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link href={`/talent/${item.slug}`} className="block w-full py-2 rounded-none text-[12.5px] font-bold border border-zinc-200 bg-white hover:bg-[#E7040D] hover:text-white hover:border-[#E7040D] text-[#1F1F1F] shadow-2xs hover:shadow-[0_4px_14px_-2px_rgba(231,4,13,0.35)] active:scale-[0.98] transition-all duration-150 cursor-pointer text-center group-hover:border-[#E7040D] whitespace-nowrap">
                      Hire Talent
                    </Link>
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

      <HireTalentModal talent={activeHireTalent as any} onClose={() => setActiveHireTalent(null)} />
    </div>
  );
}
