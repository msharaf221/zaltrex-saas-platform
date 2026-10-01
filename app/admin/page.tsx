import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import SignOutButton from "@/components/admin/SignOutButton";
import { getAllSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [requests, projects, posts, agentConfig, siteContent, users] = await Promise.all([
    prisma.request.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.agentConfig.findFirst({
      where: { id: "default_config" },
    }),
    getAllSiteContent(),
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-25 z-0"></div>

      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.08] px-6 sm:px-10 h-18 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 border border-white/15 relative">
              <Image src="/Zpfp.png" alt="Zaltrex" width={36} height={36} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-white">ZALTREX</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/40">
                  ADMIN CMS
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            <span>🌐 View Public Site</span>
          </Link>

          <SignOutButton />
        </div>
      </header>

      {/* Main CMS Area */}
      <main className="flex-grow z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 py-10">
        <div className="mb-8">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-1">
            Startup Management Portal
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white font-sans">
            Zaltrex Control Center
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Manage your company's portfolio projects, publish technical blog posts, and review client inquiries all from one unified dashboard.
          </p>
        </div>

        <AdminDashboardClient
          initialProjects={projects}
          initialPosts={posts}
          initialRequests={requests}
          initialAgentConfig={agentConfig}
          initialSiteContent={siteContent}
          initialUsers={users as any}
        />
      </main>
    </div>
  );
}
