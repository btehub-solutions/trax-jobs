export type ExperienceTier = "Entry-level. 0-1 years" | "Junior. 1-3 years" | "Mid-level. 3-5 years" | "Senior. 5-10 years" | "Expert. 10+ years";

export type RoleCategory = 
  | "Engineering"
  | "Product"
  | "Design"
  | "Data & AI"
  | "DevOps & Cloud"
  | "Marketing & Growth"
  | "Operations & Support";

export type ContractType = "Permanent" | "Contract" | "Internship" | "Part-time";

export type WorkplaceType = "On-site" | "Hybrid" | "Remote Africa" | "Global Remote";

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: {
    name: string;
    slug: string;
    logo: string;
    employeesCount: string;
    industry: string;
    hq: string;
    verified: boolean;
    culturePhotos?: string[];
  };
  location: string;
  workplaceType: WorkplaceType;
  experienceLevel: ExperienceTier;
  roleCategory: RoleCategory;
  contractType: ContractType;
  salary: {
    currency: "NGN" | "USD";
    formatted: string;
    rawMin: number;
    rawMax: number;
    period: "yr" | "mo";
  };
  tags: string[];
  summary: string;
  description: string[];
  requirements: string[];
  benefits: string[];
  applicationLink: string;
  postedDate: string; // ISO string
  isFeatured?: boolean;
  isVerified: boolean;
}

export interface JobFilterState {
  search: string;
  roles: string[];
  experienceLevels: string[];
  locations: string[];
  contractTypes: string[];
  workplaceTypes: string[];
  minSalary?: number;
}

export type TalentExperienceLevel = "Junior (1-3 yrs)" | "Mid-level (3-5 yrs)" | "Senior (5-8 yrs)" | "Lead / Staff (8+ yrs)" | "Expert (10+ yrs)";

export interface TalentProfile {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: RoleCategory;
  avatar: string;
  coverImage?: string;
  experienceLevel: TalentExperienceLevel;
  experienceYears: string;
  location: string;
  workPreference: WorkplaceType;
  skills: string[];
  bio: string;
  highlightMetric: string;
  rate?: string;
  availability: "Available immediately" | "2 weeks notice" | "Part-time / Contract" | "Open to offers";
  preferredContactMethod: "email" | "whatsapp";
  contactValue: string;
  email: string;
  whatsapp?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  verified: boolean;
  featured?: boolean;
  publishedAt: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  rating: number;
  ratingsCount: number;
  lessonsCount: number;
  studentsCount: number;
  durationWeeks: string;
  image: string;
  overview: string;
  curriculum?: {
    moduleTitle: string;
    lessons: string[];
  }[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  breadcrumb: string;
  date: string;
  readTime: string;
  lead: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  content: {
    heading?: string;
    body: string[];
    quote?: string;
  }[];
  topics: string[];
  relatedArticles: {
    slug: string;
    title: string;
    image: string;
  }[];
}

export interface TalentFilterState {
  search: string;
  category: string;
  experienceLevels: string[];
  locations: string[];
  availability: string[];
}

