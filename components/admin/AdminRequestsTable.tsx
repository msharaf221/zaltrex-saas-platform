"use client";

import React, { useState } from "react";
import { updateRequestStatus, deleteRequest } from "@/app/actions/admin";

interface RequestItem {
  id: string;
  name: string;
  email: string;
  projectDetails: string;
  budget: string | null;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface AdminRequestsTableProps {
  initialRequests: RequestItem[];
}

export default function AdminRequestsTable({ initialRequests }: AdminRequestsTableProps) {
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);
  const [filter, setFilter] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id);
    const res = await updateRequestStatus(id, newStatus);
    if (res.success) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    }
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to purge this enterprise inquiry?")) return;
    setLoadingId(id);
    const res = await deleteRequest(id);
    if (res.success) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
    setLoadingId(null);
  };

  const filteredRequests = requests.filter((r) => {
    const matchesFilter = filter === "ALL" || r.status === filter;
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.projectDetails.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "CONTACTED":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-obsidian-900/80 p-4 rounded-2xl border border-white/[0.08]">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search by client, domain, or specifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-obsidian-950 border border-white/10 rounded-xl text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <svg
            className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-500"
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
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-obsidian-950 p-1 rounded-xl border border-white/5 text-xs font-mono">
          {["ALL", "PENDING", "CONTACTED", "COMPLETED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === st
                  ? "bg-indigo-600/40 text-cyan-300 font-bold border border-indigo-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-white/[0.08] bg-obsidian-900/70 overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-slate-300">
            <thead className="bg-obsidian-950/80 text-[11px] text-slate-400 uppercase tracking-wider border-b border-white/[0.06]">
              <tr>
                <th className="py-4 px-6">Client / Enterprise</th>
                <th className="py-4 px-6">Estimated Budget</th>
                <th className="py-4 px-6">Status &amp; Workflow</th>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => {
                  const isExpanded = expandedId === req.id;
                  const dateStr = new Date(req.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <React.Fragment key={req.id}>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-white text-sm font-sans">{req.name}</div>
                          <a
                            href={`mailto:${req.email}`}
                            className="text-cyan-400 hover:underline text-xs flex items-center gap-1.5 mt-0.5"
                          >
                            <span>{req.email}</span>
                          </a>
                        </td>

                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 text-[11px] font-semibold">
                            {req.budget ?? "Unspecified"}
                          </span>
                        </td>

                        <td className="py-4 px-6">
                          <select
                            value={req.status}
                            disabled={loadingId === req.id}
                            onChange={(e) => handleStatusChange(req.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer focus:outline-none ${getStatusBadge(
                              req.status
                            )}`}
                          >
                            <option value="PENDING" className="bg-obsidian-950 text-amber-400">
                              PENDING
                            </option>
                            <option value="CONTACTED" className="bg-obsidian-950 text-cyan-400">
                              CONTACTED
                            </option>
                            <option value="COMPLETED" className="bg-obsidian-950 text-emerald-400">
                              COMPLETED
                            </option>
                          </select>
                        </td>

                        <td className="py-4 px-6 text-slate-500 text-[11px]">{dateStr}</td>

                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : req.id)}
                            className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                          >
                            {isExpanded ? "Collapse ▲" : "Inspect ▼"}
                          </button>

                          <button
                            onClick={() => handleDelete(req.id)}
                            disabled={loadingId === req.id}
                            className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-colors cursor-pointer text-[11px]"
                            title="Delete inquiry"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Project Details View */}
                      {isExpanded && (
                        <tr className="bg-obsidian-950/70 border-b border-indigo-500/20">
                          <td colSpan={5} className="p-6">
                            <div className="rounded-xl p-4 bg-obsidian-900 border border-white/10 space-y-2">
                              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                                <span>INQUIRY SPECIFICATION BRIEF (ID: {req.id})</span>
                                <span className="text-cyan-400">STATUS: {req.status}</span>
                              </div>
                              <p className="text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                                {req.projectDetails}
                              </p>
                              <div className="pt-2 flex items-center gap-3">
                                <a
                                  href={`mailto:${req.email}?subject=Regarding%20Your%20Zaltrex%20Architecture%20Inquiry`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs transition-colors font-mono"
                                >
                                  ✉ Reply Directly to Client
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No enterprise customer inquiries matching the current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
