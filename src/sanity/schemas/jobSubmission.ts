import { defineType, defineField } from "sanity";

export const jobSubmission = defineType({
  name: "jobSubmission",
  title: "Job Submission",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImage",
      title: "Company Cover / Office Culture Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "roleCategory",
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
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "salaryRange",
      title: "Salary Range",
      type: "string",
      description: "Optional. Free-text salary range.",
    }),
    defineField({
      name: "applicationLink",
      title: "External Application Link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Job Description",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "text",
      rows: 4,
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
      title: "jobTitle",
      subtitle: "companyName",
      media: "logo",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title: title || "Untitled submission",
        subtitle: `${subtitle || "Unknown company"} — ${status || "pending"}`,
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
