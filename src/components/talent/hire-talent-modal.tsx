"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  SealCheck,
  WhatsappLogo,
  EnvelopeSimple,
  MapPin,
  Clock,
  Copy,
  Check,
} from "@phosphor-icons/react";
import { TalentProfile } from "@/types";

interface HireTalentModalProps {
  talent: TalentProfile | null;
  onClose: () => void;
}

export function HireTalentModal({ talent, onClose }: HireTalentModalProps) {
  const [copied, setCopied] = useState(false);

  if (!talent) return null;

  const defaultMessage = `Hello ${talent.name}, I discovered your profile on Trax Jobs (${talent.title}). We would love to discuss an open role with you.`;

  const mailtoLink = `mailto:${talent.email}?subject=${encodeURIComponent(
    `Opportunity via Trax Jobs: ${talent.title}`
  )}&body=${encodeURIComponent(defaultMessage)}`;

  const whatsappNumber = talent.whatsapp || talent.contactValue.replace(/[^0-9]/g, "");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  const copyEmail = () => {
    navigator.clipboard.writeText(talent.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Pristine Clean Modal Container */}
      <div className="w-full max-w-[480px] bg-white rounded-none border border-zinc-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-950 p-1.5 transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <X size={18} weight="bold" />
        </button>

        <div className="p-7 sm:p-8">
          
          {/* Candidate Profile Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-none bg-white border border-zinc-200/90 shadow-2xs overflow-hidden shrink-0">
              <Image
                src={talent.avatar}
                alt={talent.name}
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="min-w-0 flex-1 pr-6">
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="text-[18px] font-black text-[#1F1F1F] tracking-tight truncate">
                  {talent.name}
                </h3>
                <SealCheck size={16} weight="fill" className="text-[#E7040D] shrink-0" />
              </div>

              <p className="text-[13px] font-medium text-zinc-700 leading-snug">
                {talent.title}
              </p>

              <div className="flex items-center gap-2 text-[12px] text-zinc-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin size={13} weight="bold" className="text-zinc-400" />
                  {talent.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} weight="bold" className="text-zinc-400" />
                  {talent.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Simple Clean Divider */}
          <div className="h-px bg-zinc-100 mb-6" />

          {/* Reach-Out Actions */}
          <div className="space-y-3 mb-6">
            <p className="text-[12.5px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Reach out directly
            </p>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-none bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13.5px] font-bold transition-colors shadow-2xs text-center"
            >
              <WhatsappLogo size={18} weight="fill" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Email CTA */}
            <a
              href={mailtoLink}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-none bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-colors shadow-2xs text-center"
            >
              <EnvelopeSimple size={18} weight="bold" />
              <span>Send Email</span>
            </a>
          </div>

          {/* Clean Contact Box with Copy Button */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#FAF8F5] border border-zinc-200/80 text-[12.5px]">
            <span className="text-zinc-600 truncate pr-2 font-mono text-[12px]">
              {talent.email}
            </span>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-zinc-200/90 text-zinc-800 hover:text-black font-bold text-[11.5px] transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              {copied ? (
                <>
                  <Check size={12} weight="bold" className="text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} weight="bold" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
