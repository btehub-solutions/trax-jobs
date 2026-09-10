import type { Metadata } from "next";
import { fetchCompanyBySlug } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { notFound } from "next/navigation";
import CompanyDetailClient from "./company-detail-client";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const raw = await fetchCompanyBySlug(slug);
  if (!raw) {
    return {
      title: "Company Profile",
    };
  }

  const title = `${raw.name} Careers & Tech Culture`;
  const description = raw.description || `Explore open roles, engineering culture, and team details at ${raw.name} on Trax Jobs.`;
  const logoUrl = urlForImage(raw.logo);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: logoUrl ? [{ url: logoUrl, alt: raw.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: logoUrl ? [logoUrl] : undefined,
    },
  };
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const raw = await fetchCompanyBySlug(slug);
  if (!raw) notFound();

  const company = {
    id: raw._id,
    name: raw.name ?? "",
    slug: raw.slug ?? slug,
    industry: raw.industry ?? "",
    location: raw.location ?? "",
    employeesCount: raw.employeesCount ?? "",
    bio: raw.description ?? "",
    logo: urlForImage(raw.logo),
    coverImage: urlForImage(raw.coverImage),
    accentColor: raw.accentColor ?? "#1F1F1F",
    verified: raw.verified ?? false,
    website: raw.website ?? "",
    openJobsCount: raw.openJobsCount ?? 0,
  };

  // Map embedded jobs
  const companyJobs = (raw.jobs ?? []).map((j: any) => ({
    id: j._id,
    slug: j.slug ?? j._id,
    title: j.title ?? "",
    summary: j.summary ?? "",
    description: [],
    requirements: [],
    benefits: [],
    location: j.location ?? "",
    workplaceType: j.workplaceType ?? "On-site",
    experienceLevel: j.experienceLevel ?? "Mid-level",
    roleCategory: j.category ?? "",
    contractType: j.employmentType ?? "Permanent",
    salary: { formatted: j.salary?.formatted ?? "", rawMin: j.salary?.min ?? 0, rawMax: j.salary?.max ?? 0 },
    tags: j.tags ?? [],
    applicationLink: j.applicationLink ?? "#",
    isFeatured: false,
    isVerified: false,
    postedDate: j.publishedAt ?? new Date().toISOString(),
    company: {
      id: raw._id,
      name: raw.name ?? "",
      slug: raw.slug ?? slug,
      logo: urlForImage(raw.logo),
      industry: raw.industry ?? "",
      location: raw.location ?? "",
      employeesCount: raw.employeesCount ?? "",
      hq: raw.location ?? "",
    },
  }));

  return <CompanyDetailClient company={company} companyJobs={companyJobs} />;
}
