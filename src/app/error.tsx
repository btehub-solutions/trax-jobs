"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WarningCircle, WifiSlash, ArrowClockwise, House } from "@phosphor-icons/react";
import { AppHeader } from "@/components/navigation/app-header";
import { Footer } from "@/components/footer";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isOnline, setIsOnline] = useState(true);

  // Detect whether this error was caused by a network dropout or offline condition
  const isNetworkIssue =
    !isOnline ||
    (typeof navigator !== "undefined" && !navigator.onLine) ||
    /network|fetch|chunk|load failed|offline|timeout|econnreset/i.test(
      error?.message || ""
    ) ||
    (error?.name === "TypeError" && /fetch/i.test(error?.message || ""));

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsOnline(navigator.onLine);
    }

    const handleOnline = () => {
      setIsOnline(true);
      // Automatically attempt recovery when network connection is restored
      reset();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [reset]);

  useEffect(() => {
    // Log error for debugging
    console.error("Application boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between font-sans">
      <AppHeader />

      <main className="flex-1 flex items-center justify-center px-6 py-16 sm:py-24">
        <div className="max-w-xl w-full text-center space-y-6">
          {/* Contextual Icon */}
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-xs mb-2 ${
              isNetworkIssue
                ? "bg-amber-50 text-amber-600 border border-amber-200/80"
                : "bg-[#fce8e0] text-[#E7040D]"
            }`}
          >
            {isNetworkIssue ? (
              <WifiSlash size={32} weight="bold" />
            ) : (
              <WarningCircle size={32} weight="bold" />
            )}
          </div>

          <div className="space-y-3">
            {/* Contextual Badge */}
            <span
              className={`text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                isNetworkIssue
                  ? "text-amber-800 bg-amber-100/70 border border-amber-200/80"
                  : "text-[#E7040D] bg-[#fce8e0]"
              }`}
            >
              {isNetworkIssue ? "Connection Notice" : "System Notice"}
            </span>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F1F1F] tracking-tight">
              {isNetworkIssue ? "Connection interrupted" : "Something unexpected occurred"}
            </h1>

            {/* Explanatory Message */}
            <p className="text-[15px] sm:text-[16px] text-zinc-600 leading-relaxed max-w-md mx-auto">
              {isNetworkIssue
                ? "Your internet connection dropped or is taking longer than usual to respond. We will automatically reconnect once your signal returns."
                : "We encountered a temporary issue while loading this page. You can try refreshing or returning to the home screen."}
            </p>

            {/* Waiting indicator when network is down */}
            {isNetworkIssue && (
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200/80 shadow-2xs text-[12px] font-medium text-zinc-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Waiting for connection to restore...</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E7040D] hover:bg-[#CB030B] active:scale-[0.98] text-white text-[13.5px] font-bold shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer select-none"
            >
              <ArrowClockwise size={16} weight="bold" />
              <span>{isNetworkIssue ? "Try reconnecting" : "Try again"}</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-zinc-50 active:scale-95 text-[#1F1F1F] text-[13.5px] font-bold border border-zinc-200/90 shadow-2xs transition-all duration-150 select-none"
            >
              <House size={16} weight="bold" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
