import type { Metadata } from "next";
import { fetchTalentBySlug, fetchPublishedTalent } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { SAMPLE_TALENT } from "@/data/talent";
import { notFound } from "next/navigation";
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
    rawTalent?.bio ||
    staticTalent?.bio ||
    `Hire ${name}, ${roleTitle} located in ${rawTalent?.location || staticTalent?.location || "Nigeria"}. Verified African tech talent.`;
  const avatarUrl = rawTalent ? urlForImage(rawTalent.avatar) : staticTalent?.avatar;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: avatarUrl ? [{ url: avatarUrl, alt: name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: avatarUrl ? [avatarUrl] : undefined,
    },
  };
}

function mapTalent(t: any) {
  if (!t) return null;
  return {
    id: t._id,
    slug: t.slug ?? t._id,
    name: t.name ?? "",
    title: t.title ?? "",
    category: t.category ?? "Engineering",
    avatar: urlForImage(t.avatar) || "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300",
    coverImage: urlForImage(t.coverImage) || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
    experienceLevel: t.experienceLevel ?? "",
    experienceYears: t.experienceYears ?? "",
    location: t.location ?? "",
    workPreference: t.workPreference ?? "Remote",
    skills: t.skills ?? [],
    bio: t.bio ?? "",
    highlightMetric: t.highlightMetric ?? "",
    rate: t.rate ?? "",
    availability: t.availability ?? "Available immediately",
    preferredContactMethod: t.preferredContactMethod ?? "email",
    email: t.email ?? "",
    whatsapp: t.whatsapp ?? "",
    portfolioUrl: t.portfolioUrl ?? "",
    githubUrl: t.githubUrl ?? "",
    linkedinUrl: t.linkedinUrl ?? "",
    publishedAt: t.publishedAt ?? new Date().toISOString(),
  };
}

export default async function TalentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let rawTalent = await fetchTalentBySlug(id);
  if (!rawTalent) {
    const all = await fetchPublishedTalent();
    rawTalent = all?.find((t: any) => t._id === id || t.slug === id) ?? null;
  }

  const staticTalent = !rawTalent ? findStaticTalent(id) : null;

  if (!rawTalent && !staticTalent) notFound();

  const talent = rawTalent
    ? mapTalent(rawTalent)!
    : {
        id: staticTalent!.id,
        slug: staticTalent!.slug,
        name: staticTalent!.name,
        title: staticTalent!.title,
        category: staticTalent!.category,
        avatar: staticTalent!.avatar,
        coverImage: staticTalent!.coverImage || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
        experienceLevel: staticTalent!.experienceLevel,
        experienceYears: staticTalent!.experienceYears,
        location: staticTalent!.location,
        workPreference: staticTalent!.workPreference,
        skills: staticTalent!.skills,
        bio: staticTalent!.bio,
        highlightMetric: staticTalent!.highlightMetric || "",
        rate: staticTalent!.rate || "",
        availability: staticTalent!.availability,
        preferredContactMethod: staticTalent!.preferredContactMethod,
        email: staticTalent!.email || "",
        whatsapp: staticTalent!.whatsapp || "",
        portfolioUrl: staticTalent!.portfolioUrl || "",
        githubUrl: staticTalent!.githubUrl || "",
        linkedinUrl: staticTalent!.linkedinUrl || "",
        publishedAt: staticTalent!.publishedAt,
      };

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
