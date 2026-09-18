"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  User,
  Buildings,
  CheckCircle,
  UploadSimple,
  X,
  CaretDown,
  SealCheck,
  ArrowRight,
  ArrowLeft,
  Sparkle,
  Globe,
  EnvelopeSimple,
  CurrencyDollar,
  MapPin,
  LinkedinLogo,
  GithubLogo,
  WhatsappLogo,
  Eye,
  Check,
  WarningCircle,
  Compass,
  FileText,
  Clock,
  Plus,
} from "@phosphor-icons/react";

export type SubmissionType = "job" | "talent" | "company";

interface PostAndSubmitHubProps {
  initialType?: string | null;
}

/* ─────────────────────────────────────────────────────────────
   Curated Dropdown Data Sets (Africa Tech Ecosystem)
───────────────────────────────────────────────────────────── */

const ROLE_CATEGORIES = [
  "Engineering",
  "Product",
  "Design",
  "Data & AI",
  "DevOps & Cloud",
  "Marketing & Growth",
  "Operations & Support",
  "Finance & Legal",
];

const WORKPLACE_TYPES = [
  "Remote Africa",
  "Global Remote",
  "Hybrid",
  "On-site",
];

const AFRICAN_LOCATIONS = [
  "Lagos, Nigeria",
  "Abuja, Nigeria",
  "Abeokuta, Ogun State",
  "Ibadan, Nigeria",
  "Nairobi, Kenya",
  "Accra, Ghana",
  "Cape Town, South Africa",
  "Johannesburg, South Africa",
  "Kigali, Rwanda",
  "Cairo, Egypt",
  "London & Lagos",
  "San Francisco & Lagos",
  "Remote Africa",
  "Global Remote",
];

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Contract",
  "Part-time",
  "Internship",
];

const EXPERIENCE_LEVELS = [
  "Junior (1-2 years)",
  "Mid-Level (3-5 years)",
  "Senior (5-8 years)",
  "Staff / Principal (8+ years)",
  "Executive / Director",
];

const SALARY_RANGES = [
  "Competitive / Disclosed on Interview",
  "Under $1,500 / month",
  "$1,500 - $3,000 / month",
  "$3,000 - $5,000 / month",
  "$5,000 - $8,000 / month",
  "$8,000+ / month",
  "NGN 500,000 - NGN 1,000,000 / month",
  "NGN 1,000,000 - NGN 2,500,000 / month",
  "NGN 2,500,000+ / month",
];

const COMPANY_SECTORS = [
  "Payments Infrastructure",
  "Global Banking & APIs",
  "Developer Tools & Infrastructure",
  "Mobility & Logistics",
  "Talent & HR Tech",
  "WealthTech & Investments",
  "HealthTech & Electronic Records",
  "E-Commerce & Digital Retail",
  "AI, Data & Cloud Solutions",
];

const COMPANY_SIZES = [
  "1-10 employees (Early Stage)",
  "11-50 employees (Growth)",
  "51-200 employees (Scale-up)",
  "201-500 employees (Established)",
  "500+ employees (Enterprise)",
];

const COMMON_SKILLS_POPULAR = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Python",
  "Go",
  "Tailwind CSS",
  "PostgreSQL",
  "Figma",
  "GraphQL",
  "AWS",
  "Docker",
  "Flutter",
  "Solidity",
];

function getSanitizedType(val?: string | null): SubmissionType {
  if (val === "talent" || val === "submit-profile") return "talent";
  if (val === "company" || val === "register-company") return "company";
  return "job";
}

