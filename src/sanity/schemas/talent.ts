import { defineType, defineField } from "sanity";

export const talent = defineType({
  name: "talent",
  title: "Talent",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Role / Headline",
      type: "string",
      description: 'e.g. "Senior Backend & Systems Engineer"',
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
          { title: "Marketing & Growth", value: "Marketing & Growth" },
          { title: "Operations & Support", value: "Operations & Support" },
        ],
      },
    }),
    defineField({
      name: "avatar",
      title: "Profile Photo",
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
      name: "experienceLevel",
      title: "Experience Level",
      type: "string",
      options: {
        list: [
          { title: "Junior (1-3 yrs)", value: "Junior (1-3 yrs)" },
          { title: "Mid-level (3-5 yrs)", value: "Mid-level (3-5 yrs)" },
          { title: "Senior (5-8 yrs)", value: "Senior (5-8 yrs)" },
          { title: "Lead / Staff (8+ yrs)", value: "Lead / Staff (8+ yrs)" },
          { title: "Expert (10+ yrs)", value: "Expert (10+ yrs)" },
        ],
      },
    }),
    defineField({
      name: "experienceYears",
      title: "Experience Years (display)",
      type: "string",
      description: 'e.g. "5+ yrs exp"',
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
          { title: "On-site", value: "On-site" },
          { title: "Hybrid", value: "Hybrid" },
          { title: "Remote Africa", value: "Remote Africa" },
          { title: "Global Remote", value: "Global Remote" },
        ],
      },
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "bio",
      title: "Professional Bio",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "highlightMetric",
      title: "Key Highlight Metric",
      type: "string",
      description: 'e.g. "$120M+ volume processed"',
    }),
    defineField({
      name: "rate",
      title: "Rate",
      type: "string",
      description: "Optional hourly/daily rate",
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      options: {
        list: [
          { title: "Available immediately", value: "Available immediately" },
          { title: "2 weeks notice", value: "2 weeks notice" },
          { title: "Part-time / Contract", value: "Part-time / Contract" },
          { title: "Open to offers", value: "Open to offers" },
        ],
      },
    }),
    defineField({
      name: "preferredContactMethod",
      title: "Preferred Contact Method",
      type: "string",
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "WhatsApp", value: "whatsapp" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactValue",
      title: "Contact Value",
      type: "string",
      description: "Email address or WhatsApp number used for the Hire button",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
    }),
    defineField({
      name: "portfolioUrl",
      title: "Portfolio URL",
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
      name: "verified",
      title: "Verified by Trax",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "avatar",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${subtitle || "No title"} · ${status || "pending"}`,
        media,
      };
    },
  },
});
