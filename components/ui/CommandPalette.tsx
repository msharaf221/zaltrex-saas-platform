"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSound } from "../audio/SoundContext";
import { useToast } from "./ToastContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { playClick } = useSound();
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast(`Copied to clipboard: ${text}`);
      })
      .catch(() => {
        showToast("Copied to clipboard!");
      });
  };

  const executeAction = (action: string) => {
    handleClose();
    playClick();
    if (action === "ping") {
      showToast("Global ping: 11.2ms to all 32 tier-1 regions.");
    } else if (action === "copy-install") {
      copyToClipboard("curl -sSL https://get.zaltrex.cloud | bash");
    } else if (action === "benchmark") {
      const benchmarkSection = document.getElementById("benchmark");
      if (benchmarkSection) {
        benchmarkSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (action === "sandbox") {
      showToast("Instant sandbox node created: sandbox-eu.zaltrex.cloud");
    }
  };

  if (!isOpen) return null;

  const actions = [
    {
      id: "ping",
      icon: "⚡",
      iconColor: "text-cyan-400",
      title: "Run Global Ping Diagnostic",
      badge: "11ms avg",
    },
    {
      id: "copy-install",
      icon: "📦",
      iconColor: "text-indigo-400",
      title: "Copy CLI Install Script",
      badge: "curl",
    },
    {
      id: "benchmark",
      icon: "📊",
      iconColor: "text-amber-400",
      title: "Jump to Interactive Benchmark",
      badge: "#benchmark",
    },
    {
      id: "sandbox",
      icon: "🚀",
      iconColor: "text-emerald-400",
      title: "Deploy Instant Sandbox Cluster",
      badge: "0ms delay",
    },
  ];

  const filtered = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      id="cmd-palette-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="w-full max-w-xl rounded-2xl bg-obsidian-900 border border-white/20 shadow-2xl overflow-hidden font-mono text-sm animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <svg
            className="w-5 h-5 text-cyan-400"
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
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
          />
          <kbd
            className="px-2 py-0.5 rounded bg-white/10 text-xs text-slate-400 cursor-pointer"
            onClick={handleClose}
          >
            ESC
          </kbd>
        </div>

        <div className="p-3 max-h-80 overflow-y-auto space-y-1 text-xs text-slate-300">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => executeAction(item.id)}
                className="p-3 rounded-lg hover:bg-white/10 flex items-center justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={item.iconColor}>{item.icon}</span>
                  <span className="group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                </div>
                <span className="text-slate-500 font-mono">{item.badge}</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-slate-500 text-xs">
              No commands found matching &quot;{query}&quot;
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-obsidian-950 border-t border-white/5 text-[11px] text-slate-500 flex justify-between">
          <span>
            Use <kbd className="text-slate-300">↑</kbd> <kbd className="text-slate-300">↓</kbd> to
            navigate
          </span>
          <span>
            Press <kbd className="text-slate-300">ENTER</kbd> to select
          </span>
        </div>
      </div>
    </div>
  );
}
