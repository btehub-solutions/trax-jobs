"use client";

const TRUSTED_COMPANIES = [
  {
    name: "Paystack",
    logo: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <rect x="3" y="4" width="18" height="3.5" rx="1" fill="#0BA4DB" />
        <rect x="3" y="10.25" width="12" height="3.5" rx="1" fill="#0BA4DB" />
        <rect x="3" y="16.5" width="18" height="3.5" rx="1" fill="#0BA4DB" />
      </svg>
    ),
  },
  {
    name: "Flutterwave",
    logo: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" className="shrink-0">
        <path d="M6 16C6 10.477 10.477 6 16 6C19.5 6 22.5 7.8 24.2 10.5L20.8 13.9C19.6 12.4 17.9 11.5 16 11.5C13.515 11.5 11.5 13.515 11.5 16C11.5 18.485 13.515 20.5 16 20.5C17.9 20.5 19.6 19.6 20.8 18.1L24.2 21.5C22.5 24.2 19.5 26 16 26C10.477 26 6 21.523 6 16Z" fill="#F56522" />
        <path d="M16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26" stroke="#FFBA00" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Moniepoint",
    logo: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M3 6C3 4.89543 3.89543 4 5 4H7.5L12 11.5L16.5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H16.5V11.5L12 19L7.5 11.5V20H5C3.89543 20 3 19.1046 3 18V6Z" fill="#0336FF" />
      </svg>
    ),
  },
  {
    name: "Andela",
    logo: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="9" stroke="#16A34A" strokeWidth="2.5" />
        <path d="M12 6.5L17 16.5H7L12 6.5Z" fill="#16A34A" />
      </svg>
    ),
  },
  {
    name: "Kuda",
    logo: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <rect width="24" height="24" rx="6" fill="#40196D" />
        <path d="M7 6V18M7 12L15 6M9 10.5L17 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Interswitch",
    logo: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="9" cy="12" r="6" fill="#D92D20" />
        <circle cx="15" cy="12" r="6" fill="#0BA4DB" fillOpacity="0.8" />
      </svg>
    ),
  },
  {
    name: "Piggyvest",
    logo: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 7H13V13H11V7ZM12 17.25C11.31 17.25 10.75 16.69 10.75 16C10.75 15.31 11.31 14.75 12 14.75C12.69 14.75 13.25 15.31 13.25 16C13.25 16.69 12.69 17.25 12 17.25Z" fill="#083E9E" />
      </svg>
    ),
  },
];

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
              href="tel:+2348000008729"
              className="text-[15.5px] font-black text-[#1F1F1F] hover:text-[#E7040D] transition-colors"
            >
              +234 800 000 8729
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
          {/* Edge gradient fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="marquee-scroll gap-10 sm:gap-12 items-center">
            {/* Loop array for continuous seamless infinite animation */}
            {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex items-center gap-2.5 shrink-0 opacity-85 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                {company.logo}
                <span className="text-[17px] sm:text-[18.5px] font-black text-zinc-900 tracking-tight">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
