"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookmarkSimple,
  MapPin,
  Users,
  Briefcase,
  House,
  Tag,
  CalendarBlank,
  ArrowUpRight,
  SealCheck,
  Clock,
} from "@phosphor-icons/react";
import { Job } from "@/types";
import { isValidImageUrl } from "@/lib/utils";
import { SAMPLE_COMPANIES } from "@/data/companies";

/* ─────────────────────────────────────────────────────────────
   Company Logos (Authentic Vector Marks & Brand Geometry)
───────────────────────────────────────────────────────────── */
function CompanyMark({ name, logo }: { name: string; logo?: string }) {
  if (isValidImageUrl(logo)) {
    return (
      <div className="w-12 h-12 rounded-lg bg-white border border-zinc-200/90 flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
        <Image src={logo!} alt={name} width={44} height={44} className="w-full h-full object-contain rounded-md" />
      </div>
    );
  }
  const n = name.toLowerCase();
  if (n.includes("paystack")) {
    return (
      <div className="w-12 h-12 rounded-lg bg-[#00C3F8]/10 border border-[#00C3F8]/20 flex items-center justify-center p-2.5 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#00C3F8]">
          <path d="M15 22h70v16H15zM15 44h45v16H15zM15 66h70v16H15z" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (n.includes("flutterwave")) {
    return (
      <div className="w-12 h-12 rounded-lg bg-[#FB4E2D]/10 border border-[#FB4E2D]/20 flex items-center justify-center p-2.5 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 50c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#FB4E2D" strokeWidth="12" strokeLinecap="round" />
          <path d="M32 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#FF9B00" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (n.includes("moniepoint") || n.includes("nomba")) {
    return (
      <div className="w-12 h-12 rounded-lg bg-[#0355D4]/10 border border-[#0355D4]/20 flex items-center justify-center p-2.5 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M22 22l28 28-28 28V22zM78 22L50 50l28 28V22z" fill="#0355D4" />
        </svg>
      </div>
    );
  }
  if (n.includes("andela")) {
    return (
      <div className="w-12 h-12 rounded-lg bg-[#3359DF]/10 border border-[#3359DF]/20 flex items-center justify-center p-2 shrink-0">
        <span className="text-[#3359DF] font-black text-xl tracking-tighter">A</span>
      </div>
    );
  }
  if (n.includes("kuda")) {
    return (
      <div className="w-12 h-12 rounded-lg bg-[#40196D]/10 border border-[#40196D]/20 flex items-center justify-center p-2 shrink-0">
        <span className="text-[#40196D] font-black text-sm tracking-tight">kuda.</span>
      </div>
    );
  }
  if (n.includes("piggyvest") || n.includes("cowrywise")) {
    return (
      <div className="w-12 h-12 rounded-lg bg-[#0D60D8]/10 border border-[#0D60D8]/20 flex items-center justify-center p-2 shrink-0">
        <span className="text-[#0D60D8] font-bold text-xs">PIGGY</span>
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-lg bg-[#1F1F1F] text-white flex items-center justify-center font-bold text-sm shrink-0">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Company Square Mark (Overlapping Avatar Box for Mobile)
───────────────────────────────────────────────────────────── */
function CompanySquareMark({ name, logo }: { name: string; logo?: string }) {
  const [imageError, setImageError] = useState(false);

  if (!imageError && isValidImageUrl(logo)) {
    return (
      <Image
        src={logo!}
        alt={name}
        width={72}
        height={72}
        className="w-full h-full object-contain rounded-lg"
        onError={() => setImageError(true)}
        unoptimized
      />
    );
  }
  const n = name.toLowerCase();
  if (n.includes("paystack")) {
    return (
      <div className="w-full h-full bg-[#00C3F8]/10 flex items-center justify-center p-3 rounded-lg">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#00C3F8]">
          <path d="M15 22h70v16H15zM15 44h45v16H15zM15 66h70v16H15z" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (n.includes("flutterwave")) {
    return (
      <div className="w-full h-full bg-[#FB4E2D]/10 flex items-center justify-center p-3 rounded-lg">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 50c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#FB4E2D" strokeWidth="12" strokeLinecap="round" />
          <path d="M32 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#FF9B00" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (n.includes("moniepoint") || n.includes("nomba")) {
    return (
      <div className="w-full h-full bg-[#0355D4]/10 flex items-center justify-center p-3 rounded-lg">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M22 22l28 28-28 28V22zM78 22L50 50l28 28V22z" fill="#0355D4" />
        </svg>
      </div>
    );
  }
  if (n.includes("andela")) {
    return (
      <div className="w-full h-full bg-[#3359DF]/10 flex items-center justify-center p-2 rounded-lg">
        <span className="text-[#3359DF] font-black text-2xl tracking-tighter">A</span>
      </div>
    );
  }
  if (n.includes("kuda")) {
    return (
      <div className="w-full h-full bg-[#40196D]/10 flex items-center justify-center p-2 rounded-lg">
        <span className="text-[#40196D] font-black text-base tracking-tight">kuda.</span>
      </div>
    );
  }
  if (n.includes("piggyvest") || n.includes("cowrywise")) {
    return (
      <div className="w-full h-full bg-[#0D60D8]/10 flex items-center justify-center p-2 rounded-lg">
        <span className="text-[#0D60D8] font-bold text-xs">PIGGY</span>
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-[#1F1F1F] text-white flex items-center justify-center font-bold text-lg rounded-lg">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

// Verified team photos for culture widget
const CULTURE_SETS = [
  [
    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300",
  ],
  [
    "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg?auto=compress&cs=tinysrgb&w=300",
  ],
];

export function JobCard({ job, showCollage = true }: { job: Job; showCollage?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("trax_saved_jobs");
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        setIsSaved(ids.includes(job.id));
      }
    } catch {
      // ignore
    }
  }, [job.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = localStorage.getItem("trax_saved_jobs");
      let ids: string[] = saved ? JSON.parse(saved) : [];
      if (ids.includes(job.id)) {
        ids = ids.filter((id) => id !== job.id);
        setIsSaved(false);
      } else {
        ids.push(job.id);
        setIsSaved(true);
      }
      localStorage.setItem("trax_saved_jobs", JSON.stringify(ids));
    } catch {
      // ignore
    }
  };

  const formattedDate = new Date(job.postedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const photoSet = CULTURE_SETS[Math.abs(job.title.length) % CULTURE_SETS.length];

  const matchedCompany = SAMPLE_COMPANIES.find(
    (c) => c.slug === job.company.slug || c.name.toLowerCase() === job.company.name.toLowerCase()
  );
  const resolvedCover =
    job.company.coverImage ||
    matchedCompany?.coverImage ||
    (job.company.culturePhotos && job.company.culturePhotos[0]) ||
    photoSet[0] ||
    "/images/trax-talent-cover-default.jpg";

  const daysLeft = useMemo(() => {
    if (!job.postedDate) return "44 days left";
    const posted = new Date(job.postedDate).getTime();
    if (isNaN(posted)) return "44 days left";
    const now = Date.now();
    const diffDays = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    const remaining = Math.max(1, 45 - diffDays);
    return `${remaining} days left`;
  }, [job.postedDate]);

  const mobileTags = useMemo(() => {
    const list: string[] = [];

    if (job.contractType) {
      list.push(job.contractType);
    }

    if (job.company?.industry) {
      list.push(job.company.industry);
    } else if (job.roleCategory) {
      list.push(job.roleCategory);
    }

    if (job.experienceLevel) {
      const exp = job.experienceLevel.toLowerCase();
      if (exp.includes("senior")) list.push("Senior Level");
      else if (exp.includes("mid")) list.push("Mid Level");
      else if (exp.includes("junior")) list.push("Junior Level");
      else if (exp.includes("entry")) list.push("Entry Level");
      else if (exp.includes("expert") || exp.includes("lead")) list.push("Lead / Expert");
      else list.push(job.experienceLevel.split(".")[0]);
    }

    if (job.workplaceType) {
      const wp = job.workplaceType.toLowerCase();
      if (wp.includes("remote")) list.push("Remote");
      else if (wp.includes("hybrid")) list.push("Hybrid");
      else list.push("Onsite");
    }

    if (list.length < 4 && job.tags && job.tags.length > 0) {
      for (const t of job.tags) {
        if (!list.includes(t)) {
          list.push(t);
          if (list.length >= 4) break;
        }
      }
    }

    return list;
  }, [job.contractType, job.company?.industry, job.roleCategory, job.experienceLevel, job.workplaceType, job.tags]);

  return (
    <>
      {/* Mobile Card Design (block md:hidden) - Neat reference layout */}
      <div className="block md:hidden relative bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-xs transition-all duration-200 p-4 sm:p-5 group">
        {/* Top Row: Logo + Info (Title, Company, Time left) + Bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {/* Square Company Mark */}
            <Link href={`/jobs/${job.slug || job.id}`} className="shrink-0 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200/90 flex items-center justify-center p-1.5 overflow-hidden shadow-2xs group-hover:border-zinc-300 transition-colors">
                <CompanySquareMark name={job.company.name} logo={job.company.logo} />
              </div>
            </Link>

            {/* Title, Company Name, Time Info */}
            <div className="min-w-0 flex-1">
              <Link href={`/jobs/${job.slug || job.id}`} className="block">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight truncate">
                    {job.title}
                  </h3>
                  {job.isVerified && (
                    <SealCheck size={15} weight="fill" className="text-[#E7040D] shrink-0" />
                  )}
                </div>
              </Link>

              <Link
                href={`/companies/${job.company.slug || job.company.name.toLowerCase()}`}
                className="text-[13px] sm:text-[13.5px] font-medium text-zinc-600 hover:text-[#E7040D] transition-colors block truncate mt-0.5"
              >
                {job.company.name}
              </Link>

              <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 font-medium mt-1">
                <Clock size={13.5} weight="bold" className="text-zinc-400 shrink-0" />
                <span>{daysLeft}</span>
              </div>
            </div>
          </div>

          {/* Bookmark Button (Top Right) */}
          <button
            type="button"
            onClick={toggleSave}
            className={`p-1.5 -mr-1 -mt-1 rounded-lg transition-colors cursor-pointer select-none active:scale-90 shrink-0 relative z-10 ${
              isSaved ? "text-[#E7040D]" : "text-zinc-400 hover:text-zinc-600"
            }`}
            aria-label={isSaved ? "Saved" : "Save job"}
          >
            <BookmarkSimple
              size={20}
              weight={isSaved ? "fill" : "bold"}
              className={isSaved ? "text-[#E7040D]" : "text-zinc-400"}
            />
          </button>
        </div>

        {/* Middle Row: Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
          {mobileTags.map((tagItem) => (
            <span
              key={tagItem}
              className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5F5F7] text-zinc-700 border border-zinc-200/60 leading-none whitespace-nowrap"
            >
              {tagItem}
            </span>
          ))}
        </div>

        {/* Bottom Row: Location (Left) + Salary (Right) */}
        <div className="flex items-center justify-between gap-3 pt-1 mt-3.5">
          <div className="flex items-center gap-1.5 text-zinc-600 text-[13px] font-medium min-w-0">
            <MapPin size={15} weight="bold" className="text-zinc-400 shrink-0" />
            <span className="truncate">
              {(job.location || "Nigeria").replace(/\s*\([^)]*(hybrid|remote|onsite)[^)]*\)/gi, "").trim() || job.location || "Nigeria"}
            </span>
          </div>

          <div className="text-[13.5px] font-bold text-[#E7040D] whitespace-nowrap shrink-0">
            {job.salary?.formatted || "Competitive"}
          </div>
        </div>
      </div>

      {/* Desktop Card Design (hidden md:block) - Preserved exactly as before */}
      <div className="hidden md:block feed-card-reveal relative pt-2.5 pr-2.5 sm:pt-3 sm:pr-3 group">
        {/* Peach Geometric Offset Layer (Two-layer border / stacked depth) */}
        <div
          className="absolute top-0 right-0 w-[calc(100%-10px)] h-[calc(100%-10px)] sm:w-[calc(100%-12px)] sm:h-[calc(100%-12px)] bg-[#FCE8E0] border border-[#f5c4ae]/40 rounded-lg z-0 pointer-events-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />

        {/* Main Job Card */}
        <div className="relative z-10 bg-white rounded-lg border border-zinc-200/90 shadow-2xs group-hover:shadow-md group-hover:border-zinc-300 group-hover:-translate-y-0.5 active:scale-[0.99] active:bg-zinc-50/50 transition-all duration-150 p-4 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden">
        
        {/* Top Section: Logo, Title, Company & Right-side 3-Photo Collage Widget */}
        <div>
          <div className="flex items-start justify-between gap-6 mb-3">
            <div className="flex items-start gap-4">
              <Link href={`/jobs/${job.slug || job.id}`} className="shrink-0 relative z-10">
                <CompanyMark name={job.company.name} logo={job.company.logo} />
              </Link>
              <div>
                <Link href={`/jobs/${job.slug || job.id}`} className="block">
                  <span className="absolute inset-0 z-0" aria-hidden="true" />
                  <h3 className="text-[18px] sm:text-[20px] font-black text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight relative z-10">
                    {job.title}
                  </h3>
                </Link>
                <Link
                  href={`/companies/${job.company.slug || job.company.name.toLowerCase()}`}
                  className="text-[14px] font-medium text-zinc-700 hover:text-[#E7040D] transition-colors mt-0.5 inline-block relative z-10"
                >
                  {job.company.name}
                </Link>
              </div>
            </div>

            {/* Right-side 3-Photo Culture Collage */}
            {showCollage && (
              <div className="hidden md:flex items-center gap-1 shrink-0">
                <div className="flex items-center -space-x-4">
                  <div className="relative w-14 h-20 rounded-lg overflow-hidden bg-zinc-100 border-2 border-white shadow-2xs z-30">
                    <Image
                      src={photoSet[0]}
                      alt="Team culture"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-14 h-20 rounded-lg overflow-hidden bg-zinc-100 border-2 border-white shadow-2xs z-20">
                    <Image
                      src={photoSet[1]}
                      alt="Team culture"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-14 h-20 rounded-lg overflow-hidden bg-zinc-100 border-2 border-white shadow-2xs z-10">
                    <Image
                      src={photoSet[2]}
                      alt="Team culture"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 1-Line Description */}
          <p className="text-[13.5px] text-zinc-600 leading-relaxed mb-4 max-w-2xl">
            {job.summary}
          </p>

          {/* Metadata Badges Row (8px rounded badges with Trax styling) */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {/* Contract */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5F5F7] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50">
              <Briefcase size={13} weight="bold" className="text-zinc-500" />
              <span>{job.contractType}</span>
            </span>

            {/* Remote Policy */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5F5F7] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50">
              <House size={13} weight="bold" className="text-zinc-500" />
              <span>Remote: {job.workplaceType}</span>
            </span>

            {/* Location */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5F5F7] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50">
              <MapPin size={13} weight="bold" className="text-zinc-500" />
              <span>{job.location}</span>
            </span>

            {/* Employees */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5F5F7] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50">
              <Users size={13} weight="bold" className="text-zinc-500" />
              <span>{job.company.employeesCount} employees</span>
            </span>

            {/* Industry Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5F5F7] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50">
              <Tag size={13} weight="bold" className="text-zinc-500" />
              <span>{job.company.industry}</span>
            </span>

            {/* Category / Skill Tags */}
            {job.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#F5F5F7] hover:bg-[#ECECF0] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50 hover:border-zinc-300 transition-colors duration-150 select-none cursor-default"
              >
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Footer Row: Save Button & Date */}
        <div className="flex items-center justify-between gap-2 pt-2 sm:pt-1 relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Save Button */}
            <button
              type="button"
              onClick={toggleSave}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-semibold border transition-all duration-150 cursor-pointer select-none active:scale-90 shrink-0 whitespace-nowrap ${
                isSaved
                  ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]"
                  : "bg-white hover:bg-zinc-50 border-zinc-200 text-[#1F1F1F] shadow-2xs"
              }`}
            >
              <BookmarkSimple size={14} weight={isSaved ? "fill" : "bold"} className={isSaved ? "scale-110 transition-transform text-[#E7040D]" : "transition-transform"} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>

            {/* Date with Calendar icon */}
            <div className="inline-flex items-center gap-1.5 text-[11.5px] sm:text-[12.5px] text-zinc-400 font-medium whitespace-nowrap shrink-0">
              <CalendarBlank size={14} weight="regular" className="shrink-0" />
              <span className="whitespace-nowrap">{formattedDate}</span>
            </div>
          </div>

          {/* Details Button (Navigates to Job Detail Page) */}
          <Link
            href={`/jobs/${job.slug || job.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-md bg-[#E7040D] hover:bg-[#CB030B] active:scale-95 hover:shadow-xs text-white text-[12px] sm:text-[12.5px] font-bold shadow-2xs transition-all duration-150 cursor-pointer select-none whitespace-nowrap shrink-0"
          >
            <span>Details</span>
            <ArrowUpRight size={13} weight="bold" className="shrink-0" />
          </Link>
        </div>

      </div>
    </div>
    </>
  );
}
