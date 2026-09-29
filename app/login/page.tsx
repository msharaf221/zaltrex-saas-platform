"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function LoginForm() {
  const [email, setEmail] = useState("admin@zaltrex.cloud");
  const [password, setPassword] = useState("adminpassword123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Access Denied: Invalid credentials or insufficient ADMIN clearance.");
        setLoading(false);
      } else {
        // Hard navigate so browser sends session cookies in the HTTP request to /admin
        window.location.href = callbackUrl;
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected authentication error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background cyber grid */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-40"></div>
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 border border-white/20 relative">
              <Image src="/Zpfp.png" alt="Zaltrex" width={40} height={40} className="w-full h-full object-cover rounded-lg" />
            </div>
            <span className="text-2xl font-black tracking-wider text-white">ZALTREX</span>
          </Link>
          <div className="mt-3 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            Sovereign Admin Gateway
          </div>
        </div>

        {/* Login Card */}
        <div className="spotlight-card rounded-2xl p-8 border border-white/10 shadow-2xl bg-obsidian-900/90 backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Authorized Access Only</h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter your privileged credentials to access the telemetry cluster.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">ADMIN IDENTIFIER (EMAIL)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                placeholder="admin@zaltrex.cloud"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">ENCRYPTED KEY (PASSWORD)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wider font-mono shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>AUTHENTICATING MESH...</span>
                </>
              ) : (
                <span>AUTHORIZE &amp; ENTER →</span>
              )}
            </button>
          </form>

          {/* Quick Credential hint for development convenience */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] text-[11px] font-mono text-slate-500 space-y-1">
            <div className="text-slate-400 font-semibold">Default Development Admin:</div>
            <div>Email: <span className="text-cyan-400">admin@zaltrex.cloud</span></div>
            <div>Password: <span className="text-indigo-400">adminpassword123</span></div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1.5"
          >
            <span>← Return to Sovereign Landing Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-obsidian-950 text-white flex items-center justify-center font-mono text-xs">
          Loading authentication gateway...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
