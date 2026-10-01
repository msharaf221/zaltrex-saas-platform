import React from "react";
import Link from "next/link";
import { CtaContent, DEFAULT_CTA } from "@/lib/site-content";

interface ConsultationCTAProps {
  content?: CtaContent;
}

export default function ConsultationCTA({ content = DEFAULT_CTA }: ConsultationCTAProps) {
  const data = { ...DEFAULT_CTA, ...content };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-t border-white/[0.08] bg-obsidian-950">
      {/* Subtle Glow Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-600/20 via-cyan-500/20 to-transparent blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-obsidian-900/90 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-6">
            <span>{data.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans max-w-2xl mx-auto leading-tight mb-6">
            {data.title}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            {data.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={data.buttonLink}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wider font-mono shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              {data.buttonText}
            </Link>

            <a
              href={data.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-obsidian-950 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 font-bold text-xs tracking-wider font-mono transition-all flex items-center justify-center gap-2"
            >
              <span>{data.whatsappText}</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06] text-xs font-mono text-slate-500 flex flex-wrap items-center justify-center gap-6">
            {data.guarantees.map((item, idx) => (
              <span key={idx}>✔ {item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
