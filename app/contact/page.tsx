import React, { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import ContactForm from "@/components/contact/ContactForm";
import {
  getSectionContent,
  DEFAULT_CONTACT,
  DEFAULT_GENERAL,
  DEFAULT_FOOTER,
  ContactContent,
  GeneralContent,
  FooterContent,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us & Request a Quote — Zaltrex",
  description:
    "Get in touch with Zaltrex IT Solutions. Request a project proposal, schedule a free technical consultation, or chat directly with our engineering team.",
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [{ service }, contact, general, footer] = await Promise.all([
    searchParams,
    getSectionContent<ContactContent>("contact", DEFAULT_CONTACT),
    getSectionContent<GeneralContent>("general", DEFAULT_GENERAL),
    getSectionContent<FooterContent>("footer", DEFAULT_FOOTER),
  ]);

  return (
    <>
      <BackgroundEffects />
      <Navbar general={general} />

      <main className="flex-grow z-20">
        {/* Hero */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-white/[0.06] text-center">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-cyan-300 font-semibold">
              <span>{contact.heroBadge}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans">
              {contact.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {contact.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Contact Grid: Form + Direct Details */}
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="p-8 text-white font-mono text-xs">Loading form...</div>}>
                <ContactForm initialService={service} />
              </Suspense>
            </div>

            {/* Direct Channels Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Card */}
              <div className="p-7 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-obsidian-900 to-obsidian-950 border border-emerald-500/30 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-2xl flex items-center justify-center">
                    💬
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">{contact.whatsappTitle}</h3>
                    <p className="text-xs text-emerald-400 font-mono">{contact.whatsappSubtitle}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {contact.whatsappDesc}
                </p>
                <a
                  href="https://wa.me/201001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-950 font-bold text-xs font-mono tracking-wider transition-all shadow-lg shadow-emerald-500/20"
                >
                  <span>START WHATSAPP CHAT ↗</span>
                </a>
              </div>

              {/* Email & Info Card */}
              <div className="p-7 rounded-3xl bg-obsidian-900/80 border border-white/[0.08] shadow-xl space-y-6">
                <h3 className="text-lg font-bold text-white font-sans">{contact.directTitle}</h3>

                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 text-base">✉️</span>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Business Inquiries</div>
                      <a href={`mailto:${contact.email}`} className="text-white hover:text-cyan-300 font-bold">
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 text-base">📍</span>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Headquarters</div>
                      <div className="text-white font-bold">{contact.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 text-base">⏱️</span>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Working Hours</div>
                      <div className="text-white font-bold">{contact.workingHours}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{contact.workingHoursSub}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{contact.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project FAQ */}
        <section className="py-20 bg-obsidian-950 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Got Questions?
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
                Frequently Asked Questions.
              </h2>
            </div>

            <div className="space-y-4">
              {contact.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-obsidian-900/60 border border-white/[0.08] space-y-2"
                >
                  <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                    <span className="text-cyan-400 font-mono text-sm">Q:</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer content={footer} general={general} />
    </>
  );
}
