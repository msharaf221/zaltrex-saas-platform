import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import Link from "next/link";

export const metadata = {
  title: "About Us — Zaltrex IT Solutions",
  description:
    "Learn about Zaltrex: our mission, values, and how our IT startup is helping modern businesses build scalable software, cloud infrastructure, and AI systems.",
};

const VALUES = [
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
];

const TECH_CATEGORIES = [
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
];

export default function AboutPage() {
  return (
    <>
      <BackgroundEffects />
      <Navbar />

      <main className="flex-grow z-20">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-white/[0.06] text-center">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-cyan-300 font-semibold">
              <span>ABOUT ZALTREX</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans">
              Building The Future of Digital Infrastructure.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We are an emerging IT Solutions &amp; Software Engineering startup dedicated to empowering businesses with modern digital capabilities.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Our Origin
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
                Engineered By Developers Who Care About Real Business Impact.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Zaltrex was founded on a simple realization: too many software development agencies deliver either fragile prototypes that collapse under real traffic, or over-engineered, overpriced legacy systems that take a year to deploy.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We set out to bridge this gap. By combining the speed and agility of an ambitious startup with the engineering discipline of enterprise cloud architects, we deliver software that is fast to market, easy to maintain, and ready to scale.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/projects"
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono tracking-wide transition-all"
                >
                  View Our Portfolio →
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-obsidian-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-white font-mono text-xs transition-all"
                >
                  Work With Us
                </Link>
              </div>
            </div>

            {/* Visual Card */}
            <div className="p-3 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-white/5 to-cyan-500/20 border border-white/10 shadow-2xl">
              <div className="rounded-2xl overflow-hidden bg-obsidian-950 p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 p-2">
                    <img src="/Zpfp.png" alt="Zaltrex" className="w-full h-full object-cover rounded" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg font-sans">Zaltrex IT Solutions</div>
                    <div className="text-cyan-400 text-xs font-mono">Autonomous Digital Engineering</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">Headquarters</div>
                    <div className="text-white font-bold mt-1">Cairo, Egypt</div>
                  </div>
                  <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">Delivery Scope</div>
                    <div className="text-cyan-300 font-bold mt-1">MENA &amp; Global</div>
                  </div>
                  <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">Agile Cadence</div>
                    <div className="text-emerald-400 font-bold mt-1">1-Wk Sprints</div>
                  </div>
                  <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">SLA Availability</div>
                    <div className="text-indigo-300 font-bold mt-1">99.9% Uptime</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed italic border-t border-white/[0.08] pt-4">
                  "Our mission is to equip startups and growing companies with technology foundations that give them an unfair competitive advantage."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-obsidian-950 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Our Philosophy
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
                Core Engineering Values.
              </h2>
              <p className="text-slate-400 text-sm mt-3">
                The principles that govern every pull request, sprint review, and customer interaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v, i) => (
                <div
                  key={i}
                  className="p-7 rounded-2xl bg-obsidian-900/60 border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-cyan-300 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-grow">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Master Grid */}
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 border-t border-white/[0.06]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Technologies We Master
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
              Our Battle-Tested Toolchain.
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              We choose tools that maximize developer velocity, security, and long-term maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-obsidian-900/80 border border-white/[0.08] space-y-4"
              >
                <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>{cat.category}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-obsidian-950 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <ConsultationCTA />
      </main>

      <Footer />
    </>
  );
}
