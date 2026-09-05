"use client";

import Link from "next/link";
import {
  Briefcase,
  Buildings,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  WhatsappLogo,
  Clock,
  Sparkle,
  FileText,
  CaretRight,
  CurrencyCircleDollar,
  GlobeHemisphereWest,
  UsersThree,
} from "@phosphor-icons/react";
import { AppHeader } from "@/components/navigation/app-header";
import { Footer } from "@/components/footer";

const TRUSTED_PARTNERS = [
  {
    name: "Paystack",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <rect x="3" y="4" width="18" height="3.5" rx="1" fill="#0BA4DB" />
        <rect x="3" y="10.25" width="12" height="3.5" rx="1" fill="#0BA4DB" />
        <rect x="3" y="16.5" width="18" height="3.5" rx="1" fill="#0BA4DB" />
      </svg>
    ),
  },
  {
    name: "Flutterwave",
    logo: (
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="shrink-0">
        <path d="M6 16C6 10.477 10.477 6 16 6C19.5 6 22.5 7.8 24.2 10.5L20.8 13.9C19.6 12.4 17.9 11.5 16 11.5C13.515 11.5 11.5 13.515 11.5 16C11.5 18.485 13.515 20.5 16 20.5C17.9 20.5 19.6 19.6 20.8 18.1L24.2 21.5C22.5 24.2 19.5 26 16 26C10.477 26 6 21.523 6 16Z" fill="#F56522" />
        <path d="M16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26" stroke="#FFBA00" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Moniepoint",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M3 6C3 4.89543 3.89543 4 5 4H7.5L12 11.5L16.5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H16.5V11.5L12 19L7.5 11.5V20H5C3.89543 20 3 19.1046 3 18V6Z" fill="#0336FF" />
      </svg>
    ),
  },
  {
    name: "Andela",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="9" stroke="#16A34A" strokeWidth="2.5" />
        <path d="M12 6.5L17 16.5H7L12 6.5Z" fill="#16A34A" />
      </svg>
    ),
  },
  {
    name: "Kuda",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <rect width="24" height="24" rx="6" fill="#40196D" />
        <path d="M7 6V18M7 12L15 6M9 10.5L17 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Interswitch",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="9" cy="12" r="6" fill="#D92D20" />
        <circle cx="15" cy="12" r="6" fill="#0BA4DB" fillOpacity="0.8" />
      </svg>
    ),
  },
];

const CURATION_STEPS = [
  {
    step: "01",
    title: "Initiate Editorial Contact",
    description:
      "Click Contact Editorial Team below to reach our desk. Introduce your organization, hiring targets, and general hiring timeline.",
  },
  {
    step: "02",
    title: "Submit Role Specifications",
    description:
      "Our team will request your job brief, verified compensation band, candidate prerequisites, and direct application destination.",
  },
  {
    step: "03",
    title: "Vetting and Publication",
    description:
      "Trax verifies employer legitimacy, formats the listing to the Trax editorial standard, and publishes it across our job network within 24 to 48 hours.",
  },
];

const PREPARATION_CHECKLIST = [
  {
    title: "Official Employer Credentials",
    detail: "Registered legal entity name, corporate website URL, and verified company email domain.",
    icon: Buildings,
  },
  {
    title: "Accurate Role Scope",
    detail: "Concrete seniority tier, technical stack, core responsibilities, and key candidate expectations.",
    icon: FileText,
  },
  {
    title: "Transparent Compensation Band",
    detail: "Clear salary or hourly range in local currency or USD, supporting high application conversion.",
    icon: CurrencyCircleDollar,
  },
  {
    title: "Workplace Policy and Location",
    detail: "Clear classification as Remote Africa, Hybrid, or On-site with precise base city.",
    icon: GlobeHemisphereWest,
  },
];

