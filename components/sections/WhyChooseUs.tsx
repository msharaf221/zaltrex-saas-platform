import React from "react";
import Link from "next/link";
import { WhyUsContent, DEFAULT_WHY_US } from "@/lib/site-content";

export const PILLARS = DEFAULT_WHY_US.items;

interface WhyChooseUsProps {
  content?: WhyUsContent;
}

export default function WhyChooseUs({ content = DEFAULT_WHY_US }: WhyChooseUsProps) {
  const data = { ...DEFAULT_WHY_US, ...content };

  return (
    <section className="py-20 md:py-28 relative bg-obsidian-950/90 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            {data.badge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            {data.title}
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((pillar, idx) => (
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
            <h4 className="text-lg font-bold text-white">{data.bannerTitle}</h4>
            <p className="text-xs text-slate-400 mt-1">
              {data.bannerSubtitle}
            </p>
          </div>
          <Link
            href={data.bannerButtonLink}
            className="px-6 py-3 rounded-xl bg-white text-obsidian-950 font-bold text-xs font-mono hover:bg-slate-200 transition-colors whitespace-nowrap shadow-lg"
          >
            {data.bannerButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
