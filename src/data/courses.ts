export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  level: "All Levels" | "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  durationWeeks: string;
  image: string;
  bannerImage: string;
  rating: number;
  ratingsCount: number;
  lessonsCount: number;
  studentsCount: string;
  language: string;
  platform: string;
  instructor: string;
  instructorTitle: string;
  summary: string;
  description: string;
  skills: string[];
  includes: string[];
  learningOutcomes: string[];
  targetAudience: string[];
  syllabus: {
    moduleTitle: string;
    duration: string;
    lessons: string[];
  }[];
  certificateDetails: {
    requirement: string;
    bulletPoints: string[];
  };
  enrollmentLink?: string;
  whatsappNumber?: string;
}

export const COURSES_DATA: CourseDetail[] = [
  {
    id: "course-1",
    slug: "product-management-growth-african-startups",
    title: "Product Management & Growth for African Startups (Video Course)",
    level: "All Levels",
    duration: "4h 30m",
    durationWeeks: "6 Weeks",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
    bannerImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    ratingsCount: 64,
    lessonsCount: 10,
    studentsCount: "18,920",
    language: "English",
    platform: "Web & WhatsApp",
    instructor: "Trax Product Council",
    instructorTitle: "Venture Product Leads & Growth Strategists",
    summary: "Master product discovery, customer validation, retention loops, and unit economics tailored to high-growth African tech startups.",
    description: "Master end-to-end product discovery, user retention loops, and unit economics tailored to African markets. You will learn to validate market demand, build data-informed roadmaps, and scale digital products from MVP to product-market fit.",
    skills: ["Product Strategy", "User Research", "Metrics & Retention", "Unit Economics", "Roadmap Execution"],
    includes: [
      "Shareable certificate of completion",
      "Access on web, and mobile",
      "100% online course",
      "Downloadable PRD templates and market sizing frameworks",
      "Access to Trax Product Mentorship Circle",
    ],
    learningOutcomes: [
      "Conduct customer discovery interviews that uncover real willingness to pay in African markets",
      "Define North Star metrics, activation funnels, and retention cohort analyses",
      "Calculate CAC, LTV, and payback periods for sustainable unit economics",
      "Lead cross-functional engineering and design sprints with high execution velocity",
    ],
    targetAudience: [
      "Aspiring and practicing Product Managers across Nigeria and Africa",
      "Startup founders looking to achieve sustainable product-market fit",
      "Engineers and designers transitioning into technical product management",
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Market Validation & Opportunity Sizing",
        duration: "45 mins",
        lessons: [
          "Understanding customer friction in emerging digital economies",
          "Problem validation vs solution validation",
          "Running lean customer discovery sprints",
        ],
      },
      {
        moduleTitle: "Module 2: Defining Value & MVP Scoping",
        duration: "1h 10 mins",
        lessons: [
          "Scoping minimal viable products without over-engineering",
          "Writing actionable PRDs and user stories",
          "Prioritisation frameworks: RICE vs Kano in practice",
        ],
      },
      {
        moduleTitle: "Module 3: Growth Loops, Metrics & Retention",
        duration: "1h 15 mins",
        lessons: [
          "Building sticky onboarding and activation flows",
          "Cohort analysis, churn diagnosis, and retention curves",
          "Unit economics: LTV:CAC ratios and payback velocity",
        ],
      },
      {
        moduleTitle: "Module 4: Scaling & Cross-Functional Leadership",
        duration: "1h 20 mins",
        lessons: [
          "Managing engineering trade-offs and tech debt",
          "Stakeholder communication and executive roadmapping",
          "Post-launch experimentation and continuous discovery",
        ],
      },
    ],
    certificateDetails: {
      requirement: "To successfully complete this Certificate course, you need to achieve 80% or higher in each course assessment.",
      bulletPoints: [
        "Ideal for sharing with potential employers and showcasing on LinkedIn",
        "Include it in your CV, professional social media profiles, and Trax Talent Profile",
        "An authentic indication of your verified practical product management proficiency",
        "An incentive for continuous learning and leadership in African technology",
      ],
    },
  },
  {
    id: "course-2",
    slug: "fintech-engineering-payment-systems",
    title: "FinTech Engineering & High-Scale Payment Systems (Video Course)",
    level: "Intermediate",
    duration: "5h 45m",
    durationWeeks: "8 Weeks",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    bannerImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 5.0,
    ratingsCount: 92,
    lessonsCount: 14,
    studentsCount: "24,150",
    language: "English",
    platform: "Web & WhatsApp",
    instructor: "FinTech Systems Advisory",
    instructorTitle: "Principal Payments Engineers & Switch Architects",
    summary: "Architect zero-downtime payment switches, double-entry settlement ledgers, banking integrations, and resilient transaction processing pipelines.",
    description: "Learn the architectural fundamentals powering Africa's leading payment switches and digital banks. Master double-entry settlement ledgers, idempotent transaction processing, bank rail integrations, and zero-downtime database migrations.",
    skills: ["Payment Switches", "Double-Entry Ledgers", "Idempotency", "Kafka & Event Streams", "PostgreSQL ACID"],
    includes: [
      "Shareable certificate of completion",
      "Access on web, and mobile",
      "100% online course",
      "Production-grade ledger blueprints and transaction worker codebases",
      "Direct code reviews from veteran FinTech engineers",
    ],
    learningOutcomes: [
      "Design double-entry accounting ledgers with strict mathematical balancing",
      "Implement idempotent API endpoints with distributed locks in Redis",
      "Integrate Nigerian interbank settlement rails (NIBSS, direct debits, virtual accounts)",
      "Execute safe zero-downtime database schema migrations on high-volume tables",
    ],
    targetAudience: [
      "Backend developers aiming for Senior / Staff Engineer roles in FinTech",
      "Software architects designing multi-currency banking and payment platforms",
      "Engineers working with high concurrency and mission-critical financial transactions",
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Idempotency & Transaction Safety",
        duration: "1h 15 mins",
        lessons: [
          "Idempotency keys, duplicate request prevention, and distributed mutexes",
          "ACID guarantees, isolation levels, and race condition elimination in PostgreSQL",
        ],
      },
      {
        moduleTitle: "Module 2: Double-Entry Ledger Architecture",
        duration: "1h 30 mins",
        lessons: [
          "Chart of accounts, debit/credit balancing, and immutable audit logs",
          "Handling pending authorizations and multi-currency exchange rates",
        ],
      },
      {
        moduleTitle: "Module 3: Kafka Stream Processing & Switch Reconciliation",
        duration: "1h 40 mins",
        lessons: [
          "Partitioning strategies, consumer groups, and exactly-once processing",
          "Building automated batch settlement and switch reconciliation pipelines",
        ],
      },
      {
        moduleTitle: "Module 4: Zero-Downtime Operations & Chaos Testing",
        duration: "1h 20 mins",
        lessons: [
          "Expand-and-contract pattern for live database schema migrations",
          "Chaos engineering: simulating switch timeouts and bank rail outages",
        ],
      },
    ],
    certificateDetails: {
      requirement: "To successfully complete this Certificate course, you need to achieve 80% or higher in each course assessment.",
      bulletPoints: [
        "Ideal for sharing with leading fintech companies (Paystack, Flutterwave, Moniepoint, Interswitch)",
        "Include it in your CV, professional social media profiles, and Trax Talent Profile",
        "Proves verified mastery of mission-critical payments infrastructure",
        "An incentive for continuous high-level technical excellence",
      ],
    },
  },
  {
    id: "course-3",
    slug: "full-stack-engineering-cloud-systems",
    title: "Full-Stack Engineering & Cloud Systems (Video Course)",
    level: "All Levels",
    duration: "5h 15m",
    durationWeeks: "8 Weeks",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    bannerImage: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    ratingsCount: 78,
    lessonsCount: 12,
    studentsCount: "21,340",
    language: "English",
    platform: "Web & WhatsApp",
    instructor: "Trax Engineering Guild",
    instructorTitle: "Staff Software Engineers & Cloud Architects",
    summary: "Build high-performance web applications using modern TypeScript, Next.js, Node.js, PostgreSQL, and scalable cloud deployments on AWS.",
    description: "Build production-ready web applications using modern TypeScript, Next.js, and PostgreSQL. You will learn to design resilient REST and GraphQL APIs, implement secure authentication, and deploy scalable cloud infrastructure on AWS.",
    skills: ["TypeScript", "Next.js & React", "PostgreSQL", "REST & GraphQL", "Docker & AWS"],
    includes: [
      "Shareable certificate of completion",
      "Access on web, and mobile",
      "100% online course",
      "Full-stack starter boilerplates with auth, database, and CI/CD",
      "WhatsApp community and live Q&A sessions",
    ],
    learningOutcomes: [
      "Architect clean, type-safe full-stack applications with TypeScript and Next.js",
      "Design normalized relational databases with Prisma, Drizzle, and PostgreSQL",
      "Implement robust session authentication, JWTs, and Role-Based Access Control (RBAC)",
      "Deploy containerized microservices to cloud platforms with automated CI/CD pipelines",
    ],
    targetAudience: [
      "Developers looking to upgrade from basic frontend or backend to complete full-stack mastery",
      "Engineers preparing for high-paying remote global roles from Africa",
      "Technical founders building their own web applications from scratch",
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Type-Safe Full-Stack Architecture",
        duration: "1h 10 mins",
        lessons: [
          "Advanced TypeScript patterns for backend and UI shared types",
          "Next.js App Router, Server Components, and Server Actions",
          "Optimistic UI updates and state management",
        ],
      },
      {
        moduleTitle: "Module 2: Database Modeling & Scalable Queries",
        duration: "1h 20 mins",
        lessons: [
          "Relational data modeling, foreign keys, and indexes in PostgreSQL",
          "Connection pooling, query optimization, and transaction safety",
          "Database migrations and schema evolution",
        ],
      },
      {
        moduleTitle: "Module 3: Security, Authentication & APIs",
        duration: "1h 15 mins",
        lessons: [
          "OAuth2, magic links, session management, and CSRF protection",
          "Rate limiting, request validation with Zod, and error handling",
          "Webhooks, asynchronous background jobs, and worker queues",
        ],
      },
      {
        moduleTitle: "Module 4: Containerization & Cloud Deployment",
        duration: "1h 30 mins",
        lessons: [
          "Docker multi-stage builds and container optimization",
          "Setting up CI/CD with GitHub Actions and automated test runners",
          "Deploying to AWS ECS, Vercel, and configuring CDN caching",
        ],
      },
    ],
    certificateDetails: {
      requirement: "To successfully complete this Certificate course, you need to achieve 80% or higher in each course assessment.",
      bulletPoints: [
        "Ideal for sharing with recruiters and engineering hiring managers globally",
        "Include it in your CV, professional social media profiles, and Trax Talent Profile",
        "Validates your end-to-end full-stack software development competency",
        "An incentive for continuous high-level technical craftsmanship",
      ],
    },
  },
  {
    id: "course-4",
    slug: "applied-ai-business-automation-tech-leads",
    title: "Applied AI & Business Automation for Tech Leads (Video Course)",
    level: "Beginner",
    duration: "3h 50m",
    durationWeeks: "4 Weeks",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800",
    bannerImage: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    ratingsCount: 81,
    lessonsCount: 8,
    studentsCount: "15,800",
    language: "English",
    platform: "Web & WhatsApp",
    instructor: "Automation & Operations Advisory",
    instructorTitle: "Lead Systems & Workflow Automation Architect",
    summary: "Transform operational throughput using AI workflow orchestrations, webhook integrations, autonomous customer bots, and intelligent document parsing.",
    description: "A practical playbook for integrating generative AI and automated workflows into daily business operations. Learn to automate document extraction, build custom WhatsApp customer agents, and streamline operational pipelines with zero manual data entry.",
    skills: ["Workflow Automation", "LLM Integrations", "Python & Webhooks", "OCR Document Parsing", "WhatsApp Bot APIs"],
    includes: [
      "Shareable certificate of completion",
      "Access on web, and mobile",
      "100% online course",
      "Downloadable workflow templates and automation scripts",
      "WhatsApp study group and troubleshooting forum",
    ],
    learningOutcomes: [
      "Connect disparate business apps using webhooks, REST APIs, and automation engines",
      "Process unstructured invoices, banking receipts, and PDFs into structured database records",
      "Build interactive WhatsApp bots that resolve customer requests automatically",
      "Monitor error logs and build automatic self-healing fallback loops",
    ],
    targetAudience: [
      "Operations managers and startup generalists looking to 10x team efficiency",
      "Developers building backend integrations and webhook workers",
      "Freelancers offering automation services to international clients",
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Webhook Architecture & API Fundamentals",
        duration: "45 mins",
        lessons: [
          "Understanding HTTP triggers, payloads, and authentication headers",
          "Designing resilient webhook receivers with signature verification",
        ],
      },
      {
        moduleTitle: "Module 2: AI Document Processing & OCR Pipelines",
        duration: "1h 15 mins",
        lessons: [
          "Parsing invoices, banking receipts, and scanned PDFs with LLM extractors",
          "Extracting structured JSON from unstructured text reliably",
        ],
      },
      {
        moduleTitle: "Module 3: Building WhatsApp & Omnichannel Bots",
        duration: "1h 00 mins",
        lessons: [
          "WhatsApp Cloud API integration and conversational state management",
          "Escalating complex chats to human agents seamlessly",
        ],
      },
      {
        moduleTitle: "Module 4: Enterprise Reliability & Monitoring",
        duration: "50 mins",
        lessons: [
          "Retry mechanisms, exponential backoff, and dead-letter queues",
          "Real-time alerting via Slack and Telegram for failed webhooks",
        ],
      },
    ],
    certificateDetails: {
      requirement: "To successfully complete this Certificate course, you need to achieve 80% or higher in each course assessment.",
      bulletPoints: [
        "Ideal for sharing with potential employers and consulting clients",
        "Include it in your CV, professional social media profiles, and Trax Talent Profile",
        "Validates your ability to streamline business processes with tangible ROI",
        "An incentive for continuous career development in automation engineering",
      ],
    },
  },
];
