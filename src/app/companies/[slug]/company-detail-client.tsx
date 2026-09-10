"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Tag,
  Globe,
  Heart,
  CaretLeft,
  CaretRight,
  Users,
  Buildings,
  Briefcase,
} from "@phosphor-icons/react";
import { JobCard } from "@/components/jobs/job-card";
import { AppHeader } from "@/components/navigation/app-header";

function CompanyHeroMark({ name, logo, accentColor }: { name: string; logo: string; accentColor: string }) {
  if (logo) {
    return (
      <div className="w-20 h-20 rounded-none bg-white border border-zinc-200/90 shadow-md flex items-center justify-center p-2 overflow-hidden">
        <Image src={logo} alt={name} width={80} height={80} className="object-contain w-full h-full" unoptimized />
      </div>
    );
  }
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
  return (
    <div
      className="w-20 h-20 rounded-none border border-zinc-200/90 shadow-md flex items-center justify-center text-white font-bold text-xl"
      style={{ backgroundColor: accentColor || "#1F1F1F" }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function CompanyDetailClient({
  company,
  companyJobs,
}: {
  company: any;
  companyJobs: any[];
}) {
  const [activeTab, setActiveTab] = useState<"about" | "jobs" | "teams" | "offices">("about");
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "jobs" || tab === "about" || tab === "teams" || tab === "offices") {
        setActiveTab(tab);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <AppHeader activeTab="companies" />

      <main className="flex-1 w-full max-w-[1100px] mx-auto py-8 px-6 sm:px-8 space-y-8">

        {/* Tab Switcher */}
        <div className="w-full max-w-full overflow-x-auto no-scrollbar py-1 flex items-center justify-start sm:justify-center">
          <div className="inline-flex items-center gap-1 p-1 bg-white rounded-xl border border-zinc-200/90 shadow-2xs shrink-0">
            <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-800 cursor-pointer">
              <CaretLeft size={13} weight="bold" />
            </button>

            {(["about", "jobs", "teams", "offices"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-150 cursor-pointer flex items-center gap-1.5 whitespace-nowrap active:scale-95 select-none ${activeTab === tab ? "bg-[#E7040D] text-white shadow-xs" : "text-zinc-700 hover:bg-zinc-50"}`}
              >
                <span className="capitalize">{tab === "offices" ? "Offices & remote" : tab}</span>
                {tab === "jobs" && (
                  <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-extrabold ${activeTab === "jobs" ? "bg-white/20 text-white" : "bg-black/5 text-zinc-900"}`}>
                    {companyJobs.length || company.openJobsCount}
                  </span>
                )}
              </button>
            ))}

            <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-800 cursor-pointer active:scale-90 transition-all">
              <CaretRight size={13} weight="bold" />
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-[#F6F4F0] rounded-3xl p-6 sm:p-10 lg:p-14 text-center flex flex-col items-center justify-center relative overflow-hidden border border-zinc-200/60 shadow-xs">
          <div className="mb-6">
            <CompanyHeroMark name={company.name} logo={company.logo} accentColor={company.accentColor} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F1F1F] tracking-tight mb-3">{company.name}</h1>
          <p className="text-[15px] sm:text-[16px] text-zinc-600 max-w-xl mx-auto leading-relaxed mb-6 font-medium">
            {company.tagline || company.bio.slice(0, 100) + "..."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[13px] font-medium text-zinc-700 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-zinc-200/70 shadow-2xs">
              <MapPin size={14} weight="bold" className="text-zinc-500" />
              <span>{company.location || "Nigeria"} (HQ)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-zinc-200/70 shadow-2xs">
              <Tag size={14} weight="bold" className="text-zinc-500" />
              <span>{company.industry}</span>
            </span>
            {company.website && (
              <a href={company.website.startsWith("http") ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-zinc-200/70 shadow-2xs hover:text-[#E7040D] active:scale-95 transition-all">
                <Globe size={14} weight="bold" className="text-zinc-500" />
                <span>{company.website.replace(/^https?:\/\//, "")}</span>
              </a>
            )}
          </div>

          <button
            onClick={() => setIsFollowed(!isFollowed)}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13.5px] font-bold border transition-all duration-150 cursor-pointer shadow-2xs active:scale-95 select-none ${isFollowed ? "bg-[#E7040D] border-[#E7040D] text-white" : "bg-white hover:bg-zinc-50 border-zinc-300/80 text-[#1F1F1F]"}`}
          >
            <Heart size={15} weight={isFollowed ? "fill" : "bold"} className={`${isFollowed ? "text-white scale-110" : "text-zinc-600"} transition-transform`} />
            <span>{isFollowed ? "Following" : "Follow"}</span>
          </button>
        </div>

        {/* Tab Panels */}
        <div className="space-y-6">

          {activeTab === "about" && (
            <div className="space-y-8">
              <div className="bg-white rounded-none border border-zinc-200/90 p-8 sm:p-10 space-y-4 shadow-2xs">
                <h2 className="text-[20px] font-black text-[#1F1F1F] tracking-tight">About {company.name}</h2>
                <p className="text-[15px] text-zinc-600 leading-relaxed max-w-3xl">{company.bio}</p>
                <p className="text-[15px] text-zinc-600 leading-relaxed max-w-3xl">
                  Rooted in the African digital economy, {company.name} combines cutting-edge engineering standards with local market execution to scale solutions across West Africa and global markets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white rounded-none border border-zinc-200/90 p-6 shadow-2xs">
                  <div className="flex items-center gap-3 mb-2">
                    <Users size={18} weight="bold" className="text-[#E7040D]" />
                    <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-wider">Company Size</h4>
                  </div>
                  <p className="text-[16px] font-black text-[#1F1F1F]">{company.employeesCount || "Growing team"}</p>
                </div>
                <div className="bg-white rounded-none border border-zinc-200/90 p-6 shadow-2xs">
                  <div className="flex items-center gap-3 mb-2">
                    <Buildings size={18} weight="bold" className="text-[#E7040D]" />
                    <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-wider">Ecosystem Status</h4>
                  </div>
                  <p className="text-[16px] font-black text-[#1F1F1F]">{company.verified ? "Verified Partner" : "Listed Company"}</p>
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

          {activeTab === "teams" && (
            <div className="bg-white rounded-none border border-zinc-200/90 p-8 sm:p-10 space-y-6 shadow-2xs">
              <h2 className="text-[20px] font-black text-[#1F1F1F] tracking-tight">Teams at {company.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-zinc-50 border border-zinc-200/70">
                  <h3 className="text-[16px] font-black text-zinc-900 mb-1">Engineering &amp; Infrastructure</h3>
                  <p className="text-[13.5px] text-zinc-600 leading-relaxed">Builds resilient payment routes, high-throughput database clusters, and secure APIs processing millions of daily requests.</p>
                </div>
                <div className="p-5 bg-zinc-50 border border-zinc-200/70">
                  <h3 className="text-[16px] font-black text-zinc-900 mb-1">Product Design &amp; Systems</h3>
                  <p className="text-[13.5px] text-zinc-600 leading-relaxed">Architects unified design languages, merchant dashboards, and mobile checkout flows with accessibility at the core.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "offices" && (
            <div className="bg-white rounded-none border border-zinc-200/90 p-8 sm:p-10 space-y-4 shadow-2xs">
              <h2 className="text-[20px] font-black text-[#1F1F1F] tracking-tight">Offices &amp; Remote Work Policy</h2>
              <p className="text-[14.5px] text-zinc-600 leading-relaxed">
                <strong>Headquarters:</strong> {company.location || "Nigeria"}
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
