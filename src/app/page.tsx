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

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
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
        <FeaturedCompaniesSection />

        {/* 6. Level up / We are here for every step (Why Trax) */}
        <WhyTraxSection />

        {/* 7. Everyone's learning these right now (Trax Skills & Playbooks) */}
        <TrendingSkillsSection />

        {/* 8. 50,000+ people found where they belong (Social Proof & Impact Collage) */}
        <SocialProofSection />

        {/* 8. Guide to getting hired (Nigerian Career Playbooks) */}
        <CareerGuidesSection />

        {/* 9. Why people trust us (Verified Candidate Testimonials) */}
        <TestimonialsTrustSection />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
