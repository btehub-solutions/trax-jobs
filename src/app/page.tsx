import { Navbar } from "@/components/navbar";
import { AnnouncementBar } from "@/components/announcement-bar";
import { HeroSection } from "@/components/hero-section";
import { ExperienceSection } from "@/components/experience-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { FeaturedCompaniesSection } from "@/components/featured-companies-section";
import { FeaturedTalentSection } from "@/components/talent/featured-talent-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { Footer } from "@/components/footer";
import { fetchCompanies, fetchPublishedJobs, fetchPublishedTalent } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { SAMPLE_JOBS } from "@/data/jobs";
import { calculateExperienceCounts } from "@/lib/experience";
import { extractSkillsList, extractText } from "@/lib/utils";

export const revalidate = 60;

export default async function Home() {
  const [rawCompanies, rawJobs, rawTalent] = await Promise.all([
    fetchCompanies(),
    fetchPublishedJobs(),
    fetchPublishedTalent(),
  ]);

  const activeJobs = rawJobs && rawJobs.length > 0 ? rawJobs : SAMPLE_JOBS;
  const experienceCounts = calculateExperienceCounts(activeJobs);

  const sanityCompanies = (rawCompanies ?? []).map((c: any) => ({
    name: c.name ?? "",
    slug: c.slug ?? "",
    category: c.industry ?? "Technology",
    size: c.employeesCount ? `${c.employeesCount} team` : "50+ team",
    location: c.location ?? "Lagos, Nigeria",
    industry: c.industry ?? "Technology",
    subIndustry: c.industry ?? "Software & Services",
    description: c.description ?? "",
    openRoles: c.openJobsCount ?? 0,
    coverImage: urlForImage(c.coverImage, { width: 600 }) || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600",
    logo: urlForImage(c.logo, { width: 120 }),
  }));

  const sanityTalent = (rawTalent ?? []).map((t: any) => ({
    id: t._id,
    slug: t.slug ?? t._id,
    name: t.name ?? "",
    title: t.title ?? "",
    category: t.category ?? "Engineering",
    avatar: urlForImage(t.avatar, { width: 800, quality: 90 }) || "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: urlForImage(t.coverImage, { width: 1200, quality: 90 }) || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200",
    experienceLevel: t.experienceLevel ?? "",
    experienceYears: t.experienceYears ?? "",
    location: t.location ?? "",
    workPreference: t.workPreference ?? "Remote",
    skills: extractSkillsList(t.skills),
    bio: extractText(t.bio),
    highlightMetric: t.highlightMetric ?? "",
    rate: t.rate ?? "",
    availability: t.availability ?? "Available immediately",
    preferredContactMethod: t.preferredContactMethod ?? "email",
    contactValue: t.email ?? t.whatsapp ?? "",
    email: t.email ?? "",
    whatsapp: t.whatsapp ?? "",
    portfolioUrl: t.portfolioUrl ?? "",
    githubUrl: t.githubUrl ?? "",
    linkedinUrl: t.linkedinUrl ?? "",
    verified: t.verified ?? true,
    publishedAt: t.publishedAt ?? new Date().toISOString(),
  }));

  return (
    <div className="min-h-screen bg-white flex flex-col w-full max-w-full overflow-x-clip">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Announcement Bar */}
      <AnnouncementBar />

      {/* 3. Hero Section */}
      <main className="flex-1">
        <HeroSection />

        {/* 4. Explore opportunities by experience level */}
        <ExperienceSection counts={experienceCounts} />

        {/* 5. How it works (Direct Curation & Workflow) */}
        <HowItWorksSection />

        {/* 6. Choose the company that's meant for you (Featured Companies) */}
        <FeaturedCompaniesSection companies={sanityCompanies.length > 0 ? sanityCompanies : undefined} />

        {/* 7. Hire Africa's finest tech talent (Featured Talent) */}
        <FeaturedTalentSection talent={sanityTalent.length > 0 ? sanityTalent : undefined} />

        {/* 8. Find teams that respect your craft (Ecosystem Standards & Direct Action CTAs) */}
        <SocialProofSection />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
