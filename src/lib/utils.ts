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

/**
 * Safely extracts clean individual skill tags from strings, arrays, or objects.
 * Intelligently splits comma-separated or newline-separated skill strings,
 * trims excess whitespace, and deduplicates tags.
 */
export function extractSkillsList(input: any): string[] {
  if (!input) return [];
  const rawList = Array.isArray(input) ? input : typeof input === "string" ? [input] : [];
  const skills: string[] = [];

  for (const item of rawList) {
    if (!item) continue;
    const str =
      typeof item === "string"
        ? item
        : typeof item === "object"
        ? (item.title || item.name || item.text || (Array.isArray(item.children) ? item.children.map((c: any) => c.text).join("") : ""))
        : String(item);

    if (str) {
      const parts = str.split(/[,;\n]+/).map((s: string) => s.trim()).filter(Boolean);
      skills.push(...parts);
    }
  }

  const seen = new Set<string>();
  return skills.filter((s) => {
    const lower = s.toLowerCase();
    if (seen.has(lower)) return false;
    seen.add(lower);
    return true;
  });
}

/**
 * Resolves job skill tags with intelligent extraction from requirements/title/category
 * so that the Skills & Expertise section is never blank.
 */
export function resolveJobTags(
  tags: any,
  jobContext?: { title?: string; category?: string; requirements?: string[]; summary?: string }
): string[] {
  const extracted = extractStringList(tags);
  if (extracted.length > 0) return extracted;

  const textCorpus = [
    jobContext?.title || "",
    jobContext?.summary || "",
    ...(jobContext?.requirements || []),
  ].join(" ");

  const commonKeywords: Array<[string, RegExp]> = [
    ["Python", /\bpython\b/i],
    ["PyTorch", /\bpytorch\b/i],
    ["TensorFlow", /\btensorflow\b/i],
    ["FastAPI", /\bfastapi\b/i],
    ["React", /\breact\b/i],
    ["TypeScript", /\btypescript\b/i],
    ["JavaScript", /\bjavascript\b/i],
    ["Node.js", /\bnode(?:\.js)?\b/i],
    ["Next.js", /\bnext(?:\.js)?\b/i],
    ["Docker", /\bdocker\b/i],
    ["Kubernetes", /\bkubernetes\b/i],
    ["AWS", /\baws\b/i],
    ["GCP", /\bgcp|google cloud\b/i],
    ["PostgreSQL", /\bpostgres(?:ql)?\b/i],
    ["SQL", /\bsql\b/i],
    ["RAG & LLMs", /\b(?:rag|llm|llms|generative ai)\b/i],
    ["Vector Databases", /\b(?:vector database|vector store|pinecone|qdrant|weaviate|pgvector)\b/i],
    ["Figma", /\bfigma\b/i],
    ["Design Systems", /\bdesign system(?:s)?\b/i],
    ["Product Strategy", /\bproduct (?:strategy|roadmap|management)\b/i],
    ["CI/CD", /\bci\/cd\b/i],
  ];

  const matched: string[] = [];
  for (const [label, regex] of commonKeywords) {
    if (regex.test(textCorpus) && !matched.includes(label)) {
      matched.push(label);
      if (matched.length >= 6) break;
    }
  }

  if (matched.length > 0) return matched;

  const category = (jobContext?.category || "").toLowerCase();
  if (category.includes("ai") || category.includes("data")) {
    return ["Python", "Machine Learning", "Data Infrastructure", "Cloud"];
  }
  if (category.includes("design")) {
    return ["Figma", "Design Systems", "UI/UX", "User Research"];
  }
  if (category.includes("product")) {
    return ["Product Strategy", "Agile", "User Research", "Metrics"];
  }
  if (category.includes("devops") || category.includes("cloud")) {
    return ["Cloud Infrastructure", "Docker", "CI/CD", "Security"];
  }
  return ["Software Engineering", "Full-Stack", "Cloud Architecture"];
}
