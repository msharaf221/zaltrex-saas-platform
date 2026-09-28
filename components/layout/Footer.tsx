"use client";

import React from "react";
import { useSound } from "../audio/SoundContext";
import { useToast } from "../ui/ToastContext";

export default function Footer() {
  const { playClick } = useSound();
  const { showToast } = useToast();

  const copyDocumentationLink = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    const url = "https://docs.zaltrex.cloud";
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showToast(`Copied to clipboard: ${url}`);
      })
      .catch(() => {
        showToast("Copied to clipboard!");
      });
  };

  const handleToastAction = (e: React.MouseEvent, message: string) => {
    e.preventDefault();
    playClick();
    showToast(message);
  };

  return (
    <footer className="border-t border-white/[0.08] bg-obsidian-950 py-16 text-sm text-slate-400 z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/Max_a_هات_لوجو_صغير.png"
                onError={(e) => {
                  e.currentTarget.src = "Max_a_هات_لوجو_صغير.png";
                }}
                alt="Zaltrex Mark"
                className="w-8 h-8 object-contain rounded"
              />
              <span className="text-xl font-black tracking-wider text-white">ZALTREX</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
              Next-generation distributed cloud fabric, high-throughput software architecture, and
              sovereign intelligence for mission-critical organizations worldwide.
            </p>
            <div className="text-xs font-mono text-slate-500">
              Build: #8f92b • Region: Edge Global Mesh
            </div>
          </div>

          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-white transition-colors" href="#platform">
                  Edge Mesh Engine
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#playground">
                  Live Console
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#portfolio">
                  Enterprise Suite
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#benchmark">
                  Benchmark Tool
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  className="hover:text-white transition-colors cursor-pointer"
                  href="#"
                  onClick={copyDocumentationLink}
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors cursor-pointer"
                  href="#"
                  onClick={(e) => handleToastAction(e, "API reference loaded!")}
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors cursor-pointer"
                  href="#"
                  onClick={(e) => handleToastAction(e, "Architecture whitepaper downloaded")}
                >
                  Whitepaper (PDF)
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Changelog v4.8
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Security Overview
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  SOC2 Compliance
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <div>© 2026 Zaltrex Cloud Systems Inc. All rights reserved.</div>
          <div className="mt-4 sm:mt-0 flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ALL CLOUD FABRICS OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
