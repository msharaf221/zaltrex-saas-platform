import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
  });

  if (!post) return { title: "Article Not Found — Zaltrex" };

  return {
    title: `${post.title} — Zaltrex Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
  });

  if (!post || !post.published) notFound();

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <BackgroundEffects />
      <Navbar />

      <main className="flex-grow z-20">
        {/* Article Header */}
        <section className="pt-16 pb-12 md:pt-24 md:pb-16 border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-6">
            <Link
              href="/blog"
              className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1.5"
            >
              <span>← Back to all articles</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/40">
                {post.category}
              </span>
              <span className="text-xs font-mono text-slate-400">{post.readTime}</span>
              <span className="text-xs font-mono text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-400">{formattedDate}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {post.excerpt}
            </p>

            {/* Author bar */}
            <div className="pt-4 flex items-center gap-3 border-t border-white/[0.08]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5">
                <div className="w-full h-full rounded-full bg-obsidian-950 flex items-center justify-center font-bold text-xs text-white">
                  {post.author.charAt(0)}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-white">{post.author}</div>
                <div className="text-xs text-slate-400">Zaltrex Engineering &amp; Research</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {post.coverImage && (
          <section className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-obsidian-900 max-h-[480px]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        )}

        {/* Article Body */}
        <section className="max-w-3xl mx-auto px-6 sm:px-8 py-8">
          <article className="prose prose-invert max-w-none space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-sans">
            {post.content.split("\n\n").map((block: string, idx: number) => {
              // Section Heading (###)
              if (block.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="text-xl sm:text-2xl font-bold text-white pt-6 border-b border-white/[0.06] pb-2 font-sans"
                  >
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              // Subheading (##)
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="text-2xl sm:text-3xl font-bold text-white pt-8 pb-3 font-sans"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              // Bullet lists
              if (block.startsWith("- ") || block.startsWith("* ")) {
                const items = block.split("\n");
                return (
                  <ul key={idx} className="space-y-2 pl-4 list-disc text-slate-300 my-4">
                    {items.map((it: string, i: number) => (
                      <li key={i}>{it.replace(/^[-*]\s+/, "")}</li>
                    ))}
                  </ul>
                );
              }
              // Regular paragraph
              return (
                <p key={idx} className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {block}
                </p>
              );
            })}
          </article>

          {/* Author Card Footer */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-obsidian-900/80 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5 flex-shrink-0">
              <div className="w-full h-full rounded-2xl bg-obsidian-950 flex items-center justify-center font-bold text-xl text-white">
                {post.author.charAt(0)}
              </div>
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-mono text-cyan-400">Written by</div>
              <h4 className="text-base font-bold text-white">{post.author}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contributing insights, architectural reviews, and best practices from the Zaltrex engineering lab.
              </p>
            </div>
          </div>
        </section>

        <ConsultationCTA />
      </main>

      <Footer />
    </>
  );
}
