"use client";

import { useState, useEffect, useMemo, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CaretLeft,
  CaretDown,
  CaretUp,
  Briefcase,
  MapPin,
  BookmarkSimple,
  CalendarBlank,
  ShareNetwork,
  ArrowSquareOut,
  Users,
  Tag,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  Check,
} from "@phosphor-icons/react";
import { SAMPLE_JOBS } from "@/data/jobs";
import { SAMPLE_COMPANIES } from "@/data/companies";
import { AppHeader } from "@/components/navigation/app-header";
import { Footer } from "@/components/footer";
import { Job } from "@/types";

/* ─────────────────────────────────────────────────────────────
   Authentic Company Vector Marks
───────────────────────────────────────────────────────────── */
function CompanyLogoMark({ name, className = "w-12 h-12" }: { name: string; className?: string }) {
  const n = name.toLowerCase();
  if (n.includes("paystack")) {
    return (
      <div className={`${className} bg-[#00C3F8]/10 border border-[#00C3F8]/20 flex items-center justify-center p-2 shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#00C3F8]">
          <path d="M15 22h70v16H15zM15 44h45v16H15zM15 66h70v16H15z" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (n.includes("flutterwave")) {
    return (
      <div className={`${className} bg-[#FB4E2D]/10 border border-[#FB4E2D]/20 flex items-center justify-center p-2 shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 50c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#FB4E2D" strokeWidth="12" strokeLinecap="round" />
          <path d="M32 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#FF9B00" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (n.includes("moniepoint") || n.includes("nomba")) {
    return (
      <div className={`${className} bg-[#0355D4]/10 border border-[#0355D4]/20 flex items-center justify-center p-2 shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M22 22l28 28-28 28V22zM78 22L50 50l28 28V22z" fill="#0355D4" />
        </svg>
      </div>
    );
  }
  if (n.includes("andela")) {
    return (
      <div className={`${className} bg-[#3359DF]/10 border border-[#3359DF]/20 flex items-center justify-center p-2 shrink-0`}>
        <span className="text-[#3359DF] font-black text-xl tracking-tighter">A</span>
      </div>
    );
  }
  if (n.includes("kuda")) {
    return (
      <div className={`${className} bg-[#40196D]/10 border border-[#40196D]/20 flex items-center justify-center p-2 shrink-0`}>
        <span className="text-[#40196D] font-black text-sm tracking-tight">kuda.</span>
      </div>
    );
  }
  if (n.includes("chowdeck")) {
    return (
      <div className={`${className} bg-[#0C1222]/10 border border-[#0C1222]/20 flex items-center justify-center p-2 shrink-0 font-black text-xs text-[#0C1222]`}>
        CHOW
      </div>
    );
  }
  if (n.includes("bamboo")) {
    return (
      <div className={`${className} bg-[#00875A]/10 border border-[#00875A]/20 flex items-center justify-center p-2 shrink-0 font-black text-xs text-[#00875A]`}>
        BAMBOO
      </div>
    );
  }
  if (n.includes("helium health")) {
    return (
      <div className={`${className} bg-[#0284C7]/10 border border-[#0284C7]/20 flex items-center justify-center p-2 shrink-0 font-black text-xs text-[#0284C7]`}>
        HELIUM
      </div>
    );
  }
  return (
    <div className={`${className} bg-[#1F1F1F] text-white flex items-center justify-center font-bold text-sm shrink-0`}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

// 4-Photo verified team gallery
const CULTURE_GALLERY_SETS = [
  [
    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  [
    "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
];

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const id = resolvedParams.id;

  const job: Job = useMemo(() => {
    const found = SAMPLE_JOBS.find((j) => j.id === id || j.slug === id);
    return found || SAMPLE_JOBS[0];
  }, [id]);

  const company = useMemo(() => {
    return SAMPLE_COMPANIES.find(
      (c) => c.slug.toLowerCase() === job.company.slug.toLowerCase() ||
             c.name.toLowerCase() === job.company.name.toLowerCase()
    );
  }, [job]);

  const allCompanyJobsCount = useMemo(() => {
    const matches = SAMPLE_JOBS.filter(
      (j) => j.company.name.toLowerCase() === job.company.name.toLowerCase()
    );
    return matches.length > 0 ? matches.length : company?.openJobsCount || 4;
  }, [job, company]);

  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showFullCompanyBio, setShowFullCompanyBio] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSave = () => {
    try {
      const saved = localStorage.getItem("trax_saved_jobs");
      let ids: string[] = saved ? JSON.parse(saved) : [];
      if (ids.includes(job.id)) {
        ids = ids.filter((savedId) => savedId !== job.id);
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

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator.share({
          title: `${job.title} at ${job.company.name} | Trax Jobs`,
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  // 3 distinct key missions exactly matching the reference layout
  const keyMissions = useMemo(() => {
    return [
      `Develop and maintain mission-critical systems and product workflows for ${job.company.name}, ensuring resilience and high operational standards.`,
      `Contribute directly to the architecture and scaling of automated pipelines, collaborating closely with colleagues to understand business requirements and technical priorities.`,
      `Monitor performance and drive ongoing optimization across production environments, establishing benchmark quality for Africa's tech ecosystem.`,
    ];
  }, [job]);

  const gallery = CULTURE_GALLERY_SETS[Math.abs(job.title.length) % CULTURE_GALLERY_SETS.length];

  const formattedRelativeDate = useMemo(() => {
    const posted = new Date(job.postedDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  }, [job.postedDate]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1F1F1F] flex flex-col font-sans">
      <AppHeader activeTab="jobs" />

      {/* ─────────────────────────────────────────────────────────────
          STICKY TOP BAR ON SCROLL
      ───────────────────────────────────────────────────────────── */}
      {showStickyNav && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 shadow-sm transition-all duration-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-4">
            
            {/* Left: Back Button & Title Details */}
            <div className="flex items-center gap-6 min-w-0">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-zinc-700 hover:text-[#E7040D] transition-colors cursor-pointer shrink-0"
              >
                <CaretLeft size={16} weight="bold" />
                <span>Back</span>
              </button>

              <div className="min-w-0 hidden sm:block">
                <h2 className="text-[15px] font-black text-[#1F1F1F] truncate">
                  {job.title}
                </h2>
                <p className="text-[12px] text-zinc-500 font-medium truncate">
                  {job.contractType === "Permanent" ? "Permanent contract" : `${job.contractType} contract`} • Salary: {job.salary?.formatted || "Not specified"} • {job.location}
                </p>
              </div>
            </div>

            {/* Right: Apply & Save CTAs */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={job.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13px] font-bold shadow-2xs transition-all cursor-pointer"
              >
                <span>Apply</span>
                <ArrowSquareOut size={14} weight="bold" />
              </a>

              <button
                onClick={toggleSave}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold border transition-all cursor-pointer ${
                  isSaved
                    ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]"
                    : "bg-white hover:bg-zinc-50 border-zinc-200 text-[#1F1F1F]"
                }`}
              >
                <BookmarkSimple size={15} weight={isSaved ? "fill" : "bold"} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Top Back Navigation Bar */}
      <div className="bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-2">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-zinc-700 hover:text-[#E7040D] transition-colors cursor-pointer"
          >
            <CaretLeft size={16} weight="bold" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ══════════════════════════════════════════════════════════════════
              LEFT COLUMN: HERO CARD + POSITION DETAILS
          ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. TOP HERO CARD */}
            <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-8">
              
              {/* Company Logo Mark + Name Badge */}
              <div className="flex items-center gap-2.5 mb-4">
                <CompanyLogoMark name={job.company.name} className="w-8 h-8" />
                <span className="text-[12.5px] font-black tracking-wider uppercase text-[#1F1F1F]">
                  {job.company.name}
                </span>
              </div>

              {/* Big Job Title */}
              <h1 className="text-3xl sm:text-[34px] font-black text-[#1F1F1F] tracking-[-0.02em] leading-tight mb-8">
                {job.title}
              </h1>

              {/* Row: JOB SUMMARY (Left) & SKILLS & EXPERTISE (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b border-zinc-100">
                
                {/* Left 5 Cols: JOB SUMMARY */}
                <div className="md:col-span-5 space-y-3">
                  <h3 className="text-[11.5px] font-bold tracking-wider uppercase text-[#1F1F1F]">
                    JOB SUMMARY
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Contract */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                      <Briefcase size={13} weight="bold" className="text-zinc-500" />
                      <span>{job.contractType === "Permanent" ? "Permanent contract" : `${job.contractType} contract`}</span>
                    </span>

                    {/* Location */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                      <MapPin size={13} weight="bold" className="text-zinc-500" />
                      <span>{job.location}</span>
                    </span>

                    {/* Salary */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                      <span>Salary: {job.salary?.formatted || "Not specified"}</span>
                    </span>
                  </div>
                </div>

                {/* Right 7 Cols: SKILLS & EXPERTISE (No AI Star Icons) */}
                <div className="md:col-span-7 space-y-3">
                  <h3 className="text-[11.5px] font-bold tracking-wider uppercase text-[#1F1F1F]">
                    SKILLS & EXPERTISE
                  </h3>

                  <div className="flex flex-wrap items-center gap-2">
                    {job.tags.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80"
                      >
                        {skill}
                      </span>
                    ))}
                    <span className="inline-flex items-center px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                      Collaboration and teamwork
                    </span>
                    <span className="inline-flex items-center px-2 py-1.5 bg-[#FAFAFA] text-zinc-600 text-[12px] font-bold border border-zinc-200/80">
                      +2
                    </span>
                  </div>
                </div>

              </div>

              {/* KEY MISSIONS (No AI Star Icons) */}
              <div className="py-8 border-b border-zinc-100">
                <h3 className="text-[11.5px] font-bold tracking-wider uppercase text-[#1F1F1F] mb-4">
                  KEY MISSIONS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {keyMissions.map((mission, idx) => (
                    <div
                      key={idx}
                      className="text-[13.5px] text-zinc-600 leading-relaxed font-normal"
                    >
                      {mission}
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTTOM ACTIONS BAR */}
              <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                
                {/* Primary Apply & Save */}
                <div className="flex items-center gap-3">
                  <a
                    href={job.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold shadow-2xs transition-all cursor-pointer"
                  >
                    <span>Apply</span>
                    <ArrowSquareOut size={15} weight="bold" />
                  </a>

                  <button
                    onClick={toggleSave}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold border transition-all cursor-pointer ${
                      isSaved
                        ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]"
                        : "bg-white hover:bg-zinc-50 border-zinc-200 text-[#1F1F1F]"
                    }`}
                  >
                    <BookmarkSimple size={15} weight={isSaved ? "fill" : "bold"} />
                    <span>{isSaved ? "Saved" : "Save"}</span>
                  </button>
                </div>

                {/* Relative Date & Share */}
                <div className="flex items-center gap-5 text-[12.5px] text-zinc-500">
                  <div className="inline-flex items-center gap-1.5">
                    <CalendarBlank size={15} weight="regular" />
                    <span>{formattedRelativeDate}</span>
                  </div>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 text-zinc-700 hover:text-[#E7040D] font-semibold transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={15} weight="bold" className="text-emerald-600" />
                        <span className="text-emerald-600">Link copied</span>
                      </>
                    ) : (
                      <>
                        <ShareNetwork size={15} weight="bold" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

            {/* 2. THE POSITION SECTION */}
            <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-8 space-y-6">
              
              {/* Heading: — The position (Using Trax Red #E7040D dash) */}
              <div className="flex items-center gap-2">
                <span className="text-[#E7040D] font-bold text-2xl">—</span>
                <h2 className="text-2xl font-black text-[#1F1F1F] tracking-tight">
                  The position
                </h2>
              </div>

              {/* Subheading: Job description */}
              <div className="pt-2">
                <h3 className="text-lg font-black text-[#1F1F1F] tracking-tight mb-4">
                  Job description
                </h3>

                {/* Subsection: Overview */}
                <h4 className="text-[14px] font-bold text-[#1F1F1F] mb-3">
                  Overview
                </h4>

                <div className="space-y-4 text-[14px] text-zinc-700 leading-relaxed">
                  <p>
                    We&apos;re {job.company.name}, a passionate team building world-class technology infrastructure. Guided by our purpose of building resilient digital solutions for Africa and global markets, we believe in crafting software that makes a tangible difference every day. Join us and help shape the future of tech.
                  </p>
                  <p>
                    This is an opportunity to make a significant impact across one of the fastest-growing technology ecosystems. We are looking for a {job.title} who will support the delivery, reliability, and operational excellence of advanced systems created by our engineering organization.
                  </p>

                  {/* Expandable Extra Details */}
                  {showFullOverview && (
                    <div className="space-y-4 pt-2">
                      <p>
                        You will work as part of a high-performing team to build scalable architectures, ensuring solutions are robust, efficient, and suitable for a high-volume live environment. You will collaborate with engineering, product, and architecture colleagues to improve tools, processes, and practices that accelerate our velocity.
                      </p>
                      {job.description.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setShowFullOverview(!showFullOverview)}
                    className="inline-flex items-center gap-1 text-[13px] font-bold text-zinc-900 hover:text-[#E7040D] pt-2 cursor-pointer transition-colors"
                  >
                    <span>{showFullOverview ? "View less" : "View more"}</span>
                    {showFullOverview ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}
                  </button>
                </div>
              </div>

              {/* Subsection: Profile / Requirements */}
              <div className="pt-6 border-t border-zinc-100">
                <h4 className="text-[14px] font-bold text-[#1F1F1F] mb-3">
                  Profile & Requirements
                </h4>
                <ul className="space-y-3">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[14px] text-zinc-700 leading-relaxed">
                      <CheckCircle size={17} weight="fill" className="text-[#E7040D] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-[14px] text-zinc-700 leading-relaxed">
                    <CheckCircle size={17} weight="fill" className="text-[#E7040D] shrink-0 mt-0.5" />
                    <span>Strong problem solving ability, proactive communication, and ability to thrive in asynchronous distributed teams.</span>
                  </li>
                </ul>
              </div>

              {/* Subsection: Benefits */}
              <div className="pt-6 border-t border-zinc-100">
                <h4 className="text-[14px] font-bold text-[#1F1F1F] mb-3">
                  What we offer
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((b, idx) => (
                    <li key={idx} className="p-3 bg-[#FAFAFA] border border-zinc-200/80 text-[13px] text-zinc-800 font-medium">
                      {b}
                    </li>
                  ))}
                  <li className="p-3 bg-[#FAFAFA] border border-zinc-200/80 text-[13px] text-zinc-800 font-medium">
                    Flexible remote work allowances & home office setup support.
                  </li>
                  <li className="p-3 bg-[#FAFAFA] border border-zinc-200/80 text-[13px] text-zinc-800 font-medium">
                    Comprehensive healthcare covering primary health and dependents.
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT SIDEBAR: PHOTO MOSAIC + DISCOVER BANNER + THE COMPANY
          ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. 2x2 Photo Showcase Grid */}
            <div className="grid grid-cols-2 gap-1.5 bg-white p-2 border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              {gallery.map((photoUrl, idx) => (
                <div key={idx} className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <Image
                    src={photoUrl}
                    alt={`${job.company.name} team`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {/* 2. "Discover the company" Banner Card (Trax Brand Palette: #161616 / #0C1222 Dark with Red accents) */}
            <div className="bg-[#161616] text-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-zinc-800">
              <h3 className="text-xl font-black tracking-tight mb-2 text-white">
                Discover the company
              </h3>
              <p className="text-[13.5px] font-medium text-zinc-300 leading-relaxed mb-6">
                Explore the company&apos;s profile or follow them to find out if they&apos;re the right fit!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href={`/companies/${job.company.slug}`}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13px] font-bold transition-all text-center cursor-pointer"
                >
                  <span>Explore the company</span>
                  <ArrowUpRight size={14} weight="bold" />
                </Link>

                <a
                  href={`https://${job.company.slug}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-zinc-600 hover:border-white hover:bg-white hover:text-[#161616] text-zinc-200 text-[13px] font-bold transition-all text-center cursor-pointer"
                >
                  Follow
                </a>
              </div>
            </div>

            {/* 3. "— The company" Card */}
            <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 space-y-6">
              
              {/* Heading: — The company (Using Trax Red #E7040D dash) */}
              <div className="flex items-center gap-2">
                <span className="text-[#E7040D] font-bold text-2xl">—</span>
                <h3 className="text-xl font-black text-[#1F1F1F] tracking-tight">
                  The company
                </h3>
              </div>

              {/* Logo & Name */}
              <div className="flex items-center gap-3">
                <CompanyLogoMark name={job.company.name} className="w-10 h-10" />
                <span className="text-[13.5px] font-black uppercase text-[#1F1F1F]">
                  {job.company.name}
                </span>
              </div>

              {/* Badges: Industry, Employees, Founded */}
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-zinc-700 font-medium">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] border border-zinc-200/80">
                  <Tag size={13} weight="bold" className="text-zinc-500" />
                  <span>{job.company.industry}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] border border-zinc-200/80">
                  <Users size={13} weight="bold" className="text-zinc-500" />
                  <span>{job.company.employeesCount} employees</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] border border-zinc-200/80">
                  <CalendarBlank size={13} weight="bold" className="text-zinc-500" />
                  <span>Founded in 2015</span>
                </span>
              </div>

              {/* Links: View website • View all jobs [count] */}
              <div className="flex items-center gap-3 pt-1 text-[13px] font-bold">
                <a
                  href={`https://${job.company.slug}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-900 hover:text-[#E7040D] transition-colors"
                >
                  <span>View website</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </a>

                <span className="text-zinc-300">•</span>

                <Link
                  href={`/companies/${job.company.slug}?tab=jobs`}
                  className="inline-flex items-center gap-1.5 text-zinc-900 hover:text-[#E7040D] transition-colors"
                >
                  <span>View all jobs</span>
                  <span className="px-1.5 py-0.5 rounded-none bg-[#fce8e0] text-[#E7040D] text-[11px] font-black border border-[#E7040D]/30">
                    {allCompanyJobsCount}
                  </span>
                </Link>
              </div>

              {/* Subsection: Who are they? */}
              <div className="pt-4 border-t border-zinc-100 space-y-3">
                <h4 className="text-[14px] font-bold text-[#1F1F1F]">
                  Who are they?
                </h4>
                <div className="text-[13px] text-zinc-600 leading-relaxed space-y-2">
                  <p>
                    {company?.bio || `${job.company.name} is an ecosystem-leading technology company operating across high-scale markets in Africa and globally. Guided by a relentless focus on customer excellence, engineering precision, and financial enablement.`}
                  </p>
                  {showFullCompanyBio && (
                    <p>
                      The company invests deeply in engineering talent, remote-first practices, and building robust platforms that serve tens of thousands of businesses and millions of active consumers.
                    </p>
                  )}
                  <button
                    onClick={() => setShowFullCompanyBio(!showFullCompanyBio)}
                    className="inline-flex items-center gap-1 text-[12.5px] font-bold text-zinc-900 hover:text-[#E7040D] pt-1 cursor-pointer transition-colors"
                  >
                    <span>{showFullCompanyBio ? "View less" : "View more"}</span>
                    {showFullCompanyBio ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                  </button>
                </div>
              </div>

              {/* Subsection: The workplace */}
              <div className="pt-4 border-t border-zinc-100 space-y-2">
                <h4 className="text-[14px] font-bold text-[#1F1F1F]">
                  The workplace
                </h4>
                <p className="text-[13px] text-zinc-600 leading-relaxed">
                  Headquartered in {job.company.hq}, with regional operational hubs and flexible distributed remote teams across West, East, and South Africa.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
