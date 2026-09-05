export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

export interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
}

const PEXELS_API_URL = "https://api.pexels.com/v1";

export async function searchPexelsPhotos(
  query: string,
  perPage: number = 10,
  page: number = 1
): Promise<PexelsPhoto[]> {
  const apiKey =
    process.env.PEXELS_API_KEY ||
    process.env.NEXT_PUBLIC_PEXELS_API_KEY;

  if (!apiKey) {
    console.warn("PEXELS_API_KEY is not configured in .env.local");
    return [];
  }

  try {
    const res = await fetch(
      `${PEXELS_API_URL}/search?query=${encodeURIComponent(
        query
      )}&per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: apiKey,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(`Pexels API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: PexelsSearchResponse = await res.json();
    return data.photos || [];
  } catch (error) {
    console.error("Failed to fetch photos from Pexels API:", error);
    return [];
  }
}
