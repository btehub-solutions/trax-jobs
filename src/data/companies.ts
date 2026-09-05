export interface CompanyItem {
  id: string;
  name: string;
  slug: string;
  logo: string;
  industry: string;
  location: string;
  employeesCount: string;
  coverImage?: string;
  accentColor?: string;
  bio: string;
  openJobsCount: number;
  verified: boolean;
}

export const SAMPLE_COMPANIES: CompanyItem[] = [
  {
    id: "comp-1",
    name: "Paystack",
    slug: "paystack",
    logo: "Paystack",
    industry: "Payments & Financial Infrastructure",
    location: "Lagos, Nigeria",
    employeesCount: "Between 250 and 500 employees",
    coverImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#00C3F8",
    bio: "Modern online and offline payments infrastructure for ambitious businesses across Africa.",
    openJobsCount: 4,
    verified: true,
  },
  {
    id: "comp-2",
    name: "Flutterwave",
    slug: "flutterwave",
    logo: "Flutterwave",
    industry: "Global Banking & Cross-Border APIs",
    location: "Lagos & San Francisco",
    employeesCount: "500+ employees",
    coverImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#FB4E2D",
    bio: "Connecting Africa to the global digital economy through unified payments rails.",
    openJobsCount: 6,
    verified: true,
  },
  {
    id: "comp-3",
    name: "Moniepoint",
    slug: "moniepoint",
    logo: "Moniepoint",
    industry: "Commercial Banking & POS Terminals",
    location: "Lagos, Nigeria",
    employeesCount: "1,000+ employees",
    coverImage: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#0355D4",
    bio: "All-in-one business banking and payment gateway empowering millions of retail merchants.",
    openJobsCount: 8,
    verified: true,
  },
  {
    id: "comp-4",
    name: "Andela",
    slug: "andela",
    logo: "Andela",
    industry: "Global Tech Talent Network",
    location: "Remote Africa",
    employeesCount: "500+ employees",
    coverImage: "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#3359DF",
    bio: "Matching top-tier software engineers and product teams with global hyper-growth companies.",
    openJobsCount: 5,
    verified: true,
  },
  {
    id: "comp-5",
    name: "Kuda",
    slug: "kuda",
    logo: "Kuda",
    industry: "Neobanking & Consumer Fintech",
    location: "London & Lagos",
    employeesCount: "Between 250 and 500 employees",
    coverImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#40196D",
    bio: "The money app for Africans with zero maintenance fees and instant smart transfers.",
    openJobsCount: 3,
    verified: true,
  },
  {
    id: "comp-6",
    name: "Chowdeck",
    slug: "chowdeck",
    logo: "Chowdeck",
    industry: "On-Demand Delivery & Logistics",
    location: "Lagos, Nigeria",
    employeesCount: "Between 100 and 250 employees",
    coverImage: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#0C1222",
    bio: "Fastest-growing on-demand food delivery network powering merchant logistics in West Africa.",
    openJobsCount: 3,
    verified: true,
  },
  {
    id: "comp-7",
    name: "Bamboo",
    slug: "bamboo",
    logo: "Bamboo",
    industry: "WealthTech & Global Investments",
    location: "Lagos, Nigeria",
    employeesCount: "Between 50 and 250 employees",
    coverImage: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#00875A",
    bio: "Unlocking access to global capital markets and wealth preservation for Africans.",
    openJobsCount: 2,
    verified: true,
  },
  {
    id: "comp-8",
    name: "Helium Health",
    slug: "helium-health",
    logo: "Helium Health",
    industry: "HealthTech & Electronic Records",
    location: "Lagos, Nigeria",
    employeesCount: "Between 250 and 500 employees",
    coverImage: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#0284C7",
    bio: "Digitizing healthcare data, hospital management, and medical financing across Africa.",
    openJobsCount: 2,
    verified: true,
  },
];
