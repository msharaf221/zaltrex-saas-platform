"use client";

import React from "react";
import { useSound } from "../audio/SoundContext";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { playHover, playClick } = useSound();

  return (
    <header className="sticky top-[31px] z-40 w-full glass-panel border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-indigo-500/30 via-slate-800 to-cyan-500/30 border border-white/15 shadow-lg shadow-indigo-500/10 group-hover:scale-105 group-hover:border-cyan-400/60 transition-all duration-300">
            <img
              src="/Zpfp.png"
              onError={(e) => {
                e.currentTarget.src = "Zpfp.png";
              }}
              alt="Zaltrex Core Logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider text-white font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                ZALTREX
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/40 tracking-wider">
                ENTERPRISE
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono font-medium">
              Distributed Cloud Intelligence
            </span>
          </div>
        </a>

        {/* Center Navigation Links with Hover Light Pill */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-obsidian-900/90 border border-white/[0.08] text-xs font-semibold text-slate-300">
          <a
            href="#platform"
            onMouseEnter={playHover}
            className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Platform
          </a>
          <a
            href="#architecture"
            onMouseEnter={playHover}
            className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Architecture
          </a>
          <a
            href="#playground"
            onMouseEnter={playHover}
            className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1.5"
          >
            <span>Live Console</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </a>
          <a
            href="#portfolio"
            onMouseEnter={playHover}
            className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Portfolio
          </a>
          <a
            href="#benchmark"
            onMouseEnter={playHover}
            className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Benchmark
          </a>
          <a
            href="#contact"
            onMouseEnter={playHover}
            className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Contact
          </a>
          <a
            href="#pricing"
            onMouseEnter={playHover}
            className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Pricing
          </a>
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playClick();
              onOpenCommandPalette();
            }}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span>Sign In</span>
          </button>

          <a
            href="#cta"
            onClick={playClick}
            className="relative group inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 animate-glow-spin"></span>
            <span className="relative px-5 py-2.5 rounded-[11px] bg-obsidian-950 font-semibold text-xs tracking-wide text-white flex items-center gap-2 group-hover:bg-opacity-80 transition-all">
              <span>Deploy Cluster</span>
              <svg
                className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
