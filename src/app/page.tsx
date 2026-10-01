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

  const sanityCompanies = (rawCompanies ?? []).map((c: any) => {
    const slug = (c.slug ?? "").toLowerCase();
    const fallbackCover =
      slug.includes("btehub")
        ? "https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=800"
        : slug.includes("savey")
        ? "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
        : "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800";

    const coverUrl = urlForImage(c.coverImage, { width: 1200, quality: 95 });
    const isLogoAsCover = !coverUrl || (c.coverImage?._ref && c.logo?._ref && c.coverImage._ref === c.logo._ref) || slug.includes("btehub") || slug.includes("savey");
    const finalCover = isLogoAsCover ? fallbackCover : coverUrl;

    let category = "Fintech";
    const ind = (c.industry ?? "").toLowerCase();
    if (ind.includes("data") || ind.includes("ai") || ind.includes("developer") || ind.includes("software")) {
      category = "Developer Tools";
    } else if (ind.includes("logistics") || ind.includes("mobility") || ind.includes("delivery")) {
      category = "Mobility / Logistics";
    } else if (ind.includes("talent") || ind.includes("hr")) {
      category = "Talent & HR";
    } else if (ind.includes("banking") || ind.includes("switch")) {
      category = "Banking Infrastructure";
    }

    return {
      name: c.name ?? "",
      slug: c.slug ?? "",
      category,
      size: c.employeesCount ? `${c.employeesCount} team` : "50+ team",
      location: c.location ?? "Lagos, Nigeria",
      industry: c.industry ?? "Technology",
      subIndustry: c.industry ?? "Software & Services",
      description: c.description ?? "",
      openRoles: c.openJobsCount ?? 0,
      coverImage: finalCover,
      logo: urlForImage(c.logo, { width: 240, quality: 95 }),
    };
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col w-full max-w-full">
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

        {/* 7 & 8. Continuous Seamless Graph-Paper Canvas (Social Proof & Career Playbooks) */}
        <div className="relative overflow-hidden bg-[#FAF8F5]">
          {/* Continuous Graph-Paper Grid Background spanning both sections without boundary interruption */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e8e4dc 1px, transparent 1px),
                linear-gradient(to bottom, #e8e4dc 1px, transparent 1px)
              `,
              backgroundSize: "28px 28px",
            }}
          />
          <SocialProofSection showGrid={false} />
          <CareerGuidesSection guides={guides} showGrid={false} />
        </div>
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
