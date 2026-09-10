"use client";

import { useState, useEffect, useMemo } from "react";
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
  CheckCircle,
  Check,
} from "@phosphor-icons/react";
import { AppHeader } from "@/components/navigation/app-header";
import { Footer } from "@/components/footer";

/* ─────────────────────────────────────────────────────────────
   Company Logo Mark
───────────────────────────────────────────────────────────── */
function CompanyLogoMark({
  name,
  logo,
  className = "w-12 h-12",
}: {
  name: string;
  logo?: string;
  className?: string;
}) {
  if (logo) {
    return (
      <div className={`${className} bg-white border border-zinc-200/90 flex items-center justify-center p-1.5 overflow-hidden shrink-0`}>
        <Image src={logo} alt={name} width={48} height={48} className="object-contain w-full h-full" unoptimized />
      </div>
    );
  }

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
  return (
    <div className={`${className} bg-[#1F1F1F] text-white flex items-center justify-center font-bold text-sm shrink-0`}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

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

export default function JobDetailClient({
  job,
  allCompanyJobsCount,
}: {
  job: any;
  allCompanyJobsCount: number;
}) {
  const router = useRouter();
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
    } catch {}
  }, [job.id]);

  useEffect(() => {
    const handleScroll = () => setShowStickyNav(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSave = () => {
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
    } catch {}
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator.share({ title: `${job.title} at ${job.company.name} | Trax Jobs`, url: window.location.href }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const keyMissions = useMemo(() => [
    `Develop and maintain mission-critical systems and product workflows for ${job.company.name}, ensuring resilience and high operational standards.`,
    `Contribute directly to the architecture and scaling of automated pipelines, collaborating closely with colleagues to understand business requirements and technical priorities.`,
    `Monitor performance and drive ongoing optimization across production environments, establishing benchmark quality for Africa's tech ecosystem.`,
  ], [job]);

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

      {/* Sticky top bar */}
      {showStickyNav && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm transition-all duration-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-6 min-w-0">
              <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-zinc-700 hover:text-[#E7040D] active:scale-95 transition-all cursor-pointer shrink-0">
                <CaretLeft size={16} weight="bold" />
                <span>Back</span>
              </button>
              <div className="min-w-0 hidden sm:block">
                <h2 className="text-[15px] font-black text-[#1F1F1F] truncate">{job.title}</h2>
                <p className="text-[12px] text-zinc-500 font-medium truncate">
                  {job.contractType === "Permanent" ? "Permanent contract" : `${job.contractType} contract`} • Salary: {job.salary?.formatted || "Not specified"} • {job.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href={job.applicationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.98] hover:shadow-[0_8px_20px_-4px_rgba(231,4,13,0.35)] text-white text-[13px] font-bold shadow-2xs transition-all cursor-pointer select-none">
                <span>Apply</span>
                <ArrowSquareOut size={14} weight="bold" />
              </a>
              <button onClick={toggleSave} className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold border active:scale-90 transition-all cursor-pointer select-none ${isSaved ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]" : "bg-white hover:bg-zinc-50 border-zinc-200 text-[#1F1F1F]"}`}>
                <BookmarkSimple size={15} weight={isSaved ? "fill" : "bold"} className={isSaved ? "scale-110 transition-transform" : "transition-transform"} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-2">
          <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-zinc-700 hover:text-[#E7040D] active:scale-95 transition-all cursor-pointer">
            <CaretLeft size={16} weight="bold" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">

            {/* Hero Card */}
            <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-4">
                <CompanyLogoMark name={job.company.name} logo={job.company.logo} className="w-8 h-8" />
                <span className="text-[12.5px] font-black tracking-wider uppercase text-[#1F1F1F]">{job.company.name}</span>
              </div>

              <h1 className="text-3xl sm:text-[34px] font-black text-[#1F1F1F] tracking-[-0.02em] leading-tight mb-8">{job.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b border-zinc-100">
                <div className="md:col-span-5 space-y-3">
                  <h3 className="text-[11.5px] font-bold tracking-wider uppercase text-[#1F1F1F]">JOB SUMMARY</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                      <Briefcase size={13} weight="bold" className="text-zinc-500" />
                      <span>{job.contractType === "Permanent" ? "Permanent contract" : `${job.contractType} contract`}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                      <MapPin size={13} weight="bold" className="text-zinc-500" />
                      <span>{job.location}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                      <span>Salary: {job.salary?.formatted || "Not specified"}</span>
                    </span>
                  </div>
                </div>
                <div className="md:col-span-7 space-y-3">
                  <h3 className="text-[11.5px] font-bold tracking-wider uppercase text-[#1F1F1F]">SKILLS &amp; EXPERTISE</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {job.tags.map((skill: string) => (
                      <span key={skill} className="inline-flex items-center px-3 py-1.5 bg-[#FAFAFA] hover:bg-zinc-100 text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80 transition-colors">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-8 border-b border-zinc-100">
                <h3 className="text-[11.5px] font-bold tracking-wider uppercase text-[#1F1F1F] mb-4">KEY MISSIONS</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {keyMissions.map((mission, idx) => (
                    <div key={idx} className="text-[13.5px] text-zinc-600 leading-relaxed font-normal">{mission}</div>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <a href={job.applicationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.98] hover:shadow-[0_10px_24px_-4px_rgba(231,4,13,0.35)] text-white text-[13.5px] font-bold shadow-2xs transition-all cursor-pointer select-none">
                    <span>Apply</span>
                    <ArrowSquareOut size={15} weight="bold" />
                  </a>
                  <button onClick={toggleSave} className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold border active:scale-90 transition-all cursor-pointer select-none ${isSaved ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]" : "bg-white hover:bg-zinc-50 border-zinc-200 text-[#1F1F1F]"}`}>
                    <BookmarkSimple size={15} weight={isSaved ? "fill" : "bold"} className={isSaved ? "scale-110 transition-transform" : "transition-transform"} />
                    <span>{isSaved ? "Saved" : "Save"}</span>
                  </button>
                </div>
                <div className="flex items-center gap-5 text-[12.5px] text-zinc-500">
                  <div className="inline-flex items-center gap-1.5">
                    <CalendarBlank size={15} weight="regular" />
                    <span>{formattedRelativeDate}</span>
                  </div>
                  <button onClick={handleShare} className="inline-flex items-center gap-1.5 text-zinc-700 hover:text-[#E7040D] active:scale-95 font-semibold transition-all cursor-pointer select-none">
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

            {/* Position Detail Card */}
            <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-[#E7040D] inline-block" />
                <h2 className="text-2xl font-black text-[#1F1F1F] tracking-tight">The position</h2>
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-black text-[#1F1F1F] tracking-tight mb-4">Job description</h3>
                <h4 className="text-[14px] font-bold text-[#1F1F1F] mb-3">Overview</h4>
                <div className="space-y-4 text-[14px] text-zinc-700 leading-relaxed">
                  <p>
                    We&apos;re {job.company.name}, a passionate team building world-class technology infrastructure. Guided by our purpose of building resilient digital solutions for Africa and global markets, we believe in crafting software that makes a tangible difference every day.
                  </p>
                  <p>
                    This is an opportunity to make a significant impact across one of the fastest-growing technology ecosystems. We are looking for a {job.title} who will support the delivery, reliability, and operational excellence of advanced systems created by our engineering organization.
                  </p>

                  {showFullOverview && (
                    <div className="space-y-4 pt-2">
                      <p>You will work as part of a high-performing team to build scalable architectures, ensuring solutions are robust, efficient, and suitable for a high-volume live environment.</p>
                      {(job.description || []).map((p: string, i: number) => <p key={i}>{p}</p>)}
                    </div>
                  )}

                  <button onClick={() => setShowFullOverview(!showFullOverview)} className="inline-flex items-center gap-1 text-[13px] font-bold text-zinc-900 hover:text-[#E7040D] pt-2 cursor-pointer transition-colors">
                    <span>{showFullOverview ? "View less" : "View more"}</span>
                    {showFullOverview ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}
                  </button>
                </div>
              </div>

              {(job.requirements?.length > 0) && (
                <div className="pt-6 border-t border-zinc-100">
                  <h4 className="text-[14px] font-bold text-[#1F1F1F] mb-3">Profile &amp; Requirements</h4>
                  <ul className="space-y-3">
                    {job.requirements.map((req: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-[14px] text-zinc-700 leading-relaxed">
                        <CheckCircle size={17} weight="fill" className="text-[#E7040D] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(job.benefits?.length > 0) && (
                <div className="pt-6 border-t border-zinc-100">
                  <h4 className="text-[14px] font-bold text-[#1F1F1F] mb-3">What we offer</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {job.benefits.map((b: string, idx: number) => (
                      <li key={idx} className="p-3 bg-[#FAFAFA] border border-zinc-200/80 text-[13px] text-zinc-800 font-medium">{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-1.5 bg-white p-2 border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              {gallery.map((photoUrl, idx) => (
                <div key={idx} className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <Image src={photoUrl} alt={`${job.company.name} team`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>

            {/* Discover Banner */}
            <div className="bg-[#161616] text-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-zinc-800">
              <h3 className="text-xl font-black tracking-tight mb-2 text-white">Discover the company</h3>
              <p className="text-[13.5px] font-medium text-zinc-300 leading-relaxed mb-6">Explore the company&apos;s profile or follow them to find out if they&apos;re the right fit!</p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link href={`/companies/${job.company.slug}`} className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.98] text-white text-[13px] font-bold transition-all text-center cursor-pointer select-none">
                  <span>Explore the company</span>
                  <ArrowUpRight size={14} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Company Card */}
            <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-[#E7040D] inline-block" />
                <h3 className="text-xl font-black text-[#1F1F1F] tracking-tight">The company</h3>
              </div>

              <div className="flex items-center gap-3">
                <CompanyLogoMark name={job.company.name} logo={job.company.logo} className="w-10 h-10" />
                <span className="text-[13.5px] font-black uppercase text-[#1F1F1F]">{job.company.name}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[12px] text-zinc-700 font-medium">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] border border-zinc-200/80">
                  <Tag size={13} weight="bold" className="text-zinc-500" />
                  <span>{job.company.industry}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] border border-zinc-200/80">
                  <Users size={13} weight="bold" className="text-zinc-500" />
                  <span>{job.company.employeesCount} employees</span>
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1 text-[13px] font-bold">
                <Link href={`/companies/${job.company.slug}?tab=jobs`} className="inline-flex items-center gap-1.5 text-zinc-900 hover:text-[#E7040D] transition-colors">
                  <span>View all jobs</span>
                  <span className="px-1.5 py-0.5 rounded-none bg-[#fce8e0] text-[#E7040D] text-[11px] font-black border border-[#E7040D]/30">
                    {allCompanyJobsCount || 1}
                  </span>
                </Link>
              </div>

              <div className="pt-4 border-t border-zinc-100 space-y-3">
                <h4 className="text-[14px] font-bold text-[#1F1F1F]">Who are they?</h4>
                <div className="text-[13px] text-zinc-600 leading-relaxed space-y-2">
                  <p>{job.company.bio || `${job.company.name} is an ecosystem-leading technology company operating across high-scale markets in Africa and globally.`}</p>
                  {showFullCompanyBio && (
                    <p>The company invests deeply in engineering talent, remote-first practices, and building robust platforms that serve thousands of businesses across Africa.</p>
                  )}
                  <button onClick={() => setShowFullCompanyBio(!showFullCompanyBio)} className="inline-flex items-center gap-1 text-[12.5px] font-bold text-zinc-900 hover:text-[#E7040D] active:scale-95 pt-1 cursor-pointer transition-all select-none">
                    <span>{showFullCompanyBio ? "View less" : "View more"}</span>
                    {showFullCompanyBio ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 space-y-2">
                <h4 className="text-[14px] font-bold text-[#1F1F1F]">The workplace</h4>
                <p className="text-[13px] text-zinc-600 leading-relaxed">
                  Headquartered in {job.company.hq}, with flexible distributed remote teams across West, East, and South Africa.
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
