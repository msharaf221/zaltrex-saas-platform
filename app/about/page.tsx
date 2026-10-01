import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import Link from "next/link";
import Image from "next/image";
import {
  getSectionContent,
  DEFAULT_ABOUT,
  DEFAULT_CTA,
  DEFAULT_GENERAL,
  DEFAULT_FOOTER,
  AboutContent,
  CtaContent,
  GeneralContent,
  FooterContent,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us — Zaltrex IT Solutions",
  description:
    "Learn about Zaltrex: our mission, values, and how our IT startup is helping modern businesses build scalable software, cloud infrastructure, and AI systems.",
};

export default async function AboutPage() {
  const [about, cta, general, footer] = await Promise.all([
    getSectionContent<AboutContent>("about", DEFAULT_ABOUT),
    getSectionContent<CtaContent>("cta", DEFAULT_CTA),
    getSectionContent<GeneralContent>("general", DEFAULT_GENERAL),
    getSectionContent<FooterContent>("footer", DEFAULT_FOOTER),
  ]);

  return (
    <>
      <BackgroundEffects />
      <Navbar general={general} />

      <main className="flex-grow z-20">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-white/[0.06] text-center">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-cyan-300 font-semibold">
              <span>{about.heroBadge}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans">
              {about.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {about.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                {about.originBadge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
                {about.originTitle}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {about.originP1}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {about.originP2}
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
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 p-2 relative overflow-hidden">
                    <Image
                      src="/Zpfp.png"
                      alt="Zaltrex"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg font-sans">Zaltrex IT Solutions</div>
                    <div className="text-cyan-400 text-xs font-mono">Autonomous Digital Engineering</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">Headquarters</div>
                    <div className="text-white font-bold mt-1">{about.stats.hq}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">Delivery Scope</div>
                    <div className="text-cyan-300 font-bold mt-1">{about.stats.scope}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">Agile Cadence</div>
                    <div className="text-emerald-400 font-bold mt-1">{about.stats.cadence}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">SLA Availability</div>
                    <div className="text-indigo-300 font-bold mt-1">{about.stats.sla}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed italic border-t border-white/[0.08] pt-4">
                  {about.stats.quote}
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
                {about.valuesBadge}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
                {about.valuesTitle}
              </h2>
              <p className="text-slate-400 text-sm mt-3">
                {about.valuesSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {about.values.map((v, i) => (
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
              {about.techBadge}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
              {about.techTitle}
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              {about.techSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.techCategories.map((cat, idx) => (
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

        <ConsultationCTA content={cta} />
      </main>

      <Footer content={footer} general={general} />
    </>
  );
}
