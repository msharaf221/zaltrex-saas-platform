"use client";

import React, { useState } from "react";
import { useSound } from "../audio/SoundContext";
import { useToast } from "../ui/ToastContext";

export default function CallToAction() {
  const [email, setEmail] = useState("");
  const { playClick, playSuccess } = useSound();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playSuccess();
    showToast("Access link dispatched to your enterprise inbox!");
    setEmail("");
  };

  return (
    <section className="py-24 md:py-32 relative bg-obsidian-900/40" id="cta">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="relative rounded-3xl p-10 sm:p-14 md:p-20 bg-gradient-to-b from-obsidian-850 via-obsidian-900 to-obsidian-950 border border-white/10 overflow-hidden text-center shadow-2xl">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-4 inline-block">
              Immediate Provisioning
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
              Ready to Upgrade to True Sovereign Cloud?
            </h2>
            <p className="text-slate-300 text-sm md:text-base mb-10 leading-relaxed">
              Deploy your first enterprise sandbox in 90 seconds. Full enterprise access with
              isolated namespaces and dedicated compute.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-md mx-auto"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-4 rounded-xl bg-obsidian-950/90 border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all flex-grow font-mono"
                placeholder="developer@company.com"
                required
                type="email"
              />
              <button
                onClick={playClick}
                className="px-7 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                type="submit"
              >
                Deploy Sandbox
              </button>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 14-day free trial
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> SOC2 Type II Certified
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> No credit card required
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
