import { BrandWordmark, ALL_AFRICAN_BRANDS } from "@/components/brand-wordmark";

export default function ContactInfo() {
  return (
    <div className="space-y-8 pr-0 md:pr-4">
      {/* 1. Pill badge: • We are here to help */}
      <div className="inline-flex items-center gap-2 text-[14px] font-semibold text-zinc-700">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E7040D] animate-pulse" />
        <span className="font-bold text-[#1F1F1F]">We are here to help</span>
      </div>

      {/* 2. Main Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#1F1F1F] tracking-[-0.02em] leading-[1.15]">
        Let&apos;s discuss your hiring, talent profile, or company and take it to the next level.
      </h1>

      {/* 3. Direct Contact Details (Phone & Email row, then Location) */}
      <div className="space-y-6 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <span className="block text-[13px] text-zinc-500 font-medium mb-1">
              Phone
            </span>
            <a
              href="tel:+2347045422815"
              className="text-[15.5px] font-black text-[#1F1F1F] hover:text-[#E7040D] transition-colors"
            >
              +234 704 542 2815
            </a>
          </div>

          <div>
            <span className="block text-[13px] text-zinc-500 font-medium mb-1">
              Email
            </span>
            <a
              href="mailto:jobs@trax.ng"
              className="text-[15.5px] font-black text-[#1F1F1F] hover:text-[#E7040D] transition-colors"
            >
              jobs@trax.ng
            </a>
          </div>
        </div>

        <div>
          <span className="block text-[13px] text-zinc-500 font-medium mb-1">
            Location
          </span>
          <p className="text-[15.5px] font-black text-[#1F1F1F]">
            Abeokuta, Ogun State, Nigeria
          </p>
        </div>
      </div>

      {/* 4. Horizontal Separator */}
      <div className="w-full h-[1px] bg-zinc-200" />

      {/* 5. "Trusted by" Infinite Marquee with Larger Typography and Icons */}
      <div className="space-y-3 pt-2">
        <span className="block text-[13px] text-zinc-500 font-medium">
          Trusted by
        </span>

        {/* Marquee Ticker Container with Overflow Hidden & Hover Pause */}
        <div className="w-full overflow-hidden relative group py-2">
          <div className="marquee-scroll gap-10 sm:gap-14 items-center select-none">
            {/* Loop array for continuous seamless infinite animation */}
            {[...ALL_AFRICAN_BRANDS, ...ALL_AFRICAN_BRANDS, ...ALL_AFRICAN_BRANDS].map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="flex items-center shrink-0 opacity-85 hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-105"
              >
                <BrandWordmark brand={brand} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
