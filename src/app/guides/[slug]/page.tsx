import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchGuideBySlug, fetchPublishedGuides } from "@/sanity/fetchers";
import { GUIDES_DATA, GuideArticle } from "@/data/guides";
import { mapSanityGuide } from "@/sanity/mappers";
import { GuideDetailClient } from "./guide-detail-client";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug
    ? decodeURIComponent(resolvedParams.slug).toLowerCase().trim().replace(/\s+/g, "-")
    : "";

  let article =
    GUIDES_DATA.find((g) => g.slug === rawSlug) ||
    GUIDES_DATA.find((g) => g.slug.includes(rawSlug)) ||
    null;

  if (!article) {
    const rawGuide = await fetchGuideBySlug(rawSlug);
    if (rawGuide) {
      article = mapSanityGuide(rawGuide, []);
    }
  }

  if (!article) {
    return {
      title: "Career Guide",
    };
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://jobs.trax.ng").replace(/\/$/, "");
  const pageUrl = `${siteUrl}/guides/${article.slug}`;
  const title = `${article.title} • Trax Playbook`;
  const description = article.lead || "Practical engineering guides and career playbooks for African tech professionals.";

  // Ensure absolute image URL with fallback for WhatsApp and social scrapers
  let ogImageUrl = article.image;
  if (ogImageUrl && !ogImageUrl.startsWith("http://") && !ogImageUrl.startsWith("https://")) {
    ogImageUrl = `${siteUrl}${ogImageUrl.startsWith("/") ? "" : "/"}${ogImageUrl}`;
  }
  if (!ogImageUrl) {
    ogImageUrl = `${siteUrl}/opengraph-image`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Trax Jobs",
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@traxmedia",
      images: [ogImageUrl],
    },
  };
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
