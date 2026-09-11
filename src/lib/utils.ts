import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely extracts clean text from a string, an array of strings, or Sanity Portable Text blocks.
 * Prevents React child object errors when rendering CMS data.
 */
export function extractText(input: any): string {
  if (!input) return "";
  if (typeof input === "string") return input.trim();
  if (Array.isArray(input)) {
    return input
      .map((item) => extractText(item))
      .filter(Boolean)
      .join("\n\n");
  }
  if (typeof input === "object") {
    if (Array.isArray(input.children)) {
      return input.children
        .map((c: any) => (typeof c === "string" ? c : c?.text || ""))
        .join("")
        .trim();
    }
    if (input.text && typeof input.text === "string") {
      return input.text.trim();
    }
  }
  return "";
}

/**
 * Safely extracts an array of clean text paragraphs from strings, arrays, or Portable Text blocks.
 */
export function extractParagraphs(input: any): string[] {
  if (!input) return [];
  if (typeof input === "string") {
    return input
      .split(/\n\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (Array.isArray(input)) {
    const paragraphs: string[] = [];
    for (const item of input) {
      if (!item) continue;
      if (typeof item === "string") {
        const trimmed = item.trim();
        if (trimmed) paragraphs.push(trimmed);
      } else if (typeof item === "object") {
        if (Array.isArray(item.children)) {
          const text = item.children
            .map((c: any) => (typeof c === "string" ? c : c?.text || ""))
            .join("")
            .trim();
          if (text) paragraphs.push(text);
        } else if (item.text && typeof item.text === "string") {
          const trimmed = item.text.trim();
          if (trimmed) paragraphs.push(trimmed);
        }
      }
    }
    return paragraphs;
  }
  return [];
}

/**
 * Safely extracts a flat list of strings (for requirements, benefits, skills).
 */
export function extractStringList(input: any): string[] {
  if (!input) return [];
  if (typeof input === "string") {
    return input
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (Array.isArray(input)) {
    return input
      .map((item) => {
        if (!item) return "";
        if (typeof item === "string") return item.trim();
        if (typeof item === "object") {
          if (Array.isArray(item.children)) {
            return item.children
              .map((c: any) => (typeof c === "string" ? c : c?.text || ""))
              .join("")
              .trim();
          }
          if (item.text) return String(item.text).trim();
        }
        return "";
      })
      .filter(Boolean);
  }
  return [];
}
