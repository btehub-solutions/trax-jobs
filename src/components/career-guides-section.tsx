"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

/* ─────────────────────────────────────────────────────────────
   Audience Categories
───────────────────────────────────────────────────────────── */
const TABS = [
  { id: "job-hunters", label: "Job hunters" },
  { id: "decision-makers", label: "Founders & Recruiters" },
  { id: "students", label: "Students & Interns" },
  { id: "experienced", label: "Senior Engineers" },
];

/* ─────────────────────────────────────────────────────────────
   Guides Data (Rooted in Nigerian Tech Ecosystem)
───────────────────────────────────────────────────────────── */
const GUIDES = [
  {
    slug: "ace-your-tech-interview",
    category: "job-hunters",
    title: "Ace your tech interview",
    tagline: "Technical screening & system design",
    description: "Practical strategies to tackle take-home assessments, live coding rounds, and behavioral questions at top Nigerian fintechs.",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "5 min read",
    href: "/guides/ace-your-tech-interview",
  },
  {
    slug: "follow-african-hiring-trends",
    category: "job-hunters",
    title: "Follow African hiring trends",
    tagline: "Compensation & market data",
    description: "Quarterly salary benchmarks across Lagos, Abuja, and remote roles. Track what Series A and B startups are actively paying.",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "7 min read",
    href: "/guides/follow-african-hiring-trends",
  },
  {
    slug: "apply-effectively-land-offers",
    category: "job-hunters",
    title: "Apply effectively & land offers",
    tagline: "Outreach & portfolio optimization",
    description: "How to position your GitHub, case studies, and CV so hiring leads reach out directly without going through automated filters.",
    image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "4 min read",
    href: "/guides/apply-effectively-land-offers",
  },
  {
    slug: "hire-engineers-without-noise",
    category: "decision-makers",
    title: "Hire engineers without noise",
    tagline: "Technical evaluation frameworks",
    description: "How engineering managers at Flutterwave and Paystack evaluate candidates fairly while keeping hiring pipelines lean.",
    image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "6 min read",
    href: "/guides/hire-engineers-without-noise",
  },
  {
    slug: "break-into-tech-campus-guide",
    category: "students",
    title: "Break into tech from Ogun & beyond",
    tagline: "Campus to startup transition",
    description: "A step-by-step roadmap for Nigerian university students and bootcamp grads looking for their first paid software internship.",
    image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "6 min read",
    href: "/guides/break-into-tech-campus-guide",
  },
  {
    slug: "negotiating-equity-usd-contracts",
    category: "experienced",
    title: "Negotiating equity & USD contracts",
    tagline: "Senior leadership playbook",
    description: "What senior architects and tech leads should know about 4-year vesting, stock options, and currency hedge contracts in Nigeria.",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "8 min read",
    href: "/guides/negotiating-equity-usd-contracts",
  },
];

export interface CareerGuideItem {
  slug: string;
  category: string;
  title: string;
  tagline?: string;
  description: string;
  image: string;
  readTime: string;
  href?: string;
}

interface CareerGuidesSectionProps {
  guides?: CareerGuideItem[];
}

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export function CareerGuidesSection({ guides }: CareerGuidesSectionProps = {}) {
  const [activeTab, setActiveTab] = useState("job-hunters");

  const allGuides = guides && guides.length > 0 ? guides : GUIDES;
  const filtered = allGuides.filter((g) => g.category === activeTab);
  const visibleGuides = (filtered.length > 0 ? filtered : allGuides).slice(0, 3);

  return (
    <section className="w-full bg-[#FAF8F5] py-24 sm:py-32 relative overflow-hidden">
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
        <div className="max-w-2xl mb-10">
          <h2 className="text-[34px] sm:text-[46px] lg:text-[52px] font-extrabold tracking-[-0.03em] text-zinc-950 leading-[1.12] mb-4">
            Guide to getting hired
          </h2>
          
          <p className="text-[16px] sm:text-[17px] text-zinc-600 leading-[1.7]">
            From your first application in Lagos to landing high-impact remote roles across Africa. We have got you covered.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar mb-10 py-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-[13.5px] font-bold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 select-none ${
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

        {/* Visual Guide Cards (90-Degree Square Edges, Compact & Minimal) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {visibleGuides.map((guide, idx) => (
            <Link
              key={guide.slug || idx}
              href={guide.href || `/guides/${guide.slug}`}
              className="bg-white rounded-none border border-zinc-200/80 overflow-hidden shadow-[0_6px_20px_-4px_rgba(15,16,18,0.05)] hover:shadow-[0_16px_32px_-6px_rgba(231,4,13,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-[250px] sm:h-[280px] w-full bg-zinc-100 overflow-hidden rounded-none">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Minimal Card Title Area */}
              <div className="p-4 sm:p-5">
                <h3 className="text-[17px] sm:text-[19px] font-extrabold text-zinc-950 tracking-[-0.02em] leading-snug group-hover:text-[#E7040D] transition-colors">
                  {guide.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
