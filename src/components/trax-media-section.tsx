"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { TRAX_MEDIA_ARTICLES, TraxMediaArticle } from "@/data/trax-media";

interface TraxMediaSectionProps {
  articles?: TraxMediaArticle[];
}

export function TraxMediaSection({ articles = TRAX_MEDIA_ARTICLES }: TraxMediaSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active slide index based on scroll position relative to viewport center
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = Array.from(container.children) as HTMLElement[];
    const targetCard = cards[index];
    if (targetCard) {
      const targetScroll = targetCard.offsetLeft - (container.clientWidth - targetCard.offsetWidth) / 2;
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (!scrollContainerRef.current) return;
    const nextIndex = (activeIndex + 1) % articles.length;
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    if (!scrollContainerRef.current) return;
    const prevIndex = (activeIndex - 1 + articles.length) % articles.length;
    scrollToIndex(prevIndex);
  };

  return (
    <section className="w-full bg-[#FAF8F5] text-zinc-900 py-14 sm:py-24 lg:py-28 relative overflow-hidden border-t border-zinc-200/70">
      {/* Trax Graph-Paper Grid Background */}
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

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header with Title & View More Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-14 px-6 sm:px-10 lg:px-16">
          <div className="max-w-xl">
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-black tracking-[-0.03em] text-[#1F1F1F] leading-[1.15] mb-2 sm:mb-3">
              Stories from the ecosystem
            </h2>
            <p className="text-[14.5px] sm:text-[16px] text-zinc-600 leading-[1.65]">
              Dispatches, founder journeys, and defining signals shaping technology economies across Nigeria and Africa.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <a
              href="https://trax.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 text-[13px] sm:text-[13.5px] font-bold border border-zinc-200/90 shadow-2xs transition-all duration-200 group"
            >
              <span>View more on Trax Media</span>
              <ArrowUpRight size={14} weight="bold" className="text-zinc-500 group-hover:text-[#E7040D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5 ml-1">
              <button
                onClick={handlePrev}
                aria-label="Previous story"
                className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white hover:bg-zinc-100 text-zinc-700 hover:text-[#E7040D] border border-zinc-200/90 shadow-2xs transition-colors cursor-pointer active:scale-95"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next story"
                className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white hover:bg-zinc-100 text-zinc-700 hover:text-[#E7040D] border border-zinc-200/90 shadow-2xs transition-colors cursor-pointer active:scale-95"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>

        {/* 5-Story Horizontal Carousel Track with Wide Horizontal Landscape Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-[9vw] sm:px-10 lg:px-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {articles.map((card, idx) => {
            const isActive = activeIndex === idx;

            return (
              <a
                key={card.id}
                href={card.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col cursor-pointer select-none shrink-0 snap-center sm:snap-start w-[82vw] max-w-[350px] sm:max-w-none sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)]"
              >
                {/* Horizontal Landscape Media Image Container (Wider width, shorter height) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] sm:rounded-[20px] bg-zinc-100 shadow-[0_4px_20px_-4px_rgba(15,16,18,0.06)] border border-zinc-200/80">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 420px"
                    className={`object-cover ${card.imagePosition || "object-center"} group-hover:scale-105 transition-transform duration-500 ease-out`}
                  />
                </div>

                {/* Typography Block: Headline + Rich Excerpt */}
                <div className="mt-3.5 sm:mt-4 flex flex-col">
                  <h3
                    className={`text-[18px] sm:text-[21px] font-black tracking-[-0.015em] leading-snug mb-1 sm:mb-1.5 transition-colors ${
                      isActive
                        ? "text-[#E7040D]"
                        : "text-[#1F1F1F] group-hover:text-[#E7040D]"
                    }`}
                  >
                    {card.headline}
                  </h3>

                  <p className="text-[13.5px] sm:text-[15px] text-zinc-600 leading-[1.55]">
                    <strong className="text-zinc-950 font-bold">{card.highlightText}</strong>{" "}
                    {card.excerpt}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Carousel Pagination Dots (Mobile Only) */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-6 px-6">
          {articles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to story ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === idx
                  ? "w-2.5 h-2.5 bg-[#E7040D]"
                  : "w-2 h-2 bg-zinc-300 hover:bg-[#E7040D]/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
