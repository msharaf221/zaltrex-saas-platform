"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  createPost,
  updatePost,
  deletePost,
  togglePostPublished,
  PostInput,
} from "@/app/actions/cms";

export interface PostRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  author: string;
  readTime: string;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface AdminPostsManagerProps {
  initialPosts: PostRecord[];
}

const PRESET_COVERS = [
  { label: "Cloud Mesh Infrastructure", url: "/Max_a_عندنا_شركة_it_اسمها_.png" },
  { label: "Full Architecture Suite", url: "/Max_a_هات_الباكدج_مفصلة.png" },
  { label: "AI & Innovation Laboratory", url: "/gemini-3.1-flash-lite-image (nano-banana-2-lite)_b_حلو_اوي_اللوجو_و_الك.jpeg" },
  { label: "Zaltrex Brand Identity", url: "/Max_a_هات_لوجو_احطه_على_ال.png" },
  { label: "Global Tech Cover", url: "/Zcover.png" },
];

const POST_CATEGORIES = [
  "Cloud & DevOps",
  "Cybersecurity",
  "AI & Innovation",
  "Software Engineering",
  "Business & Startups",
  "Mobile Apps",
];

export default function AdminPostsManager({ initialPosts }: AdminPostsManagerProps) {
  const [posts, setPosts] = useState<PostRecord[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState(POST_CATEGORIES[0]);
  const [formAuthor, setFormAuthor] = useState("Zaltrex Team");
  const [formReadTime, setFormReadTime] = useState("4 min read");
  const [formCoverImage, setFormCoverImage] = useState(PRESET_COVERS[0].url);
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formPublished, setFormPublished] = useState(true);

  const openCreateModal = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory(POST_CATEGORIES[0]);
    setFormAuthor("Zaltrex Team");
    setFormReadTime("4 min read");
    setFormCoverImage(PRESET_COVERS[0].url);
    setFormExcerpt("");
    setFormContent("");
    setFormPublished(true);
    setFeedback(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: PostRecord) => {
    setEditingPost(p);
    setFormTitle(p.title);
    setFormSlug(p.slug);
    setFormCategory(p.category || POST_CATEGORIES[0]);
    setFormAuthor(p.author || "Zaltrex Team");
    setFormReadTime(p.readTime || "4 min read");
    setFormCoverImage(p.coverImage || PRESET_COVERS[0].url);
    setFormExcerpt(p.excerpt);
    setFormContent(p.content);
    setFormPublished(p.published);
    setFeedback(null);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingPost) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const payload: PostInput = {
      title: formTitle,
      slug: formSlug,
      category: formCategory,
      author: formAuthor,
      readTime: formReadTime,
      coverImage: formCoverImage,
      excerpt: formExcerpt,
      content: formContent,
      published: formPublished,
    };

    if (editingPost) {
      const res = await updatePost(editingPost.id, payload);
      if (res.success && res.post) {
        setPosts((prev) =>
          prev.map((p) => (p.id === editingPost.id ? (res.post as PostRecord) : p))
        );
        setIsModalOpen(false);
      } else {
        setFeedback(res.error || "Failed to update article");
      }
    } else {
      const res = await createPost(payload);
      if (res.success && res.post) {
        setPosts((prev) => [res.post as PostRecord, ...prev]);
        setIsModalOpen(false);
      } else {
        setFeedback(res.error || "Failed to create article");
      }
    }

    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete post: "${title}"?`)) return;
    setLoading(true);
    const res = await deletePost(id);
    if (res.success) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(res.error || "Failed to delete post");
    }
    setLoading(false);
  };

  const handleTogglePublished = async (id: string, current: boolean) => {
    const nextVal = !current;
    const res = await togglePostPublished(id, nextVal);
    if (res.success) {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: nextVal } : p))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-obsidian-900/80 p-5 rounded-2xl border border-white/[0.08]">
        <div>
          <h2 className="text-xl font-bold text-white">Articles &amp; Tech Insights</h2>
          <p className="text-xs text-slate-400 mt-1">
            Publish thought leadership, engineering case studies, and updates to attract clients and establish authority.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <span className="text-base leading-none">+</span>
          <span>Publish New Article</span>
        </button>
      </div>

      {/* Posts List */}
      <div className="rounded-2xl border border-white/[0.08] bg-obsidian-900/70 overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-slate-300">
            <thead className="bg-obsidian-950/80 text-[11px] text-slate-400 uppercase tracking-wider border-b border-white/[0.06]">
              <tr>
                <th className="py-4 px-6">Article / Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Author &amp; Read Time</th>
                <th className="py-4 px-6">Visibility</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {posts.length > 0 ? (
                posts.map((post) => {
                  return (
                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 max-w-sm">
                        <div className="flex items-center gap-3">
                          <Image
                            src={post.coverImage || "/Max_a_عندنا_شركة_it_اسمها_.png"}
                            alt={post.title}
                            width={48}
                            height={40}
                            className="w-12 h-10 object-cover rounded-lg border border-white/10 flex-shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white text-sm font-sans hover:text-cyan-300 transition-colors">
                              {post.title}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono truncate max-w-xs mt-0.5">
                              /blog/{post.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-cyan-300 border border-indigo-500/30">
                          {post.category}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-slate-300">
                        <div>{post.author}</div>
                        <div className="text-[10px] text-slate-500">{post.readTime}</div>
                      </td>

                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleTogglePublished(post.id, post.published)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                            post.published
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-slate-500/10 text-slate-400 border-slate-500/30"
                          }`}
                        >
                          {post.published ? "● Published" : "○ Draft"}
                        </button>
                      </td>

                      <td className="py-4 px-6 text-slate-500 text-[11px]">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(post)}
                          className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-colors cursor-pointer text-[11px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono text-xs">
                    No articles published yet. Click "Publish New Article" above to create your first post.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-obsidian-900 border border-white/15 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <h3 className="text-xl font-bold text-white font-sans">
                {editingPost ? "Edit Article" : "Write New Blog Article"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 cursor-pointer text-lg font-mono"
              >
                ✕
              </button>
            </div>

            {feedback && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                {feedback}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. 5 Cloud Strategies for Fast-Growing Tech Startups"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    {POST_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-obsidian-950 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Author Name</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g. Zaltrex Team"
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Read Time</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Article Slug (URL path)</label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  placeholder="custom-article-slug"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300">Cover Image URL *</label>
                <input
                  type="text"
                  required
                  value={formCoverImage}
                  onChange={(e) => setFormCoverImage(e.target.value)}
                  placeholder="URL or select from company presets below"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[10px] font-mono text-slate-500 self-center">Presets:</span>
                  {PRESET_COVERS.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setFormCoverImage(img.url)}
                      className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors cursor-pointer ${
                        formCoverImage === img.url
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                          : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Short Summary / Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Summary for blog card previews and search engines..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 leading-relaxed font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300">Full Article Content *</label>
                  <span className="text-[10px] font-mono text-slate-500">Supports Markdown (# Heading, - Lists)</span>
                </div>
                <textarea
                  required
                  rows={8}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write your article body here... Use ## for section headings and bullet points for lists."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 leading-relaxed font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500 bg-obsidian-950 border-white/20 focus:ring-0 cursor-pointer"
                  />
                  <span>Publish immediately (visible to all site visitors)</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs font-mono tracking-wide transition-all shadow-lg shadow-indigo-600/25 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Publishing..." : editingPost ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
