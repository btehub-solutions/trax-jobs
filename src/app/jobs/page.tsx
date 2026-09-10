import { fetchPublishedJobs } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { SAMPLE_JOBS } from "@/data/jobs";
import { JobsPageClient } from "./jobs-client";

export const revalidate = 60;

export default async function JobsPage() {
  const raw = await fetchPublishedJobs();

  const jobs =
    raw && raw.length > 0
      ? raw.map((j: any) => ({
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
        }))
      : SAMPLE_JOBS.map((j) => ({
          id: j.id,
          slug: j.slug || j.id,
          title: j.title,
          summary: j.summary,
          description: j.description,
          requirements: j.requirements,
          benefits: j.benefits,
          location: j.location,
          workplaceType: j.workplaceType,
          experienceLevel: j.experienceLevel,
          roleCategory: j.roleCategory,
          contractType: j.contractType,
          salary: {
            formatted: j.salary?.formatted ?? "",
            rawMin: j.salary?.rawMin ?? 0,
            rawMax: j.salary?.rawMax ?? 0,
          },
          tags: j.tags,
          applicationLink: j.applicationLink,
          isFeatured: j.isFeatured ?? false,
          isVerified: j.isVerified,
          postedDate: j.postedDate,
          company: {
            id: j.company.slug,
            name: j.company.name,
            slug: j.company.slug,
            logo: j.company.logo,
            industry: j.company.industry,
            location: j.company.hq,
            employeesCount: j.company.employeesCount,
            hq: j.company.hq,
          },
        }));

  return <JobsPageClient jobs={jobs} />;
}
