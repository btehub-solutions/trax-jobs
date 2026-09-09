import { defineField, defineType } from "sanity";

export const guide = defineType({
  name: "guide",
  title: "Guide & Playbook",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Guide Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(180),
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
      name: "category",
      title: "Audience Category",
      type: "string",
      options: {
        list: [
          { title: "Job Hunters", value: "job-hunters" },
          { title: "Founders & Recruiters", value: "decision-makers" },
          { title: "Students & Interns", value: "students" },
          { title: "Senior Engineers", value: "experienced" },
        ],
      },
      initialValue: "job-hunters",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryLabel",
      title: "Category Display Badge",
      type: "string",
      description: "e.g. Job Hunters, Founders & Recruiters, Senior Engineers",
      initialValue: "Job Hunters",
    }),
    defineField({
      name: "tagline",
      title: "Card Subtitle / Tagline",
      type: "string",
      description: "e.g. Technical screening & system design",
    }),
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb Header Path",
      type: "string",
      description: "e.g. TRAX MEDIA > CAREER GUIDES > TECHNICAL SCREENING & INTERVIEWS",
      initialValue: "TRAX MEDIA > CAREER GUIDES",
    }),
    defineField({
      name: "date",
      title: "Display Date",
      type: "string",
      description: "e.g. Sep 01, 2026",
      initialValue: "Sep 01, 2026",
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g. 5 min read, 7 mins",
      initialValue: "5 min read",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Header / Card Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Primary cover image for the guide.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lead",
      title: "Lead Intro Paragraph",
      type: "text",
      rows: 4,
      description: "Opening hook paragraph displayed in prominent font size.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author Details",
      type: "object",
      fields: [
        { name: "name", title: "Author Name", type: "string", initialValue: "Ben Sam Oladoyin" },
        { name: "role", title: "Author Role", type: "string", initialValue: "AI/ML Engineer, Founder Trax Media Ltd" },
        { name: "avatar", title: "Avatar Image URL or path", type: "string", initialValue: "/images/authors/ben-sam-oladoyin.jpg" },
        { name: "linkedin", title: "LinkedIn Profile URL", type: "url" },
        { name: "twitter", title: "X (Twitter) URL", type: "url" },
        { name: "facebook", title: "Facebook URL", type: "url" },
      ],
    }),
    defineField({
      name: "content",
      title: "Article Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Section Heading", type: "string" },
            {
              name: "body",
              title: "Paragraphs",
              type: "array",
              of: [{ type: "text", rows: 3 }],
            },
            {
              name: "quote",
              title: "Pull Quote (Optional)",
              type: "text",
              rows: 2,
              description: "Highlight quote styled with editorial border-l and citation.",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "topics",
      title: "Topics / Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "categoryLabel",
      media: "image",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${subtitle || "Guide"} · ${status || "published"}`,
        media,
      };
    },
  },
});
