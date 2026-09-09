"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";
import { sanityConfig } from "@/sanity/config";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || sanityConfig.projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || sanityConfig.dataset,
  title: "Trax Jobs Studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
