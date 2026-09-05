"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  MapPin,
  Tag,
  Globe,
  Heart,
  CaretLeft,
  CaretRight,
  CaretDown,
  Briefcase,
  Users,
  Buildings,
  CheckCircle,
} from "@phosphor-icons/react";
import { SAMPLE_COMPANIES, CompanyItem } from "@/data/companies";
import { SAMPLE_JOBS } from "@/data/jobs";
import { JobCard } from "@/components/jobs/job-card";
import { AppHeader } from "@/components/navigation/app-header";

/* ─────────────────────────────────────────────────────────────
   Authentic Company Vector Marks
───────────────────────────────────────────────────────────── */
function CompanyHeroMark({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("paystack")) {
    return (
      <div className="w-20 h-20 rounded-none bg-[#00C3F8] border border-zinc-200/90 shadow-md flex items-center justify-center p-4">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
          <path d="M15 22h70v16H15zM15 44h45v16H15zM15 66h70v16H15z" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (n.includes("flutterwave")) {
    return (
      <div className="w-20 h-20 rounded-none bg-[#FB4E2D] border border-zinc-200/90 shadow-md flex items-center justify-center p-4">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 50c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="white" strokeWidth="12" strokeLinecap="round" />
          <path d="M32 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#FFCD00" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (n.includes("moniepoint")) {
    return (
      <div className="w-20 h-20 rounded-none bg-[#0355D4] border border-zinc-200/90 shadow-md flex items-center justify-center p-4 text-white">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M22 22l28 28-28 28V22zM78 22L50 50l28 28V22z" fill="white" />
        </svg>
      </div>
    );
  }
  if (n.includes("andela")) {
    return (
      <div className="w-20 h-20 rounded-none bg-[#3359DF] border border-zinc-200/90 shadow-md flex items-center justify-center p-3 text-white">
        <span className="font-black text-3xl tracking-tighter">A</span>
      </div>
    );
  }
  if (n.includes("kuda")) {
    return (
      <div className="w-20 h-20 rounded-none bg-[#40196D] border border-zinc-200/90 shadow-md flex items-center justify-center p-3 text-white">
        <span className="font-black text-lg tracking-tight">kuda.</span>
      </div>
    );
  }
  if (n.includes("chowdeck")) {
    return (
      <div className="w-20 h-20 rounded-none bg-[#0C1222] border border-zinc-200/90 shadow-md flex items-center justify-center p-3 text-white font-black text-sm">
        CHOW
      </div>
    );
  }
  if (n.includes("bamboo")) {
    return (
      <div className="w-20 h-20 rounded-none bg-[#00875A] border border-zinc-200/90 shadow-md flex items-center justify-center p-3 text-white font-black text-sm">
        BAMBOO
      </div>
    );
  }
  return (
    <div className="w-20 h-20 rounded-none bg-[#E7040D] border border-zinc-200/90 shadow-md flex items-center justify-center text-white font-bold text-xl">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function CompanyDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = (params?.slug as string) || "paystack";
  const initialTab = searchParams.get("tab") || "about";

  const [activeTab, setActiveTab] = useState<"about" | "jobs" | "teams" | "offices">(
    (initialTab as any) || "about"
  );
  const [isFollowed, setIsFollowed] = useState(false);

  // Find Company Data
  const company = useMemo(() => {
    return (
      SAMPLE_COMPANIES.find((c) => c.slug === slug || c.id === slug) ||
      SAMPLE_COMPANIES[0]
    );
  }, [slug]);

  // Open jobs for this company
  const companyJobs = useMemo(() => {
    return SAMPLE_JOBS.filter(
      (j) =>
        j.company.slug.toLowerCase().includes(company.slug.toLowerCase()) ||
        j.company.name.toLowerCase().includes(company.name.toLowerCase())
    );
  }, [company]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      
      {/* 1. Standard Design System Header */}
      <AppHeader activeTab="companies" />

      {/* 2. Main Page Content */}
      <main className="flex-1 w-full max-w-[1100px] mx-auto py-8 px-6 sm:px-8 space-y-8">
        
        {/* Floating Centered Tab Switcher (100% Clone with Trax Brand Colors) */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1 p-1 bg-white rounded-xl border border-zinc-200/90 shadow-2xs">
            {/* Left Caret */}
            <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-800 cursor-pointer">
              <CaretLeft size={13} weight="bold" />
            </button>

            {/* About Tab */}
            <button
              onClick={() => setActiveTab("about")}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                activeTab === "about"
                  ? "bg-[#E7040D] text-white shadow-xs"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              About
            </button>

            {/* Jobs Tab with Count */}
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "jobs"
                  ? "bg-[#E7040D] text-white shadow-xs"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <span>Jobs</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-extrabold ${
                activeTab === "jobs" ? "bg-white/20 text-white" : "bg-black/5 text-zinc-900"
              }`}>
                {companyJobs.length || company.openJobsCount}
              </span>
            </button>

            {/* Teams Tab */}
            <button
              onClick={() => setActiveTab("teams")}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                activeTab === "teams"
                  ? "bg-[#E7040D] text-white shadow-xs"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Teams
            </button>

            {/* Offices & remote Tab */}
            <button
              onClick={() => setActiveTab("offices")}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                activeTab === "offices"
                  ? "bg-[#E7040D] text-white shadow-xs"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Offices & remote
            </button>

            {/* Right Caret */}
            <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-800 cursor-pointer">
              <CaretRight size={13} weight="bold" />
            </button>
          </div>
        </div>

        {/* Company Hero Card (100% Matching Reference Screenshot) */}
        <div className="bg-[#F6F4F0] rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center justify-center relative overflow-hidden border border-zinc-200/60 shadow-xs">
          
          {/* Centered Square Emblem */}
          <div className="mb-6">
            <CompanyHeroMark name={company.name} />
          </div>

          {/* Company Title */}
          <h1 className="text-[32px] sm:text-[40px] font-black text-[#1F1F1F] tracking-tight mb-4">
            {company.name}
          </h1>

          {/* Metadata Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[13px] font-medium text-zinc-700 mb-6">
            {/* Location */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-zinc-200/70 shadow-2xs">
              <MapPin size={14} weight="bold" className="text-zinc-500" />
              <span>{company.location} (HQ)</span>
            </span>

            {/* Sector */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-zinc-200/70 shadow-2xs">
              <Tag size={14} weight="bold" className="text-zinc-500" />
              <span>{company.industry}</span>
            </span>

            {/* Website Link */}
            <a
              href={`https://${company.slug}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-zinc-200/70 shadow-2xs hover:text-[#E7040D] transition-colors"
            >
              <Globe size={14} weight="bold" className="text-zinc-500" />
              <span>https://www.{company.slug}.com/</span>
            </a>
          </div>

          {/* Follow Button */}
          <button
            onClick={() => setIsFollowed(!isFollowed)}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13.5px] font-bold border transition-all cursor-pointer shadow-2xs ${
              isFollowed
                ? "bg-[#E7040D] border-[#E7040D] text-white"
                : "bg-white hover:bg-zinc-50 border-zinc-300/80 text-[#1F1F1F]"
            }`}
          >
            <Heart size={15} weight={isFollowed ? "fill" : "bold"} className={isFollowed ? "text-white" : "text-zinc-600"} />
            <span>{isFollowed ? "Following" : "Follow"}</span>
          </button>

        </div>

        {/* Tab Content Panels */}
        <div className="space-y-6">
          
          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <div className="space-y-8">
              {/* Overview Box */}
              <div className="bg-white rounded-none border border-zinc-200/90 p-8 sm:p-10 space-y-4 shadow-2xs">
                <h2 className="text-[20px] font-black text-[#1F1F1F] tracking-tight">
                  About {company.name}
                </h2>
                <p className="text-[15px] text-zinc-600 leading-relaxed max-w-3xl">
                  {company.bio}
                </p>
                <p className="text-[15px] text-zinc-600 leading-relaxed max-w-3xl">
                  Rooted in the African digital economy, {company.name} combines cutting-edge engineering standards with local market execution to scale solutions across West Africa and global markets.
                </p>
              </div>

              {/* Company Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white rounded-none border border-zinc-200/90 p-6 shadow-2xs">
                  <div className="flex items-center gap-3 mb-2">
                    <Users size={18} weight="bold" className="text-[#E7040D]" />
                    <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-wider">Company Size</h4>
                  </div>
                  <p className="text-[16px] font-black text-[#1F1F1F]">{company.employeesCount}</p>
                </div>

                <div className="bg-white rounded-none border border-zinc-200/90 p-6 shadow-2xs">
                  <div className="flex items-center gap-3 mb-2">
                    <Buildings size={18} weight="bold" className="text-[#E7040D]" />
                    <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-wider">Ecosystem Status</h4>
                  </div>
                  <p className="text-[16px] font-black text-[#1F1F1F]">Verified Partner</p>
                </div>

                <div className="bg-white rounded-none border border-zinc-200/90 p-6 shadow-2xs">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase size={18} weight="bold" className="text-[#E7040D]" />
                    <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-wider">Live Open Roles</h4>
                  </div>
                  <p className="text-[16px] font-black text-[#1F1F1F]">{companyJobs.length} active positions</p>
                </div>
              </div>
            </div>
          )}

          {/* JOBS TAB */}
          {activeTab === "jobs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-[20px] font-black text-[#1F1F1F] tracking-tight">
                  Open Positions at {company.name} ({companyJobs.length})
                </h2>
              </div>

              {companyJobs.length > 0 ? (
                <div className="space-y-4">
                  {companyJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-none border border-zinc-200/90 p-12 text-center text-zinc-600">
                  No open jobs currently listed for {company.name}. Check back soon!
                </div>
              )}
            </div>
          )}

          {/* TEAMS TAB */}
          {activeTab === "teams" && (
            <div className="bg-white rounded-none border border-zinc-200/90 p-8 sm:p-10 space-y-6 shadow-2xs">
              <h2 className="text-[20px] font-black text-[#1F1F1F] tracking-tight">
                Teams at {company.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-zinc-50 border border-zinc-200/70">
                  <h3 className="text-[16px] font-black text-zinc-900 mb-1">Engineering & Infrastructure</h3>
                  <p className="text-[13.5px] text-zinc-600 leading-relaxed">
                    Builds resilient payment routes, high-throughput database clusters, and secure APIs processing millions of daily requests.
                  </p>
                </div>
                <div className="p-5 bg-zinc-50 border border-zinc-200/70">
                  <h3 className="text-[16px] font-black text-zinc-900 mb-1">Product Design & Systems</h3>
                  <p className="text-[13.5px] text-zinc-600 leading-relaxed">
                    Architects unified design languages, merchant dashboards, and mobile checkout flows with accessibility at the core.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* OFFICES TAB */}
          {activeTab === "offices" && (
            <div className="bg-white rounded-none border border-zinc-200/90 p-8 sm:p-10 space-y-4 shadow-2xs">
              <h2 className="text-[20px] font-black text-[#1F1F1F] tracking-tight">
                Offices & Remote Work Policy
              </h2>
              <p className="text-[14.5px] text-zinc-600 leading-relaxed">
                <strong>Headquarters:</strong> {company.location}
              </p>
              <p className="text-[14.5px] text-zinc-600 leading-relaxed">
                <strong>Work Policy:</strong> Hybrid flexibility with options for remote candidates across Nigeria and the wider African tech ecosystem.
              </p>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default function CompanyDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
      <CompanyDetailContent />
    </Suspense>
  );
}
