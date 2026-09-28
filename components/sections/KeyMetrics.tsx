"use client";

import React, { useEffect, useState, useRef } from "react";

export default function KeyMetrics() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);
  const [val3, setVal3] = useState(0);
  const [val4, setVal4] = useState(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate 99.99
            const dur = 1500;
            const steps = 50;
            const stepTime = dur / steps;

            let curStep = 0;
            const timer = setInterval(() => {
              curStep++;
              const progress = curStep / steps;

              setVal1(parseFloat((progress * 99.99).toFixed(2)));
              setVal2(Math.floor(progress * 10));
              setVal3(Math.floor(progress * 500));
              setVal4(Math.floor(progress * 12));

              if (curStep >= steps) {
                setVal1(99.99);
                setVal2(10);
                setVal3(500);
                setVal4(12);
                clearInterval(timer);
              }
            }, stepTime);
          }
        });
      },
      { threshold: 0.25 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 border-b border-white/[0.07] bg-obsidian-900/40 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Metric 1 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/[0.06] pb-6 md:pb-0 md:pr-6 group">
            <span className="font-mono text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-2 flex items-baseline">
              <span>{hasAnimated ? val1 : 0}</span>
              <span className="text-cyan-400 text-3xl">%</span>
            </span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
              Service Availability
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Multi-region redundancy with instant cold-path failover
            </p>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/[0.06] pb-6 md:pb-0 md:pr-6 group">
            <span className="font-mono text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-2 flex items-baseline">
              <span>{hasAnimated ? val2 : 0}</span>
              <span className="text-indigo-400 text-3xl">x</span>
            </span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
              Deployment Velocity
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Zero-downtime rolling upgrades in less than 4 seconds
            </p>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/[0.06] pb-6 md:pb-0 md:pr-6 group">
            <span className="font-mono text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-2 flex items-baseline">
              <span>{hasAnimated ? val3 : 0}</span>
              <span className="text-cyan-400 text-3xl">M+</span>
            </span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
              Daily Ingested Events
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Real-time log & telemetry processing without backlog spikes
            </p>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left group">
            <span className="font-mono text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-2 flex items-baseline">
              &lt;<span>{hasAnimated ? val4 : 0}</span>
              <span className="text-indigo-400 text-3xl">ms</span>
            </span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
              Edge Execution Latency
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Distributed PoPs positioned directly at Tier-1 internet exchanges
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
