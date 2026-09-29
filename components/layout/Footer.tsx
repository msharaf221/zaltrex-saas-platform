"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-obsidian-950 py-16 text-sm text-slate-400 z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden p-0.5 bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 border border-white/15">
                <img
                  src="/Zpfp.png"
                  alt="Zaltrex"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <span className="text-xl font-black tracking-wider text-white">ZALTREX</span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
              Zaltrex is an emerging IT Solutions &amp; Software Engineering startup. We build high-impact web platforms, custom mobile applications, cloud infrastructure, and AI-powered automation to empower businesses to scale securely.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-500 flex flex-col gap-1">
              <div>📍 Cairo, Egypt &amp; Remote Global Delivery</div>
              <div>✉️ contact@zaltrex.cloud | info@zaltrex.com</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link className="hover:text-white transition-colors" href="/about">
                  About Zaltrex
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/services">
                  Our Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/projects">
                  Projects &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/blog">
                  Tech Blog &amp; Insights
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/contact">
                  Contact &amp; Quotes
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              IT Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link className="hover:text-white transition-colors" href="/services#web-cloud">
                  Web &amp; Cloud Applications
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/services#custom-software">
                  Custom Software &amp; ERP
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/services#mobile-apps">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/services#ai-automation">
                  AI &amp; Business Automation
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/services#cybersecurity">
                  Cybersecurity &amp; DevOps
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Connect & Admin */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              Client Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link className="hover:text-white transition-colors" href="/contact">
                  Request a Free Proposal
                </Link>
              </li>
              <li>
                <a
                  className="hover:text-cyan-400 transition-colors"
                  href="https://wa.me/201001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Direct WhatsApp Chat ↗
                </a>
              </li>
              <li>
                <Link className="hover:text-white transition-colors flex items-center gap-1.5" href="/admin">
                  <span>🔐 Admin CMS Login</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <div>© {new Date().getFullYear()} Zaltrex IT Solutions. All rights reserved.</div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Accepting New Projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
