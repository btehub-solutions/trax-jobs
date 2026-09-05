import { createClient } from "next-sanity";
import { sanityConfig } from "./config";
import { sanityClient } from "./client";

// Build image URL builder using Sanity client or custom builder
// Supports any Sanity image object or asset reference
export function urlForImage(source: any) {
  if (!source) return "";
  if (typeof source === "string") return source;
  if (source.asset?._ref) {
    const ref = source.asset._ref;
    // Format: image-5f9b...-1200x800-jpg
    const [, id, dimensions, extension] = ref.split("-");
    if (id && dimensions && extension && sanityConfig.projectId) {
      return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}-${dimensions}.${extension}`;
    }
  }
  return "";
}
