import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import ProjectsGallery from "@/components/projects/ProjectsGallery";
import Link from "next/link";
import {
  getSectionContent,
  DEFAULT_CTA,
  DEFAULT_GENERAL,
  DEFAULT_FOOTER,
  CtaContent,
  GeneralContent,
  FooterContent,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata = {
  title: "Projects & Engineering Portfolio — Zaltrex",
  description:
    "Explore case studies of scalable web applications, AI platforms, and cloud infrastructure engineered by Zaltrex.",
};

export default async function ProjectsPage() {
  const [projects, cta, general, footer] = await Promise.all([
    prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
    getSectionContent<CtaContent>("cta", DEFAULT_CTA),
    getSectionContent<GeneralContent>("general", DEFAULT_GENERAL),
    getSectionContent<FooterContent>("footer", DEFAULT_FOOTER),
  ]);

  return (
    <>
      <BackgroundEffects />
      <Navbar general={general} />

      <main className="flex-grow z-20">
        {/* Hero */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-white/[0.06] text-center">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-cyan-300 font-semibold">
              <span>CASE STUDIES &amp; PORTFOLIO</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans">
              Work That Delivers Real Business Value.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore our track record across SaaS platforms, AI integrations, mobile apps, and enterprise architectures.
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
          <ProjectsGallery initialProjects={projects as any} />
        </section>

        <ConsultationCTA content={cta} />
      </main>

      <Footer content={footer} general={general} />
    </>
  );
}
