"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Megaphone, ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

const announcements = [
  {
    id: "safety",
    prefix: "Your safety matters:",
    body: "Trax Jobs never asks for payment from job seekers. Every listing is reviewed and verified by our editorial team.",
    linkText: "Safety policy.",
    href: "/about?tab=safety",
  },
  {
    id: "jobs",
    prefix: "Big career goals?",
    body: "Explore curated engineering, design, and product roles at high-growth African tech startups.",
    linkText: "Browse jobs.",
    href: "/jobs",
  },
  {
    id: "talent",
    prefix: "Hiring tech talent?",
    body: "Connect directly with verified African software engineers, designers, and product leaders.",
    linkText: "Hire talent.",
    href: "/talent",
  },
  {
    id: "learning",
    prefix: "Level up your craft:",
    body: "Practical, cohort-based courses in Product Management, Data Analytics, and System Design.",
    linkText: "Explore learning.",
    href: "/learning",
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 150);
    },
    [currentIndex]
  );

  const nextAnnouncement = useCallback(() => {
    goTo((currentIndex + 1) % announcements.length);
  }, [currentIndex, goTo]);

  const prevAnnouncement = useCallback(() => {
    goTo((currentIndex - 1 + announcements.length) % announcements.length);
  }, [currentIndex, goTo]);

  // Auto rotation every 6 seconds, pauses on hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextAnnouncement();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, nextAnnouncement]);

  const current = announcements[currentIndex];

  return (
    <aside
      aria-label="Announcements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full bg-[#fef5f2] border-b border-[#fce8e0] py-3.5 sm:py-4 transition-colors relative z-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between relative">
        {/* Left side subtle spacer to balance desktop alignment */}
        <div className="hidden xl:block w-24 shrink-0" aria-hidden="true" />

        {/* Centered Announcement Content */}
        <div
          className={`w-full flex items-center justify-center gap-2.5 text-[13.5px] sm:text-[14.5px] text-zinc-800 leading-relaxed text-center px-2 transition-all duration-200 ${
            isAnimating ? "opacity-0 -translate-y-0.5" : "opacity-100 translate-y-0"
          }`}
        >
          <Megaphone
            size={18}
            weight="regular"
            className="text-[#E7040D] shrink-0 inline hidden xs:inline"
            aria-hidden="true"
          />
          <div className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5">
            <span className="font-semibold text-zinc-900">{current.prefix}</span>
            <span className="text-zinc-700">{current.body}</span>
            <Link
              href={current.href}
              className="inline-flex items-center gap-1 text-[#E7040D] hover:text-[#CB030B] font-semibold hover:underline shrink-0 ml-1 group"
            >
              <span>{current.linkText}</span>
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#E7040D] text-white text-[10px] group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={10} weight="bold" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Pinned Navigation Controls */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          {/* Previous / Next Arrow buttons */}
          <div className="flex items-center gap-1 mr-1">
            <button
              onClick={prevAnnouncement}
              className="p-1 rounded text-zinc-500 hover:text-[#E7040D] hover:bg-[#fce8e0] transition-colors cursor-pointer"
              aria-label="Previous announcement"
            >
              <CaretLeft size={13} weight="bold" />
            </button>
            <button
              onClick={nextAnnouncement}
              className="p-1 rounded text-zinc-500 hover:text-[#E7040D] hover:bg-[#fce8e0] transition-colors cursor-pointer"
              aria-label="Next announcement"
            >
              <CaretRight size={13} weight="bold" />
            </button>
          </div>

          {/* Interactive Pagination Dots for all 4 announcements */}
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Announcement slides">
            {announcements.map((ann, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={ann.id}
                  onClick={() => goTo(idx)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-5 h-2 bg-[#E7040D]"
                      : "w-2 h-2 bg-[#f9cbb9] hover:bg-[#ee7150]"
                  }`}
                  aria-label={`Announcement ${idx + 1} of ${announcements.length}: ${ann.prefix}`}
                  aria-selected={isActive}
                  role="tab"
                />
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

