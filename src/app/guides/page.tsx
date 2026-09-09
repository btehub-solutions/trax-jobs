import { fetchPublishedGuides } from "@/sanity/fetchers";
import { GUIDES_DATA, GuideArticle } from "@/data/guides";
import { mapSanityGuide } from "@/sanity/mappers";
import { GuidesClient } from "./guides-client";

export const revalidate = 60;

export default async function GuidesPage() {
  const rawGuides = await fetchPublishedGuides();

  let guides: GuideArticle[] = [];
  if (rawGuides && rawGuides.length > 0) {
    guides = rawGuides.map((g: any) => mapSanityGuide(g, rawGuides));
  } else {
    guides = GUIDES_DATA;
  }

  return <GuidesClient guides={guides} />;
}
