import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import AdminRequestsTable from "@/components/admin/AdminRequestsTable";
import SignOutButton from "@/components/admin/SignOutButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const requests = await prisma.request.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const contactedCount = requests.filter((r) => r.status === "CONTACTED").length;
  const completedCount = requests.filter((r) => r.status === "COMPLETED").length;

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-30 z-0"></div>

      {/* Top Admin Telemetry Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.08] px-6 sm:px-10 h-18 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 border border-white/15">
              <img src="/Zpfp.png" alt="Zaltrex" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-white">ZALTREX</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/40">
                  ADMIN SOVEREIGN
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>CLUSTER: ONLINE (SLA 99.999%)</span>
          </div>

          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            <span>🌐 View Site</span>
          </Link>

          <SignOutButton />
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-grow z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 py-10 space-y-10">
        {/* Title & Quick Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-1">
              Operational Command
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white font-sans">
              Enterprise Inquiries &amp; Proposals
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Inspect, manage, and dispatch responses to client requests submitted through the sovereign cloud platform.
            </p>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3.5 rounded-xl bg-obsidian-900 border border-white/[0.08] min-w-[120px]">
              <div className="text-[10px] text-slate-500 uppercase">Total Inquiries</div>
              <div className="text-2xl font-black text-white mt-1">{totalCount}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-900 border border-amber-500/20 min-w-[120px]">
              <div className="text-[10px] text-amber-400/80 uppercase">Pending Action</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{pendingCount}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-900 border border-cyan-500/20 min-w-[120px]">
              <div className="text-[10px] text-cyan-400/80 uppercase">In Contact</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">{contactedCount}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-900 border border-emerald-500/20 min-w-[120px]">
              <div className="text-[10px] text-emerald-400/80 uppercase">Completed</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{completedCount}</div>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <AdminRequestsTable initialRequests={requests} />
      </main>
    </div>
  );
}
