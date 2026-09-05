"use client";

import { useState } from "react";
import {
  MagnifyingGlass,
  Check,
  MapPin,
  Briefcase,
  X,
  ArrowRight,
  ArrowLeft,
} from "@phosphor-icons/react";
import { ExperienceTier } from "@/types";

const EXPERIENCE_TIERS: { id: ExperienceTier; label: string; desc: string }[] = [
  { id: "Entry-level. 0-1 years", label: "Entry-level. 0-1 years", desc: "Internships & graduate roles" },
  { id: "Junior. 1-3 years", label: "Junior. 1-3 years", desc: "Early career engineers & designers" },
  { id: "Mid-level. 3-5 years", label: "Mid-level. 3-5 years", desc: "Independent contributors" },
  { id: "Senior. 5-10 years", label: "Senior. 5-10 years", desc: "Senior engineers & team leads" },
  { id: "Expert. 10+ years", label: "Expert. 10+ years", desc: "Staff, Principal & Architects" },
];

const SUGGESTED_ROLES = [
  "AI/ML Engineer",
  "Senior Frontend Engineer",
  "Lead Backend Engineer",
  "Product Designer",
  "DevOps Engineer",
  "Mobile Engineer (iOS/Android)",
  "Data Engineer",
  "Product Manager",
];

const POPULAR_LOCATIONS = [
  "Lagos, NG",
  "Abuja, NG",
  "Remote Africa",
  "Global Remote",
  "Nairobi, KE",
  "Accra, GH",
];

interface JobsPreferenceWizardProps {
  onComplete: (prefs: {
    roles: string[];
    experienceLevels: string[];
    locations: string[];
  }) => void;
  onClose?: () => void;
}

