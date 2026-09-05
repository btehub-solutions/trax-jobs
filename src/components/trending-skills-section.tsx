"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CaretLeft,
  CaretRight,
  Star,
  BookOpen,
  Users,
  Clock,
} from "@phosphor-icons/react";
import { COURSES_DATA } from "@/data/courses";

export function TrendingSkillsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-16 sm:py-20 relative overflow-hidden">
      {/* Subtle Graph-Paper Grid Background (Matching Homepage Standard) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e8e4dc 1px, transparent 1px),
            linear-gradient(to bottom, #e8e4dc 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-8">
        
        {/* Section Header with Trax Context and Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce8e0] text-[#E7040D] text-[11px] font-bold uppercase tracking-wider">
              <span>The Trax Skills Standard</span>
            </div>

            <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-zinc-950 tracking-tight leading-[1.2]">
              Build the skills leading African tech teams need today
            </h2>

            <p className="text-[15px] sm:text-[16px] text-zinc-500 leading-relaxed max-w-xl">
              Industry-vetted courses and practical masterclasses to accelerate your career and stand out to hiring managers.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-end">
            <button
              onClick={() => handleScroll("left")}
              className="w-10 h-10 rounded-none bg-white border border-zinc-200/90 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Previous courses"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-10 h-10 rounded-none bg-[#E7040D] hover:bg-[#CB030B] text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Next courses"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Cards (Zero Scrollbar Track, Pure Scroll) */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {COURSES_DATA.map((course) => (
            <Link
              key={course.id}
              href={`/learning/${course.id}`}
              className="w-[320px] sm:w-[360px] md:w-[380px] shrink-0 bg-white rounded-none border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-zinc-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group snap-start cursor-pointer block"
            >
              <div>
                {/* 1. Top Image Thumbnail Container */}
                <div className="relative h-52 w-full bg-zinc-100 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Top-Right Floating Duration Badge (Yellow Accent) */}
                  <div className="absolute top-3 right-3 bg-[#FBBF24] text-zinc-950 text-[11.5px] font-bold px-2.5 py-1 rounded-none flex items-center gap-1 shadow-xs">
                    <Clock size={13} weight="bold" className="text-zinc-900" />
                    <span>{course.durationWeeks}</span>
                  </div>
                </div>

                {/* 2. Card Body Content */}
                <div className="p-5 space-y-3.5">
                  {/* Level Pill Tag (Light Blue) */}
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#E0F2FE] text-[#0284C7] text-[12px] font-bold rounded-none">
                      {course.level}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-[17px] font-bold text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug tracking-tight line-clamp-2 min-h-[46px]">
                    {course.title}
                  </h3>

                  {/* Star Rating Row */}
                  <div className="flex items-center gap-1 pt-0.5">
                    <div className="flex items-center text-amber-400">
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                    </div>
                    <span className="text-[12.5px] text-zinc-500 font-medium ml-1">
                      ({course.rating.toFixed(1)} / {course.ratingsCount} Ratings)
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Bottom Metadata Divider Row */}
              <div className="px-5 pb-4">
                <div className="border-t border-zinc-100 pt-3.5 flex items-center justify-between text-[12.5px] text-zinc-500 font-medium">
                  {/* Lessons */}
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={14} weight="regular" className="text-zinc-400" />
                    <span>{course.lessonsCount} Lessons</span>
                  </div>

                  {/* Students */}
                  <div className="flex items-center gap-1.5">
                    <Users size={14} weight="regular" className="text-zinc-400" />
                    <span>{course.studentsCount} Students</span>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
