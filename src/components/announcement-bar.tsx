"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, ArrowRight } from "@phosphor-icons/react";

const announcements = [
  {
    prefix: "Big career goals?",
    body: "We've made it easier to search for jobs, discover employers, build new skills, and confidently take your next career step.",
    linkText: "See what's new.",
    href: "/jobs",
  },
  {
    prefix: "Your safety matters:",
    body: "Trax Jobs never asks for payment from job seekers. Every listing is reviewed and verified by our editorial team.",
    linkText: "Learn more.",
    href: "/about",
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = announcements[currentIndex];

  return (
    <div className="w-full bg-[#fef5f2] border-b border-[#fce8e0] py-5 sm:py-6">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between relative">
        {/* Centered Wide Announcement Field */}
        <div className="w-full flex items-center justify-center gap-2.5 text-[14px] sm:text-[15px] text-zinc-800 leading-normal text-center">
          <Megaphone
            size={20}
            weight="regular"
            className="text-[#E7040D] shrink-0 inline"
          />
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5">
            <span className="font-normal text-zinc-900">{current.prefix}</span>
            <span className="text-zinc-700">{current.body}</span>
            <Link
              href={current.href}
              className="inline-flex items-center gap-1.5 text-[#E7040D] hover:text-[#CB030B] font-medium hover:underline shrink-0 ml-1"
            >
              <span>{current.linkText}</span>
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#E7040D] text-white text-[10px]">
                <ArrowRight size={10} weight="bold" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Pinned Pagination Dots */}
        <div className="hidden xl:flex items-center gap-2 absolute right-0 top-1/2 -translate-y-1/2">
          {announcements.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? "w-2.5 h-2.5 bg-[#E7040D]"
                  : "w-2 h-2 bg-[#f9cbb9] hover:bg-[#ee7150]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          <span className="w-2 h-2 rounded-full bg-[#f9cbb9]"></span>
          <span className="w-2 h-2 rounded-full bg-[#f9cbb9]"></span>
        </div>
      </div>
    </div>
  );
}