export function JobsPreferenceWizard({
  onComplete,
  onClose,
}: JobsPreferenceWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // State
  const [selectedRole, setSelectedRole] = useState("AI/ML Engineer");
  const [selectedExperience, setSelectedExperience] = useState<string[]>([
    "Senior. 5-10 years",
  ]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([
    "Lagos, NG",
  ]);
  const [locationInput, setLocationInput] = useState("");

  const toggleExperience = (tier: string) => {
    if (selectedExperience.includes(tier)) {
      if (selectedExperience.length > 1) {
        setSelectedExperience(selectedExperience.filter((t) => t !== tier));
      }
    } else {
      setSelectedExperience([...selectedExperience, tier]);
    }
  };

  const addLocation = (loc: string) => {
    const trimmed = loc.trim();
    if (trimmed && !selectedLocations.includes(trimmed)) {
      setSelectedLocations([...selectedLocations, trimmed]);
      setLocationInput("");
    }
  };

  const removeLocation = (loc: string) => {
    if (selectedLocations.length > 1) {
      setSelectedLocations(selectedLocations.filter((l) => l !== loc));
    }
  };

  const handleFinish = () => {
    onComplete({
      roles: selectedRole ? [selectedRole] : [],
      experienceLevels: selectedExperience,
      locations: selectedLocations,
    });
  };

  return (
    <div className="w-full bg-[#FAF8F5] py-10 sm:py-16 px-4 sm:px-6 relative overflow-hidden border-b border-zinc-200/80">
      {/* Graph Paper Grid Canvas */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e8e4dc 1px, transparent 1px),
            linear-gradient(to bottom, #e8e4dc 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Top Stepper Pill Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-zinc-200/90 shadow-2xs">
            {/* Step 1 Pill */}
            <button
              onClick={() => setStep(1)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                step === 1
                  ? "bg-[#E7040D] text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <MagnifyingGlass size={14} weight="bold" />
              <span>Job title</span>
            </button>

            <span className="text-zinc-300 px-1">&gt;</span>

            {/* Step 2 Pill */}
            <button
              onClick={() => setStep(2)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                step === 2
                  ? "bg-[#E7040D] text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <Briefcase size={14} weight="bold" />
              <span>Experience Level</span>
            </button>

            <span className="text-zinc-300 px-1">&gt;</span>

            {/* Step 3 Pill */}
            <button
              onClick={() => setStep(3)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                step === 3
                  ? "bg-[#E7040D] text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <MapPin size={14} weight="bold" />
              <span>Location</span>
            </button>
          </div>
        </div>

        {/* Wizard Main Card Container */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 sm:p-12 shadow-[0_16px_40px_-8px_rgba(15,16,18,0.08)]">
          <p className="text-center text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
            Share your preferences
          </p>

          {/* STEP 1: Job Title */}
          {step === 1 && (
            <div className="flex flex-col items-center text-center">
              <h2 className="text-[28px] sm:text-[36px] font-black tracking-[-0.03em] text-zinc-950 leading-tight mb-3">
                What job are you looking for?
              </h2>
              <p className="text-[14.5px] text-zinc-500 max-w-md mb-8">
                Enter your target role or select a popular field. We will match you to curated Nigerian and African tech openings.
              </p>

              {/* Text Input */}
              <div className="w-full max-w-lg mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    placeholder="E.g. AI/ML Engineer, Senior Product Designer..."
                    className="w-full h-14 px-5 rounded-2xl bg-zinc-50 border-2 border-[#E7040D]/30 focus:border-[#E7040D] text-[16px] font-semibold text-zinc-900 focus:outline-hidden transition-all shadow-xs"
                  />
                  {selectedRole && (
                    <button
                      onClick={() => setSelectedRole("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                    >
                      <X size={18} weight="bold" />
                    </button>
                  )}
                </div>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap justify-center gap-2 max-w-xl mb-10">
                {SUGGESTED_ROLES.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-3.5 py-1.5 rounded-xl text-[12px] font-semibold transition-colors cursor-pointer ${
                      selectedRole.toLowerCase() === role.toLowerCase()
                        ? "bg-[#fce8e0] text-[#E7040D] border border-[#f5c4ae]"
                        : "bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200/80"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* Nav Buttons */}
              <div className="flex items-center gap-3">
                <button
                  disabled
                  className="px-8 py-3.5 rounded-xl bg-zinc-100 text-zinc-400 text-[14px] font-bold cursor-not-allowed"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-10 py-3.5 rounded-xl bg-[#E7040D] hover:bg-[#CB030B] text-white text-[14px] font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98 inline-flex items-center gap-2"
                >
                  <span>Next</span>
                  <ArrowRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Experience Level */}
          {step === 2 && (
            <div className="flex flex-col items-center text-center">
              <h2 className="text-[28px] sm:text-[36px] font-black tracking-[-0.03em] text-zinc-950 leading-tight mb-3">
                What&apos;s your experience level?
              </h2>
              <p className="text-[14.5px] text-zinc-500 max-w-md mb-8">
                You can select multiple options if you need.
              </p>

              {/* Options Stack */}
              <div className="w-full max-w-md space-y-3 mb-10">
                {EXPERIENCE_TIERS.map((tier) => {
                  const isChecked = selectedExperience.includes(tier.id);
                  return (
                    <button
                      key={tier.id}
                      onClick={() => toggleExperience(tier.id)}
                      className={`w-full p-4 rounded-xl text-left border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D] shadow-xs"
                          : "bg-zinc-50 hover:bg-zinc-100/80 border-zinc-200/80 text-zinc-800"
                      }`}
                    >
                      <div>
                        <p className="text-[14.5px] font-bold leading-tight">{tier.label}</p>
                        <p className="text-[12px] opacity-80 mt-0.5">{tier.desc}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked
                            ? "bg-[#E7040D] border-[#E7040D] text-white"
                            : "border-zinc-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check size={13} weight="bold" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Nav Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[14px] font-bold transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-10 py-3.5 rounded-xl bg-[#E7040D] hover:bg-[#CB030B] text-white text-[14px] font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98 inline-flex items-center gap-2"
                >
                  <span>Next</span>
                  <ArrowRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Location */}
          {step === 3 && (
            <div className="flex flex-col items-center text-center">
              <h2 className="text-[28px] sm:text-[36px] font-black tracking-[-0.03em] text-zinc-950 leading-tight mb-3">
                Where do you want to work?
              </h2>
              <p className="text-[14.5px] text-zinc-500 max-w-md mb-8">
                Choose primary hubs or select remote options across Africa.
              </p>

              {/* Location Input & Selected Chips */}
              <div className="w-full max-w-lg mb-6">
                <div className="relative mb-3">
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addLocation(locationInput);
                      }
                    }}
                    placeholder="E.g. Lagos, Abuja, Remote Africa..."
                    className="w-full h-14 px-5 rounded-2xl bg-zinc-50 border-2 border-zinc-200 focus:border-[#E7040D] text-[15px] font-semibold text-zinc-900 focus:outline-hidden transition-all shadow-xs"
                  />
                  {locationInput && (
                    <button
                      onClick={() => addLocation(locationInput)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#E7040D] text-white text-[12px] font-bold"
                    >
                      Add
                    </button>
                  )}
                </div>

                {/* Selected Location Tags */}
                <div className="flex flex-wrap items-center gap-2 justify-center min-h-[36px]">
                  {selectedLocations.map((loc) => (
                    <span
                      key={loc}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#fce8e0] text-[#E7040D] border border-[#f5c4ae] text-[13px] font-bold"
                    >
                      <span>{loc}</span>
                      <button
                        onClick={() => removeLocation(loc)}
                        className="hover:opacity-75 cursor-pointer"
                      >
                        <X size={13} weight="bold" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested Locations */}
              <div className="flex flex-wrap justify-center gap-2 max-w-md mb-10">
                {POPULAR_LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => addLocation(loc)}
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-[12px] font-semibold transition-colors cursor-pointer"
                  >
                    + {loc}
                  </button>
                ))}
              </div>

              {/* Nav Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[14px] font-bold transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  className="px-10 py-3.5 rounded-xl bg-[#E7040D] hover:bg-[#CB030B] text-white text-[14px] font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98 inline-flex items-center gap-2"
                >
                  <span>Find job matches</span>
                  <ArrowRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
