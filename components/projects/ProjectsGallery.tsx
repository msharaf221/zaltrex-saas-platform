"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProjectRecord } from "@/components/admin/AdminProjectsManager";

interface ProjectsGalleryProps {
  initialProjects: ProjectRecord[];
}

export default function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Extract unique categories
  const categories = [
    "ALL",
    ...Array.from(new Set(initialProjects.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? initialProjects
      : initialProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold shadow-lg shadow-indigo-600/25"
                : "bg-obsidian-900 border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl border border-white/[0.08] bg-obsidian-900/80 overflow-hidden flex flex-col group hover:border-cyan-500/40 transition-all duration-300 shadow-xl hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-obsidian-950">
              <img
                src={proj.imageUrl || "/Max_a_هات_الباكدج_مفصلة.png"}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-80"></div>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-950/80 text-cyan-300 border border-indigo-500/40 backdrop-blur-md">
                  {proj.category}
                </span>
                {proj.featured && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                    ★ Featured
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col flex-grow">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-2">
                <span>CLIENT: {proj.client || "Enterprise Partner"}</span>
                <span>{new Date(proj.createdAt).getFullYear()}</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-sans mb-3">
                {proj.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6 flex-grow">
                {proj.description}
              </p>

              {/* Tags */}
              {proj.tags && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tags.split(",").slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-300 border border-white/5"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Links */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <Link
                  href={`/projects/${proj.id}`}
                  className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
                >
                  <span>Case Study</span>
                  <span>→</span>
                </Link>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-slate-500 font-mono text-xs">
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
