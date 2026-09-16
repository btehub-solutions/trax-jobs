import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Trax Jobs: Curated African Tech Ecosystem",
  description:
    "Learn about Trax Jobs, our human-curated vetting standard, editorial standards, and our mission to connect African tech talent to authentic opportunities.",
  openGraph: {
    title: "About Trax Jobs: Curated African Tech Ecosystem",
    description:
      "Learn about Trax Jobs, our human-curated vetting standard, editorial standards, and our mission to connect African tech talent to authentic opportunities.",
    url: "https://jobs.trax.ng/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Trax Jobs: Curated African Tech Ecosystem",
    description:
      "Learn about Trax Jobs, our human-curated vetting standard, and our mission across African tech.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
