"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GuideArticle, GUIDES_DATA } from "@/data/guides";

/* ─────────────────────────────────────────────────────────────
   Audience Categories
───────────────────────────────────────────────────────────── */
const TABS = [
  { id: "job-hunters", label: "Job hunters" },
  { id: "decision-makers", label: "Decision-makers" },
  { id: "students", label: "Students" },
  { id: "workers", label: "Workers" },
];

/* ─────────────────────────────────────────────────────────────
   Curated display titles (punchy 2-line editorial presentation)
───────────────────────────────────────────────────────────── */
const CURATED_SHORT_TITLES: Record<string, string> = {
  "apply-effectively-land-offers": "Apply\neffectively",
  "ace-your-tech-interview": "Ace your\ninterview",
  "follow-african-hiring-trends": "Follow hiring\ntrends",
  "hire-engineers-without-noise": "Hire without\nnoise",
  "break-into-tech-campus-guide": "Break into\ntech",
  "negotiating-equity-usd-contracts": "Negotiate\nequity",
  "hybrid-remote-work-negotiation": "Negotiate\nhybrid work",
};

// Verified high-resolution African tech photography fallbacks (zero broken links)
const VERIFIED_FALLBACK_IMAGES: Record<string, string> = {
  "apply-effectively-land-offers": "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=800",
  "ace-your-tech-interview": "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
  "follow-african-hiring-trends": "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800",
  "hire-engineers-without-noise": "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
  "break-into-tech-campus-guide": "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800",
  "negotiating-equity-usd-contracts": "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
  "hybrid-remote-work-negotiation": "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
};

function formatDisplayTitle(slug: string, fullTitle: string): string {
  if (CURATED_SHORT_TITLES[slug]) {
    return CURATED_SHORT_TITLES[slug];
  }
  const mainPart = fullTitle.includes(":") ? fullTitle.split(":")[0].trim() : fullTitle;
  const words = mainPart.split(" ");
  if (words.length <= 2) {
    return words.join("\n");
  }
  if (words.length === 3) {
    return `${words[0]} ${words[1]}\n${words[2]}`;
  }
  return `${words.slice(0, 2).join(" ")}\n${words.slice(2, 4).join(" ")}`;
}

interface CareerGuidesSectionProps {
  guides?: GuideArticle[];
}

/* ─────────────────────────────────────────────────────────────
   Main Component: Dynamic Guide to Getting Hired
───────────────────────────────────────────────────────────── */
export function CareerGuidesSection({ guides }: CareerGuidesSectionProps = {}) {
  const [activeTab, setActiveTab] = useState("job-hunters");

  // Fallback to verified local GUIDES_DATA if live Sanity dataset is loading or empty
  const allGuides = guides && guides.length > 0 ? guides : GUIDES_DATA;

  // Filter matching guides for the active category
  const matchingGuides = allGuides.filter((g) => {
    if (activeTab === "workers") {
      return g.category === "workers" || g.category === "experienced";
    }
    return g.category === activeTab;
  });

  // Ensure each tab always displays 3 complete, rich guides by supplementing with other published guides
  const populatedGuides = [...matchingGuides];
  if (populatedGuides.length < 3) {
    const supplement = allGuides.filter((g) => !populatedGuides.some((pg) => pg.slug === g.slug));
    populatedGuides.push(...supplement);
  }

  const visibleGuides = populatedGuides.slice(0, 3);

  return (
    <section className="w-full bg-[#FAF8F5] pt-6 sm:pt-10 lg:pt-14 pb-20 sm:pb-28 relative overflow-hidden">
      {/* Graph Paper Grid Canvas */}
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

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Header Block */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-black tracking-[-0.03em] text-[#1F1F1F] leading-[1.12] mb-3">
            Guide to getting
            <br />
            hired
          </h2>

          <p className="text-[15px] sm:text-[16.5px] text-zinc-600 leading-[1.7] max-w-xl">
            From first application in Lagos to landing high-impact remote roles across Africa. We have got you covered.
          </p>
        </div>

        {/* Tab Filter Pills: Exact Match to Featured Talent Section */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 -mx-6 px-6 sm:mx-0 sm:px-0 mb-8 sm:mb-10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-lg text-[13.5px] font-bold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 select-none shrink-0 ${
                  isActive
                    ? "bg-[#E7040D] text-white shadow-xs"
                    : "bg-white text-zinc-700 hover:text-zinc-950 border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Visual Guide Cards: Mobile Carousel & Desktop Grid (max-w-[880px]) */}
        <div
          className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory pb-6 sm:pb-0 pt-1 -mx-6 px-6 sm:mx-0 sm:px-0 max-w-[880px] scroll-px-6 sm:scroll-px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {visibleGuides.map((guide) => {
            const imageSrc = guide.image || VERIFIED_FALLBACK_IMAGES[guide.slug] || "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800";
            const displayTitle = formatDisplayTitle(guide.slug, guide.title);

            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="w-[280px] sm:w-full sm:max-w-[280px] shrink-0 snap-start bg-white rounded-lg border border-zinc-200/90 overflow-hidden shadow-[0_4px_16px_-4px_rgba(15,16,18,0.06)] hover:shadow-[0_16px_32px_-6px_rgba(231,4,13,0.12)] hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Image Container with editorial portrait framing */}
                <div className="relative h-[260px] sm:h-[280px] md:h-[300px] w-full bg-zinc-100 overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 640px) 300px, 280px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Minimal Card Title Area */}
                <div className="p-5 sm:p-5.5 bg-white flex-1 flex flex-col justify-start">
                  <h3 className="text-[20px] sm:text-[21.5px] font-black text-[#1F1F1F] tracking-[-0.025em] leading-[1.16] whitespace-pre-line group-hover:text-[#E7040D] transition-colors">
                    {displayTitle}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
