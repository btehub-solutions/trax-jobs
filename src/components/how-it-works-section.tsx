"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play, ArrowRight } from "@phosphor-icons/react";

interface StepCard {
  id: string;
  title: string;
  description: string;
  type: "brand-media" | "photo";
  image?: string;
  alt?: string;
  brandVariant?: "hiring" | "finding";
  badge?: string;
  ctaText: string;
  href: string;
}

const HIRING_STEPS: StepCard[] = [
  {
    id: "hiring-step-1",
    title: "Posting jobs is always free",
    description: "Submit open roles for editorial review with zero listing fees and no hidden platform charges.",
    type: "brand-media",
    brandVariant: "hiring",
    badge: "100% Free For Employers",
    ctaText: "Post a job",
    href: "/about?tab=contact&topic=hiring",
  },
  {
    id: "hiring-step-2",
    title: "Get proposals and hire",
    description: "Review curated Nigerian developers, product designers, and vetted technical talent ready to ship.",
    type: "photo",
    image: "https://images.pexels.com/photos/31307734/pexels-photo-31307734.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Young Black African engineer and designer reviewing work at computer",
    ctaText: "Browse talent",
    href: "/talent",
  },
  {
    id: "hiring-step-3",
    title: "Connect with zero commission",
    description: "Engage candidates directly through WhatsApp or email with zero intermediary fees.",
    type: "photo",
    image: "https://images.pexels.com/photos/37118089/pexels-photo-37118089.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Confident young Black African tech leader and engineer at workspace",
    ctaText: "How direct hiring works",
    href: "/about?tab=safety",
  },
];

