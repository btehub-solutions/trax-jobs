import { fetchPublishedJobs } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { JobsPageClient } from "./jobs-client";

export const revalidate = 60;

export default async function JobsPage() {
  const raw = await fetchPublishedJobs();

  const jobs = (raw ?? []).map((j: any) => ({
    id: j._id,
    slug: j.slug ?? j._id,
    title: j.title ?? "",
    summary: j.summary ?? "",
    description: j.description ?? [],
    requirements: j.requirements ?? [],
    benefits: j.benefits ?? [],
    location: j.location ?? "",
    workplaceType: j.workplaceType ?? "On-site",
    experienceLevel: j.experienceLevel ?? "Mid-level",
    roleCategory: j.category ?? "",
    contractType: j.employmentType ?? "Permanent",
    salary: {
      formatted: j.salary?.formatted ?? "",
      rawMin: j.salary?.min ?? 0,
      rawMax: j.salary?.max ?? 0,
    },
    tags: j.tags ?? [],
    applicationLink: j.applicationLink ?? "#",
    isFeatured: j.isFeatured ?? false,
    isVerified: j.isVerified ?? false,
    postedDate: j.publishedAt ?? new Date().toISOString(),
    company: {
      id: j.company?._id ?? "",
      name: j.company?.name ?? "",
      slug: j.company?.slug ?? "",
      logo: urlForImage(j.company?.logo),
      industry: j.company?.industry ?? "",
      location: j.company?.location ?? "",
      employeesCount: j.company?.employeesCount ?? "",
      hq: j.company?.location ?? "",
    },
  }));

  return <JobsPageClient jobs={jobs} />;
}
