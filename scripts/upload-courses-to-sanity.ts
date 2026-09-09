import { createClient } from "@sanity/client";
import { COURSES_DATA } from "../src/data/courses";

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
  console.log(" Trax Jobs - Upload Courses to Sanity");
  console.log(` Project: ${projectId} | Dataset: ${dataset}`);
  console.log("=========================================\n");

  for (const course of COURSES_DATA) {
    console.log(`\nProcessing: "${course.title}"`);

    // 1. Upload thumbnail image
    let imageAssetId: string | null = null;
    try {
      imageAssetId = await downloadAndUploadImage(course.image, `${course.slug}-thumb.jpg`);
    } catch (err: any) {
      console.warn(`  Warning: Could not upload thumbnail for ${course.slug}:`, err.message);
    }

    // 2. Upload banner image (or reuse if same)
    let bannerAssetId: string | null = imageAssetId;
    if (course.bannerImage && course.bannerImage !== course.image) {
      try {
        bannerAssetId = await downloadAndUploadImage(course.bannerImage, `${course.slug}-banner.jpg`);
      } catch (err: any) {
        console.warn(`  Warning: Could not upload banner for ${course.slug}:`, err.message);
        bannerAssetId = imageAssetId;
      }
    }

    // 3. Build Sanity document
    const doc: any = {
      _id: `course-${course.slug}`,
      _type: "course",
      title: course.title,
      slug: {
        _type: "slug",
        current: course.slug,
      },
      status: "published",
      level: course.level,
      durationWeeks: course.durationWeeks,
      duration: course.duration,
      rating: course.rating,
      ratingsCount: course.ratingsCount,
      lessonsCount: course.lessonsCount,
      studentsCount: course.studentsCount,
      language: course.language || "English",
      platform: course.platform || "Web & WhatsApp",
      instructor: course.instructor,
      instructorTitle: course.instructorTitle,
      summary: course.summary,
      description: course.description,
      skills: course.skills,
      includes: course.includes,
      learningOutcomes: course.learningOutcomes,
      targetAudience: course.targetAudience,
      syllabus: course.syllabus.map((s, idx) => ({
        _key: `module-${idx + 1}`,
        moduleTitle: s.moduleTitle,
        duration: s.duration,
        lessons: s.lessons,
      })),
      certificateDetails: {
        requirement: course.certificateDetails.requirement,
        bulletPoints: course.certificateDetails.bulletPoints,
      },
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

    if (bannerAssetId) {
      doc.bannerImage = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: bannerAssetId,
        },
      };
    }

    // 4. Save to Sanity
    const result = await client.createOrReplace(doc);
    console.log(`  ✓ Published course document: ${result._id}`);
  }

  console.log("\n=========================================");
  console.log(" All courses successfully uploaded to Sanity!");
  console.log(" You can now view and edit them in Sanity Studio (/studio)");
  console.log("=========================================\n");
}

main().catch((err) => {
  console.error("Fatal error during course upload:", err);
  process.exit(1);
});
