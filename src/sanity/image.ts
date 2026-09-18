import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityConfig } from "./config";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

// Build image URL builder using Sanity client or custom builder
// Supports any Sanity image object or asset reference
export function urlForImage(
  source: any,
  options?: { width?: number; quality?: number }
) {
  if (!source) return "";
  if (typeof source === "string") {
    const trimmed = source.trim();
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("/") ||
      trimmed.startsWith("data:image/")
    ) {
      return trimmed;
    }
    return "";
  }
  try {
    let img = builder.image(source).auto("format").fit("max");
    if (options?.width) {
      img = img.width(options.width);
    }
    if (options?.quality) {
      img = img.quality(options.quality);
    }
    const url = img.url();
    if (url) return url;
  } catch {
    // fallback to manual ref parsing
  }
  if (source.asset?._ref) {
    const ref = source.asset._ref;
    const [, id, dimensions, extension] = ref.split("-");
    if (id && dimensions && extension && sanityConfig.projectId) {
      const base = `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}-${dimensions}.${extension}`;
      const params = new URLSearchParams();
      params.set("auto", "format");
      if (options?.width) params.set("w", String(options.width));
      if (options?.quality) params.set("q", String(options.quality));
      return `${base}?${params.toString()}`;
    }
  }
  return "";
}
