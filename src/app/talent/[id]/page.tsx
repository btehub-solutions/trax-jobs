import type { Metadata } from "next";
import { fetchTalentBySlug, fetchPublishedTalent } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { SAMPLE_TALENT } from "@/data/talent";
import { notFound } from "next/navigation";
import { extractText, extractStringList } from "@/lib/utils";
import TalentDetailClient from "./talent-detail-client";

export const revalidate = 60;

function findStaticTalent(id: string) {
  const norm = id.toLowerCase().trim();
  return (
    SAMPLE_TALENT.find(
      (t) =>
        t.id.toLowerCase() === norm ||
        t.slug.toLowerCase() === norm ||
        t.name.toLowerCase().replace(/\s+/g, "-") === norm
    ) || null
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  let rawTalent = await fetchTalentBySlug(id);
  if (!rawTalent) {
    const all = await fetchPublishedTalent();
    rawTalent = all?.find((t: any) => t._id === id || t.slug === id) ?? null;
  }
  const staticTalent = !rawTalent ? findStaticTalent(id) : null;

  if (!rawTalent && !staticTalent) {
    return {
      title: "Talent Profile",
    };
  }

  const name = rawTalent?.name || staticTalent?.name || "Verified Talent";
  const roleTitle = rawTalent?.title || staticTalent?.title || "Tech Professional";
  const title = `${name} • ${roleTitle}`;
  const description =
    extractText(rawTalent?.bio) ||
    staticTalent?.bio ||
    `Hire ${name}, ${roleTitle} located in ${rawTalent?.location || staticTalent?.location || "Nigeria"}. Verified African tech talent.`;
  const rawAvatar = rawTalent ? urlForImage(rawTalent.avatar) : staticTalent?.avatar;
  const ogImageUrl = rawAvatar || "/opengraph-image";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${name} • ${roleTitle}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

function mapTalent(t: any, fallbackStatic?: any) {
  if (!t) return null;
  const parsedSkills = extractStringList(t.skills);
  const finalSkills = parsedSkills.length > 0 ? parsedSkills : (fallbackStatic?.skills ?? []);

  return {
    id: t._id,
    slug: t.slug ?? t._id,
    name: t.name ?? fallbackStatic?.name ?? "",
    title: t.title ?? fallbackStatic?.title ?? "",
    category: t.category ?? fallbackStatic?.category ?? "Engineering",
    avatar: urlForImage(t.avatar) || fallbackStatic?.avatar || "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300",
    coverImage: urlForImage(t.coverImage) || fallbackStatic?.coverImage || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
    experienceLevel: t.experienceLevel ?? fallbackStatic?.experienceLevel ?? "",
    experienceYears: t.experienceYears ?? fallbackStatic?.experienceYears ?? "",
    location: t.location ?? fallbackStatic?.location ?? "",
    workPreference: t.workPreference ?? fallbackStatic?.workPreference ?? "Remote",
    skills: finalSkills,
    bio: extractText(t.bio) || fallbackStatic?.bio || "",
    highlightMetric: t.highlightMetric ?? fallbackStatic?.highlightMetric ?? "",
    rate: t.rate ?? fallbackStatic?.rate ?? "",
    availability: t.availability ?? fallbackStatic?.availability ?? "Available immediately",
    preferredContactMethod: t.preferredContactMethod ?? fallbackStatic?.preferredContactMethod ?? "email",
    email: t.email ?? fallbackStatic?.email ?? "",
    whatsapp: t.whatsapp ?? fallbackStatic?.whatsapp ?? "",
    portfolioUrl: t.portfolioUrl ?? fallbackStatic?.portfolioUrl ?? "",
    githubUrl: t.githubUrl ?? fallbackStatic?.githubUrl ?? "",
    linkedinUrl: t.linkedinUrl ?? fallbackStatic?.linkedinUrl ?? "",
    publishedAt: t.publishedAt ?? fallbackStatic?.publishedAt ?? new Date().toISOString(),
  };
}

export default async function TalentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let rawTalent = await fetchTalentBySlug(id);
  if (!rawTalent) {
    const all = await fetchPublishedTalent();
    rawTalent = all?.find((t: any) => t._id === id || t.slug === id) ?? null;
  }

  const staticTalent = findStaticTalent(id);

  if (!rawTalent && !staticTalent) notFound();

  const talent = rawTalent
    ? mapTalent(rawTalent, staticTalent)!
    : staticTalent!;

  // Similar talent in same category
  let similar: any[] = [];
  const allRaw = await fetchPublishedTalent();
  if (allRaw && allRaw.length > 0) {
    similar = allRaw
      .filter((t: any) => t._id !== talent.id && t.category === talent.category)
      .slice(0, 3)
      .map(mapTalent)
      .filter(Boolean);
  } else {
    similar = SAMPLE_TALENT.filter(
      (t) => t.id !== talent.id && t.slug !== talent.slug && t.category === talent.category
    ).slice(0, 3);
  }

  return <TalentDetailClient talent={talent} similarTalent={similar} />;
}
