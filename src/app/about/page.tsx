"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import Contact from "@/components/ui/contact";

type AboutTab = "about" | "contact";

const TABS: { id: AboutTab; label: string }[] = [
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<AboutTab>("about");
  const [topicParam, setTopicParam] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab") as AboutTab | null;
    const topic = params.get("topic");
    if (tab === "contact") setActiveTab("contact");
    if (topic) setTopicParam(topic);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        {/* 1. Main Navigation Bar */}
        <Navbar />

        {/* 2. Sub-navigation Tabs Strip */}
        <div className="w-full bg-white border-b border-zinc-200">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <nav className="flex items-center gap-8 sm:gap-10 overflow-x-auto scrollbar-none" aria-label="About Us sub-navigation">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 text-[14.5px] font-medium transition-all relative whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "text-[#E7040D] font-semibold"
                        : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E7040D]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Active Tab: About Us */}
        {activeTab === "about" && (
          <>
            {/* 3. Panoramic Hero Banner */}
            <section className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center overflow-hidden bg-zinc-950">
          {/* Cityscape Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about-hero.jpg"
              alt="African Black tech professionals collaborating in a row at a modern workspace"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_30%] brightness-75 scale-105"
            />
            {/* Subtle multi-layer gradient for editorial contrast & readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/65" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center text-white space-y-4 sm:space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-[-0.02em] leading-tight text-white drop-shadow-sm">
              About Trax Jobs
            </h1>
            <p className="text-[15px] sm:text-[17px] text-zinc-200 leading-[1.7] max-w-3xl mx-auto font-normal drop-shadow-xs">
              Trax Jobs is Africa&apos;s trusted curated job board and tech employment intelligence platform, connecting qualified professionals with verified employers across the continent&apos;s tech ecosystem. Trax manually reviews and publishes every job, company, and talent listing to maintain high standards and pure signal.
            </p>
          </div>
        </section>

        {/* 4. Founder's Letter Section */}
        <section className="w-full bg-[#FFFFFF] py-16 sm:py-24 border-b border-zinc-100">
          <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Stylized Editorial Title + Founder Portrait */}
              <div className="lg:col-span-5 flex flex-col items-start lg:items-center relative">
                
                {/* Large Angled Editorial Lettering */}
                <div className="relative mb-6 select-none">
                  <span className="block text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-[#E7040D] leading-[0.95] uppercase">
                    FOUNDER&apos;S
                  </span>
                  <span className="block text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-[#E7040D] leading-[0.95] uppercase ml-3 sm:ml-6">
                    LETTER
                  </span>
                </div>

                {/* Founder Photo Card with Cutout Style */}
                <div className="relative w-full max-w-[320px] mx-auto">
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-[0_16px_36px_-6px_rgba(15,16,18,0.08)]">
                    <Image
                      src="/images/founder.jpg"
                      alt="Ben Sam Oladoyin, Founder of Trax Media"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Founder Name Capsule Badge */}
                  <div className="mt-4 flex flex-col items-center text-center">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      BY
                    </span>
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#E7040D]/40 bg-[#fdf2ee] text-[#E7040D] text-[13px] font-extrabold uppercase tracking-wide shadow-2xs">
                      BEN SAM OLADOYIN
                    </div>
                    <span className="text-[12px] text-zinc-500 font-medium mt-1">
                      Founder & Publisher, Trax Media Ltd
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column: Founder's Narrative Essay */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6 pt-2 lg:pt-4">
                
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-[#1F1F1F] tracking-[-0.02em] leading-tight">
                  Where do Africa&apos;s builders find their next chapter?
                </h2>

                <div className="space-y-4 text-[15px] sm:text-[16px] text-zinc-700 leading-[1.8] font-normal">
                  <p>
                    I have found myself asking this question at various stages of covering our continent&apos;s technology ecosystem. When we founded Trax, our editorial mission was straightforward: give African builders, operators, and founders an authentic voice, and document the capital, technology, and regional momentum shaping our future.
                  </p>

                  <p>
                    Yet as our reporting expanded from Abeokuta and Lagos to Nairobi, Accra, and Kigali, we kept seeing the exact same pain point across every tech hub: hiring was broken. Talented software engineers, product designers, and technical leaders were lost in spam-ridden job platforms filled with stale listings and dead links. At the same time, high-growth startups and venture-backed teams were spending months hunting for vetted candidates without clarity.
                  </p>

                  {/* Expandable Extended Narrative */}
                  {isExpanded && (
                    <div className="space-y-4 pt-1 animate-in fade-in duration-200">
                      <p>
                        The recruitment landscape for African tech had become a sterile, automated numbers game dominated by uncurated scrapers and ghost jobs. We realized that what Africa&apos;s digital economy needed was not another massive, unvetted directory. It needed high-conviction editorial curation.
                      </p>
                      <p>
                        Trax Jobs is our direct response. We apply the same journalistic standards, verification rigor, and regional ecosystem insights from our newsroom to every single job opening, company dossier, and talent profile published here. No scrapers, no noise, just real opportunity for Africa&apos;s builders.
                      </p>
                    </div>
                  )}
                </div>

                {/* Read More / Read Less Toggle */}
                <div>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center gap-1.5 text-[14.5px] font-bold text-[#E7040D] hover:text-[#CB030B] transition-colors cursor-pointer underline underline-offset-4"
                  >
                    <span>{isExpanded ? "Read less" : "Read more"}</span>
                    {isExpanded ? (
                      <CaretUp size={15} weight="bold" />
                    ) : (
                      <CaretDown size={15} weight="bold" />
                    )}
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 5. Our Solutions Section */}
        <section className="w-full bg-[#F7F5F0] py-20 sm:py-28 border-b border-zinc-200">
          <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
            
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1F1F1F] tracking-[-0.02em]">
                Our solutions
              </h2>
            </div>

            {/* 2-Column Solutions Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              
              {/* Card 1: Looking to hire? */}
              <div className="bg-[#E7040D] hover:bg-white text-white hover:text-[#1F1F1F] rounded-none p-8 sm:p-12 lg:p-14 flex flex-col justify-between transition-all duration-200 border border-transparent hover:border-zinc-200 shadow-sm hover:shadow-xl group cursor-default">
                <div className="space-y-6">
                  <div>
                    <span className="block text-[15px] sm:text-[17px] font-black tracking-tight text-white group-hover:text-[#1F1F1F] transition-colors mb-3">
                      Looking to hire?
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-[-0.02em] leading-[1.2] text-white group-hover:text-[#1F1F1F] transition-colors">
                      We help you find and engage the right people faster.
                    </h3>
                  </div>

                  <p className="text-[14.5px] sm:text-[15.5px] text-white/95 group-hover:text-zinc-800 leading-[1.7] transition-colors font-normal">
                    Our secret sauce: Shining a light on what already makes your company great with editorial vetting, authentic employer brand stories, and expert guidance, not to mention getting direct reach to vetted African tech talent across Trax Media. Win-win?
                  </p>

                  <p className="text-[11px] sm:text-[11.5px] text-white/80 group-hover:text-zinc-500 leading-relaxed transition-colors pt-4">
                    *Every single job and company listing is reviewed and published by Trax editors before publication to guarantee high signal quality.
                  </p>
                </div>

                <div className="pt-8 sm:pt-10">
                  <Link
                    href="/about?tab=contact&topic=hiring"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-none bg-[#0C1222] hover:bg-[#070b14] text-white text-[14px] font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Hire with Trax Jobs
                  </Link>
                </div>
              </div>

              {/* Card 2: Looking for a new role? */}
              <div className="bg-[#E7040D] hover:bg-white text-white hover:text-[#1F1F1F] rounded-none p-8 sm:p-12 lg:p-14 flex flex-col justify-between transition-all duration-200 border border-transparent hover:border-zinc-200 shadow-sm hover:shadow-xl group cursor-default">
                <div className="space-y-6">
                  <div>
                    <span className="block text-[15px] sm:text-[17px] font-black tracking-tight text-white group-hover:text-[#1F1F1F] transition-colors mb-3">
                      Looking for a new role?
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-[-0.02em] leading-[1.2] text-white group-hover:text-[#1F1F1F] transition-colors">
                      Your dream job is closer than you think.
                    </h3>
                  </div>

                  <p className="text-[14.5px] sm:text-[15.5px] text-white/95 group-hover:text-zinc-800 leading-[1.7] transition-colors font-normal">
                    We know job search can feel soul-crushing. At Trax Jobs, we match you with companies that align with your values, craft, and ambitions, not just your resume. Less time wasted on dead links and ghost roles. More opportunities that actually excite you.
                  </p>

                  <p className="text-[14px] sm:text-[15px] font-bold text-white group-hover:text-[#1F1F1F] transition-colors pt-2">
                    Stop settling. Start finding roles that fit.
                  </p>
                </div>

                <div className="pt-8 sm:pt-10">
                  <Link
                    href="/jobs"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-none bg-[#0C1222] hover:bg-[#070b14] text-white text-[14px] font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Explore jobs
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 6. Our Core Values Section */}
        <section className="w-full bg-white py-20 sm:py-28 border-b border-zinc-200">
          <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16">
            
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1F1F1F] tracking-[-0.02em]">
                Our Core Values
              </h2>
            </div>

            {/* Alternating Values List */}
            <div className="space-y-16 sm:space-y-24">
              
              {/* Row 1: Photo on Left | Card on Right (#0C1222 Trax Deep Navy) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Photo with Offset Accent Block */}
                <div className="lg:col-span-5 relative">
                  {/* Offset Color Accent Box */}
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#fce8e0] border border-[#f9cbb9] z-0" />
                  
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full bg-zinc-100 border border-zinc-200 overflow-hidden z-10 shadow-xs">
                    <Image
                      src="/images/value-1.jpg"
                      alt="African tech team collaborating with sticky notes and strategy board"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content Card */}
                <div className="lg:col-span-7 bg-[#0C1222] text-white p-8 sm:p-12 lg:p-14 rounded-none flex flex-col justify-center text-center space-y-4 shadow-sm min-h-[280px]">
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-[-0.02em] leading-tight">
                    Editorial Integrity Above All
                  </h3>
                  <p className="text-[14px] sm:text-[15.5px] text-zinc-300 leading-[1.8] max-w-xl mx-auto font-normal">
                    We never publish unverified roles or automated scraper noise. Every job, company dossier, and talent profile goes through human editorial review. If an opening does not meet our standard of authenticity and verified compensation, it does not get published.
                  </p>
                </div>

              </div>

              {/* Row 2: Card on Left (#E7040D Trax Brand Red) | Photo on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Content Card (Order on mobile: 2, desktop: 1) */}
                <div className="order-2 lg:order-1 lg:col-span-7 bg-[#E7040D] text-white p-8 sm:p-12 lg:p-14 rounded-none flex flex-col justify-center text-center space-y-4 shadow-sm min-h-[280px]">
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-[-0.02em] leading-tight">
                    Africa-First Tech Momentum
                  </h3>
                  <p className="text-[14px] sm:text-[15.5px] text-white/95 leading-[1.8] max-w-xl mx-auto font-normal">
                    From Abeokuta and Lagos to Nairobi, Accra, and Kigali, we believe African technical craft deserves world-class representation. We build employment infrastructure designed specifically for the builders, startups, and high-growth innovators shaping our continent.
                  </p>
                </div>

                {/* Photo with Offset Accent Block (Order on mobile: 1, desktop: 2) */}
                <div className="order-1 lg:order-2 lg:col-span-5 relative">
                  {/* Offset Color Accent Box */}
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#E7040D]/20 border border-[#E7040D]/30 z-0" />
                  
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full bg-zinc-100 border border-zinc-200 overflow-hidden z-10 shadow-xs">
                    <Image
                      src="/images/value-2.jpg"
                      alt="African tech builders smiling and celebrating milestone"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover"
                    />
                  </div>
                </div>

              </div>

              {/* Row 3: Photo on Left | Card on Right (#1F1F1F Trax Dark Charcoal) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Photo with Offset Accent Block */}
                <div className="lg:col-span-5 relative">
                  {/* Offset Color Accent Box */}
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#fce8e0] border border-[#f9cbb9] z-0" />
                  
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full bg-zinc-100 border border-zinc-200 overflow-hidden z-10 shadow-xs">
                    <Image
                      src="/images/value-3.jpg"
                      alt="African tech engineers having focused technical discussion"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content Card */}
                <div className="lg:col-span-7 bg-[#1F1F1F] text-white p-8 sm:p-12 lg:p-14 rounded-none flex flex-col justify-center text-center space-y-4 shadow-sm min-h-[280px]">
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-[-0.02em] leading-tight">
                    Relationships, Not Resumes
                  </h3>
                  <p className="text-[14px] sm:text-[15.5px] text-zinc-300 leading-[1.8] max-w-xl mx-auto font-normal">
                    Behind every portfolio and job opening are real people with ambitious visions. We connect employers and talent directly via verified email and WhatsApp, eliminating artificial friction, algorithmic black boxes, and recruiter gatekeeping.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* 7. Our People Section (100% Matching Arched Collage Reference) */}
        <section className="w-full bg-white py-20 sm:py-28 border-b border-zinc-200">
          <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
            
            {/* Header Content */}
            <div className="max-w-4xl mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1F1F1F] tracking-[-0.02em] mb-4">
                Our People
              </h2>
              <p className="text-[15px] sm:text-[16.5px] text-zinc-700 leading-[1.75] font-normal">
                Our dedicated team of journalists, talent curators, and technologists is committed to elevating Africa&apos;s tech employment ecosystem by focusing on verified opportunity and high-conviction curation. Leading the team is Ben Sam Oladoyin, Founder and Publisher of Trax Media, bringing editorial rigor, deep market intelligence, and verified quality standards to tech hiring across the continent.
              </p>
            </div>

            {/* Arched Portrait Collage Canvas */}
            <div className="w-full bg-[#fdf2ee] border border-[#fce8e0] rounded-none pt-12 sm:pt-16 px-4 sm:px-8 overflow-hidden relative shadow-[0_2px_16px_rgba(0,0,0,0.02)]">
              
              {/* Subtle Background Fluid SVG Wave Pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none">
                  <path d="M0,150 Q300,50 600,160 T1200,120" stroke="#f9cbb9" strokeWidth="1.5" fill="none" />
                  <path d="M0,220 Q400,280 800,180 T1200,240" stroke="#f9cbb9" strokeWidth="1.5" fill="none" />
                </svg>
              </div>

              {/* 6 Arched Team Portait Cards in a Staggered Wave */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 items-end relative z-10">
                
                {/* 1. Team Member 1 (Research & Tech Reporter) */}
                <div className="flex flex-col items-center">
                  {/* Floating Geometric Accent */}
                  <div className="w-3.5 h-3.5 bg-[#06B6D4] rotate-45 mb-2.5 shadow-2xs" />
                  <div className="h-[270px] sm:h-[310px] lg:h-[340px] w-full bg-[#1F1F1F] rounded-t-[100px] relative overflow-hidden flex items-end group shadow-sm">
                    <Image
                      src="/images/team-1.jpg"
                      alt="Trax Tech Reporter and Research Analyst"
                      fill
                      priority
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                {/* 2. Team Member 2 (Partnerships & Growth) */}
                <div className="flex flex-col items-center">
                  {/* Floating Geometric Accent */}
                  <div className="w-3.5 h-3.5 bg-[#F59E0B] rounded-full mb-2.5 shadow-2xs" />
                  <div className="h-[300px] sm:h-[350px] lg:h-[390px] w-full bg-[#1F1F1F] rounded-t-[110px] relative overflow-hidden flex items-end group shadow-sm">
                    <Image
                      src="/images/team-2.jpg"
                      alt="Trax Head of Ecosystem Partnerships"
                      fill
                      priority
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                {/* 3. Ben Sam Oladoyin (Founder & Publisher - Prominent Center Arch) */}
                <div className="flex flex-col items-center">
                  {/* Floating Geometric Accent (Trax Brand Red) */}
                  <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-[#E7040D] mb-2.5 shadow-2xs" />
                  <div className="h-[340px] sm:h-[390px] lg:h-[450px] w-full bg-[#1F1F1F] rounded-t-[130px] relative overflow-hidden flex items-end group border border-[#E7040D]/30 shadow-md">
                    <Image
                      src="/images/founder.jpg"
                      alt="Ben Sam Oladoyin, Founder & Publisher of Trax Media"
                      fill
                      priority
                      sizes="(max-width: 768px) 50vw, 240px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </div>

                {/* 4. Team Member 4 (Platform & Technical Architecture) */}
                <div className="flex flex-col items-center">
                  {/* Floating Geometric Accent */}
                  <div className="w-3.5 h-3.5 bg-[#8B5CF6] rounded-full mb-2.5 shadow-2xs" />
                  <div className="h-[320px] sm:h-[370px] lg:h-[410px] w-full bg-[#1F1F1F] rounded-t-[120px] relative overflow-hidden flex items-end group shadow-sm">
                    <Image
                      src="/images/team-4.jpg"
                      alt="Trax Platform Architect and Lead Engineer"
                      fill
                      priority
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                {/* 5. Team Member 5 (Head of Talent Curation) */}
                <div className="flex flex-col items-center">
                  {/* Floating Geometric Accent */}
                  <div className="w-3.5 h-3.5 bg-[#10B981] rotate-45 mb-2.5 shadow-2xs" />
                  <div className="h-[280px] sm:h-[320px] lg:h-[360px] w-full bg-[#1F1F1F] rounded-t-[100px] relative overflow-hidden flex items-end group shadow-sm">
                    <Image
                      src="/images/team-5.jpg"
                      alt="Trax Head of Talent Curation and Vetting"
                      fill
                      priority
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                {/* 6. Team Member 6 (Community & Ecosystem Growth) */}
                <div className="flex flex-col items-center">
                  {/* Floating Geometric Accent */}
                  <div className="w-3.5 h-3.5 bg-[#0C1222] rotate-12 mb-2.5 shadow-2xs" />
                  <div className="h-[300px] sm:h-[340px] lg:h-[380px] w-full bg-[#1F1F1F] rounded-t-[110px] relative overflow-hidden flex items-end group shadow-sm">
                    <Image
                      src="/images/team-6.jpg"
                      alt="Trax Community and Growth Director"
                      fill
                      priority
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>
      </>
    )}

    {/* Active Tab: Contact */}
    {activeTab === "contact" && (
      <div className="min-h-[70vh] bg-white">
        <Contact topic={topicParam} />
      </div>
    )}
  </div>

  {/* Footer */}
  <Footer />
</div>
  );
}
