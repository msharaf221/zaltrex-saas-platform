import React from "react";
import Link from "next/link";
import { ServicesContent, DEFAULT_SERVICES } from "@/lib/site-content";

export const SERVICES_LIST = DEFAULT_SERVICES.items;

interface ServicesPreviewProps {
  content?: ServicesContent;
}

export default function ServicesPreview({ content = DEFAULT_SERVICES }: ServicesPreviewProps) {
  const data = { ...DEFAULT_SERVICES, ...content };

  return (
    <section className="py-20 md:py-28 relative bg-obsidian-950/70 border-t border-white/[0.06]" id="services">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              {data.badge}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
              {data.title}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              {data.subtitle}
            </p>
            <Link
              href="/services"
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5"
            >
              <span>Explore All Services in Detail</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.items.map((srv) => (
            <div
              key={srv.id}
              className="p-7 rounded-2xl bg-obsidian-900/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {srv.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-sans">
                {srv.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-grow">
                {srv.description}
              </p>

              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Key Capabilities:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {srv.deliverables?.map((item, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-300 border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <Link
                  href={`/services#${srv.id}`}
                  className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/contact?service=${encodeURIComponent(srv.title)}`}
                  className="text-xs font-mono text-slate-400 hover:text-white"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
