"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, SealCheck, BookmarkSimple, EnvelopeSimple, Buildings } from "@phosphor-icons/react";

/* ─────────────────────────────────────────────────────────────
   1. Authentic African Company Real SVG Logos (Vector Precision)
───────────────────────────────────────────────────────────── */
function RealCompanyLogo({ name }: { name: string }) {
  if (name === "Flutterwave") {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#FFF3ED] border border-[#FFE0D1] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path d="M6 16C6 10.477 10.477 6 16 6C19.5 6 22.5 7.8 24.2 10.5L20.8 13.9C19.6 12.4 17.9 11.5 16 11.5C13.515 11.5 11.5 13.515 11.5 16C11.5 18.485 13.515 20.5 16 20.5C17.9 20.5 19.6 19.6 20.8 18.1L24.2 21.5C22.5 24.2 19.5 26 16 26C10.477 26 6 21.523 6 16Z" fill="#F56522"/>
          <path d="M16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26" stroke="#FFBA00" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }
  if (name === "Paystack") {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#E8F8FF] border border-[#C7EFFF] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="3.5" rx="1.75" fill="#0BA4DB"/>
          <rect x="3" y="10.25" width="12" height="3.5" rx="1.75" fill="#0BA4DB"/>
          <rect x="3" y="16.5" width="18" height="3.5" rx="1.75" fill="#0BA4DB"/>
        </svg>
      </div>
    );
  }
  if (name === "Moniepoint") {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] border border-[#D7E2FF] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <path d="M3 6C3 4.89543 3.89543 4 5 4H7.5L12 11.5L16.5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H16.5V11.5L12 19L7.5 11.5V20H5C3.89543 20 3 19.1046 3 18V6Z" fill="#0336FF"/>
        </svg>
      </div>
    );
  }
  if (name === "Andela") {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#16A34A" strokeWidth="2.5"/>
          <path d="M12 6.5L17 16.5H7L12 6.5Z" fill="#16A34A"/>
        </svg>
      </div>
    );
  }
  if (name === "Interswitch") {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#DC2626"/>
          <circle cx="12" cy="12" r="4.5" fill="white"/>
          <circle cx="12" cy="12" r="2" fill="#DC2626"/>
        </svg>
      </div>
    );
  }
  if (name === "Kuda") {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#F5F3FF] border border-[#E9E4FF] flex items-center justify-center shrink-0 shadow-xs">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#40196D"/>
          <path d="M7 6V18M7 12L15 6M9.5 10L16.5 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 font-bold text-[12px] text-zinc-700">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. Real African People Portrait Avatars (Verified with Fallback)
───────────────────────────────────────────────────────────── */
function AfricanPersonAvatar({ image, alt, fallbackInitials }: { image: string; alt: string; fallbackInitials: string }) {
  const [error, setError] = useState(false);

  return (
    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 ring-1 ring-zinc-200/80 bg-[#fce8e0] flex items-center justify-center">
      {!error ? (
        <Image
          src={image}
          alt={alt}
          fill
          unoptimized
          sizes="32px"
          className="object-cover object-top"
          onError={() => setError(true)}
        />
      ) : (
        <span className="text-[10px] font-bold text-[#E7040D]">{fallbackInitials}</span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 1: Curated African Tech Roles (Real Company Logos)
───────────────────────────────────────────────────────────── */
const VERIFIED_JOBS = [
  { role: "Senior Frontend Engineer", company: "Paystack", location: "Lagos / Remote", salary: "₦28M - ₦38M/yr" },
  { role: "Lead Infrastructure Dev", company: "Flutterwave", location: "Lagos", salary: "$60k - $80k/yr" },
  { role: "Principal Product Designer", company: "Moniepoint", location: "Lagos", salary: "₦20M - ₦30M/yr" },
  { role: "Senior DevOps Engineer", company: "Andela", location: "Remote Africa", salary: "$70k - $95k/yr" },
  { role: "Core Systems Architect", company: "Interswitch", location: "Abuja", salary: "₦32M - ₦45M/yr" },
  { role: "iOS Engineering Lead", company: "Kuda", location: "Lagos", salary: "₦25M - ₦35M/yr" },
];

function VerifiedJobsCard() {
  const ROW_H = 50;
  const list = [...VERIFIED_JOBS, ...VERIFIED_JOBS];

  return (
    <div className="w-full bg-white rounded-[20px] shadow-[0_16px_36px_-6px_rgba(15,16,18,0.08),0_4px_12px_-2px_rgba(15,16,18,0.03)] border border-zinc-200/70 p-4.5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12.5px] font-bold text-zinc-950 tracking-tight">Curated open roles</p>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
          Verified today
        </span>
      </div>
      <div style={{ height: ROW_H * 3, overflow: "hidden" }}>
        <div className="ticker-scroll" style={{ animationDuration: "18s" }}>
          {list.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-3" style={{ height: ROW_H }}>
              <div className="flex items-center gap-3 min-w-0">
                <RealCompanyLogo name={item.company} />
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-zinc-900 truncate leading-snug">{item.role}</p>
                  <p className="text-[10.5px] text-zinc-500 leading-tight">{item.company} &bull; {item.location}</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-zinc-700 bg-zinc-100 border border-zinc-200/60 px-2.5 py-0.5 rounded-md shrink-0">
                {item.salary}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 2: Saved Opportunities (Real African People Portraits)
───────────────────────────────────────────────────────────── */
const SAVED_ITEMS = [
  {
    role: "Staff Backend Engineer",
    company: "Flutterwave",
    date: "Reviewed 2d ago",
    status: "In interview",
    statusStyle: "bg-amber-50 text-amber-800 border-amber-200",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
    person: "Tunde Bakare",
    initials: "TB",
  },
  {
    role: "Senior Product Designer",
    company: "Paystack",
    date: "Saved yesterday",
    status: "Saved",
    statusStyle: "bg-zinc-100 text-zinc-700 border-zinc-200",
    avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
    person: "Zainab Aliyu",
    initials: "ZA",
  },
  {
    role: "Lead Data Engineer",
    company: "Moniepoint",
    date: "Sent 4d ago",
    status: "Reviewing",
    statusStyle: "bg-blue-50 text-blue-700 border-blue-200",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    person: "Chinedu Okeke",
    initials: "CO",
  },
  {
    role: "Cloud Security Lead",
    company: "Andela",
    date: "Sent 1w ago",
    status: "Offer ready",
    statusStyle: "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold",
    avatar: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=150",
    person: "Kemi Adeleke",
    initials: "KA",
  },
  {
    role: "Mobile Engineer",
    company: "Kuda",
    date: "Saved 3d ago",
    status: "Saved",
    statusStyle: "bg-zinc-100 text-zinc-700 border-zinc-200",
    avatar: "https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=150",
    person: "Dayo Oladipo",
    initials: "DO",
  },
];

function ApplicationTrackerCard() {
  const ROW_H = 50;
  const list = [...SAVED_ITEMS, ...SAVED_ITEMS];

  return (
    <div className="w-full bg-white rounded-[20px] shadow-[0_16px_36px_-6px_rgba(15,16,18,0.08),0_4px_12px_-2px_rgba(15,16,18,0.03)] border border-zinc-200/70 p-4.5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12.5px] font-bold text-zinc-950 tracking-tight">Saved opportunities</p>
        <span className="text-[10px] font-semibold text-[#E7040D] bg-[#fce8e0] px-2 py-0.5 rounded-full">
          Stored locally
        </span>
      </div>
      <div style={{ height: ROW_H * 3, overflow: "hidden" }}>
        <div className="ticker-scroll" style={{ animationDuration: "16s" }}>
          {list.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-3" style={{ height: ROW_H }}>
              <div className="flex items-center gap-3 min-w-0">
                <AfricanPersonAvatar image={item.avatar} alt={item.person} fallbackInitials={item.initials} />
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-zinc-900 truncate leading-snug">{item.role}</p>
                  <p className="text-[10.5px] text-zinc-500 leading-tight">{item.company} &bull; {item.date}</p>
                </div>
              </div>
              <span className={`text-[10px] font-semibold border px-2.5 py-0.5 rounded-full shrink-0 ${item.statusStyle}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 3: Authentic Talent Profile (Real African Portrait)
───────────────────────────────────────────────────────────── */
function TalentProfileCard() {
  return (
    <div className="w-full bg-white rounded-[20px] shadow-[0_16px_36px_-6px_rgba(15,16,18,0.08),0_4px_12px_-2px_rgba(15,16,18,0.03)] border border-zinc-200/70 p-4.5 relative overflow-hidden">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
            <Image
              src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Amara Osei"
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[13px] font-bold text-zinc-950 leading-tight">Amara Osei</p>
              <SealCheck size={14} weight="fill" className="text-[#E7040D]" />
            </div>
            <p className="text-[11px] font-medium text-zinc-600">Senior Product Designer</p>
            <p className="text-[10px] text-zinc-400">Ex-Paystack &bull; Lagos, NG</p>
          </div>
        </div>
        <span className="text-[9.5px] font-bold text-[#E7040D] bg-[#fce8e0] border border-[#f5c4ae] px-2.5 py-1 rounded-md shrink-0">
          Verified Talent
        </span>
      </div>

      <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-2.5 space-y-1.5 mb-2.5">
        <div className="flex items-center justify-between text-[10.5px]">
          <span className="font-semibold text-zinc-800">Checkout Redesign Project</span>
          <span className="text-zinc-500 font-medium">5+ yrs exp</span>
        </div>
        <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-1">
          Designed core checkout flows handling over $120M monthly...
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[9.5px] font-semibold">Design Systems</span>
        <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[9.5px] font-semibold">Fintech UX</span>
        <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[9.5px] font-semibold">User Research</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 4: Employer Direct Submission
───────────────────────────────────────────────────────────── */
function JobSubmissionCard() {
  return (
    <div className="w-full bg-white rounded-[20px] shadow-[0_16px_36px_-6px_rgba(15,16,18,0.08),0_4px_12px_-2px_rgba(15,16,18,0.03)] border border-zinc-200/70 p-4.5">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <RealCompanyLogo name="Moniepoint" />
          <div>
            <p className="text-[12.5px] font-bold text-zinc-900 leading-tight">Moniepoint</p>
            <p className="text-[10px] text-zinc-400">Employer submission</p>
          </div>
        </div>
        <span className="text-[9.5px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">
          Draft listing
        </span>
      </div>

      <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-2.5 mb-3">
        <p className="text-[11.5px] font-semibold text-zinc-900 leading-tight mb-1">
          Lead Payment Core Engineer
        </p>
        <p className="text-[10px] text-zinc-500 leading-relaxed">
          Scale transaction routing engines across West Africa. Salary: $55,000 to $75,000 yearly.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-zinc-400">Published after Trax review</span>
        <span className="inline-flex items-center gap-1 bg-[#E7040D] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xs cursor-pointer hover:bg-[#CB030B] transition-colors">
          Submit open role &rarr;
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 5: Direct Talent Contact (WhatsApp & Email Direct)
───────────────────────────────────────────────────────────── */
function DirectHireCard() {
  return (
    <div className="w-full bg-white rounded-[20px] shadow-[0_16px_36px_-6px_rgba(15,16,18,0.08),0_4px_12px_-2px_rgba(15,16,18,0.03)] border border-zinc-200/70 p-4.5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] font-bold text-zinc-900">Direct talent contact</p>
        <span className="text-[9.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          No platform fees
        </span>
      </div>

      <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-3 mb-3">
        <p className="text-[10px] text-zinc-400 mb-2">Preferred contact:</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center gap-1.5 text-[11px] font-medium text-zinc-800 shadow-2xs">
            <EnvelopeSimple size={13} className="text-[#E7040D]" weight="bold" />
            <span>Send email</span>
          </div>
          <div className="h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center gap-1.5 text-[11px] font-bold shadow-2xs">
            <span>WhatsApp chat</span>
          </div>
        </div>
      </div>

      <p className="text-[9.5px] text-zinc-400 leading-normal text-center">
        Hiring founders reach talent directly. No intermediary message locks.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 6: Editorial Trust & Rigorous Verification
───────────────────────────────────────────────────────────── */
function EditorialTrustCard() {
  return (
    <div className="w-full bg-white rounded-[20px] shadow-[0_16px_36px_-6px_rgba(15,16,18,0.08),0_4px_12px_-2px_rgba(15,16,18,0.03)] border border-zinc-200/70 p-4.5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Image
            src="/images/trax-logo.png"
            alt="Trax"
            width={78}
            height={22}
            className="h-4.5 w-auto object-contain"
          />
          <span className="text-[11px] text-zinc-400 font-medium border-l border-zinc-200 pl-2">
            Editorial Standard
          </span>
        </div>
        <span className="text-[9.5px] font-bold text-[#E7040D] bg-[#fce8e0] px-2 py-0.5 rounded-full">
          100% human review
        </span>
      </div>

      <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-3 space-y-2 mb-2.5">
        <div className="flex items-center gap-2 text-[10.5px] text-zinc-800">
          <Check size={13} weight="bold" className="text-[#E7040D] shrink-0" />
          <span>Every job verified with company founders or HR leads</span>
        </div>
        <div className="flex items-center gap-2 text-[10.5px] text-zinc-800">
          <Check size={13} weight="bold" className="text-[#E7040D] shrink-0" />
          <span>Zero recycled vacancies, zero ghost postings</span>
        </div>
        <div className="flex items-center gap-2 text-[10.5px] text-zinc-800">
          <Check size={13} weight="bold" className="text-[#E7040D] shrink-0" />
          <span>Rooted in the African startup ecosystem</span>
        </div>
      </div>

      <p className="text-[10px] text-zinc-400 leading-normal">
        Curated by the editorial team behind Trax Media (trax.ng).
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Features Config
───────────────────────────────────────────────────────────── */
const features = [
  {
    title: "Curated open roles",
    description: "Every listing is reviewed by Trax across leading African startups and technology teams. We filter out dead links and ghost postings so you only see active openings.",
    cta: "Browse live jobs",
    href: "/jobs",
    component: <VerifiedJobsCard />,
  },
  {
    title: "Saved opportunities tracker",
    description: "Bookmark the roles you want to pursue on your device. Keep track of your job search progress without creating accounts or dealing with spam notifications.",
    cta: "Start tracking now",
    href: "/jobs",
    component: <ApplicationTrackerCard />,
  },
  {
    title: "Vetted talent profiles",
    description: "Put your portfolio directly in front of active hiring managers and startup founders across the continent. Every published talent profile is reviewed first.",
    cta: "View talent profiles",
    href: "/talent",
    component: <TalentProfileCard />,
  },
  {
    title: "Employer vacancy submissions",
    description: "Post your team openings to a focused audience of African engineers, designers, and operators. Submissions are reviewed and published within one business day.",
    cta: "Submit an open job",
    href: "/submit-job",
    component: <JobSubmissionCard />,
  },
  {
    title: "Direct talent hiring",
    description: "Connect directly with candidates through their preferred channel, whether WhatsApp or email. No platform middleman, no message credits, no friction.",
    cta: "Explore talent directory",
    href: "/talent",
    component: <DirectHireCard />,
  },
  {
    title: "Editorial trust and authority",
    description: "Trax has covered African startups, funding rounds, and technology hubs from day one. That same standard of rigorous verification applies to every single listing.",
    cta: "About Trax Media",
    href: "/about",
    component: <EditorialTrustCard />,
  },
];

/* ─────────────────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────────────────── */
export function WhyTraxSection() {
  const row1 = features.slice(0, 3);
  const row2 = features.slice(3, 6);

  return (
    <section className="w-full bg-[#FAF8F5] py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle Graph-Paper Grid Background */}
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

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* Section Header with Editorial Kicker */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8e0] text-[#E7040D] text-[11px] font-bold uppercase tracking-wider mb-3.5">
              <span>The Trax Standard</span>
            </div>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold tracking-tight text-zinc-950 leading-[1.2] mb-4">
              We are here for every step of your search
            </h2>
            <p className="text-[15px] sm:text-[16px] text-zinc-500 leading-relaxed max-w-xl">
              Trax curates every listing, every company profile, and every talent card on this platform. When you find something here, it has earned its place.
            </p>
          </div>
          <div className="shrink-0 pt-1">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E7040D] hover:bg-[#CB030B] text-white text-[14px] font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              Browse all jobs
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {row1.map((f, i) => (
            <FeatureColumn key={i} feature={f} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-12">
          {row2.map((f, i) => (
            <FeatureColumn key={i} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureColumn({ feature }: { feature: typeof features[0] }) {
  return (
    <div className="flex flex-col gap-7 group/card">
      {/* Outer Warm Gradient Canvas with Stacked Card Illusion */}
      <div className="relative">
        {/* Ghost card peeking behind (stacked depth illusion) */}
        <div
          className="absolute inset-x-2 -bottom-1.5 h-6 rounded-b-[22px] opacity-40 transition-all duration-300 group-hover/card:opacity-60"
          style={{ background: "linear-gradient(135deg, #f5c4ae 0%, #edb8a4 100%)" }}
        />
        {/* Main outer card */}
        <div
          className="relative w-full h-[280px] rounded-[24px] border border-[#f0c0a8]/50 p-5 flex items-center justify-center overflow-hidden transition-all duration-300 ease-out group-hover/card:-translate-y-1 group-hover/card:shadow-[0_20px_48px_-8px_rgba(231,4,13,0.10),0_8px_20px_-4px_rgba(231,4,13,0.05)]"
          style={{
            background: "linear-gradient(145deg, #fdf2ee 0%, #fce4d6 45%, #f8d4c4 100%)",
            boxShadow: "0 12px 32px -6px rgba(231,4,13,0.06), 0 4px 12px -2px rgba(231,4,13,0.03)",
          }}
        >
          {feature.component}
        </div>
      </div>

      {/* Feature Details (bolder titles, tighter tracking) */}
      <div>
        <h3 className="text-[19px] sm:text-[21px] font-extrabold text-zinc-950 mb-2.5 leading-snug tracking-[-0.02em]">
          {feature.title}
        </h3>
        <p className="text-[14px] sm:text-[15px] text-zinc-500 leading-[1.7] mb-3.5">
          {feature.description}
        </p>
        <Link
          href={feature.href}
          className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#E7040D] hover:text-[#CB030B] transition-colors group"
        >
          <span>{feature.cta}</span>
          <ArrowRight
            size={13}
            weight="bold"
            className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </div>
  );
}
