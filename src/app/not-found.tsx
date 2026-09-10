"use client";

import Link from "next/link";
import Image from "next/image";
import { Compass, Briefcase, Buildings, ArrowLeft } from "@phosphor-icons/react";
import { AppHeader } from "@/components/navigation/app-header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between font-sans">
      <AppHeader />

      <main className="flex-1 flex items-center justify-center px-6 py-16 sm:py-24">
        <div className="max-w-xl w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#fce8e0] text-[#E7040D] shadow-xs mb-2">
            <Compass size={32} weight="bold" />
          </div>

          <div className="space-y-3">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#E7040D] bg-[#fce8e0] px-3 py-1 rounded-full">
              404 • Page Not Found
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F1F1F] tracking-tight">
              Looking for something that is not here
            </h1>
            <p className="text-[15px] sm:text-[16px] text-zinc-600 leading-relaxed max-w-md mx-auto">
              This listing or page may have been moved, filled, or archived by Trax editors.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/jobs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.98] text-white text-[13.5px] font-bold shadow-xs hover:shadow-md transition-all duration-150 select-none"
            >
              <Briefcase size={16} weight="bold" />
              <span>Browse open jobs</span>
            </Link>

            <Link
              href="/companies"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-zinc-50 active:scale-95 text-[#1F1F1F] text-[13.5px] font-bold border border-zinc-200/90 shadow-2xs transition-all duration-150 select-none"
            >
              <Buildings size={16} weight="bold" />
              <span>Explore companies</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-zinc-600 hover:text-zinc-950 active:scale-95 text-[13.5px] font-semibold transition-all select-none"
            >
              <ArrowLeft size={16} weight="bold" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
