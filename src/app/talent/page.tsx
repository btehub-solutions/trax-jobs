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
  SealCheck,
  Check,
} from "@phosphor-icons/react";
import { SAMPLE_TALENT } from "@/data/talent";
import { TalentProfile } from "@/types";
import { AppHeader } from "@/components/navigation/app-header";
import { HireTalentModal } from "@/components/talent/hire-talent-modal";

const DISCIPLINES = [
  "All Disciplines",
  "Engineering",
  "Design",
  "Product",
  "Data & AI",
  "DevOps & Cloud",
];

const EXPERIENCES = [
  "All Experience",
  "Senior (5-8 yrs)",
  "Lead / Staff (8+ yrs)",
  "Mid-level (3-5 yrs)",
  "Expert (10+ yrs)",
];

const AVAILABILITIES = [
  "All Availability",
  "Available immediately",
  "2 weeks notice",
  "Part-time / Contract",
];

const LOCATIONS = [
  "All Locations",
  "Nigeria",
  "Lagos, Nigeria",
  "Abuja, Nigeria",
  "Abeokuta, Ogun State",
  "Nairobi, Kenya",
  "Accra, Ghana",
  "Kigali, Rwanda",
  "Cape Town, South Africa",
  "Remote Africa",
];

/* ─────────────────────────────────────────────────────────────
   Authentic Talent Square Portrait Mark
───────────────────────────────────────────────────────────── */
function TalentSquareMark({ talent }: { talent: TalentProfile }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-16 h-16 rounded-none bg-white border border-zinc-200/90 shadow-xs flex items-center justify-center overflow-hidden relative">
      {!imageError ? (
        <Image
          src={talent.avatar}
          alt={talent.name}
          width={64}
          height={64}
          className="w-full h-full object-cover object-top"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-[#1F1F1F] text-white font-bold flex items-center justify-center text-base">
          {talent.name.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}

function TalentPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("Nigeria");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");
  const [activeHireTalent, setActiveHireTalent] = useState<TalentProfile | null>(null);

  // Active Dropdown menu toggle
  const [openDropdown, setOpenDropdown] = useState<"location" | "discipline" | "experience" | "availability" | null>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
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
    return SAMPLE_TALENT.filter((item) => {
      // 1. Keyword search
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchBio = item.bio.toLowerCase().includes(q);
        const matchSkills = item.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchTitle && !matchBio && !matchSkills) return false;
      }
      // 2. Location
      if (selectedLocation && selectedLocation !== "All Locations") {
        const loc = selectedLocation.toLowerCase();
        const matchLoc = item.location.toLowerCase().includes(loc);
        const matchPref = item.workPreference.toLowerCase().includes(loc);
        if (selectedLocation === "Nigeria") {
          if (!matchLoc && !item.location.toLowerCase().includes("lagos") && !item.location.toLowerCase().includes("abuja") && !item.location.toLowerCase().includes("ogun")) {
            return false;
          }
        } else if (!matchLoc && !matchPref) {
          return false;
        }
      }
      // 3. Discipline
      if (selectedDiscipline && selectedDiscipline !== "All Disciplines") {
        if (item.category !== selectedDiscipline) return false;
      }
      // 4. Experience
      if (selectedExperience && selectedExperience !== "All Experience") {
        if (item.experienceLevel !== selectedExperience) return false;
      }
      // 5. Availability
      if (selectedAvailability && selectedAvailability !== "All Availability") {
        if (item.availability !== selectedAvailability) return false;
      }
      return true;
    });
  }, [searchTerm, selectedLocation, selectedDiscipline, selectedExperience, selectedAvailability]);

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
      {/* 1. Top Fixed/Sticky Header with Integrated Search Bar */}
      <AppHeader activeTab="talent">
        {/* Search Bar Widget (100% Matching Reference Screenshot with Working Dropdowns) */}
        <div 
          ref={searchBarRef}
          className="bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-stretch relative z-40"
        >
          
          {/* Main Keyword Input */}
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
              <button
                onClick={() => setSearchTerm("")}
                className="text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          {/* Location Dropdown Field */}
          <div className="relative border-b md:border-b-0 md:border-r border-zinc-200/80 shrink-0">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
              className="w-full h-full flex items-center gap-2 px-4 py-3 text-[13px] font-bold text-zinc-900 hover:bg-zinc-50 cursor-pointer"
            >
              <MapPin size={16} weight="bold" className="text-zinc-400 shrink-0" />
              <span>{selectedLocation || "Add location"}</span>
              {selectedLocation && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLocation("");
                  }}
                  className="text-zinc-400 hover:text-zinc-700 ml-1"
                >
                  <X size={13} weight="bold" />
                </span>
              )}
            </button>

            {/* Location Dropdown Menu */}
            {openDropdown === "location" && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-zinc-200/90 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc === "All Locations" ? "" : loc);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black flex items-center justify-between cursor-pointer"
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

          {/* Discipline, Experience, Availability Dropdown Filters */}
          <div className="flex items-center divide-x divide-zinc-200/80 shrink-0">
            
            {/* Discipline Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "discipline" ? null : "discipline")}
                className={`px-4 py-3 flex items-center gap-2 text-[13px] font-semibold transition-colors cursor-pointer ${
                  selectedDiscipline ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950"
                }`}
              >
                <span className="max-w-[120px] truncate">{selectedDiscipline || "Discipline"}</span>
                <CaretDown size={13} weight="bold" className="text-zinc-400 shrink-0" />
              </button>

              {openDropdown === "discipline" && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-zinc-200/90 shadow-xl py-1 z-50">
                  {DISCIPLINES.map((disc) => (
                    <button
                      key={disc}
                      onClick={() => {
                        setSelectedDiscipline(disc === "All Disciplines" ? "" : disc);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black flex items-center justify-between cursor-pointer"
                    >
                      <span>{disc}</span>
                      {(selectedDiscipline === disc || (!selectedDiscipline && disc === "All Disciplines")) && (
                        <Check size={14} weight="bold" className="text-[#E7040D]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Experience Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "experience" ? null : "experience")}
                className={`px-4 py-3 flex items-center gap-2 text-[13px] font-semibold transition-colors cursor-pointer ${
                  selectedExperience ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950"
                }`}
              >
                <span className="max-w-[120px] truncate">{selectedExperience || "Experience"}</span>
                <CaretDown size={13} weight="bold" className="text-zinc-400 shrink-0" />
              </button>

              {openDropdown === "experience" && (
                <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-zinc-200/90 shadow-xl py-1 z-50">
                  {EXPERIENCES.map((exp) => (
                    <button
                      key={exp}
                      onClick={() => {
                        setSelectedExperience(exp === "All Experience" ? "" : exp);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black flex items-center justify-between cursor-pointer"
                    >
                      <span>{exp}</span>
                      {(selectedExperience === exp || (!selectedExperience && exp === "All Experience")) && (
                        <Check size={14} weight="bold" className="text-[#E7040D]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Availability Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "availability" ? null : "availability")}
                className={`px-4 py-3 flex items-center gap-2 text-[13px] font-semibold transition-colors cursor-pointer ${
                  selectedAvailability ? "text-[#E7040D] font-bold bg-red-50/50" : "text-zinc-700 hover:text-zinc-950"
                }`}
              >
                <span className="max-w-[120px] truncate">{selectedAvailability || "Availability"}</span>
                <CaretDown size={13} weight="bold" className="text-zinc-400 shrink-0" />
              </button>

              {openDropdown === "availability" && (
                <div className="absolute top-full right-0 mt-1 w-60 bg-white border border-zinc-200/90 shadow-xl py-1 z-50">
                  {AVAILABILITIES.map((avail) => (
                    <button
                      key={avail}
                      onClick={() => {
                        setSelectedAvailability(avail === "All Availability" ? "" : avail);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black flex items-center justify-between cursor-pointer"
                    >
                      <span>{avail}</span>
                      {(selectedAvailability === avail || (!selectedAvailability && avail === "All Availability")) && (
                        <Check size={14} weight="bold" className="text-[#E7040D]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Search Button (Using Trax Brand Primary Red #E7040D) */}
          <button
            onClick={() => setOpenDropdown(null)}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all cursor-pointer shrink-0"
          >
            <MagnifyingGlass size={16} weight="bold" />
            <span>Search</span>
          </button>

        </div>
      </AppHeader>

      {/* 2. Main Page Content */}
      <main className="flex-1 w-full max-w-[1360px] mx-auto py-8 px-6 sm:px-8 lg:px-10 space-y-10">
        {/* Section Header: "Vetted talent to explore" */}
        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200/80">
            <h1 className="text-[26px] sm:text-[30px] font-black text-[#1F1F1F] tracking-tight">
              Vetted talent to explore
            </h1>

            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-white border border-zinc-200/90 text-[12.5px] font-bold text-[#1F1F1F] hover:bg-zinc-50 transition-all shadow-2xs cursor-pointer"
            >
              <span>Discover all</span>
              <CaretRight size={13} weight="bold" />
            </button>
          </div>

          {/* 4-Column Talent Cards Grid (100% Matching Explore Companies Architecture) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {filteredTalent.map((talent) => {
              return (
                <div
                  key={talent.id}
                  className="bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-zinc-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  
                  {/* Top Cover Banner */}
                  <div className="relative h-32 w-full bg-[#E5E7EB] overflow-hidden">
                    {talent.coverImage && (
                      <Image
                        src={talent.coverImage}
                        alt=""
                        fill
                        sizes="320px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                    )}
                  </div>

                  {/* Body Content with Floating Square Portrait */}
                  <div className="p-5 pt-0 flex-1 flex flex-col justify-between">
                    
                    <div>
                      {/* Floating Square Avatar Badge */}
                      <Link href={`/talent/${talent.id}`} className="block -mt-8 mb-3.5 relative z-10">
                        <TalentSquareMark talent={talent} />
                      </Link>

                      {/* Candidate Name with Verified Mark */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <Link href={`/talent/${talent.id}`}>
                          <h2 className="text-[17px] font-black text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight">
                            {talent.name}
                          </h2>
                        </Link>
                        <SealCheck size={15} weight="fill" className="text-[#E7040D] shrink-0" />
                      </div>

                      {/* Metadata Rows (Identical Structure to Explore Companies) */}
                      <div className="space-y-1.5 text-[12.5px] text-zinc-600">
                        {/* Role / Discipline */}
                        <div className="flex items-center gap-2">
                          <Tag size={14} weight="bold" className="text-zinc-400 shrink-0" />
                          <span className="truncate">{talent.title}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2">
                          <MapPin size={14} weight="bold" className="text-zinc-400 shrink-0" />
                          <span className="truncate">{talent.location}</span>
                        </div>

                        {/* Experience & Availability */}
                        <div className="flex items-center gap-2">
                          <Users size={14} weight="bold" className="text-zinc-400 shrink-0" />
                          <span className="truncate">{talent.experienceYears} • {talent.availability}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom "Hire Talent" Action Button (Navigates to Talent Preview Page) */}
                    <div className="pt-6">
                      <Link
                        href={`/talent/${talent.id}`}
                        className="block w-full py-2 rounded-none text-[12.5px] font-bold border border-zinc-200 bg-white hover:bg-[#E7040D] hover:text-white hover:border-[#E7040D] text-[#1F1F1F] shadow-2xs transition-all cursor-pointer text-center group-hover:border-[#E7040D]"
                      >
                        Hire Talent
                      </Link>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {filteredTalent.length === 0 && (
            <div className="py-16 text-center text-zinc-500 bg-white border border-zinc-200 mt-6">
              <p className="text-[15px] font-bold text-zinc-900 mb-1">No talent matches these filters</p>
              <p className="text-[13px] text-zinc-500 mb-4">Try clearing one or more search filters.</p>
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

      {/* Direct Contact / Hire Modal */}
      <HireTalentModal
        talent={activeHireTalent}
        onClose={() => setActiveHireTalent(null)}
      />

    </div>
  );
}

export default function TalentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
      <TalentPageContent />
    </Suspense>
  );
}
