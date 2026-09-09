"use client";

import { useState, useEffect } from "react";
import {
  CaretDown,
  CaretUp,
  Briefcase,
  MapPin,
  Cardholder,
  House,
  Check,
  X,
  ArrowClockwise,
} from "@phosphor-icons/react";
import { JobFilterState, ExperienceTier, ContractType, WorkplaceType } from "@/types";

interface JobsFilterSidebarProps {
  filters: JobFilterState;
  onChange: (filters: JobFilterState) => void;
  onReset: () => void;
  onOpenWizard: () => void;
  totalMatches?: number;
}

const EXPERIENCE_OPTIONS = [
  "Entry-level (0-1 yrs)",
  "Junior (1-3 yrs)",
  "Mid-level (3-5 yrs)",
  "Senior (5-10 yrs)",
  "Expert (10+ yrs)",
];

const WORKPLACE_OPTIONS = ["Remote", "Hybrid", "On-site"];

const CONTRACT_OPTIONS = [
  "Permanent",
  "Contract",
  "Internship",
  "Part-time",
];

const QUICK_ROLES = ["Data & AI", "Engineering", "Design", "Product", "DevOps & Cloud"];
const QUICK_LOCATIONS = ["Lagos", "Abuja", "Ogun", "Remote"];

export function JobsFilterSidebar({
  filters,
  onChange,
  onReset,
  totalMatches,
}: JobsFilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    role: true,
    experience: true,
    workplace: false,
    location: true,
    contract: true,
  });

  const [jobTitleInput, setJobTitleInput] = useState(filters.search || "");
  const [locationInput, setLocationInput] = useState(filters.locations[0] || "");
  const [appliedFlash, setAppliedFlash] = useState(false);

  // Sync inputs if filters change externally (e.g. on reset)
  useEffect(() => {
    setJobTitleInput(filters.search || "");
    setLocationInput(filters.locations[0] || "");
  }, [filters.search, filters.locations]);

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyInputs = () => {
    setAppliedFlash(true);
    setTimeout(() => setAppliedFlash(false), 900);

    const nextLocations = locationInput.trim() ? [locationInput.trim()] : [];
    onChange({
      ...filters,
      search: jobTitleInput.trim(),
      locations: nextLocations,
    });

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      document.getElementById("jobs-results-heading")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetAll = () => {
    setJobTitleInput("");
    setLocationInput("");
    onReset();
  };

  const toggleExperience = (option: string) => {
    const key = option.split(" ")[0].toLowerCase(); // "entry-level", "junior", "mid-level", "senior", "expert"
    const isSelected = filters.experienceLevels.some((e) => e.toLowerCase().includes(key));
    if (isSelected) {
      onChange({
        ...filters,
        experienceLevels: filters.experienceLevels.filter((e) => !e.toLowerCase().includes(key)),
      });
    } else {
      onChange({
        ...filters,
        experienceLevels: [option as ExperienceTier],
      });
    }
  };

  const toggleRoleCategory = (category: string) => {
    const isSelected = filters.roles.includes(category);
    if (isSelected) {
      onChange({ ...filters, roles: filters.roles.filter((r) => r !== category) });
    } else {
      onChange({ ...filters, roles: [category] });
    }
  };

  const toggleWorkplace = (wp: string) => {
    const isSelected = filters.workplaceTypes.includes(wp as WorkplaceType);
    if (isSelected) {
      onChange({ ...filters, workplaceTypes: filters.workplaceTypes.filter((w) => w !== wp) });
    } else {
      onChange({ ...filters, workplaceTypes: [wp as WorkplaceType] });
    }
  };

  const toggleContract = (c: string) => {
    const isSelected = filters.contractTypes.includes(c as ContractType);
    if (isSelected) {
      onChange({ ...filters, contractTypes: filters.contractTypes.filter((ct) => ct !== c) });
    } else {
      onChange({ ...filters, contractTypes: [c as ContractType] });
    }
  };

  const hasActiveFilters =
    Boolean(filters.search) ||
    filters.roles.length > 0 ||
    filters.experienceLevels.length > 0 ||
    filters.locations.length > 0 ||
    filters.workplaceTypes.length > 0 ||
    filters.contractTypes.length > 0;

  return (
    <aside className="w-full lg:w-[395px] shrink-0 sticky top-20">
      <div className="bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 max-h-[calc(100vh-120px)] flex flex-col justify-between">
        {/* Pinned Top Header: "Filter" */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 shrink-0">
          <h2 className="text-[14px] font-bold text-[#1F1F1F]">Filters</h2>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetAll}
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#E7040D] hover:underline cursor-pointer"
            >
              <ArrowClockwise size={13} weight="bold" />
              <span>Reset all</span>
            </button>
          )}
        </div>

        {/* Scrollable Middle Body Area */}
        <div className="flex-1 overflow-y-auto py-3 pr-1.5 space-y-5 custom-scrollbar">
          {/* 1. "Your Preferences" Dark Container */}
          <div className="bg-[#0C1222] rounded-none p-4 space-y-2.5 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-[13.5px] font-bold text-white tracking-tight">
                Active preferences
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Active Preference Chips */}
            {hasActiveFilters ? (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {/* Search Term Chip */}
                {filters.search && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-white text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs">
                    <Briefcase size={12} weight="bold" className="text-zinc-600 shrink-0" />
                    <span className="truncate max-w-[120px]">{filters.search}</span>
                    <button
                      onClick={() => {
                        setJobTitleInput("");
                        onChange({ ...filters, search: "" });
                      }}
                      className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer"
                      aria-label="Remove search filter"
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </div>
                )}

                {/* Role Category Chips */}
                {filters.roles.map((r) => (
                  <div
                    key={r}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-white text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs"
                  >
                    <span>{r}</span>
                    <button
                      onClick={() => toggleRoleCategory(r)}
                      className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer"
                      aria-label={`Remove ${r} filter`}
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </div>
                ))}

                {/* Experience Level Chips */}
                {filters.experienceLevels.map((exp) => (
                  <div
                    key={exp}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-white text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs"
                  >
                    <span>{exp.split(".")[0]}</span>
                    <button
                      onClick={() => toggleExperience(exp)}
                      className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer"
                      aria-label={`Remove ${exp} filter`}
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </div>
                ))}

                {/* Workplace Type Chips */}
                {filters.workplaceTypes.map((wp) => (
                  <div
                    key={wp}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-white text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs"
                  >
                    <House size={12} weight="bold" className="text-zinc-600 shrink-0" />
                    <span>{wp}</span>
                    <button
                      onClick={() => toggleWorkplace(wp)}
                      className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer"
                      aria-label={`Remove ${wp} filter`}
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </div>
                ))}

                {/* Location Chips */}
                {filters.locations.map((loc) => (
                  <div
                    key={loc}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-white text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs"
                  >
                    <MapPin size={12} weight="bold" className="text-zinc-600 shrink-0" />
                    <span className="truncate max-w-[120px]">{loc}</span>
                    <button
                      onClick={() => {
                        const locations = filters.locations.filter((l) => l !== loc);
                        setLocationInput("");
                        onChange({ ...filters, locations });
                      }}
                      className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer"
                      aria-label={`Remove ${loc} filter`}
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </div>
                ))}

                {/* Contract Type Chips */}
                {filters.contractTypes.map((ct) => (
                  <div
                    key={ct}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-white text-[11.5px] font-semibold text-[#1F1F1F] shadow-2xs"
                  >
                    <Cardholder size={12} weight="bold" className="text-zinc-600 shrink-0" />
                    <span>{ct}</span>
                    <button
                      onClick={() => toggleContract(ct)}
                      className="text-zinc-400 hover:text-[#E7040D] ml-0.5 cursor-pointer"
                      aria-label={`Remove ${ct} filter`}
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[12px] text-zinc-400 leading-relaxed py-1">
                No filters applied. Select from the criteria below to filter open roles.
              </p>
            )}
          </div>

          {/* 2. "Edit preferences" Accordion List */}
          <div className="space-y-3.5 pt-1">
            <h4 className="text-[13.5px] font-bold text-[#1F1F1F]">
              Edit preferences
            </h4>

            {/* Accordion Item: Role & Keywords */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("role")}
                className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Briefcase size={15} weight="bold" className="text-zinc-700" />
                  <span>Role & Title</span>
                </div>
                {openSections.role ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
              </button>

              {openSections.role && (
                <div className="mt-2.5 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={jobTitleInput}
                      onChange={(e) => setJobTitleInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleApplyInputs();
                      }}
                      placeholder="e.g. AI Engineer, Product..."
                      className="flex-1 h-9 px-3 rounded-none bg-white border border-zinc-200 text-[13px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#E7040D] transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={handleApplyInputs}
                      className="h-9 px-3 bg-[#1F1F1F] hover:bg-[#E7040D] text-white text-[12px] font-bold transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Quick Category Buttons */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {QUICK_ROLES.map((role) => {
                      const isSelected = filters.roles.includes(role);
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => toggleRoleCategory(role)}
                          className={`px-2.5 py-1 text-[11px] font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#fce8e0] text-[#E7040D] border-[#E7040D] font-bold"
                              : "bg-[#FAFAFA] text-zinc-600 border-zinc-200 hover:border-zinc-300"
                          }`}
                        >
                          {role}
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
                  {EXPERIENCE_OPTIONS.map((exp) => {
                    const key = exp.split(" ")[0].toLowerCase();
                    const isSelected = filters.experienceLevels.some((e) =>
                      e.toLowerCase().includes(key)
                    );
                    return (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => toggleExperience(exp)}
                        className={`w-full text-left px-3 py-2 rounded-none text-[12px] font-medium transition-all flex items-center justify-between cursor-pointer ${
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

            {/* Accordion Item: Workplace Type */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("workplace")}
                className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <House size={15} weight="bold" className="text-zinc-700" />
                  <span>Workplace policy</span>
                </div>
                {openSections.workplace ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
              </button>

              {openSections.workplace && (
                <div className="mt-2 space-y-1.5">
                  {WORKPLACE_OPTIONS.map((wp) => {
                    const isSelected = filters.workplaceTypes.includes(wp as WorkplaceType);
                    return (
                      <button
                        key={wp}
                        type="button"
                        onClick={() => toggleWorkplace(wp)}
                        className={`w-full text-left px-3 py-2 rounded-none text-[12px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-[#fce8e0] text-[#E7040D] border border-[#E7040D] font-bold"
                            : "bg-[#F9F9FB] hover:bg-[#F0F0F3] text-[#1F1F1F] border border-zinc-200/50"
                        }`}
                      >
                        <span>{wp}</span>
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
                <div className="mt-2.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleApplyInputs();
                      }}
                      placeholder="e.g. Lagos, Ogun, Remote..."
                      className="flex-1 h-9 px-3 rounded-none bg-white border border-zinc-200 text-[13px] text-[#1F1F1F] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#E7040D] transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={handleApplyInputs}
                      className="h-9 px-3 bg-[#1F1F1F] hover:bg-[#E7040D] text-white text-[12px] font-bold transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {QUICK_LOCATIONS.map((loc) => {
                      const isSelected = filters.locations.includes(loc);
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setLocationInput("");
                              onChange({ ...filters, locations: filters.locations.filter((l) => l !== loc) });
                            } else {
                              setLocationInput(loc);
                              onChange({ ...filters, locations: [loc] });
                            }
                          }}
                          className={`px-2.5 py-1 text-[11px] font-medium border transition-all cursor-pointer active:scale-95 ${
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

            {/* Accordion Item: Contract Type */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("contract")}
                className="w-full flex items-center justify-between text-[13.5px] font-semibold text-[#1F1F1F] hover:text-[#E7040D] transition-colors py-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Cardholder size={15} weight="bold" className="text-zinc-700" />
                  <span>Contract type</span>
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
                        onClick={() => toggleContract(c)}
                        className={`w-full text-left px-3 py-2 rounded-none text-[12px] font-medium flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
                          isChecked
                            ? "bg-[#fce8e0] text-[#E7040D] border border-[#E7040D] font-bold"
                            : "bg-[#F9F9FB] hover:bg-[#F0F0F3] text-[#1F1F1F] border border-zinc-200/50"
                        }`}
                      >
                        <span>{c}</span>
                        {isChecked && <Check size={12} weight="bold" className="text-[#E7040D]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pinned Bottom Actions */}
        <div className="pt-3 border-t border-zinc-100 shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={handleApplyInputs}
            className={`flex-1 py-2.5 rounded-none text-white text-[13px] font-bold shadow-2xs transition-all duration-150 cursor-pointer text-center flex items-center justify-center gap-1.5 active:scale-[0.98] ${
              appliedFlash
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-[#E7040D] hover:bg-[#CB030B]"
            }`}
          >
            {appliedFlash ? (
              <>
                <Check size={14} weight="bold" />
                <span>Filters Applied</span>
              </>
            ) : totalMatches !== undefined ? (
              <span>
                {totalMatches === 0
                  ? "No Matching Jobs"
                  : `Show ${totalMatches} ${totalMatches === 1 ? "Job" : "Jobs"}`}
              </span>
            ) : (
              <span>Apply Filters</span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetAll}
              className="px-4 py-2.5 rounded-none bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-700 text-[13px] font-semibold transition-all cursor-pointer text-center"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
