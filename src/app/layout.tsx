import type { Metadata, Viewport } from "next";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
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
    creator: "@traxmedia",
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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