/* ─────────────────────────────────────────────────────────────
   Main Hub Container
───────────────────────────────────────────────────────────── */
export function PostAndSubmitHub({ initialType }: PostAndSubmitHubProps) {
  const [activeType, setActiveType] = useState<SubmissionType>(() => getSanitizedType(initialType));

  useEffect(() => {
    if (initialType) {
      setActiveType(getSanitizedType(initialType));
    }
  }, [initialType]);

  return (
    <div className="w-full bg-[#FAF8F5] py-10 sm:py-16">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1F1F1F] tracking-[-0.025em] leading-[1.15] mb-3.5">
            Editorial Submission Studio
          </h2>
          <p className="text-[15px] sm:text-[16px] text-zinc-600 leading-[1.7] max-w-2xl mx-auto">
            Every listing on Trax Jobs is manually vetted by our editorial team within 24 hours. Compose and proof your submission live before sending to the editorial review queue.
          </p>
        </div>

        {/* 3-Pill Segmented Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white border border-zinc-200/90 shadow-2xs gap-1 max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveType("job")}
              className={`flex items-center gap-2 px-5 sm:px-7 py-3 text-[13.5px] font-bold transition-all cursor-pointer select-none whitespace-nowrap ${
                activeType === "job"
                  ? "bg-[#E7040D] text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              <Briefcase size={17} weight={activeType === "job" ? "fill" : "bold"} />
              <span>Post a Job</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveType("talent")}
              className={`flex items-center gap-2 px-5 sm:px-7 py-3 text-[13.5px] font-bold transition-all cursor-pointer select-none whitespace-nowrap ${
                activeType === "talent"
                  ? "bg-[#E7040D] text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              <User size={17} weight={activeType === "talent" ? "fill" : "bold"} />
              <span>Submit Talent Profile</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveType("company")}
              className={`flex items-center gap-2 px-5 sm:px-7 py-3 text-[13.5px] font-bold transition-all cursor-pointer select-none whitespace-nowrap ${
                activeType === "company"
                  ? "bg-[#E7040D] text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              <Buildings size={17} weight={activeType === "company" ? "fill" : "bold"} />
              <span>Register Company</span>
            </button>
          </div>
        </div>

        {/* Studio Active Canvas */}
        {activeType === "job" && <JobStudio />}
        {activeType === "talent" && <TalentStudio />}
        {activeType === "company" && <CompanyStudio />}

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   1. JOB SUBMISSION STUDIO (Split-Screen + Live Card Proof)
───────────────────────────────────────────────────────────── */
function JobStudio() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [roleCategory, setRoleCategory] = useState(ROLE_CATEGORIES[0]);
  const [workplaceType, setWorkplaceType] = useState(WORKPLACE_TYPES[0]);
  const [location, setLocation] = useState(AFRICAN_LOCATIONS[0]);
  const [employmentType, setEmploymentType] = useState(EMPLOYMENT_TYPES[0]);
  const [experienceLevel, setExperienceLevel] = useState(EXPERIENCE_LEVELS[1]);
  const [salaryRange, setSalaryRange] = useState(SALARY_RANGES[2]);
  const [applicationLink, setApplicationLink] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  // Media
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const validateStep1 = () => {
    if (!companyName.trim() || !jobTitle.trim() || !contactEmail.trim()) {
      setError("Please complete Company Name, Job Title, and Contact Email to continue.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!applicationLink.trim()) {
      setError("Please provide an external application URL for candidates.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("companyName", companyName.trim());
      formData.append("jobTitle", jobTitle.trim());
      formData.append("roleCategory", roleCategory);
      formData.append("workplaceType", workplaceType);
      formData.append("location", location);
      formData.append("employmentType", employmentType);
      formData.append("experienceLevel", experienceLevel);
      formData.append("salaryRange", salaryRange);
      formData.append("applicationLink", applicationLink.trim());
      formData.append("contactEmail", contactEmail.trim());
      formData.append("description", description.trim());
      formData.append("requirements", requirements.trim());

      if (logoFile) formData.append("logo", logoFile);
      if (coverFile) formData.append("coverImage", coverFile);

      const res = await fetch("/api/submit-job", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit job listing");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SuccessState
        title="Job Listing Queued for Editorial Review"
        email={contactEmail}
        onReset={() => {
          setSubmitted(false);
          setStep(1);
          setJobTitle("");
          setDescription("");
          setRequirements("");
          setApplicationLink("");
          setLogoFile(null);
          setLogoPreview(null);
          setCoverFile(null);
          setCoverPreview(null);
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: 21st.dev Stepper Form */}
      <div className="lg:col-span-7 bg-white border border-zinc-200/90 shadow-[0_16px_36px_-6px_rgba(15,16,18,0.06)] p-6 sm:p-8">
        
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-200/90">
          <div className="flex items-center gap-3">
            <span className={`w-7 h-7 flex items-center justify-center text-[12px] font-black ${
              step === 1 ? "bg-[#E7040D] text-white" : "bg-zinc-100 text-zinc-900 border border-zinc-300"
            }`}>
              1
            </span>
            <div className="text-left">
              <p className="text-[13px] font-bold text-zinc-900 leading-none">Role & Company</p>
              <p className="text-[11.5px] text-zinc-500 mt-1">Foundational credentials</p>
            </div>
          </div>

          <div className="h-px w-12 bg-zinc-200 hidden sm:block" />

          <div className="flex items-center gap-3">
            <span className={`w-7 h-7 flex items-center justify-center text-[12px] font-black ${
              step === 2 ? "bg-[#E7040D] text-white" : "bg-zinc-100 text-zinc-500 border border-zinc-300"
            }`}>
              2
            </span>
            <div className="text-left">
              <p className={`text-[13px] font-bold leading-none ${step === 2 ? "text-zinc-900" : "text-zinc-500"}`}>
                Scope & Proofing
              </p>
              <p className="text-[11.5px] text-zinc-500 mt-1">Terms, tags & external link</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3.5 mb-6 bg-red-50 border border-red-200 text-red-700 text-[13px] font-medium flex items-center gap-2">
            <WarningCircle size={18} weight="fill" className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Core Role & Company Credentials */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Company Name & Contact Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Company Name <span className="text-[#E7040D]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                    <Buildings size={16} weight="bold" />
                  </span>
                  <input
                    type="text"
                    required
                    autoComplete="organization"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Paystack, Moniepoint"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-medium placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Hiring Contact Email <span className="text-[#E7040D]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                    <EnvelopeSimple size={16} weight="bold" />
                  </span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-medium placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Job Title <span className="text-[#E7040D]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                  <Briefcase size={16} weight="bold" />
                </span>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Infrastructure Engineer"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-semibold placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Role Category */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Discipline / Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ROLE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setRoleCategory(cat)}
                    className={`px-3 py-2 text-[12.5px] font-bold text-left transition-all border cursor-pointer select-none truncate ${
                      roleCategory === cat
                        ? "bg-[#0C1222] text-white border-[#0C1222]"
                        : "bg-zinc-50/60 text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Workplace Model Pills */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Workplace Setup
              </label>
              <div className="flex flex-wrap gap-2">
                {WORKPLACE_TYPES.map((wpt) => (
                  <button
                    key={wpt}
                    type="button"
                    onClick={() => setWorkplaceType(wpt)}
                    className={`px-3.5 py-2 text-[12.5px] font-bold transition-all border cursor-pointer select-none ${
                      workplaceType === wpt
                        ? "bg-[#E7040D] text-white border-[#E7040D]"
                        : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    {wpt}
                  </button>
                ))}
              </div>
            </div>

            {/* African Location & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Hub Location
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[13px] font-medium focus:bg-white focus:border-[#E7040D] focus:outline-none cursor-pointer"
                  >
                    {AFRICAN_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Seniority Level
                </label>
                <div className="relative">
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[13px] font-medium focus:bg-white focus:border-[#E7040D] focus:outline-none cursor-pointer"
                  >
                    {EXPERIENCE_LEVELS.map((el) => (
                      <option key={el} value={el}>{el}</option>
                    ))}
                  </select>
                  <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Proceed to Step 2 Button */}
            <div className="pt-4 border-t border-zinc-200/90 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all cursor-pointer select-none active:scale-95 shadow-xs"
              >
                <span>Continue to Step 2: Scope & Proof</span>
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Scope, Media & External Application */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employment Type & Salary Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Contract Agreement
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EMPLOYMENT_TYPES.map((et) => (
                    <button
                      key={et}
                      type="button"
                      onClick={() => setEmploymentType(et)}
                      className={`px-3 py-2 text-[12px] font-bold text-center border cursor-pointer select-none transition-all ${
                        employmentType === et
                          ? "bg-[#0C1222] text-white border-[#0C1222]"
                          : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      {et}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Compensation Package
                </label>
                <div className="relative">
                  <select
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[13px] font-medium focus:bg-white focus:border-[#E7040D] focus:outline-none cursor-pointer"
                  >
                    {SALARY_RANGES.map((sr) => (
                      <option key={sr} value={sr}>{sr}</option>
                    ))}
                  </select>
                  <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* External Application Link */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                External Application URL <span className="text-[#E7040D]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                  <Globe size={16} weight="bold" />
                </span>
                <input
                  type="url"
                  required
                  inputMode="url"
                  value={applicationLink}
                  onChange={(e) => setApplicationLink(e.target.value)}
                  placeholder="https://jobs.lever.co/company/job-id or https://company.com/careers"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-mono placeholder:font-sans placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Media Dropzones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Company Brand Mark
                </label>
                <div className="border border-dashed border-zinc-300 p-3.5 bg-zinc-50/70 hover:border-zinc-400 transition-colors">
                  {logoPreview ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-10 h-10 relative bg-white border border-zinc-200 p-0.5 shrink-0">
                        <Image src={logoPreview} alt="Logo" fill className="object-contain" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-zinc-900 truncate">{logoFile?.name}</p>
                        <p className="text-[10.5px] text-zinc-500">{(logoFile!.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setLogoFile(null); setLogoPreview(null); }}
                        className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                      >
                        <X size={15} weight="bold" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center gap-3">
                      <div className="w-9 h-9 bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-500">
                        <UploadSimple size={18} weight="bold" />
                      </div>
                      <div className="text-left">
                        <span className="text-[12.5px] font-bold text-zinc-900 block">Upload Logo</span>
                        <span className="text-[11px] text-zinc-500">SVG, PNG or JPG</span>
                      </div>
                      <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Office / Culture Photo
                </label>
                <div className="border border-dashed border-zinc-300 p-3.5 bg-zinc-50/70 hover:border-zinc-400 transition-colors">
                  {coverPreview ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-14 h-10 relative bg-zinc-950 border border-zinc-200 overflow-hidden shrink-0">
                        <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-zinc-900 truncate">{coverFile?.name}</p>
                        <p className="text-[10.5px] text-zinc-500">{(coverFile!.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setCoverFile(null); setCoverPreview(null); }}
                        className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                      >
                        <X size={15} weight="bold" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center gap-3">
                      <div className="w-9 h-9 bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-500">
                        <UploadSimple size={18} weight="bold" />
                      </div>
                      <div className="text-left">
                        <span className="text-[12.5px] font-bold text-zinc-900 block">Cover Banner</span>
                        <span className="text-[11px] text-zinc-500">Workspace photo</span>
                      </div>
                      <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Description & Impact */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Role Summary & Engineering Impact
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will this person build, and how does the role impact your platform scale?"
                className="w-full px-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all leading-relaxed"
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Expected Stack & Qualifications
              </label>
              <textarea
                rows={2}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Key tech stack, libraries, and years of experience expected."
                className="w-full px-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all leading-relaxed"
              />
            </div>

            {/* Nav & Submit Buttons */}
            <div className="pt-4 border-t border-zinc-200/90 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[13px] font-bold transition-all cursor-pointer"
              >
                <ArrowLeft size={15} weight="bold" />
                <span>Back to Step 1</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all cursor-pointer select-none active:scale-95 disabled:opacity-50 shadow-xs"
              >
                {loading ? <span>Dispatching to Review...</span> : <span>Publish to Editorial Queue</span>}
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Right: Sticky Live Proof Card */}
      <div className="lg:col-span-5 sticky top-24 space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <Eye size={15} weight="bold" className="text-[#E7040D]" />
            Live Editorial Proof
          </span>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
            Real-Time Sync
          </span>
        </div>

        {/* Live Trax Job Card Replica */}
        <div className="bg-white border border-zinc-200/90 shadow-[0_16px_36px_-6px_rgba(15,16,18,0.06)] overflow-hidden transition-all">
          {/* Top Banner if uploaded */}
          {coverPreview && (
            <div className="w-full h-24 relative overflow-hidden bg-zinc-950">
              <Image src={coverPreview} alt="Banner" fill className="object-cover" />
            </div>
          )}

          <div className="p-6 space-y-5">
            {/* Logo & Company */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border border-zinc-200 flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
                  {logoPreview ? (
                    <Image src={logoPreview} alt="Logo" width={44} height={44} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full bg-[#E7040D]/10 flex items-center justify-center text-[#E7040D] font-black text-sm">
                      {companyName ? companyName.slice(0, 2).toUpperCase() : "TX"}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#1F1F1F] leading-none">
                    {companyName || "Your Company Name"}
                  </h4>
                  <p className="text-[12px] text-zinc-500 mt-1 flex items-center gap-1">
                    <MapPin size={13} weight="bold" className="text-zinc-400" />
                    <span>{location}</span>
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#fce8e0] text-[#E7040D]">
                {workplaceType}
              </span>
            </div>

            {/* Job Title */}
            <div>
              <h3 className="text-lg font-black text-[#1F1F1F] tracking-tight leading-snug">
                {jobTitle || "Job Position Title"}
              </h3>
              <p className="text-[13px] text-zinc-600 line-clamp-2 mt-1 leading-relaxed">
                {description || "A concise description of the engineering role, responsibilities, and team impact will appear here."}
              </p>
            </div>

            {/* Specification Badges */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100">
              <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 text-[11.5px] font-medium">
                {roleCategory}
              </span>
              <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 text-[11.5px] font-medium">
                {employmentType}
              </span>
              <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 text-[11.5px] font-medium">
                {experienceLevel.split(" ")[0]}
              </span>
            </div>

            {/* Compensation & External CTA Preview */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase font-bold block">Package</span>
                <span className="text-[13px] font-black text-[#1F1F1F]">{salaryRange}</span>
              </div>
              <div className="px-4 py-2 bg-[#0C1222] text-white text-[12px] font-bold select-none cursor-default opacity-90">
                Apply External &rarr;
              </div>
            </div>
          </div>
        </div>

        {/* Advisory Note */}
        <div className="p-3.5 bg-white border border-zinc-200 text-zinc-600 text-[12px] leading-relaxed">
          <p className="font-bold text-zinc-900 mb-0.5">Editorial Guarantee</p>
          Submissions with verified domains, transparent salary benchmarks, and high-resolution SVG marks receive priority publication.
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. TALENT SUBMISSION STUDIO (Split-Screen + Live Card Proof)
───────────────────────────────────────────────────────────── */
function TalentStudio() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState("whatsapp");
  const [category, setCategory] = useState(ROLE_CATEGORIES[0]);
  const [roleTitle, setRoleTitle] = useState("");
  const [experienceYears, setExperienceYears] = useState("3-5 years");
  const [location, setLocation] = useState(AFRICAN_LOCATIONS[0]);
  const [workPreference, setWorkPreference] = useState(WORKPLACE_TYPES[0]);
  const [highlightMetric, setHighlightMetric] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "TypeScript", "Next.js"]);
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [bio, setBio] = useState("");

  // Media
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkillInput.trim() && !selectedSkills.includes(customSkillInput.trim())) {
      setSelectedSkills([...selectedSkills, customSkillInput.trim()]);
      setCustomSkillInput("");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const validateStep1 = () => {
    if (!fullName.trim() || !email.trim() || !roleTitle.trim()) {
      setError("Please complete Full Name, Primary Email, and Professional Title to continue.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("whatsapp", whatsapp.trim());
      formData.append("preferredContactMethod", preferredContactMethod);
      formData.append("category", category);
      formData.append("roleTitle", roleTitle.trim());
      formData.append("experienceYears", experienceYears);
      formData.append("location", location);
      formData.append("workPreference", workPreference);
      formData.append("highlightMetric", highlightMetric.trim());
      formData.append("skills", selectedSkills.join(","));
      formData.append("portfolioUrl", portfolioUrl.trim());
      formData.append("githubUrl", githubUrl.trim());
      formData.append("linkedinUrl", linkedinUrl.trim());
      formData.append("bio", bio.trim());

      if (avatarFile) formData.append("avatar", avatarFile);
      if (coverFile) formData.append("coverImage", coverFile);

      const res = await fetch("/api/submit-profile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit talent profile");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SuccessState
        title="Talent Profile Submitted for Verification"
        email={email}
        onReset={() => {
          setSubmitted(false);
          setStep(1);
          setRoleTitle("");
          setBio("");
          setHighlightMetric("");
          setAvatarFile(null);
          setAvatarPreview(null);
          setCoverFile(null);
          setCoverPreview(null);
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Form */}
      <div className="lg:col-span-7 bg-white border border-zinc-200/90 shadow-[0_16px_36px_-6px_rgba(15,16,18,0.06)] p-6 sm:p-8">
        
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-200/90">
          <div className="flex items-center gap-3">
            <span className={`w-7 h-7 flex items-center justify-center text-[12px] font-black ${
              step === 1 ? "bg-[#E7040D] text-white" : "bg-zinc-100 text-zinc-900 border border-zinc-300"
            }`}>
              1
            </span>
            <div className="text-left">
              <p className="text-[13px] font-bold text-zinc-900 leading-none">Identity & Role</p>
              <p className="text-[11.5px] text-zinc-500 mt-1">Profile bio & contact</p>
            </div>
          </div>

          <div className="h-px w-12 bg-zinc-200 hidden sm:block" />

          <div className="flex items-center gap-3">
            <span className={`w-7 h-7 flex items-center justify-center text-[12px] font-black ${
              step === 2 ? "bg-[#E7040D] text-white" : "bg-zinc-100 text-zinc-500 border border-zinc-300"
            }`}>
              2
            </span>
            <div className="text-left">
              <p className={`text-[13px] font-bold leading-none ${step === 2 ? "text-zinc-900" : "text-zinc-500"}`}>
                Skills & Verification
              </p>
              <p className="text-[11.5px] text-zinc-500 mt-1">Metrics, stack & links</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3.5 mb-6 bg-red-50 border border-red-200 text-red-700 text-[13px] font-medium flex items-center gap-2">
            <WarningCircle size={18} weight="fill" className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Professional Identity */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Full Legal / Professional Name <span className="text-[#E7040D]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                    <User size={16} weight="bold" />
                  </span>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-semibold placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Primary Email <span className="text-[#E7040D]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                    <EnvelopeSimple size={16} weight="bold" />
                  </span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@gmail.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-medium placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Role Title */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Headline / Professional Title <span className="text-[#E7040D]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                  <Briefcase size={16} weight="bold" />
                </span>
                <input
                  type="text"
                  required
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g. Staff Distributed Systems Engineer"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-semibold placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Direct WhatsApp & Preferred Channel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Direct WhatsApp Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                    <WhatsappLogo size={16} weight="bold" />
                  </span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-medium placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Preferred Contact Route
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredContactMethod("whatsapp")}
                    className={`px-3 py-2 text-[12.5px] font-bold border cursor-pointer select-none transition-all ${
                      preferredContactMethod === "whatsapp"
                        ? "bg-[#0C1222] text-white border-[#0C1222]"
                        : "bg-zinc-50 text-zinc-700 border-zinc-200"
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredContactMethod("email")}
                    className={`px-3 py-2 text-[12.5px] font-bold border cursor-pointer select-none transition-all ${
                      preferredContactMethod === "email"
                        ? "bg-[#0C1222] text-white border-[#0C1222]"
                        : "bg-zinc-50 text-zinc-700 border-zinc-200"
                    }`}
                  >
                    Email
                  </button>
                </div>
              </div>
            </div>

            {/* Category & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Specialty Track
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[13px] font-medium focus:bg-white focus:border-[#E7040D] focus:outline-none cursor-pointer"
                  >
                    {ROLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Current Location
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[13px] font-medium focus:bg-white focus:border-[#E7040D] focus:outline-none cursor-pointer"
                  >
                    {AFRICAN_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Next Step */}
            <div className="pt-4 border-t border-zinc-200/90 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all cursor-pointer select-none active:scale-95 shadow-xs"
              >
                <span>Continue to Step 2: Stack & Proof</span>
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Stack, Metrics & Assets */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Highlight Metric & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Highlight Impact Metric
                </label>
                <input
                  type="text"
                  value={highlightMetric}
                  onChange={(e) => setHighlightMetric(e.target.value)}
                  placeholder="e.g. Scaled API to 40M req/day or +42% signups"
                  className="w-full px-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[13px] font-medium placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Total Experience
                </label>
                <div className="relative">
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[13px] font-medium focus:bg-white focus:border-[#E7040D] focus:outline-none cursor-pointer"
                  >
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-8 years">5-8 years</option>
                    <option value="8+ years">8+ years</option>
                  </select>
                  <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Interactive Skills Chip Selector */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Core Stack & Technologies ({selectedSkills.length} selected)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {COMMON_SKILLS_POPULAR.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-2.5 py-1 text-[12px] font-bold transition-all border cursor-pointer select-none flex items-center gap-1 ${
                        isSelected
                          ? "bg-[#0C1222] text-white border-[#0C1222]"
                          : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      {isSelected && <Check size={12} weight="bold" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Skill */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomSkill();
                    }
                  }}
                  placeholder="Type other technology and click add..."
                  className="flex-1 px-3 py-1.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[12.5px] focus:bg-white focus:border-[#E7040D] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addCustomSkill}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[12px] font-bold cursor-pointer border border-zinc-300 flex items-center gap-1"
                >
                  <Plus size={14} weight="bold" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* External Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Portfolio / Blog
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[12.5px] focus:bg-white focus:border-[#E7040D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">
                  GitHub
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[12.5px] focus:bg-white focus:border-[#E7040D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[12.5px] focus:bg-white focus:border-[#E7040D] focus:outline-none"
                />
              </div>
            </div>

            {/* Media Dropzones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Headshot Portrait
                </label>
                <div className="border border-dashed border-zinc-300 p-3.5 bg-zinc-50/70 hover:border-zinc-400 transition-colors">
                  {avatarPreview ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-10 h-10 relative bg-zinc-900 border border-zinc-200 overflow-hidden shrink-0">
                        <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-zinc-900 truncate">{avatarFile?.name}</p>
                        <p className="text-[10.5px] text-zinc-500">{(avatarFile!.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setAvatarFile(null); setAvatarPreview(null); }}
                        className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                      >
                        <X size={15} weight="bold" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center gap-3">
                      <div className="w-9 h-9 bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-500">
                        <UploadSimple size={18} weight="bold" />
                      </div>
                      <div className="text-left">
                        <span className="text-[12.5px] font-bold text-zinc-900 block">Upload Portrait</span>
                        <span className="text-[11px] text-zinc-500">Professional photo</span>
                      </div>
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Cover Photo
                </label>
                <div className="border border-dashed border-zinc-300 p-3.5 bg-zinc-50/70 hover:border-zinc-400 transition-colors">
                  {coverPreview ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-14 h-10 relative bg-zinc-950 border border-zinc-200 overflow-hidden shrink-0">
                        <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-zinc-900 truncate">{coverFile?.name}</p>
                        <p className="text-[10.5px] text-zinc-500">{(coverFile!.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setCoverFile(null); setCoverPreview(null); }}
                        className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                      >
                        <X size={15} weight="bold" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center gap-3">
                      <div className="w-9 h-9 bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-500">
                        <UploadSimple size={18} weight="bold" />
                      </div>
                      <div className="text-left">
                        <span className="text-[12.5px] font-bold text-zinc-900 block">Cover Banner</span>
                        <span className="text-[11px] text-zinc-500">Minimal horizontal image</span>
                      </div>
                      <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Editorial Bio */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Executive Bio / Experience Overview
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="2-3 sentences summarizing your specialty, scale of projects shipped, and current availability."
                className="w-full px-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all leading-relaxed"
              />
            </div>

            {/* Nav & Submit Buttons */}
            <div className="pt-4 border-t border-zinc-200/90 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[13px] font-bold transition-all cursor-pointer"
              >
                <ArrowLeft size={15} weight="bold" />
                <span>Back to Step 1</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all cursor-pointer select-none active:scale-95 disabled:opacity-50 shadow-xs"
              >
                {loading ? <span>Submitting Profile...</span> : <span>Send Profile for Verification</span>}
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Right: Sticky Live Proof Card */}
      <div className="lg:col-span-5 sticky top-24 space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <Eye size={15} weight="bold" className="text-[#E7040D]" />
            Live Talent Profile Proof
          </span>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
            Real-Time Sync
          </span>
        </div>

        {/* Live Trax Talent Card Replica */}
        <div className="bg-white border border-zinc-200/90 shadow-[0_16px_36px_-6px_rgba(15,16,18,0.06)] overflow-hidden transition-all">
          {coverPreview && (
            <div className="w-full h-24 relative overflow-hidden bg-zinc-950">
              <Image src={coverPreview} alt="Banner" fill className="object-cover" />
            </div>
          )}

          <div className="p-6 space-y-5">
            {/* Avatar & Header */}
            <div className="flex items-start gap-3.5">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs relative">
                {avatarPreview ? (
                  <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#0C1222] text-white flex items-center justify-center font-black text-base">
                    {fullName ? fullName.slice(0, 2).toUpperCase() : "TP"}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[15px] font-black text-[#1F1F1F] leading-none truncate">
                    {fullName || "Candidate Full Name"}
                  </h4>
                  <SealCheck size={16} weight="fill" className="text-[#E7040D] shrink-0" />
                </div>
                <p className="text-[13px] font-semibold text-zinc-700 mt-1 truncate">
                  {roleTitle || "Senior Software Engineer"}
                </p>
                <p className="text-[11.5px] text-zinc-500 mt-0.5 flex items-center gap-1">
                  <MapPin size={12} weight="bold" className="text-zinc-400" />
                  <span>{location}</span>
                </p>
              </div>
            </div>

            {/* Impact Metric callout */}
            {highlightMetric ? (
              <div className="p-2.5 bg-[#FAF8F5] border-l-2 border-[#E7040D] text-[12.5px] font-bold text-zinc-900">
                {highlightMetric}
              </div>
            ) : (
              <div className="p-2.5 bg-zinc-50 text-[12px] text-zinc-500 italic">
                Highlight metric appears here (e.g. +34% conversion rate)
              </div>
            )}

            {/* Bio */}
            <p className="text-[13px] text-zinc-600 line-clamp-2 leading-relaxed">
              {bio || "Professional summary highlighting engineering background, past startup impact, and architectural specialties."}
            </p>

            {/* Selected Skills Chips */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100">
              {selectedSkills.slice(0, 5).map((skill) => (
                <span key={skill} className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-[11px] font-bold">
                  {skill}
                </span>
              ))}
              {selectedSkills.length > 5 && (
                <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-[11px] font-bold">
                  +{selectedSkills.length - 5} more
                </span>
              )}
            </div>

            {/* Contact Method CTA */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[12px] font-bold text-zinc-600 flex items-center gap-1">
                <Clock size={14} weight="bold" />
                <span>{experienceYears}</span>
              </span>
              <div className="px-4 py-2 bg-[#E7040D] text-white text-[12px] font-bold select-none cursor-default">
                Hire via {preferredContactMethod === "whatsapp" ? "WhatsApp" : "Email"} &rarr;
              </div>
            </div>
          </div>
        </div>

        {/* Advisory Note */}
        <div className="p-3.5 bg-white border border-zinc-200 text-zinc-600 text-[12px] leading-relaxed">
          <p className="font-bold text-zinc-900 mb-0.5">Vetting Standards</p>
          Talent submissions undergo portfolio and experience verification before gaining public status in the Trax Talent Directory.
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. COMPANY REGISTRATION STUDIO (Split-Screen + Live Card Proof)
───────────────────────────────────────────────────────────── */
function CompanyStudio() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [industry, setIndustry] = useState(COMPANY_SECTORS[0]);
  const [headquarters, setHeadquarters] = useState(AFRICAN_LOCATIONS[0]);
  const [employeesCount, setEmployeesCount] = useState(COMPANY_SIZES[1]);
  const [description, setDescription] = useState("");

  // Media
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const validateStep1 = () => {
    if (!name.trim() || !contactEmail.trim()) {
      setError("Please complete Company Name and Contact Email to continue.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("website", website.trim());
      formData.append("contactEmail", contactEmail.trim());
      formData.append("industry", industry);
      formData.append("headquarters", headquarters);
      formData.append("employeesCount", employeesCount);
      formData.append("description", description.trim());

      if (logoFile) formData.append("logo", logoFile);
      if (coverFile) formData.append("coverImage", coverFile);

      const res = await fetch("/api/submit-company", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to register company");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SuccessState
        title="Company Profile Submitted for Review"
        email={contactEmail}
        onReset={() => {
          setSubmitted(false);
          setStep(1);
          setName("");
          setWebsite("");
          setDescription("");
          setLogoFile(null);
          setLogoPreview(null);
          setCoverFile(null);
          setCoverPreview(null);
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Form */}
      <div className="lg:col-span-7 bg-white border border-zinc-200/90 shadow-[0_16px_36px_-6px_rgba(15,16,18,0.06)] p-6 sm:p-8">
        
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-200/90">
          <div className="flex items-center gap-3">
            <span className={`w-7 h-7 flex items-center justify-center text-[12px] font-black ${
              step === 1 ? "bg-[#E7040D] text-white" : "bg-zinc-100 text-zinc-900 border border-zinc-300"
            }`}>
              1
            </span>
            <div className="text-left">
              <p className="text-[13px] font-bold text-zinc-900 leading-none">Entity Information</p>
              <p className="text-[11.5px] text-zinc-500 mt-1">Company brand & contacts</p>
            </div>
          </div>

          <div className="h-px w-12 bg-zinc-200 hidden sm:block" />

          <div className="flex items-center gap-3">
            <span className={`w-7 h-7 flex items-center justify-center text-[12px] font-black ${
              step === 2 ? "bg-[#E7040D] text-white" : "bg-zinc-100 text-zinc-500 border border-zinc-300"
            }`}>
              2
            </span>
            <div className="text-left">
              <p className={`text-[13px] font-bold leading-none ${step === 2 ? "text-zinc-900" : "text-zinc-500"}`}>
                Culture & Branding
              </p>
              <p className="text-[11.5px] text-zinc-500 mt-1">HQ, assets & narrative</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3.5 mb-6 bg-red-50 border border-red-200 text-red-700 text-[13px] font-medium flex items-center gap-2">
            <WarningCircle size={18} weight="fill" className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Entity Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Company Name <span className="text-[#E7040D]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                    <Buildings size={16} weight="bold" />
                  </span>
                  <input
                    type="text"
                    required
                    autoComplete="organization"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Flutterwave, Kuda"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-semibold placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Company Work Email <span className="text-[#E7040D]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                    <EnvelopeSimple size={16} weight="bold" />
                  </span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="talent@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-medium placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Official Website */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Official Website
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
                  <Globe size={16} weight="bold" />
                </span>
                <input
                  type="url"
                  inputMode="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] font-medium placeholder:text-zinc-400 focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Industry Sector Chips */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Sector / Vertical
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {COMPANY_SECTORS.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setIndustry(sec)}
                    className={`px-3 py-2 text-[12px] font-bold text-left border cursor-pointer select-none transition-all truncate ${
                      industry === sec
                        ? "bg-[#0C1222] text-white border-[#0C1222]"
                        : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Step */}
            <div className="pt-4 border-t border-zinc-200/90 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all cursor-pointer select-none active:scale-95 shadow-xs"
              >
                <span>Continue to Step 2: Branding & Proof</span>
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Culture, Media & Review */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Primary Headquarters
                </label>
                <div className="relative">
                  <select
                    value={headquarters}
                    onChange={(e) => setHeadquarters(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[13px] font-medium focus:bg-white focus:border-[#E7040D] focus:outline-none cursor-pointer"
                  >
                    {AFRICAN_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Headcount Tier
                </label>
                <div className="relative">
                  <select
                    value={employeesCount}
                    onChange={(e) => setEmployeesCount(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[13px] font-medium focus:bg-white focus:border-[#E7040D] focus:outline-none cursor-pointer"
                  >
                    {COMPANY_SIZES.map((sz) => (
                      <option key={sz} value={sz}>{sz}</option>
                    ))}
                  </select>
                  <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Media Dropzones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Vector / Brand Logo
                </label>
                <div className="border border-dashed border-zinc-300 p-3.5 bg-zinc-50/70 hover:border-zinc-400 transition-colors">
                  {logoPreview ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-10 h-10 relative bg-white border border-zinc-200 p-0.5 shrink-0">
                        <Image src={logoPreview} alt="Logo" fill className="object-contain" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-zinc-900 truncate">{logoFile?.name}</p>
                        <p className="text-[10.5px] text-zinc-500">{(logoFile!.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setLogoFile(null); setLogoPreview(null); }}
                        className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                      >
                        <X size={15} weight="bold" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center gap-3">
                      <div className="w-9 h-9 bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-500">
                        <UploadSimple size={18} weight="bold" />
                      </div>
                      <div className="text-left">
                        <span className="text-[12.5px] font-bold text-zinc-900 block">Upload Logo</span>
                        <span className="text-[11px] text-zinc-500">SVG or transparent PNG</span>
                      </div>
                      <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Workspace Banner
                </label>
                <div className="border border-dashed border-zinc-300 p-3.5 bg-zinc-50/70 hover:border-zinc-400 transition-colors">
                  {coverPreview ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-14 h-10 relative bg-zinc-950 border border-zinc-200 overflow-hidden shrink-0">
                        <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-zinc-900 truncate">{coverFile?.name}</p>
                        <p className="text-[10.5px] text-zinc-500">{(coverFile!.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setCoverFile(null); setCoverPreview(null); }}
                        className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                      >
                        <X size={15} weight="bold" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center gap-3">
                      <div className="w-9 h-9 bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-500">
                        <UploadSimple size={18} weight="bold" />
                      </div>
                      <div className="text-left">
                        <span className="text-[12.5px] font-bold text-zinc-900 block">Cover Banner</span>
                        <span className="text-[11px] text-zinc-500">HQ or team culture photo</span>
                      </div>
                      <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Description Narrative */}
            <div>
              <label className="block text-[12px] font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                Engineering Culture & Vision
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what your organization builds and the engineering standards of your team."
                className="w-full px-3.5 py-2.5 bg-zinc-50/80 border border-zinc-300 text-zinc-900 text-[16px] sm:text-[13.5px] focus:bg-white focus:border-[#E7040D] focus:outline-none transition-all leading-relaxed"
              />
            </div>

            {/* Nav & Submit Buttons */}
            <div className="pt-4 border-t border-zinc-200/90 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[13px] font-bold transition-all cursor-pointer"
              >
                <ArrowLeft size={15} weight="bold" />
                <span>Back to Step 1</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#E7040D] hover:bg-[#CB030B] text-white text-[13.5px] font-bold transition-all cursor-pointer select-none active:scale-95 disabled:opacity-50 shadow-xs"
              >
                {loading ? <span>Registering Entity...</span> : <span>Register Company for Review</span>}
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Right: Sticky Live Proof Card */}
      <div className="lg:col-span-5 sticky top-24 space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <Eye size={15} weight="bold" className="text-[#E7040D]" />
            Live Company Showcase Proof
          </span>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
            Real-Time Sync
          </span>
        </div>

        {/* Live Trax Company Card Replica */}
        <div className="bg-white border border-zinc-200/90 shadow-[0_16px_36px_-6px_rgba(15,16,18,0.06)] overflow-hidden transition-all">
          {coverPreview && (
            <div className="w-full h-24 relative overflow-hidden bg-zinc-950">
              <Image src={coverPreview} alt="Banner" fill className="object-cover" />
            </div>
          )}

          <div className="p-6 space-y-5">
            {/* Logo & Header */}
            <div className="flex items-start gap-3.5">
              <div className="w-14 h-14 bg-white border border-zinc-200 flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
                {logoPreview ? (
                  <Image src={logoPreview} alt="Logo" width={48} height={48} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-[#E7040D]/10 flex items-center justify-center text-[#E7040D] font-black text-sm">
                    {name ? name.slice(0, 2).toUpperCase() : "CO"}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[16px] font-black text-[#1F1F1F] leading-none truncate">
                    {name || "Company Name"}
                  </h4>
                  <SealCheck size={16} weight="fill" className="text-[#E7040D] shrink-0" />
                </div>
                <p className="text-[12px] text-zinc-500 mt-1 flex items-center gap-1">
                  <MapPin size={12} weight="bold" className="text-zinc-400" />
                  <span>{headquarters}</span>
                </p>
                {website && (
                  <p className="text-[11.5px] text-[#E7040D] font-medium mt-0.5 truncate flex items-center gap-1">
                    <Globe size={12} weight="bold" />
                    <span>{website.replace(/^https?:\/\//, "")}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-[13px] text-zinc-600 line-clamp-3 leading-relaxed">
              {description || "Company overview and engineering mission will appear here in the verified African corporate directory."}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100">
              <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 text-[11.5px] font-bold">
                {industry}
              </span>
              <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 text-[11.5px] font-medium">
                {employeesCount.split(" ")[0]}
              </span>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                Active Verification Queue
              </span>
              <div className="px-4 py-2 bg-[#0C1222] text-white text-[12px] font-bold select-none cursor-default">
                View Profile &rarr;
              </div>
            </div>
          </div>
        </div>

        {/* Advisory Note */}
        <div className="p-3.5 bg-white border border-zinc-200 text-zinc-600 text-[12px] leading-relaxed">
          <p className="font-bold text-zinc-900 mb-0.5">Corporate Verification</p>
          Registered companies receive an official Trax Verified badge and direct candidate inquiry handling.
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Shared Success Confirmation Component
───────────────────────────────────────────────────────────── */
function SuccessState({ title, email, onReset }: { title: string; email: string; onReset: () => void }) {
  return (
    <div className="py-12 px-4 text-center max-w-lg mx-auto space-y-5 bg-white border border-zinc-200/90 shadow-[0_16px_36px_-6px_rgba(15,16,18,0.06)] p-8">
      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-none flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
        <CheckCircle size={36} weight="fill" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-[#1F1F1F] tracking-tight">{title}</h3>
        <p className="text-[14px] text-zinc-600 leading-[1.7]">
          Thank you for publishing with Trax Jobs. Your submission has been securely ingested into our editorial database.
          A confirmation was sent to <strong className="text-zinc-900">{email}</strong>.
        </p>
      </div>
      <div className="p-3 bg-[#fce8e0] text-[#E7040D] text-[12.5px] font-bold text-center">
        Editorial Review SLA: Under 24 Hours
      </div>
      <div className="pt-3 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-900 text-[13px] font-bold transition-all cursor-pointer"
        >
          Submit Another Entry
        </button>
        <Link
          href="/jobs"
          className="px-5 py-2.5 bg-[#0C1222] hover:bg-zinc-800 text-white text-[13px] font-bold transition-all"
        >
          Browse Verified Jobs
        </Link>
      </div>
    </div>
  );
}
