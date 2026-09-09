"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Megaphone, ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

const announcements = [
  {
    id: "safety",
    prefix: "Safety notice:",
    body: "Trax never asks for payment. All listings are verified.",
    linkText: "Learn more",
    href: "/about?tab=safety",
  },
  {
    id: "jobs",
    prefix: "Career goals?",
    body: "Explore vetted tech roles across top African startups.",
    linkText: "Browse jobs",
    href: "/jobs",
  },
  {
    id: "talent",
    prefix: "Hiring talent?",
    body: "Connect with verified software engineers and designers.",
    linkText: "Hire talent",
    href: "/talent",
  },
  {
    id: "learning",
    prefix: "Level up:",
    body: "Cohort masterclasses in Product, Data, and Tech.",
    linkText: "Explore courses",
    href: "/learning",
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Transition handler
  const transitionTo = useCallback((getNextIndex: (current: number) => number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => getNextIndex(prev));
      setIsAnimating(false);
    }, 160);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      transitionTo(() => index);
    },
    [currentIndex, transitionTo]
  );

  const nextAnnouncement = useCallback(() => {
    transitionTo((prev) => (prev + 1) % announcements.length);
  }, [transitionTo]);

  const prevAnnouncement = useCallback(() => {
    transitionTo((prev) => (prev - 1 + announcements.length) % announcements.length);
  }, [transitionTo]);

  // Robust auto-rotation: advances every 5 seconds, pauses on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextAnnouncement();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextAnnouncement]);

  const current = announcements[currentIndex];

  return (
    <aside
      aria-label="Announcements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full bg-[#fef5f2] border-b border-[#fce8e0] py-2.5 sm:py-3 transition-colors relative z-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-3 relative">
        {/* Left balance spacer on desktop to maintain perfect center positioning */}
        <div className="hidden lg:block w-32 shrink-0" aria-hidden="true" />

        {/* Announcement Message Content: Left-aligned and sleek on mobile, centered on desktop */}
        <div
          className={`flex-1 flex items-start sm:items-center justify-start sm:justify-center gap-2 text-left sm:text-center transition-all duration-200 ${
            isAnimating ? "opacity-0 -translate-y-0.5" : "opacity-100 translate-y-0"
          }`}
        >
          <Megaphone
            size={16}
            weight="fill"
            className="text-[#E7040D] shrink-0 mt-0.5 sm:mt-0"
            aria-hidden="true"
          />
          <p className="text-[12.5px] sm:text-[13.5px] lg:text-[14px] text-zinc-800 leading-snug sm:leading-normal text-left sm:text-center whitespace-normal lg:whitespace-nowrap">
            <span className="font-semibold text-zinc-950">{current.prefix} </span>
            <span className="text-zinc-700">{current.body} </span>
            <Link
              href={current.href}
              className="inline-flex items-center gap-1 text-[#E7040D] hover:text-[#CB030B] font-semibold hover:underline shrink-0 ml-1 group"
            >
              <span>{current.linkText}</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#E7040D] text-white text-[9px] group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={8} weight="bold" />
              </span>
            </Link>
          </p>
        </div>

        {/* Desktop Navigation Controls (Right Pinned) */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0 w-32 justify-end">
          {/* Subtle Previous / Next arrows */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={prevAnnouncement}
              className="p-1 rounded text-zinc-400 hover:text-[#E7040D] hover:bg-[#fce8e0] transition-colors cursor-pointer"
              aria-label="Previous announcement"
            >
              <CaretLeft size={13} weight="bold" />
            </button>
            <button
              onClick={nextAnnouncement}
              className="p-1 rounded text-zinc-400 hover:text-[#E7040D] hover:bg-[#fce8e0] transition-colors cursor-pointer"
              aria-label="Next announcement"
            >
              <CaretRight size={13} weight="bold" />
            </button>
          </div>

          {/* 4 Interactive pagination dots on desktop */}
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Announcement slides">
            {announcements.map((ann, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={ann.id}
                  onClick={() => goTo(idx)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-4 h-1.5 bg-[#E7040D]"
                      : "w-1.5 h-1.5 bg-[#f9cbb9] hover:bg-[#ee7150]"
                  }`}
                  aria-label={`Go to announcement ${idx + 1}: ${ann.prefix}`}
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


