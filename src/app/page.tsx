import { Navbar } from "@/components/navbar";
import { AnnouncementBar } from "@/components/announcement-bar";
import { HeroSection } from "@/components/hero-section";
import { ExperienceSection } from "@/components/experience-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { FeaturedCompaniesSection } from "@/components/featured-companies-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { CareerGuidesSection } from "@/components/career-guides-section";
import { Footer } from "@/components/footer";
import { fetchCompanies, fetchPublishedJobs, fetchPublishedGuides } from "@/sanity/fetchers";
import { mapSanityGuide } from "@/sanity/mappers";
import { GUIDES_DATA, GuideArticle } from "@/data/guides";
import { urlForImage } from "@/sanity/image";
import { SAMPLE_JOBS } from "@/data/jobs";
import { calculateExperienceCounts } from "@/lib/experience";

export const revalidate = 60;

export default async function Home() {
  const [rawCompanies, rawJobs, rawGuides] = await Promise.all([
    fetchCompanies(),
    fetchPublishedJobs(),
    fetchPublishedGuides(),
  ]);

  let guides: GuideArticle[] = GUIDES_DATA;
  if (rawGuides && rawGuides.length > 0) {
    guides = rawGuides.map((g: any) => mapSanityGuide(g, rawGuides));
  }

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
    coverImage: urlForImage(c.coverImage, { width: 1200, quality: 95 }) || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200",
    logo: urlForImage(c.logo, { width: 240, quality: 95 }),
  }));

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col w-full max-w-full overflow-x-clip">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Announcement Bar */}
      <AnnouncementBar />

      {/* 3. Hero Section */}
      <main className="flex-1 bg-[#FAF8F5]">
        <HeroSection />

        {/* 4. Explore opportunities by experience level */}
        <ExperienceSection counts={experienceCounts} />

        {/* 5. How it works (Direct Curation & Workflow) */}
        <HowItWorksSection />

        {/* 6. Choose the company that's meant for you (Featured Companies) */}
        <FeaturedCompaniesSection companies={sanityCompanies.length > 0 ? sanityCompanies : undefined} />

        {/* 7. Find teams that respect your craft (Ecosystem Standards & Direct Action CTAs) */}
        <SocialProofSection />

        {/* 8. Guide to getting hired (African Tech Career Playbooks) */}
        <CareerGuidesSection guides={guides} />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