const FINDING_STEPS: StepCard[] = [
  {
    id: "finding-step-1",
    title: "Find clients and remote jobs",
    description: "Browse verified opportunities across Lagos, Ogun State, pan-African hubs, and global remote teams.",
    type: "brand-media",
    brandVariant: "finding",
    badge: "Curated Opportunities",
    ctaText: "Browse open jobs",
    href: "/jobs",
  },
  {
    id: "finding-step-2",
    title: "Submit proposals for work",
    description: "Apply directly to hiring leads and engineering teams without resume black holes or gatekeepers.",
    type: "photo",
    image: "https://images.pexels.com/photos/36605397/pexels-photo-36605397.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Young Black African professional woman and software engineer",
    ctaText: "Submit your profile",
    href: "/about?tab=contact&topic=talent",
  },
  {
    id: "finding-step-3",
    title: "Get paid as you deliver work",
    description: "Build your career with vetted companies offering transparent compensation and meaningful growth.",
    type: "photo",
    image: "https://images.pexels.com/photos/31647492/pexels-photo-31647492.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Young Black African tech creative and professional ready to deliver high impact work",
    ctaText: "Explore top companies",
    href: "/companies",
  },
];

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<"hiring" | "finding">("hiring");
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const steps = activeTab === "hiring" ? HIRING_STEPS : FINDING_STEPS;

  // Reset scroll position on tab change
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <section className="w-full bg-white py-14 sm:py-20 px-6 sm:px-10 lg:px-16 border-b border-zinc-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header with Pill Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-black text-[#1F1F1F] tracking-[-0.025em] leading-[1.18]">
              How it works
            </h2>
            <p className="text-[14.5px] sm:text-[16px] text-zinc-600 font-normal leading-[1.6] mt-1.5">
              Transparent, human-reviewed hiring built for Africa&apos;s fast-moving tech ecosystem.
            </p>
          </div>

          {/* Interactive Pill Switcher */}
          <div className="self-start sm:self-center inline-flex items-center rounded-full border border-zinc-200/90 p-1 bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab("hiring")}
              className={`rounded-full px-5 sm:px-6 py-2 text-[13.5px] sm:text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "hiring"
                  ? "bg-[#E7040D] hover:bg-[#CB030B] text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
              aria-pressed={activeTab === "hiring"}
            >
              For hiring
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("finding")}
              className={`rounded-full px-5 sm:px-6 py-2 text-[13.5px] sm:text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "finding"
                  ? "bg-[#E7040D] hover:bg-[#CB030B] text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
              aria-pressed={activeTab === "finding"}
            >
              For finding work
            </button>
          </div>
        </div>

        {/* 3 Cards Grid / Mobile Carousel */}
        <div
          ref={carouselRef}
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col group shrink-0 snap-start w-[84vw] max-w-[340px] md:w-auto"
            >
              {/* Media Card Container (Clickable to target page) */}
              <Link
                href={step.href}
                className="relative aspect-[16/11] sm:aspect-[4/3] rounded-[24px] overflow-hidden bg-zinc-100 shadow-xs group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 block"
              >
                {step.type === "brand-media" ? (
                  step.brandVariant === "hiring" ? (
                    /* For hiring Brand Card: Warm subtle lime-peach gradient with Trax logo */
                    <div className="w-full h-full bg-gradient-to-br from-[#EEFDF0] via-[#FAF6E9] to-[#FDF2EE] p-8 flex flex-col items-center justify-center relative select-none">
                      {/* Ambient brand glow */}
                      <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-emerald-200/30 blur-2xl" />
                      <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#E7040D]/10 blur-2xl" />

                      {/* Brand Logo */}
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="relative w-36 h-12 mb-3">
                          <Image
                            src="/images/trax-logo.png"
                            alt="Trax Jobs"
                            fill
                            sizes="144px"
                            className="object-contain"
                            priority
                          />
                        </div>
                        <span className="text-[17px] font-bold text-zinc-900 tracking-tight">
                          Get started
                        </span>
                        <span className="mt-2 inline-block px-3 py-1 rounded-full bg-white/80 border border-zinc-200/80 text-[11px] font-semibold text-zinc-700 tracking-wide uppercase">
                          Zero listing cost
                        </span>
                      </div>

                      {/* Play/Pause Micro-Action */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsPlaying((prev) => !prev);
                        }}
                        aria-label={isPlaying ? "Pause animation" : "Play animation"}
                        className="absolute bottom-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-zinc-800 shadow-xs hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                      >
                        {isPlaying ? (
                          <Pause size={15} weight="bold" />
                        ) : (
                          <Play size={15} weight="fill" className="ml-0.5" />
                        )}
                      </button>
                    </div>
                  ) : (
                    /* For finding work Brand Card: Dark charcoal card with stylized upward momentum arrows */
                    <div className="w-full h-full bg-[#161616] p-8 flex flex-col items-center justify-center relative overflow-hidden select-none">
                      {/* Upward graphic arrows motif */}
                      <div className="absolute inset-0 flex items-end justify-center gap-6 pb-6 opacity-90">
                        {/* Left arrow */}
                        <div className="flex flex-col items-center">
                          <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[24px] border-b-white" />
                          <div className="w-9 h-28 bg-white" />
                        </div>
                        {/* Center tall arrow */}
                        <div className="flex flex-col items-center">
                          <div className="w-0 h-0 border-l-[22px] border-l-transparent border-r-[22px] border-r-transparent border-b-[28px] border-b-white" />
                          <div className="w-11 h-44 bg-white" />
                        </div>
                        {/* Right arrow */}
                        <div className="flex flex-col items-center">
                          <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[24px] border-b-white" />
                          <div className="w-9 h-32 bg-white" />
                        </div>
                      </div>

                      {/* Trax Red Accent Badge */}
                      <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[#E7040D] animate-pulse" />
                        <span className="text-[11px] font-bold tracking-wider uppercase text-white">
                          Verified Roles
                        </span>
                      </div>

                      {/* Play/Pause Micro-Action */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsPlaying((prev) => !prev);
                        }}
                        aria-label={isPlaying ? "Pause animation" : "Play animation"}
                        className="absolute bottom-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-zinc-900 shadow-xs hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                      >
                        {isPlaying ? (
                          <Pause size={15} weight="bold" />
                        ) : (
                          <Play size={15} weight="fill" className="ml-0.5" />
                        )}
                      </button>
                    </div>
                  )
                ) : (
                  /* Photographic Card with authentic Black African tech professional */
                  <>
                    <Image
                      src={step.image!}
                      alt={step.alt || step.title}
                      fill
                      sizes="(max-width: 768px) 85vw, 33vw"
                      className="object-cover object-[center_20%] group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                )}
              </Link>

              {/* Text Information Below Card */}
              <div className="mt-4 flex flex-col">
                <Link href={step.href} className="group-hover:text-[#E7040D] transition-colors duration-200">
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1F1F1F] tracking-[-0.015em] leading-[1.3] group-hover:text-[#E7040D] transition-colors duration-200 line-clamp-2">
                    {step.title}
                  </h3>
                </Link>
                <p className="text-[14px] sm:text-[14.5px] text-zinc-600 font-normal leading-[1.65] mt-1.5">
                  {step.description}
                </p>
                <Link
                  href={step.href}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#E7040D] hover:text-[#CB030B] mt-2.5 w-fit group/cta"
                >
                  <span className="underline underline-offset-4 decoration-[#E7040D]/40 group-hover/cta:decoration-[#E7040D]">
                    {step.ctaText}
                  </span>
                  <ArrowRight size={13} weight="bold" className="transform group-hover/cta:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
