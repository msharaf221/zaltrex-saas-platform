import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import BlogCatalog from "@/components/blog/BlogCatalog";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata = {
  title: "Tech Blog & Software Engineering Insights — Zaltrex",
  description:
    "Practical engineering articles on modern cloud architecture, cybersecurity best practices, AI integration, and startup scalability by the Zaltrex team.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <BackgroundEffects />
      <Navbar />

      <main className="flex-grow z-20">
        {/* Hero */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-white/[0.06] text-center">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-cyan-300 font-semibold">
              <span>ZALTREX TECH JOURNAL</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans">
              Engineering Insights &amp; Perspectives.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We share real-world lessons from designing distributed cloud architectures, building scalable SaaS platforms, and deploying practical AI solutions.
            </p>
          </div>
        </section>

        {/* Catalog */}
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
          <BlogCatalog initialPosts={posts as any} />
        </section>

        <ConsultationCTA />
      </main>

      <Footer />
    </>
  );
}
