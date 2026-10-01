"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SealCheck,
  MapPin,
  Briefcase,
  Clock,
  EnvelopeSimple,
  WhatsappLogo,
  ArrowSquareOut,
  GithubLogo,
  LinkedinLogo,
  Globe,
  CheckCircle,
} from "@phosphor-icons/react";
import { TalentProfile } from "@/types";
import { formatTalentExperience } from "@/lib/utils";

interface TalentCardProps {
  talent: TalentProfile;
  onHireClick: (talent: TalentProfile) => void;
}

export function TalentCard({ talent, onHireClick }: TalentCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="feed-card-reveal bg-white rounded-lg border border-zinc-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden group min-h-[410px]">
      
      {/* Top Banner Cover Strip */}
      <div className="relative h-[140px] w-full bg-[#E5E7EB] overflow-hidden shrink-0">
        <Image
          src="/images/trax-talent-cover-default.jpg"
          alt="Trax Curated Talent"
          fill
          sizes="400px"
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          unoptimized
        />
        
        {/* Editorial Pill on Top Right */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-0.5 bg-black/60 backdrop-blur-xs border border-white/20 text-white text-[10px] font-semibold tracking-wide rounded-full shadow-2xs z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{talent.workPreference}</span>
        </div>
      </div>

      {/* Main Card Body */}
      <div className="px-6 pb-5 pt-0 flex-1 flex flex-col justify-between">
        <div>
          {/* Avatar & Verification Section */}
          <div className="flex items-start justify-between -mt-10 mb-4 relative z-10">
            
            {/* Portrait Avatar */}
            <div className="relative">
              <Link href={`/talent/${talent.slug || talent.id}`} className="block">
                <div className="w-[76px] h-[76px] rounded-lg bg-white p-1 border border-zinc-200 shadow-2xs overflow-hidden flex items-center justify-center group-hover:border-zinc-400 transition-colors">
                  {!imageError ? (
                    <Image
                      src={talent.avatar}
                      alt={talent.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover object-top rounded-md"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1F1F1F] text-white font-bold flex items-center justify-center text-lg rounded-md">
                      {talent.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </Link>

              {/* Status Badge */}
              <div className="absolute -bottom-1 -right-1 bg-white p-0.5 shadow-xs rounded-md">
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#fce8e0] text-[#E7040D] text-[10px] font-bold rounded-sm">
                  <SealCheck size={12} weight="fill" />
                  <span>VETTED</span>
                </div>
              </div>
            </div>

            {/* Availability Pill */}
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 rounded-lg">
                <Clock size={12} weight="bold" />
                <span>{talent.availability}</span>
              </span>
              {talent.rate && (
                <p className="text-[12px] font-bold text-zinc-900 mt-1">
                  {talent.rate}
                </p>
              )}
            </div>
          </div>

          {/* Name & Role Title */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Link href={`/talent/${talent.slug || talent.id}`} className="min-w-0 block">
                <span className="absolute inset-0 z-0" aria-hidden="true" />
                <h2 className="text-[18px] sm:text-[19px] font-black text-[#1F1F1F] tracking-tight group-hover:text-[#E7040D] transition-colors break-words relative z-10">
                  {talent.name}
                </h2>
              </Link>
              <SealCheck size={16} weight="fill" className="text-[#E7040D] shrink-0" />
            </div>
            
            <p className="text-[13.5px] font-bold text-zinc-800 leading-snug break-words">
              {talent.title}
            </p>
          </div>

          {/* Location & Experience Meta Row */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[12px] text-zinc-500 mb-3.5">
            <div className="flex items-center gap-1">
              <MapPin size={13} weight="bold" className="text-zinc-400" />
              <span>{talent.location}</span>
            </div>
            <span className="text-zinc-300">•</span>
            <div className="flex items-center gap-1">
              <Briefcase size={13} weight="bold" className="text-zinc-400" />
              <span className="font-semibold text-zinc-700">{formatTalentExperience(talent.experienceYears, talent.experienceLevel)}</span>
            </div>
          </div>

          {/* Editorial Highlight Metric Badge (No AI Sparkle Icon) */}
          <div className="mb-3.5 p-2.5 bg-[#FAF8F5] border-l-2 border-[#E7040D] rounded-r-lg flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-1.5 text-[12px] text-zinc-700 min-w-0">
              <span className="font-bold text-zinc-900 break-words">{talent.highlightMetric}</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 shrink-0">
              Verified
            </span>
          </div>

          {/* Bio Summary */}
          <p className="text-[13px] text-zinc-600 leading-relaxed line-clamp-2 mb-4 break-words">
            {talent.bio}
          </p>

          {/* Skill Badges */}
          {(() => {
            const safeSkills = (talent.skills || [])
              .flatMap((s: any) => {
                const str = typeof s === "string" ? s : (s?.title || s?.name || s?.text || "");
                return str.split(/[,;\n]+/).map((x: string) => x.trim());
              })
              .filter(Boolean);

            return (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {safeSkills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-lg bg-[#F5F5F7] text-[#1F1F1F] text-[11.5px] font-medium border border-zinc-200/60 break-words max-w-full"
                  >
                    {skill}
                  </span>
                ))}
                {safeSkills.length > 5 && (
                  <span className="px-2 py-0.5 text-zinc-400 text-[11px] font-semibold shrink-0 rounded-lg">
                    +{safeSkills.length - 5} more
                  </span>
                )}
              </div>
            );
          })()}
        </div>

        {/* Footer Actions: Contact & Hire */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3 relative z-10">
          {/* Quick Social / Portfolio Links */}
          <div className="flex items-center gap-1.5 text-zinc-400">
            {talent.githubUrl && (
              <a
                href={talent.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubLogo size={16} weight="bold" />
              </a>
            )}
            {talent.linkedinUrl &&
              !["https://linkedin.com", "https://www.linkedin.com", "https://linkedin.com/", "https://www.linkedin.com/"].includes(talent.linkedinUrl.trim()) && (
              <a
                href={talent.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinLogo size={16} weight="bold" />
              </a>
            )}
            {talent.portfolioUrl && (
              <a
                href={talent.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-[#E7040D] hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Portfolio"
              >
                <Globe size={16} weight="bold" />
              </a>
            )}
          </div>

          {/* Hire Talent CTA Button (Navigates to Talent Preview Page) */}
          <Link
            href={`/talent/${talent.slug || talent.id}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13px] font-bold transition-all shadow-xs cursor-pointer active:scale-98"
          >
            {talent.preferredContactMethod === "whatsapp" ? (
              <WhatsappLogo size={15} weight="bold" />
            ) : (
              <EnvelopeSimple size={15} weight="bold" />
            )}
            <span>Hire Talent</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
