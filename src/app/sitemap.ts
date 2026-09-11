import type { MetadataRoute } from "next";
import {
  fetchPublishedJobs,
  fetchCompanies,
  fetchPublishedTalent,
  fetchPublishedGuides,
  fetchPublishedCourses,
} from "@/sanity/fetchers";
import { GUIDES_DATA } from "@/data/guides";
import { COURSES_DATA } from "@/data/courses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jobs.trax.ng";
  const now = new Date();

  // 1. Static Core Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/jobs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/talent`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/companies`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/learning`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 2. Dynamic Jobs
  const rawJobs = await fetchPublishedJobs();
  const jobRoutes: MetadataRoute.Sitemap = (rawJobs ?? []).map((j: any) => ({
    url: `${siteUrl}/jobs/${j.slug || j._id}`,
    lastModified: j.publishedAt ? new Date(j.publishedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Dynamic Companies
  const rawCompanies = await fetchCompanies();
  const companyRoutes: MetadataRoute.Sitemap = (rawCompanies ?? []).map((c: any) => ({
    url: `${siteUrl}/companies/${c.slug || c._id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. Dynamic Talent
  const rawTalent = await fetchPublishedTalent();
  const talentRoutes: MetadataRoute.Sitemap = (rawTalent ?? []).map((t: any) => ({
    url: `${siteUrl}/talent/${t.slug || t._id}`,
    lastModified: t.publishedAt ? new Date(t.publishedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Dynamic Guides (Sanity + fallback data)
  const rawGuides = await fetchPublishedGuides();
  const guidesList = (rawGuides && rawGuides.length > 0) ? rawGuides : GUIDES_DATA;
  const guideRoutes: MetadataRoute.Sitemap = guidesList.map((g: any) => ({
    url: `${siteUrl}/guides/${g.slug || g._id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 6. Dynamic Courses (Sanity + fallback data)
  const rawCourses = await fetchPublishedCourses();
  const coursesList = (rawCourses && rawCourses.length > 0) ? rawCourses : COURSES_DATA;
  const courseRoutes: MetadataRoute.Sitemap = coursesList.map((c: any) => ({
    url: `${siteUrl}/learning/${c.slug || c.id || c._id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...jobRoutes,
    ...companyRoutes,
    ...talentRoutes,
    ...guideRoutes,
    ...courseRoutes,
  ];
}
