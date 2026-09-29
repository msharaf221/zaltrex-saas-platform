import React from "react";
import Link from "next/link";
import { PostRecord } from "../admin/AdminPostsManager";

interface LatestBlogPostsProps {
  posts: PostRecord[];
}

export default function LatestBlogPosts({ posts }: LatestBlogPostsProps) {
  const displayPosts = posts.filter((p) => p.published).slice(0, 3);

  if (displayPosts.length === 0) return null;

  return (
    <section className="py-20 md:py-28 relative bg-obsidian-900/30 border-t border-white/[0.06]" id="blog">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Insights &amp; Engineering
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
              Latest From Our Tech Blog.
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5"
          >
            <span>Read All Articles</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-white/[0.08] bg-obsidian-900/80 overflow-hidden flex flex-col group hover:border-cyan-500/40 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden bg-obsidian-950">
                <img
                  src={post.coverImage || "/Max_a_عندنا_شركة_it_اسمها_.png"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-950/80 text-cyan-300 border border-indigo-500/40 backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-2">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-sans mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">
                    Read Story →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
