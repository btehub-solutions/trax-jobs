import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityConfig } from "./config";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

// Build image URL builder using Sanity client or custom builder
// Supports any Sanity image object or asset reference
export function urlForImage(source: any) {
  if (!source) return "";
  if (typeof source === "string") return source;
  try {
    const url = builder.image(source).auto("format").fit("max").url();
    if (url) return url;
  } catch {
    // fallback to manual ref parsing
  }
  if (source.asset?._ref) {
    const ref = source.asset._ref;
    const [, id, dimensions, extension] = ref.split("-");
    if (id && dimensions && extension && sanityConfig.projectId) {
      return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}-${dimensions}.${extension}`;
    }
  }
  return "";
}
