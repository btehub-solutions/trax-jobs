import type { MetadataRoute } from "next";
import {
  fetchPublishedJobs,
  fetchCompanies,
  fetchPublishedTalent,
  fetchPublishedGuides,
  fetchPublishedCourses,
} from "@/sanity/fetchers";
import { SAMPLE_JOBS } from "@/data/jobs";
import { SAMPLE_COMPANIES } from "@/data/companies";
import { SAMPLE_TALENT } from "@/data/talent";
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
  const jobsList = rawJobs && rawJobs.length > 0 ? rawJobs : SAMPLE_JOBS;
  const jobRoutes: MetadataRoute.Sitemap = jobsList.map((j: any) => ({
    url: `${siteUrl}/jobs/${j.slug || j._id || j.id}`,
    lastModified: j.publishedAt ? new Date(j.publishedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Dynamic Companies
  const rawCompanies = await fetchCompanies();
  const companiesList = rawCompanies && rawCompanies.length > 0 ? rawCompanies : SAMPLE_COMPANIES;
  const companyRoutes: MetadataRoute.Sitemap = companiesList.map((c: any) => ({
    url: `${siteUrl}/companies/${c.slug || c._id || c.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. Dynamic Talent
  const rawTalent = await fetchPublishedTalent();
  const talentList = rawTalent && rawTalent.length > 0 ? rawTalent : SAMPLE_TALENT;
  const talentRoutes: MetadataRoute.Sitemap = talentList.map((t: any) => ({
    url: `${siteUrl}/talent/${t.slug || t._id || t.id}`,
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
