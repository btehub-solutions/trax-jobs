"use client";

import { useState } from "react";
import {
  CaretDown,
  CaretUp,
  Briefcase,
  MapPin,
  Cardholder,
  Buildings,
  Check,
  X,
} from "@phosphor-icons/react";
import { JobFilterState, RoleCategory, ExperienceTier, ContractType, WorkplaceType } from "@/types";

interface JobsFilterSidebarProps {
  filters: JobFilterState;
  onChange: (filters: JobFilterState) => void;
  onReset: () => void;
  onOpenWizard: () => void;
}

const EXPERIENCE_OPTIONS = [
  "Entry-level/Graduate (0-1 years)",
  "Junior (1-3 years)",
  "Mid-level (3-5 years)",
  "Senior (5-10 years)",
  "Expert & leadership (10+ years)",
];

const CONTRACT_OPTIONS = [
  "Permanent",
  "Contract",
  "Internship",
  "Part-time",
];

export function JobsFilterSidebar({
  filters,
  onChange,
  onReset,
  onOpenWizard,
}: JobsFilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    role: true,
    experience: false,
    location: false,
    contract: false,
    company: false,
  });

  const [jobTitleInput, setJobTitleInput] = useState(filters.search || "");
  const [locationInput, setLocationInput] = useState(filters.locations[0] || "");

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyRole = () => {
    onChange({ ...filters, search: jobTitleInput.trim() });
  };

  const handleApplyLocation = () => {
    onChange({ ...filters, locations: locationInput.trim() ? [locationInput.trim()] : [] });
  };

  const toggleExperience = (option: string) => {
    const isSelected = filters.experienceLevels.some((e) => e.includes(option.slice(0, 5)));
    if (isSelected) {
      onChange({
        ...filters,
        experienceLevels: filters.experienceLevels.filter((e) => !e.includes(option.slice(0, 5))),
      });
    } else {
      onChange({
        ...filters,
        experienceLevels: [...filters.experienceLevels, option as ExperienceTier],
      });
    }
  };

  return (
    <aside className="w-full lg:w-[395px] shrink-0 sticky top-20">
      {/* 90-Degree Square Edge Filter Card Container with Trax Brand Palette */}
      <div className="bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 max-h-[calc(100vh-120px)] flex flex-col justify-between">
        
        {/* Pinned Top Header: "Filter" */}
        <div className="text-center pb-3 border-b border-zinc-100 shrink-0">
          <h2 className="text-[13.5px] font-bold text-[#1F1F1F]">Filter</h2>
        </div>

        {/* Scrollable Middle Body Area */}
        <div className="flex-1 overflow-y-auto py-3 pr-1.5 space-y-5 custom-scrollbar">
          
          {/* 1. "Your Preferences" Dark Container (Using Trax Footer Color #0C1222) */}
          <div className="bg-[#0C1222] rounded-none p-4 space-y-2.5 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-[13.5px] font-bold text-white tracking-tight">
                Your preferences
              </h3>
            </div>

            {/* Auto-Width Left-Aligned Preference Chips */}
            <div className="flex flex-col items-start gap-1.5">
              {/* Search / Role Chip */}
              {filters.search ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-white text-[12px] font-semibold text-[#1F1F1F] shadow-2xs">
                  <Briefcase size={13} weight="bold" className="text-zinc-600 shrink-0" />
                  <span>{filters.search}</span>
                  <button
                    onClick={() => {
                      setJobTitleInput("");
                      onChange({ ...filters, search: "" });
                    }}
                    className="text-zinc-400 hover:text-[#E7040D] ml-1 cursor-pointer transition-colors"
                  >
                    <X size={11} weight="bold" />
                  </button>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-white text-[12px] font-semibold text-[#1F1F1F] shadow-2xs">
                  <Briefcase size={13} weight="bold" className="text-zinc-600 shrink-0" />
                  <span>AI/ML Engineer</span>
                </div>
              )}

              {/* Experience Level Chip */}
              {filters.experienceLevels.length > 0 ? (
                filters.experienceLevels.map((e) => (
                  <div
                    key={e}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-white text-[12px] font-semibold text-[#1F1F1F] shadow-2xs"
                  >
                    <Briefcase size={13} weight="bold" className="text-zinc-600 shrink-0" />
                    <span>{e.split(".")[0]}</span>
                    <button
                      onClick={() => {
                        const experienceLevels = filters.experienceLevels.filter((lvl) => lvl !== e);
                        onChange({ ...filters, experienceLevels });
                      }}
                      className="text-zinc-400 hover:text-[#E7040D] ml-1 cursor-pointer transition-colors"
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-white text-[12px] font-semibold text-[#1F1F1F] shadow-2xs">
                  <Briefcase size={13} weight="bold" className="text-zinc-600 shrink-0" />
                  <span>Junior (1-3 years)</span>
                </div>
              )}

              {/* Location Chip */}
              {filters.locations.length > 0 ? (
                filters.locations.map((loc) => (
                  <div
                    key={loc}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-white text-[12px] font-semibold text-[#1F1F1F] shadow-2xs"
                  >
                    <MapPin size={13} weight="bold" className="text-zinc-600 shrink-0" />
                    <span>{loc}</span>
                    <button
                      onClick={() => {
                        const locations = filters.locations.filter((l) => l !== loc);
                        setLocationInput("");
                        onChange({ ...filters, locations });
                      }}
                      className="text-zinc-400 hover:text-[#E7040D] ml-1 cursor-pointer transition-colors"
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-white text-[12px] font-semibold text-[#1F1F1F] shadow-2xs">
                  <MapPin size={13} weight="bold" className="text-zinc-600 shrink-0" />
                  <span>LAGOS</span>
                </div>
              )}
            </div>
          </div>

          {/* 2. "Edit preferences" Section */}
          <div className="space-y-3.5 pt-1">
            <h4 className="text-[13.5px] font-bold text-[#1F1F1F]">
              Edit preferences
            </h4>

            {/* Accordion Item: Role */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                onClick={() => toggleSection("role")}
                className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Briefcase size={15} weight="bold" className="text-zinc-700" />
                  <span>Role</span>
                </div>
                {openSections.role ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
              </button>

              {openSections.role && (
                <div className="mt-2.5 space-y-1.5">
                  <label className="text-[12px] font-bold text-[#1F1F1F] block">
                    Job titles
                  </label>
                  <input
                    type="text"
                    value={jobTitleInput}
                    onChange={(e) => setJobTitleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleApplyRole();
                    }}
                    placeholder="AI/ML Engineer"
                    className="w-full h-10 px-3.5 rounded-none bg-white border border-zinc-200 text-[13px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#E7040D] transition-all shadow-2xs"
                  />
                  <p className="text-[11.5px] text-zinc-500 leading-snug">
                    We&apos;ll also suggest similar positions.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion Item: Experience Level */}
            <div className="border-b border-zinc-100 pb-3">
              <button
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
                  {EXPERIENCE_OPTIONS.map((exp) => {
                    const isSelected = filters.experienceLevels.some((e) =>
                      e.toLowerCase().includes(exp.slice(0, 5).toLowerCase())
                    );
                    return (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => toggleExperience(exp)}
                        className={`w-full text-left px-3 py-2 rounded-none text-[12px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-[#E7040D] text-white shadow-xs font-bold"
                            : "bg-[#F9F9FB] hover:bg-[#F0F0F3] text-[#1F1F1F] border border-zinc-200/50"
                        }`}
                      >
                        <span className="truncate">{exp}</span>
                        {isSelected && <Check size={12} weight="bold" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accordion Item: Location */}
            <div className="border-b border-zinc-100 pb-3">
              <button
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
                <div className="mt-2.5 space-y-1.5">
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleApplyLocation();
                    }}
                    placeholder="e.g. Lagos, Ogun, Remote..."
                    className="w-full h-10 px-3.5 rounded-none bg-white border border-zinc-200 text-[13px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#E7040D] transition-all shadow-2xs"
                  />
                </div>
              )}
            </div>

            {/* Accordion Item: Contract and Salary */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                onClick={() => toggleSection("contract")}
                className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Cardholder size={15} weight="bold" className="text-zinc-700" />
                  <span>Contract and salary</span>
                </div>
                {openSections.contract ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
              </button>

              {openSections.contract && (
                <div className="mt-2 space-y-1">
                  {CONTRACT_OPTIONS.map((c) => {
                    const isChecked = filters.contractTypes.includes(c as ContractType);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          const contractTypes = isChecked
                            ? filters.contractTypes.filter((ct) => ct !== c)
                            : [...filters.contractTypes, c as ContractType];
                          onChange({ ...filters, contractTypes });
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-none text-[12px] font-medium flex items-center justify-between cursor-pointer ${
                          isChecked ? "bg-[#fce8e0] text-[#E7040D] font-bold" : "text-[#1F1F1F] hover:bg-zinc-50"
                        }`}
                      >
                        <span>{c}</span>
                        {isChecked && <Check size={12} weight="bold" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accordion Item: Company and Culture */}
            <div className="pb-1">
              <button
                onClick={() => toggleSection("company")}
                className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Buildings size={15} weight="bold" className="text-zinc-700" />
                  <span>Company and culture</span>
                </div>
                {openSections.company ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
              </button>

              {openSections.company && (
                <div className="mt-2 text-[12px] text-zinc-500 leading-relaxed py-1">
                  Filter verified African tech ecosystems, fintechs, and startup stages.
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Pinned Bottom "Save" Button Container */}
        <div className="pt-3 border-t border-zinc-100 shrink-0">
          <button
            onClick={() => {
              handleApplyRole();
              handleApplyLocation();
            }}
            className="w-full py-2.5 rounded-none bg-[#0C1222] hover:bg-[#070b14] text-white text-[13px] font-bold shadow-2xs transition-all cursor-pointer text-center"
          >
            Save
          </button>
        </div>

      </div>
    </aside>
  );
}
