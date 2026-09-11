import { defineField, defineType } from "sanity";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Course Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(140),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "published",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Experience Level",
      type: "string",
      options: {
        list: [
          { title: "All Levels", value: "All Levels" },
          { title: "Beginner", value: "Beginner" },
          { title: "Intermediate", value: "Intermediate" },
          { title: "Advanced", value: "Advanced" },
        ],
      },
      initialValue: "All Levels",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "durationWeeks",
      title: "Duration (Weeks badge)",
      type: "string",
      description: "e.g. 6 Weeks, 8 Weeks, 4 Weeks",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Total Run Time / Hours",
      type: "string",
      description: "e.g. 4h 30m, 8h 15m",
      initialValue: "6h 00m",
    }),
    defineField({
      name: "image",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Card thumbnail for the homepage carousel (aspect ratio approx 16:9).",
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Wide header image displayed on the course detail page.",
    }),
    defineField({
      name: "rating",
      title: "Rating (out of 5)",
      type: "number",
      initialValue: 4.9,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "ratingsCount",
      title: "Ratings Count",
      type: "number",
      initialValue: 48,
    }),
    defineField({
      name: "lessonsCount",
      title: "Lessons Count",
      type: "number",
      initialValue: 12,
    }),
    defineField({
      name: "studentsCount",
      title: "Students Count",
      type: "string",
      initialValue: "12,400",
    }),
    defineField({
      name: "instructor",
      title: "Instructor or Council",
      type: "string",
      description: "e.g. Trax Product Council, BTEHub Engineering Leads",
      initialValue: "Trax Skills Council",
    }),
    defineField({
      name: "instructorTitle",
      title: "Instructor Title",
      type: "string",
      description: "e.g. Senior Machine Learning Engineers & Founders",
    }),
    defineField({
      name: "platform",
      title: "Delivery Platform",
      type: "string",
      initialValue: "Web & WhatsApp",
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      initialValue: "English",
    }),
    defineField({
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 3,
      description: "A punchy 1-2 sentence overview for the card snippet.",
    }),
    defineField({
      name: "description",
      title: "Detailed Description",
      type: "text",
      rows: 5,
      description: "Full overview displayed on the course detail page.",
    }),
    defineField({
      name: "skills",
      title: "Key Skills Taught",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "includes",
      title: "Course Inclusions",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points like 'Shareable certificate of completion', 'Mentorship circle', etc.",
    }),
    defineField({
      name: "learningOutcomes",
      title: "Learning Outcomes",
      type: "array",
      of: [{ type: "string" }],
      description: "What the student will achieve by completing this course.",
    }),
    defineField({
      name: "targetAudience",
      title: "Target Audience",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "syllabus",
      title: "Syllabus / Modules",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "moduleTitle", title: "Module Title", type: "string" },
            { name: "duration", title: "Duration", type: "string" },
            {
              name: "lessons",
              title: "Lessons",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "certificateDetails",
      title: "Certificate Details",
      type: "object",
      fields: [
        {
          name: "requirement",
          title: "Completion Requirement",
          type: "string",
          description: "e.g. Complete all modules and score 80% or higher on assessments.",
        },
        {
          name: "bulletPoints",
          title: "Certificate Highlights",
          type: "array",
          of: [{ type: "string" }],
          description: "Bullet points outlining certificate benefits and verified credentials.",
        },
      ],
    }),
    defineField({
      name: "enrollmentLink",
      title: "External Enrollment Link (Optional)",
      type: "url",
      description: "Direct link to enroll if hosted externally (e.g. LMS, payment link, or event).",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Enrollment Number",
      type: "string",
      description: "Phone number with country code (e.g. 2347045422815 or +234 704 542 2815) for student WhatsApp inquiries.",
      initialValue: "2347045422815",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "level",
      media: "image",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${subtitle || "Course"} · ${status || "pending"}`,
        media,
      };
    },
  },
});
