export interface ExperienceLevelCard {
  id: string;
  title: string;
  image: string;
  alt: string;
  href: string;
  levelKey: string;
}

export const EXPERIENCE_LEVEL_CARDS: ExperienceLevelCard[] = [
  {
    id: "no-experience",
    title: "No Experience",
    image:
      "https://images.pexels.com/photos/31647492/pexels-photo-31647492.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Young creative African talent with no prior formal experience",
    href: "/jobs?level=no-experience",
    levelKey: "no-experience",
  },
  {
    id: "internship-graduate",
    title: "Internship & Graduate",
    image:
      "https://images.pexels.com/photos/4183516/pexels-photo-4183516.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Confident young African graduate in formal attire ready to start their career",
    href: "/jobs?level=internship",
    levelKey: "internship",
  },
  {
    id: "entry-level",
    title: "Entry level",
    image:
      "https://images.pexels.com/photos/36605397/pexels-photo-36605397.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Smiling African professional woman ready for entry-level tech roles",
    href: "/jobs?level=entry",
    levelKey: "entry",
  },
  {
    id: "mid-level",
    title: "Mid level",
    image:
      "https://images.pexels.com/photos/31307734/pexels-photo-31307734.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Focused African mid-level engineer and designer",
    href: "/jobs?level=mid",
    levelKey: "mid",
  },
  {
    id: "senior-level",
    title: "Senior level",
    image:
      "https://images.pexels.com/photos/37118089/pexels-photo-37118089.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Confident African senior tech leader and architect",
    href: "/jobs?level=senior",
    levelKey: "senior",
  },
  {
    id: "executive-level",
    title: "Executive level",
    image:
      "https://images.pexels.com/photos/28426641/pexels-photo-28426641.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Distinguished African executive and startup founder",
    href: "/jobs?level=executive",
    levelKey: "executive",
  },
];

/**
 * Checks whether a job matches a specified experience level category.
 * Symmetrically aligned across homepage counters and the /jobs search page.
 */
export function isJobMatchingLevel(job: any, levelKey: string): boolean {
  if (!job) return false;

  const exp = String(job.experienceLevel || "").toLowerCase();
  const contract = String(job.contractType || job.employmentType || "").toLowerCase();
  const title = String(job.title || "").toLowerCase();
  const tags = (job.tags || []).map((t: any) => String(t).toLowerCase());
  const l = levelKey.toLowerCase();

  // 1. No Experience
  if (l.includes("no-experience") || l === "no-exp") {
    return (
      contract.includes("intern") ||
      exp.includes("0-1") ||
      exp.includes("no exp") ||
      exp.includes("no-exp") ||
      title.includes("intern") ||
      title.includes("trainee") ||
      title.includes("apprentice") ||
      tags.some((t: string) => t.includes("intern"))
    );
  }

  // 2. Internship & Graduate
  if (l.includes("intern") || l.includes("graduate")) {
    return (
      contract.includes("intern") ||
      title.includes("intern") ||
      title.includes("graduate") ||
      title.includes("trainee") ||
      title.includes("apprentice") ||
      exp.includes("0-1") ||
      exp.includes("intern") ||
      exp.includes("graduate") ||
      tags.some((t: string) => t.includes("intern") || t.includes("graduate"))
    );
  }

  // 3. Entry level (0-1 or 1-3 yrs)
  if (l.includes("entry") || l === "junior") {
    return (
      exp.includes("entry") ||
      exp.includes("junior") ||
      exp.includes("0-1") ||
      exp.includes("1-3") ||
      title.includes("junior") ||
      title.includes("entry") ||
      title.includes("associate")
    );
  }

  // 4. Mid level (3-5 yrs)
  if (l.includes("mid")) {
    return (
      exp.includes("mid") ||
      exp.includes("3-5") ||
      exp.includes("intermediate") ||
      title.includes("mid-level") ||
      title.includes("mid level") ||
      title.includes("intermediate")
    );
  }

  // 5. Senior level (5-10 yrs)
  if (l.includes("senior")) {
    return (
      exp.includes("senior") ||
      exp.includes("5-10") ||
      exp.includes("lead") ||
      exp.includes("staff") ||
      title.includes("senior") ||
      title.includes("lead") ||
      title.includes("staff")
    );
  }

  // 6. Executive level (10+ yrs, Principal, Executive, Architect, Director, C-Level)
  if (l.includes("executive") || l.includes("expert") || l.includes("lead-arch")) {
    return (
      exp.includes("expert") ||
      exp.includes("10+") ||
      exp.includes("executive") ||
      exp.includes("director") ||
      exp.includes("principal") ||
      exp.includes("head") ||
      exp.includes("chief") ||
      exp.includes("vp") ||
      title.includes("executive") ||
      title.includes("director") ||
      title.includes("head of") ||
      title.includes("chief") ||
      title.includes("vp") ||
      title.includes("principal") ||
      title.includes("architect") ||
      title.includes("founder") ||
      title.includes("cto") ||
      title.includes("cpo") ||
      title.includes("ceo") ||
      title.includes("coo")
    );
  }

  return false;
}

/**
 * Calculates live job counts for each experience level card.
 */
export function calculateExperienceCounts(jobs: any[]): Record<string, number> {
  const counts: Record<string, number> = {
    "no-experience": 0,
    "internship-graduate": 0,
    "entry-level": 0,
    "mid-level": 0,
    "senior-level": 0,
    "executive-level": 0,
  };

  if (!Array.isArray(jobs) || jobs.length === 0) {
    return counts;
  }

  for (const job of jobs) {
    if (isJobMatchingLevel(job, "no-experience")) {
      counts["no-experience"] += 1;
    }
    if (isJobMatchingLevel(job, "internship")) {
      counts["internship-graduate"] += 1;
    }
    if (isJobMatchingLevel(job, "entry")) {
      counts["entry-level"] += 1;
    }
    if (isJobMatchingLevel(job, "mid")) {
      counts["mid-level"] += 1;
    }
    if (isJobMatchingLevel(job, "senior")) {
      counts["senior-level"] += 1;
    }
    if (isJobMatchingLevel(job, "executive")) {
      counts["executive-level"] += 1;
    }
  }

  return counts;
}
