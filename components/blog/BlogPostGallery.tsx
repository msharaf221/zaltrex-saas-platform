"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface BlogPostGalleryProps {
  images: string[];
  postTitle?: string;
}

export default function BlogPostGallery({ images, postTitle = "Article Media" }: BlogPostGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <section className="my-10 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 text-sm">📸</span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Article Media Gallery
          </h3>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            {images.length} {images.length === 1 ? "image" : "images"}
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
          Click any image to view in full resolution
        </span>
      </div>

      {/* Grid Layout depending on count */}
      <div
        className={`grid gap-4 ${
          images.length === 1
            ? "grid-cols-1"
            : images.length === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : images.length === 3
            ? "grid-cols-1 sm:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        }`}
      >
        {images.map((imgUrl, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveImageIndex(idx)}
            className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 bg-obsidian-950 aspect-[4/3] focus:outline-none transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 cursor-pointer text-left"
          >
            <Image
              src={imgUrl}
              alt={`${postTitle} - image ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-obsidian-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <span className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center text-sm shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                🔍
              </span>
            </div>
            {/* Index label */}
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
              {idx + 1} / {images.length}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Top Bar Controls */}
          <div
            className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-300 font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                {activeImageIndex + 1} / {images.length}
              </span>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline truncate max-w-md">
                {postTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={images[activeImageIndex]}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono text-slate-200 transition-colors flex items-center gap-1.5"
                title="Open raw image"
              >
                <span>↗</span>
                <span className="hidden sm:inline">Open Original</span>
              </a>
              <button
                type="button"
                onClick={() => setActiveImageIndex(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/20 hover:border-red-500/40 border border-white/10 text-slate-300 hover:text-red-400 flex items-center justify-center text-sm font-mono transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Main Displayed Image */}
          <div
            className="relative max-w-5xl max-h-[82vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeImageIndex]}
              alt={`${postTitle} - full view ${activeImageIndex + 1}`}
              width={1600}
              height={1000}
              className="max-h-[82vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              priority
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : images.length - 1
                  );
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-black/60 hover:bg-cyan-500/20 border border-white/15 hover:border-cyan-400 text-white flex items-center justify-center text-xl transition-all cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) =>
                    prev !== null && prev < images.length - 1 ? prev + 1 : 0
                  );
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-black/60 hover:bg-cyan-500/20 border border-white/15 hover:border-cyan-400 text-white flex items-center justify-center text-xl transition-all cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          {/* Bottom Thumbnails Strip */}
          {images.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-xl w-full px-4 overflow-x-auto flex items-center justify-center gap-2 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((thumb, tIdx) => (
                <button
                  key={tIdx}
                  type="button"
                  onClick={() => setActiveImageIndex(tIdx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border flex-shrink-0 transition-all ${
                    tIdx === activeImageIndex
                      ? "border-cyan-400 scale-105 shadow-md shadow-cyan-500/30"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={`Thumbnail ${tIdx + 1}`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
