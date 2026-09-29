import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });

  if (!project) return { title: "Project Not Found — Zaltrex" };

  return {
    title: `${project.title} — Zaltrex Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });

  if (!project) notFound();

  return (
    <>
      <BackgroundEffects />
      <Navbar />

      <main className="flex-grow z-20">
        {/* Breadcrumb & Header */}
        <section className="pt-16 pb-12 md:pt-24 md:pb-16 border-b border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-5">
            <Link
              href="/projects"
              className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1.5"
            >
              <span>← Back to all projects</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/40">
                {project.category}
              </span>
              {project.client && (
                <span className="text-xs font-mono text-slate-400">
                  Client: <strong className="text-white">{project.client}</strong>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>
        </section>

        {/* Featured Image */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8 py-10">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-obsidian-900 max-h-[500px]">
            <img
              src={project.imageUrl || "/Max_a_هات_الباكدج_مفصلة.png"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Deep Dive Case Study Content */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8 py-10 space-y-12">
          {/* Tech Stack Bar */}
          {project.tags && (
            <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Technologies &amp; Architecture:
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.split(",").map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-obsidian-950 text-xs font-mono text-slate-200 border border-white/10"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Content */}
          <div className="p-8 sm:p-10 rounded-3xl bg-obsidian-900/60 border border-white/[0.08] space-y-6">
            <h2 className="text-2xl font-bold text-white font-sans">
              Project Overview &amp; Execution
            </h2>
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-4">
              {project.content ||
                `${project.description} Engineered with scalable design patterns, high-availability architecture, and rigorous test coverage.`}
            </div>

            {project.liveUrl && (
              <div className="pt-6 border-t border-white/[0.08]">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs font-mono tracking-wider transition-all"
                >
                  <span>VISIT LIVE DEMO / SITE ↗</span>
                </a>
              </div>
            )}
          </div>
        </section>

        <ConsultationCTA />
      </main>

      <Footer />
    </>
  );
}
