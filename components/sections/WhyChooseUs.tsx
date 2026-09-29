import React from "react";
import Link from "next/link";

const PILLARS = [
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
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 relative bg-obsidian-950/90 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Why Partner With Zaltrex
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Engineered For Serious Businesses.
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
            We don't just deliver lines of code; we partner with you to turn technical challenges into competitive business advantages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-obsidian-900/60 border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-cyan-300 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-obsidian-900 to-cyan-950/30 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white">Have a unique technical challenge?</h4>
            <p className="text-xs text-slate-400 mt-1">
              Book a free 30-minute discovery call with our tech leads to evaluate architecture and feasibility.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white text-obsidian-950 font-bold text-xs font-mono hover:bg-slate-200 transition-colors whitespace-nowrap shadow-lg"
          >
            Schedule Discovery Call →
          </Link>
        </div>
      </div>
    </section>
  );
}
