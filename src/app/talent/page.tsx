import { fetchPublishedTalent } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { SAMPLE_TALENT } from "@/data/talent";
import { extractText, extractStringList } from "@/lib/utils";
import { TalentPageClient } from "./talent-client";

export const revalidate = 60;

export default async function TalentPage() {
  const raw = await fetchPublishedTalent();

  const talent =
    raw && raw.length > 0
      ? raw.map((t: any) => ({
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
          skills: extractStringList(t.skills),
          bio: extractText(t.bio),
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
        }))
      : SAMPLE_TALENT.map((t) => ({
          id: t.id,
          slug: t.slug,
          name: t.name,
          title: t.title,
          category: t.category,
          avatar: t.avatar,
          coverImage: t.coverImage || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
          experienceLevel: t.experienceLevel,
          experienceYears: t.experienceYears,
          location: t.location,
          workPreference: t.workPreference,
          skills: t.skills,
          bio: t.bio,
          highlightMetric: t.highlightMetric || "",
          rate: t.rate || "",
          availability: t.availability,
          preferredContactMethod: t.preferredContactMethod,
          email: t.email || "",
          whatsapp: t.whatsapp || "",
          portfolioUrl: t.portfolioUrl || "",
          githubUrl: t.githubUrl || "",
          linkedinUrl: t.linkedinUrl || "",
          publishedAt: t.publishedAt,
        }));

  return <TalentPageClient talent={talent} />;
}
