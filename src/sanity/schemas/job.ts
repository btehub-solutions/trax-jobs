import { defineType, defineField } from "sanity";

export const job = defineType({
  name: "job",
  title: "Job",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "reference",
      to: [{ type: "company" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 3,
      description: "Brief excerpt shown on job cards",
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Rich text job description",
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
      description: "List of requirements, one per item",
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Permanent", value: "Permanent" },
          { title: "Contract", value: "Contract" },
          { title: "Internship", value: "Internship" },
          { title: "Part-time", value: "Part-time" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "experienceLevel",
      title: "Experience Level",
      type: "string",
      options: {
        list: [
          { title: "Entry-level. 0-1 years", value: "Entry-level. 0-1 years" },
          { title: "Junior. 1-3 years", value: "Junior. 1-3 years" },
          { title: "Mid-level. 3-5 years", value: "Mid-level. 3-5 years" },
          { title: "Senior. 5-10 years", value: "Senior. 5-10 years" },
          { title: "Expert. 10+ years", value: "Expert. 10+ years" },
        ],
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "workplaceType",
      title: "Workplace Type",
      type: "string",
      options: {
        list: [
          { title: "On-site", value: "On-site" },
          { title: "Hybrid", value: "Hybrid" },
          { title: "Remote Africa", value: "Remote Africa" },
          { title: "Global Remote", value: "Global Remote" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "category",
      title: "Role Category",
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
      name: "salary",
      title: "Salary",
      type: "object",
      fields: [
        defineField({
          name: "currency",
          title: "Currency",
          type: "string",
          options: {
            list: [
              { title: "NGN", value: "NGN" },
              { title: "USD", value: "USD" },
            ],
          },
        }),
        defineField({
          name: "formatted",
          title: "Formatted Display",
          type: "string",
          description: 'e.g. "₦4.5M – ₦7.2M / yr"',
        }),
        defineField({
          name: "rawMin",
          title: "Minimum (raw number)",
          type: "number",
        }),
        defineField({
          name: "rawMax",
          title: "Maximum (raw number)",
          type: "number",
        }),
        defineField({
          name: "period",
          title: "Period",
          type: "string",
          options: {
            list: [
              { title: "Per Year", value: "yr" },
              { title: "Per Month", value: "mo" },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Skill Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "applicationLink",
      title: "External Application Link",
      type: "url",
      description: "The Apply button redirects here. Required.",
      validation: (rule) => rule.required(),
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
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isVerified",
      title: "Verified by Trax",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "company.name",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: `${subtitle || "No company"} — ${status || "pending"}`,
      };
    },
  },
});
