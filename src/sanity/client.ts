import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

/**
 * Read-only Sanity client for public data fetching.
 * Uses the CDN for fast responses. No auth token required.
 */
export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
});

/**
 * Server-side write client for creating submissions.
 * Uses the SANITY_API_WRITE_TOKEN environment variable.
 *
 * NEVER import this in client components or expose the token to the browser.
 * This client is intended for use inside Next.js Route Handlers only.
 */
export const sanityWriteClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
