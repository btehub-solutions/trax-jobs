"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GuideArticle } from "@/data/guides";
import {
  LinkSimple,
  FacebookLogo,
  XLogo,
  LinkedinLogo,
  WhatsappLogo,
  Clock,
  Check,
  ShareNetwork,
} from "@phosphor-icons/react";

interface GuideDetailClientProps {
  article: GuideArticle;
}

export function GuideDetailClient({ article }: GuideDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const currentUrl = shareUrl || `https://trax.ng/guides/${article.slug}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(article.title);
  const whatsappShareText = encodeURIComponent(`${article.title}\n\n${currentUrl}`);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${whatsappShareText}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.lead || article.title,
          url: currentUrl,
        });
        return;
      } catch {
        // User dismissed sheet or failed, fallback to copy
      }
    }
    handleCopyLink();
  };

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
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-400 hidden sm:inline-block mr-1">
              Share:
            </span>

            {/* Copy Article Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-8 h-8 rounded-none border border-zinc-200/80 hover:bg-zinc-100 active:scale-90 flex items-center justify-center text-zinc-600 transition-all cursor-pointer select-none"
              aria-label="Copy article link"
              title={copied ? "Link Copied!" : "Copy Link"}
            >
              {copied ? (
                <Check size={16} weight="bold" className="text-emerald-600" />
              ) : (
                <LinkSimple size={16} weight="bold" />
              )}
            </button>

            {/* WhatsApp Share Intent */}
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-none border border-zinc-200/80 hover:bg-emerald-50 hover:border-[#25D366]/40 hover:text-[#25D366] flex items-center justify-center text-zinc-600 transition-colors"
              aria-label="Share on WhatsApp"
              title="Share on WhatsApp"
            >
              <WhatsappLogo size={16} weight="fill" />
            </a>

            {/* X / Twitter Share Intent */}
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-none border border-zinc-200/80 hover:bg-zinc-100 hover:text-black flex items-center justify-center text-zinc-600 transition-colors"
              aria-label="Share on X (Twitter)"
              title="Share on X"
            >
              <XLogo size={15} weight="bold" />
            </a>

            {/* LinkedIn Share Intent */}
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-none border border-zinc-200/80 hover:bg-blue-50 hover:border-[#0077B5]/40 hover:text-[#0077B5] flex items-center justify-center text-zinc-600 transition-colors"
              aria-label="Share on LinkedIn"
              title="Share on LinkedIn"
            >
              <LinkedinLogo size={16} weight="fill" />
            </a>

            {/* Facebook Share Intent */}
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-none border border-zinc-200/80 hover:bg-blue-50 hover:border-[#1877F2]/40 hover:text-[#1877F2] flex items-center justify-center text-zinc-600 transition-colors"
              aria-label="Share on Facebook"
              title="Share on Facebook"
            >
              <FacebookLogo size={16} weight="fill" />
            </a>
          </div>
        </div>

        {/* 2-Column Grid: Content (Left 7 cols) & Sidebar/Hero (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Lead Paragraph & Full Editorial Body */}
          <div className="lg:col-span-7 space-y-8">
            {/* Italicized Editorial Lead Intro */}
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
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-800 font-semibold underline"
                  >
                    X (Twitter)
                  </a>
                  ,{" "}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-800 font-semibold underline"
                  >
                    LinkedIn
                  </a>
                  , and subscribe to our newsletter for weekly ecosystem job drops and career playbooks.
                </p>
              </div>

              {/* Topics Discussed Badges */}
              {article.topics && article.topics.length > 0 && (
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
              )}
            </div>
          </div>

          {/* Right Column: Hero Visual + Sticky Author & Related Articles */}
          <div className="lg:col-span-5 space-y-8">
            {/* Top Featured Image with Peach Geometric Offset Background */}
            <div className="relative pt-4 pr-4">
              <div className="absolute top-0 right-0 w-[92%] h-[92%] bg-[#FCE8E0] rounded-none z-0" />
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

            {/* Sticky Sidebar Container */}
            <div className="sticky top-24 self-start space-y-8 pt-2">
              {/* 1. AUTHOR Widget */}
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

                    {/* Author Personal Social Profiles */}
                    <div className="flex items-center gap-2.5 mt-2 text-zinc-400">
                      {article.author.twitter && (
                        <a
                          href={article.author.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-zinc-900 transition-colors"
                          aria-label={`${article.author.name} on X`}
                          title="Author on X"
                        >
                          <XLogo size={14} weight="bold" />
                        </a>
                      )}
                      {article.author.linkedin && (
                        <a
                          href={article.author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-zinc-900 transition-colors"
                          aria-label={`${article.author.name} on LinkedIn`}
                          title="Author on LinkedIn"
                        >
                          <LinkedinLogo size={14} weight="fill" />
                        </a>
                      )}
                      {article.author.facebook && (
                        <a
                          href={article.author.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-zinc-900 transition-colors"
                          aria-label={`${article.author.name} on Facebook`}
                          title="Author on Facebook"
                        >
                          <FacebookLogo size={14} weight="fill" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-200/80" />

              {/* 2. YOU'LL ALSO LIKE Widget */}
              {article.relatedArticles && article.relatedArticles.length > 0 && (
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
                        <div className="relative w-14 h-14 shrink-0 bg-zinc-100 border border-zinc-200/80 rounded-none overflow-hidden">
                          <Image
                            src={rel.image}
                            alt={rel.title}
                            fill
                            sizes="56px"
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <h4 className="text-[13px] font-semibold text-zinc-800 group-hover:text-[#E7040D] transition-colors leading-snug line-clamp-2">
                          {rel.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Bottom Share Pill Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={handleNativeShare}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-zinc-800 text-white text-[13px] font-bold rounded-none shadow-lg cursor-pointer transition-all active:scale-[0.98]"
        >
          <ShareNetwork size={16} weight="bold" />
          <span>{copied ? "Link Copied!" : "Share"}</span>
        </button>
      </div>

      <Footer />
    </div>
  );
}
