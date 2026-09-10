import type { Metadata } from "next";
import { fetchJobBySlug, fetchPublishedJobs } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { notFound } from "next/navigation";
import JobDetailClient from "./job-detail-client";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  let rawJob = await fetchJobBySlug(id);
  if (!rawJob) {
    const all = await fetchPublishedJobs();
    rawJob = all?.find((j: any) => j._id === id) ?? null;
  }
  if (!rawJob) {
    return {
      title: "Job Opportunity",
    };
  }

  const title = `${rawJob.title} at ${rawJob.company?.name || "Verified Company"}`;
  const description = rawJob.summary || `Apply for ${rawJob.title} in ${rawJob.location || "Nigeria"}. Verified tech opportunity on Trax Jobs.`;
  const companyLogo = urlForImage(rawJob.company?.logo);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: companyLogo ? [{ url: companyLogo, alt: rawJob.company?.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: companyLogo ? [companyLogo] : undefined,
    },
  };
}

function mapJob(j: any) {
  if (!j) return null;
  return {
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
      bio: j.company?.description ?? "",
    },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Try by slug first, fallback to all jobs to find by _id
  let rawJob = await fetchJobBySlug(id);
  if (!rawJob) {
    const all = await fetchPublishedJobs();
    rawJob = all?.find((j: any) => j._id === id) ?? null;
  }

  if (!rawJob) notFound();

  const job = mapJob(rawJob);

  // Fetch all company jobs for the job count badge
  const allRaw = await fetchPublishedJobs();
  const allCompanyJobs = (allRaw ?? [])
    .filter((j: any) => j.company?.slug === rawJob.company?.slug)
    .map(mapJob)
    .filter(Boolean);

  return <JobDetailClient job={job} allCompanyJobsCount={allCompanyJobs.length} />;
}
