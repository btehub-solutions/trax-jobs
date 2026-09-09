import { fetchCompanies } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { CompaniesPageClient } from "./companies-client";

export const revalidate = 60; // revalidate every 60 seconds

export default async function CompaniesPage() {
  const raw = await fetchCompanies();

  // Map Sanity shape to what the client component expects
  const companies = (raw ?? []).map((c: any) => ({
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
  }));

  return <CompaniesPageClient companies={companies} />;
}
