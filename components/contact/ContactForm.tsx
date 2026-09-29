"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import { submitContactRequest } from "@/app/actions/contact";

interface ContactFormProps {
  initialService?: string;
}

const SERVICES_OPTIONS = [
  "Web & SaaS Development",
  "Custom Enterprise Software & ERP",
  "Mobile App Development",
  "AI & Process Automation",
  "Cloud Architecture & DevOps",
  "Cybersecurity & IT Infrastructure",
  "General Consultation",
];

const BUDGET_OPTIONS = [
  "< $5,000 (Discovery / MVP Consultation)",
  "$5,000 - $15,000 (Standard MVP / App)",
  "$15,000 - $35,000 (Full-Stack Platform / ERP)",
  "$35,000+ (Complex Enterprise Architecture)",
  "Flexible / Not yet determined",
];

export default function ContactForm({ initialService }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: initialService || SERVICES_OPTIONS[0],
      budget: BUDGET_OPTIONS[1],
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await submitContactRequest(data);
      if (res.success) {
        setIsSubmitted(true);
        reset();
      } else {
        setServerError(res.error || "Submission failed. Please verify your details.");
      }
    } catch {
      setServerError("A network error occurred. Please try again or message us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl p-8 sm:p-12 border border-emerald-500/30 bg-obsidian-900/90 shadow-2xl text-center space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl font-mono border border-emerald-500/40">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-white font-sans">
          Thank You! Your Request Was Received.
        </h3>
        <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
          Our engineering leadership will review your requirements and reach out to you within 24 business hours to schedule a discovery call.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-xs font-mono text-cyan-400 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
          >
            Submit Another Inquiry
          </button>
          <a
            href="https://wa.me/201001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono text-emerald-300 hover:bg-emerald-500/30 transition-all"
          >
            💬 Reach Us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-obsidian-900/90 shadow-2xl backdrop-blur-xl">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
          Request a Proposal / Consultation
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Fill out the form below. We treat all project details with strict confidentiality under our standard NDA.
        </p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="e.g. John Doe or Karim Mostafa"
              className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>BUSINESS / PERSONAL EMAIL *</span>
              {errors.email && (
                <span className="text-red-400 text-[11px]">{errors.email.message}</span>
              )}
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="john@company.com"
              className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">
              PHONE / WHATSAPP (OPTIONAL)
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="+20 100 123 4567"
              className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
            />
          </div>

          {/* Service Needed */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">SERVICE REQUIRED</label>
            <select
              {...register("service")}
              className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors font-mono cursor-pointer"
            >
              {SERVICES_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-obsidian-950 text-white">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300">ESTIMATED BUDGET RANGE</label>
          <select
            {...register("budget")}
            className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors font-mono cursor-pointer"
          >
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b} className="bg-obsidian-950 text-white">
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Project Details */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
            <span>PROJECT DETAILS &amp; GOALS *</span>
            {errors.projectDetails && (
              <span className="text-red-400 text-[11px]">
                {errors.projectDetails.message}
              </span>
            )}
          </label>
          <textarea
            {...register("projectDetails")}
            rows={4}
            placeholder="Tell us about what you want to build, timeline expectations, target audience, and any current pain points..."
            className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none leading-relaxed"
          />
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-slate-500">
            🔒 Protected by NDA • No spam ever
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wider font-mono shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>SUBMITTING...</span>
              </>
            ) : (
              <span>SUBMIT REQUEST →</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
