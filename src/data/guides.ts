export interface GuideArticle {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  breadcrumb: string;
  date: string;
  readTime: string;
  lead: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  content: {
    heading?: string;
    body: string[];
    quote?: string;
  }[];
  topics: string[];
  relatedArticles: {
    slug: string;
    title: string;
    image: string;
  }[];
}

const AUTHOR_BEN_SAM = {
  name: "Ben Sam Oladoyin",
  role: "AI/ML Engineer, Founder Trax Media Ltd",
  avatar: "/images/authors/ben-sam-oladoyin.jpg",
  linkedin: "https://www.linkedin.com/in/ben-sam-oladoyin-527966233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  twitter: "https://x.com/bensam_ola42584?s=21",
  facebook: "https://www.facebook.com/share/16KthtYMDY/?mibextid=wwXIfr",
};

export const GUIDES_DATA: GuideArticle[] = [
  {
    slug: "ace-your-tech-interview",
    title: "Ace your tech interview: How to prepare for African engineering and startup roles",
    category: "job-hunters",
    categoryLabel: "Job Hunters",
    breadcrumb: "TRAX MEDIA > CAREER GUIDES > TECHNICAL SCREENING & INTERVIEWS",
    date: "Sep 01, 2026",
    readTime: "6 mins",
    lead: "How would you describe your ideal technical evaluation? Across African startup hubs from Lagos to Nairobi, hiring leads are discarding rote memorization quizzes in favor of practical system architecture discussions and production hygiene.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200",
    author: AUTHOR_BEN_SAM,
    content: [
      {
        heading: "Mastering the system architecture round",
        body: [
          "Perhaps the most critical phase of modern software hiring is the live system design conversation. Unlike abstract whiteboard puzzles, system design tests how well you reason under real operational constraints such as network latency, database connection pooling, idempotent payment processing, and asynchronous worker queues.",
          "Engineering leaders at top African fintechs like Paystack, Flutterwave, and Moniepoint value clear trade-off analysis over memorized textbook solutions. They want to see how you reason about consistency versus availability when designing high-throughput ledger services.",
        ],
        quote: "Hiring managers are not searching for someone who knows every cloud service by heart. They want engineers who can clearly articulate why they chose PostgreSQL over DynamoDB for a high-volume financial ledger.",
      },
      {
        heading: "Production hygiene in take-home assessments",
        body: [
          "Take-home assignments remain the most common screening filter for senior and staff engineering roles. To stand out from the pool of applicants, focus on production readiness: write concise unit tests, include a lightweight Dockerfile, and document your architectural assumptions in a clean README.",
          "Treat your submission as if it were being deployed directly to staging on your first day at the company. Clear error handling and predictable API response envelopes will immediately put you in the top tier of candidates.",
        ],
      },
      {
        heading: "Navigating behavioral alignment and founder discussions",
        body: [
          "Startup founders and engineering directors want to understand how you collaborate across product managers, designers, and customer operations teams. Frame your past achievements around tangible business outcomes rather than code syntax alone.",
          "When asked about past project hurdles, share authentic reflections on post-mortems and preventative automated tests. That candor demonstrates seasoned seniority and execution maturity.",
        ],
      },
    ],
    topics: ["Technical Interviews", "System Design", "FinTech Engineering", "African Startups"],
    relatedArticles: [
      {
        slug: "follow-african-hiring-trends",
        title: "Follow African hiring trends: Where tech jobs are growing in 2026",
        image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "apply-effectively-land-offers",
        title: "Apply effectively & land offers: How to stand out to international hiring managers",
        image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "hybrid-remote-work-negotiation",
        title: "Hybrid work goals: How to nail the negotiation in your next job interview",
        image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "hire-engineers-without-noise",
        title: "Hire engineers without noise: Modern technical evaluation frameworks for founders",
        image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "negotiating-equity-usd-contracts",
        title: "Negotiating equity & USD contracts: Senior leadership playbook for African engineers",
        image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
  {
    slug: "follow-african-hiring-trends",
    title: "Follow African hiring trends: Where tech jobs are growing in 2026",
    category: "job-hunters",
    categoryLabel: "Job Hunters",
    breadcrumb: "TRAX MEDIA > ECOSYSTEM RESEARCH > HIRING & COMPENSATION",
    date: "Aug 28, 2026",
    readTime: "7 mins",
    lead: "From payment infrastructure in Lagos to cross-border logistics and AI automation across African tech hubs, the talent landscape is undergoing a structural shift. Here is where venture-backed companies are investing in engineering and product headcount.",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200",
    author: AUTHOR_BEN_SAM,
    content: [
      {
        heading: "The rise of specialized platform and backend engineering",
        body: [
          "Generalist frontend roles are rapidly augmenting with backend systems, distributed architectures, and cloud operations. Startups are demanding engineers who can manage Docker containers, write serverless workers, and configure database connection pooling independently.",
          "High-growth companies are consolidating technical stacks around TypeScript, Go, Python, and robust relational databases capable of handling complex transaction volumes.",
        ],
        quote: "Startups are prioritizing engineers who understand operational infrastructure from day one rather than siloed UI developers.",
      },
      {
        heading: "Compensation benchmarks: USD indexation and equity packages",
        body: [
          "Given macro currency movements across emerging markets, senior engineers and technical leads are increasingly structuring hybrid compensation models. Packages often combine local currency living stipends with USD-denominated performance bonuses or 4-year equity vesting schedules.",
        ],
      },
      {
        heading: "Regional expansion hubs beyond Lagos",
        body: [
          "While Lagos remains Nigeria's commercial epicenter, technical hubs in Ogun State, Ibadan, Abuja, and Kigali are emerging as strong centers for software engineering talent, powered by high-speed fiber infrastructure and lower cost of living.",
        ],
      },
    ],
    topics: ["Hiring Trends", "Compensation Data", "FinTech", "African Ecosystem"],
    relatedArticles: [
      {
        slug: "ace-your-tech-interview",
        title: "Ace your tech interview: How to prepare for African engineering and startup roles",
        image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "apply-effectively-land-offers",
        title: "Apply effectively & land offers: How to stand out to international hiring managers",
        image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "hybrid-remote-work-negotiation",
        title: "Hybrid work goals: How to nail the negotiation in your next job interview",
        image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "break-into-tech-campus-guide",
        title: "Break into tech from campus & beyond: Roadmap for student developers",
        image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "hire-engineers-without-noise",
        title: "Hire engineers without noise: Modern technical evaluation frameworks for founders",
        image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
  {
    slug: "apply-effectively-land-offers",
    title: "Apply effectively & land offers: How to stand out to international hiring managers",
    category: "job-hunters",
    categoryLabel: "Job Hunters",
    breadcrumb: "TRAX MEDIA > CAREER PLAYBOOKS > PORTFOLIO & DIRECT OUTREACH",
    date: "Aug 24, 2026",
    readTime: "5 mins",
    lead: "Sending hundreds of generic resumes into automated job application portals rarely yields top-tier offers. Here is how African software engineers, designers, and product leaders build authoritative case studies that attract direct founder outreach.",
    image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1200",
    author: AUTHOR_BEN_SAM,
    content: [
      {
        heading: "Highlight measurable business impact over code syntax",
        body: [
          "Recruiters and hiring managers review dozens of candidate profiles daily. When your case study highlights concrete metrics like 'Architected background queue workers, reducing payment checkout drop-off by 28%' instead of 'Wrote backend scripts', your profile immediately moves to the priority shortlist.",
          "Frame every project around the problem statement, technical constraints, architectural solution, and measurable production outcome.",
        ],
        quote: "The best engineering portfolios demonstrate business judgment alongside technical craftsmanship.",
      },
      {
        heading: "Optimizing your Trax Talent Profile for direct founder discovery",
        body: [
          "Direct talent platforms allow candidates to bypass intermediary recruitment gatekeepers. Maintain an updated portfolio link, highlight your core production stack, and declare your preferred contact method clearly.",
        ],
      },
      {
        heading: "Effective communication during interview loops",
        body: [
          "Prompt follow-ups, structured answers using clear problem-action-result frameworks, and thoughtful questions regarding the company's product roadmap signal senior ownership from the very first screening call.",
        ],
      },
    ],
    topics: ["Portfolio Optimization", "Resume Strategy", "Direct Hiring", "Remote Tech Roles"],
    relatedArticles: [
      {
        slug: "ace-your-tech-interview",
        title: "Ace your tech interview: How to prepare for African engineering and startup roles",
        image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "follow-african-hiring-trends",
        title: "Follow African hiring trends: Where tech jobs are growing in 2026",
        image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "hybrid-remote-work-negotiation",
        title: "Hybrid work goals: How to nail the negotiation in your next job interview",
        image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "negotiating-equity-usd-contracts",
        title: "Negotiating equity & USD contracts: Senior leadership playbook for African engineers",
        image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "break-into-tech-campus-guide",
        title: "Break into tech from campus & beyond: Roadmap for student developers",
        image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
  {
    slug: "hybrid-remote-work-negotiation",
    title: "Hybrid work goals: How to nail the negotiation in your next job interview",
    category: "job-hunters",
    categoryLabel: "Job Hunters",
    breadcrumb: "TRAX MEDIA > CAREER GUIDES > WORKPLACE FLEXIBILITY & REMOTE WORK",
    date: "Aug 20, 2026",
    readTime: "5 mins",
    lead: "How do you strike the ideal balance between in-person collaboration and uninterrupted remote deep work? Here is how to negotiate flexible work arrangements constructively during the interview and offer stages.",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200",
    author: AUTHOR_BEN_SAM,
    content: [
      {
        heading: "Is hybrid work a negotiable perk?",
        body: [
          "Across tech companies with headquarters in major African cities, traffic congestion and commute fatigue directly impact developer productivity. Structured hybrid schedules that dedicate 2 to 3 days to quiet asynchronous building benefit both employees and startup velocity.",
          "When approaching the conversation, frame your request around sprint focus blocks, milestone delivery, and documented code reviews.",
        ],
        quote: "Position remote flexibility as a framework for higher sprint velocity and uninterrupted deep work.",
      },
      {
        heading: "Establishing reliable remote work infrastructure",
        body: [
          "Hiring managers look for assurance that remote candidates have dedicated power backup solutions, high-speed fiber internet, and professional communication hygiene across Slack and GitHub.",
        ],
      },
    ],
    topics: ["Remote Work", "Interview Negotiation", "Productivity", "Workplace Culture"],
    relatedArticles: [
      {
        slug: "ace-your-tech-interview",
        title: "Ace your tech interview: How to prepare for African engineering and startup roles",
        image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "follow-african-hiring-trends",
        title: "Follow African hiring trends: Where tech jobs are growing in 2026",
        image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "apply-effectively-land-offers",
        title: "Apply effectively & land offers: How to stand out to international hiring managers",
        image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "hire-engineers-without-noise",
        title: "Hire engineers without noise: Modern technical evaluation frameworks for founders",
        image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "negotiating-equity-usd-contracts",
        title: "Negotiating equity & USD contracts: Senior leadership playbook for African engineers",
        image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
  {
    slug: "hire-engineers-without-noise",
    title: "Hire engineers without noise: Modern technical evaluation frameworks for founders",
    category: "decision-makers",
    categoryLabel: "Founders & Recruiters",
    breadcrumb: "TRAX MEDIA > FOUNDER PLAYBOOKS > TECHNICAL HIRING & EVALUATION",
    date: "Aug 15, 2026",
    readTime: "6 mins",
    lead: "Building a world-class engineering team requires evaluating candidates fairly while keeping hiring pipelines fast and lean. Here is how founders and CTOs assess technical talent without drowning in noisy applications.",
    image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200",
    author: AUTHOR_BEN_SAM,
    content: [
      {
        heading: "Replace algorithmic puzzles with real-world pair programming",
        body: [
          "Rote algorithm challenges test memorization rather than how an engineer handles production bugs or writes clean, extensible code. Replacing whiteboard quizzes with a 45-minute practical pairing session on your actual codebase yields dramatically higher signal.",
          "Observe how the candidate navigates unfamiliar code, formulates questions, and uses automated debugging tools under real-world conditions.",
        ],
        quote: "Evaluate how an engineer handles ambiguity and communicates architectural trade-offs, not how fast they can invert a binary tree on a whiteboard.",
      },
      {
        heading: "Streamlining the hiring funnel to prevent talent drop-off",
        body: [
          "Top engineers rarely stay on the market for more than two weeks. Structuring your interview process into three concise stages (screening, practical architecture pairing, founder cultural sync) ensures you secure high-caliber talent before competitors do.",
        ],
      },
    ],
    topics: ["Engineering Management", "CTO Playbooks", "Technical Hiring", "Team Scaling"],
    relatedArticles: [
      {
        slug: "ace-your-tech-interview",
        title: "Ace your tech interview: How to prepare for African engineering and startup roles",
        image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "follow-african-hiring-trends",
        title: "Follow African hiring trends: Where tech jobs are growing in 2026",
        image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "negotiating-equity-usd-contracts",
        title: "Negotiating equity & USD contracts: Senior leadership playbook for African engineers",
        image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "apply-effectively-land-offers",
        title: "Apply effectively & land offers: How to stand out to international hiring managers",
        image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "break-into-tech-campus-guide",
        title: "Break into tech from campus & beyond: Roadmap for student developers",
        image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
  {
    slug: "break-into-tech-campus-guide",
    title: "Break into tech from campus & beyond: Roadmap for student developers",
    category: "students",
    categoryLabel: "Students & Interns",
    breadcrumb: "TRAX MEDIA > EARLY CAREER > CAMPUS TO STARTUP ROADMAP",
    date: "Aug 10, 2026",
    readTime: "6 mins",
    lead: "A practical, step-by-step roadmap for Nigerian university students and self-taught developers in Ogun State and across Africa looking to secure their first paid software engineering role.",
    image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1200",
    author: AUTHOR_BEN_SAM,
    content: [
      {
        heading: "Build and deploy full-stack production projects",
        body: [
          "Tutorial clones of todo apps or simple weather widgets no longer impress hiring managers. Instead, build full-stack web applications that solve tangible problems: a local merchant invoice generator, an SMS notification service for campus events, or a light fintech utility with automated webhooks.",
          "Host your projects live on platforms like Vercel or Railway with a custom domain and well-documented open-source GitHub repository.",
        ],
        quote: "One live, production-deployed application with genuine users is worth twenty half-finished tutorial repositories.",
      },
      {
        heading: "Participating in local tech communities and open source",
        body: [
          "Join active developer communities across Nigerian tech hubs, contribute documentation and bug fixes to open-source libraries, and attend local meetups to build meaningful peer networks.",
        ],
      },
    ],
    topics: ["Junior Developers", "Early Career", "Open Source", "Internships"],
    relatedArticles: [
      {
        slug: "ace-your-tech-interview",
        title: "Ace your tech interview: How to prepare for African engineering and startup roles",
        image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "apply-effectively-land-offers",
        title: "Apply effectively & land offers: How to stand out to international hiring managers",
        image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "follow-african-hiring-trends",
        title: "Follow African hiring trends: Where tech jobs are growing in 2026",
        image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "hire-engineers-without-noise",
        title: "Hire engineers without noise: Modern technical evaluation frameworks for founders",
        image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "negotiating-equity-usd-contracts",
        title: "Negotiating equity & USD contracts: Senior leadership playbook for African engineers",
        image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
  {
    slug: "negotiating-equity-usd-contracts",
    title: "Negotiating equity & USD contracts: Senior leadership playbook for African engineers",
    category: "experienced",
    categoryLabel: "Senior Engineers",
    breadcrumb: "TRAX MEDIA > LEADERSHIP > EXECUTIVE COMPENSATION & CONTRACTS",
    date: "Aug 04, 2026",
    readTime: "8 mins",
    lead: "What senior software architects, staff engineers, and tech leads should understand about equity vesting schedules, stock option pools, and USD hedging contracts across international startup roles.",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
    author: AUTHOR_BEN_SAM,
    content: [
      {
        heading: "Deconstructing equity grants: RSUs vs Stock Options",
        body: [
          "Understanding the difference between Restricted Stock Units (RSUs) and Incentive Stock Options (ISOs) is essential when evaluating senior offers from Series A, B, and global tech teams. Clarify exercise windows, strike prices, and 4-year vesting schedules with a standard 1-year cliff.",
          "Ask direct questions regarding the company's latest valuation, fully diluted share count, and liquidation preferences to properly assess the real value of your equity package.",
        ],
        quote: "Never evaluate an equity offer in percentage points alone. Always request the current valuation, share count, and strike price.",
      },
      {
        heading: "Structuring tax-efficient international remote contracts",
        body: [
          "Senior engineers working remotely for US or European startups should evaluate corporate entity structures, dual-currency banking, and compliant international contractor invoicing.",
        ],
      },
    ],
    topics: ["Senior Leadership", "Equity Compensation", "USD Contracts", "Staff Engineering"],
    relatedArticles: [
      {
        slug: "ace-your-tech-interview",
        title: "Ace your tech interview: How to prepare for African engineering and startup roles",
        image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "follow-african-hiring-trends",
        title: "Follow African hiring trends: Where tech jobs are growing in 2026",
        image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "hire-engineers-without-noise",
        title: "Hire engineers without noise: Modern technical evaluation frameworks for founders",
        image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "apply-effectively-land-offers",
        title: "Apply effectively & land offers: How to stand out to international hiring managers",
        image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        slug: "hybrid-remote-work-negotiation",
        title: "Hybrid work goals: How to nail the negotiation in your next job interview",
        image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
];
