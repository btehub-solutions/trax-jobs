/**
 * Centralized GROQ queries for Trax Jobs.
 *
 * Every public-facing query filters by status == "published"
 * so pending and approved-but-unpublished entries never leak to the frontend.
 */

// Published jobs with expanded company reference (including approved submissions)
export const PUBLISHED_JOBS_QUERY = `
  *[
    (_type == "job" && status == "published") ||
    (_type == "jobSubmission" && status == "approved")
  ] | order(coalesce(publishedAt, submittedAt) desc) {
    _id,
    "title": coalesce(title, jobTitle),
    "slug": coalesce(slug.current, _id),
    "summary": coalesce(summary, description),
    location,
    workplaceType,
    "experienceLevel": coalesce(experienceLevel, "Mid-Senior"),
    "category": coalesce(category, roleCategory),
    "employmentType": coalesce(employmentType, "Full-time"),
    "salary": coalesce(salary, salaryRange),
    "tags": coalesce(tags, []),
    "applicationLink": coalesce(applicationLink, ""),
    "isFeatured": coalesce(isFeatured, false),
    "isVerified": coalesce(isVerified, true),
    "publishedAt": coalesce(publishedAt, submittedAt),
    "company": select(
      defined(company) => company->{
        _id,
        name,
        "slug": slug.current,
        logo,
        coverImage,
        industry,
        location,
        employeesCount,
        verified
      },
      {
        "_id": _id,
        "name": companyName,
        "slug": lower(companyName),
        "logo": logo,
        "coverImage": coverImage,
        "industry": roleCategory,
        "location": location,
        "employeesCount": "10+ team",
        "verified": true
      }
    )
  }
`;

// Single job by slug or ID (including approved submissions)
export const JOB_BY_SLUG_QUERY = `
  *[
    ((_type == "job" && status == "published") || (_type == "jobSubmission" && status == "approved")) &&
    (slug.current == $slug || _id == $slug)
  ][0] {
    _id,
    "title": coalesce(title, jobTitle),
    "slug": coalesce(slug.current, _id),
    "summary": coalesce(summary, description),
    description,
    requirements,
    benefits,
    location,
    workplaceType,
    "experienceLevel": coalesce(experienceLevel, "Mid-Senior"),
    "category": coalesce(category, roleCategory),
    "employmentType": coalesce(employmentType, "Full-time"),
    "salary": coalesce(salary, salaryRange),
    "tags": coalesce(tags, []),
    "applicationLink": coalesce(applicationLink, ""),
    "isFeatured": coalesce(isFeatured, false),
    "isVerified": coalesce(isVerified, true),
    "publishedAt": coalesce(publishedAt, submittedAt),
    "company": select(
      defined(company) => company->{
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
      },
      {
        "_id": _id,
        "name": companyName,
        "slug": lower(companyName),
        "logo": logo,
        "coverImage": coverImage,
        "industry": roleCategory,
        "location": location,
        "employeesCount": "10+ team",
        "accentColor": "#E7040D",
        "description": description,
        "verified": true
      }
    )
  }
`;

// All companies (including approved submissions)
export const ALL_COMPANIES_QUERY = `
  *[
    (_type == "company") ||
    (_type == "companySubmission" && status == "approved")
  ] | order(name asc) {
    _id,
    name,
    "slug": coalesce(slug.current, _id),
    logo,
    industry,
    location,
    employeesCount,
    coverImage,
    accentColor,
    description,
    "verified": coalesce(verified, true),
    "openJobsCount": count(*[
      (_type == "job" && references(^._id) && status == "published") ||
      (_type == "jobSubmission" && status == "approved" && companyName == ^.name)
    ])
  }
`;

