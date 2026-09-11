import { Navbar } from "@/components/navbar";
import { AnnouncementBar } from "@/components/announcement-bar";
import { HeroSection } from "@/components/hero-section";
import { ExperienceSection } from "@/components/experience-section";
import { WhyTraxSection } from "@/components/why-trax-section";
import { TrendingSkillsSection } from "@/components/trending-skills-section";
import { FeaturedCompaniesSection } from "@/components/featured-companies-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { CareerGuidesSection } from "@/components/career-guides-section";
import { TestimonialsTrustSection } from "@/components/testimonials-trust-section";
import { Footer } from "@/components/footer";
import { fetchCompanies, fetchPublishedCourses, fetchPublishedGuides } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { CourseDetail } from "@/data/courses";

export const revalidate = 60;

export default async function Home() {
  const [rawCompanies, rawCourses, rawGuides] = await Promise.all([
    fetchCompanies(),
    fetchPublishedCourses(),
    fetchPublishedGuides(),
  ]);

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
    coverImage: urlForImage(c.coverImage) || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
    logo: urlForImage(c.logo),
  }));

  const sanityCourses: CourseDetail[] = (rawCourses ?? []).map((c: any) => ({
    id: c._id,
    slug: c.slug || c._id,
    title: c.title,
    level: c.level || "All Levels",
    duration: c.duration || "4h 00m",
    durationWeeks: c.durationWeeks || "6 Weeks",
    image: urlForImage(c.image) || "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
    bannerImage: urlForImage(c.bannerImage) || urlForImage(c.image) || "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: c.rating || 4.9,
    ratingsCount: c.ratingsCount || 48,
    lessonsCount: c.lessonsCount || 10,
    studentsCount: c.studentsCount || "10,000+",
    language: c.language || "English",
    platform: c.platform || "Web & WhatsApp",
    instructor: c.instructor || "Trax Skills Council",
    instructorTitle: c.instructorTitle || "Engineering & Product Leaders",
    summary: c.summary || "",
    description: c.description || "",
    skills: c.skills || [],
    includes: c.includes || [
      "Shareable certificate of completion",
      "Access on web and mobile",
      "100% online practical lessons",
    ],
    learningOutcomes: c.learningOutcomes || [],
    targetAudience: c.targetAudience || [],
    syllabus: (c.syllabus || []).map((m: any) => ({
      moduleTitle: m.moduleTitle || "",
      duration: m.duration || "",
      lessons: m.lessons || [],
    })),
    certificateDetails: c.certificateDetails || {
      requirement: "Complete all modules and submit final practical milestone project",
      bulletPoints: [
        "Official verified credential issued under Trax Media",
        "Directly displayable on your Trax talent profile",
      ],
    },
    enrollmentLink: c.enrollmentLink || "",
    whatsappNumber: c.whatsappNumber || "2348000008729",
  }));

  const sanityGuides = (rawGuides ?? []).map((g: any) => ({
    slug: g.slug || g._id,
    category: g.category || "job-hunters",
    title: g.title,
    tagline: g.tagline || "",
    description: g.lead || "",
    image: urlForImage(g.image) || "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: g.readTime || "5 min read",
    href: `/guides/${g.slug || g._id}`,
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
        <ExperienceSection />

        {/* 5. Choose the company that's meant for you (Featured Companies) */}
        <FeaturedCompaniesSection companies={sanityCompanies.length > 0 ? sanityCompanies : undefined} />

        {/* 6. Level up / We are here for every step (Why Trax) */}
        <WhyTraxSection />

        {/* 7. Everyone's learning these right now (Trax Skills & Playbooks) */}
        <TrendingSkillsSection courses={sanityCourses.length > 0 ? sanityCourses : undefined} />

        {/* 8. Find teams that respect your craft (Ecosystem Standards & Direct Hiring) */}
        <SocialProofSection />

        {/* 8. Guide to getting hired (Nigerian Career Playbooks) */}
        <CareerGuidesSection guides={sanityGuides.length > 0 ? sanityGuides : undefined} />

        {/* 9. Why people trust us (Verified Candidate Testimonials) */}
        <TestimonialsTrustSection />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
