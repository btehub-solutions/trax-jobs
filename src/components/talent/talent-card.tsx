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

interface TalentCardProps {
  talent: TalentProfile;
  onHireClick: (talent: TalentProfile) => void;
}

export function TalentCard({ talent, onHireClick }: TalentCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(231,4,13,0.08)] hover:border-[#E7040D]/40 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Banner Cover Strip */}
      <div className="relative h-20 w-full bg-gradient-to-r from-[#0C1222] via-[#162038] to-[#1F1F1F] overflow-hidden">
        {talent.coverImage && (
          <Image
            src={talent.coverImage}
            alt=""
            fill
            sizes="400px"
            className="object-cover opacity-25 mix-blend-overlay group-hover:scale-105 transition-transform duration-500"
          />
        )}
        
        {/* Editorial Pill on Top Right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{talent.workPreference}</span>
        </div>
      </div>

      {/* Main Card Body */}
      <div className="p-5 sm:p-6 pt-0 flex-1 flex flex-col justify-between">
        <div>
          {/* Avatar & Verification Section */}
          <div className="flex items-start justify-between -mt-10 mb-4 relative z-10">
            
            {/* Portrait Avatar */}
            <div className="relative">
              <Link href={`/talent/${talent.id}`} className="block">
                <div className="w-20 h-20 rounded-none bg-white p-1 border-2 border-white shadow-md ring-1 ring-zinc-200/80 overflow-hidden bg-zinc-100 group-hover:ring-[#E7040D]/40 transition-all">
                  {!imageError ? (
                    <Image
                      src={talent.avatar}
                      alt={talent.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover object-top"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1F1F1F] text-white font-bold flex items-center justify-center text-lg">
                      {talent.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </Link>

              {/* Status Badge */}
              <div className="absolute -bottom-1 -right-1 bg-white p-0.5 shadow-xs">
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#fce8e0] text-[#E7040D] text-[10px] font-bold">
                  <SealCheck size={12} weight="fill" />
                  <span>VETTED</span>
                </div>
              </div>
            </div>

            {/* Availability Pill */}
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60">
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
              <Link href={`/talent/${talent.id}`}>
                <h2 className="text-[18px] sm:text-[19px] font-black text-[#1F1F1F] tracking-tight group-hover:text-[#E7040D] transition-colors">
                  {talent.name}
                </h2>
              </Link>
              <SealCheck size={16} weight="fill" className="text-[#E7040D] shrink-0" />
            </div>
            
            <p className="text-[13.5px] font-bold text-zinc-800 leading-snug">
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
              <span className="font-semibold text-zinc-700">{talent.experienceYears}</span>
            </div>
          </div>

          {/* Editorial Highlight Metric Badge (No AI Sparkle Icon) */}
          <div className="mb-3.5 p-2.5 bg-[#FAF8F5] border-l-2 border-[#E7040D] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[12px] text-zinc-700">
              <span className="font-bold text-zinc-900">{talent.highlightMetric}</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Verified
            </span>
          </div>

          {/* Bio Summary */}
          <p className="text-[13px] text-zinc-600 leading-relaxed line-clamp-2 mb-4">
            {talent.bio}
          </p>

          {/* Skill Badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {talent.skills.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-none bg-[#F5F5F7] text-[#1F1F1F] text-[11.5px] font-medium border border-zinc-200/60"
              >
                {skill}
              </span>
            ))}
            {talent.skills.length > 5 && (
              <span className="px-2 py-0.5 text-zinc-400 text-[11px] font-semibold">
                +{talent.skills.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions: Contact & Hire */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
          {/* Quick Social / Portfolio Links */}
          <div className="flex items-center gap-1.5 text-zinc-400">
            {talent.githubUrl && (
              <a
                href={talent.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubLogo size={16} weight="bold" />
              </a>
            )}
            {talent.linkedinUrl && (
              <a
                href={talent.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
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
                className="p-1.5 hover:text-[#E7040D] hover:bg-red-50 transition-colors"
                aria-label="Portfolio"
              >
                <Globe size={16} weight="bold" />
              </a>
            )}
          </div>

          {/* Hire Talent CTA Button (Navigates to Talent Preview Page) */}
          <Link
            href={`/talent/${talent.id}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-none bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13px] font-bold transition-all shadow-xs cursor-pointer active:scale-98"
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
