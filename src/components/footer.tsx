"use client";

import Image from "next/image";
import Link from "next/link";
import {
  XLogo,
  LinkedinLogo,
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";

interface FooterLinkItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLinkItem[];
}

const companyName = "Trax Jobs";

const footerLinks: FooterSection[] = [
  {
    title: "Find a Role",
    links: [
      { name: "Explore open jobs", href: "/jobs" },
      { name: "Browse curated companies", href: "/companies" },
      { name: "Submit your profile", href: "/about?tab=post-and-submit&type=talent" },
      { name: "Learning Hub", href: "/learning" },
      { name: "Career Guides", href: "/guides" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { name: "Explore talent directory", href: "/talent" },
      { name: "Post an open job", href: "/about?tab=post-and-submit&type=job" },
      { name: "Register company", href: "/about?tab=post-and-submit&type=company" },
      { name: "Contact editorial desk", href: "/about?tab=contact&topic=hiring" },
    ],
  },
  {
    title: "Company & Media",
    links: [
      { name: "About Trax Jobs", href: "/about" },
      { name: "Contact us", href: "/about?tab=contact" },
      { name: "Editorial Standards", href: "/about#editorial-standards" },
      { name: "Trax News (trax.ng)", href: "https://trax.ng", isExternal: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#0C1222] relative overflow-hidden antialiased [font-synthesis:none] select-none">
      {/* Trax Brand Navy Panel Content */}
      <div className="relative w-full z-10 min-h-[380px]">
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">

          {/* Left Side */}
          <div className="flex flex-col justify-between max-w-sm w-full">
            <div className="flex flex-col">
              {/* Official Trax Logo */}
              <Link href="/" className="inline-block mb-3.5 group">
                <Image
                  src="/images/trax-logo.png"
                  alt="Trax Jobs"
                  width={120}
                  height={34}
                  className="h-7 sm:h-8 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <h2 className="text-white text-xl md:text-[22px] font-medium leading-tight">
                Curated African Tech Opportunities<br />& Verified Talent Network
              </h2>
              <p className="text-white/70 text-xs md:text-[13px] leading-relaxed mt-3">
                Rooted in Ogun State, covering the wider African technology ecosystem. Every role and profile is verified manually by Trax Media.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-12 lg:mt-auto pt-8">
              {/* Clean Minimalist Social Icons Row (Expanded & Scaled for Mobile Viewports) */}
              <div className="flex items-center justify-between sm:justify-start sm:gap-5 w-full max-w-[320px] sm:max-w-none text-white/80">
                <a
                  href="https://x.com/trax_newsng"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 sm:p-0 hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Trax on X"
                >
                  <XLogo size={24} className="w-6 h-6 sm:w-[18px] sm:h-[18px]" weight="bold" />
                </a>
                <a
                  href="https://www.linkedin.com/in/traxnewsng?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 sm:p-0 hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Trax on LinkedIn"
                >
                  <LinkedinLogo size={24} className="w-6 h-6 sm:w-[18px] sm:h-[18px]" weight="fill" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61593926825413"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 sm:p-0 hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Trax on Facebook"
                >
                  <FacebookLogo size={24} className="w-6 h-6 sm:w-[18px] sm:h-[18px]" weight="fill" />
                </a>
                <a
                  href="https://www.instagram.com/trax_newsng?stkn=am9pMm92MXJpbnVh"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 sm:p-0 hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Trax on Instagram"
                >
                  <InstagramLogo size={24} className="w-6 h-6 sm:w-[18px] sm:h-[18px]" weight="bold" />
                </a>
                <a
                  href="https://youtube.com/@trax_newsng?si=tQabHiza3kXgrhgV"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 sm:p-0 hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Trax on YouTube"
                >
                  <YoutubeLogo size={24} className="w-6 h-6 sm:w-[18px] sm:h-[18px]" weight="fill" />
                </a>
                <a
                  href="https://wa.me/2347045422815?text=Hello%20Trax%20Jobs%20Desk"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 sm:p-0 hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Chat with Trax on WhatsApp"
                >
                  <WhatsappLogo size={24} className="w-6 h-6 sm:w-[18px] sm:h-[18px]" weight="fill" />
                </a>
              </div>

              <p className="font-light text-white/80 text-xs md:text-[13px] mt-1">
                &copy; 2026 {companyName}, All rights reserved
              </p>
            </div>
          </div>

          {/* Right Side - Links */}
          <div className="flex gap-12 md:gap-24 flex-wrap lg:flex-nowrap">
            {footerLinks.map((section) => (
              <div key={section.title} className="flex flex-col gap-5">
                <h3 className="text-white font-semibold text-lg md:text-xl">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3 md:gap-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/70 hover:text-white transition-colors text-sm md:text-[15px] font-medium"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-white transition-colors text-sm md:text-[15px] font-medium"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
