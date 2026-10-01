import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import Link from "next/link";
import {
  getSectionContent,
  DEFAULT_CTA,
  DEFAULT_GENERAL,
  DEFAULT_FOOTER,
  CtaContent,
  GeneralContent,
  FooterContent,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "IT Services & Solutions — Zaltrex",
  description:
    "Explore Zaltrex's end-to-end technology services: Web Applications, Custom ERPs, Mobile Apps, AI Automation, Cloud Infrastructure, and Cybersecurity.",
};

const DETAILED_SERVICES = [
  {
    id: "web-cloud",
    icon: "🌐",
    title: "Web & SaaS Platform Development",
    subtitle: "High-performance web apps built for conversion, speed, and scale.",
    description:
      "We design and build production-grade web applications and Software-as-a-Service (SaaS) products. From responsive customer-facing portals to complex transactional marketplaces, our engineering ensures sub-second load times, search engine optimization (SEO), and rock-solid reliability.",
    features: [
      "Full-stack Next.js, React, and TypeScript development",
      "High-throughput RESTful and GraphQL API backends",
      "Multi-tenant SaaS architectures with role-based access control (RBAC)",
      "Automated payment integrations (Stripe, Paymob, PayPal, Fawry)",
      "Headless CMS, analytics, and CRM integrations",
    ],
    tech: ["Next.js", "React 19", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
  },
  {
    id: "custom-software",
    icon: "⚙️",
    title: "Custom Enterprise Software & ERP",
    subtitle: "Tailored software that transforms manual workflows into automated efficiency.",
    description:
      "Off-the-shelf software often forces you to compromise your business logic. We build custom ERP, CRM, inventory, and supply chain software designed specifically around how your company operates, eliminating bottlenecks and human error.",
    features: [
      "Custom ERP systems tailored to manufacturing, retail, or service operations",
      "Interactive executive dashboards with real-time KPI metrics",
      "Automated PDF invoicing, barcode/QR scanning, and receipt parsing",
      "Migration of legacy desktop software to modern secure web platforms",
      "Fine-grained auditing logs and corporate data security",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "Prisma"],
  },
  {
    id: "mobile-apps",
    icon: "📱",
    title: "Mobile App Development (iOS & Android)",
    subtitle: "Fluid, native-quality mobile experiences your customers love.",
    description:
      "We develop modern mobile applications that look stunning and perform flawlessly across all iOS and Android devices. Whether you need an e-commerce app, on-demand delivery tracker, or client portal, we build for high retention and seamless UX.",
    features: [
      "Cross-platform development with Flutter and React Native",
      "Native device hardware integration (GPS, Camera, Biometrics, Bluetooth)",
      "Offline-first synchronization with background data sync",
      "Push notification systems (Firebase Cloud Messaging)",
      "Complete App Store (Apple) & Google Play Store submission & approval",
    ],
    tech: ["Flutter", "React Native", "iOS / Swift", "Android / Kotlin", "Firebase"],
  },
  {
    id: "ai-automation",
    icon: "🤖",
    title: "AI & Business Process Automation",
    subtitle: "Practical, ROI-driven AI solutions that cut costs and save hours.",
    description:
      "Skip the buzzwords and implement AI that directly generates business value. We deploy intelligent conversational agents, automated document extraction pipelines, and smart predictive models tailored to your proprietary company data.",
    features: [
      "Custom AI customer support chatbots with company knowledge base (RAG)",
      "Automated invoice, contract, and document scanning with OCR",
      "Internal employee copilots for instant policy and documentation answers",
      "Workflow automation connecting CRM, Email, WhatsApp, and database",
      "Zero telemetry leakage: private LLM hosting options on your cloud",
    ],
    tech: ["OpenAI API", "LangChain", "Vector DBs (pgvector/Pinecone)", "Python", "FastAPI"],
  },
  {
    id: "cloud-devops",
    icon: "☁️",
    title: "Cloud Architecture, Migration & DevOps",
    subtitle: "Zero-downtime deployments, auto-scaling, and cost optimization.",
    description:
      "Whether you're migrating from on-premise hardware or preparing your infrastructure for 100x user spikes, our certified cloud architects configure resilient, secure, and cost-efficient environments on AWS, Azure, or Google Cloud.",
    features: [
      "Containerization and orchestration with Docker & Kubernetes",
      "Automated CI/CD deployment pipelines (GitHub Actions, GitLab CI)",
      "Multi-region failover, load balancing, and edge CDN acceleration",
      "Cloud spend audits to reduce monthly server bills by 30-50%",
      "Disaster recovery planning with immutable automated backups",
    ],
    tech: ["Amazon Web Services (AWS)", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    id: "cybersecurity",
    icon: "🛡️",
    title: "Cybersecurity & IT Infrastructure",
    subtitle: "Protect your intellectual property, assets, and reputation.",
    description:
      "Security is not a plugin; it's a foundational discipline. We conduct comprehensive source code vulnerability audits, penetration tests, and network hardening to ensure your company complies with international standards.",
    features: [
      "Comprehensive web and mobile penetration testing (OWASP Top 10)",
      "Zero-Trust network architecture and end-to-end TLS/mTLS encryption",
      "Database encryption at rest and in transit (AES-256)",
      "Role-based permission auditing and credential rotation policies",
      "24/7 security monitoring, log analysis, and incident response SLA",
    ],
    tech: ["mTLS", "HashiCorp Vault", "WAF", "Zero-Trust", "Penetration Testing"],
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery & Architecture",
    desc: "We analyze your business goals, user personas, and technical constraints to outline an airtight specification and architectural roadmap.",
  },
  {
    number: "02",
    title: "UI/UX & Prototyping",
    desc: "We design clean, intuitive interfaces and clickable prototypes so you can review user flows before writing a single line of code.",
  },
  {
    number: "03",
    title: "Agile Sprint Development",
    desc: "We build in weekly sprints with demo releases. You get full transparency and regular progress demos on staging environments.",
  },
  {
    number: "04",
    title: "Automated Testing & Security",
    desc: "Rigorous unit, integration, and security tests ensure zero regressions, bulletproof authentication, and fast performance.",
  },
  {
    number: "05",
    title: "Production Launch & Support",
    desc: "We handle DNS setup, cloud provisioning, and zero-downtime deployment, followed by dedicated post-launch maintenance.",
  },
];

export default async function ServicesPage() {
  const [cta, general, footer] = await Promise.all([
    getSectionContent<CtaContent>("cta", DEFAULT_CTA),
    getSectionContent<GeneralContent>("general", DEFAULT_GENERAL),
    getSectionContent<FooterContent>("footer", DEFAULT_FOOTER),
  ]);

  return (
    <>
      <BackgroundEffects />
      <Navbar general={general} />

      <main className="flex-grow z-20">
        {/* Page Hero */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-white/[0.06] text-center">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-cyan-300 font-semibold">
              <span>ENGINEERING CAPABILITIES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans">
              End-to-End IT Services For Growing Businesses.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We provide the technical horsepower your company needs to build world-class digital products, modernize infrastructure, and automate workflows.
            </p>
          </div>
        </section>

        {/* Detailed Services Breakdown */}
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
          {DETAILED_SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              id={srv.id}
              className={`scroll-mt-28 p-8 sm:p-12 rounded-3xl bg-obsidian-900/80 border border-white/[0.08] shadow-2xl flex flex-col lg:flex-row gap-10 items-start ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Left Column: Info */}
              <div className="lg:w-7/12 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-2xl flex items-center justify-center">
                    {srv.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                      SERVICE 0{idx + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                      {srv.title}
                    </h2>
                  </div>
                </div>

                <div className="text-sm font-semibold text-cyan-300 font-mono">
                  {srv.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {srv.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    What's Included:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {srv.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">✔</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="pt-4 flex flex-wrap gap-2">
                  {srv.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[11px] font-mono text-slate-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: CTA Box */}
              <div className="lg:w-5/12 w-full p-6 sm:p-8 rounded-2xl bg-obsidian-950 border border-white/10 flex flex-col justify-between self-stretch">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400 uppercase">
                    Ready to execute?
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Need {srv.title.split(" ")[0]} Solutions?
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Schedule a scoping call with our lead engineers to get an estimate on timelines, milestones, and budget.
                  </p>
                </div>

                <div className="pt-6 space-y-3">
                  <Link
                    href={`/contact?service=${encodeURIComponent(srv.title)}`}
                    className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs font-mono tracking-wider transition-all"
                  >
                    REQUEST THIS SERVICE →
                  </Link>
                  <div className="text-center text-[11px] font-mono text-slate-500">
                    Fast turnaround • Free initial consultation
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Development Workflow / Process */}
        <section className="py-20 bg-obsidian-950 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                The Zaltrex Methodology
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
                How We Deliver Every Project.
              </h2>
              <p className="text-slate-400 text-sm mt-3">
                A predictable, battle-tested software engineering process with zero guesswork.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="p-6 rounded-2xl bg-obsidian-900/60 border border-white/[0.08] flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl font-black font-mono text-cyan-400 mb-3">
                      {step.number}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 font-sans">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <ConsultationCTA content={cta} />
      </main>

      <Footer content={footer} general={general} />
    </>
  );
}
