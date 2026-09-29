"use client";

import React, { useState } from "react";
import AdminProjectsManager, { ProjectRecord } from "./AdminProjectsManager";
import AdminPostsManager, { PostRecord } from "./AdminPostsManager";
import AdminRequestsTable from "./AdminRequestsTable";
import AdminAiAgentManager, { AgentConfigRecord } from "./AdminAiAgentManager";

interface RequestRecord {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  projectDetails: string;
  budget: string | null;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface AdminDashboardClientProps {
  initialProjects: ProjectRecord[];
  initialPosts: PostRecord[];
  initialRequests: RequestRecord[];
  initialAgentConfig?: AgentConfigRecord | null;
}

export default function AdminDashboardClient({
  initialProjects,
  initialPosts,
  initialRequests,
  initialAgentConfig,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "blog" | "inquiries" | "ai-agent">("overview");

  const pendingRequests = initialRequests.filter((r) => r.status === "PENDING").length;
  const contactedRequests = initialRequests.filter((r) => r.status === "CONTACTED").length;
  const completedRequests = initialRequests.filter((r) => r.status === "COMPLETED").length;
  const featuredProjects = initialProjects.filter((p) => p.featured).length;
  const publishedPosts = initialPosts.filter((p) => p.published).length;

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4 font-mono text-xs">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "overview"
              ? "bg-indigo-600/30 text-cyan-300 font-bold border border-indigo-500/40"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <span>📊</span>
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "projects"
              ? "bg-indigo-600/30 text-cyan-300 font-bold border border-indigo-500/40"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <span>🚀</span>
          <span>Projects ({initialProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("blog")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "blog"
              ? "bg-indigo-600/30 text-cyan-300 font-bold border border-indigo-500/40"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <span>✍️</span>
          <span>Blog &amp; Articles ({initialPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("inquiries")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "inquiries"
              ? "bg-indigo-600/30 text-cyan-300 font-bold border border-indigo-500/40"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <span>📬</span>
          <span>Client Inquiries ({initialRequests.length})</span>
          {pendingRequests > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {pendingRequests} new
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("ai-agent")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "ai-agent"
              ? "bg-indigo-600/30 text-cyan-300 font-bold border border-indigo-500/40"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <span>🤖</span>
          <span>AI Agent &amp; Dialects</span>
          <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
            Live
          </span>
        </button>
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Top Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            {/* Total Projects */}
            <div className="p-5 rounded-2xl bg-obsidian-900 border border-white/[0.08] relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>PORTFOLIO PROJECTS</span>
                <span className="text-cyan-400">🚀</span>
              </div>
              <div className="text-3xl font-black text-white">{initialProjects.length}</div>
              <div className="text-[11px] text-slate-500 mt-2">
                {featuredProjects} highlighted on Homepage
              </div>
              <button
                onClick={() => setActiveTab("projects")}
                className="mt-4 text-xs text-cyan-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Manage Projects →
              </button>
            </div>

            {/* Total Posts */}
            <div className="p-5 rounded-2xl bg-obsidian-900 border border-white/[0.08] relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>BLOG ARTICLES</span>
                <span className="text-indigo-400">✍️</span>
              </div>
              <div className="text-3xl font-black text-white">{initialPosts.length}</div>
              <div className="text-[11px] text-slate-500 mt-2">
                {publishedPosts} published online
              </div>
              <button
                onClick={() => setActiveTab("blog")}
                className="mt-4 text-xs text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Manage Articles →
              </button>
            </div>

            {/* Pending Inquiries */}
            <div className="p-5 rounded-2xl bg-obsidian-900 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs text-amber-400/80 mb-2">
                <span>PENDING LEADS</span>
                <span className="text-amber-400">⚡</span>
              </div>
              <div className="text-3xl font-black text-amber-400">{pendingRequests}</div>
              <div className="text-[11px] text-slate-500 mt-2">
                {initialRequests.length} total client inquiries
              </div>
              <button
                onClick={() => setActiveTab("inquiries")}
                className="mt-4 text-xs text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                View Inquiries →
              </button>
            </div>

            {/* In Contact / Closed */}
            <div className="p-5 rounded-2xl bg-obsidian-900 border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs text-emerald-400/80 mb-2">
                <span>CONVERTED CLIENTS</span>
                <span className="text-emerald-400">✔</span>
              </div>
              <div className="text-3xl font-black text-emerald-400">
                {contactedRequests + completedRequests}
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                {completedRequests} projects completed
              </div>
              <button
                onClick={() => setActiveTab("inquiries")}
                className="mt-4 text-xs text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Track Workflows →
              </button>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-white/[0.08] flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Have a new completed project?</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Add the project details, client review, and screenshots to showcase your startup's capability.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("projects")}
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap"
              >
                + Add Project
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-white/[0.08] flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Share technical insights or company news</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Publish a new blog post to enhance your company's SEO and demonstrate technical excellence.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("blog")}
                className="px-4 py-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap"
              >
                + Write Article
              </button>
            </div>
          </div>

          {/* Recent Inquiries Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-sans">Recent Client Inquiries</h3>
              <button
                onClick={() => setActiveTab("inquiries")}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                View all ({initialRequests.length}) →
              </button>
            </div>
            <AdminRequestsTable initialRequests={initialRequests.slice(0, 5)} />
          </div>
        </div>
      )}

      {/* TAB CONTENT: Projects */}
      {activeTab === "projects" && (
        <AdminProjectsManager initialProjects={initialProjects} />
      )}

      {/* TAB CONTENT: Blog */}
      {activeTab === "blog" && (
        <AdminPostsManager initialPosts={initialPosts} />
      )}

      {/* TAB CONTENT: Inquiries */}
      {activeTab === "inquiries" && (
        <div className="space-y-6">
          <div className="bg-obsidian-900/80 p-5 rounded-2xl border border-white/[0.08]">
            <h2 className="text-xl font-bold text-white">All Client Leads &amp; Project Inquiries</h2>
            <p className="text-xs text-slate-400 mt-1">
              Review incoming project briefs, contact prospects, and update engagement statuses.
            </p>
          </div>
          <AdminRequestsTable initialRequests={initialRequests} />
        </div>
      )}

      {/* TAB CONTENT: AI Agent & Dialects */}
      {activeTab === "ai-agent" && (
        <AdminAiAgentManager
          initialConfig={initialAgentConfig || null}
          aiLeads={initialRequests.filter((r) => r.service === "AI Chat Lead")}
        />
      )}
    </div>
  );
}
