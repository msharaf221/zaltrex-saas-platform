"use client";

import React, { useState, useEffect } from "react";
import { useSound } from "../audio/SoundContext";
import { useToast } from "../ui/ToastContext";

interface TelemetryBarProps {
  onOpenCommandPalette: () => void;
}

export default function TelemetryBar({ onOpenCommandPalette }: TelemetryBarProps) {
  const [ping, setPing] = useState(11);
  const { audioEnabled, toggleAudio, playClick } = useSound();
  const { showToast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 4) + 9); // 9ms to 12ms
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    toggleAudio();
    showToast(!audioEnabled ? "Sound synthesis activated" : "Audio muted");
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-obsidian-950/95 backdrop-blur-md text-[11px] font-mono text-slate-400 py-1.5 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">
            KERNEL: <span className="text-white">v4.8.2-PROD</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-slate-400">
          <span>EDGE CLUSTER:</span>
          <span className="text-cyan-400 font-semibold" id="cluster-name">
            FRA-REGION-01
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">LATENCY:</span>
          <span className="text-emerald-400 font-bold" id="live-ping">
            {ping}ms
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Audio FX Toggle Button */}
        <button
          id="audio-toggle"
          onClick={handleAudioToggle}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/10 hover:border-cyan-400/40 hover:text-white transition-all text-slate-400 text-[11px] cursor-pointer"
        >
          <span id="audio-icon">{audioEnabled ? "🔊" : "🔇"}</span>
          <span id="audio-status" className="hidden sm:inline">
            {audioEnabled ? "SFX: ON" : "SFX: OFF"}
          </span>
        </button>

        {/* Raycast-style ⌘K Launcher pill */}
        <button
          id="cmd-k-trigger"
          onClick={() => {
            playClick();
            onOpenCommandPalette();
          }}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/10 hover:border-indigo-400/50 hover:bg-white/[0.09] transition-all text-slate-300 group cursor-pointer"
        >
          <svg
            className="w-3 h-3 text-cyan-400 group-hover:rotate-12 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span>Command Menu</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 bg-black/50 border border-white/15 rounded text-[9px] text-slate-400">
            ⌘K
          </kbd>
        </button>
      </div>
    </div>
  );
}
