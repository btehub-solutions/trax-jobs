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
  ArrowRight,
  X,
} from "@phosphor-icons/react";

function JobTitleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTitle = searchParams.get("title") || "";
  const [jobTitle, setJobTitle] = useState(initialTitle);

  const handleNext = () => {
    const query = jobTitle.trim();
    if (query) {
      router.push(`/jobs/get-started/experience?title=${encodeURIComponent(query)}`);
    } else {
      router.push("/jobs/get-started/experience");
    }
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
            {/* Step 1: Job Title (Active) */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E7040D] text-white text-[13px] font-bold">
              <MagnifyingGlass size={14} weight="bold" />
              <span>Job title</span>
            </div>

            <CaretRight size={13} weight="bold" className="text-zinc-300" />

            {/* Step 2: Experience Level */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-semibold text-zinc-500">
              <Briefcase size={14} weight="bold" />
              <span>Experience Level</span>
            </div>

            <CaretRight size={13} weight="bold" className="text-zinc-300" />

            {/* Step 3: Location */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-semibold text-zinc-500">
              <MapPin size={14} weight="bold" />
              <span>Location</span>
            </div>
          </div>

          {/* Right Action */}
          <div>
            <Link
              href="/submit-job"
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
          <p className="text-[12.5px] font-bold tracking-tight text-[#1F1F1F] mb-6">
            Share your preferences
          </p>

          {/* Bold Headline */}
          <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-black tracking-[-0.03em] text-[#1F1F1F] leading-[1.15] mb-3">
            What job are you looking for?
          </h1>
          
          {/* Subtitle */}
          <p className="text-[14px] sm:text-[15.5px] text-zinc-600 max-w-lg mb-10 leading-relaxed">
            Enter one or more job titles. We&apos;ll match you to roles that fit.
          </p>

          {/* Centered Input Box */}
          <div className="w-full max-w-[420px] mb-12">
            <div className="relative">
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleNext();
                }}
                placeholder="Product Designer, Full-stack Engineer..."
                autoFocus
                className="w-full h-12 px-4 rounded-none bg-[#FAFAF8] border border-zinc-200 text-[14px] font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-950 focus:bg-white transition-all"
              />
              {jobTitle && (
                <button
                  onClick={() => setJobTitle("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                >
                  <X size={15} weight="bold" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom Dual-Button Pill */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white border border-zinc-200/80 shadow-xs">
            <button
              disabled
              className="px-5 py-2 rounded-lg text-[13.5px] font-bold text-zinc-300 cursor-not-allowed bg-transparent"
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              className={`px-7 py-2 rounded-lg text-[13.5px] font-bold transition-all cursor-pointer ${
                jobTitle.trim()
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

export default function GetStartedJobTitlePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      <JobTitleContent />
    </Suspense>
  );
}
