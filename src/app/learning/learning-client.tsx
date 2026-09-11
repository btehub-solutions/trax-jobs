"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CaretLeft,
  Clock,
  Star,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { CourseDetail } from "@/data/courses";
import { AppHeader } from "@/components/navigation/app-header";
import { Footer } from "@/components/footer";

interface LearningClientProps {
  courses: CourseDetail[];
}

export function LearningClient({ courses }: LearningClientProps) {
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
        
        {/* Editorial Masthead */}
        <div className="border-b border-zinc-200/80 pt-2 pb-8 sm:pb-10 mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1F1F1F] tracking-[-0.03em] leading-[1.12] mb-3">
            Upskilling & Practical Engineering Courses
          </h1>
          <p className="text-[15px] sm:text-[16px] text-zinc-600 max-w-2xl leading-relaxed">
            Curated tracks designed to help African software engineers, designers, and product leaders scale their careers.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-10">
          {courses.map((course) => (
            <Link
              key={course.id || course.slug}
              href={`/learning/${course.slug || course.id}`}
              className="flex flex-col group cursor-pointer transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Image with Peach Geometric Offset Background (Stacked Card Depth) */}
              <div className="relative pt-3.5 pr-3.5 sm:pt-4 sm:pr-4 mb-5">
                <div className="absolute top-0 right-0 w-[92%] h-[92%] bg-[#FCE8E0] rounded-none z-0" />
                <div className="relative z-10 w-full aspect-[16/10] sm:aspect-[16/9] bg-zinc-100 overflow-hidden rounded-none border border-zinc-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_28px_rgba(15,16,18,0.09)] transition-shadow duration-300">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-md text-[10.5px] font-bold text-[#1F1F1F] uppercase tracking-wider border border-zinc-200/40">
                    {course.level}
                  </div>
                </div>
              </div>

              {/* Course Details Below (Unboxed) */}
              <div className="flex flex-col flex-1 px-0.5">
                <div className="flex items-center gap-3 text-[12px] text-zinc-500 mb-2">
                  <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                    <Star size={13} weight="fill" />
                    {course.rating} ({course.ratingsCount})
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Clock size={13} weight="regular" />
                    {course.duration}
                  </span>
                </div>

                <h2 className="text-[17px] sm:text-[18.5px] font-black text-[#1F1F1F] group-hover:text-[#E7040D] transition-colors leading-snug mb-2.5 tracking-tight">
                  {course.title}
                </h2>

                <p className="text-[13.5px] text-zinc-600 leading-relaxed line-clamp-2 mb-4">
                  {course.summary}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {course.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-[11px] font-medium border border-zinc-200/80 rounded-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-zinc-900 group-hover:text-[#E7040D] transition-colors">
                    View Course Details
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="text-zinc-400 group-hover:text-[#E7040D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
