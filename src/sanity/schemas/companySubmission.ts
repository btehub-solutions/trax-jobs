import { defineType, defineField } from "sanity";

export const companySubmission = defineType({
  name: "companySubmission",
  title: "Company Submission",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "industry",
      title: "Industry / Sector",
      type: "string",
      options: {
        list: [
          { title: "Payments Infrastructure", value: "Payments Infrastructure" },
          { title: "Global Banking & APIs", value: "Global Banking & APIs" },
          { title: "Developer Tools & Infrastructure", value: "Developer Tools" },
          { title: "Mobility & Logistics", value: "Mobility & Logistics" },
          { title: "Talent & HR Tech", value: "Talent & HR" },
          { title: "WealthTech & Global Investments", value: "WealthTech" },
          { title: "HealthTech & Electronic Records", value: "HealthTech" },
          { title: "E-Commerce & Digital Retail", value: "E-Commerce" },
          { title: "AI, Data & Cloud Solutions", value: "AI & Data" },
        ],
      },
    }),
    defineField({
      name: "location",
      title: "Headquarters Location",
      type: "string",
      options: {
        list: [
          { title: "Lagos, Nigeria", value: "Lagos, Nigeria" },
          { title: "Abuja, Nigeria", value: "Abuja, Nigeria" },
          { title: "Nairobi, Kenya", value: "Nairobi, Kenya" },
          { title: "Cape Town, South Africa", value: "Cape Town, South Africa" },
          { title: "Johannesburg, South Africa", value: "Johannesburg, South Africa" },
          { title: "Accra, Ghana", value: "Accra, Ghana" },
          { title: "Kigali, Rwanda", value: "Kigali, Rwanda" },
          { title: "Cairo, Egypt", value: "Cairo, Egypt" },
          { title: "London & Lagos", value: "London & Lagos" },
          { title: "San Francisco & Lagos", value: "San Francisco & Lagos" },
          { title: "Remote Africa", value: "Remote Africa" },
        ],
      },
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImage",
      title: "Office / Team Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "employeesCount",
      title: "Employee Count",
      type: "string",
      options: {
        list: [
          { title: "1-10 employees", value: "1-10 employees" },
          { title: "10-50 employees", value: "10-50 employees" },
          { title: "50-250 employees", value: "50-250 employees" },
          { title: "250-500 employees", value: "250-500 employees" },
          { title: "500+ employees", value: "500+ employees" },
          { title: "1,000+ employees", value: "1,000+ employees" },
        ],
      },
    }),
    defineField({
      name: "accentColor",
      title: "Brand Accent Color",
      type: "string",
      initialValue: "#E7040D",
    }),
    defineField({
      name: "description",
      title: "Company Overview / Mission",
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
      title: "name",
      subtitle: "industry",
      media: "logo",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title: title || "Untitled Company Submission",
        subtitle: `${subtitle || "Technology"} · ${status || "pending"}`,
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
