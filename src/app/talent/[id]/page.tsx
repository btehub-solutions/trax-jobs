import { fetchTalentBySlug, fetchPublishedTalent } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { notFound } from "next/navigation";
import TalentDetailClient from "./talent-detail-client";

export const revalidate = 60;

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
    rawTalent = all?.find((t: any) => t._id === id) ?? null;
  }

  if (!rawTalent) notFound();

  const talent = mapTalent(rawTalent);

  // Similar talent in same category
  const allRaw = await fetchPublishedTalent();
  const similar = (allRaw ?? [])
    .filter((t: any) => t._id !== rawTalent._id && t.category === rawTalent.category)
    .slice(0, 3)
    .map(mapTalent)
    .filter(Boolean);

  return <TalentDetailClient talent={talent} similarTalent={similar} />;
}
