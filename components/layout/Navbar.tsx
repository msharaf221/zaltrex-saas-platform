"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-indigo-500/30 via-slate-800 to-cyan-500/30 border border-white/15 shadow-lg shadow-indigo-500/10 group-hover:scale-105 group-hover:border-cyan-400/60 transition-all duration-300">
            <img
              src="/Zpfp.png"
              alt="Zaltrex Logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                ZALTREX
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/40 tracking-wider">
                IT SOLUTIONS
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-slate-400 uppercase font-mono font-medium">
              Software &amp; Cloud Engineering
            </span>
          </div>
        </Link>

        {/* Desktop Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-obsidian-900/90 border border-white/[0.08] text-xs font-semibold text-slate-300 shadow-inner">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full transition-all ${
                  active
                    ? "bg-indigo-600/30 text-cyan-300 font-bold border border-indigo-500/40 shadow-sm"
                    : "hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA and Admin Access */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/admin"
            className="text-xs font-mono font-medium text-slate-400 hover:text-cyan-300 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1.5"
            title="Admin Portal"
          >
            <span>🔐</span>
            <span className="hidden md:inline">Admin</span>
          </Link>

          <Link
            href="/contact"
            className="relative group inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 animate-glow-spin"></span>
            <span className="relative px-5 py-2.5 rounded-[11px] bg-obsidian-950 font-semibold text-xs tracking-wide text-white flex items-center gap-2 group-hover:bg-opacity-80 transition-all">
              <span>Get a Quote</span>
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
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/contact"
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold sm:hidden"
          >
            Quote
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-obsidian-950/95 backdrop-blur-xl px-6 py-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-indigo-600/30 text-cyan-300 border border-indigo-500/40"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono text-slate-400 hover:text-white px-3 py-2 rounded-lg bg-white/[0.04]"
            >
              🔐 Admin Portal
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs font-mono text-center flex-grow"
            >
              Request a Consultation →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
