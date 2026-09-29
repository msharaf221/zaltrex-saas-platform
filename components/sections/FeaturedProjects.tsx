import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectRecord } from "../admin/AdminProjectsManager";

interface FeaturedProjectsProps {
  projects: ProjectRecord[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const displayProjects = projects.slice(0, 3);

  return (
    <section className="py-20 md:py-28 relative bg-obsidian-900/40 border-t border-white/[0.06]" id="projects">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Proven Results
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
              Featured Client Projects.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              Explore some of the high-performance platforms, AI tools, and enterprise systems delivered by our team.
            </p>
            <Link
              href="/projects"
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5"
            >
              <span>View All Portfolio Projects ({projects.length})</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className="rounded-2xl border border-white/[0.08] bg-obsidian-900/90 overflow-hidden flex flex-col group hover:border-cyan-500/40 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              {/* Image Banner */}
              <div className="relative h-56 overflow-hidden bg-obsidian-950">
                <Image
                  src={proj.imageUrl || "/Max_a_هات_الباكدج_مفصلة.png"}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-950/80 text-cyan-300 border border-indigo-500/40 backdrop-blur-md">
                    {proj.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                  <span>0{idx + 1}</span>
                  <span>/</span>
                  <span>{proj.client || "ENTERPRISE"}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-sans">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-grow">
                  {proj.description}
                </p>

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

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    href={`/projects/${proj.id}`}
                    className="inline-flex items-center text-xs font-bold font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>View Case Study →</span>
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
      </div>
    </section>
  );
}
