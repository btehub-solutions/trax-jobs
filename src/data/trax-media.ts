export interface TraxMediaArticle {
  id: string;
  slug: string;
  title: string;
  headline: string;
  excerpt: string;
  highlightText: string;
  category: string;
  author: string;
  readTime: string;
  publishedDate: string;
  image: string;
  imagePosition?: string;
  articleUrl: string;
}

export const TRAX_MEDIA_ARTICLES: TraxMediaArticle[] = [
  {
    id: "smartteller-african-cooperatives",
    slug: "how-smartteller-is-transforming-cooperatives-loan-agencies-and-thrift-organizations-across-africa-from-ogun-state",
    title: "How SmartTeller Is Transforming Cooperatives and Thrift Organizations Across Africa",
    headline: "Empower grassroots finance",
    highlightText: "SmartTeller",
    excerpt: "digitized grassroots thrift and cooperative societies across Nigeria, securing community finance at scale.",
    category: "Startups",
    author: "Ekundayo Faith",
    readTime: "5 min read",
    publishedDate: "July 22, 2026",
    image: "/images/trax-media/smartteller-cooperatives.png",
    imagePosition: "object-[center_25%]",
    articleUrl: "https://www.trax.ng/articles/how-smartteller-is-transforming-cooperatives-loan-agencies-and-thrift-organizations-across-africa-from-ogun-state",
  },
  {
    id: "chsg-academys-canvas-to-code",
    slug: "chsg-academys-from-canvas-to-code-masterclass-made-one-thing-clear-creativity-is-now-the-competitive-advantage",
    title: "CHSG Academy's Masterclass: Creativity Is the Competitive Advantage",
    headline: "Creativity is the edge",
    highlightText: "CHSG Academy",
    excerpt: "gathered emerging designers and engineers in Ogun State, proving how creative intuition elevates high-impact technical builders.",
    category: "Events",
    author: "Ben Sam Oladoyin",
    readTime: "4 min read",
    publishedDate: "July 22, 2026",
    image: "/images/trax-media/chsg-academy-masterclass.png",
    imagePosition: "object-center",
    articleUrl: "https://www.trax.ng/articles/chsg-academys-from-canvas-to-code-masterclass-made-one-thing-clear-creativity-is-now-the-competitive-advantage",
  },
  {
    id: "olaide-omobolaji-growth-initiative",
    slug: "ogun-state-financial-consultant-olaide-omobolaji-launches-90-day-120-million-growth-initiative",
    title: "Financial Consultant Olaide Omobolaji Launches 90-Day ₦120 Million Growth Initiative",
    headline: "Scale capital and structure",
    highlightText: "Olaide Omobolaji",
    excerpt: "unveiled a 90-day growth framework designed to deploy ₦120M in structured capital to high-potential regional ventures.",
    category: "Finance",
    author: "Ben Sam Oladoyin",
    readTime: "5 min read",
    publishedDate: "July 18, 2026",
    image: "/images/trax-media/olaide-omobolaji-growth.png",
    imagePosition: "object-[center_20%]",
    articleUrl: "https://www.trax.ng/articles/ogun-state-financial-consultant-olaide-omobolaji-launches-90-day-120-million-growth-initiative",
  },
  {
    id: "vant-firstfounders-financial-os",
    slug: "vant-joins-firstfounders-portfolio-as-it-scales-financial-os-for-african-smes",
    title: "Vant Joins FirstFounders Portfolio as It Scales Financial OS for African SMEs",
    headline: "Fuel SME commerce",
    highlightText: "Vant",
    excerpt: "joined FirstFounders portfolio to scale an all-in-one financial operating system empowering cross-border African merchants.",
    category: "Startups",
    author: "Vant",
    readTime: "4 min read",
    publishedDate: "June 24, 2026",
    image: "/images/trax-media/vant-financial-os.png",
    imagePosition: "object-center",
    articleUrl: "https://www.trax.ng/articles/vant-joins-firstfounders-portfolio-as-it-scales-financial-os-for-african-smes",
  },
  {
    id: "honor-foods-healthy-affordable",
    slug: "how-honor-foods-agro-ltd-is-making-healthy-and-affordable-food-products-accessible-to-ogun-state-families",
    title: "How Honor Foods Agro Ltd Is Making Healthy Food Accessible to Families",
    headline: "Feed local communities",
    highlightText: "Honor Foods",
    excerpt: "pioneered accessible, nutrient-dense agro-processing systems across Ogun State to deliver affordable staples to families.",
    category: "Agrotech",
    author: "Ben Sam Oladoyin",
    readTime: "5 min read",
    publishedDate: "June 20, 2026",
    image: "/images/trax-media/honor-foods-ogun.png",
    imagePosition: "object-[center_15%]",
    articleUrl: "https://www.trax.ng/articles/how-honor-foods-agro-ltd-is-making-healthy-and-affordable-food-products-accessible-to-ogun-state-families",
  },
];
