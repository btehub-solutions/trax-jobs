"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MagnifyingGlass,
  Briefcase,
  MapPin,
  CaretRight,
  Check,
} from "@phosphor-icons/react";

const EXPERIENCE_OPTIONS = [
  "Entry-level. 0-1 years",
  "Junior. 1-3 years",
  "Mid-level. 3-5 years",
  "Senior. 5-10 years",
  "Expert. 10+ years",
];

function ExperienceLevelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const initialExp = searchParams.get("exp")?.split(",").filter(Boolean) || [];

  const [selectedLevels, setSelectedLevels] = useState<string[]>(initialExp);

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleBack = () => {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    router.push(`/jobs/get-started${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleNext = () => {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (selectedLevels.length > 0) {
      params.set("exp", selectedLevels.join(","));
    }
    router.push(`/jobs/get-started/location?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between relative">
      {/* Top Floating Header */}
      <header className="w-full relative z-50 pt-7 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Trax Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/trax-logo.png"
              alt="Trax"
              width={120}
              height={34}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>

          {/* Stepper Pill Bar */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-zinc-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            {/* Step 1: Job Title */}
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[13px] font-semibold text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              <MagnifyingGlass size={14} weight="bold" />
              <span>Job title</span>
            </button>

            <CaretRight size={13} weight="bold" className="text-zinc-300" />

            {/* Step 2: Experience Level (Active) */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E7040D] text-white text-[13px] font-bold">
              <Briefcase size={14} weight="bold" />
              <span>Experience Level</span>
            </div>

            <CaretRight size={13} weight="bold" className="text-zinc-300" />

            {/* Step 3: Location */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-semibold text-zinc-400">
              <MapPin size={14} weight="bold" />
              <span>Location</span>
            </div>
          </div>

          {/* Right Action */}
          <div>
            <Link
              href="/about?tab=contact&topic=hiring"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all shadow-2xs"
            >
              <span>Submit a job</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Center Card (Fixed 1040px x 480px Dimensions for 100% Stability) */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-10 py-6 relative z-10">
        <div className="w-full max-w-[1040px] h-[480px] bg-white rounded-none border border-zinc-200/70 px-6 sm:px-12 shadow-[0_4px_20px_-8px_rgba(15,16,18,0.04)] flex flex-col items-center justify-center text-center">
          {/* Top Label */}
          <p className="text-[12.5px] font-bold tracking-tight text-[#1F1F1F] mb-3">
            Share your preferences
          </p>

          {/* Bold Headline */}
          <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-black tracking-[-0.03em] text-[#1F1F1F] leading-[1.15] mb-2">
            What&apos;s your experience level?
          </h1>

          {/* Subtitle */}
          <p className="text-[14px] sm:text-[15px] text-zinc-600 max-w-lg mb-5 leading-relaxed">
            You can select multiple options if you need.
          </p>

          {/* Stack of Experience Option Pills (Compact & Centered) */}
          <div className="flex flex-col items-center gap-1.5 mb-6">
            {EXPERIENCE_OPTIONS.map((option) => {
              const isSelected = selectedLevels.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleLevel(option)}
                  className={`px-4 py-1.5 rounded-lg text-[12.5px] font-medium transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-[#E7040D] text-white shadow-xs font-semibold"
                      : "bg-[#F4F4F5] hover:bg-[#EBEBEF] text-zinc-800 border border-zinc-200/60"
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && <Check size={12} weight="bold" className="shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Bottom Dual-Button Pill */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white border border-zinc-200/80 shadow-xs">
            <button
              onClick={handleBack}
              className="px-5 py-2 rounded-lg text-[13.5px] font-bold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-all cursor-pointer"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              className={`px-7 py-2 rounded-lg text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedLevels.length > 0
                  ? "bg-[#E7040D] hover:bg-[#CB030B] text-white shadow-xs active:scale-98"
                  : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              }`}
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ExperienceLevelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      <ExperienceLevelContent />
    </Suspense>
  );
}
