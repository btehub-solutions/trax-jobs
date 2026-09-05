"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { GUIDES_DATA } from "@/data/guides";
import {
  LinkSimple,
  FacebookLogo,
  XLogo,
  LinkedinLogo,
  Clock,
  Check,
  ShareNetwork,
} from "@phosphor-icons/react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function GuideDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawSlug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug).toLowerCase().trim().replace(/\s+/g, "-") : "";
  const article = GUIDES_DATA.find((g) => g.slug === rawSlug) || GUIDES_DATA[0];

  const [copied, setCopied] = useState(false);

  if (!article) {
    notFound();
  }

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Main Article Container */}
      <main className="flex-1 w-full max-w-[1220px] mx-auto pt-8 sm:pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Category Breadcrumb Path */}
        <div className="mb-4">
          <span className="text-[11.5px] font-bold tracking-widest text-zinc-400 uppercase">
            {article.breadcrumb}
          </span>
        </div>

        {/* Article Headline */}
        <h1 className="text-[30px] sm:text-[42px] lg:text-[46px] font-black text-[#1F1F1F] leading-[1.14] tracking-tight max-w-4xl mb-4">
          {article.title}
        </h1>

        {/* Publication Metadata & Social Share Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 mb-8">
          {/* Date & Read Time */}
          <div className="flex items-center gap-2 text-[13.5px] text-zinc-500 font-medium">
            <span>{article.date}</span>
            <span>&bull;</span>
            <div className="flex items-center gap-1">
              <Clock size={15} weight="regular" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-8 h-8 rounded-none border border-zinc-200/80 hover:bg-zinc-100 flex items-center justify-center text-zinc-600 transition-colors cursor-pointer"
              aria-label="Copy article link"
              title="Copy Link"
            >
              {copied ? (
                <Check size={16} weight="bold" className="text-emerald-600" />
              ) : (
                <LinkSimple size={16} weight="bold" />
              )}
            </button>

            {/* Author / Profile Social Buttons */}
            {article.author.facebook && (
              <a
                href={article.author.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none border border-zinc-200/80 hover:bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-colors"
                aria-label="Author Facebook Profile"
                title="Facebook"
              >
                <FacebookLogo size={16} weight="fill" />
              </a>
            )}

            {article.author.twitter && (
              <a
                href={article.author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none border border-zinc-200/80 hover:bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-colors"
                aria-label="Author X (Twitter) Profile"
                title="X / Twitter"
              >
                <XLogo size={15} weight="bold" />
              </a>
            )}

            {article.author.linkedin && (
              <a
                href={article.author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none border border-zinc-200/80 hover:bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-colors"
                aria-label="Author LinkedIn Profile"
                title="LinkedIn"
              >
                <LinkedinLogo size={16} weight="fill" />
              </a>
            )}
          </div>
        </div>

        {/* 2-Column Grid: Content (Left 7 cols) & Sidebar/Hero (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ─────────────────────────────────────────────────────────────
              Left Column: Lead Paragraph & Full Editorial Body
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Italicized Editorial Lead Intro (Matching Welcome to the Jungle) */}
            <p className="text-[17px] sm:text-[18px] text-zinc-700 font-serif italic leading-[1.7] border-l-2 border-[#E7040D]/40 pl-4 py-1">
              {article.lead}
            </p>

            {/* Structured Article Content */}
            <div className="space-y-8 text-[15.5px] sm:text-[16px] text-zinc-700 leading-[1.75]">
              {article.content.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  {sec.heading && (
                    <h2 className="text-[22px] sm:text-[26px] font-extrabold text-zinc-900 leading-snug tracking-tight pt-3">
                      {sec.heading}
                    </h2>
                  )}

                  {sec.body.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {sec.quote && (
                    <blockquote className="my-6 p-4.5 bg-[#FAF8F5] border-l-3 border-[#E7040D] text-[15.5px] font-medium text-zinc-800 italic leading-relaxed">
                      &ldquo;{sec.quote}&rdquo;
                    </blockquote>
                  )}
                </div>
              ))}

              {/* Photo Attribution & Newsletter Note */}
              <div className="pt-6 border-t border-zinc-200/80 space-y-3 text-[13px] text-zinc-500">
                <p className="italic">Photo: Trax Media / Verified African Tech Photography</p>
                <p>
                  Follow Trax Jobs on{" "}
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-800 font-semibold underline">
                    X (Twitter)
                  </a>
                  ,{" "}
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-800 font-semibold underline">
                    LinkedIn
                  </a>
                  , and subscribe to our newsletter for weekly ecosystem job drops and career playbooks.
                </p>
              </div>

              {/* Topics Discussed Badges */}
              <div className="pt-4 space-y-3">
                <h3 className="text-[11.5px] font-bold text-zinc-400 uppercase tracking-wider">
                  TOPICS DISCUSSED
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-zinc-50 border border-zinc-200 text-zinc-800 text-[12.5px] font-medium rounded-none hover:bg-zinc-100 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ─────────────────────────────────────────────────────────────
              Right Column: Hero Visual + Sticky Author & Related Articles
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Top Featured Image with Peach Geometric Offset Background (Matching Reference) */}
            <div className="relative pt-4 pr-4">
              {/* Background Geometric Color Block */}
              <div className="absolute top-0 right-0 w-[92%] h-[92%] bg-[#FCE8E0] rounded-none z-0" />
              
              {/* Foreground Image Card */}
              <div className="relative z-10 w-full h-[280px] sm:h-[340px] rounded-none overflow-hidden border border-zinc-200 shadow-sm">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Sticky Sidebar Container (Pins Author + You'll Also Like when scrolling) */}
            <div className="sticky top-24 self-start space-y-8 pt-2">
              
              {/* 1. AUTHOR Widget (100% Matching Reference) */}
              <div className="space-y-3">
                <h3 className="text-[11.5px] font-bold text-zinc-900 uppercase tracking-wider">
                  AUTHOR
                </h3>
                
                <div className="space-y-1.5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-zinc-200 shadow-2xs">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="text-[15px] font-bold text-zinc-900 inline-block border-b-2 border-[#E7040D] pb-0.5 leading-snug">
                      {article.author.name}
                    </h4>
                    <p className="text-[12.5px] text-zinc-500 font-medium mt-0.5 leading-snug">
                      {article.author.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-200/80" />

              {/* 2. YOU'LL ALSO LIKE Widget (100% Matching Reference) */}
              <div className="space-y-4">
                <h3 className="text-[11.5px] font-bold text-zinc-900 uppercase tracking-wider">
                  YOU&apos;LL ALSO LIKE
                </h3>

                <div className="divide-y divide-zinc-100 space-y-3">
                  {article.relatedArticles.map((rel, idx) => (
                    <Link
                      key={idx}
                      href={`/guides/${rel.slug}`}
                      className="pt-3 flex items-center gap-3.5 group cursor-pointer"
                    >
                      {/* Square Thumbnail */}
                      <div className="relative w-14 h-14 shrink-0 bg-zinc-100 border border-zinc-200/80 rounded-none overflow-hidden">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="56px"
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>

                      {/* Related Title */}
                      <h4 className="text-[13px] font-semibold text-zinc-800 group-hover:text-[#E7040D] transition-colors leading-snug line-clamp-2">
                        {rel.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Floating Bottom Share Pill Button (Matching Reference) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-zinc-800 text-white text-[13px] font-bold rounded-none shadow-lg cursor-pointer transition-all active:scale-[0.98]"
        >
          <ShareNetwork size={16} weight="bold" />
          <span>{copied ? "Link Copied!" : "Share"}</span>
        </button>
      </div>
    </div>
  );
}
