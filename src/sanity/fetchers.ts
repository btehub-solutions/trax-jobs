import { sanityClient } from "./client";
import {
  PUBLISHED_JOBS_QUERY,
  JOB_BY_SLUG_QUERY,
  ALL_COMPANIES_QUERY,
  COMPANY_BY_SLUG_QUERY,
  PUBLISHED_TALENT_QUERY,
  TALENT_BY_SLUG_QUERY,
  PUBLISHED_COURSES_QUERY,
  COURSE_BY_SLUG_QUERY,
  PUBLISHED_GUIDES_QUERY,
  GUIDE_BY_SLUG_QUERY,
} from "./queries";

/**
 * Typed fetch functions for public content.
 *
 * These return raw Sanity results. The consuming pages/components
 * are responsible for mapping Sanity image references through urlForImage()
 * when needed. Shape matches the existing TypeScript interfaces so
 * components can swap data sources without layout changes.
 */

// ---- Jobs ----

export async function fetchPublishedJobs() {
  return sanityClient.fetch(PUBLISHED_JOBS_QUERY);
}

export async function fetchJobBySlug(slug: string) {
  return sanityClient.fetch(JOB_BY_SLUG_QUERY, { slug });
}

// ---- Companies ----

export async function fetchCompanies() {
  return sanityClient.fetch(ALL_COMPANIES_QUERY);
}

export async function fetchCompanyBySlug(slug: string) {
  return sanityClient.fetch(COMPANY_BY_SLUG_QUERY, { slug });
}

// ---- Talent ----

export async function fetchPublishedTalent() {
  return sanityClient.fetch(PUBLISHED_TALENT_QUERY);
}

export async function fetchTalentBySlug(slug: string) {
  return sanityClient.fetch(TALENT_BY_SLUG_QUERY, { slug });
}

// ---- Courses ----

export async function fetchPublishedCourses() {
  return sanityClient.fetch(PUBLISHED_COURSES_QUERY);
}

export async function fetchCourseBySlug(slug: string) {
  return sanityClient.fetch(COURSE_BY_SLUG_QUERY, { slug });
}

// ---- Guides & Playbooks ----

export async function fetchPublishedGuides() {
  return sanityClient.fetch(PUBLISHED_GUIDES_QUERY);
}

export async function fetchGuideBySlug(slug: string) {
  return sanityClient.fetch(GUIDE_BY_SLUG_QUERY, { slug });
}
