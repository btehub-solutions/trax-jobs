"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CaretLeft,
  CaretRight,
  Users,
  MapPin,
  SealCheck,
  Briefcase,
} from "@phosphor-icons/react";
import { TalentProfile } from "@/types";
import { SAMPLE_TALENT } from "@/data/talent";

const TALENT_CATEGORIES = [
  "All Specialties",
  "Engineering",
  "Design",
  "Product",
  "Data & AI",
];

interface FeaturedTalentSectionProps {
  talent?: TalentProfile[];
}

export function FeaturedTalentSection({
  talent: dynamicTalent,
}: FeaturedTalentSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All Specialties");
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeList =
    dynamicTalent && dynamicTalent.length > 0 ? dynamicTalent : SAMPLE_TALENT;

  const filteredTalent =
    activeCategory === "All Specialties"
      ? activeList
      : activeList.filter(
          (t) =>
            (t.category &&
              t.category.toLowerCase().includes(activeCategory.toLowerCase())) ||
            t.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
            t.skills.some((s) =>
              s.toLowerCase().includes(activeCategory.toLowerCase())
            )
        );

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [filteredTalent]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const isMobile =
        typeof window !== "undefined" && window.innerWidth < 640;
      const offset =
        direction === "left"
          ? isMobile
            ? -314
            : -260
          : isMobile
          ? 314
          : 260;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#fbf9f6] py-20 sm:py-28 relative overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black tracking-[-0.025em] text-[#1F1F1F] leading-[1.18] mb-4">
            Hire Africa&apos;s finest tech talent
          </h2>
          <p className="text-[15px] sm:text-[16.5px] text-zinc-600 leading-[1.7] max-w-2xl">
            Pre-vetted software engineers, product designers, and technical leaders
            ready to join your team. Direct founder outreach with zero platform
            lock-in.
          </p>
        </div>

        {/* Filter Pills & Carousel Controls Row */}
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Scrollable Filter Badges */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 pr-4">
            {TALENT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[13.5px] font-bold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 select-none ${
                    isActive
                      ? "bg-[#E7040D] text-white shadow-xs"
                      : "bg-white text-zinc-700 hover:text-zinc-950 border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-2xs ${
                canScrollLeft
                  ? "bg-white border-zinc-200/90 text-zinc-800 hover:text-[#E7040D] hover:bg-zinc-50 cursor-pointer active:scale-95"
                  : "bg-zinc-100/60 border-zinc-200/70 text-zinc-300 cursor-not-allowed"
              }`}
              aria-label="Previous talent"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-2xs ${
                canScrollRight
                  ? "bg-white border-zinc-200/90 text-zinc-800 hover:text-[#E7040D] hover:bg-zinc-50 cursor-pointer active:scale-95"
                  : "bg-zinc-100/60 border-zinc-200/70 text-zinc-300 cursor-not-allowed"
              }`}
              aria-label="Next talent"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Talent Cards Carousel Track - Exact Proportions of Company Cards */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-3 pt-2 snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredTalent.map((person) => {
            const availabilityLabel =
              person.availability === "Available immediately"
                ? "Available Now"
                : person.availability || "Available Now";

            return (
              <div
                key={person.id}
                className="w-[300px] sm:w-[360px] md:w-[380px] shrink-0 bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-zinc-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group snap-start select-none"
              >
                <div>
                  {/* 1. Top Image Thumbnail Container (Studio Portrait Framing) */}
                  <Link
                    href={`/talent/${person.slug || person.id}`}
                    className="relative h-[220px] sm:h-[215px] w-full bg-[#18181B] overflow-hidden block group/image"
                  >
                    {/* Ambient Blurred Backdrop */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <Image
                        src={person.avatar || "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover blur-2xl opacity-35 scale-125"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/25" />
                    </div>

                    {/* Sharp, Fully In-Frame Centered Portrait */}
                    <div className="relative w-full h-full flex items-center justify-center p-2 z-0">
                      <Image
                        src={
                          person.avatar ||
                          "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                        }
                        alt={person.name}
                        fill
                        sizes="(max-width: 640px) 300px, 380px"
                        className="object-contain object-center group-hover/image:scale-[1.03] transition-transform duration-300"
                        unoptimized
                      />
                    </div>

                    {/* Top-Right Floating Availability Badge (Trax Brand Red) */}
                    <div className="absolute top-3 right-3 z-10 bg-[#E7040D] text-white text-[11px] font-bold px-2.5 py-1 rounded-none flex items-center gap-1 shadow-sm">
                      <Briefcase size={12} weight="bold" className="text-white" />
                      <span>{availabilityLabel}</span>
                    </div>
                  </Link>

                  {/* 2. Card Body Content */}
                  <div className="p-5 space-y-3.5">
                    {/* Category Pill Tag + Action Button */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block px-3 py-1 bg-[#E0F2FE] text-[#0284C7] text-[12px] font-bold rounded-none">
                        {person.category || "Engineering"}
                      </span>

                      <Link
                        href={`/talent/${person.slug || person.id}`}
                        className="px-2.5 py-0.5 rounded-none text-[11px] font-bold border transition-all cursor-pointer select-none active:scale-95 bg-white hover:bg-zinc-50 border-zinc-200/90 text-zinc-800 hover:border-zinc-400 shadow-2xs"
                      >
                        Hire Talent
                      </Link>
                    </div>

                    {/* Talent Identity: Square Avatar + Name + Verified Badge */}
                    <Link
                      href={`/talent/${person.slug || person.id}`}
                      className="flex items-center gap-3 group/title"
                    >
                      <div className="w-11 h-11 rounded-none bg-[#FAF8F5] border border-zinc-200/90 shadow-2xs flex items-center justify-center overflow-hidden shrink-0">
                        <Image
                          src={
                            person.avatar ||
                            "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=160"
                          }
                          alt={person.name}
                          width={44}
                          height={44}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0 flex-1 flex items-center gap-1.5">
                        <h3 className="text-[17px] font-bold text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight truncate">
                          {person.name}
                        </h3>
                        <SealCheck
                          size={16}
                          weight="fill"
                          className="text-[#E7040D] shrink-0"
                        />
                      </div>
                    </Link>

                    {/* 2-line Bio / Editorial Headline */}
                    <p className="text-[13px] text-zinc-600 leading-[1.6] line-clamp-2 min-h-[42px] font-normal">
                      <strong className="text-zinc-950 font-bold">
                        {person.title}
                      </strong>{" "}
                      · {person.bio}
                    </p>
                  </div>
                </div>

                {/* 3. Bottom Metadata Divider Row */}
                <div className="px-5 pb-4">
                  <div className="border-t border-zinc-100 pt-3.5 flex items-center justify-between text-[12.5px] text-zinc-500 font-medium">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 truncate max-w-[55%]">
                      <MapPin
                        size={14}
                        weight="regular"
                        className="text-zinc-400 shrink-0"
                      />
                      <span className="truncate">
                        {person.location?.split("•")[0]?.split(",")?.slice(0, 2)?.join(",")?.trim() ||
                          "Nigeria · Remote"}
                      </span>
                    </div>

                    {/* Experience Years */}
                    <div className="flex items-center gap-1.5 shrink-0 text-zinc-700 font-semibold">
                      <Users
                        size={14}
                        weight="regular"
                        className="text-zinc-400 shrink-0"
                      />
                      <span>{person.experienceYears || "5+ yrs exp"}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
