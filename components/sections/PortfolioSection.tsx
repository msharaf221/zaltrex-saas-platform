"use client";

import React from "react";
import Image from "next/image";
import { useSound } from "../audio/SoundContext";

interface PortfolioSectionProps {
  onOpenModal: (data: { imgSrc: string; title: string; desc: string }) => void;
}

export default function PortfolioSection({ onOpenModal }: PortfolioSectionProps) {
  const { playClick } = useSound();

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="py-24 md:py-32 relative bg-obsidian-900/50" id="portfolio">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Engineering Portfolio
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Built for Impossible Workloads.
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-md">
            Directly inspect our deployed suites, mission-critical infrastructure blueprints, and
            proprietary enterprise software packages.
          </p>
        </div>

        {/* 3 Interactive Cards with Mouse Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project 1: Full-Stack Enterprise Package */}
          <div
            onMouseMove={handleCardMouseMove}
            className="spotlight-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
          >
            <div className="relative h-64 overflow-hidden bg-obsidian-950">
              <Image
                src="/Max_a_هات_الباكدج_مفصلة.png"
                alt="Full-Stack Enterprise Package"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-70 pointer-events-none"></div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 backdrop-blur-md">
                  CORE SUITE
                </span>
              </div>
              <button
                onClick={() => {
                  playClick();
                  onOpenModal({
                    imgSrc: "/Max_a_هات_الباكدج_مفصلة.png",
                    title: "Modular Full-Stack Enterprise Package",
                    desc: "Complete end-to-end software package containing microservices, distributed storage, and admin dashboards.",
                  });
                }}
                className="absolute bottom-4 right-4 p-2 rounded-lg bg-obsidian-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 cursor-pointer"
                title="Expand View"
              >
                🔍
              </button>
            </div>
            <div className="p-7 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <span>01</span>
                <span>/</span>
                <span>ARCHITECTURE</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Modular Enterprise Package
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-grow">
                Complete multi-tier enterprise architecture. Features autonomous microservice mesh,
                synchronized telemetry, automated data pipelines, and executive dashboards.
              </p>
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">v4.8 • Core Engine</span>
                <button
                  onClick={() => {
                    playClick();
                    onOpenModal({
                      imgSrc: "/Max_a_هات_الباكدج_مفصلة.png",
                      title: "Modular Full-Stack Enterprise Package",
                      desc: "Detailed system architecture: high-availability data broker, zero-loss replication, and distributed consensus.",
                    });
                  }}
                  className="inline-flex items-center text-xs font-bold font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>Inspect Blueprint →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Project 2: Cloud Infrastructure & Core Platform */}
          <div
            onMouseMove={handleCardMouseMove}
            className="spotlight-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
          >
            <div className="relative h-64 overflow-hidden bg-obsidian-950">
              <Image
                src="/Max_a_عندنا_شركة_it_اسمها_.png"
                alt="Cloud Infrastructure & Core Platform"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-70 pointer-events-none"></div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                  CLOUD FABRIC
                </span>
              </div>
              <button
                onClick={() => {
                  playClick();
                  onOpenModal({
                    imgSrc: "/Max_a_عندنا_شركة_it_اسمها_.png",
                    title: "Zaltrex Cloud Mesh & Global Infrastructure",
                    desc: "Multi-region mesh topology with intelligent traffic rebalancing, container orchestration, and failover.",
                  });
                }}
                className="absolute bottom-4 right-4 p-2 rounded-lg bg-obsidian-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 cursor-pointer"
                title="Expand View"
              >
                🔍
              </button>
            </div>
            <div className="p-7 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <span>02</span>
                <span>/</span>
                <span>INFRASTRUCTURE</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Global Cloud Infrastructure
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-grow">
                Ultra-resilient multi-region cloud topology with dynamic load rebalancing, container
                orchestration, and real-time failover mechanisms.
              </p>
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">Tier-4 Standards</span>
                <button
                  onClick={() => {
                    playClick();
                    onOpenModal({
                      imgSrc: "/Max_a_عندنا_شركة_it_اسمها_.png",
                      title: "Zaltrex Cloud Mesh & Global Infrastructure",
                      desc: "Multi-region mesh topology with intelligent traffic rebalancing, container orchestration, and failover.",
                    });
                  }}
                  className="inline-flex items-center text-xs font-bold font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>Inspect Blueprint →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Project 3: Enterprise Brand Identity & AI Modules */}
          <div
            onMouseMove={handleCardMouseMove}
            className="spotlight-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
          >
            <div className="relative h-64 overflow-hidden bg-obsidian-950 grid grid-cols-2 gap-1 p-1">
              <div className="relative h-full overflow-hidden rounded-lg">
                <Image
                  src="/Max_a_هات_لوجو_احطه_على_ال.png"
                  alt="Enterprise Brand Identity"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 16vw, 200px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-full overflow-hidden rounded-lg">
                <Image
                  src="/gemini-3.1-flash-lite-image (nano-banana-2-lite)_b_حلو_اوي_اللوجو_و_الك.jpeg"
                  alt="AI Modules & System Design"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 16vw, 200px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-violet-500/30 text-violet-300 border border-violet-500/40 backdrop-blur-md">
                  NEURAL COPILOT
                </span>
              </div>
            </div>
            <div className="p-7 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <span>03</span>
                <span>/</span>
                <span>INTELLIGENCE</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                AI Copilot &amp; Systems Identity
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-grow">
                Integrated generative and predictive inference models running directly on customer
                edge clusters with zero telemetry leakage.
              </p>
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">LLM &amp; Vector DB</span>
                <button
                  onClick={() => {
                    playClick();
                    onOpenModal({
                      imgSrc:
                        "/gemini-3.1-flash-lite-image (nano-banana-2-lite)_b_حلو_اوي_اللوجو_و_الك.jpeg",
                      title: "AI Copilot & Neural Engine",
                      desc: "On-premise LLM inference with vector databases, semantic caching, and sub-15ms generation times.",
                    });
                  }}
                  className="inline-flex items-center text-xs font-bold font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>Inspect Blueprint →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
