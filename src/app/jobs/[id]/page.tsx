import type { Metadata } from "next";
import { fetchJobBySlug, fetchPublishedJobs } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { SAMPLE_JOBS } from "@/data/jobs";
import { notFound } from "next/navigation";
import { extractText, extractParagraphs, extractStringList, resolveJobTags } from "@/lib/utils";
import JobDetailClient from "./job-detail-client";

export const revalidate = 60;

function findStaticJob(id: string) {
  const norm = id.toLowerCase().trim();
  return (
    SAMPLE_JOBS.find(
      (j) =>
        j.id.toLowerCase() === norm ||
        j.slug.toLowerCase() === norm ||
        j.title.toLowerCase().replace(/\s+/g, "-") === norm
    ) || null
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  let rawJob = await fetchJobBySlug(id);
  if (!rawJob) {
    const all = await fetchPublishedJobs();
    rawJob = all?.find((j: any) => j._id === id || j.slug === id) ?? null;
  }
  const staticJob = !rawJob ? findStaticJob(id) : null;

  if (!rawJob && !staticJob) {
    return {
      title: "Job Opportunity",
    };
  }

  const title = rawJob
    ? `${rawJob.title} at ${rawJob.company?.name || "Verified Company"}`
    : `${staticJob!.title} at ${staticJob!.company.name}`;
  const description =
    rawJob?.summary ||
    staticJob?.summary ||
    `Apply for ${rawJob?.title || staticJob?.title} in ${rawJob?.location || staticJob?.location}. Verified tech opportunity on Trax Jobs.`;
  const companyName = rawJob?.company?.name || staticJob?.company?.name || "Verified Company";
  const rawLogo = rawJob ? urlForImage(rawJob.company?.logo) : (staticJob?.company as any)?.logo;
  const ogImageUrl = rawLogo || "/opengraph-image";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${companyName}`,
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

function mapJob(j: any) {
  if (!j) return null;
  const title = j.title ?? "";
  const roleCategory = j.category ?? "";
  const summary = extractText(j.summary);
  const requirements = extractStringList(j.requirements);
  const tags = resolveJobTags(j.tags, { title, category: roleCategory, requirements, summary });

  return {
    id: j._id,
    slug: j.slug ?? j._id,
    title,
    summary,
    description: extractParagraphs(j.description),
    requirements,
    benefits: extractStringList(j.benefits),
    location: j.location ?? "",
    workplaceType: j.workplaceType ?? "On-site",
    experienceLevel: j.experienceLevel ?? "Mid-level",
    roleCategory,
    contractType: j.employmentType ?? "Permanent",
    salary: {
      formatted: j.salary?.formatted ?? "",
      rawMin: j.salary?.min ?? 0,
      rawMax: j.salary?.max ?? 0,
    },
    tags,
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
      bio: extractText(j.company?.description),
    },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Try by slug first, fallback to all jobs to find by _id or slug
  let rawJob = await fetchJobBySlug(id);
  if (!rawJob) {
    const all = await fetchPublishedJobs();
    rawJob = all?.find((j: any) => j._id === id || j.slug === id) ?? null;
  }

  const staticJob = !rawJob ? findStaticJob(id) : null;

  if (!rawJob && !staticJob) notFound();

  const job = rawJob
    ? mapJob(rawJob)!
    : {
        id: staticJob!.id,
        slug: staticJob!.slug || staticJob!.id,
        title: staticJob!.title,
        summary: staticJob!.summary,
        description: staticJob!.description,
        requirements: staticJob!.requirements,
        benefits: staticJob!.benefits,
        location: staticJob!.location,
        workplaceType: staticJob!.workplaceType,
        experienceLevel: staticJob!.experienceLevel,
        roleCategory: staticJob!.roleCategory,
        contractType: staticJob!.contractType,
        salary: {
          formatted: staticJob!.salary?.formatted ?? "",
          rawMin: staticJob!.salary?.rawMin ?? 0,
          rawMax: staticJob!.salary?.rawMax ?? 0,
        },
        tags: resolveJobTags(staticJob!.tags, {
          title: staticJob!.title,
          category: staticJob!.roleCategory,
          requirements: staticJob!.requirements,
          summary: staticJob!.summary,
        }),
        applicationLink: staticJob!.applicationLink ?? "#",
        isFeatured: staticJob!.isFeatured ?? false,
        isVerified: staticJob!.isVerified ?? false,
        postedDate: staticJob!.postedDate ?? new Date().toISOString(),
        company: {
          id: staticJob!.company.slug,
          name: staticJob!.company.name,
          slug: staticJob!.company.slug,
          logo: staticJob!.company.logo,
          industry: staticJob!.company.industry,
          location: staticJob!.company.hq,
          employeesCount: staticJob!.company.employeesCount,
          hq: staticJob!.company.hq,
          bio: "",
        },
      };

  // Fetch all company jobs for the job count badge
  let companyJobsCount = 1;
  const allRaw = await fetchPublishedJobs();
  if (allRaw && allRaw.length > 0) {
    const allCompanyJobs = allRaw
      .filter((j: any) => j.company?.slug === job.company.slug)
      .map(mapJob)
      .filter(Boolean);
    companyJobsCount = allCompanyJobs.length || 1;
  } else {
    const staticCompanyJobs = SAMPLE_JOBS.filter(
      (j) =>
        j.company.slug.toLowerCase() === job.company.slug.toLowerCase() ||
        j.company.name.toLowerCase() === job.company.name.toLowerCase()
    );
    companyJobsCount = staticCompanyJobs.length || 1;
  }

  return <JobDetailClient job={job} allCompanyJobsCount={companyJobsCount} />;
}
