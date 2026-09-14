"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import {
  EXPERIENCE_LEVEL_CARDS,
  calculateExperienceCounts,
} from "@/lib/experience";
import { SAMPLE_JOBS } from "@/data/jobs";

interface ExperienceSectionProps {
  counts?: Record<string, number>;
  jobs?: any[];
}

export function ExperienceSection({ counts: propCounts, jobs }: ExperienceSectionProps) {
  // Use passed counts, or compute from passed jobs, or fall back to SAMPLE_JOBS counts
  const effectiveCounts =
    propCounts ||
    calculateExperienceCounts(jobs && jobs.length > 0 ? jobs : SAMPLE_JOBS);

  return (
    <section className="w-full bg-white py-16 sm:py-20 px-6 sm:px-10 lg:px-16 border-b border-zinc-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black text-[#1F1F1F] tracking-[-0.025em] leading-[1.18] mb-3">
            Explore opportunities that match your experience
          </h2>
          <p className="text-[15px] sm:text-[16.5px] text-zinc-600 font-normal leading-[1.7]">
            Choose your level and discover jobs tailored to your experience and career goals.
          </p>
        </div>

        {/* Mobile Single-Line Carousel / Desktop 6-Column Grid */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory pb-4 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0">
          {EXPERIENCE_LEVEL_CARDS.map((level) => {
            const count = effectiveCounts[level.id] ?? 0;

            return (
              <Link
                key={level.id}
                href={level.href}
                className="group relative shrink-0 snap-start w-[260px] xs:w-[280px] sm:w-auto h-[440px] sm:h-[390px] lg:h-[420px] overflow-hidden bg-zinc-100 flex flex-col justify-end shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                {/* Studio Portrait Image */}
                <Image
                  src={level.image}
                  alt={level.alt}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Bottom Gradient Shadow for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />

                {/* Card Text Content */}
                <div className="relative z-20 p-4 sm:p-5 text-white flex flex-col gap-1.5">
                  <h3 className="text-lg sm:text-[19px] font-bold tracking-tight text-white leading-snug">
                    {level.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-zinc-300 font-medium">
                    {count === 1 ? "Job available:" : "Jobs available:"}{" "}
                    <span className="font-bold text-white">{count}</span>
                  </p>

                  {/* View Jobs Action Link */}
                  <div className="pt-2 flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-white group-hover:text-red-400 transition-colors">
                    <span>View jobs</span>
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-black transition-all">
                      <ArrowRight size={10} weight="bold" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
