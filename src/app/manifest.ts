import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trax Jobs: African Tech Opportunities",
    short_name: "Trax Jobs",
    description: "Curated tech opportunities and elite talent from Ogun State and across Africa.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C1222",
    theme_color: "#0C1222",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
