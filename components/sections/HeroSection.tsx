"use client";

import React, { useState, useRef } from "react";
import { useSound } from "../audio/SoundContext";
import { useToast } from "../ui/ToastContext";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"visual" | "metrics">("visual");
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { playClick } = useSound();
  const { showToast } = useToast();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  const copyInstallCommand = () => {
    const cmd = "curl -sSL https://get.zaltrex.cloud | bash";
    navigator.clipboard
      .writeText(cmd)
      .then(() => {
        showToast(`Copied to clipboard: ${cmd}`);
      })
      .catch(() => {
        showToast("Copied to clipboard!");
      });
  };

  return (
    <section className="relative pt-20 pb-20 md:pt-28 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
        {/* Top Announcement Badge with glowing border */}
        <div
          onClick={() => {
            playClick();
            showToast("Zaltrex Mesh Engine 4.8 deployed globally with 0ms downtime!");
          }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-indigo-500/30 text-xs font-mono text-cyan-300 font-semibold mb-8 shadow-inner shadow-indigo-500/20 hover:border-cyan-400 transition-all cursor-pointer group"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-slate-300">ZALTREX MESH v4.8</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 group-hover:underline flex items-center gap-1">
            Engineered For Absolute Scale{" "}
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-5xl mx-auto text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] mb-8">
          The Precision Engine <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-400">
            For Autonomous Cloud.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed font-normal mb-12">
          Stop assembling fragmented cloud tools. Zaltrex orchestrates distributed microservice
          fabrics, real-time AI telemetry, and sub-millisecond data paths in one unified sovereign
          platform.
        </p>

        {/* CTA Buttons & Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="#playground"
            onClick={playClick}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <svg
              className="w-4 h-4 mr-2 text-cyan-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Launch Interactive Console
          </a>

          <button
            onClick={() => {
              playClick();
              copyInstallCommand();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 text-sm font-mono font-medium text-slate-300 bg-obsidian-900/90 hover:bg-obsidian-850 border border-white/10 hover:border-cyan-400/40 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer"
          >
            <span className="text-cyan-400 mr-2">$</span>
            <span>curl -sSL get.zaltrex.cloud | bash</span>
            <svg
              className="w-4 h-4 ml-3 text-slate-500 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </button>
        </div>

        {/* ================= 3D TILT SHOWCASE WINDOW ================= */}
        <div className="perspective-container max-w-5xl mx-auto">
          <div
            ref={cardRef}
            id="hero-tilt-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="tilt-element relative rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/15 shadow-2xl shadow-indigo-950/80"
          >
            {/* Window Titlebar with tabs and live status */}
            <div className="rounded-xl overflow-hidden bg-obsidian-950/95 border border-white/[0.08]">
              <div className="h-11 px-4 flex items-center justify-between border-b border-white/[0.06] bg-obsidian-900/90">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="text-[11px] font-mono text-slate-500 ml-2">
                    zaltrex-telemetry-cluster
                  </span>
                </div>

                {/* Interactive View Switcher Tabs */}
                <div className="flex items-center bg-obsidian-950 p-1 rounded-lg border border-white/5 text-xs font-mono">
                  <button
                    onClick={() => {
                      playClick();
                      setActiveTab("visual");
                    }}
                    className={`px-3 py-1 rounded transition-all cursor-pointer ${
                      activeTab === "visual"
                        ? "bg-indigo-600/40 text-cyan-300 font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Architecture View
                  </button>
                  <button
                    onClick={() => {
                      playClick();
                      setActiveTab("metrics");
                    }}
                    className={`px-3 py-1 rounded transition-all cursor-pointer ${
                      activeTab === "metrics"
                        ? "bg-indigo-600/40 text-cyan-300 font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Telemetry Nodes
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ALL REGIONS SYNCED</span>
                </div>
              </div>

              {/* Showcase Screen Area: Image Zcover.png */}
              {activeTab === "visual" && (
                <div id="hero-tab-visual" className="relative group bg-obsidian-950 overflow-hidden">
                  <img
                    id="hero-showcase-img"
                    src="/Zcover.png"
                    onError={(e) => {
                      e.currentTarget.src = "Zcover.png";
                    }}
                    alt="Zaltrex Platform Architecture Showcase"
                    className="w-full h-auto object-cover max-h-[600px] select-none rounded-b-xl transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-50"></div>

                  {/* Floating live telemetry chip on the image */}
                  <div className="absolute bottom-6 left-6 p-3 rounded-xl bg-obsidian-950/85 backdrop-blur-md border border-white/10 text-left font-mono text-xs shadow-2xl flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">GLOBAL THROUGHPUT</div>
                      <div className="text-white font-bold text-sm">
                        4.82M req/sec • 99.999% SLA
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Alternate Tab: Real-Time Cluster Nodes Map */}
              {activeTab === "metrics" && (
                <div id="hero-tab-metrics" className="p-8 bg-obsidian-950 font-mono text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                      <div className="text-slate-400 text-xs mb-1">NODE: US-EAST-01</div>
                      <div className="text-xl font-bold text-emerald-400">ACTIVE (0.8ms)</div>
                      <div className="text-xs text-slate-500 mt-2">1,248 pods • 24.1 TB/h</div>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                      <div className="text-slate-400 text-xs mb-1">NODE: EU-WEST-03</div>
                      <div className="text-xl font-bold text-emerald-400">ACTIVE (1.1ms)</div>
                      <div className="text-xs text-slate-500 mt-2">984 pods • 19.8 TB/h</div>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                      <div className="text-slate-400 text-xs mb-1">NODE: AP-SOUTHEAST-01</div>
                      <div className="text-xl font-bold text-cyan-400">SYNCING (2.4ms)</div>
                      <div className="text-xs text-slate-500 mt-2">640 pods • 11.2 TB/h</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-black border border-white/10 text-xs text-slate-300">
                    <span className="text-indigo-400">[07:12:44 UTC]</span> Raft consensus
                    election completed across 12 master nodes. All shards balanced.
                    <br />
                    <span className="text-indigo-400">[07:12:45 UTC]</span> Auto-scaling policy
                    triggered: Provisioned +120 worker pods in Frankfurt cluster.
                    <br />
                    <span className="text-emerald-400">[07:12:46 UTC]</span> Zero-loss failover
                    verified with 0 dropped frames.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
