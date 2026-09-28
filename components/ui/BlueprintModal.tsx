"use client";

import React, { useEffect } from "react";
import { useSound } from "../audio/SoundContext";

interface BlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    imgSrc: string;
    title: string;
    desc: string;
  } | null;
}

export default function BlueprintModal({ isOpen, onClose, data }: BlueprintModalProps) {
  const { playClick } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div
      id="image-modal"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playClick();
          onClose();
        }
      }}
    >
      <div className="relative max-w-4xl w-full bg-obsidian-900 border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 id="modal-title" className="font-bold text-white text-base font-mono">
            {data.title}
          </h3>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white text-xl font-mono px-2 py-1 rounded transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-4 bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
          <img
            id="modal-img"
            src={data.imgSrc}
            alt={data.title}
            className="max-h-[65vh] w-auto object-contain rounded-lg shadow-lg"
          />
        </div>
        <div
          className="p-4 bg-obsidian-950 border-t border-white/5 text-xs text-slate-400 font-mono"
          id="modal-desc"
        >
          {data.desc}
        </div>
      </div>
    </div>
  );
}
