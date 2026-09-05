"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CaretLeft,
  Clock,
  BookOpen,
  GraduationCap,
  Star,
  Users,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { COURSES_DATA } from "@/data/courses";
import { AppHeader } from "@/components/navigation/app-header";
import { Footer } from "@/components/footer";

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1F1F1F] flex flex-col font-sans">
      <AppHeader activeTab="about" />

      {/* Top Back Bar */}
      <div className="bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-zinc-700 hover:text-[#E7040D] transition-colors cursor-pointer"
          >
            <CaretLeft size={16} weight="bold" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-4 pb-20">
        
        {/* Header Banner */}
        <div className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-10 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fce8e0] text-[#E7040D] text-[11px] font-black uppercase tracking-wider mb-3">
            <GraduationCap size={15} weight="fill" />
            <span>Trax Learning Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1F1F1F] tracking-[-0.02em] mb-2">
            Upskilling & Practical Engineering Courses
          </h1>
          <p className="text-[14.5px] text-zinc-600 max-w-2xl leading-relaxed">
            Curated tracks designed to help African software engineers, designers, and product leaders scale their careers.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES_DATA.map((course) => (
            <Link
              key={course.id}
              href={`/learning/${course.id}`}
              className="bg-white border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(231,4,13,0.06)] hover:border-[#E7040D]/40 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="relative aspect-[16/9] w-full bg-zinc-100 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#1F1F1F] uppercase tracking-wide">
                    {course.level}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[12px] text-zinc-400 mb-2">
                    <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                      <Star size={13} weight="fill" />
                      {course.rating} ({course.ratingsCount})
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} weight="regular" />
                      {course.duration}
                    </span>
                  </div>

                  <h2 className="text-[17px] font-black text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug mb-3 tracking-tight">
                    {course.title}
                  </h2>

                  <p className="text-[13px] text-zinc-600 leading-relaxed line-clamp-2 mb-4">
                    {course.summary}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {course.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-[#FAF8F5] text-[#1F1F1F] text-[11.5px] font-medium border border-zinc-200/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-zinc-100 mt-4">
                <span className="text-[12.5px] font-bold text-zinc-500 group-hover:text-[#E7040D] transition-colors">
                  View Course Details
                </span>
                <ArrowUpRight size={14} weight="bold" className="text-zinc-400 group-hover:text-[#E7040D] transition-colors" />
              </div>

            </Link>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
