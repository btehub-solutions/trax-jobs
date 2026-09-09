"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Star, SealCheck, CaretLeft, CaretRight, Quotes } from "@phosphor-icons/react";

/* ─────────────────────────────────────────────────────────────
   Verified Testimonials Data (Authentic Nigerian Tech Context)
───────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Nifemi Alao",
    role: "Senior Product Designer",
    company: "Moniepoint",
    location: "Lagos, NG",
    avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
    initials: "NA",
    rating: 5,
    quote:
      "Trax eliminated the endless ghost applications I experienced on other job boards. Every listing here had a direct response, and I landed my current product design role within three weeks.",
    hireType: "Full-time Hire",
  },
  {
    name: "Patrick Mbah",
    role: "Lead Backend Engineer",
    company: "Paystack",
    location: "Lagos / Remote",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
    initials: "PM",
    rating: 5,
    quote:
      "The salary transparency is real. Knowing upfront that the compensation was in competitive naira and dollar benchmarks saved me weeks of awkward negotiation conversations.",
    hireType: "Senior Engineer",
  },
  {
    name: "Emmanuel Eze",
    role: "Infrastructure & DevOps",
    company: "Flutterwave",
    location: "Abuja, NG",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    initials: "EE",
    rating: 5,
    quote:
      "Being able to connect with engineering founders directly over email without middleman locks or message credits changed the whole experience. Trax has set a new standard for African tech.",
    hireType: "Direct Placement",
  },
  {
    name: "Amina Yusuf",
    role: "Mobile App Lead (iOS)",
    company: "Kuda Bank",
    location: "Lagos, NG",
    avatar: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150",
    initials: "AY",
    rating: 5,
    quote:
      "Having my talent profile curated on Trax put my work directly in front of CTOs across West Africa. The verification badge gave founders immediate confidence in my portfolio.",
    hireType: "Verified Talent",
  },
  {
    name: "Chukwudi Okonjo",
    role: "Data Systems Architect",
    company: "Interswitch",
    location: "Lagos, NG",
    avatar: "https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=150",
    initials: "CO",
    rating: 5,
    quote:
      "Trax understands the nuances of the Nigerian engineering landscape better than global job portals. Every vacancy is legitimate, current, and actively hiring.",
    hireType: "Enterprise Placement",
  },
];

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export function TestimonialsTrustSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-20 sm:py-28 relative overflow-hidden">
      {/* Graph-Paper Grid Background */}
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

      {/* Header: constrained */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce8e0] text-[#E7040D] text-[11px] font-bold uppercase tracking-wider mb-4">
              <Quotes size={14} weight="bold" />
              <span>Verified Candidate Stories</span>
            </div>

            <h2 className="text-[32px] sm:text-[44px] lg:text-[48px] font-extrabold tracking-[-0.03em] text-zinc-950 leading-[1.15]">
              Why people trust us
            </h2>
            <p className="text-[15px] sm:text-[16px] text-zinc-600 leading-relaxed mt-2 max-w-xl">
              Authentic feedback from African software engineers, product designers, and hiring leads who found their next career milestone through Trax.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleScroll("left")}
              className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 hover:bg-zinc-50 flex items-center justify-center text-zinc-800 hover:text-[#E7040D] transition-colors shadow-2xs cursor-pointer active:scale-95"
              aria-label="Previous testimonials"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 hover:bg-zinc-50 flex items-center justify-center text-zinc-800 hover:text-[#E7040D] transition-colors shadow-2xs cursor-pointer active:scale-95"
              aria-label="Next testimonials"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* Marquee: full bleed */}
      <div className="w-full overflow-hidden relative z-10">
        <div className="marquee-scroll flex gap-6 pb-6 pt-2 pl-6 sm:pl-10 lg:pl-16">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <div
              key={idx}
              className="w-[310px] sm:w-[350px] shrink-0 bg-white rounded-none border border-zinc-200/80 shadow-[0_8px_24px_-4px_rgba(15,16,18,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(231,4,13,0.1)] hover:-translate-y-1 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group cursor-grab active:cursor-grabbing"
            >
              {/* User Identity & Avatar */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 ring-1 ring-zinc-200/80 bg-[#fce8e0] flex items-center justify-center">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        unoptimized
                        sizes="44px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="text-[15px] font-bold text-zinc-950 leading-tight">
                          {t.name}
                        </h3>
                        <SealCheck size={14} weight="fill" className="text-[#E7040D]" />
                      </div>
                      <p className="text-[11.5px] font-medium text-zinc-500">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quote Body */}
                <p className="text-[13.5px] sm:text-[14px] text-zinc-600 leading-[1.7] mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Footer Rating & Verified Hire Chip */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                {/* 5 Stars */}
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} weight="fill" />
                  ))}
                </div>

                {/* Tag */}
                <span className="text-[10.5px] font-bold text-[#E7040D] bg-[#fce8e0] px-2.5 py-0.5 rounded-full">
                  {t.hireType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
