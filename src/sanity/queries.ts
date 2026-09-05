/**
 * Centralized GROQ queries for Trax Jobs.
 *
 * Every public-facing query filters by status == "published"
 * so pending and approved-but-unpublished entries never leak to the frontend.
 */

// Published jobs with expanded company reference
export const PUBLISHED_JOBS_QUERY = `
  *[_type == "job" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    location,
    workplaceType,
    experienceLevel,
    category,
    employmentType,
    salary,
    tags,
    applicationLink,
    isFeatured,
    isVerified,
    publishedAt,
    "company": company->{
      _id,
      name,
      "slug": slug.current,
      logo,
      industry,
      location,
      employeesCount,
      verified
    }
  }
`;

// Single job by slug
export const JOB_BY_SLUG_QUERY = `
  *[_type == "job" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    description,
    requirements,
    benefits,
    location,
    workplaceType,
    experienceLevel,
    category,
    employmentType,
    salary,
    tags,
    applicationLink,
    isFeatured,
    isVerified,
    publishedAt,
    "company": company->{
      _id,
      name,
      "slug": slug.current,
      logo,
      coverImage,
      industry,
      location,
      employeesCount,
      accentColor,
      description,
      verified
    }
  }
`;

// All companies
export const ALL_COMPANIES_QUERY = `
  *[_type == "company"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    logo,
    industry,
    location,
    employeesCount,
    coverImage,
    accentColor,
    description,
    verified,
    "openJobsCount": count(*[_type == "job" && references(^._id) && status == "published"])
  }
`;

// Single company by slug
export const COMPANY_BY_SLUG_QUERY = `
  *[_type == "company" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    logo,
    coverImage,
    industry,
    location,
    employeesCount,
    accentColor,
    description,
    website,
    verified,
    "openJobsCount": count(*[_type == "job" && references(^._id) && status == "published"]),
    "jobs": *[_type == "job" && references(^._id) && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      location,
      workplaceType,
      experienceLevel,
      employmentType,
      salary,
      tags,
      publishedAt
    }
  }
`;

// Published talent profiles
export const PUBLISHED_TALENT_QUERY = `
  *[_type == "talent" && status == "published"] | order(publishedAt desc) {
    _id,
    name,
    "slug": slug.current,
    title,
    category,
    avatar,
    experienceLevel,
    experienceYears,
    location,
    workPreference,
    skills,
    bio,
    highlightMetric,
    rate,
    availability,
    preferredContactMethod,
    contactValue,
    email,
    whatsapp,
    portfolioUrl,
    githubUrl,
    linkedinUrl,
    verified,
    featured,
    publishedAt
  }
`;

// Single talent by slug
export const TALENT_BY_SLUG_QUERY = `
  *[_type == "talent" && slug.current == $slug && status == "published"][0] {
    _id,
    name,
    "slug": slug.current,
    title,
    category,
    avatar,
    coverImage,
    experienceLevel,
    experienceYears,
    location,
    workPreference,
    skills,
    bio,
    highlightMetric,
    rate,
    availability,
    preferredContactMethod,
    contactValue,
    email,
    whatsapp,
    portfolioUrl,
    githubUrl,
    linkedinUrl,
    verified,
    featured,
    publishedAt
  }
`;
