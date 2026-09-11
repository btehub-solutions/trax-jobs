import React from "react";

export type AfricanBrandKey =
  | "paystack"
  | "flutterwave"
  | "moniepoint"
  | "interswitch"
  | "kuda"
  | "piggyvest"
  | "andela"
  | "moove"
  | "cowrywise"
  | "opay"
  | "carbon";

interface BrandWordmarkProps {
  brand: AfricanBrandKey;
  className?: string;
}

export function BrandWordmark({ brand, className = "" }: BrandWordmarkProps) {
  switch (brand) {
    case "paystack":
      return (
        <div className={`inline-flex items-center gap-2.5 text-zinc-950 hover:text-[#0BA4DB] transition-colors select-none shrink-0 ${className}`}>
          {/* Authentic Paystack 3-bars geometry */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <rect x="2.5" y="4" width="19" height="3.5" rx="1.75" />
            <rect x="2.5" y="10.25" width="12.5" height="3.5" rx="1.75" />
            <rect x="2.5" y="16.5" width="19" height="3.5" rx="1.75" />
          </svg>
          <span className="text-[26px] sm:text-[30px] font-black tracking-[-0.045em] leading-none lowercase">
            paystack
          </span>
        </div>
      );

    case "flutterwave":
      return (
        <div className={`inline-flex items-center gap-2 text-zinc-950 hover:text-[#F56522] transition-colors select-none shrink-0 ${className}`}>
          {/* Authentic Flutterwave Wave/Crest glyph */}
          <svg width="25" height="25" viewBox="0 0 32 32" fill="none" className="shrink-0">
            <path
              d="M6 16C6 10.477 10.477 6 16 6C19.5 6 22.5 7.8 24.2 10.5L20.8 13.9C19.6 12.4 17.9 11.5 16 11.5C13.515 11.5 11.5 13.515 11.5 16C11.5 18.485 13.515 20.5 16 20.5C17.9 20.5 19.6 19.6 20.8 18.1L24.2 21.5C22.5 24.2 19.5 26 16 26C10.477 26 6 21.523 6 16Z"
              fill="currentColor"
            />
            <path
              d="M16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.035em] leading-none lowercase">
            flutterwave
          </span>
        </div>
      );

    case "moniepoint":
      return (
        <div className={`inline-flex items-center gap-2.5 text-zinc-950 hover:text-[#0336FF] transition-colors select-none shrink-0 ${className}`}>
          {/* Authentic Moniepoint Ribbon M */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path d="M3 6C3 4.89543 3.89543 4 5 4H7.5L12 11.5L16.5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H16.5V11.5L12 19L7.5 11.5V20H5C3.89543 20 3 19.1046 3 18V6Z" />
          </svg>
          <span className="text-[24px] sm:text-[28px] font-black tracking-[-0.03em] leading-none">
            moniepoint
          </span>
        </div>
      );

    case "interswitch":
      return (
        <div className={`inline-flex items-center gap-2 text-zinc-950 hover:text-[#D92D20] transition-colors select-none shrink-0 ${className}`}>
          {/* Dual overlapping circles symbol */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <circle cx="9" cy="12" r="6" fill="currentColor" />
            <circle cx="15" cy="12" r="6" stroke="currentColor" strokeWidth="2.5" fill="none" />
          </svg>
          <span className="text-[23px] sm:text-[27px] font-black tracking-[-0.025em] leading-none">
            Interswitch<span className="text-[#E7040D]">.</span>
          </span>
        </div>
      );

    case "kuda":
      return (
        <div className={`inline-flex items-center text-zinc-950 hover:text-[#40196D] transition-colors select-none shrink-0 ${className}`}>
          {/* Kuda bespoke rounded lowercase wordmark with purple/red accent dot */}
          <span className="text-[28px] sm:text-[33px] font-black tracking-[-0.05em] leading-none lowercase">
            kuda<span className="text-[#E7040D]">.</span>
          </span>
        </div>
      );

    case "piggyvest":
      return (
        <div className={`inline-flex items-center gap-2 text-zinc-950 hover:text-[#083E9E] transition-colors select-none shrink-0 ${className}`}>
          {/* Piggyvest crest glyph */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 7H13V13H11V7ZM12 17.25C11.31 17.25 10.75 16.69 10.75 16C10.75 15.31 11.31 14.75 12 14.75C12.69 14.75 13.25 15.31 13.25 16C13.25 16.69 12.69 17.25 12 17.25Z" />
          </svg>
          <span className="text-[24px] sm:text-[28px] font-black tracking-[-0.035em] leading-none lowercase">
            piggyvest
          </span>
        </div>
      );

    case "andela":
      return (
        <div className={`inline-flex items-center gap-2 text-zinc-950 hover:text-[#16A34A] transition-colors select-none shrink-0 ${className}`}>
          {/* Andela compass symbol */}
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <path d="M12 6.5L17 16.5H7L12 6.5Z" />
          </svg>
          <span className="text-[21px] sm:text-[25px] font-black tracking-[0.06em] leading-none uppercase">
            ANDELA
          </span>
        </div>
      );

    case "moove":
      return (
        <div className={`inline-flex items-center text-zinc-950 hover:text-[#16A34A] transition-colors select-none shrink-0 ${className}`}>
          {/* Moove ultra-bold geometric wordmark */}
          <span className="text-[28px] sm:text-[34px] font-black tracking-[-0.06em] leading-none lowercase">
            moove
          </span>
        </div>
      );

    case "cowrywise":
      return (
        <div className={`inline-flex items-center gap-2 text-zinc-950 hover:text-[#2563EB] transition-colors select-none shrink-0 ${className}`}>
          {/* Cowrywise spiral icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" />
          </svg>
          <span className="text-[23px] sm:text-[27px] font-extrabold tracking-[-0.03em] leading-none lowercase">
            cowrywise
          </span>
        </div>
      );

    case "opay":
      return (
        <div className={`inline-flex items-center gap-1.5 text-zinc-950 hover:text-[#00B875] transition-colors select-none shrink-0 ${className}`}>
          {/* OPay circular emblem */}
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="3.5" />
            <path d="M12 4A8 8 0 0 1 20 12" stroke="#00B875" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <span className="text-[24px] sm:text-[28px] font-black tracking-tight leading-none">
            OPay
          </span>
        </div>
      );

    case "carbon":
      return (
        <div className={`inline-flex items-center text-zinc-950 hover:text-[#E7040D] transition-colors select-none shrink-0 ${className}`}>
          <span className="text-[25px] sm:text-[29px] font-black tracking-[-0.025em] leading-none lowercase">
            carbon<span className="text-[#E7040D] font-black text-[20px] ml-0.5">&bull;</span>
          </span>
        </div>
      );

    default:
      return null;
  }
}

export const ALL_AFRICAN_BRANDS: AfricanBrandKey[] = [
  "paystack",
  "flutterwave",
  "moniepoint",
  "interswitch",
  "kuda",
  "piggyvest",
  "andela",
  "moove",
  "cowrywise",
  "opay",
  "carbon",
];
