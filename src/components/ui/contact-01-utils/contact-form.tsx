"use client";

import { useState } from "react";
import { CheckCircle, CaretDown, WhatsappLogo } from "@phosphor-icons/react";

interface ContactFormProps {
  initialTopic?: string | null;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbgjbpba";

export default function ContactForm({ initialTopic }: ContactFormProps) {
  const getInitialInquiry = (topic?: string | null) => {
    if (topic === "job" || topic === "hiring") return "Hiring / Post a Job";
    if (topic === "profile" || topic === "talent") return "Submit Talent Profile";
    if (topic === "company" || topic === "companies") return "Submit Company Profile";
    return "";
  };

  const getSubject = (type: string, name: string) => {
    switch (type) {
      case "Hiring / Post a Job":
        return `[Trax Jobs] New Job Submission: Hiring / Post a Job - from ${name}`;
      case "Submit Talent Profile":
        return `[Trax Jobs] New Talent Profile Submission - from ${name}`;
      case "Submit Company Profile":
        return `[Trax Jobs] New Company Profile Submission - from ${name}`;
      case "Media & Partnerships":
        return `[Trax Jobs] Media & Partnerships Inquiry - from ${name}`;
      case "General Inquiry":
        return `[Trax Jobs] General Contact Inquiry - from ${name}`;
      default:
        return `[Trax Jobs] New Inquiry: ${type || "General"} - from ${name}`;
    }
  };

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inquiryType, setInquiryType] = useState(() => getInitialInquiry(initialTopic));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!agreed) {
      setErrorMessage("Please acknowledge the Terms and Conditions before submitting.");
      return;
    }

    if (!inquiryType) {
      setErrorMessage("Please select an inquiry type.");
      return;
    }

    setIsSubmitting(true);

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      const subject = getSubject(inquiryType, fullName);

      const payload = {
        _subject: subject,
        name: fullName,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        _replyto: email.trim(),
        inquiryType,
        country,
        message: message.trim(),
        submittedAt: new Date().toISOString(),
        source: "Trax Jobs Contact Page (/about?tab=contact)",
      };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        const err = data?.errors?.[0]?.message || data?.error || "We encountered an issue submitting your inquiry. Please try again or reach out on WhatsApp.";
        setErrorMessage(err);
      }
    } catch (err) {
      console.error("Formspree submission error:", err);
      setErrorMessage("Network connection error. Please try again or reach out directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-zinc-200/90 rounded-none p-5 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle size={48} weight="fill" className="text-[#E7040D] mx-auto" />
          <h3 className="text-2xl font-black text-[#1F1F1F] tracking-tight">
            Inquiry Received
          </h3>
          <p className="text-[14px] text-zinc-600 max-w-sm mx-auto leading-relaxed">
            Thank you, <span className="font-bold text-zinc-900">{firstName} {lastName}</span>. An editor from our desk will review your submission and follow up at <span className="font-bold text-zinc-900">{email}</span> within 24 business hours.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setErrorMessage(null);
                setIsSubmitting(false);
                setInquiryType("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setCountry("");
                setMessage("");
                setAgreed(false);
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#1F1F1F] hover:bg-[#E7040D] text-white text-xs font-bold transition-all rounded-none cursor-pointer"
            >
              Send Another Inquiry
            </button>
            <a
              href="https://wa.me/2347045422815"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all rounded-none flex items-center justify-center gap-1.5"
            >
              <WhatsappLogo size={16} weight="fill" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-5 space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F1F1F] tracking-tight">
              Start the conversation
            </h2>
            {(initialTopic === "job" || initialTopic === "hiring") && (
              <div className="p-3 bg-[#fdf2ee] border-l-2 border-[#E7040D] text-[13px] text-zinc-700 leading-relaxed">
                <span className="font-semibold text-zinc-950">Submitting a Job:</span> You are connecting with the Trax Editorial Desk. Share your company name, role title, and contact details below. Our team will request the complete brief and manage publication.
              </div>
            )}
            {(initialTopic === "profile" || initialTopic === "talent") && (
              <div className="p-3 bg-[#fdf2ee] border-l-2 border-[#E7040D] text-[13px] text-zinc-700 leading-relaxed">
                <span className="font-semibold text-zinc-950">Submitting a Profile:</span> You are connecting with the Trax Talent Desk. Share your specialty, key metrics, and portfolio links below for editorial review.
              </div>
            )}
            {(initialTopic === "company" || initialTopic === "companies") && (
              <div className="p-3 bg-[#fdf2ee] border-l-2 border-[#E7040D] text-[13px] text-zinc-700 leading-relaxed">
                <span className="font-semibold text-zinc-950">Submitting a Company Profile:</span> You are connecting with the Trax Editorial Desk. Share your company details, tech stack, and hiring focus below for editorial review.
              </div>
            )}
          </div>

          {/* Row 1: First name & Last name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-none text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-400 transition-colors"
              />
            </div>
            <div>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-none text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-400 transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@website.com"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-none text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-400 transition-colors"
            />
          </div>

          {/* Row 3: Inquiry Type Dropdown */}
          <div className="relative">
            <select
              required
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-none text-[14px] text-zinc-800 focus:outline-hidden focus:border-zinc-400 transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>Inquiry Type (Hiring, Talent Profile, Company Profile)</option>
              <option value="Hiring / Post a Job">Hiring / Post a Job</option>
              <option value="Submit Talent Profile">Submit Talent Profile</option>
              <option value="Submit Company Profile">Submit Company Profile</option>
              <option value="Media & Partnerships">Media & Partnerships</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
            <CaretDown size={14} weight="bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {/* Row 4: Country dropdown */}
          <div className="relative">
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-none text-[14px] text-zinc-800 focus:outline-hidden focus:border-zinc-400 transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>Country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Kenya">Kenya</option>
              <option value="Ghana">Ghana</option>
              <option value="Rwanda">Rwanda</option>
              <option value="South Africa">South Africa</option>
              <option value="Egypt">Egypt</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Other">Other Country</option>
            </select>
            <CaretDown size={14} weight="bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {/* Row 5: Message */}
          <div>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Let us know about your project, role, or inquiry"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-none text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-400 transition-colors resize-none"
            />
          </div>

          {/* Row 6: Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded-none border-zinc-300 text-[#E7040D] accent-[#E7040D] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="terms" className="text-[13px] text-zinc-600 cursor-pointer select-none">
              I have read and acknowledge the Terms and Conditions
            </label>
          </div>

          {/* Error Message Banner */}
          {errorMessage && (
            <div className="p-3 bg-[#fdf2ee] border-l-2 border-[#E7040D] text-[13px] text-[#E7040D] font-medium leading-relaxed">
              {errorMessage}
            </div>
          )}

          {/* Row 7: Action Buttons (Submit Inquiry & WhatsApp Option) */}
          <div className="pt-2 space-y-3">
            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-none bg-[#E7040D] hover:bg-[#CB030B] active:bg-[#A80209] disabled:opacity-70 disabled:cursor-not-allowed text-white text-[15px] font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 select-none"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  <span>Sending Inquiry...</span>
                </>
              ) : (
                <span>Submit Inquiry</span>
              )}
            </button>

            {/* WhatsApp Option Button */}
            <a
              href="https://wa.me/2347045422815?text=Hello%20Trax%20Jobs%20Desk%2C%20I%20would%20like%20to%20make%20an%20inquiry"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-6 rounded-none bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white text-[15px] font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <WhatsappLogo size={20} weight="fill" />
              <span>Chat directly on WhatsApp</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
