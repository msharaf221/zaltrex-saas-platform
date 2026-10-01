const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for Zaltrex IT Solutions...");

  // 1. Seed / Upsert Admin User
  const adminEmail = (process.env.ADMIN_EMAIL || "muhamedhussein1105@gmail.com").toLowerCase().trim();
  const rawPassword = process.env.ADMIN_PASSWORD || "Muhamed@3512139M";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "ADMIN",
      password: hashedPassword,
    },
    create: {
      name: "Muhamed Hussein (Primary Admin)",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✔ Admin user ready: ${admin.email} (Password: ${rawPassword})`);

  // 2. Seed Initial IT Portfolio Projects
  const projectsData = [
    {
      title: "Enterprise E-Commerce Cloud Platform",
      slug: "enterprise-ecommerce-cloud-platform",
      description:
        "High-performance cloud-native marketplace with real-time inventory management, automated payment gateways, and sub-100ms response times under heavy traffic.",
      content:
        "The client required an upgrade from a legacy monolithic store to a modern, decoupled architecture. We engineered Next.js storefronts, Node.js microservices, PostgreSQL with connection pooling, and multi-currency payment integrations. Result: 340% increase in checkout throughput and zero downtime during flash sales.",
      imageUrl: "/Max_a_هات_الباكدج_مفصلة.png",
      category: "Web & Cloud Solutions",
      tags: "Next.js, Node.js, PostgreSQL, Docker, AWS",
      client: "RetailCore Global",
      liveUrl: "https://zaltrex.cloud/projects/enterprise-ecommerce",
      featured: true,
      order: 1,
    },
    {
      title: "AI-Powered Customer Support & Analytics Suite",
      slug: "ai-customer-support-suite",
      description:
        "Intelligent multi-lingual chatbot and automated ticketing solution processing thousands of client queries daily with CRM auto-sync.",
      content:
        "Zaltrex built a customized RAG-driven AI copilot for customer service, drastically decreasing response time by 82% while integrating securely with internal databases without third-party data leakage. Features automated escalation, sentiment tracking, and executive analytics dashboards.",
      imageUrl: "/gemini-3.1-flash-lite-image (nano-banana-2-lite)_b_حلو_اوي_اللوجو_و_الك.jpeg",
      category: "AI & Automation",
      tags: "Python, FastAPI, OpenAI, Vector DB, Redis",
      client: "Nexus Support Systems",
      liveUrl: "https://zaltrex.cloud/projects/ai-support",
      featured: true,
      order: 2,
    },
    {
      title: "FinTech Digital Wallet & Payment Infrastructure",
      slug: "fintech-payment-infrastructure",
      description:
        "Bank-grade digital payment gateway complying with PCI-DSS, zero-trust network policies, and end-to-end data encryption.",
      content:
        "Architected a zero-trust financial transaction gateway with instant settlements, fraud detection anomaly sensors, and multi-factor biometric authentication for mobile and web apps. Handled over $10M in transactions in its first operating quarter.",
      imageUrl: "/Max_a_عندنا_شركة_it_اسمها_.png",
      category: "Cybersecurity & FinTech",
      tags: "Go, Kubernetes, HashiCorp Vault, PostgreSQL, mTLS",
      client: "PayVanguard Ltd",
      liveUrl: "https://zaltrex.cloud/projects/fintech-payment",
      featured: true,
      order: 3,
    },
    {
      title: "Logistics Fleet Tracking & Mobile Operations",
      slug: "logistics-fleet-tracking",
      description:
        "Real-time GPS telematics, driver mobile application, and dispatcher management console handling 500+ active fleet vehicles.",
      content:
        "Built a high-performance cross-platform mobile app for drivers and an interactive dispatcher web dashboard with live maps, automated route optimization, and offline sync. Reduced delivery delays by 28%.",
      imageUrl: "/Zcover.png",
      category: "Mobile & IoT Solutions",
      tags: "React Native, TypeScript, WebSockets, Google Maps API",
      client: "TransSpeed Logistics",
      liveUrl: "https://zaltrex.cloud/projects/logistics-tracking",
      featured: false,
      order: 4,
    },
  ];

  for (const proj of projectsData) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj,
    });
  }
  console.log(`✔ Seeded ${projectsData.length} IT portfolio projects.`);

  // 3. Seed Realistic Blog Posts
  const postsData = [
    {
      title: "How Modern Cloud Architecture Helps Startups Scale Without Massive Costs",
      slug: "how-modern-cloud-architecture-helps-startups-scale",
      excerpt:
        "Discover how smart infrastructure choices, serverless computing, and containerization allow modern startups to handle 100x traffic spikes reliably.",
      category: "Cloud & DevOps",
      coverImage: "/Max_a_عندنا_شركة_it_اسمها_.png",
      author: "Zaltrex Tech Team",
      readTime: "4 min read",
      published: true,
      content: `Building an IT startup or growing business comes with an inevitable challenge: handling rapid user growth without inflating your cloud bill to unsustainable numbers.

Many early-stage companies make the mistake of either over-provisioning expensive dedicated servers before they have traffic, or building fragile systems that crash on their first major marketing campaign.

### 1. Embracing Microservices at the Right Time
Starting with a clean, modular architecture allows you to scale individual high-traffic endpoints (such as checkout or search) independently from static components.

### 2. Automated CI/CD Pipelines
Automation isn't just about saving time; it's about reducing downtime and human error. With containerized deployments using Docker and automated testing, shipping updates is stress-free.

### 3. Smart Caching and Edge Delivery
Utilizing edge caching (like Cloudflare or Vercel Edge) offloads over 70% of static asset and query load from your primary database, preserving fast response times for global users.

### Summary
At Zaltrex, we architect cloud solutions designed to grow alongside your business metrics. You only pay for what you actually use.`,
    },
    {
      title: "Cybersecurity Essentials Every Growing Business Must Implement Today",
      slug: "cybersecurity-essentials-every-business-must-implement",
      excerpt:
        "A practical guide to protecting your company's data, customer information, and reputation against modern security threats and breaches.",
      category: "Cybersecurity",
      coverImage: "/Max_a_هات_الباكدج_مفصلة.png",
      author: "Omar Farouk, Security Lead",
      readTime: "6 min read",
      published: true,
      content: `In an increasingly interconnected digital ecosystem, cybersecurity is no longer an afterthought reserved for Fortune 500 enterprises. Startups and SMEs are prime targets for automated scans, ransomware, and credential stuffing.

### Key Defense Layers for Startups:
- **Zero-Trust Access Control**: Never trust, always verify every request inside and outside the perimeter.
- **Strict Data Encryption**: Encrypt sensitive data at rest using AES-256 and in transit with modern TLS 1.3.
- **Automated Dependency Auditing**: Keep all software packages updated against CVE vulnerabilities.
- **Regular Backups & Disaster Recovery**: Ensure immutable cloud backups with 1-click restore capabilities.

Protecting your enterprise isn't about complexity; it's about disciplined engineering from day one.`,
    },
    {
      title: "Integrating Practical AI: Beyond Hype to Real Business ROI",
      slug: "integrating-practical-ai-beyond-hype-to-real-roi",
      excerpt:
        "How smart automation and generative AI models can automate customer support, streamline workflows, and boost productivity for your team.",
      category: "AI & Innovation",
      coverImage: "/gemini-3.1-flash-lite-image (nano-banana-2-lite)_b_حلو_اوي_اللوجو_و_الك.jpeg",
      author: "Zaltrex AI Lab",
      readTime: "5 min read",
      published: true,
      content: `While AI is everywhere in today's tech headlines, the real winners are businesses that implement targeted, practical AI solutions that directly improve their bottom line.

From semantic search across company knowledge bases to intelligent customer ticket routing, custom AI solutions tailored to your company's exact workflow deliver measurable returns within weeks of deployment.

### Where AI Provides Instant Impact:
1. **Automated Ticket Resolution**: Resolving 60%+ of routine customer inquiries without human intervention.
2. **Internal Document Search**: Empowering sales and support teams with instant answers from internal company docs.
3. **Data Extraction & Invoicing**: Automatically scanning PDFs, receipts, and contracts with high accuracy.`,
    },
  ];

  for (const post of postsData) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`✔ Seeded ${postsData.length} blog posts.`);

  // 4. Seed Client Testimonials
  const testimonialsData = [
    {
      clientName: "Tamer El-Gendy",
      clientRole: "CTO",
      company: "RetailCore Global",
      feedback:
        "Zaltrex migrated our entire monolithic platform to Next.js and microservices in under 6 weeks. Our peak checkout throughput increased by 340% without a single second of downtime during Black Friday.",
      rating: 5,
      avatarUrl: "/Max_a_هات_لوجو_صغير.png",
      featured: true,
      order: 1,
    },
    {
      clientName: "Sarah Al-Husseini",
      clientRole: "Founder & CEO",
      company: "FinTech Ventures UAE",
      feedback:
        "Finding an engineering team that truly understands zero-trust security and high-availability was tough until we partnered with Zaltrex. They built our digital wallet MVP with bank-grade standards.",
      rating: 5,
      avatarUrl: "/Zpfp.png",
      featured: true,
      order: 2,
    },
    {
      clientName: "Hossam Mansour",
      clientRole: "Head of Operations",
      company: "TransSpeed Logistics",
      feedback:
        "The fleet tracking mobile app and live dispatcher portal engineered by Zaltrex reduced our operational delays by 28%. Their transparent 1-week sprint demos kept us in the driver seat throughout.",
      rating: 5,
      avatarUrl: "/Max_a_عندنا_شركة_it_اسمها_.png",
      featured: true,
      order: 3,
    },
  ];

  for (const t of testimonialsData) {
    const existing = await prisma.testimonial.findFirst({
      where: { clientName: t.clientName, company: t.company },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log("✔ Client testimonials seeded.");

  // 5. Seed Default AI Agent Configuration & Knowledge Base
  const defaultKnowledge = `# ZALTREX IT SOLUTIONS — COMPANY KNOWLEDGE BASE

## About Zaltrex
Zaltrex is an emerging IT Solutions & Software Development startup based in Cairo, Egypt, providing engineering services locally across Egypt, the MENA region (UAE, Saudi Arabia, Qatar), and globally.

## Core Services & Capabilities:
1. Web & SaaS Platform Development: Next.js, React, Node.js, TypeScript, PostgreSQL, high-performance web applications, multi-tenant SaaS.
2. Custom Enterprise Software & ERP: Tailored ERP, CRM, inventory management, supply chain portals, and legacy system modernization.
3. Mobile App Development: Native and cross-platform apps using Flutter & React Native for iOS and Android with offline sync and push notifications.
4. AI & Business Process Automation: Custom AI chatbots (RAG), document scanning & OCR, internal knowledge base copilots, CRM automation.
5. Cloud Architecture, Migration & DevOps: AWS, Azure, Google Cloud, Docker, Kubernetes, CI/CD pipelines, cloud cost reduction (30-50%).
6. Cybersecurity & IT Infrastructure: Source code audits, penetration testing (OWASP Top 10), zero-trust architecture, TLS 1.3/AES-256 encryption.

## Pricing Guidelines & Delivery Timelines:
- Discovery & MVP Architecture: 2-6 weeks delivery. Typical MVP budget starts around $5,000 - $15,000 depending on complexity.
- Full-Scale Enterprise Platform / Custom ERP: 2-4 months. Typical budget $15,000 - $35,000+.
- Pricing Models: Milestone-based Fixed Pricing (clear specifications) or Dedicated Agile Team / Monthly retainers.

## Client Guarantees:
- 100% IP & Source Code Ownership: Client owns all code, cloud assets, and repositories.
- Strict Confidentiality: Standard mutual NDA signed before sharing details.
- 99.9% Uptime & SLA: 24/7 dedicated monitoring and ongoing support available.

## Contact Information:
- Email: contact@zaltrex.cloud / info@zaltrex.com
- WhatsApp: +20 100 123 4567
- Headquarters: Cairo, Egypt
- Response Time: Under 2 business hours.`;

  await prisma.agentConfig.upsert({
    where: { id: "default_config" },
    update: {
      botName: "Zaltrex AI Assistant",
      welcomeMessage:
        "Hello! I'm Zaltrex AI Advisor. How can I help you with your software, web, mobile, or cloud infrastructure project today?",
      systemPrompt:
        "You are the official AI Technical Consultant and Client Representative for Zaltrex, an elite IT Solutions & Software Development startup. Answer prospective client questions clearly, accurately, and professionally based on the company knowledge base. You speak both English and Arabic fluently. If a client wants to start a project or request a quote, politely ask for their Name, Email, and Phone/WhatsApp number or direct them to our Contact page / WhatsApp chat.",
      knowledgeBase: defaultKnowledge,
      modelName: "gemini-2.5-flash",
      defaultTone: "auto",
      isActive: true,
    },
    create: {
      id: "default_config",
      botName: "Zaltrex AI Assistant",
      welcomeMessage:
        "Hello! I'm Zaltrex AI Advisor. How can I help you with your software, web, mobile, or cloud infrastructure project today?",
      systemPrompt:
        "You are the official AI Technical Consultant and Client Representative for Zaltrex, an elite IT Solutions & Software Development startup. Answer prospective client questions clearly, accurately, and professionally based on the company knowledge base. You speak both English and Arabic fluently. If a client wants to start a project or request a quote, politely ask for their Name, Email, and Phone/WhatsApp number or direct them to our Contact page / WhatsApp chat.",
      knowledgeBase: defaultKnowledge,
      modelName: "gemini-2.5-flash",
      defaultTone: "auto",
      isActive: true,
    },
  });
  console.log("✔ AI Agent Configuration & Knowledge Base initialized.");
}

main()
  .catch((e) => {
    console.error("Seed error (non-fatal):", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
