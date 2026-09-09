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
 * Typed fetch functions for public content with offline resilience.
 *
 * When internet is disconnected or Sanity is unreachable, each fetcher
 * catches the network error and safely returns null so pages seamlessly
 * fall back to local mock data without crashing with a 500 server error.
 */

// ---- Jobs ----

export async function fetchPublishedJobs() {
  try {
    return await sanityClient.fetch(PUBLISHED_JOBS_QUERY);
  } catch {
    return null;
  }
}

export async function fetchJobBySlug(slug: string) {
  try {
    return await sanityClient.fetch(JOB_BY_SLUG_QUERY, { slug });
  } catch {
    return null;
  }
}

// ---- Companies ----

export async function fetchCompanies() {
  try {
    return await sanityClient.fetch(ALL_COMPANIES_QUERY);
  } catch {
    return null;
  }
}

export async function fetchCompanyBySlug(slug: string) {
  try {
    return await sanityClient.fetch(COMPANY_BY_SLUG_QUERY, { slug });
  } catch {
    return null;
  }
}

// ---- Talent ----

export async function fetchPublishedTalent() {
  try {
    return await sanityClient.fetch(PUBLISHED_TALENT_QUERY);
  } catch {
    return null;
  }
}

export async function fetchTalentBySlug(slug: string) {
  try {
    return await sanityClient.fetch(TALENT_BY_SLUG_QUERY, { slug });
  } catch {
    return null;
  }
}

// ---- Courses ----

export async function fetchPublishedCourses() {
  try {
    return await sanityClient.fetch(PUBLISHED_COURSES_QUERY);
  } catch {
    return null;
  }
}

export async function fetchCourseBySlug(slug: string) {
  try {
    return await sanityClient.fetch(COURSE_BY_SLUG_QUERY, { slug });
  } catch {
    return null;
  }
}

// ---- Guides & Playbooks ----

export async function fetchPublishedGuides() {
  try {
    return await sanityClient.fetch(PUBLISHED_GUIDES_QUERY);
  } catch {
    return null;
  }
}

export async function fetchGuideBySlug(slug: string) {
  try {
    return await sanityClient.fetch(GUIDE_BY_SLUG_QUERY, { slug });
  } catch {
    return null;
  }
}

