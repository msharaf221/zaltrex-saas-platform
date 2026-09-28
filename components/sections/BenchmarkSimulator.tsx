"use client";

import React, { useState } from "react";

export default function BenchmarkSimulator() {
  const [rps, setRps] = useState<number>(100000);

  const legacyLatency = (18 + (rps / 1000000) * 85).toFixed(1);
  const zaltrexLatency = (1.2 + (rps / 1000000) * 3.4).toFixed(1);
  const savings = Math.round(1200 + (rps / 10000) * 62);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRps(parseInt(e.target.value, 10));
  };

  return (
    <section
      className="py-24 md:py-32 relative bg-obsidian-950 border-t border-white/[0.07]"
      id="benchmark"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 tracking-widest uppercase mb-3 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            Dynamic Simulator
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Benchmark Your Scale &amp; Latency
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Adjust the slider to simulate traffic volume and witness how the Zaltrex Rust mesh
            crushes latency and cloud overhead.
          </p>
        </div>

        <div className="spotlight-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
          {/* Slider Control */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="rps-slider" className="text-sm font-mono text-slate-300">
                REQUESTS PER SECOND (RPS):
              </label>
              <span id="slider-rps-value" className="text-2xl font-black font-mono text-cyan-400">
                {rps.toLocaleString()} req/s
              </span>
            </div>
            <input
              id="rps-slider"
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={rps}
              onChange={handleSliderChange}
              className="w-full h-2.5 bg-obsidian-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
              <span>10K RPS (Startup)</span>
              <span>250K RPS</span>
              <span>500K RPS (Scaleup)</span>
              <span>1M+ RPS (Hyperscale)</span>
            </div>
          </div>

          {/* Dynamic Calculations Output Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
            <div className="p-5 rounded-2xl bg-obsidian-900 border border-white/5">
              <span className="text-xs font-mono text-slate-400">LEGACY CLUSTER LATENCY</span>
              <div
                id="calc-legacy-latency"
                className="text-3xl font-black font-mono text-red-400/80 mt-2"
              >
                {legacyLatency}ms
              </div>
              <span className="text-[10px] text-slate-500">
                Standard Node.js / Kubernetes
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
              <span className="text-xs font-mono text-cyan-300">ZALTREX MESH LATENCY</span>
              <div
                id="calc-zaltrex-latency"
                className="text-3xl font-black font-mono text-emerald-400 mt-2"
              >
                {zaltrexLatency}ms
              </div>
              <span className="text-[10px] text-emerald-400/80">
                ⚡ 12.6x Faster response time
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-obsidian-900 border border-white/5">
              <span className="text-xs font-mono text-slate-400">ESTIMATED MONTHLY SAVINGS</span>
              <div
                id="calc-savings"
                className="text-3xl font-black font-mono text-white mt-2"
              >
                ${savings.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500">
                Eliminating over-provisioned cores
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
