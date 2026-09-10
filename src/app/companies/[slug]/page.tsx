import type { Metadata } from "next";
import { fetchCompanyBySlug } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { SAMPLE_COMPANIES } from "@/data/companies";
import { SAMPLE_JOBS } from "@/data/jobs";
import { notFound } from "next/navigation";
import CompanyDetailClient from "./company-detail-client";

export const revalidate = 60;

function findStaticCompany(slug: string) {
  const norm = slug.toLowerCase().trim();
  return (
    SAMPLE_COMPANIES.find(
      (c) =>
        c.slug.toLowerCase() === norm ||
        c.id.toLowerCase() === norm ||
        c.name.toLowerCase().replace(/\s+/g, "-") === norm
    ) || null
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const raw = await fetchCompanyBySlug(slug);
  const staticCompany = !raw ? findStaticCompany(slug) : null;

  if (!raw && !staticCompany) {
    return {
      title: "Company Profile",
    };
  }

  const name = raw?.name || staticCompany?.name || "Verified Company";
  const title = `${name} Careers & Tech Culture`;
  const description =
    raw?.description ||
    staticCompany?.bio ||
    `Explore open roles, engineering culture, and team details at ${name} on Trax Jobs.`;
  const logoUrl = raw ? urlForImage(raw.logo) : staticCompany?.logo;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: logoUrl ? [{ url: logoUrl, alt: name }] : undefined,
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
  const staticCompany = !raw ? findStaticCompany(slug) : null;

  if (!raw && !staticCompany) notFound();

  const company = raw
    ? {
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
      }
    : {
        id: staticCompany!.id,
        name: staticCompany!.name,
        slug: staticCompany!.slug,
        industry: staticCompany!.industry,
        location: staticCompany!.location,
        employeesCount: staticCompany!.employeesCount,
        bio: staticCompany!.bio,
        logo: staticCompany!.logo,
        coverImage: staticCompany!.coverImage || "",
        accentColor: staticCompany!.accentColor || "#1F1F1F",
        verified: staticCompany!.verified,
        website: "",
        openJobsCount: staticCompany!.openJobsCount,
      };

  // Map embedded jobs from Sanity or fallback to matching SAMPLE_JOBS
  const staticMatchingJobs = SAMPLE_JOBS.filter(
    (j) =>
      j.company.slug.toLowerCase() === company.slug.toLowerCase() ||
      j.company.name.toLowerCase() === company.name.toLowerCase()
  );

  const rawJobs = raw?.jobs && raw.jobs.length > 0 ? raw.jobs : null;

  const companyJobs = rawJobs
    ? rawJobs.map((j: any) => ({
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
      }))
    : staticMatchingJobs.map((j) => ({
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
        salary: { formatted: j.salary?.formatted ?? "", rawMin: j.salary?.rawMin ?? 0, rawMax: j.salary?.rawMax ?? 0 },
        tags: j.tags,
        applicationLink: j.applicationLink,
        isFeatured: j.isFeatured ?? false,
        isVerified: j.isVerified,
        postedDate: j.postedDate,
        company: {
          id: company.id,
          name: company.name,
          slug: company.slug,
          logo: company.logo,
          industry: company.industry,
          location: company.location,
          employeesCount: company.employeesCount,
          hq: company.location,
        },
      }));

  return <CompanyDetailClient company={company} companyJobs={companyJobs} />;
}
