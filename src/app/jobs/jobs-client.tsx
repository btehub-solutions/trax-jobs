"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { JobCard } from "@/components/jobs/job-card";
import { JobsFilterSidebar } from "@/components/jobs/jobs-filter-sidebar";
import { AppHeader } from "@/components/navigation/app-header";
import { JobFilterState, ExperienceTier } from "@/types";
import {
  CaretDown,
  CaretLeft,
  CaretRight,
  Faders,
} from "@phosphor-icons/react";

export interface SanityJob {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string[];
  requirements: string[];
  benefits: string[];
  location: string;
  workplaceType: string;
  experienceLevel: string;
  roleCategory: string;
  contractType: string;
  salary: { formatted: string; rawMin: number; rawMax: number };
  tags: string[];
  applicationLink: string;
  isFeatured: boolean;
  isVerified: boolean;
  postedDate: string;
  company: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    industry: string;
    location: string;
    employeesCount: string;
    hq: string;
  };
}

function JobsPageInner({ jobs }: { jobs: SanityJob[] }) {
  const searchParams = useSearchParams();
  const titleParam = searchParams.get("title") || searchParams.get("q") || "";
  const expParam = searchParams.get("exp")?.split(",").filter(Boolean) || [];
  const levelParam = searchParams.get("level") || "";
  const initialExp: string[] = [...expParam];
  if (levelParam) {
    const l = levelParam.toLowerCase();
    if (l.includes("no-experience") || l.includes("entry") || l.includes("internship") || l.includes("graduate")) {
      initialExp.push("Entry-level. 0-1 years");
    } else if (l.includes("mid")) {
      initialExp.push("Mid-level. 3-5 years");
    } else if (l.includes("senior")) {
      initialExp.push("Senior. 5-10 years");
    } else if (l.includes("executive")) {
      initialExp.push("Expert. 10+ years");
    }
  }
  const locParam = searchParams.get("location") || "";

  const [sortBy, setSortBy] = useState<"any-time" | "latest" | "salary-high" | "past-24h" | "past-week" | "past-month">("any-time");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const ITEMS_PER_PAGE = 10;

  // Lock body scroll and handle ESC key when mobile filter drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFiltersOpen(false);
    };
    if (mobileFiltersOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const [filters, setFilters] = useState<JobFilterState>({
    search: titleParam,
    roles: [],
    experienceLevels: initialExp as ExperienceTier[],
    locations: locParam ? [locParam] : [],
    contractTypes: [],
    workplaceTypes: [],
  });

  const activeFiltersCount = useMemo(() => {
    return (
      (filters.search ? 1 : 0) +
      filters.roles.length +
      filters.experienceLevels.length +
      filters.locations.length +
      filters.workplaceTypes.length +
      filters.contractTypes.length
    );
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({ search: "", roles: [], experienceLevels: [], locations: [], contractTypes: [], workplaceTypes: [] });
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: JobFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Search term (Title, Company, Tags, Summary, Category)
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          (job.title || "").toLowerCase().includes(q) ||
          (job.company?.name || "").toLowerCase().includes(q) ||
          (job.tags || []).some((t) => t.toLowerCase().includes(q)) ||
          (job.summary || "").toLowerCase().includes(q) ||
          (job.roleCategory || "").toLowerCase().includes(q);
        if (!match) return false;
      }

      // 2. Roles / Category tags
      if (filters.roles.length > 0) {
        const matchRole = filters.roles.some((r) => {
          const q = r.toLowerCase();
          return (
            (job.roleCategory || "").toLowerCase().includes(q) ||
            (job.title || "").toLowerCase().includes(q) ||
            (job.tags || []).some((t) => t.toLowerCase().includes(q))
          );
        });
        if (!matchRole) return false;
      }

      // 3. Experience level (Fuzzy tier matching)
      if (filters.experienceLevels.length > 0) {
        const jExp = (job.experienceLevel || "").toLowerCase();
        const matchExp = filters.experienceLevels.some((sel) => {
          const s = sel.toLowerCase();
          if (s.includes("entry") && jExp.includes("entry")) return true;
          if (s.includes("junior") && jExp.includes("junior")) return true;
          if (s.includes("mid") && jExp.includes("mid")) return true;
          if (s.includes("senior") && jExp.includes("senior")) return true;
          if ((s.includes("expert") || s.includes("lead")) && (jExp.includes("expert") || jExp.includes("lead"))) return true;
          return s === jExp || jExp.includes(s) || s.includes(jExp);
        });
        if (!matchExp) return false;
      }

      // 4. Locations (Matches location string or workplace type)
      if (filters.locations.length > 0) {
        const matchLoc = filters.locations.some((l) => {
          const q = l.toLowerCase();
          return (
            (job.location || "").toLowerCase().includes(q) ||
            (job.workplaceType || "").toLowerCase().includes(q)
          );
        });
        if (!matchLoc) return false;
      }

      // 5. Workplace policy (Remote, Hybrid, On-site)
      if (filters.workplaceTypes.length > 0) {
        const jWp = (job.workplaceType || "").toLowerCase();
        const matchWp = filters.workplaceTypes.some((wp) => {
          const w = wp.toLowerCase();
          if (w.includes("remote") && jWp.includes("remote")) return true;
          if (w.includes("hybrid") && jWp.includes("hybrid")) return true;
          if (w.includes("site") && jWp.includes("site")) return true;
          return w === jWp || jWp.includes(w);
        });
        if (!matchWp) return false;
      }

      // 6. Contract types (Permanent, Contract, Internship, Part-time)
      if (filters.contractTypes.length > 0) {
        const jCt = (job.contractType || "").toLowerCase();
        const matchCt = filters.contractTypes.some((ct) => jCt.includes(ct.toLowerCase()));
        if (!matchCt) return false;
      }

      // 7. Time filters
      if (sortBy === "past-24h") {
        const diffHours = (Date.now() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60);
        if (diffHours > 24) return false;
      } else if (sortBy === "past-week") {
        const diffDays = (Date.now() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays > 7) return false;
      } else if (sortBy === "past-month") {
        const diffDays = (Date.now() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays > 30) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "salary-high") {
        return (b.salary?.rawMax || 0) - (a.salary?.rawMax || 0);
      }
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });
  }, [jobs, filters, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <AppHeader activeTab="jobs" />

      <main className="flex-1 w-full max-w-[1280px] mx-auto py-8 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row items-start gap-8">

          <JobsFilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            onOpenWizard={() => {}}
            totalMatches={filteredJobs.length}
            className="hidden lg:block w-[395px] shrink-0 sticky top-20"
          />

          <div className="flex-1 w-full space-y-5">
            <div id="jobs-results-heading" className="flex items-center justify-between pb-1 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <h1 className="text-[26px] sm:text-[30px] font-extrabold text-zinc-950 tracking-tight shrink-0">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
                </h1>

                {/* Mobile Filter Trigger (< lg) */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200/90 text-[13px] font-bold text-zinc-800 shadow-2xs hover:border-zinc-300 active:scale-95 transition-all cursor-pointer"
                  aria-label="Open job filters"
                >
                  <Faders size={15} weight="bold" className="text-[#E7040D]" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#E7040D] text-white text-[10px] font-extrabold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-white border border-zinc-200/90 text-[13px] sm:text-[13.5px] font-bold text-zinc-800 shadow-2xs focus:outline-hidden cursor-pointer hover:border-zinc-300"
                >
                  <option value="any-time">Any time</option>
                  <option value="past-24h">Past 24 hours</option>
                  <option value="past-week">Past week</option>
                  <option value="past-month">Past month</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="latest">Latest posted</option>
                </select>
                <CaretDown size={14} weight="bold" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
            </div>

            {paginatedJobs.length > 0 ? (
              <div className="space-y-4">
                {paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job as any} />
                ))}

                {totalPages > 1 && (
                  <div className="flex justify-center pt-8 pb-4">
                    <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-white border border-zinc-200/90 shadow-2xs">
                      <button
                        onClick={() => { if (currentPage > 1) { setCurrentPage((p) => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); } }}
                        disabled={currentPage === 1}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${currentPage === 1 ? "text-zinc-300 bg-zinc-50 cursor-not-allowed" : "text-zinc-700 hover:bg-zinc-100 cursor-pointer"}`}
                        aria-label="Previous Page"
                      >
                        <CaretLeft size={14} weight="bold" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-bold transition-all cursor-pointer ${pageNum === currentPage ? "bg-[#E7040D] text-white shadow-2xs" : "text-zinc-700 hover:bg-zinc-100"}`}
                        >
                          <span>{pageNum}</span>
                        </button>
                      ))}

                      <button
                        onClick={() => { if (currentPage < totalPages) { setCurrentPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); } }}
                        disabled={currentPage === totalPages}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${currentPage === totalPages ? "text-zinc-300 bg-zinc-50 cursor-not-allowed" : "text-zinc-700 hover:bg-zinc-100 cursor-pointer"}`}
                        aria-label="Next Page"
                      >
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
                      <path d="M78 25l4 4M82 25l-4 4" strokeWidth="1.5" />
                      <path d="M18 35l3 3M21 35l-3 3" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-[24px] sm:text-[26px] font-black text-zinc-950 mt-10 mb-2 tracking-tight">No jobs in sight</h3>
                <p className="text-[14.5px] sm:text-[15.5px] text-zinc-600 leading-relaxed max-w-md">No roles match these filters right now.</p>
                <p className="text-[14.5px] sm:text-[15.5px] text-zinc-600 leading-relaxed max-w-md mt-0.5">Try widening your search. We add new jobs every day.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Mobile Filter Drawer (< lg) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden flex justify-end transition-opacity duration-300 ${
          mobileFiltersOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileFiltersOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`relative w-full max-w-[400px] h-full bg-white z-10 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out overscroll-contain ${
            mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Filter Jobs"
        >
          <JobsFilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            onOpenWizard={() => {}}
            totalMatches={filteredJobs.length}
            className="w-full h-full flex flex-col"
            onCloseMobile={() => setMobileFiltersOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export function JobsPageClient({ jobs }: { jobs: SanityJob[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
      <JobsPageInner jobs={jobs} />
    </Suspense>
  );
}
