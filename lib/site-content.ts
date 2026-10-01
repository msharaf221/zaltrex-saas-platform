import prisma from "@/lib/prisma";

// ----------------------------------------------------
// TypeScript Interfaces for all website content
// ----------------------------------------------------

export interface GeneralContent {
  siteName: string;
  badgeText: string;
  tagline: string;
  email: string;
  supportEmail: string;
  phone: string;
  location: string;
  whatsappUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HeroContent {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  titlePart2: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  stats: StatItem[];
  pillBadge: string;
  pillText: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ServicesContent {
  badge: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface PillarItem {
  icon: string;
  title: string;
  description: string;
}

export interface WhyUsContent {
  badge: string;
  title: string;
  subtitle: string;
  items: PillarItem[];
  bannerTitle: string;
  bannerSubtitle: string;
  bannerButtonText: string;
  bannerButtonLink: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  desc: string;
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface AboutContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  originBadge: string;
  originTitle: string;
  originP1: string;
  originP2: string;
  stats: {
    hq: string;
    scope: string;
    cadence: string;
    sla: string;
    quote: string;
  };
  valuesBadge: string;
  valuesTitle: string;
  valuesSubtitle: string;
  values: ValueItem[];
  techBadge: string;
  techTitle: string;
  techSubtitle: string;
  techCategories: TechCategory[];
}

export interface CtaContent {
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  whatsappText: string;
  whatsappUrl: string;
  guarantees: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ContactContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsappTitle: string;
  whatsappSubtitle: string;
  whatsappDesc: string;
  directTitle: string;
  email: string;
  address: string;
  workingHours: string;
  workingHoursSub: string;
  responseTime: string;
  faqs: FaqItem[];
}

export interface FooterContent {
  brandBio: string;
  address: string;
  emails: string;
  copyrightNotice: string;
  statusBadge: string;
}

export interface AllSiteContent {
  general: GeneralContent;
  hero: HeroContent;
  services: ServicesContent;
  why_us: WhyUsContent;
  about: AboutContent;
  cta: CtaContent;
  contact: ContactContent;
  footer: FooterContent;
}

// ----------------------------------------------------
// Default Fallbacks
// ----------------------------------------------------

export const DEFAULT_GENERAL: GeneralContent = {
  siteName: "ZALTREX",
  badgeText: "IT SOLUTIONS",
  tagline: "Software & Cloud Engineering",
  email: "contact@zaltrex.cloud",
  supportEmail: "info@zaltrex.com",
  phone: "+20 100 123 4567",
  location: "Cairo, Egypt & Remote Global Delivery",
  whatsappUrl: "https://wa.me/201001234567",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  twitterUrl: "https://twitter.com",
};

export const DEFAULT_HERO: HeroContent = {
  badge: "ZALTREX IT SOLUTIONS • Software & Cloud Engineering",
  titlePart1: "We Engineer High-Impact",
  titleHighlight: "Software, Cloud & AI",
  titlePart2: "Solutions.",
  subtitle:
    "From modern web applications and mobile apps to scalable cloud architectures and AI-driven automation, Zaltrex helps startups and growing businesses scale with confidence.",
  ctaPrimaryText: "Start Your Project",
  ctaPrimaryLink: "/contact",
  ctaSecondaryText: "Explore Our Work",
  ctaSecondaryLink: "/projects",
  stats: [
    { value: "99.9%", label: "Uptime & Quality" },
    { value: "2-6 Wks", label: "MVP Fast Delivery" },
    { value: "Modern", label: "Cloud-Native Stack" },
    { value: "24/7", label: "Dedicated Support" },
  ],
  pillBadge: "Enterprise Solutions & Microservices",
  pillText: "Engineered for high performance, security & scale",
};

export const DEFAULT_SERVICES: ServicesContent = {
  badge: "What We Do",
  title: "Comprehensive IT Solutions For Your Growth.",
  subtitle:
    "We design, build, and support the full technology lifecycle so your team can focus on growing your business.",
  items: [
    {
      id: "web-cloud",
      icon: "🌐",
      title: "Web & SaaS Development",
      description:
        "Modern, ultra-fast web platforms and SaaS solutions built with Next.js, React, and scalable backend microservices.",
      deliverables: ["Full-Stack Web Apps", "Custom SaaS Portals", "REST & GraphQL APIs", "Headless CMS"],
    },
    {
      id: "custom-software",
      icon: "⚙️",
      title: "Custom Enterprise Software & ERP",
      description:
        "Bespoke software systems designed around your company's workflows, inventory, HR, accounting, and operations.",
      deliverables: ["Custom ERP & CRM Systems", "Admin Dashboards", "Automated Workflows", "Legacy Modernization"],
    },
    {
      id: "mobile-apps",
      icon: "📱",
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications for iOS & Android delivering fluid UX and real-time synchronization.",
      deliverables: ["iOS & Android Apps", "React Native & Flutter", "App Store Publishing", "Push & Offline Sync"],
    },
    {
      id: "ai-automation",
      icon: "🤖",
      title: "AI & Process Automation",
      description:
        "Integrate practical AI models into your business to automate customer support, analyze documents, and eliminate repetitive tasks.",
      deliverables: ["Custom AI Chatbots", "Document OCR & Extraction", "Predictive Analytics", "CRM & Zapier Integrations"],
    },
    {
      id: "cloud-devops",
      icon: "☁️",
      title: "Cloud Architecture & DevOps",
      description:
        "Architect, deploy, and monitor scalable cloud environments on AWS, Azure, or Google Cloud with automated CI/CD.",
      deliverables: ["Docker & Kubernetes", "CI/CD Pipelines", "Multi-Region Cloud Setup", "Cost Optimization"],
    },
    {
      id: "cybersecurity",
      icon: "🛡️",
      title: "Cybersecurity & IT Infrastructure",
      description:
        "Protect your intellectual property, client data, and systems with enterprise security standards and code audits.",
      deliverables: ["Security Audits & Pentesting", "Data Encryption & Zero-Trust", "Backup & Disaster Recovery", "24/7 Monitoring"],
    },
  ],
};

export const DEFAULT_WHY_US: WhyUsContent = {
  badge: "Why Partner With Zaltrex",
  title: "Engineered For Serious Businesses.",
  subtitle:
    "We don't just deliver lines of code; we partner with you to turn technical challenges into competitive business advantages.",
  items: [
    {
      icon: "⚡",
      title: "Startup Speed, Enterprise Rigor",
      description:
        "We ship functional MVPs in 2-6 weeks. Agile 1-week sprints allow you to validate product features with real users rapidly while maintaining clean code.",
    },
    {
      icon: "🔒",
      title: "100% IP & Source Code Ownership",
      description:
        "You own all source code, deployment scripts, and architecture assets. No vendor lock-in, no hidden recurring software licenses.",
    },
    {
      icon: "🎯",
      title: "Direct Access to Senior Engineers",
      description:
        "No bureaucratic middlemen. You collaborate directly with experienced software architects and engineers who understand business outcomes.",
    },
    {
      icon: "📈",
      title: "Built to Scale From Day One",
      description:
        "We design modular, cloud-native architectures that gracefully handle 100x traffic growth without forcing costly, painful system rewrites.",
    },
  ],
  bannerTitle: "Have a unique technical challenge?",
  bannerSubtitle:
    "Book a free 30-minute discovery call with our tech leads to evaluate architecture and feasibility.",
  bannerButtonText: "Schedule Discovery Call →",
  bannerButtonLink: "/contact",
};

export const DEFAULT_ABOUT: AboutContent = {
  heroBadge: "ABOUT ZALTREX",
  heroTitle: "Building The Future of Digital Infrastructure.",
  heroSubtitle:
    "We are an emerging IT Solutions & Software Engineering startup dedicated to empowering businesses with modern digital capabilities.",
  originBadge: "Our Origin",
  originTitle: "Engineered By Developers Who Care About Real Business Impact.",
  originP1:
    "Zaltrex was founded on a simple realization: too many software development agencies deliver either fragile prototypes that collapse under real traffic, or over-engineered, overpriced legacy systems that take a year to deploy.",
  originP2:
    "We set out to bridge this gap. By combining the speed and agility of an ambitious startup with the engineering discipline of enterprise cloud architects, we deliver software that is fast to market, easy to maintain, and ready to scale.",
  stats: {
    hq: "Cairo, Egypt",
    scope: "MENA & Global",
    cadence: "1-Wk Sprints",
    sla: "99.9% Uptime",
    quote:
      '"Our mission is to equip startups and growing companies with technology foundations that give them an unfair competitive advantage."',
  },
  valuesBadge: "Our Philosophy",
  valuesTitle: "Core Engineering Values.",
  valuesSubtitle:
    "The principles that govern every pull request, sprint review, and customer interaction.",
  values: [
    {
      icon: "💎",
      title: "Uncompromising Code Quality",
      desc: "We write clean, strictly-typed, and modular code with comprehensive automated tests. We don't take shortcuts that lead to technical debt.",
    },
    {
      icon: "⚡",
      title: "Velocity Without Chaos",
      desc: "Speed matters in business. We leverage modern toolchains to ship functional MVPs in 2-6 weeks without sacrificing stability or architecture.",
    },
    {
      icon: "🤝",
      title: "Radical Transparency",
      desc: "No technical jargon hiding real progress. You have full access to our Jira/Trello boards, GitHub commits, staging previews, and engineers.",
    },
    {
      icon: "🛡️",
      title: "Security & IP Ownership",
      desc: "You own 100% of the intellectual property, repositories, and cloud resources from day one. Everything we build is protected under NDA.",
    },
  ],
  techBadge: "Technologies We Master",
  techTitle: "Our Battle-Tested Toolchain.",
  techSubtitle:
    "We choose tools that maximize developer velocity, security, and long-term maintainability.",
  techCategories: [
    {
      category: "Frontend & Web",
      items: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Vue.js", "HTML5/CSS3"],
    },
    {
      category: "Backend & Microservices",
      items: ["Node.js", "Python", "FastAPI", "Go", "Express", "Prisma ORM"],
    },
    {
      category: "Databases & Caching",
      items: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Vector DBs (Pinecone, pgvector)"],
    },
    {
      category: "Mobile Apps",
      items: ["Flutter", "React Native", "iOS / Swift", "Android / Kotlin"],
    },
    {
      category: "Cloud & DevOps",
      items: ["Amazon Web Services (AWS)", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Vercel"],
    },
    {
      category: "AI & Data",
      items: ["OpenAI API", "LangChain", "HuggingFace", "RAG Pipelines", "Data Extraction OCR"],
    },
  ],
};

export const DEFAULT_CTA: CtaContent = {
  badge: "🚀 Let's Build Your Vision",
  title: "Ready to Accelerate Your Business With Modern Technology?",
  subtitle:
    "Tell us about your project goals. We'll analyze your requirements, recommend the ideal architecture, and deliver a detailed technical roadmap with milestone estimates.",
  buttonText: "REQUEST A FREE PROPOSAL →",
  buttonLink: "/contact",
  whatsappText: "💬 Quick WhatsApp Chat",
  whatsappUrl: "https://wa.me/201001234567",
  guarantees: ["Fast 24h Response", "Strict NDA & IP Protection", "Flexible Milestones"],
};

export const DEFAULT_CONTACT: ContactContent = {
  heroBadge: "GET IN TOUCH",
  heroTitle: "Let's Build Something Exceptional Together.",
  heroSubtitle:
    "Have a project in mind, need a technical audit, or want a dedicated development team? We're ready to engineer your solution.",
  whatsappTitle: "WhatsApp Direct Chat",
  whatsappSubtitle: "Instant communication",
  whatsappDesc:
    "Prefer a fast chat? Message our technical team directly on WhatsApp to get immediate answers to your questions.",
  directTitle: "Direct Contact Information",
  email: "contact@zaltrex.cloud",
  address: "Cairo, Egypt (Worldwide Remote Delivery)",
  workingHours: "Sun – Thu: 9:00 AM – 6:00 PM (EET)",
  workingHoursSub: "Critical 24/7 monitoring for SLA clients",
  responseTime: "Average response time: < 2 business hours",
  faqs: [
    {
      q: "How does the project onboarding process work?",
      a: "We start with a free 30-minute discovery session to understand your business goals, target timelines, and technical constraints. Following that, we present a detailed proposal outlining the system architecture, milestone breakdown, and transparent pricing. Once approved, development sprints begin immediately.",
    },
    {
      q: "What pricing models do you support?",
      a: "We offer both Milestone-Based Fixed Pricing (ideal for well-defined MVPs and project scopes) and Dedicated Team / Time & Materials arrangements (ideal for evolving products requiring continuous feature development and agile iteration).",
    },
    {
      q: "Do you sign an NDA before we share our project details?",
      a: "Yes, absolutely. We treat all client concepts, intellectual property, and proprietary data with strict confidentiality. We provide our standard mutual NDA, or we are happy to review and sign yours prior to deep discussions.",
    },
    {
      q: "Who owns the code and intellectual property?",
      a: "You do. 100%. Upon completion of project milestones, all source code, deployment scripts, database schemas, and intellectual property belong entirely to your company without licensing strings attached.",
    },
    {
      q: "Do you provide ongoing maintenance and SLA support?",
      a: "Yes. After deployment, we offer flexible SLA support packages that include 24/7 uptime monitoring, security patching, dependency upgrades, cloud cost tuning, and continuous feature additions.",
    },
  ],
};

export const DEFAULT_FOOTER: FooterContent = {
  brandBio:
    "Zaltrex is an emerging IT Solutions & Software Engineering startup. We build high-impact web platforms, custom mobile applications, cloud infrastructure, and AI-powered automation to empower businesses to scale securely.",
  address: "Cairo, Egypt & Remote Global Delivery",
  emails: "contact@zaltrex.cloud | info@zaltrex.com",
  copyrightNotice: "Zaltrex IT Solutions. All rights reserved.",
  statusBadge: "Accepting New Projects",
};

// ----------------------------------------------------
// Data Fetching Helpers
// ----------------------------------------------------

export async function getSectionContent<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const record = await prisma.siteContent.findUnique({
      where: { key },
    });

    if (!record || !record.data) {
      return defaultValue;
    }

    const parsed = JSON.parse(record.data);
    return { ...defaultValue, ...parsed };
  } catch (error) {
    console.error(`Error fetching site content for key '${key}':`, error);
    return defaultValue;
  }
}

export async function getAllSiteContent(): Promise<AllSiteContent> {
  try {
    const records = await prisma.siteContent.findMany();
    const map = new Map<string, string>();
    for (const r of records) {
      map.set(r.key, r.data);
    }

    const parseSection = <T>(key: string, fallback: T): T => {
      const raw = map.get(key);
      if (!raw) return fallback;
      try {
        return { ...fallback, ...JSON.parse(raw) };
      } catch {
        return fallback;
      }
    };

    return {
      general: parseSection<GeneralContent>("general", DEFAULT_GENERAL),
      hero: parseSection<HeroContent>("hero", DEFAULT_HERO),
      services: parseSection<ServicesContent>("services", DEFAULT_SERVICES),
      why_us: parseSection<WhyUsContent>("why_us", DEFAULT_WHY_US),
      about: parseSection<AboutContent>("about", DEFAULT_ABOUT),
      cta: parseSection<CtaContent>("cta", DEFAULT_CTA),
      contact: parseSection<ContactContent>("contact", DEFAULT_CONTACT),
      footer: parseSection<FooterContent>("footer", DEFAULT_FOOTER),
    };
  } catch (error) {
    console.error("Error fetching all site content:", error);
    return {
      general: DEFAULT_GENERAL,
      hero: DEFAULT_HERO,
      services: DEFAULT_SERVICES,
      why_us: DEFAULT_WHY_US,
      about: DEFAULT_ABOUT,
      cta: DEFAULT_CTA,
      contact: DEFAULT_CONTACT,
      footer: DEFAULT_FOOTER,
    };
  }
}
