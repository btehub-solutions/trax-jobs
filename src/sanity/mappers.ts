import { urlForImage } from "./image";
import { GUIDES_DATA, GuideArticle } from "@/data/guides";

export function mapSanityGuide(g: any, allGuides?: any[]): GuideArticle {
  const fallbackGuide = GUIDES_DATA.find((item) => item.slug === g.slug);
  const slug = g.slug || g._id;

  // Derive related articles if not directly specified
  let relatedArticles = fallbackGuide?.relatedArticles || [];
  if (allGuides && allGuides.length > 1) {
    const others = allGuides
      .filter((other: any) => (other.slug || other._id) !== slug)
      .slice(0, 3)
      .map((other: any) => ({
        slug: other.slug || other._id,
        title: other.title,
        image:
          urlForImage(other.image) ||
          "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
      }));
    if (others.length > 0) {
      relatedArticles = others;
    }
  }

  return {
    slug,
    title: g.title || fallbackGuide?.title || "Career Guide",
    category: g.category || fallbackGuide?.category || "job-hunters",
    categoryLabel: g.categoryLabel || fallbackGuide?.categoryLabel || "Job Hunters",
    breadcrumb: g.breadcrumb || fallbackGuide?.breadcrumb || "TRAX MEDIA > CAREER GUIDES",
    date: g.date || fallbackGuide?.date || "Sep 01, 2026",
    readTime: g.readTime || fallbackGuide?.readTime || "5 min read",
    lead: g.lead || fallbackGuide?.lead || "",
    image:
      urlForImage(g.image) ||
      fallbackGuide?.image ||
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1200",
    author: {
      name: g.author?.name || fallbackGuide?.author.name || "Ben Sam Oladoyin",
      role: g.author?.role || fallbackGuide?.author.role || "AI/ML Engineer, Founder Trax Media Ltd",
      avatar: g.author?.avatar || fallbackGuide?.author.avatar || "/images/authors/ben-sam-oladoyin.jpg",
      linkedin: g.author?.linkedin || fallbackGuide?.author.linkedin,
      twitter: g.author?.twitter || fallbackGuide?.author.twitter,
      facebook: g.author?.facebook || fallbackGuide?.author.facebook,
    },
    content:
      Array.isArray(g.content) && g.content.length > 0
        ? g.content.map((sec: any) => ({
            heading: sec.heading,
            body: Array.isArray(sec.body) ? sec.body : [],
            quote: sec.quote,
          }))
        : fallbackGuide?.content || [],
    topics: Array.isArray(g.topics) && g.topics.length > 0 ? g.topics : fallbackGuide?.topics || [],
    relatedArticles,
  };
}
