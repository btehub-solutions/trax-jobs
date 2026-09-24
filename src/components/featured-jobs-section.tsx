"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  BookmarkSimple,
  ArrowRight,
  Briefcase,
} from "@phosphor-icons/react";
import { Job } from "@/types";
import { isValidImageUrl } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Company Avatar / Vector Mark
───────────────────────────────────────────────────────────── */
function CompanyAvatar({ name, logo }: { name: string; logo?: string }) {
  if (isValidImageUrl(logo)) {
    return (
      <div className="w-11 h-11 rounded-xl bg-white border border-zinc-200/90 flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-2xs">
        <Image
          src={logo!}
          alt={name}
          width={36}
          height={36}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  const n = name.toLowerCase();
  if (n.includes("paystack")) {
    return (
      <div className="w-11 h-11 rounded-xl bg-[#00C3F8]/10 border border-[#00C3F8]/20 flex items-center justify-center p-2 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#00C3F8]">
          <path d="M15 22h70v16H15zM15 44h45v16H15zM15 66h70v16H15z" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (n.includes("flutterwave")) {
    return (
      <div className="w-11 h-11 rounded-xl bg-[#FB4E2D]/10 border border-[#FB4E2D]/20 flex items-center justify-center p-2 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 50c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#FB4E2D" strokeWidth="12" strokeLinecap="round" />
          <path d="M32 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#FF9B00" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (n.includes("moniepoint") || n.includes("nomba")) {
    return (
      <div className="w-11 h-11 rounded-xl bg-[#0355D4]/10 border border-[#0355D4]/20 flex items-center justify-center p-2 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M22 22l28 28-28 28V22zM78 22L50 50l28 28V22z" fill="#0355D4" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-11 h-11 rounded-xl bg-[#1F1F1F] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
      <Briefcase size={20} weight="fill" className="text-zinc-200" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FeaturedJobsSection: Sizing & Top CTA Matching How It Works
───────────────────────────────────────────────────────────── */
interface FeaturedJobsSectionProps {
  jobs: Job[];
}

export function FeaturedJobsSection({ jobs }: FeaturedJobsSectionProps) {
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("trax_saved_jobs");
      if (stored) {
        setSavedJobIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleSave = (e: React.MouseEvent, jobId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const stored = localStorage.getItem("trax_saved_jobs");
      let ids: string[] = stored ? JSON.parse(stored) : [];
      if (ids.includes(jobId)) {
        ids = ids.filter((id) => id !== jobId);
      } else {
        ids.push(jobId);
      }
      setSavedJobIds(ids);
      localStorage.setItem("trax_saved_jobs", JSON.stringify(ids));
    } catch {
      // ignore
    }
  };

  if (!jobs || jobs.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#FAF8F5] py-14 sm:py-20 px-6 sm:px-10 lg:px-16 border-t border-b border-zinc-200/80 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header with Top CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-black text-[#1F1F1F] tracking-[-0.025em] leading-[1.18]">
              Featured Verified Roles
            </h2>
            <p className="text-[14.5px] sm:text-[16px] text-zinc-600 font-normal leading-[1.6] mt-1.5">
              Handpicked opportunities with transparent pay and direct employer reach.
            </p>
          </div>

          {/* Top CTA Button in place of toggle */}
          <div className="self-start sm:self-center">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] sm:text-[14px] font-bold shadow-xs hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <span>Find more jobs</span>
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>

        {/* 3-Column Grid / Carousel Container (Identical size and structure to How It Works) */}
        <div
          ref={carouselRef}
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {jobs.map((job) => {
            const isSaved = savedJobIds.includes(job.id);
            const salaryText =
              job.salary?.formatted && job.salary.formatted.trim().length > 0
                ? job.salary.formatted
                : "Competitive Pay";

            return (
              <div
                key={job.id}
                className="bg-white rounded-[24px] border border-zinc-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_24px_-4px_rgba(15,16,18,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(231,4,13,0.1)] hover:border-[#E7040D]/40 hover:-translate-y-1 transition-all duration-300 group relative shrink-0 snap-start w-[84vw] max-w-[340px] md:w-auto"
              >
                {/* Top Section: Avatar, Title, Company, Status, Bookmark */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3.5 min-w-0">
                      <CompanyAvatar
                        name={job.company.name}
                        logo={job.company.logo}
                      />
                      <div className="min-w-0">
                        <Link href={`/jobs/${job.slug || job.id}`} className="block">
                          <h3 className="text-[16px] sm:text-[17.5px] font-bold text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight truncate">
                            {job.title}
                          </h3>
                        </Link>
                        <p className="text-[13.5px] font-semibold text-zinc-600 truncate mt-0.5">
                          {job.company.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[11.5px] font-medium mt-1">
                          <Clock size={12} weight="regular" />
                          <span>Recently verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleSave(e, job.id)}
                      aria-label={isSaved ? "Remove from saved roles" : "Save role"}
                      className="p-1.5 text-zinc-400 hover:text-zinc-900 transition-colors shrink-0 cursor-pointer rounded-full hover:bg-zinc-100"
                    >
                      <BookmarkSimple
                        size={19}
                        weight={isSaved ? "fill" : "regular"}
                        className={isSaved ? "text-[#E7040D]" : "text-zinc-500"}
                      />
                    </button>
                  </div>

                  {/* Middle Section: Filter Pill Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 my-4">
                    {/* Contract Type */}
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-zinc-200/80 text-zinc-700 text-[11px] font-semibold">
                      {job.contractType || "Full-time"}
                    </span>

                    {/* Category / Discipline */}
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-zinc-200/80 text-zinc-700 text-[11px] font-semibold">
                      {job.roleCategory || job.company.industry || "Technology"}
                    </span>

                    {/* Seniority */}
                    {job.experienceLevel && (
                      <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-zinc-200/80 text-zinc-700 text-[11px] font-semibold">
                        {job.experienceLevel}
                      </span>
                    )}

                    {/* Workplace Policy */}
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-zinc-200/80 text-zinc-700 text-[11px] font-semibold">
                      {job.workplaceType || "Onsite"}
                    </span>
                  </div>
                </div>

                {/* Bottom Section: Location (Left) and Salary (Right) */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3 text-[13px]">
                  <div className="flex items-center gap-1.5 text-zinc-500 font-medium truncate">
                    <MapPin size={14} weight="regular" className="shrink-0 text-zinc-400" />
                    <span className="truncate">{job.location}</span>
                  </div>

                  <div className="text-[#E7040D] font-extrabold text-[14.5px] sm:text-[15px] shrink-0">
                    {salaryText}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
