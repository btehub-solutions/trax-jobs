"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppHeader } from "@/components/navigation/app-header";
import { JobCard } from "@/components/jobs/job-card";
import {
  House,
  CaretRight,
  MapPin,
  Users,
  Tag,
  Buildings,
  Globe,
  ShieldCheck,
  Briefcase,
  SealCheck,
  Star,
  Copy,
  Check,
  FacebookLogo,
  XLogo,
  EnvelopeSimple,
  WhatsappLogo,
  Heart,
  ArrowRight,
  DeviceMobile,
} from "@phosphor-icons/react";

/* ─────────────────────────────────────────────────────────────
   Company Logo Mark: uses uploaded logo or authentic SVG vector
───────────────────────────────────────────────────────────── */
function CompanyHeroMark({
  name,
  logo,
  accentColor,
}: {
  name: string;
  logo: string;
  accentColor: string;
}) {
  if (logo) {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none bg-white border border-zinc-200/90 shadow-2xs flex items-center justify-center p-2 overflow-hidden shrink-0">
        <Image
          src={logo}
          alt={name}
          width={80}
          height={80}
          className="object-contain w-full h-full"
          unoptimized
        />
      </div>
    );
  }

  const n = name.toLowerCase();
  if (n.includes("paystack")) {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none bg-white border border-zinc-200/90 shadow-2xs flex items-center justify-center p-3 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#00C3F8]">
          <path d="M15 22h70v16H15zM15 44h45v16H15zM15 66h70v15H15z" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (n.includes("flutterwave")) {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none bg-white border border-zinc-200/90 shadow-2xs flex items-center justify-center p-3 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 50c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#FB4E2D" strokeWidth="12" strokeLinecap="round" />
          <path d="M32 50c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#FF9B00" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (n.includes("moniepoint")) {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none bg-[#0355D4] border border-zinc-200/90 shadow-2xs flex items-center justify-center p-3 text-white shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M22 22l28 28-28 28V22zM78 22L50 50l28 28V22z" fill="white" />
        </svg>
      </div>
    );
  }
  if (n.includes("andela")) {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none bg-white border border-zinc-200/90 shadow-2xs flex items-center justify-center p-2 shrink-0">
        <span className="text-[#3359DF] font-black text-2xl tracking-tighter">A</span>
      </div>
    );
  }
  if (n.includes("kuda")) {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none bg-[#40196D] border border-zinc-200/90 shadow-2xs flex items-center justify-center p-2 shrink-0">
        <span className="text-white font-black text-base tracking-tight">kuda.</span>
      </div>
    );
  }

  return (
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-none border border-zinc-200/90 shadow-2xs flex items-center justify-center text-white font-bold text-xl shrink-0"
      style={{ backgroundColor: accentColor || "#1F1F1F" }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Centered Popup Helper for Social Share
───────────────────────────────────────────────────────────── */
function openCenteredPopup(url: string, title: string, w = 600, h = 540) {
  if (typeof window === "undefined") return;
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
  const width = window.innerWidth || document.documentElement.clientWidth || screen.width;
  const height = window.innerHeight || document.documentElement.clientHeight || screen.height;
  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;
  window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
  );
}

export default function CompanyDetailClient({
  company,
  companyJobs,
}: {
  company: any;
  companyJobs: any[];
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "policy">("overview");
  const [isFollowed, setIsFollowed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "jobs" || tab === "overview" || tab === "policy") {
        setActiveTab(tab as any);
      }
    }
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Explore careers and open roles at ${company.name} on Trax Jobs:`);
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${text}`;
    openCenteredPopup(shareUrl, "Share on X");
  };

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    openCenteredPopup(shareUrl, "Share on Facebook");
  };

  const shareOnWhatsApp = () => {
    const shareText = encodeURIComponent(`Check out ${company.name} careers and active job openings on Trax Jobs: ${currentUrl}`);
    window.open(`https://wa.me/?text=${shareText}`, "_blank");
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent(`${company.name} Careers on Trax Jobs`);
    const body = encodeURIComponent(`Explore careers and verified open roles at ${company.name}:\n\n${currentUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const fallbackCover = "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200";

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans">
      {/* 1. Global Navigation */}
      <AppHeader activeTab="companies" />

      {/* 2. Main Container */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto pt-6 pb-16 px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13.5px] mb-6 select-none min-w-0">
          <Link href="/" className="text-[#E7040D] hover:underline flex items-center gap-1 shrink-0 whitespace-nowrap">
            <House size={16} weight="fill" className="text-[#E7040D]" />
          </Link>
          <CaretRight size={13} weight="bold" className="text-zinc-400 shrink-0" />
          <Link href="/companies" className="text-[#E7040D] hover:underline font-medium shrink-0 whitespace-nowrap">
            All Companies
          </Link>
          <CaretRight size={13} weight="bold" className="text-zinc-400 shrink-0" />
          <span className="text-zinc-500 truncate min-w-0 flex-1">
            {company.name}
          </span>
        </nav>

        {/* 2-Column Grid (Left: 7 cols, Right: 5 cols) matching Course Detail Page */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ─────────────────────────────────────────────────────────────
              Left Column: Cover Banner, Company Title, Rating, Tabs & Body
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-6">

            {/* Feature Cover Banner Container */}
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[360px] rounded-none overflow-hidden border border-zinc-200/90 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950">
              <Image
                src={company.coverImage || fallbackCover}
                alt={`${company.name} office`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating Status Badge in Trax Brand Red */}
              <div className="absolute top-4 right-4 bg-[#E7040D] text-white text-[12px] font-bold px-3.5 py-1 rounded-none flex items-center gap-1.5 shadow-sm">
                <Briefcase size={14} weight="bold" className="text-white" />
                <span>{companyJobs.length > 0 ? `${companyJobs.length} ${companyJobs.length === 1 ? "Open Role" : "Open Roles"}` : "Verified Employer"}</span>
              </div>
            </div>

            {/* Company Identity Header: Logo + Title */}
            <div className="flex items-start gap-4">
              <CompanyHeroMark name={company.name} logo={company.logo} accentColor={company.accentColor} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-[24px] sm:text-[28px] font-bold text-zinc-900 leading-snug tracking-tight">
                    {company.name}
                  </h1>
                  {company.verified !== false && (
                    <SealCheck size={20} weight="fill" className="text-[#E7040D] shrink-0" />
                  )}
                </div>

                {/* Trust / Star Rating Line (Matching Course Page) */}
                <div className="flex items-center gap-2 text-[13.5px] mt-1.5 flex-wrap">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={17} weight="fill" className="text-amber-400" />
                    <span className="font-bold text-zinc-900">4.9/5</span>
                  </div>
                  <span className="text-zinc-400">&bull;</span>
                  <span className="text-zinc-600 font-medium">Verified Trax Partner</span>
                  {company.location && (
                    <>
                      <span className="text-zinc-400">&bull;</span>
                      <span className="text-zinc-500">{company.location.split("•")[0].trim()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Red-Underline Tab Navigation: Overview | Open Roles | Culture & Policy */}
            <div className="w-full pt-2">
              <div className="border-b border-zinc-200 flex">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 text-center pb-3 text-[14.5px] font-bold transition-colors relative cursor-pointer ${
                    activeTab === "overview"
                      ? "text-[#E7040D]"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  Overview
                  {activeTab === "overview" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E7040D]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("jobs")}
                  className={`flex-1 text-center pb-3 text-[14.5px] font-bold transition-colors relative cursor-pointer ${
                    activeTab === "jobs"
                      ? "text-[#E7040D]"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  Open Roles ({companyJobs.length})
                  {activeTab === "jobs" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E7040D]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("policy")}
                  className={`flex-1 text-center pb-3 text-[14.5px] font-bold transition-colors relative cursor-pointer ${
                    activeTab === "policy"
                      ? "text-[#E7040D]"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  Culture &amp; Policy
                  {activeTab === "policy" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E7040D]" />
                  )}
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="py-6 text-zinc-800 space-y-6">
                  <div className="space-y-3">
                    <p className="text-[14.5px] leading-relaxed text-zinc-600">
                      {typeof company.bio === "string" && company.bio.trim().length > 0
                        ? company.bio
                        : typeof company.description === "string" && company.description.trim().length > 0
                        ? company.description
                        : `${company.name} is a leading technology company building digital solutions across the African continent.`}
                    </p>
                    <p className="text-[14.5px] leading-relaxed text-zinc-600">
                      Rooted in the African digital economy, {company.name} combines high engineering standards with practical local execution to scale impactful products across West Africa and global markets.
                    </p>
                  </div>

                  {/* Key Company Highlights (Matching Key Learning Outcomes from Course Page) */}
                  <div className="pt-2">
                    <h3 className="text-[14px] font-bold text-zinc-900 mb-2.5">
                      Key Engineering &amp; Team Highlights
                    </h3>
                    <ul className="space-y-2 list-disc list-outside pl-5 text-[13.5px] text-zinc-600">
                      <li className="leading-relaxed">
                        Manually verified by the Trax editorial team for legal entity status and direct employment practices.
                      </li>
                      <li className="leading-relaxed">
                        Transparent application pipeline with zero ghost postings and guaranteed recruiter feedback.
                      </li>
                      <li className="leading-relaxed">
                        Competitive compensation benchmarks tailored to African tech talent and remote-first structures.
                      </li>
                      <li className="leading-relaxed">
                        Modern engineering stack, collaborative product culture, and clear career growth ladders.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Open Roles */}
              {activeTab === "jobs" && (
                <div className="py-6 space-y-4">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-[15px] font-bold text-zinc-900">
                      Active Listings at {company.name} ({companyJobs.length})
                    </h3>
                  </div>

                  {companyJobs.length > 0 ? (
                    <div className="space-y-4">
                      {companyJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-zinc-50 rounded-none border border-zinc-200 p-8 text-center space-y-3">
                      <p className="text-[14.5px] font-bold text-zinc-900">
                        No active openings listed right now
                      </p>
                      <p className="text-[13px] text-zinc-500 max-w-md mx-auto">
                        {company.name} is not currently hiring through Trax Jobs, but new openings are reviewed and published weekly.
                      </p>
                      <button
                        onClick={() => setIsFollowed(!isFollowed)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-zinc-300 text-zinc-900 text-[12.5px] font-bold hover:bg-zinc-100 transition-all cursor-pointer shadow-2xs"
                      >
                        <Heart size={14} weight={isFollowed ? "fill" : "bold"} className={isFollowed ? "text-[#E7040D]" : "text-zinc-600"} />
                        <span>{isFollowed ? "Following for alerts" : "Follow for role alerts"}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Culture & Policy */}
              {activeTab === "policy" && (
                <div className="py-6 space-y-5 text-zinc-800">
                  <div className="p-5 bg-zinc-50 border border-zinc-200 space-y-2">
                    <h3 className="text-[15px] font-bold text-zinc-900">
                      Work Arrangement &amp; Location
                    </h3>
                    <p className="text-[14px] text-zinc-600 leading-relaxed">
                      <strong>Headquarters:</strong> {company.location || "Nigeria"}
                    </p>
                    <p className="text-[14px] text-zinc-600 leading-relaxed">
                      <strong>Operating Policy:</strong> Hybrid and remote-friendly options for candidates across Nigeria, Ghana, Kenya, and remote hubs in Africa.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <h3 className="text-[14px] font-bold text-zinc-900">
                      Hiring Standards &amp; Candidate Experience:
                    </h3>
                    <ul className="space-y-2 text-[13.5px] text-zinc-600 list-disc list-outside pl-5">
                      <li className="leading-relaxed">
                        Fair and structured interview stages designed to respect applicant time.
                      </li>
                      <li className="leading-relaxed">
                        Direct communication with hiring managers without recruiter intermediaries.
                      </li>
                      <li className="leading-relaxed">
                        Zero tolerance for application fees or unverified recruitment agents.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* ─────────────────────────────────────────────────────────────
              Right Column: Company Specs Card (100% 90-Degree Square Edges)
              Matching the Course Detail Page Sidebar Card Exactly
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-none border border-zinc-200 shadow-none p-6 space-y-6 sticky top-24">

              {/* 1. Metadata Specs Rows with Phosphor Icons */}
              <div className="space-y-3.5 text-[14px]">
                {/* Headquarters */}
                <div className="flex items-center justify-between text-zinc-600">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} weight="regular" className="text-zinc-600 shrink-0" />
                    <span>Headquarters</span>
                  </div>
                  <span className="text-zinc-900 font-normal text-right">
                    {company.location ? company.location.split("•")[0].trim() : "Nigeria"}
                  </span>
                </div>

                {/* Team Size */}
                <div className="flex items-center justify-between text-zinc-600">
                  <div className="flex items-center gap-3">
                    <Users size={18} weight="regular" className="text-zinc-600 shrink-0" />
                    <span>Company Size</span>
                  </div>
                  <span className="text-zinc-900 font-normal">
                    {company.employeesCount || "Growing team"}
                  </span>
                </div>

                {/* Industry / Sector */}
                <div className="flex items-center justify-between text-zinc-600">
                  <div className="flex items-center gap-3">
                    <Tag size={18} weight="regular" className="text-zinc-600 shrink-0" />
                    <span>Industry</span>
                  </div>
                  <span className="text-zinc-900 font-normal text-right truncate max-w-[180px]">
                    {company.industry || "Technology"}
                  </span>
                </div>

                {/* Work Model */}
                <div className="flex items-center justify-between text-zinc-600">
                  <div className="flex items-center gap-3">
                    <Buildings size={18} weight="regular" className="text-zinc-600 shrink-0" />
                    <span>Work Policy</span>
                  </div>
                  <span className="text-zinc-900 font-normal">Hybrid &amp; Remote</span>
                </div>

                {/* Official Website */}
                {company.website && (
                  <div className="flex items-center justify-between text-zinc-600">
                    <div className="flex items-center gap-3">
                      <Globe size={18} weight="regular" className="text-zinc-600 shrink-0" />
                      <span>Website</span>
                    </div>
                    <a
                      href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E7040D] hover:underline font-normal truncate max-w-[180px]"
                    >
                      {company.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>

              <div className="border-t border-zinc-100" />

              {/* 2. "The Trax Vetting Guarantee:" Section (Matching "This course includes") */}
              <div className="space-y-3">
                <h3 className="text-[14px] font-semibold text-zinc-900">
                  The Trax Vetting Standard:
                </h3>

                <div className="space-y-3 text-[13.5px] text-zinc-600">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} weight="regular" className="text-zinc-600 shrink-0" />
                    <span>100% verified legal entity</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Briefcase size={18} weight="regular" className="text-zinc-600 shrink-0" />
                    <span>Direct applications with no ghost listings</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe size={18} weight="regular" className="text-zinc-600 shrink-0" />
                    <span>Competitive local &amp; foreign compensation</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <DeviceMobile size={18} weight="regular" className="text-zinc-600 shrink-0" />
                    <span>Direct recruiter communication</span>
                  </div>
                </div>
              </div>

              {/* 3. Primary CTA Action Buttons */}
              <div className="space-y-2.5">
                {companyJobs.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab("jobs")}
                    className="w-full py-3.5 px-4 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[14.5px] font-bold rounded-none flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99]"
                  >
                    <Briefcase size={18} weight="bold" />
                    <span>View {companyJobs.length} {companyJobs.length === 1 ? "Open Role" : "Open Roles"}</span>
                  </button>
                ) : company.website ? (
                  <a
                    href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-[#0C1222] hover:bg-zinc-800 text-white text-[14.5px] font-bold rounded-none flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.99]"
                  >
                    <Globe size={18} weight="bold" />
                    <span>Visit Company Website</span>
                  </a>
                ) : null}

                <button
                  type="button"
                  onClick={() => setIsFollowed(!isFollowed)}
                  className={`w-full py-2.5 px-4 border text-[13px] font-bold rounded-none flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-2xs active:scale-[0.99] select-none ${
                    isFollowed
                      ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]"
                      : "bg-white hover:bg-zinc-50 border-zinc-200/90 text-zinc-950 hover:border-zinc-300"
                  }`}
                >
                  <Heart size={16} weight={isFollowed ? "fill" : "bold"} className={isFollowed ? "text-[#E7040D]" : "text-zinc-500"} />
                  <span>{isFollowed ? "Following Company" : "Follow Company"}</span>
                </button>
              </div>

              {/* 4. Share this company section (Matching Course Detail Page) */}
              <div className="space-y-3 pt-1">
                <h3 className="text-[13.5px] font-semibold text-zinc-900">
                  Share this company:
                </h3>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Copy link button */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-50 hover:bg-zinc-100 active:scale-95 border border-zinc-200 rounded-none text-[12.5px] font-medium text-zinc-700 transition-all cursor-pointer select-none"
                  >
                    {copied ? (
                      <>
                        <Check size={14} weight="bold" className="text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} weight="regular" />
                        <span>Copy link</span>
                      </>
                    )}
                  </button>

                  {/* Facebook Button with Popup */}
                  <button
                    type="button"
                    onClick={shareOnFacebook}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 active:scale-95 border border-zinc-200 rounded-none text-zinc-700 hover:text-blue-600 transition-all cursor-pointer"
                    aria-label="Share on Facebook"
                  >
                    <FacebookLogo size={16} weight="regular" />
                  </button>

                  {/* Twitter / X Button with Popup */}
                  <button
                    type="button"
                    onClick={shareOnTwitter}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 active:scale-95 border border-zinc-200 rounded-none text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer"
                    aria-label="Share on X"
                  >
                    <XLogo size={16} weight="regular" />
                  </button>

                  {/* Email Button */}
                  <button
                    type="button"
                    onClick={shareByEmail}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 active:scale-95 border border-zinc-200 rounded-none text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer"
                    aria-label="Share via Email"
                  >
                    <EnvelopeSimple size={16} weight="regular" />
                  </button>

                  {/* WhatsApp Button */}
                  <button
                    type="button"
                    onClick={shareOnWhatsApp}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 active:scale-95 border border-zinc-200 rounded-none text-zinc-700 hover:text-emerald-600 transition-all cursor-pointer"
                    aria-label="Share on WhatsApp"
                  >
                    <WhatsappLogo size={16} weight="regular" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
