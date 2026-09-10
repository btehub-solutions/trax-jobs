import { fetchCompanies } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { SAMPLE_COMPANIES } from "@/data/companies";
import { CompaniesPageClient } from "./companies-client";

export const revalidate = 60; // revalidate every 60 seconds

export default async function CompaniesPage() {
  const raw = await fetchCompanies();

  // Map Sanity shape to what the client component expects, or fallback to SAMPLE_COMPANIES
  const companies =
    raw && raw.length > 0
      ? raw.map((c: any) => ({
          id: c._id,
          name: c.name ?? "",
          slug: c.slug ?? "",
          industry: c.industry ?? "",
          location: c.location ?? "",
          employeesCount: c.employeesCount ?? "",
          description: c.description ?? "",
          bio: c.description ?? "",
          logo: urlForImage(c.logo),
          coverImage: urlForImage(c.coverImage),
          accentColor: c.accentColor ?? "#1F1F1F",
          verified: c.verified ?? false,
          openJobsCount: c.openJobsCount ?? 0,
        }))
      : SAMPLE_COMPANIES.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          industry: c.industry,
          location: c.location,
          employeesCount: c.employeesCount,
          description: c.bio,
          bio: c.bio,
          logo: c.logo,
          coverImage: c.coverImage || "",
          accentColor: c.accentColor || "#1F1F1F",
          verified: c.verified,
          openJobsCount: c.openJobsCount,
        }));

  return <CompaniesPageClient companies={companies} />;
}
