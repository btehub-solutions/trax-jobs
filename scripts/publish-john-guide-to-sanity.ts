import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Error: Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

async function main() {
  console.log("Uploading John Kent-Adebayo's guide to Sanity Studio...");

  const imagePath = path.resolve(process.cwd(), "public/images/authors/john-kent-adebayo.png");
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Author image file not found at: ${imagePath}`);
  }

  const imageBuffer = fs.readFileSync(imagePath);
  console.log("Uploading image asset to Sanity...");
  const asset = await client.assets.upload("image", imageBuffer, {
    filename: "john-kent-adebayo.png",
    contentType: "image/png",
  });
  console.log(`Asset uploaded successfully with ID: ${asset._id}`);

  const doc = {
    _id: "guide-everyone-can-be-digitally-trained",
    _type: "guide",
    title: "Everyone can be digitally trained. Not everyone should be a techie",
    slug: {
      _type: "slug",
      current: "everyone-can-be-digitally-trained",
    },
    status: "published",
    category: "students",
    categoryLabel: "Career Direction",
    tagline: "Why personal strengths matter more than trending salaries",
    breadcrumb: "TRAX MEDIA > CAREER GUIDES > SKILL SELECTION",
    date: "Oct 17, 2026",
    readTime: "5 min read",
    lead: "Every few months someone asks me which tech skill pays the most. It is the wrong first question, and I learnt that the slow way. Digital skills like spreadsheets and online tools belong to everyone now, but becoming a techie who builds, designs, or manages technology is a deliberate choice that must stem from what you are naturally good at, not whatever is trending on social media.",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
      hotspot: {
        x: 0.5,
        y: 0.45,
        height: 0.8,
        width: 0.8,
      },
    },
    author: {
      name: "John Kent-Adebayo",
      role: "Head of Product at Notch Software & Program Manager at ATB Tech Hub",
      avatarImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
        hotspot: {
          x: 0.5,
          y: 0.35,
          height: 0.6,
          width: 0.6,
        },
      },
      avatar: "/images/authors/john-kent-adebayo.png",
    },
    content: [
      {
        _key: "sec-1",
        heading: "I tried almost everything first",
        body: [
          "My own path into tech was not a straight line. I started with networking. Then I tried mobile app development. I did social media management. I moved into UI/UX design, and that was where I first got paid for tech work.",
          "None of it was wasted. But somewhere along the line I noticed what I was actually good at: selling, conversion, figuring out why people use a product and why they stop. That pushed me into growth, and growth pushed me into product management. Today I lead product at Notch Software.",
        ],
        quote: "If someone had asked me at the start what I was good at, instead of what was trending, I would have saved a few years.",
      },
      {
        _key: "sec-2",
        heading: "Tech is not one job",
        body: [
          "When people say \"I want to go into tech\", they usually mean coding. But a product needs people who can design it, test it, sell it, support it, read its data and decide what to build next. Many of those roles need very little code.",
          "Picking a path because someone on Twitter is making money from it is how people end up three months into a course they hate. Many start. Fewer finish.",
        ],
      },
      {
        _key: "sec-3",
        heading: "A week before anyone picks",
        body: [
          "In every tech training programme I have run, from Africa Trainovation Consulting to ATB Tech Hub today, I have kept one habit: nobody locks in a track on day one.",
          "The first week is orientation. We explain each track in plain language: what the work looks like on a normal Tuesday, what kind of person tends to enjoy it, and what it takes to get a first job in it. Then people are free to switch.",
          "Many do. Whatever track is trending usually gets the most sign-ups; right now that is data analytics. After orientation, some of those people realise they would rather design, or test, or manage a product. Changing your mind in week one is cheap. Changing it after three months is not.",
          "Demola walked into Africa Trainovation Consulting straight out of secondary school. His uncle had told him to go and learn a tech skill, and he arrived sure it would be data analytics. During orientation week I watched how he worked through problems and asked him a lot of questions. It was clear software development suited him better. He took the assessment, switched tracks, and never looked back. Before I left ATC he was an intern and then a facilitator, teaching the people who came after him. Today he is a developer on NotchCRM at Notch Software, the company where I work.",
        ],
        quote: "Changing your mind in week one is cheap. Changing it after three months is not.",
      },
      {
        _key: "sec-4",
        heading: "Four questions before you pick a skill",
        body: [
          "If you are trying to choose, here is what I tell people:",
          "1. What do people already come to you for? Fixing their phones, explaining things, organising events, arguing with data? That is a clue.",
          "2. Do you enjoy the problem, or just the salary? Every tech job has boring parts. You need to like the work enough to sit through them.",
          "3. Can you practise it with what you have? Some skills need a strong laptop. Some can start on a phone. Be honest about your setup.",
          "4. Who will you learn with? People who learn alone quit more. Find a community, a hub, or even two friends going the same way.",
        ],
      },
      {
        _key: "sec-5",
        heading: "Start early, start honest",
        body: [
          "I still tell young people that tech is a good place to be, and that the earlier you start, the better. But start honest. Look at your strengths and weaknesses before you look at the job adverts.",
          "John Kent-Adebayo is Head of Product at Notch Software, founder of Savey Africa, and Program Manager at ATB Tech Hub, Abeokuta.",
        ],
        quote: "The goal is not to become a techie. The goal is to find the place in tech where you will actually thrive, and then go hard at it.",
      },
    ],
    topics: [
      "Career Orientation",
      "Digital Skills",
      "Product Management",
      "ATB Tech Hub",
      "Tech Transitions",
      "Abeokuta Tech",
    ],
  };

  console.log("Saving guide document to Sanity...");
  const result = await client.createOrReplace(doc);
  console.log("Guide published successfully! Document ID:", result._id);
}

main().catch((err) => {
  console.error("Error creating guide in Sanity:", err);
  process.exit(1);
});
