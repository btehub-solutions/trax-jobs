"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quotes } from "@phosphor-icons/react";

export function SocialProofSection() {
  return (
    <section className="w-full bg-[#FAF8F5] py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle Graph-Paper Grid Background */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Big Bold Headline & Callout */}
          <div className="lg:col-span-5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce8e0] text-[#E7040D] text-[11px] font-bold uppercase tracking-wider mb-5">
              <span>Community Impact</span>
            </div>
            
            <h2 className="text-[38px] sm:text-[50px] lg:text-[54px] font-extrabold tracking-[-0.035em] text-zinc-950 leading-[1.08] mb-6">
              50,000+ people found where they belong.
            </h2>
            
            <p className="text-[16px] sm:text-[17px] text-zinc-600 leading-[1.7] mb-8">
              <strong className="text-zinc-950 font-bold">Now it&apos;s your turn.</strong> Start your search on Trax Jobs today and discover teams that share your ambition.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E7040D] hover:bg-[#CB030B] text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                <span>Find your next role</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href="/talent"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 text-[15px] font-bold border border-zinc-200/90 shadow-2xs transition-all"
              >
                <span>Browse talent</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Collage with Floating Cards */}
          <div className="lg:col-span-7 relative min-h-[480px] sm:min-h-[540px] flex items-center justify-center pt-8 pb-10">
            
            {/* Center Main Photograph */}
            <div className="relative w-[300px] sm:w-[380px] md:w-[420px] h-[360px] sm:h-[420px] rounded-[28px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(15,16,18,0.15)] border-4 border-white">
              <Image
                src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="African tech team collaborating"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating Card 1: Top Right (Cream Yellow Post-it) */}
            <div className="absolute top-0 right-0 sm:right-4 md:right-8 w-[190px] sm:w-[220px] bg-[#FEF6E4] rounded-2xl p-4 sm:p-5 shadow-[0_12px_28px_-6px_rgba(15,16,18,0.1)] border border-[#F6E6BF] hover:-translate-y-1 transition-transform duration-300">
              <p className="text-[17px] sm:text-[19px] font-black text-zinc-950 leading-tight mb-1.5">
                Every <br />minute
              </p>
              <p className="text-[11.5px] sm:text-[12px] text-zinc-700 leading-snug">
                a verified role or profile is published on Trax Jobs.
              </p>
            </div>

            {/* Floating Card 2: Left Side (Testimonial Card) */}
            <div className="absolute bottom-12 -left-2 sm:left-0 md:left-2 w-[210px] sm:w-[240px] bg-[#FEFBEA] rounded-2xl p-4 sm:p-5 shadow-[0_12px_28px_-6px_rgba(15,16,18,0.1)] border border-[#F4EDB8] hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-1.5 text-zinc-900 mb-2">
                <Quotes size={16} weight="fill" className="text-[#E7040D]" />
                <span className="text-[11.5px] font-bold">Amara&apos;s story</span>
              </div>
              <p className="text-[11px] sm:text-[11.5px] text-zinc-700 leading-relaxed mb-3 italic">
                &ldquo;When you find a team that respects your craft, work stops being a grind and starts being real.&rdquo;
              </p>
              <Link
                href="/about"
                className="inline-block px-3 py-1 rounded-md bg-zinc-950 text-white text-[10.5px] font-bold hover:bg-[#E7040D] transition-colors"
              >
                Read story
              </Link>
            </div>

            {/* Floating Card 3: Bottom Center-Right (Soft Lime/Mint Metric) */}
            <div className="absolute -bottom-4 right-2 sm:right-12 md:right-20 w-[190px] sm:w-[220px] bg-[#EDFBEF] rounded-2xl p-4 sm:p-5 shadow-[0_12px_28px_-6px_rgba(15,16,18,0.1)] border border-[#D1F2D6] hover:-translate-y-1 transition-transform duration-300 z-20">
              <p className="text-[26px] sm:text-[30px] font-black text-zinc-950 leading-tight mb-1">
                84%
              </p>
              <p className="text-[11px] sm:text-[11.5px] text-zinc-700 leading-snug">
                of candidates say Trax helped them find the right team, not just a job.
              </p>
            </div>

            {/* Floating Card 4: Top Left (Soft Ice Blue Trust Metric) */}
            <div className="hidden sm:block absolute top-4 left-4 md:left-10 w-[180px] bg-[#EEF6FC] rounded-2xl p-4 shadow-[0_12px_28px_-6px_rgba(15,16,18,0.1)] border border-[#D5E8F7] hover:-translate-y-1 transition-transform duration-300">
              <p className="text-[20px] font-black text-zinc-950 leading-tight mb-1">
                120+
              </p>
              <p className="text-[11px] text-zinc-700 leading-snug">
                vetted companies hiring across West Africa.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
