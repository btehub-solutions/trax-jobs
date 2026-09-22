import type { Metadata } from "next";
import { fetchPublishedTalent } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { SAMPLE_TALENT } from "@/data/talent";
import { extractText, extractStringList, extractSkillsList } from "@/lib/utils";
import { TalentPageClient } from "./talent-client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hire Vetted African Tech Talent",
  description:
    "Discover exceptional software engineers, designers, product managers, and data specialists across Nigeria and Africa. Contact directly via email or WhatsApp.",
  openGraph: {
    title: "Hire Vetted African Tech Talent | Trax Jobs",
    description:
      "Discover exceptional software engineers, designers, product managers, and data specialists across Nigeria and Africa. Contact directly via email or WhatsApp.",
    url: "https://jobs.trax.ng/talent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Vetted African Tech Talent | Trax Jobs",
    description:
      "Discover exceptional software engineers, designers, product managers, and data specialists across Nigeria and Africa.",
  },
};

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
          avatar: urlForImage(t.avatar, { width: 800, quality: 90 }) || "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
          coverImage: urlForImage(t.coverImage, { width: 1200, quality: 90 }) || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200",
          experienceLevel: t.experienceLevel ?? "",
          experienceYears: t.experienceYears ?? "",
          location: t.location ?? "",
          workPreference: t.workPreference ?? "Remote",
          skills: extractSkillsList(t.skills),
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
