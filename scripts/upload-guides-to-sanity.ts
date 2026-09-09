import { createClient } from "@sanity/client";
import { GUIDES_DATA } from "../src/data/guides";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Error: Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in environment.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

async function downloadAndUploadImage(url: string, filename: string): Promise<string> {
  console.log(`  Downloading image from ${url.substring(0, 60)}...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image from ${url}: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log(`  Uploading asset: ${filename}...`);
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: response.headers.get("content-type") || "image/jpeg",
  });
  return asset._id;
}

async function main() {
  console.log("=========================================");
  console.log(" Trax Jobs - Upload Guides to Sanity");
  console.log(` Project: ${projectId} | Dataset: ${dataset}`);
  console.log("=========================================\n");

  for (const guide of GUIDES_DATA) {
    console.log(`\nProcessing: "${guide.title}"`);

    // 1. Upload header / card image
    let imageAssetId: string | null = null;
    try {
      imageAssetId = await downloadAndUploadImage(guide.image, `${guide.slug}.jpg`);
    } catch (err: any) {
      console.warn(`  Warning: Could not upload image for ${guide.slug}:`, err.message);
    }

    // 2. Build Sanity document
    const doc: any = {
      _id: `guide-${guide.slug}`,
      _type: "guide",
      title: guide.title,
      slug: {
        _type: "slug",
        current: guide.slug,
      },
      status: "published",
      category: guide.category,
      categoryLabel: guide.categoryLabel,
      tagline: guide.title.includes(":") ? guide.title.split(":")[1].trim() : guide.title,
      breadcrumb: guide.breadcrumb,
      date: guide.date,
      readTime: guide.readTime,
      lead: guide.lead,
      author: guide.author,
      content: guide.content.map((sec, idx) => ({
        _key: `sec-${idx + 1}`,
        heading: sec.heading || "",
        body: sec.body || [],
        quote: sec.quote || undefined,
      })),
      topics: guide.topics || [],
    };

    if (imageAssetId) {
      doc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAssetId,
        },
      };
    }

    // 3. Save to Sanity
    const result = await client.createOrReplace(doc);
    console.log(`  ✓ Published guide document: ${result._id}`);
  }

  console.log("\n=========================================");
  console.log(" All guides successfully uploaded to Sanity!");
  console.log(" You can now view and edit them in Sanity Studio (/studio)");
  console.log("=========================================\n");
}

main().catch((err) => {
  console.error("Fatal error during guide upload:", err);
  process.exit(1);
});
