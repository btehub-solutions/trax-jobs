import { fetchPublishedCourses } from "@/sanity/fetchers";
import { urlForImage } from "@/sanity/image";
import { COURSES_DATA, CourseDetail } from "@/data/courses";
import { LearningClient } from "./learning-client";

export const revalidate = 60;

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
  };
}

export default async function LearningPage() {
  const rawCourses = await fetchPublishedCourses();

  let courses: CourseDetail[] = [];
  if (rawCourses && rawCourses.length > 0) {
    courses = rawCourses.map(mapSanityCourse);
  } else {
    courses = COURSES_DATA;
  }

  return <LearningClient courses={courses} />;
}
