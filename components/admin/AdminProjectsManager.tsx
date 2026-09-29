"use client";

import React, { useState } from "react";
import {
  createProject,
  updateProject,
  deleteProject,
  toggleProjectFeatured,
  ProjectInput,
} from "@/app/actions/cms";

export interface ProjectRecord {
  id: string;
  title: string;
  slug: string | null;
  category: string;
  description: string;
  content: string | null;
  imageUrl: string;
  tags: string | null;
  client: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  order: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface AdminProjectsManagerProps {
  initialProjects: ProjectRecord[];
}

const PRESET_IMAGES = [
  { label: "Architecture Package", url: "/Max_a_هات_الباكدج_مفصلة.png" },
  { label: "Cloud Mesh Infrastructure", url: "/Max_a_عندنا_شركة_it_اسمها_.png" },
  { label: "AI & Innovation Engine", url: "/gemini-3.1-flash-lite-image (nano-banana-2-lite)_b_حلو_اوي_اللوجو_و_الك.jpeg" },
  { label: "Zaltrex Tech Cover", url: "/Zcover.png" },
  { label: "Security & Brand Core", url: "/Max_a_هات_لوجو_احطه_على_ال.png" },
];

const CATEGORIES = [
  "Web & Cloud Solutions",
  "Custom Software Development",
  "AI & Automation",
  "Cybersecurity & FinTech",
  "Mobile & IoT Solutions",
  "IT Infrastructure & DevOps",
];

export default function AdminProjectsManager({ initialProjects }: AdminProjectsManagerProps) {
  const [projects, setProjects] = useState<ProjectRecord[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState(CATEGORIES[0]);
  const [formDescription, setFormDescription] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formImageUrl, setFormImageUrl] = useState(PRESET_IMAGES[0].url);
  const [formTags, setFormTags] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formLiveUrl, setFormLiveUrl] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormTitle("");
    setFormCategory(CATEGORIES[0]);
    setFormDescription("");
    setFormContent("");
    setFormImageUrl(PRESET_IMAGES[0].url);
    setFormTags("");
    setFormClient("");
    setFormLiveUrl("");
    setFormFeatured(false);
    setFeedback(null);
    setIsModalOpen(true);
  };

  const openEditModal = (proj: ProjectRecord) => {
    setEditingProject(proj);
    setFormTitle(proj.title);
    setFormCategory(proj.category || CATEGORIES[0]);
    setFormDescription(proj.description || "");
    setFormContent(proj.content || "");
    setFormImageUrl(proj.imageUrl || PRESET_IMAGES[0].url);
    setFormTags(proj.tags || "");
    setFormClient(proj.client || "");
    setFormLiveUrl(proj.liveUrl || "");
    setFormFeatured(proj.featured);
    setFeedback(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const payload: ProjectInput = {
      title: formTitle,
      category: formCategory,
      description: formDescription,
      content: formContent,
      imageUrl: formImageUrl,
      tags: formTags,
      client: formClient,
      liveUrl: formLiveUrl,
      featured: formFeatured,
    };

    if (editingProject) {
      const res = await updateProject(editingProject.id, payload);
      if (res.success && res.project) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? (res.project as ProjectRecord) : p))
        );
        setIsModalOpen(false);
      } else {
        setFeedback(res.error || "Failed to update project");
      }
    } else {
      const res = await createProject(payload);
      if (res.success && res.project) {
        setProjects((prev) => [res.project as ProjectRecord, ...prev]);
        setIsModalOpen(false);
      } else {
        setFeedback(res.error || "Failed to create project");
      }
    }

    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project: "${title}"?`)) return;
    setLoading(true);
    const res = await deleteProject(id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(res.error || "Failed to delete project");
    }
    setLoading(false);
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    const nextVal = !current;
    const res = await toggleProjectFeatured(id, nextVal);
    if (res.success) {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: nextVal } : p))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-obsidian-900/80 p-5 rounded-2xl border border-white/[0.08]">
        <div>
          <h2 className="text-xl font-bold text-white">Portfolio &amp; Client Projects</h2>
          <p className="text-xs text-slate-400 mt-1">
            Showcase your startup's successful engineering projects and case studies on the live website.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <span className="text-base leading-none">+</span>
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl border border-white/[0.08] bg-obsidian-900/70 overflow-hidden flex flex-col group hover:border-cyan-500/40 transition-all shadow-xl"
          >
            {/* Project Image & Badge */}
            <div className="relative h-48 w-full bg-obsidian-950 overflow-hidden">
              <img
                src={proj.imageUrl || "/Max_a_هات_الباكدج_مفصلة.png"}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-950/80 text-cyan-300 border border-indigo-500/40 backdrop-blur-md">
                  {proj.category}
                </span>
                {proj.featured && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                    ★ Featured on Home
                  </span>
                )}
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => handleToggleFeatured(proj.id, proj.featured)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border backdrop-blur-md transition-colors cursor-pointer ${
                    proj.featured
                      ? "bg-amber-500/30 text-amber-200 border-amber-500/50"
                      : "bg-obsidian-950/80 text-slate-400 border-white/10 hover:text-white"
                  }`}
                  title="Toggle Featured"
                >
                  {proj.featured ? "★ Unfeature" : "☆ Feature"}
                </button>
              </div>
            </div>

            {/* Content info */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1.5">
                <span>CLIENT: {proj.client || "Confidential / Internal"}</span>
                <span>{new Date(proj.createdAt).toLocaleDateString()}</span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                {proj.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 flex-grow">
                {proj.description}
              </p>

              {/* Tags */}
              {proj.tags && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.tags.split(",").map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-300 border border-white/5"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:underline font-mono flex items-center gap-1"
                    >
                      <span>Live Link ↗</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-mono text-red-400 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-obsidian-900 border border-white/15 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <h3 className="text-xl font-bold text-white font-sans">
                {editingProject ? "Edit Project" : "Add New IT Project"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Next-Gen FinTech Mobile App"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-obsidian-950 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Short Summary / Description *</label>
                <textarea
                  required
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Concise overview of what this project accomplished..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  Full Case Study / Project Details (Optional)
                </label>
                <textarea
                  rows={4}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Detailed breakdown: problem statement, technical stack, architecture choices, results..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              {/* Image selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300">Cover Image URL *</label>
                <input
                  type="text"
                  required
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="URL or select from company presets below"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[10px] font-mono text-slate-500 self-center">Company presets:</span>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setFormImageUrl(img.url)}
                      className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors cursor-pointer ${
                        formImageUrl === img.url
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                          : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Client / Organization</label>
                  <input
                    type="text"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    placeholder="e.g. Acme Corp (or Confidential)"
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="e.g. Next.js, Docker, AWS, Stripe"
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Live Project / Demo Link</label>
                  <input
                    type="url"
                    value={formLiveUrl}
                    onChange={(e) => setFormLiveUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 bg-obsidian-950 border-white/20 focus:ring-0 cursor-pointer"
                    />
                    <span>Highlight as Featured on Homepage</span>
                  </label>
                </div>
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
                  {loading ? "Saving..." : editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
