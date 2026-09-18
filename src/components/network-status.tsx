"use client";

import { useState, useEffect } from "react";
import { WifiSlash, WifiHigh } from "@phosphor-icons/react";

export function NetworkStatusBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showRestoredNotice, setShowRestoredNotice] = useState(false);

  useEffect(() => {
    // Initial check
    if (typeof navigator !== "undefined") {
      setIsOnline(navigator.onLine);
    }

    const handleOnline = () => {
      setIsOnline(true);
      setShowRestoredNotice(true);
      const timer = setTimeout(() => {
        setShowRestoredNotice(false);
      }, 2500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestoredNotice(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Don't render anything if connected and not displaying temporary restored notice
  if (isOnline && !showRestoredNotice) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-[calc(1rem+env(safe-area-inset-top,0px))] left-1/2 -translate-x-1/2 z-[100] pointer-events-none px-4 py-2 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 flex items-center gap-2.5 max-w-[90vw]"
      style={{
        backgroundColor: isOnline ? "#064E3B" : "#1F1F1F",
        borderColor: isOnline ? "rgba(52, 211, 153, 0.4)" : "rgba(255, 255, 255, 0.15)",
        color: "#FFFFFF",
      }}
    >
      {isOnline ? (
        <>
          <WifiHigh size={16} weight="bold" className="text-emerald-400 shrink-0" />
          <span className="text-[12.5px] sm:text-[13px] font-medium tracking-tight">
            Connection restored
          </span>
        </>
      ) : (
        <>
          <WifiSlash size={16} weight="bold" className="text-amber-400 shrink-0 animate-pulse" />
          <span className="text-[12.5px] sm:text-[13px] font-medium tracking-tight">
            You are offline. Trying to reconnect...
          </span>
        </>
      )}
    </div>
  );
}
