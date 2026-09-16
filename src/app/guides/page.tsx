import type { Metadata } from "next";
import { fetchPublishedGuides } from "@/sanity/fetchers";
import { GUIDES_DATA, GuideArticle } from "@/data/guides";
import { mapSanityGuide } from "@/sanity/mappers";
import { GuidesClient } from "./guides-client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "African Tech Career Guides & Playbooks",
  description:
    "Actionable career guides, interview playbooks, and compensation breakdowns curated for tech workers across Ogun State, Lagos, and Africa.",
  openGraph: {
    title: "African Tech Career Guides & Playbooks | Trax Jobs",
    description:
      "Actionable career guides, interview playbooks, and compensation breakdowns curated for tech workers across Ogun State, Lagos, and Africa.",
    url: "https://jobs.trax.ng/guides",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "African Tech Career Guides & Playbooks | Trax Jobs",
    description:
      "Actionable career guides, interview playbooks, and compensation breakdowns curated for tech workers across Africa.",
  },
};

export default async function GuidesPage() {
  const rawGuides = await fetchPublishedGuides();

  let guides: GuideArticle[] = [];
  if (rawGuides && rawGuides.length > 0) {
    guides = rawGuides.map((g: any) => mapSanityGuide(g, rawGuides));
  } else {
    guides = GUIDES_DATA;
  }

  return <GuidesClient guides={guides} />;
}