export default function SubmitJobPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between text-zinc-900">
      <div>
        {/* Navigation Bar */}
        <AppHeader activeTab="jobs" />

        {/* Hero Section: Editorial Standard */}
        <section className="relative overflow-hidden bg-white border-b border-zinc-200/80 pt-12 pb-16 sm:pt-16 sm:pb-20">
          {/* Subtle warm brand gradient background */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#fdf2ee] rounded-full blur-3xl opacity-60 pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-6 sm:px-10 relative z-10">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8e0] text-[#E7040D] text-[12px] font-bold tracking-wider uppercase mb-6">
              <Sparkle size={14} weight="fill" />
              <span>The Trax Editorial Standard</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1F1F] tracking-[-0.02em] leading-[1.15] max-w-3xl mb-6">
              Submit a Role for Trax Editorial Review
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 leading-[1.7] max-w-2xl mb-8">
              Trax Jobs is a human-curated board. We do not support unverified, automated self-serve postings. Every single role is manually reviewed, standardized, and published by our editorial team to ensure exceptional quality across the African tech ecosystem.
            </p>

            {/* Direct Editorial Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/about?tab=contact&topic=job"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#E7040D] hover:bg-[#CB030B] text-white font-bold text-[15px] transition-all shadow-[0_12px_28px_-6px_rgba(231,4,13,0.35)] hover:-translate-y-0.5 rounded-none"
              >
                <span>Contact Editorial Team</span>
                <ArrowRight size={18} weight="bold" />
              </Link>

              <a
                href="https://wa.me/2348000008729?text=Hello%20Trax%20Jobs%20Editorial%20Team%2C%20I%20would%20like%20to%20submit%20a%20job%20listing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 font-bold text-[15px] transition-all hover:-translate-y-0.5 rounded-none"
              >
                <WhatsappLogo size={20} weight="fill" className="text-[#25D366]" />
                <span>Chat with Editorial on WhatsApp</span>
              </a>
            </div>

            {/* Key Editorial Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-12 border-t border-zinc-200/80">
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-[#fdf2ee] text-[#E7040D] shrink-0">
                  <ShieldCheck size={22} weight="bold" />
                </div>
                <div>
                  <h4 className="text-[14.5px] font-bold text-[#1F1F1F]">Verified Employers Only</h4>
                  <p className="text-[13px] text-zinc-500 leading-relaxed mt-0.5">
                    We strictly vet company credentials and legitimate domain email addresses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-[#fdf2ee] text-[#E7040D] shrink-0">
                  <Clock size={22} weight="bold" />
                </div>
                <div>
                  <h4 className="text-[14.5px] font-bold text-[#1F1F1F]">24-48h Editorial Turnaround</h4>
                  <p className="text-[13px] text-zinc-500 leading-relaxed mt-0.5">
                    Fast formatting, copy editing, and deployment once specs are confirmed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-[#fdf2ee] text-[#E7040D] shrink-0">
                  <UsersThree size={22} weight="bold" />
                </div>
                <div>
                  <h4 className="text-[14.5px] font-bold text-[#1F1F1F]">Zero Candidate Placement Fees</h4>
                  <p className="text-[13px] text-zinc-500 leading-relaxed mt-0.5">
                    Job seekers apply directly to your URL or inbox without any middleman barrier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Pipeline: 3 Simple Steps */}
        <section className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-zinc-200/80">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
            <div className="max-w-2xl mb-12">
              <div className="text-[12px] font-black text-[#E7040D] tracking-wider uppercase mb-2">
                Curated Publishing Workflow
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1F1F1F] tracking-tight">
                How Your Role Goes Live on Trax
              </h2>
              <p className="text-[15px] text-zinc-600 leading-relaxed mt-2">
                Our editorial team handles the technical formatting and publishing directly in our admin dashboard so you can focus on interviewing candidates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CURATION_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="bg-white p-8 border border-zinc-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative group hover:border-zinc-400 transition-all"
                >
                  <div className="space-y-4">
                    <span className="text-3xl font-black text-[#E7040D] tracking-tight block">
                      {step.step}
                    </span>
                    <h3 className="text-lg font-bold text-[#1F1F1F] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-zinc-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center text-xs font-bold text-zinc-400 group-hover:text-[#E7040D] transition-colors">
                    <span>Trax Editorial Protocol</span>
                    <CaretRight size={14} weight="bold" className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preparation Checklist */}
        <section className="py-16 sm:py-20 bg-white border-b border-zinc-200/80">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-[12px] font-black text-[#E7040D] tracking-wider uppercase">
                  Submission Readiness
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1F1F1F] tracking-tight leading-tight">
                  What to Have Ready Before Contacting Us
                </h2>
                <p className="text-[14.5px] text-zinc-600 leading-relaxed">
                  To expedite the 24-hour turnaround, please prepare the core details of your opening. Having these ready ensures immediate editorial review.
                </p>

                <div className="pt-4">
                  <Link
                    href="/about?tab=contact&topic=job"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1F1F1F] hover:bg-[#E7040D] text-white font-bold text-sm transition-all rounded-none"
                  >
                    <span>Proceed to Contact Desk</span>
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {PREPARATION_CHECKLIST.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-6 bg-[#FAFAFA] border border-zinc-200/80 hover:border-zinc-300 transition-all space-y-2.5"
                    >
                      <div className="w-10 h-10 bg-white border border-zinc-200 flex items-center justify-center text-[#E7040D]">
                        <Icon size={20} weight="bold" />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#1F1F1F]">{item.title}</h4>
                      <p className="text-[13px] text-zinc-600 leading-relaxed">{item.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Trusted African Tech Ecosystem Brand Bar */}
        <section className="py-12 bg-[#FAF8F5] border-b border-zinc-200/80">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-10 text-center space-y-6">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Trusted by leading teams across the African technology ecosystem
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {TRUSTED_PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center gap-2.5 px-4 py-2 bg-white border border-zinc-200/80 shadow-2xs"
                >
                  {partner.logo}
                  <span className="text-[13.5px] font-black text-zinc-800 tracking-tight">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 bg-[#1F1F1F] text-white">
          <div className="max-w-[1000px] mx-auto px-6 sm:px-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
              <Briefcase size={14} weight="fill" className="text-[#E7040D]" />
              <span>Ready to publish?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white max-w-xl mx-auto">
              Connect With the Trax Editorial Desk Today
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Send us your role inquiry. We will reply promptly with the listing questionnaire and publish your position to our community.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/about?tab=contact&topic=job"
                className="w-full sm:w-auto px-8 py-4 bg-[#E7040D] hover:bg-[#CB030B] text-white font-bold text-[15px] transition-all shadow-[0_12px_28px_-6px_rgba(231,4,13,0.45)] hover:-translate-y-0.5 rounded-none"
              >
                Contact Editorial Team
              </Link>
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-7 py-4 bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold text-[15px] transition-all rounded-none"
              >
                Browse Live Roles
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
