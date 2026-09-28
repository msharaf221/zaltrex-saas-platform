"use client";

import React from "react";

export default function TechMarquee() {
  const items = [
    { text: "Rust Native Core", highlight: true, dot: true },
    { text: "eBPF Kernel Tracing" },
    { text: "Distributed Raft Consensus" },
    { text: "Sub-10ms Global mTLS" },
    { text: "Kafka & Vector Pipelines", highlight: true },
    { text: "Autonomous Microservices" },
    { text: "Zero-Trust Architecture" },
    { text: "WASM Edge Runtime", cyan: true },
  ];

  return (
    <div className="border-y border-white/[0.08] bg-obsidian-900/60 py-4 overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex items-center gap-12 text-xs font-mono font-medium text-slate-400 tracking-wider uppercase px-6">
          {items.map((item, idx) => (
            <React.Fragment key={`set1-${idx}`}>
              <span
                className={`flex items-center gap-2 ${
                  item.highlight
                    ? "text-white"
                    : item.cyan
                    ? "text-cyan-400"
                    : "text-slate-300"
                }`}
              >
                {item.dot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                )}
                {item.text}
              </span>
              <span>•</span>
            </React.Fragment>
          ))}
        </div>
        {/* Duplicate for continuous infinite loop */}
        <div className="flex items-center gap-12 text-xs font-mono font-medium text-slate-400 tracking-wider uppercase px-6">
          {items.map((item, idx) => (
            <React.Fragment key={`set2-${idx}`}>
              <span
                className={`flex items-center gap-2 ${
                  item.highlight
                    ? "text-white"
                    : item.cyan
                    ? "text-cyan-400"
                    : "text-slate-300"
                }`}
              >
                {item.dot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                )}
                {item.text}
              </span>
              <span>•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
