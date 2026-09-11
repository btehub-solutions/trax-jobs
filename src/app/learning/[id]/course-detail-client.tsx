"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { CourseDetail } from "@/data/courses";
import {
  House,
  CaretRight,
  Clock,
  Users,
  ChatCircleText,
  Monitor,
  ShieldCheck,
  DeviceMobile,
  Globe,
  Copy,
  Check,
  FacebookLogo,
  XLogo,
  EnvelopeSimple,
  WhatsappLogo,
  Star,
} from "@phosphor-icons/react";

interface CourseDetailClientProps {
  course: CourseDetail;
}

export function CourseDetailClient({ course }: CourseDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "certificates">("overview");
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const rawPhone = course.whatsappNumber || "2347045422815";
  const cleanPhone = rawPhone.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    `Hello Trax, I would like to enrol in the "${course.title}" course.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Main Course Content Container */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto pt-6 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation (Trax Brand Tokens) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13.5px] mb-6 select-none min-w-0">
          <Link href="/" className="text-[#E7040D] hover:underline flex items-center gap-1 shrink-0 whitespace-nowrap">
            <House size={16} weight="fill" className="text-[#E7040D]" />
          </Link>
          <CaretRight size={13} weight="bold" className="text-zinc-400 shrink-0" />
          <Link href="/learning" className="text-[#E7040D] hover:underline font-medium shrink-0 whitespace-nowrap">
            All Courses
          </Link>
          <CaretRight size={13} weight="bold" className="text-zinc-400 shrink-0" />
          <span className="text-zinc-500 truncate min-w-0 flex-1">
            {course.title}
          </span>
        </nav>

        {/* 2-Column Grid (Left: 7 cols, Right: 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ─────────────────────────────────────────────────────────────
              Left Column: Hero Banner, Title, Rating, Tabs & Certificates
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Feature Banner Container (Clean image matching homepage card) */}
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[360px] rounded-none overflow-hidden border border-zinc-200/90 bg-zinc-100">
              <Image
                src={course.bannerImage || course.image}
                alt={course.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover object-center"
              />

              {/* Floating Duration Badge (Matching Homepage Card) */}
              <div className="absolute top-4 right-4 bg-[#FBBF24] text-zinc-950 text-[12px] font-bold px-3 py-1 rounded-none flex items-center gap-1.5 shadow-xs">
                <Clock size={14} weight="bold" className="text-zinc-900" />
                <span>{course.durationWeeks || course.duration}</span>
              </div>
            </div>

            {/* Course Title */}
            <h1 className="text-[22px] sm:text-[25px] font-bold text-zinc-900 leading-snug tracking-tight">
              {course.title}
            </h1>

            {/* Star Rating Line */}
            <div className="flex items-center gap-1.5 text-[13.5px]">
              <Star size={17} weight="fill" className="text-amber-400" />
              <span className="font-bold text-zinc-900">
                {Number(course.rating || 5).toFixed(1)}/5
              </span>
              <span className="text-zinc-500 font-normal">
                ({course.ratingsCount})
              </span>
            </div>

            {/* Tab Navigation: Overview | Certificates */}
            <div className="w-full pt-2">
              <div className="border-b border-zinc-200 flex">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 text-center pb-3 text-[14.5px] font-bold transition-colors relative cursor-pointer ${
                    activeTab === "overview"
                      ? "text-[#E7040D]"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  Overview
                  {activeTab === "overview" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E7040D]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("certificates")}
                  className={`flex-1 text-center pb-3 text-[14.5px] font-bold transition-colors relative cursor-pointer ${
                    activeTab === "certificates"
                      ? "text-[#E7040D]"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  Certificates
                  {activeTab === "certificates" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E7040D]" />
                  )}
                </button>
              </div>

              {/* Tab 1: Overview (Single Clean Paragraph) */}
              {activeTab === "overview" && (
                <div className="py-6 text-zinc-800 space-y-4">
                  <p className="text-[14.5px] leading-relaxed text-zinc-600">
                    {typeof course.description === "string"
                      ? course.description
                      : typeof course.summary === "string"
                      ? course.summary
                      : ""}
                  </p>
                  {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                    <div className="pt-3">
                      <h3 className="text-[14px] font-bold text-zinc-900 mb-2">Key Learning Outcomes</h3>
                      <ul className="space-y-2 list-disc list-outside pl-5 text-[13.5px] text-zinc-600">
                        {course.learningOutcomes.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {typeof item === "string" ? item : (item as any)?.text || ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Certificates */}
              {activeTab === "certificates" && (
                <div className="py-6 space-y-5 text-zinc-800">
                  <p className="text-[14px] text-zinc-600 leading-relaxed">
                    {course.certificateDetails?.requirement ||
                      "To successfully complete this Certificate course, you need to achieve 80% or higher in each course assessment."}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-[14px] font-normal text-zinc-900">
                      Your Certificate is:
                    </h3>
                    <ul className="space-y-2.5 text-[14px] text-zinc-600 list-disc list-outside pl-5">
                      {(course.certificateDetails?.bulletPoints && course.certificateDetails.bulletPoints.length > 0
                        ? course.certificateDetails.bulletPoints
                        : [
                            "Ideal for sharing with potential employers",
                            "Include it in your CV, professional social media profiles and job applications.",
                            "An indication of your commitment to continuously learn, upskill and achieve high results.",
                            "An incentive for you to continue empowering yourself through lifelong learning.",
                          ]
                      ).map((point, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* ─────────────────────────────────────────────────────────────
              Right Column: Single Course Card (100% 90-Degree Square Edges)
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-none border border-zinc-200 shadow-none p-6 space-y-6">
              
              {/* 1. Metadata Specs Rows */}
              <div className="space-y-3.5 text-[14px]">
                {/* Course Duration */}
                <div className="flex items-center justify-between text-zinc-600">
                  <div className="flex items-center gap-3">
                    <Clock size={18} weight="regular" className="text-zinc-600" />
                    <span>Course Duration</span>
                  </div>
                  <span className="text-zinc-900 font-normal">{course.duration}</span>
                </div>

                {/* Students Enrolled */}
                <div className="flex items-center justify-between text-zinc-600">
                  <div className="flex items-center gap-3">
                    <Users size={18} weight="regular" className="text-zinc-600" />
                    <span>Students Enrolled</span>
                  </div>
                  <span className="text-zinc-900 font-normal">{course.studentsCount}</span>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between text-zinc-600">
                  <div className="flex items-center gap-3">
                    <ChatCircleText size={18} weight="regular" className="text-zinc-600" />
                    <span>Language</span>
                  </div>
                  <span className="text-zinc-900 font-normal">{course.language || "English"}</span>
                </div>

                {/* Platform */}
                <div className="flex items-center justify-between text-zinc-600">
                  <div className="flex items-center gap-3">
                    <Monitor size={18} weight="regular" className="text-zinc-600" />
                    <span>Platform</span>
                  </div>
                  <span className="text-zinc-900 font-normal">{course.platform || "Web & WhatsApp"}</span>
                </div>
              </div>

              <div className="border-t border-zinc-100" />

              {/* 2. "This course includes:" Section */}
              <div className="space-y-3">
                <h3 className="text-[14px] font-semibold text-zinc-900">
                  This course includes:
                </h3>

                <div className="space-y-3 text-[13.5px] text-zinc-600">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} weight="regular" className="text-zinc-600" />
                    <span>Shareable certificate of completion</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <DeviceMobile size={18} weight="regular" className="text-zinc-600" />
                    <span>Access on web, and mobile</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe size={18} weight="regular" className="text-zinc-600" />
                    <span>100% online course</span>
                  </div>
                </div>
              </div>

              {/* 3. Primary Button: Enrol Now Via Whatsapp (Official WhatsApp Brand Green) */}
              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white text-[14.5px] font-bold rounded-none flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99]"
                >
                  <WhatsappLogo size={21} weight="fill" className="text-white" />
                  <span>Enrol Now Via Whatsapp</span>
                </a>
              </div>

              {/* 4. Share this course section */}
              <div className="space-y-3 pt-1">
                <h3 className="text-[13.5px] font-semibold text-zinc-900">
                  Share this course:
                </h3>

                <div className="flex items-center gap-2">
                  {/* Copy link button */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-50 hover:bg-zinc-100 active:scale-95 border border-zinc-200 rounded-none text-[12.5px] font-medium text-zinc-700 transition-all cursor-pointer select-none"
                  >
                    {copied ? (
                      <>
                        <Check size={14} weight="bold" className="text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} weight="regular" />
                        <span>Copy link</span>
                      </>
                    )}
                  </button>

                  {/* Facebook icon button */}
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
                    }}
                    className="w-9 h-9 bg-zinc-50 hover:bg-zinc-100 active:scale-90 border border-zinc-200 rounded-none flex items-center justify-center text-zinc-600 transition-all cursor-pointer select-none"
                    aria-label="Share on Facebook"
                  >
                    <FacebookLogo size={16} weight="fill" />
                  </button>

                  {/* X (Twitter) icon button */}
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(course.title)}`, "_blank");
                    }}
                    className="w-9 h-9 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-none flex items-center justify-center text-zinc-600 transition-colors cursor-pointer"
                    aria-label="Share on X"
                  >
                    <XLogo size={15} weight="bold" />
                  </button>

                  {/* Email icon button */}
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.location.href;
                      window.location.href = `mailto:?subject=${encodeURIComponent(course.title)}&body=Check%20out%20this%20course%20on%20Trax:%20${encodeURIComponent(url)}`;
                    }}
                    className="w-9 h-9 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-none flex items-center justify-center text-zinc-600 transition-colors cursor-pointer"
                    aria-label="Share via Email"
                  >
                    <EnvelopeSimple size={16} weight="regular" />
                  </button>

                  {/* WhatsApp icon button */}
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this course on Trax: ${course.title} at ${url}`)}`, "_blank");
                    }}
                    className="w-9 h-9 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-none flex items-center justify-center text-[#25D366] transition-colors cursor-pointer"
                    aria-label="Share on WhatsApp"
                  >
                    <WhatsappLogo size={17} weight="fill" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
