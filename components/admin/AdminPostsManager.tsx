"use client";

import React, { useState, useRef } from "react";
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
  galleryImages?: string | null;
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

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [manualUrlInput, setManualUrlInput] = useState("");
  const [showManualAdd, setShowManualAdd] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState(POST_CATEGORIES[0]);
  const [formAuthor, setFormAuthor] = useState("Zaltrex Team");
  const [formReadTime, setFormReadTime] = useState("4 min read");
  const [formCoverImage, setFormCoverImage] = useState(PRESET_COVERS[0].url);
  const [formGalleryImages, setFormGalleryImages] = useState<string[]>([]);
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formPublished, setFormPublished] = useState(true);

  // Parse gallery helper
  const parseGallery = (galleryRaw?: string | null): string[] => {
    if (!galleryRaw) return [];
    try {
      const parsed = JSON.parse(galleryRaw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return galleryRaw.split(",").map((s) => s.trim()).filter(Boolean);
    }
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory(POST_CATEGORIES[0]);
    setFormAuthor("Zaltrex Team");
    setFormReadTime("4 min read");
    setFormCoverImage(PRESET_COVERS[0].url);
    setFormGalleryImages([]);
    setFormExcerpt("");
    setFormContent("");
    setFormPublished(true);
    setFeedback(null);
    setUploadMessage(null);
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
    setFormGalleryImages(parseGallery(p.galleryImages));
    setFormExcerpt(p.excerpt);
    setFormContent(p.content);
    setFormPublished(p.published);
    setFeedback(null);
    setUploadMessage(null);
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

  // Upload multiple files via /api/upload
  const handleFilesUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadMessage(`Uploading ${files.length} file(s)...`);
    setFeedback(null);

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload images");
      }

      const uploadedUrls: string[] = data.urls || [];
      if (uploadedUrls.length > 0) {
        setFormGalleryImages((prev) => {
          // Avoid duplicates
          const combined = [...prev];
          for (const u of uploadedUrls) {
            if (!combined.includes(u)) combined.push(u);
          }
          return combined;
        });

        // If the current cover is empty or is one of the presets, automatically set the first uploaded image as the cover!
        if (
          !formCoverImage ||
          PRESET_COVERS.some((pr) => pr.url === formCoverImage)
        ) {
          setFormCoverImage(uploadedUrls[0]);
        }

        setUploadMessage(`✓ Successfully uploaded ${uploadedUrls.length} image(s)!`);
        setTimeout(() => setUploadMessage(null), 5000);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setFeedback(err.message || "An error occurred during file upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  };

  // Set as primary cover
  const handleSetCover = (url: string) => {
    setFormCoverImage(url);
    setUploadMessage("✓ Cover image updated!");
    setTimeout(() => setUploadMessage(null), 2500);
  };

  // Insert image markdown into article body
  const handleInsertIntoContent = (url: string) => {
    const mdSnippet = `\n\n![Image Preview](${url})\n\n`;
    setFormContent((prev) => prev + mdSnippet);
    setUploadMessage("✓ Inserted image markdown into article content!");
    setTimeout(() => setUploadMessage(null), 3000);
  };

  // Remove image from gallery
  const handleRemoveImage = (urlToRemove: string) => {
    setFormGalleryImages((prev) => prev.filter((u) => u !== urlToRemove));
    // If it was the cover, change to next available or default
    if (formCoverImage === urlToRemove) {
      const remaining = formGalleryImages.filter((u) => u !== urlToRemove);
      setFormCoverImage(remaining.length > 0 ? remaining[0] : PRESET_COVERS[0].url);
    }
  };

  // Add manual image URL to gallery
  const handleAddManualUrl = () => {
    const trimmed = manualUrlInput.trim();
    if (!trimmed) return;
    if (!formGalleryImages.includes(trimmed)) {
      setFormGalleryImages((prev) => [...prev, trimmed]);
      if (!formCoverImage || PRESET_COVERS.some((p) => p.url === formCoverImage)) {
        setFormCoverImage(trimmed);
      }
    }
    setManualUrlInput("");
    setShowManualAdd(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    // Make sure we have a cover image. If not, use first gallery image or default preset.
    const finalCover =
      formCoverImage ||
      (formGalleryImages.length > 0 ? formGalleryImages[0] : PRESET_COVERS[0].url);

    const payload: PostInput = {
      title: formTitle,
      slug: formSlug,
      category: formCategory,
      author: formAuthor,
      readTime: formReadTime,
      coverImage: finalCover,
      galleryImages: formGalleryImages,
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
      {/* Hidden File Input for Multiple Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFilesUpload(e.target.files);
        }}
      />

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-obsidian-900/80 p-5 rounded-2xl border border-white/[0.08]">
        <div>
          <h2 className="text-xl font-bold text-white">Articles &amp; Tech Insights</h2>
          <p className="text-xs text-slate-400 mt-1">
            Publish thought leadership, engineering case studies, and updates with direct multi-image uploads.
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
                <th className="py-4 px-6">Photos / Media</th>
                <th className="py-4 px-6">Author &amp; Read Time</th>
                <th className="py-4 px-6">Visibility</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {posts.length > 0 ? (
                posts.map((post) => {
                  const gallery = parseGallery(post.galleryImages);
                  return (
                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 max-w-sm">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 bg-obsidian-950">
                            <Image
                              src={post.coverImage || "/Max_a_عندنا_شركة_it_اسمها_.png"}
                              alt={post.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
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

                      {/* Photo / Media Column */}
                      <td className="py-4 px-6">
                        {gallery.length > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                            <span>📷</span>
                            <span>{gallery.length} {gallery.length === 1 ? "photo" : "photos"}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">
                            Cover only
                          </span>
                        )}
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
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-mono text-xs">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-obsidian-900 border border-white/15 rounded-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl font-bold text-white font-sans">
                  {editingPost ? "Edit Article & Media" : "Write New Blog Article"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload multiple photos directly from your device, choose your cover banner, and write your content.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 cursor-pointer text-lg font-mono"
              >
                ✕
              </button>
            </div>

            {feedback && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                {feedback}
              </div>
            )}

            {uploadMessage && (
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-2">
                <span>{uploadMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
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

              {/* Meta details */}
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

              {/* Slug */}
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

              {/* MULTI-IMAGE UPLOADER STUDIO */}
              <div className="space-y-3.5 p-5 rounded-2xl bg-obsidian-950/70 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>📸</span>
                      <span>Article Media &amp; Image Studio (رفع صور المقال)</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Upload multiple images from your computer. Choose which image serves as the Main Cover Banner, and the rest will be featured in the article gallery.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <span>📁</span>
                      <span>{isUploading ? "Uploading..." : "Upload from Device"}</span>
                    </button>
                  </div>
                </div>

                {/* Drag and Drop Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                    dragActive
                      ? "border-cyan-400 bg-cyan-500/10 scale-[1.01]"
                      : "border-white/15 hover:border-cyan-500/40 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-2xl">
                    {isUploading ? (
                      <span className="animate-spin text-cyan-400">⏳</span>
                    ) : (
                      "☁️"
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-sans">
                      {isUploading
                        ? "Uploading images to server, please wait..."
                        : "Drag & drop multiple images here, or click to browse"}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Supports PNG, JPG, WebP, GIF, SVG (Up to 15MB each) • Select as many as you need
                    </div>
                  </div>
                </div>

                {/* Gallery & Cover Previews */}
                {(formGalleryImages.length > 0 || formCoverImage) && (
                  <div className="space-y-3 pt-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Attached Images ({formGalleryImages.length} in gallery):</span>
                      <span className="text-[11px] text-cyan-400">
                        ⭐ Star marks the Main Cover Banner
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {/* Form Cover image if not already in gallery */}
                      {formCoverImage && !formGalleryImages.includes(formCoverImage) && (
                        <div className="relative group rounded-xl overflow-hidden border-2 border-cyan-400 bg-obsidian-950 p-1 flex flex-col">
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                            <Image
                              src={formCoverImage}
                              alt="Cover banner"
                              fill
                              sizes="180px"
                              className="object-cover"
                            />
                            <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-500 text-obsidian-950 shadow-md">
                              ⭐ Main Cover
                            </div>
                          </div>
                          <div className="p-1.5 flex items-center justify-between gap-1 text-[10px] font-mono">
                            <span className="text-slate-400 truncate max-w-[100px]">Cover Preset</span>
                            <button
                              type="button"
                              onClick={() => handleInsertIntoContent(formCoverImage)}
                              className="text-cyan-400 hover:underline"
                              title="Insert markdown into article body"
                            >
                              Insert
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Uploaded Gallery Images */}
                      {formGalleryImages.map((imgUrl, idx) => {
                        const isCover = formCoverImage === imgUrl;
                        return (
                          <div
                            key={idx}
                            className={`relative group rounded-xl overflow-hidden border transition-all bg-obsidian-950 p-1 flex flex-col ${
                              isCover
                                ? "border-cyan-400 shadow-lg shadow-cyan-500/20"
                                : "border-white/10 hover:border-white/30"
                            }`}
                          >
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/40">
                              <Image
                                src={imgUrl}
                                alt={`Uploaded image ${idx + 1}`}
                                fill
                                sizes="180px"
                                className="object-cover group-hover:scale-105 transition-transform"
                              />

                              {isCover ? (
                                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-400 text-obsidian-950 shadow-md">
                                  ⭐ Main Cover
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleSetCover(imgUrl)}
                                  className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-black/70 hover:bg-cyan-500 text-white hover:text-black border border-white/20 transition-colors opacity-90 hover:opacity-100 cursor-pointer"
                                  title="Set as Main Cover banner"
                                >
                                  Make Cover
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => handleRemoveImage(imgUrl)}
                                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center text-xs font-mono transition-colors shadow-md cursor-pointer"
                                title="Remove image"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="p-1.5 flex items-center justify-between gap-1 text-[10px] font-mono">
                              <span className="text-slate-500">#{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => handleInsertIntoContent(imgUrl)}
                                className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer"
                                title="Insert markdown into article content"
                              >
                                <span>+ Text</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Additional manual link or presets dropdown (Collapsible) */}
                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setShowManualAdd(!showManualAdd)}
                      className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>{showManualAdd ? "▼ Hide" : "▶ Need presets or external URL?"}</span>
                    </button>
                    <span className="text-[10px] font-mono text-slate-500">
                      Active Cover: {formCoverImage ? "Selected" : "None"}
                    </span>
                  </div>

                  {showManualAdd && (
                    <div className="mt-3 space-y-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      {/* Presets */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400">Choose Company Preset Cover:</label>
                        <div className="flex flex-wrap gap-2">
                          {PRESET_COVERS.map((img) => (
                            <button
                              key={img.url}
                              type="button"
                              onClick={() => handleSetCover(img.url)}
                              className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
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

                      {/* Manual URL Input */}
                      <div className="space-y-1.5 pt-2">
                        <label className="text-[10px] font-mono text-slate-400">Or Paste Image URL directly:</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={manualUrlInput}
                            onChange={(e) => setManualUrlInput(e.target.value)}
                            placeholder="https://example.com/image.png or /uploads/..."
                            className="flex-grow px-3 py-1.5 rounded-lg bg-obsidian-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                          />
                          <button
                            type="button"
                            onClick={handleAddManualUrl}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
                          >
                            Add URL
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
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

              {/* Full Content */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300">Full Article Content *</label>
                  <span className="text-[10px] font-mono text-slate-500">Supports Markdown (## Heading, - Lists, ![Alt](url))</span>
                </div>
                <textarea
                  required
                  rows={8}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write your article body here... Use ## for section headings and bullet points for lists. You can click '+ Text' on any uploaded image above to embed it directly."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 leading-relaxed font-mono"
                />
              </div>

              {/* Publish checkbox */}
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
                  disabled={loading || isUploading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs font-mono tracking-wide transition-all shadow-lg shadow-indigo-600/25 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Saving Article...</span>
                    </>
                  ) : editingPost ? (
                    "Save Changes"
                  ) : (
                    "Publish Article"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
