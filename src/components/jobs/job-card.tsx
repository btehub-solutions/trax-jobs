"use client";

import { useState, useEffect } from "react";
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
} from "@phosphor-icons/react";
import { Job } from "@/types";

/* ─────────────────────────────────────────────────────────────
   Company Logos (Authentic Vector Marks & Brand Geometry)
───────────────────────────────────────────────────────────── */
function CompanyMark({ name, logo }: { name: string; logo?: string }) {
  if (logo) {
    return (
      <div className="w-12 h-12 rounded-none bg-white border border-zinc-200/90 flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
        <Image src={logo} alt={name} width={44} height={44} className="w-full h-full object-contain" />
      </div>
    );
  }
  const n = name.toLowerCase();
  if (n.includes("paystack")) {
    return (
      <div className="w-12 h-12 rounded-none bg-[#00C3F8]/10 border border-[#00C3F8]/20 flex items-center justify-center p-2.5 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#00C3F8]">
          <path d="M15 22h70v16H15zM15 44h45v16H15zM15 66h70v16H15z" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (n.includes("flutterwave")) {
    return (
      <div className="w-12 h-12 rounded-none bg-[#FB4E2D]/10 border border-[#FB4E2D]/20 flex items-center justify-center p-2.5 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 50c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#FB4E2D" strokeWidth="12" strokeLinecap="round" />
          <path d="M32 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#FF9B00" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (n.includes("moniepoint") || n.includes("nomba")) {
    return (
      <div className="w-12 h-12 rounded-none bg-[#0355D4]/10 border border-[#0355D4]/20 flex items-center justify-center p-2.5 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M22 22l28 28-28 28V22zM78 22L50 50l28 28V22z" fill="#0355D4" />
        </svg>
      </div>
    );
  }
  if (n.includes("andela")) {
    return (
      <div className="w-12 h-12 rounded-none bg-[#3359DF]/10 border border-[#3359DF]/20 flex items-center justify-center p-2 shrink-0">
        <span className="text-[#3359DF] font-black text-xl tracking-tighter">A</span>
      </div>
    );
  }
  if (n.includes("kuda")) {
    return (
      <div className="w-12 h-12 rounded-none bg-[#40196D]/10 border border-[#40196D]/20 flex items-center justify-center p-2 shrink-0">
        <span className="text-[#40196D] font-black text-sm tracking-tight">kuda.</span>
      </div>
    );
  }
  if (n.includes("piggyvest") || n.includes("cowrywise")) {
    return (
      <div className="w-12 h-12 rounded-none bg-[#0D60D8]/10 border border-[#0D60D8]/20 flex items-center justify-center p-2 shrink-0">
        <span className="text-[#0D60D8] font-bold text-xs">PIGGY</span>
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-none bg-[#1F1F1F] text-white flex items-center justify-center font-bold text-sm shrink-0">
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

  return (
    <div className="bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_14px_32px_-6px_rgba(231,4,13,0.08)] hover:border-[#E7040D]/40 hover:-translate-y-0.5 transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden">
      
      {/* Top Section: Logo, Title, Company & Right-side 3-Photo Collage Widget */}
      <div>
        <div className="flex items-start justify-between gap-6 mb-3">
          <div className="flex items-start gap-4">
            <CompanyMark name={job.company.name} logo={job.company.logo} />
            <div>
              <Link href={`/jobs/${job.slug || job.id}`}>
                <h3 className="text-[18px] sm:text-[20px] font-black text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight">
                  {job.title}
                </h3>
              </Link>
              <Link
                href={`/companies/${job.company.slug || job.company.name.toLowerCase()}`}
                className="text-[14px] font-medium text-zinc-700 hover:text-[#E7040D] transition-colors mt-0.5 inline-block"
              >
                {job.company.name}
              </Link>
            </div>
          </div>

          {/* Right-side 3-Photo Culture Collage */}
          {showCollage && (
            <div className="hidden md:flex items-center gap-1 shrink-0">
              <div className="flex items-center -space-x-4">
                <div className="relative w-14 h-20 rounded-none overflow-hidden bg-zinc-100 border-2 border-white shadow-2xs z-30">
                  <Image
                    src={photoSet[0]}
                    alt="Team culture"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-14 h-20 rounded-none overflow-hidden bg-zinc-100 border-2 border-white shadow-2xs z-20">
                  <Image
                    src={photoSet[1]}
                    alt="Team culture"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-14 h-20 rounded-none overflow-hidden bg-zinc-100 border-2 border-white shadow-2xs z-10">
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

        {/* Metadata Badges Row (90-degree square badges with Trax styling) */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {/* Contract */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#F5F5F7] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50">
            <Briefcase size={13} weight="bold" className="text-zinc-500" />
            <span>{job.contractType}</span>
          </span>

          {/* Remote Policy */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#F5F5F7] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50">
            <House size={13} weight="bold" className="text-zinc-500" />
            <span>Remote: {job.workplaceType}</span>
          </span>

          {/* Location */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#F5F5F7] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50">
            <MapPin size={13} weight="bold" className="text-zinc-500" />
            <span>{job.location}</span>
          </span>

          {/* Employees */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#F5F5F7] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50">
            <Users size={13} weight="bold" className="text-zinc-500" />
            <span>{job.company.employeesCount} employees</span>
          </span>

          {/* Industry Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#F5F5F7] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50">
            <Tag size={13} weight="bold" className="text-zinc-500" />
            <span>{job.company.industry}</span>
          </span>

          {/* Category / Skill Tags */}
          {job.tags.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-none bg-[#F5F5F7] hover:bg-[#ECECF0] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/50 hover:border-zinc-300 transition-colors duration-150 select-none cursor-default"
            >
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Footer Row: Save Button & Date */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          {/* Save Button with 90-degree edges */}
          <button
            type="button"
            onClick={toggleSave}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-[12.5px] font-semibold border transition-all duration-150 cursor-pointer select-none active:scale-90 ${
              isSaved
                ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]"
                : "bg-white hover:bg-zinc-50 border-zinc-200 text-[#1F1F1F] shadow-2xs"
            }`}
          >
            <BookmarkSimple size={14} weight={isSaved ? "fill" : "bold"} className={isSaved ? "scale-110 transition-transform text-[#E7040D]" : "transition-transform"} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>

          {/* Date with Calendar icon */}
          <div className="inline-flex items-center gap-1.5 text-[12.5px] text-zinc-400 font-medium ml-2">
            <CalendarBlank size={14} weight="regular" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Details Button (Navigates to Job Detail Page) */}
        <Link
          href={`/jobs/${job.slug || job.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-none bg-[#E7040D] hover:bg-[#CB030B] active:scale-95 hover:shadow-[0_4px_14px_-2px_rgba(231,4,13,0.35)] text-white text-[12.5px] font-bold shadow-2xs transition-all duration-150 cursor-pointer select-none whitespace-nowrap"
        >
          <span>Details</span>
          <ArrowUpRight size={13} weight="bold" />
        </Link>
      </div>

    </div>
  );
}
