import { notFound } from "next/navigation";
import { fetchGuideBySlug, fetchPublishedGuides } from "@/sanity/fetchers";
import { GUIDES_DATA, GuideArticle } from "@/data/guides";
import { mapSanityGuide } from "@/sanity/mappers";
import { GuideDetailClient } from "./guide-detail-client";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuideDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug
    ? decodeURIComponent(resolvedParams.slug).toLowerCase().trim().replace(/\s+/g, "-")
    : "";

  // 1. Fetch all published guides from Sanity (allows building full related articles graph)
  const allGuides = await fetchPublishedGuides();

  // 2. Try finding the specific guide by slug or id
  let rawGuide = (allGuides ?? []).find(
    (g: any) => (g.slug || g._id) === rawSlug
  );

  if (!rawGuide) {
    rawGuide = await fetchGuideBySlug(rawSlug);
  }

  let article: GuideArticle | null = null;

  if (rawGuide) {
    article = mapSanityGuide(rawGuide, allGuides ?? []);
  } else {
    // 3. Fallback to static GUIDES_DATA
    article =
      GUIDES_DATA.find((g) => g.slug === rawSlug) ||
      GUIDES_DATA.find((g) => g.slug.includes(rawSlug)) ||
      null;
  }

  if (!article) {
    notFound();
  }

  return <GuideDetailClient article={article} />;
}
