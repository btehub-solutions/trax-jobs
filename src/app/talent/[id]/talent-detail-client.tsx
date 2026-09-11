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
  Clock,
  SealCheck,
  BookmarkSimple,
  CalendarBlank,
  ShareNetwork,
  EnvelopeSimple,
  WhatsappLogo,
  ShieldCheck,
  CheckCircle,
  Tag,
  GithubLogo,
  LinkedinLogo,
  Globe,
  Check,
  House,
} from "@phosphor-icons/react";
import { AppHeader } from "@/components/navigation/app-header";

const TALENT_GALLERY_SETS = [
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

export default function TalentDetailClient({ talent, similarTalent }: { talent: any; similarTalent: any[] }) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("trax_saved_talent");
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        setIsSaved(ids.includes(talent.id));
      }
    } catch {}
  }, [talent.id]);

  useEffect(() => {
    const handleScroll = () => setShowStickyNav(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSave = () => {
    try {
      const saved = localStorage.getItem("trax_saved_talent");
      let ids: string[] = saved ? JSON.parse(saved) : [];
      if (ids.includes(talent.id)) {
        ids = ids.filter((id) => id !== talent.id);
        setIsSaved(false);
      } else {
        ids.push(talent.id);
        setIsSaved(true);
      }
      localStorage.setItem("trax_saved_talent", JSON.stringify(ids));
    } catch {}
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator.share({ title: `${talent.name} - ${talent.title} | Trax Talent`, url: window.location.href }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const hireUrl = useMemo(() => {
    if (talent.preferredContactMethod === "whatsapp" && talent.whatsapp) {
      const cleanPhone = talent.whatsapp.replace(/[^0-9]/g, "");
      const msg = encodeURIComponent(`Hi ${talent.name}, I discovered your vetted profile on Trax Jobs and would love to discuss a role with you.`);
      return `https://wa.me/${cleanPhone}?text=${msg}`;
    }
    const subject = encodeURIComponent(`Role Inquiry: Connecting via Trax Jobs`);
    const body = encodeURIComponent(`Hi ${talent.name},\n\nI discovered your vetted profile on Trax Jobs and would love to connect regarding an opportunity.\n\nBest regards,`);
    return `mailto:${talent.email}?subject=${subject}&body=${body}`;
  }, [talent]);

  const keyAchievements = useMemo(() => [
    `Key Accomplishment: ${talent.highlightMetric || "Multiple high-impact projects delivered on time"}. Delivered tangible business outcomes and scaled production infrastructure with measured quality.`,
    `Core Expertise: Proven leadership across ${(talent.skills || []).slice(0, 3).join(", ")}. Strong track record in architecture, peer mentoring, and delivery.`,
    `Work Approach: Fully equipped for ${talent.workPreference} collaboration with robust remote habits and proactive communication.`,
  ], [talent]);

  const gallery = TALENT_GALLERY_SETS[Math.abs(talent.name.length) % TALENT_GALLERY_SETS.length];

  const formattedRelativeDate = useMemo(() => {
    const published = new Date(talent.publishedAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return "Joined today";
    if (diffDays === 1) return "Joined 1 day ago";
    if (diffDays < 30) return `Joined ${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `Joined ${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  }, [talent.publishedAt]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1F1F1F] flex flex-col font-sans">
      <AppHeader activeTab="talent" />

      {/* Desktop Sticky top bar (hidden on mobile to prevent navbar collision) */}
      {showStickyNav && (
        <div className="hidden sm:block fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 shadow-sm transition-all duration-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-6 min-w-0">
              <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-zinc-700 hover:text-[#E7040D] active:scale-95 transition-all cursor-pointer shrink-0">
                <CaretLeft size={16} weight="bold" />
                <span>Back</span>
              </button>
              <div className="min-w-0">
                <h2 className="text-[15px] font-black text-[#1F1F1F] truncate">{talent.name}</h2>
                <p className="text-[12px] text-zinc-500 font-medium truncate">{talent.title} • {talent.experienceYears} • {talent.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href={hireUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.98] hover:shadow-[0_8px_20px_-4px_rgba(231,4,13,0.35)] text-white text-[13px] font-bold shadow-2xs transition-all cursor-pointer select-none">
                {talent.preferredContactMethod === "whatsapp" ? <WhatsappLogo size={15} weight="bold" /> : <EnvelopeSimple size={15} weight="bold" />}
                <span>Hire Talent</span>
              </a>
              <button onClick={toggleSave} className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold border active:scale-90 transition-all cursor-pointer select-none ${isSaved ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]" : "bg-white hover:bg-zinc-50 border-zinc-200 text-[#1F1F1F]"}`}>
                <BookmarkSimple size={15} weight={isSaved ? "fill" : "bold"} className={isSaved ? "scale-110 transition-transform" : "transition-transform"} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Action Bar (Thumb-accessible, zero top collision) */}
      {showStickyNav && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-zinc-200/90 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between gap-3">
          <button onClick={() => router.back()} className="inline-flex items-center gap-1 px-2.5 py-2 text-[13px] font-bold text-zinc-700 hover:text-[#E7040D] active:scale-95 transition-all cursor-pointer shrink-0">
            <CaretLeft size={16} weight="bold" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <button
              onClick={toggleSave}
              className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-[12.5px] font-semibold border active:scale-90 transition-all cursor-pointer select-none ${
                isSaved ? "bg-[#fce8e0] border-[#E7040D] text-[#E7040D]" : "bg-white hover:bg-zinc-50 border-zinc-200 text-[#1F1F1F]"
              }`}
            >
              <BookmarkSimple size={15} weight={isSaved ? "fill" : "bold"} className={isSaved ? "scale-110 transition-transform" : "transition-transform"} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
            <a
              href={hireUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[180px] inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.98] text-white text-[13px] font-bold shadow-2xs transition-all cursor-pointer select-none"
            >
              {talent.preferredContactMethod === "whatsapp" ? <WhatsappLogo size={15} weight="bold" /> : <EnvelopeSimple size={15} weight="bold" />}
              <span>Hire Talent</span>
            </a>
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

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-4 pb-24 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-stretch">

          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">

            {/* Hero Card */}
            <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-none bg-zinc-100 border border-zinc-200/90 overflow-hidden relative shrink-0">
                    {!imageError && talent.avatar ? (
                      <Image src={talent.avatar} alt={talent.name} fill sizes="60px" className="object-cover object-top" onError={() => setImageError(true)} unoptimized />
                    ) : (
                      <div className="w-full h-full bg-[#1F1F1F] text-white font-bold flex items-center justify-center text-sm">
                        {talent.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13.5px] font-black tracking-wider uppercase text-[#1F1F1F]">{talent.name}</span>
                      <SealCheck size={16} weight="fill" className="text-[#E7040D]" />
                    </div>
                    <span className="text-[11.5px] font-bold text-zinc-500 uppercase tracking-wide">{talent.category} • {talent.experienceYears}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-[12px] font-semibold border border-emerald-200/60 self-start sm:self-auto shrink-0">
                  <Clock size={13} weight="bold" />
                  <span>{talent.availability}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-[34px] font-black text-[#1F1F1F] tracking-[-0.02em] leading-tight mb-8">{talent.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b border-zinc-100">
                <div className="md:col-span-5 space-y-3">
                  <h3 className="text-[11.5px] font-bold tracking-wider uppercase text-[#1F1F1F]">TALENT SUMMARY</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                      <House size={13} weight="bold" className="text-zinc-500" />
                      <span>{talent.workPreference}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                      <MapPin size={13} weight="bold" className="text-zinc-500" />
                      <span>{talent.location}</span>
                    </span>
                    {talent.rate && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                        <span>Rate: {talent.rate}</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80">
                      <Briefcase size={13} weight="bold" className="text-zinc-500" />
                      <span>{talent.experienceLevel}</span>
                    </span>
                  </div>
                </div>
                <div className="md:col-span-7 space-y-3">
                  <h3 className="text-[11.5px] font-bold tracking-wider uppercase text-[#1F1F1F]">SKILLS &amp; EXPERTISE</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {(talent.skills || []).map((skill: string) => (
                      <span key={skill} className="inline-flex items-center px-3 py-1.5 bg-[#FAFAFA] hover:bg-zinc-100 text-[#1F1F1F] text-[12px] font-medium border border-zinc-200/80 transition-colors">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-8 border-b border-zinc-100">
                <h3 className="text-[11.5px] font-bold tracking-wider uppercase text-[#1F1F1F] mb-4">KEY ACHIEVEMENTS &amp; FOCUS</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {keyAchievements.map((achievement, idx) => (
                    <div key={idx} className="text-[13.5px] text-zinc-600 leading-relaxed font-normal">{achievement}</div>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <a href={hireUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.98] hover:shadow-[0_10px_24px_-4px_rgba(231,4,13,0.35)] text-white text-[13.5px] font-bold shadow-2xs transition-all cursor-pointer select-none">
                    {talent.preferredContactMethod === "whatsapp" ? <WhatsappLogo size={16} weight="bold" /> : <EnvelopeSimple size={16} weight="bold" />}
                    <span>Hire Talent</span>
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
                      <><Check size={15} weight="bold" className="text-emerald-600" /><span className="text-emerald-600">Link copied</span></>
                    ) : (
                      <><ShareNetwork size={15} weight="bold" /><span>Share</span></>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-[#E7040D] inline-block" />
                <h2 className="text-2xl font-black text-[#1F1F1F] tracking-tight">Professional Profile</h2>
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-black text-[#1F1F1F] tracking-tight mb-4">About {talent.name}</h3>
                <div className="space-y-4 text-[14px] text-zinc-700 leading-relaxed">
                  <p>{talent.bio}</p>
                  <p>With {talent.experienceYears} of hands-on expertise operating in high-growth African startups and distributed global engineering environments, {talent.name} specializes in delivering high-impact solutions with clean architecture and predictable delivery timelines.</p>

                  {showFullBio && (
                    <div className="space-y-4 pt-2">
                      <p>Demonstrated ability to interface directly with founders, CTOs, and cross-functional teams to translate complex business objectives into measurable technical execution.</p>
                      <p>Available for direct contract or permanent engagements via Trax Jobs with immediate response times and zero intermediary placement markup.</p>
                    </div>
                  )}

                  <button onClick={() => setShowFullBio(!showFullBio)} className="inline-flex items-center gap-1 text-[13px] font-bold text-zinc-900 hover:text-[#E7040D] pt-2 cursor-pointer transition-colors">
                    <span>{showFullBio ? "View less" : "View more"}</span>
                    {showFullBio ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100">
                <h4 className="text-[14px] font-bold text-[#1F1F1F] mb-3">Core Competencies &amp; Capabilities</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-[14px] text-zinc-700 leading-relaxed">
                    <CheckCircle size={17} weight="fill" className="text-[#E7040D] shrink-0 mt-0.5" />
                    <span>Proven track record: {talent.highlightMetric || "Consistent delivery of high-impact projects"}</span>
                  </li>
                  <li className="flex items-start gap-3 text-[14px] text-zinc-700 leading-relaxed">
                    <CheckCircle size={17} weight="fill" className="text-[#E7040D] shrink-0 mt-0.5" />
                    <span>Deep technical proficiency in {(talent.skills || []).slice(0, 4).join(", ")}.</span>
                  </li>
                  <li className="flex items-start gap-3 text-[14px] text-zinc-700 leading-relaxed">
                    <CheckCircle size={17} weight="fill" className="text-[#E7040D] shrink-0 mt-0.5" />
                    <span>Rigorous focus on test coverage, system observability, and clean documentation.</span>
                  </li>
                  <li className="flex items-start gap-3 text-[14px] text-zinc-700 leading-relaxed">
                    <CheckCircle size={17} weight="fill" className="text-[#E7040D] shrink-0 mt-0.5" />
                    <span>Proactive communicator experienced with asynchronous Slack/Notion/GitHub workflows.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-zinc-100">
                <h4 className="text-[14px] font-bold text-[#1F1F1F] mb-3">Engagement &amp; Availability</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#FAFAFA] border border-zinc-200/80 text-[13px] text-zinc-800 font-medium">
                    <span className="font-bold text-zinc-950 block mb-1">Status:</span>{talent.availability}
                  </div>
                  <div className="p-3 bg-[#FAFAFA] border border-zinc-200/80 text-[13px] text-zinc-800 font-medium">
                    <span className="font-bold text-zinc-950 block mb-1">Compensation / Rate:</span>{talent.rate || "Competitive / Open to offers"}
                  </div>
                  <div className="p-3 bg-[#FAFAFA] border border-zinc-200/80 text-[13px] text-zinc-800 font-medium">
                    <span className="font-bold text-zinc-950 block mb-1">Location &amp; Remote:</span>{talent.location} ({talent.workPreference})
                  </div>
                  <div className="p-3 bg-[#FAFAFA] border border-zinc-200/80 text-[13px] text-zinc-800 font-medium">
                    <span className="font-bold text-zinc-950 block mb-1">Preferred Contact:</span>Direct {talent.preferredContactMethod === "whatsapp" ? "WhatsApp" : "Email"}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:self-stretch">

            <div className="grid grid-cols-2 gap-1.5 bg-white p-2 border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              {gallery.map((photoUrl, idx) => (
                <div key={idx} className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <Image src={photoUrl} alt="African tech professional" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>

            <div className="bg-[#0C1222] text-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#0C1222]">
              <h3 className="text-xl font-black tracking-tight mb-2 text-white">Hire {talent.name}</h3>
              <p className="text-[13.5px] font-medium text-white/70 leading-relaxed mb-6">Connect directly with this vetted professional for full-time or contract roles with zero platform fees.</p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a href={hireUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13px] font-bold transition-all text-center cursor-pointer">
                  {talent.preferredContactMethod === "whatsapp" ? <WhatsappLogo size={16} weight="bold" /> : <EnvelopeSimple size={16} weight="bold" />}
                  <span>Hire Talent</span>
                </a>
                {talent.portfolioUrl && (
                  <a href={talent.portfolioUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 border border-white/20 hover:border-white hover:bg-white hover:text-[#0C1222] text-white text-[13px] font-bold transition-all text-center cursor-pointer">
                    Portfolio
                  </a>
                )}
              </div>
            </div>

            {/* About the professional (Sticky on desktop once reached during scroll) */}
            <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 space-y-6 lg:sticky lg:top-[76px]">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-[#E7040D] inline-block" />
                <h3 className="text-xl font-black text-[#1F1F1F] tracking-tight">About the professional</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-zinc-100 border border-zinc-200/90 overflow-hidden relative shrink-0">
                  {talent.avatar && (
                    <Image src={talent.avatar} alt={talent.name} fill sizes="60px" className="object-cover object-top" unoptimized />
                  )}
                </div>
                <div>
                  <h4 className="text-[14px] font-black uppercase text-[#1F1F1F]">{talent.name}</h4>
                  <p className="text-[12px] text-zinc-500 font-medium">{talent.category} • {talent.experienceLevel}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[12px] text-zinc-700 font-medium">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] border border-zinc-200/80">
                  <Tag size={13} weight="bold" className="text-zinc-500" />
                  <span>{talent.category}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] border border-zinc-200/80">
                  <MapPin size={13} weight="bold" className="text-zinc-500" />
                  <span>{talent.location}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[#E7040D] bg-[#fce8e0] px-3 py-1.5 font-bold border border-[#E7040D]/30">
                  <ShieldCheck size={14} weight="fill" />
                  <span>Vetted by Trax</span>
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1 text-[13px] font-bold flex-wrap">
                {talent.githubUrl && (
                  <a href={talent.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-zinc-900 hover:text-[#E7040D] transition-colors">
                    <GithubLogo size={15} weight="bold" />
                    <span>GitHub</span>
                  </a>
                )}
                {talent.linkedinUrl && (
                  <>
                    <span className="text-zinc-300">•</span>
                    <a href={talent.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-zinc-900 hover:text-[#E7040D] transition-colors">
                      <LinkedinLogo size={15} weight="bold" />
                      <span>LinkedIn</span>
                    </a>
                  </>
                )}
                {talent.portfolioUrl && (
                  <>
                    <span className="text-zinc-300">•</span>
                    <a href={talent.portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-zinc-900 hover:text-[#E7040D] transition-colors">
                      <Globe size={15} weight="bold" />
                      <span>Portfolio</span>
                    </a>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-100 space-y-2">
                <h4 className="text-[14px] font-bold text-[#1F1F1F]">Trax Curation Note</h4>
                <p className="text-[13px] text-zinc-600 leading-relaxed">
                  Profile, identity, and past contributions manually vetted by Trax Media editors to ensure authentic engineering credibility across Ogun State and wider African ecosystems.
                </p>
              </div>
            </div>

            {similarTalent.length > 0 && (
              <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 space-y-4">
                <h3 className="text-base font-black text-[#1F1F1F] tracking-tight">Similar {talent.category} Talent</h3>
                <div className="space-y-3">
                  {similarTalent.map((simTalent) => (
                    <Link key={simTalent.id} href={`/talent/${simTalent.slug}`} className="block p-3 border border-zinc-200/70 hover:border-[#E7040D]/40 transition-colors group">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 bg-zinc-100 border border-zinc-200 overflow-hidden relative shrink-0">
                          {simTalent.avatar && (
                            <Image src={simTalent.avatar} alt={simTalent.name} fill sizes="32px" className="object-cover object-top" unoptimized />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[13.5px] font-bold text-zinc-900 group-hover:text-[#E7040D] transition-colors truncate">{simTalent.name}</h4>
                          <p className="text-[12px] text-zinc-500 truncate">{simTalent.title} • {simTalent.location}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
