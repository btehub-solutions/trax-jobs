import { defineType, defineField } from "sanity";

export const profileSubmission = defineType({
  name: "profileSubmission",
  title: "Profile Submission",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Profile Photo / Headshot",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Phone Number",
      type: "string",
    }),
    defineField({
      name: "preferredContactMethod",
      title: "Preferred Hiring Contact Method",
      type: "string",
      options: {
        list: [
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Email", value: "email" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "roleTitle",
      title: "Primary Role Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Discipline Category",
      type: "string",
      options: {
        list: [
          { title: "Engineering", value: "Engineering" },
          { title: "Product", value: "Product" },
          { title: "Design", value: "Design" },
          { title: "Data & AI", value: "Data & AI" },
          { title: "DevOps & Cloud", value: "DevOps & Cloud" },
        ],
      },
    }),
    defineField({
      name: "experienceYears",
      title: "Years of Experience",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "workPreference",
      title: "Work Preference",
      type: "string",
      options: {
        list: [
          { title: "Remote Africa", value: "Remote Africa" },
          { title: "Global Remote", value: "Global Remote" },
          { title: "Hybrid", value: "Hybrid" },
          { title: "On-site", value: "On-site" },
        ],
      },
    }),
    defineField({
      name: "highlightMetric",
      title: "Key Highlight Metric / Achievement",
      type: "string",
    }),
    defineField({
      name: "skills",
      title: "Top Skills",
      type: "text",
      description: "Comma-separated list of skills",
    }),
    defineField({
      name: "bio",
      title: "Professional Bio & Track Record",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portfolioUrl",
      title: "Portfolio / Website URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "status",
      title: "Review Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "roleTitle",
      media: "avatar",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title: title || "Unnamed submission",
        subtitle: `${subtitle || "No role"} · ${status || "pending"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});
