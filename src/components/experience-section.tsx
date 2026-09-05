"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

interface ExperienceLevel {
  id: string;
  title: string;
  count: number;
  image: string;
  alt: string;
  href: string;
}

const experienceLevels: ExperienceLevel[] = [
  {
    id: "no-experience",
    title: "No Experience",
    count: 100,
    image:
      "https://images.pexels.com/photos/31647492/pexels-photo-31647492.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Young creative African talent with no prior formal experience",
    href: "/jobs?level=no-experience",
  },
  {
    id: "internship-graduate",
    title: "Internship & Graduate",
    count: 126,
    image:
      "https://images.pexels.com/photos/4183516/pexels-photo-4183516.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Confident young African graduate in formal attire ready to start their career",
    href: "/jobs?level=internship",
  },
  {
    id: "entry-level",
    title: "Entry level",
    count: 2301,
    image:
      "https://images.pexels.com/photos/36605397/pexels-photo-36605397.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Smiling African professional woman ready for entry-level tech roles",
    href: "/jobs?level=entry",
  },
  {
    id: "mid-level",
    title: "Mid level",
    count: 1142,
    image:
      "https://images.pexels.com/photos/31307734/pexels-photo-31307734.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Focused African mid-level engineer and designer",
    href: "/jobs?level=mid",
  },
  {
    id: "senior-level",
    title: "Senior level",
    count: 447,
    image:
      "https://images.pexels.com/photos/37118089/pexels-photo-37118089.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Confident African senior tech leader and architect",
    href: "/jobs?level=senior",
  },
  {
    id: "executive-level",
    title: "Executive level",
    count: 41,
    image:
      "https://images.pexels.com/photos/28426641/pexels-photo-28426641.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Distinguished African executive and startup founder",
    href: "/jobs?level=executive",
  },
];

export function ExperienceSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 px-6 sm:px-10 lg:px-16 border-b border-zinc-100">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111827] tracking-tight leading-tight mb-3">
            Explore opportunities that match your experience
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 font-normal">
            Choose your level and discover jobs tailored to your experience and
            career goals.
          </p>
        </div>

        {/* 6 Portrait Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {experienceLevels.map((level) => (
            <Link
              key={level.id}
              href={level.href}
              className="group relative h-[320px] sm:h-[380px] lg:h-[410px] rounded-none overflow-hidden bg-zinc-100 flex flex-col justify-end shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
            >
              {/* Studio Portrait Image */}
              <Image
                src={level.image}
                alt={level.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
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
                  Jobs available:{" "}
                  <span className="font-bold text-white">{level.count}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
