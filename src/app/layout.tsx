import type { Metadata, Viewport } from "next";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { NetworkStatusBanner } from "@/components/network-status";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jobs.trax.ng";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0C1222",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trax Jobs: Curated Tech Opportunities in Africa",
    template: "%s | Trax Jobs",
  },
  description:
    "Curated tech opportunities and elite talent from Ogun State and across Africa. Verified listings, direct hiring, and transparent compensation.",
  keywords: [
    "Tech Jobs Africa",
    "Nigeria Engineering Jobs",
    "Ogun State Tech",
    "Remote Developer Jobs",
    "Hire African Talent",
    "Trax Media",
    "Fintech Jobs Lagos",
  ],
  authors: [{ name: "Trax Media", url: siteUrl }],
  creator: "Trax Media",
  publisher: "Trax Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Trax Jobs",
    title: "Trax Jobs: Curated Tech Opportunities in Africa",
    description:
      "Curated tech opportunities and elite talent from Ogun State and across Africa. Verified listings, direct hiring, and transparent compensation.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Trax Jobs: Curated African Tech Opportunities & Verified Talent Network",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trax Jobs: Curated Tech Opportunities in Africa",
    description:
      "Curated tech opportunities and elite talent from Ogun State and across Africa.",
    creator: "@trax_newsng",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Trax Jobs: Curated African Tech Opportunities & Verified Talent Network",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "NG-OG",
    "geo.placename": "Abeokuta, Ogun State, Nigeria",
    "geo.position": "7.1475;3.3619",
    "ICBM": "7.1475, 3.3619",
    "DC.title": "Trax Jobs: Curated African Tech Opportunities & Verified Talent Network",
    "DC.creator": "Trax Media",
    "DC.description": "Curated tech opportunities and elite talent from Ogun State and across Africa. Verified listings, direct hiring, and transparent compensation.",
    "DC.publisher": "Trax Media",
    "DC.coverage": "Africa, Nigeria, Ogun State, Lagos",
    "ai-content-declaration": "curated-human-verified",
  },
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Trax Jobs",
      description: "Curated tech opportunities and elite talent from Ogun State and across Africa.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/jobs?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Trax Jobs",
      alternateName: ["Trax Media Jobs", "Trax Jobs Africa"],
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/apple-icon.png`,
        width: "180",
        height: "180",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "Trax Media",
        url: "https://trax.ng",
      },
      sameAs: [
        "https://trax.ng",
        "https://x.com/trax_newsng",
        "https://www.linkedin.com/in/traxnewsng",
        "https://www.instagram.com/trax_newsng",
        "https://www.facebook.com/profile.php?id=61593926825413",
        "https://youtube.com/@trax_newsng",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support & Partnerships",
        email: "contact@trax.ng",
        areaServed: "Africa",
        availableLanguage: ["en"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abeokuta",
        addressRegion: "Ogun State",
        addressCountry: "NG",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body>
        <NetworkStatusBanner />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
