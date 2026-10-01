"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PostRecord } from "@/components/admin/AdminPostsManager";

interface BlogCatalogProps {
  initialPosts: PostRecord[];
}

export default function BlogCatalog({ initialPosts }: BlogCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = [
    "ALL",
    ...Array.from(new Set(initialPosts.map((p) => p.category).filter(Boolean))),
  ];

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "ALL" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Search & Categories Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-obsidian-900/80 p-4 sm:p-5 rounded-2xl border border-white/[0.08]">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search articles by topic, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-obsidian-950 border border-white/10 rounded-xl text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <svg
            className="w-4 h-4 absolute left-3.5 top-3 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-600/40 text-cyan-300 font-bold border border-indigo-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="rounded-2xl border border-white/[0.08] bg-obsidian-900/80 overflow-hidden flex flex-col group hover:border-cyan-500/40 transition-all duration-300 shadow-xl hover:-translate-y-1"
          >
            {/* Cover Image */}
            <div className="relative h-48 overflow-hidden bg-obsidian-950">
              <Image
                src={post.coverImage || "/Max_a_عندنا_شركة_it_اسمها_.png"}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-950/80 text-cyan-300 border border-indigo-500/40 backdrop-blur-md">
                  {post.category}
                </span>
              </div>
              {post.galleryImages && (() => {
                try {
                  const parsed = JSON.parse(post.galleryImages);
                  const count = Array.isArray(parsed) ? parsed.length : 0;
                  if (count > 0) {
                    return (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/80 text-cyan-300 border border-cyan-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                          <span>📷</span>
                          <span>{count} photos</span>
                        </span>
                      </div>
                    );
                  }
                } catch {
                  return null;
                }
                return null;
              })()}
            </div>

            {/* Post details */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-2">
                <span>{post.author}</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-sans mb-3 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6 flex-grow">
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
                  Read Article →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 text-slate-500 font-mono text-xs">
          No articles matched your search or category filter.
        </div>
      )}
    </div>
  );
}
