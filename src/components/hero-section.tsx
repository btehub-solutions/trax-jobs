"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";

export function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px] overflow-hidden flex items-center justify-center bg-zinc-900 rounded-b-[40px] sm:rounded-b-[56px]">
      {/* Daylight Outdoor Photography Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/10220311/pexels-photo-10220311.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt="African tech professionals outdoors smiling with smartphones"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%]"
        />
        {/* Subtle, natural gradient for crisp contrast without muddying the daylight look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/35" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-md max-w-4xl mx-auto mb-8 sm:mb-10">
          Find your next job opportunity, faster.
        </h1>

        {/* Floating Search Bar (Exact Reference Clone) */}
        <div className="w-full max-w-4xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-2 sm:p-2.5 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0"
          >
            {/* Role / Keyword Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-2">
              <MagnifyingGlass
                size={22}
                weight="bold"
                className="text-zinc-700 shrink-0"
              />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search title, keywords or company"
                className="w-full bg-transparent text-[16px] text-zinc-900 placeholder:text-zinc-500 focus:outline-hidden font-normal"
              />
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-[1px] h-8 bg-zinc-200 my-auto" />

            {/* Location Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-2 border-t sm:border-t-0 border-zinc-100 sm:border-none">
              <MapPin
                size={22}
                weight="fill"
                className="text-zinc-950 shrink-0"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full bg-transparent text-[16px] text-zinc-900 placeholder:text-zinc-500 focus:outline-hidden font-normal"
              />
            </div>

            {/* Trax Brand Red Search Button */}
            <button
              type="submit"
              className="inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-xl bg-[#E7040D] hover:bg-[#CB030B] text-white text-[16px] font-semibold transition-all active:scale-[0.99] shadow-sm shrink-0 cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