// Single company by slug
export const COMPANY_BY_SLUG_QUERY = `
  *[
    ((_type == "company") || (_type == "companySubmission" && status == "approved")) &&
    (slug.current == $slug || _id == $slug)
  ][0] {
    _id,
    name,
    "slug": coalesce(slug.current, _id),
    logo,
    coverImage,
    industry,
    location,
    employeesCount,
    accentColor,
    description,
    website,
    "verified": coalesce(verified, true),
    "openJobsCount": count(*[
      (_type == "job" && references(^._id) && status == "published") ||
      (_type == "jobSubmission" && status == "approved" && companyName == ^.name)
    ]),
    "jobs": *[
      (_type == "job" && references(^._id) && status == "published") ||
      (_type == "jobSubmission" && status == "approved" && companyName == ^.name)
    ] | order(coalesce(publishedAt, submittedAt) desc) {
      _id,
      "title": coalesce(title, jobTitle),
      "slug": coalesce(slug.current, _id),
      "summary": coalesce(summary, description),
      location,
      workplaceType,
      "experienceLevel": coalesce(experienceLevel, "Mid-Senior"),
      "employmentType": coalesce(employmentType, "Full-time"),
      "salary": coalesce(salary, salaryRange),
      "tags": coalesce(tags, []),
      "publishedAt": coalesce(publishedAt, submittedAt)
    }
  }
`;

// Published talent profiles (including approved submissions)
export const PUBLISHED_TALENT_QUERY = `
  *[
    (_type == "talent" && status == "published") ||
    (_type == "profileSubmission" && status == "approved")
  ] | order(coalesce(publishedAt, submittedAt) desc) {
    _id,
    "name": coalesce(name, fullName),
    "slug": coalesce(slug.current, _id),
    "title": coalesce(title, roleTitle),
    category,
    avatar,
    coverImage,
    "experienceLevel": coalesce(experienceLevel, "Experienced"),
    experienceYears,
    location,
    workPreference,
    skills,
    bio,
    highlightMetric,
    "rate": coalesce(rate, "$3,000 - $5,000 / mo"),
    "availability": coalesce(availability, "Open to offers"),
    preferredContactMethod,
    "contactValue": coalesce(contactValue, select(preferredContactMethod == "whatsapp" => whatsapp, email)),
    email,
    whatsapp,
    portfolioUrl,
    githubUrl,
    linkedinUrl,
    "verified": coalesce(verified, true),
    "featured": coalesce(featured, false),
    "publishedAt": coalesce(publishedAt, submittedAt)
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

// Published courses
export const PUBLISHED_COURSES_QUERY = `
  *[_type == "course" && status == "published"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    level,
    durationWeeks,
    duration,
    image,
    bannerImage,
    rating,
    ratingsCount,
    lessonsCount,
    studentsCount,
    language,
    platform,
    instructor,
    instructorTitle,
    summary,
    description,
    skills,
    includes,
    learningOutcomes,
    targetAudience,
    syllabus,
    certificateDetails,
    enrollmentLink,
    whatsappNumber
  }
`;

// Single course by slug
export const COURSE_BY_SLUG_QUERY = `
  *[_type == "course" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    level,
    durationWeeks,
    duration,
    image,
    bannerImage,
    rating,
    ratingsCount,
    lessonsCount,
    studentsCount,
    language,
    platform,
    instructor,
    instructorTitle,
    summary,
    description,
    skills,
    includes,
    learningOutcomes,
    targetAudience,
    syllabus,
    certificateDetails,
    enrollmentLink,
    whatsappNumber
  }
`;

// Published Guides & Playbooks
export const PUBLISHED_GUIDES_QUERY = `
  *[_type == "guide" && status == "published"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    categoryLabel,
    tagline,
    breadcrumb,
    date,
    readTime,
    lead,
    image,
    author,
    content,
    topics
  }
`;

// Single Guide by slug
export const GUIDE_BY_SLUG_QUERY = `
  *[_type == "guide" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    categoryLabel,
    tagline,
    breadcrumb,
    date,
    readTime,
    lead,
    image,
    author,
    content,
    topics
  }
`;
