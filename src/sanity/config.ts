// Sanity configuration constants
// These are shared across client, server, and Studio

// Ensure project ID matches Sanity's format requirements (a-z, 0-9, dashes)
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "trax-jobs-dev";
const validProjectId = /^[a-z0-9-]+$/.test(rawProjectId) ? rawProjectId : "trax-jobs-dev";

export const sanityConfig = {
  projectId: validProjectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-09-02",
  /**
   * Set useCdn to `false` if your application requires fresh data on every request.
   * Authenticated requests and server-side mutations always bypass the CDN.
   */
  useCdn: true,
} as const;
