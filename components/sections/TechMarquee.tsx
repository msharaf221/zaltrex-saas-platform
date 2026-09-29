"use client";

import React from "react";

export default function TechMarquee() {
  const items = [
    { text: "Next.js & React 19", highlight: true, dot: true },
    { text: "Cloud Infrastructure (AWS & Azure)" },
    { text: "Flutter & React Native Mobile" },
    { text: "AI & LLM Integration", cyan: true },
    { text: "Node.js & Python Backend", highlight: true },
    { text: "Docker & Kubernetes DevOps" },
    { text: "PostgreSQL & Redis Caching" },
    { text: "Enterprise Cybersecurity", dot: true },
  ];

  return (
    <div className="border-y border-white/[0.08] bg-obsidian-900/60 py-4 overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex items-center gap-10 text-xs font-mono font-medium text-slate-400 tracking-wider uppercase px-6">
          {items.map((item, idx) => (
            <React.Fragment key={`set1-${idx}`}>
              <span
                className={`flex items-center gap-2 ${
                  item.highlight
                    ? "text-white font-bold"
                    : item.cyan
                    ? "text-cyan-400 font-bold"
                    : "text-slate-300"
                }`}
              >
                {item.dot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                )}
                {item.text}
              </span>
              <span className="text-slate-600">•</span>
            </React.Fragment>
          ))}
        </div>
        {/* Duplicate for infinite loop */}
        <div className="flex items-center gap-10 text-xs font-mono font-medium text-slate-400 tracking-wider uppercase px-6">
          {items.map((item, idx) => (
            <React.Fragment key={`set2-${idx}`}>
              <span
                className={`flex items-center gap-2 ${
                  item.highlight
                    ? "text-white font-bold"
                    : item.cyan
                    ? "text-cyan-400 font-bold"
                    : "text-slate-300"
                }`}
              >
                {item.dot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                )}
                {item.text}
              </span>
              <span className="text-slate-600">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
