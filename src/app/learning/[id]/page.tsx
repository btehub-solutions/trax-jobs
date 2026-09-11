import type { Metadata } from "next";
import { fetchCourseBySlug, fetchPublishedCourses } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { COURSES_DATA, CourseDetail } from "@/data/courses";
import { notFound } from "next/navigation";
import { extractText, extractStringList } from "@/lib/utils";
import { CourseDetailClient } from "./course-detail-client";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  let rawCourse = await fetchCourseBySlug(id);
  if (!rawCourse) {
    const allCourses = await fetchPublishedCourses();
    rawCourse = (allCourses ?? []).find((c: any) => c._id === id || c.slug === id) ?? null;
  }

  let course: CourseDetail | null = null;
  if (rawCourse) {
    course = mapSanityCourse(rawCourse);
  } else {
    course = COURSES_DATA.find((c) => c.id === id || c.slug === id) || null;
  }

  if (!course) {
    return {
      title: "Course Overview",
    };
  }

  const title = `${course.title} • Trax Learning`;
  const description = course.summary || course.description || "Master high-demand tech skills through practical courses curated by African engineering leaders.";
  const banner = course.bannerImage || course.image;

  const ogImageUrl = banner || "/opengraph-image";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

function mapSanityCourse(c: any): CourseDetail {
  return {
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
    summary: extractText(c.summary) || "",
    description: extractText(c.description) || "",
    skills: extractStringList(c.skills),
    includes: extractStringList(c.includes).length > 0 ? extractStringList(c.includes) : [
      "Shareable certificate of completion",
      "Access on web and mobile",
      "100% online practical lessons",
    ],
    learningOutcomes: extractStringList(c.learningOutcomes),
    targetAudience: extractStringList(c.targetAudience),
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
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;

  // 1. Try finding in Sanity by slug first
  let rawCourse = await fetchCourseBySlug(id);

  // 2. If not found by slug, search all Sanity published courses for _id
  if (!rawCourse) {
    const allCourses = await fetchPublishedCourses();
    rawCourse = (allCourses ?? []).find((c: any) => c._id === id || c.slug === id) ?? null;
  }

  let course: CourseDetail | null = null;

  if (rawCourse) {
    course = mapSanityCourse(rawCourse);
  } else {
    // 3. Graceful fallback to static COURSES_DATA
    course = COURSES_DATA.find((c) => c.id === id || c.slug === id) || null;
  }

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
