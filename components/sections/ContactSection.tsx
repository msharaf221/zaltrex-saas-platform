"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import { submitContactRequest } from "@/app/actions/contact";
import { useSound } from "../audio/SoundContext";
import { useToast } from "../ui/ToastContext";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { playClick, playSuccess } = useSound();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      budget: "$50,000 - $100,000",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    playClick();
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await submitContactRequest(data);
      if (res.success) {
        setIsSubmitted(true);
        playSuccess();
        showToast("Proposal received! Dispatched to enterprise team.");
        reset();
      } else {
        setServerError(res.error || "Submission failed. Please check inputs.");
      }
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 md:py-32 relative bg-obsidian-950 border-t border-white/[0.08]" id="contact">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Direct Inquiries
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Initiate Architecture Discussion
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Discuss sovereign deployment, bespoke microservice architectures, or request a custom enterprise sandbox with our core systems team.
          </p>
        </div>

        <div className="spotlight-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl font-mono border border-emerald-500/40 animate-pulse">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-white font-sans">
                Enterprise Brief Received
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Your request has been logged into the sovereign database and an instant notification was transmitted to our administrative leads.
              </p>
              <button
                onClick={() => {
                  playClick();
                  setIsSubmitted(false);
                }}
                className="mt-6 px-6 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-xs font-mono text-cyan-400 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {serverError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                  {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                    <span>FULL NAME *</span>
                    {errors.name && (
                      <span className="text-red-400 text-[11px]">{errors.name.message}</span>
                    )}
                  </label>
                  <input
                    {...register("name")}
                    placeholder="e.g. Dr. Alex Mercer"
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                    <span>WORK EMAIL *</span>
                    {errors.email && (
                      <span className="text-red-400 text-[11px]">{errors.email.message}</span>
                    )}
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="alex@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300">
                  ESTIMATED PROJECT BUDGET
                </label>
                <select
                  {...register("budget")}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors font-mono cursor-pointer"
                >
                  <option value="< $25,000">&lt; $25,000 (POC / Pilot)</option>
                  <option value="$25,000 - $50,000">$25,000 - $50,000 (Standard Cluster)</option>
                  <option value="$50,000 - $100,000">$50,000 - $100,000 (Multi-Region Fabric)</option>
                  <option value="$100,000+">$100,000+ (Mission-Critical Enterprise)</option>
                </select>
              </div>

              {/* Project Details */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>PROJECT SPECIFICATIONS &amp; GOALS *</span>
                  {errors.projectDetails && (
                    <span className="text-red-400 text-[11px]">
                      {errors.projectDetails.message}
                    </span>
                  )}
                </label>
                <textarea
                  {...register("projectDetails")}
                  rows={4}
                  placeholder="Describe your architecture requirements, target scale, data throughput, or existing infrastructure challenges..."
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  🔒 Encrypted with zero telemetry retention.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-obsidian-950 font-bold text-xs tracking-wider font-mono shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin"></span>
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT REQUEST</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
