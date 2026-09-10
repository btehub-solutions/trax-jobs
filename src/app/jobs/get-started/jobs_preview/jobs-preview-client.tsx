"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { JobCard } from "@/components/jobs/job-card";
import { JobsFilterSidebar } from "@/components/jobs/jobs-filter-sidebar";
import { JobFilterState, ExperienceTier } from "@/types";
import {
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

function JobsPreviewInner({ jobs }: { jobs: any[] }) {
  const searchParams = useSearchParams();
  const titleParam = searchParams.get("title") || "";
  const expParam = searchParams.get("exp")?.split(",").filter(Boolean) || [];
  const locParam = searchParams.get("location") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [filters, setFilters] = useState<JobFilterState>({
    search: titleParam,
    roles: [],
    experienceLevels: expParam as ExperienceTier[],
    locations: locParam ? [locParam] : [],
    contractTypes: [],
    workplaceTypes: [],
  });

  const handleResetFilters = () => {
    setFilters({ search: "", roles: [], experienceLevels: [], locations: [], contractTypes: [], workplaceTypes: [] });
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!job.title.toLowerCase().includes(q) && !job.company.name.toLowerCase().includes(q) && !job.tags.some((t: string) => t.toLowerCase().includes(q))) return false;
      }
      if (filters.roles.length > 0) {
        const matchRole = filters.roles.some((r) => job.roleCategory.toLowerCase().includes(r.toLowerCase()) || job.title.toLowerCase().includes(r.toLowerCase()));
        if (!matchRole) return false;
      }
      if (filters.experienceLevels.length > 0) {
        if (!filters.experienceLevels.includes(job.experienceLevel as ExperienceTier)) return false;
      }
      if (filters.locations.length > 0) {
        const matchLoc = filters.locations.some((l) => job.location.toLowerCase().includes(l.toLowerCase()));
        if (!matchLoc) return false;
      }
      if (filters.contractTypes.length > 0) {
        if (!filters.contractTypes.includes(job.contractType as any)) return false;
      }
      return true;
    });
  }, [jobs, filters]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <header className="w-full bg-[#FAF8F5] pt-6 pb-4 px-6 sm:px-10 lg:px-16 border-b border-zinc-200/60 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/" className="flex items-center">
              <Image src="/images/trax-logo.png" alt="Trax" width={120} height={34} className="h-7 w-auto object-contain" priority />
            </Link>
            <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
              <Link href="/jobs" className="px-4 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 text-[13px] font-bold">Find a job</Link>
              <Link href="/talent" className="px-4 py-1.5 rounded-lg text-zinc-600 hover:text-zinc-950 text-[13px] font-semibold transition-colors">Hire a Talent</Link>
              <Link href="/companies" className="px-4 py-1.5 rounded-lg text-zinc-600 hover:text-zinc-950 text-[13px] font-semibold transition-colors">Explore companies</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/about?tab=contact&topic=hiring" className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#0C1222] hover:bg-[#070b14] active:scale-[0.98] select-none text-white text-[13.5px] font-bold transition-all shadow-2xs">
              Post a job
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1280px] mx-auto py-8 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row items-start gap-8">

          <JobsFilterSidebar filters={filters} onChange={setFilters} onReset={handleResetFilters} onOpenWizard={() => {}} />

          <div className="flex-1 w-full space-y-5">
            <div className="flex items-center justify-between pb-1">
              <h1 className="text-[26px] sm:text-[30px] font-extrabold text-zinc-950 tracking-tight">
                {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
              </h1>
            </div>

            {paginatedJobs.length > 0 ? (
              <div className="space-y-4">
                {paginatedJobs.map((job) => <JobCard key={job.id} job={job} />)}

                {totalPages > 1 && (
                  <div className="flex justify-center pt-8 pb-4">
                    <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-white border border-zinc-200/90 shadow-2xs">
                      <button onClick={() => { if (currentPage > 1) { setCurrentPage((p) => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); } }} disabled={currentPage === 1} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${currentPage === 1 ? "text-zinc-300 bg-zinc-50 cursor-not-allowed" : "text-zinc-700 hover:bg-zinc-100 cursor-pointer"}`} aria-label="Previous Page">
                        <CaretLeft size={14} weight="bold" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button key={pageNum} onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-bold transition-all cursor-pointer ${pageNum === currentPage ? "bg-[#E7040D] text-white shadow-2xs" : "text-zinc-700 hover:bg-zinc-100"}`}>
                          <span>{pageNum}</span>
                        </button>
                      ))}
                      <button onClick={() => { if (currentPage < totalPages) { setCurrentPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); } }} disabled={currentPage === totalPages} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${currentPage === totalPages ? "text-zinc-300 bg-zinc-50 cursor-not-allowed" : "text-zinc-700 hover:bg-zinc-100 cursor-pointer"}`} aria-label="Next Page">
                        <CaretRight size={14} weight="bold" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 px-4 text-center flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 bg-[#85D4FF] rounded-sm p-4 shadow-[12px_18px_32px_-6px_rgba(0,100,200,0.22)] transform -rotate-2 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between select-none">
                  <div className="absolute top-0 left-0 right-0 h-4 bg-black/5 pointer-events-none" />
                  <div className="w-full h-full border border-sky-400/40 rounded-sm p-2 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 100 100" fill="none" stroke="#0355D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20 opacity-85">
                      <path d="M15 70h70M25 70v15M75 70v15" />
                      <path d="M30 45h40v25H30z" />
                      <path d="M40 70v-10h20v10" />
                      <path d="M35 30h30v15H35z" />
                      <path d="M45 20h10v10H45z" />
                      <circle cx="50" cy="15" r="3" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-[24px] sm:text-[26px] font-black text-zinc-950 mt-10 mb-2 tracking-tight">No jobs in sight</h3>
                <p className="text-[14.5px] sm:text-[15.5px] text-zinc-600 leading-relaxed max-w-md">No roles match these filters right now.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export function JobsPreviewClient({ jobs }: { jobs: any[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
      <JobsPreviewInner jobs={jobs} />
    </Suspense>
  );
}
