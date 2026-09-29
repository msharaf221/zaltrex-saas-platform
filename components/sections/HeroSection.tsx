"use client";

import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-indigo-500/30 text-xs font-mono text-cyan-300 font-semibold shadow-inner shadow-indigo-500/20">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-slate-300">ZALTREX IT SOLUTIONS</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400">Software &amp; Cloud Engineering</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
            We Engineer High-Impact <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-400">
              Software, Cloud &amp; AI
            </span>{" "}
            Solutions.
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            From modern web applications and mobile apps to scalable cloud architectures and AI-driven automation, Zaltrex helps startups and growing businesses scale with confidence.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-xl shadow-indigo-600/30 hover:shadow-cyan-500/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Start Your Project</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-sm font-mono font-medium text-slate-200 bg-obsidian-900/90 hover:bg-obsidian-850 border border-white/10 hover:border-cyan-400/40 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Explore Our Work</span>
              <span className="text-cyan-400 ml-2">→</span>
            </Link>
          </div>

          {/* Trust / Stats Bar */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center font-mono">
            <div className="p-3.5 rounded-xl bg-obsidian-900/60 border border-white/[0.06]">
              <div className="text-2xl font-black text-white">99.9%</div>
              <div className="text-[11px] text-slate-400 uppercase mt-0.5">Uptime &amp; Quality</div>
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-900/60 border border-white/[0.06]">
              <div className="text-2xl font-black text-cyan-300">2-6 Wks</div>
              <div className="text-[11px] text-slate-400 uppercase mt-0.5">MVP Fast Delivery</div>
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-900/60 border border-white/[0.06]">
              <div className="text-2xl font-black text-indigo-300">Modern</div>
              <div className="text-[11px] text-slate-400 uppercase mt-0.5">Cloud-Native Stack</div>
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-900/60 border border-white/[0.06]">
              <div className="text-2xl font-black text-emerald-400">24/7</div>
              <div className="text-[11px] text-slate-400 uppercase mt-0.5">Dedicated Support</div>
            </div>
          </div>
        </div>

        {/* Hero Visual Preview */}
        <div className="mt-14 max-w-5xl mx-auto relative group">
          <div className="rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/15 shadow-2xl shadow-indigo-950/80 overflow-hidden">
            <div className="rounded-xl overflow-hidden bg-obsidian-950 border border-white/[0.08] relative">
              {/* Window Header */}
              <div className="h-10 px-4 flex items-center justify-between border-b border-white/[0.06] bg-obsidian-900/90 text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="text-[11px] text-slate-400 ml-2">zaltrex-solutions-architecture</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>PRODUCTION READY</span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="relative">
                <img
                  src="/Zcover.png"
                  alt="Zaltrex IT Solutions Showcase"
                  className="w-full h-auto object-cover max-h-[520px] select-none rounded-b-xl group-hover:scale-[1.01] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-60"></div>

                {/* Floating pill */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto p-4 rounded-xl bg-obsidian-950/90 backdrop-blur-md border border-white/15 text-left font-mono text-xs shadow-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-cyan-300 flex items-center justify-center font-bold text-lg">
                    ⚡
                  </div>
                  <div>
                    <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">
                      Enterprise Solutions &amp; Microservices
                    </div>
                    <div className="text-white font-bold text-sm">
                      Engineered for high performance, security &amp; scale
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
