"use client";

import React, { useState } from "react";
import {
  AllSiteContent,
  GeneralContent,
  HeroContent,
  ServicesContent,
  WhyUsContent,
  AboutContent,
  CtaContent,
  ContactContent,
  FooterContent,
  DEFAULT_GENERAL,
  DEFAULT_HERO,
  DEFAULT_SERVICES,
  DEFAULT_WHY_US,
  DEFAULT_ABOUT,
  DEFAULT_CTA,
  DEFAULT_CONTACT,
  DEFAULT_FOOTER,
} from "@/lib/site-content";
import { updateSiteSectionContent, resetSiteSectionContent } from "@/app/actions/cms";

interface Props {
  initialContent: AllSiteContent;
}

type SectionKey = "general" | "hero" | "services" | "why_us" | "about" | "cta" | "contact" | "footer";

export default function AdminSiteContentManager({ initialContent }: Props) {
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");

  // Local state for each section
  const [general, setGeneral] = useState<GeneralContent>(initialContent.general || DEFAULT_GENERAL);
  const [hero, setHero] = useState<HeroContent>(initialContent.hero || DEFAULT_HERO);
  const [services, setServices] = useState<ServicesContent>(initialContent.services || DEFAULT_SERVICES);
  const [whyUs, setWhyUs] = useState<WhyUsContent>(initialContent.why_us || DEFAULT_WHY_US);
  const [about, setAbout] = useState<AboutContent>(initialContent.about || DEFAULT_ABOUT);
  const [cta, setCta] = useState<CtaContent>(initialContent.cta || DEFAULT_CTA);
  const [contact, setContact] = useState<ContactContent>(initialContent.contact || DEFAULT_CONTACT);
  const [footer, setFooter] = useState<FooterContent>(initialContent.footer || DEFAULT_FOOTER);

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Helper to save currently active section
  const handleSave = async (sectionKey: SectionKey) => {
    setSaving(true);
    setStatusMsg(null);

    let dataToSave: any;
    switch (sectionKey) {
      case "general":
        dataToSave = general;
        break;
      case "hero":
        dataToSave = hero;
        break;
      case "services":
        dataToSave = services;
        break;
      case "why_us":
        dataToSave = whyUs;
        break;
      case "about":
        dataToSave = about;
        break;
      case "cta":
        dataToSave = cta;
        break;
      case "contact":
        dataToSave = contact;
        break;
      case "footer":
        dataToSave = footer;
        break;
    }

    const res = await updateSiteSectionContent(sectionKey, dataToSave);
    setSaving(false);

    if (res.success) {
      setStatusMsg({
        type: "success",
        text: `✔ تم حفظ وتحديث نصوص وتفاصيل قسم (${sectionKey.toUpperCase()}) بنجاح! التعديلات ظاهرة الآن على الموقع فوراً.`,
      });
      setTimeout(() => setStatusMsg(null), 4000);
    } else {
      setStatusMsg({
        type: "error",
        text: `❌ حدث خطأ أثناء الحفظ: ${res.error}`,
      });
    }
  };

  // Helper to reset a section to defaults
  const handleReset = async (sectionKey: SectionKey) => {
    if (!confirm("هل أنت متأكد من استعادة النصوص الافتراضية الأصلية لهذا القسم؟")) return;

    setSaving(true);
    const res = await resetSiteSectionContent(sectionKey);
    setSaving(false);

    if (res.success) {
      switch (sectionKey) {
        case "general":
          setGeneral(DEFAULT_GENERAL);
          break;
        case "hero":
          setHero(DEFAULT_HERO);
          break;
        case "services":
          setServices(DEFAULT_SERVICES);
          break;
        case "why_us":
          setWhyUs(DEFAULT_WHY_US);
          break;
        case "about":
          setAbout(DEFAULT_ABOUT);
          break;
        case "cta":
          setCta(DEFAULT_CTA);
          break;
        case "contact":
          setContact(DEFAULT_CONTACT);
          break;
        case "footer":
          setFooter(DEFAULT_FOOTER);
          break;
      }
      setStatusMsg({
        type: "success",
        text: `✔ تم استعادة النصوص الأصلية الافتراضية لقسم (${sectionKey.toUpperCase()}) بنجاح.`,
      });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  const sectionsList: { id: SectionKey; label: string; icon: string; desc: string }[] = [
    { id: "hero", label: "الهيرو الرئيسي (Hero)", icon: "⚡", desc: "العناوين الرئيسية، الوصف، الأزرار، والإحصائيات الأربعة" },
    { id: "general", label: "الهوية والتواصل (Brand & Info)", icon: "🌐", desc: "اسم الشركة، اللوجو، البريد، الهاتف، وروابط السوشيال" },
    { id: "services", label: "الخدمات (Services)", icon: "💼", desc: "عناوين قسم الخدمات، وإضافة/تعديل/حذف أي خدمة ومخرجاتها" },
    { id: "why_us", label: "لماذا تختارنا (Why Us)", icon: "💎", desc: "أعمدة القوة الأربعة وبانر حجز جلسة الاستشارة" },
    { id: "about", label: "صفحة من نحن (About Page)", icon: "ℹ️", desc: "قصة التأسيس، الأرقام والإحصائيات، القيم الهندسية، والتقنيات" },
    { id: "cta", label: "دعوة التواصل (Call To Action)", icon: "🚀", desc: "بانر طلب عرض السعر ورابط الواتساب والضمانات" },
    { id: "contact", label: "صفحة اتصل بنا (Contact Page)", icon: "📬", desc: "بيانات التواصل المباشر، مواعيد العمل، والأسئلة الشائعة FAQs" },
    { id: "footer", label: "الفوتر (Footer)", icon: "📄", desc: "النبذة التعريفية، حقوق النشر، وبيانات التواصل السريع" },
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-obsidian-900/90 border border-white/[0.08] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 mb-2">
            <span>Live Site Content Editor</span>
            <span>•</span>
            <span>التحكم في كل حرف</span>
          </div>
          <h2 className="text-xl font-black text-white font-sans">
            إدارة نصوص ومحتوى صفحات الموقع بالكامل
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            يمكنك الآن تعديل كل كلمة، عنوان، رقم، أو زر في الموقع بكل سهولة. أي تعديل تقوم بحفظه يظهر مباشرة على الموقع الحي للزوار بدون الحاجة لأي تعديل في الكود.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(activeSection)}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-mono font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            <span>{saving ? "جاري الحفظ..." : "💾 حفظ التعديلات"}</span>
          </button>
        </div>
      </div>

      {/* Status Alert */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border transition-all ${
            statusMsg.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/60 border-red-500/40 text-red-300"
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      {/* Grid: Sections Navigation Sidebar + Active Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-4 bg-obsidian-900/80 border border-white/[0.08] p-3 rounded-2xl space-y-1.5 font-mono text-xs">
          <div className="px-3 py-2 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
            أقسام الموقع (Sections)
          </div>
          {sectionsList.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  setStatusMsg(null);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600/30 text-white border border-indigo-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span className="text-lg">{sec.icon}</span>
                <div className="flex-grow">
                  <div className={`font-bold ${isActive ? "text-cyan-300" : "text-slate-200"}`}>
                    {sec.label}
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans mt-0.5 line-clamp-1">
                    {sec.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Section Form Area */}
        <div className="lg:col-span-8 bg-obsidian-900/80 border border-white/[0.08] p-6 rounded-2xl space-y-6">
          {/* Section Title & Reset Action */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{sectionsList.find((s) => s.id === activeSection)?.icon}</span>
                <span>{sectionsList.find((s) => s.id === activeSection)?.label}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {sectionsList.find((s) => s.id === activeSection)?.desc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleReset(activeSection)}
              className="text-[11px] font-mono text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
            >
              🔄 استعادة الافتراضي
            </button>
          </div>

          {/* ============================================================ */}
          {/* SECTION: HERO */}
          {/* ============================================================ */}
          {activeSection === "hero" && (
            <div className="space-y-5 text-xs font-mono">
              <div>
                <label className="text-slate-300 block mb-1">شارة أعلى الهيرو (Top Badge)</label>
                <input
                  type="text"
                  value={hero.badge}
                  onChange={(e) => setHero({ ...hero, badge: e.target.value })}
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="مثال: ZALTREX IT SOLUTIONS • Software & Cloud Engineering"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">العنوان الرئيسي (الجزء الأول)</label>
                  <input
                    type="text"
                    value={hero.titlePart1}
                    onChange={(e) => setHero({ ...hero, titlePart1: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-cyan-300 block mb-1">النص المميز الملون (Gradient Highlight)</label>
                  <input
                    type="text"
                    value={hero.titleHighlight}
                    onChange={(e) => setHero({ ...hero, titleHighlight: e.target.value })}
                    className="w-full bg-obsidian-950 border border-cyan-500/40 rounded-xl px-4 py-2.5 text-cyan-300 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">العنوان الرئيسي (الجزء الأخير)</label>
                  <input
                    type="text"
                    value={hero.titlePart2}
                    onChange={(e) => setHero({ ...hero, titlePart2: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">الوصف الفرعي (Subheadline Paragraph)</label>
                <textarea
                  rows={3}
                  value={hero.subtitle}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 focus:outline-none font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-3 p-4 rounded-xl bg-obsidian-950 border border-white/[0.06]">
                  <div className="text-cyan-400 font-bold">الزر الأساسي (Primary CTA)</div>
                  <div>
                    <label className="text-slate-400 block mb-1 text-[11px]">نص الزر</label>
                    <input
                      type="text"
                      value={hero.ctaPrimaryText}
                      onChange={(e) => setHero({ ...hero, ctaPrimaryText: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1 text-[11px]">الرابط (Href Link)</label>
                    <input
                      type="text"
                      value={hero.ctaPrimaryLink}
                      onChange={(e) => setHero({ ...hero, ctaPrimaryLink: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-obsidian-950 border border-white/[0.06]">
                  <div className="text-slate-300 font-bold">الزر الثانوي (Secondary CTA)</div>
                  <div>
                    <label className="text-slate-400 block mb-1 text-[11px]">نص الزر</label>
                    <input
                      type="text"
                      value={hero.ctaSecondaryText}
                      onChange={(e) => setHero({ ...hero, ctaSecondaryText: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1 text-[11px]">الرابط (Href Link)</label>
                    <input
                      type="text"
                      value={hero.ctaSecondaryLink}
                      onChange={(e) => setHero({ ...hero, ctaSecondaryLink: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="pt-3">
                <label className="text-slate-300 block mb-2 font-bold">بطاقات الإحصائيات الأربعة (Stats Bar)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {hero.stats.map((stat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-obsidian-950 border border-white/10 space-y-2">
                      <div className="text-[10px] text-cyan-400">بطاقة #{idx + 1}</div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">القيمة / الرقم</label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...hero.stats];
                            newStats[idx].value = e.target.value;
                            setHero({ ...hero, stats: newStats });
                          }}
                          className="w-full bg-obsidian-900 border border-white/10 rounded px-2 py-1 text-white font-bold text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">الوصف / التسمية</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...hero.stats];
                            newStats[idx].label = e.target.value;
                            setHero({ ...hero, stats: newStats });
                          }}
                          className="w-full bg-obsidian-900 border border-white/10 rounded px-2 py-1 text-slate-300 text-[11px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Card Pill */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-slate-300 block mb-1">عنوان الشارة العائمة على صورة الهيرو</label>
                  <input
                    type="text"
                    value={hero.pillBadge}
                    onChange={(e) => setHero({ ...hero, pillBadge: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">وصف الشارة العائمة</label>
                  <input
                    type="text"
                    value={hero.pillText}
                    onChange={(e) => setHero({ ...hero, pillText: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SECTION: GENERAL BRAND & INFO */}
          {/* ============================================================ */}
          {activeSection === "general" && (
            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">اسم الشركة (Site Name)</label>
                  <input
                    type="text"
                    value={general.siteName}
                    onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">شارة اللوجو (Badge Text)</label>
                  <input
                    type="text"
                    value={general.badgeText}
                    onChange={(e) => setGeneral({ ...general, badgeText: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">الشعار الفرعي (Tagline)</label>
                  <input
                    type="text"
                    value={general.tagline}
                    onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">البريد الإلكتروني للعملاء (Email)</label>
                  <input
                    type="text"
                    value={general.email}
                    onChange={(e) => setGeneral({ ...general, email: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">بريد الدعم الإضافي (Support Email)</label>
                  <input
                    type="text"
                    value={general.supportEmail}
                    onChange={(e) => setGeneral({ ...general, supportEmail: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">رقم الهاتف (Phone Number)</label>
                  <input
                    type="text"
                    value={general.phone}
                    onChange={(e) => setGeneral({ ...general, phone: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">المقر والنطاق (Location)</label>
                  <input
                    type="text"
                    value={general.location}
                    onChange={(e) => setGeneral({ ...general, location: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-emerald-400 block mb-1">رابط الواتساب المباشر (WhatsApp Link)</label>
                  <input
                    type="text"
                    value={general.whatsappUrl}
                    onChange={(e) => setGeneral({ ...general, whatsappUrl: e.target.value })}
                    className="w-full bg-obsidian-950 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">رابط GitHub</label>
                  <input
                    type="text"
                    value={general.githubUrl}
                    onChange={(e) => setGeneral({ ...general, githubUrl: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">رابط LinkedIn</label>
                  <input
                    type="text"
                    value={general.linkedinUrl}
                    onChange={(e) => setGeneral({ ...general, linkedinUrl: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">رابط Twitter / X</label>
                  <input
                    type="text"
                    value={general.twitterUrl}
                    onChange={(e) => setGeneral({ ...general, twitterUrl: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SECTION: SERVICES */}
          {/* ============================================================ */}
          {activeSection === "services" && (
            <div className="space-y-6 text-xs font-mono">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">شارة القسم (Section Badge)</label>
                  <input
                    type="text"
                    value={services.badge}
                    onChange={(e) => setServices({ ...services, badge: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-slate-300 block mb-1">عنوان قسم الخدمات (Section Title)</label>
                  <input
                    type="text"
                    value={services.title}
                    onChange={(e) => setServices({ ...services, title: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2 text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">الوصف التمهيدي للقسم</label>
                <input
                  type="text"
                  value={services.subtitle}
                  onChange={(e) => setServices({ ...services, subtitle: e.target.value })}
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2 text-white font-sans text-xs"
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300 font-bold">قائمة الخدمات ({services.items.length})</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newId = "service-" + Date.now().toString(36);
                      setServices({
                        ...services,
                        items: [
                          ...services.items,
                          {
                            id: newId,
                            icon: "✨",
                            title: "New Service",
                            description: "Description of the new service...",
                            deliverables: ["Deliverable 1", "Deliverable 2"],
                          },
                        ],
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold cursor-pointer hover:bg-cyan-500/30"
                  >
                    + إضافة خدمة جديدة
                  </button>
                </div>

                <div className="space-y-4">
                  {services.items.map((srv, idx) => (
                    <div key={srv.id || idx} className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={srv.icon}
                            onChange={(e) => {
                              const newItems = [...services.items];
                              newItems[idx].icon = e.target.value;
                              setServices({ ...services, items: newItems });
                            }}
                            className="w-10 text-center bg-obsidian-900 border border-white/20 rounded p-1 text-base"
                            title="رمز / إيموجي الخدمة"
                          />
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => {
                              const newItems = [...services.items];
                              newItems[idx].title = e.target.value;
                              setServices({ ...services, items: newItems });
                            }}
                            className="bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white font-bold text-xs w-64"
                            placeholder="عنوان الخدمة"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`حذف خدمة "${srv.title}"؟`)) {
                              const newItems = services.items.filter((_, i) => i !== idx);
                              setServices({ ...services, items: newItems });
                            }
                          }}
                          className="text-red-400 hover:text-red-300 text-xs cursor-pointer px-2 py-1"
                        >
                          ✕ حذف
                        </button>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">وصف الخدمة</label>
                        <textarea
                          rows={2}
                          value={srv.description}
                          onChange={(e) => {
                            const newItems = [...services.items];
                            newItems[idx].description = e.target.value;
                            setServices({ ...services, items: newItems });
                          }}
                          className="w-full bg-obsidian-900 border border-white/10 rounded p-2 text-slate-300 font-sans text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">
                          المخرجات والقدرات الرئيسية (افصل بينها بفاصلة comma: ,)
                        </label>
                        <input
                          type="text"
                          value={srv.deliverables?.join(", ") || ""}
                          onChange={(e) => {
                            const newItems = [...services.items];
                            newItems[idx].deliverables = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            setServices({ ...services, items: newItems });
                          }}
                          className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-slate-300 text-xs"
                          placeholder="e.g. Next.js, API Integration, Dashboards"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SECTION: WHY CHOOSE US */}
          {/* ============================================================ */}
          {activeSection === "why_us" && (
            <div className="space-y-5 text-xs font-mono">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">شارة القسم</label>
                  <input
                    type="text"
                    value={whyUs.badge}
                    onChange={(e) => setWhyUs({ ...whyUs, badge: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-slate-300 block mb-1">العنوان الرئيسي</label>
                  <input
                    type="text"
                    value={whyUs.title}
                    onChange={(e) => setWhyUs({ ...whyUs, title: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2 text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">الوصف التمهيدي</label>
                <input
                  type="text"
                  value={whyUs.subtitle}
                  onChange={(e) => setWhyUs({ ...whyUs, subtitle: e.target.value })}
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2 text-white font-sans text-xs"
                />
              </div>

              <div className="pt-2">
                <label className="text-slate-300 block mb-2 font-bold">أعمدة القوة والمميزات (4 Pillars)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {whyUs.items.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item.icon}
                          onChange={(e) => {
                            const newItems = [...whyUs.items];
                            newItems[idx].icon = e.target.value;
                            setWhyUs({ ...whyUs, items: newItems });
                          }}
                          className="w-9 text-center bg-obsidian-900 border border-white/20 rounded p-1 text-base"
                        />
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...whyUs.items];
                            newItems[idx].title = e.target.value;
                            setWhyUs({ ...whyUs, items: newItems });
                          }}
                          className="flex-grow bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white font-bold text-xs"
                        />
                      </div>
                      <div>
                        <textarea
                          rows={3}
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...whyUs.items];
                            newItems[idx].description = e.target.value;
                            setWhyUs({ ...whyUs, items: newItems });
                          }}
                          className="w-full bg-obsidian-900 border border-white/10 rounded p-2 text-slate-300 font-sans text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-indigo-500/20 space-y-3">
                <div className="text-indigo-300 font-bold">بانر أسفل القسم (Discovery Call Banner)</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">عنوان البانر</label>
                    <input
                      type="text"
                      value={whyUs.bannerTitle}
                      onChange={(e) => setWhyUs({ ...whyUs, bannerTitle: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">نص زر البانر</label>
                    <input
                      type="text"
                      value={whyUs.bannerButtonText}
                      onChange={(e) => setWhyUs({ ...whyUs, bannerButtonText: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">وصف البانر</label>
                  <input
                    type="text"
                    value={whyUs.bannerSubtitle}
                    onChange={(e) => setWhyUs({ ...whyUs, bannerSubtitle: e.target.value })}
                    className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs font-sans"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SECTION: ABOUT PAGE */}
          {/* ============================================================ */}
          {activeSection === "about" && (
            <div className="space-y-6 text-xs font-mono">
              <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-3">
                <div className="text-cyan-400 font-bold">هيرو صفحة من نحن (About Page Hero)</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1 text-[10px]">الشارة</label>
                    <input
                      type="text"
                      value={about.heroBadge}
                      onChange={(e) => setAbout({ ...about, heroBadge: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-slate-400 block mb-1 text-[10px]">العنوان</label>
                    <input
                      type="text"
                      value={about.heroTitle}
                      onChange={(e) => setAbout({ ...about, heroTitle: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white font-bold text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 text-[10px]">الوصف التمهيدي</label>
                  <textarea
                    rows={2}
                    value={about.heroSubtitle}
                    onChange={(e) => setAbout({ ...about, heroSubtitle: e.target.value })}
                    className="w-full bg-obsidian-900 border border-white/10 rounded p-2 text-white font-sans text-xs"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-3">
                <div className="text-indigo-400 font-bold">قصة التأسيس (Our Origin Story)</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1 text-[10px]">شارة القصة</label>
                    <input
                      type="text"
                      value={about.originBadge}
                      onChange={(e) => setAbout({ ...about, originBadge: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-slate-400 block mb-1 text-[10px]">عنوان القصة</label>
                    <input
                      type="text"
                      value={about.originTitle}
                      onChange={(e) => setAbout({ ...about, originTitle: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white font-bold text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 text-[10px]">الفقرة الأولى</label>
                  <textarea
                    rows={3}
                    value={about.originP1}
                    onChange={(e) => setAbout({ ...about, originP1: e.target.value })}
                    className="w-full bg-obsidian-900 border border-white/10 rounded p-2 text-slate-300 font-sans text-xs"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 text-[10px]">الفقرة الثانية</label>
                  <textarea
                    rows={3}
                    value={about.originP2}
                    onChange={(e) => setAbout({ ...about, originP2: e.target.value })}
                    className="w-full bg-obsidian-900 border border-white/10 rounded p-2 text-slate-300 font-sans text-xs"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-3">
                <div className="text-emerald-400 font-bold">أرقام ومواصفات الشركة (Company Specs)</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">المقر الرئيسي</label>
                    <input
                      type="text"
                      value={about.stats.hq}
                      onChange={(e) =>
                        setAbout({ ...about, stats: { ...about.stats, hq: e.target.value } })
                      }
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-2.5 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">نطاق التسليم</label>
                    <input
                      type="text"
                      value={about.stats.scope}
                      onChange={(e) =>
                        setAbout({ ...about, stats: { ...about.stats, scope: e.target.value } })
                      }
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-2.5 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">دورة السبرنت</label>
                    <input
                      type="text"
                      value={about.stats.cadence}
                      onChange={(e) =>
                        setAbout({ ...about, stats: { ...about.stats, cadence: e.target.value } })
                      }
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-2.5 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">مستوى التوافر SLA</label>
                    <input
                      type="text"
                      value={about.stats.sla}
                      onChange={(e) =>
                        setAbout({ ...about, stats: { ...about.stats, sla: e.target.value } })
                      }
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-2.5 py-1.5 text-white text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">الاقتباس التعريفي (Mission Quote)</label>
                  <input
                    type="text"
                    value={about.stats.quote}
                    onChange={(e) =>
                      setAbout({ ...about, stats: { ...about.stats, quote: e.target.value } })
                    }
                    className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-slate-300 text-xs font-sans italic"
                  />
                </div>
              </div>

              {/* Core Values */}
              <div className="pt-2">
                <label className="text-slate-300 block mb-2 font-bold">القيم الهندسية (Core Values)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {about.values.map((v, i) => (
                    <div key={i} className="p-3 rounded-xl bg-obsidian-950 border border-white/10 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={v.icon}
                          onChange={(e) => {
                            const newVals = [...about.values];
                            newVals[i].icon = e.target.value;
                            setAbout({ ...about, values: newVals });
                          }}
                          className="w-8 text-center bg-obsidian-900 border border-white/20 rounded p-1 text-base"
                        />
                        <input
                          type="text"
                          value={v.title}
                          onChange={(e) => {
                            const newVals = [...about.values];
                            newVals[i].title = e.target.value;
                            setAbout({ ...about, values: newVals });
                          }}
                          className="flex-grow bg-obsidian-900 border border-white/10 rounded px-2.5 py-1 text-white font-bold text-xs"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={v.desc}
                        onChange={(e) => {
                          const newVals = [...about.values];
                          newVals[i].desc = e.target.value;
                          setAbout({ ...about, values: newVals });
                        }}
                        className="w-full bg-obsidian-900 border border-white/10 rounded p-2 text-slate-300 font-sans text-[11px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SECTION: CTA */}
          {/* ============================================================ */}
          {activeSection === "cta" && (
            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-300 block mb-1">شارة البانر (Badge)</label>
                <input
                  type="text"
                  value={cta.badge}
                  onChange={(e) => setCta({ ...cta, badge: e.target.value })}
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">العنوان الرئيسي للدعوة (Headline)</label>
                <input
                  type="text"
                  value={cta.title}
                  onChange={(e) => setCta({ ...cta, title: e.target.value })}
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">الوصف التوضيحي (Description)</label>
                <textarea
                  rows={3}
                  value={cta.subtitle}
                  onChange={(e) => setCta({ ...cta, subtitle: e.target.value })}
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl p-3 text-white font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-2">
                  <div className="text-cyan-400 font-bold">الزر الأساسي (Request Proposal)</div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">نص الزر</label>
                    <input
                      type="text"
                      value={cta.buttonText}
                      onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">الرابط</label>
                    <input
                      type="text"
                      value={cta.buttonLink}
                      onChange={(e) => setCta({ ...cta, buttonLink: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-obsidian-950 border border-emerald-500/20 space-y-2">
                  <div className="text-emerald-400 font-bold">زر الواتساب (WhatsApp Button)</div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">نص الزر</label>
                    <input
                      type="text"
                      value={cta.whatsappText}
                      onChange={(e) => setCta({ ...cta, whatsappText: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">رابط الواتساب</label>
                    <input
                      type="text"
                      value={cta.whatsappUrl}
                      onChange={(e) => setCta({ ...cta, whatsappUrl: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">
                  نقاط الضمان السريعة أسفل البانر (افصل بينها بفاصلة comma: ,)
                </label>
                <input
                  type="text"
                  value={cta.guarantees?.join(", ") || ""}
                  onChange={(e) =>
                    setCta({
                      ...cta,
                      guarantees: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2 text-white"
                  placeholder="Fast 24h Response, Strict NDA, Flexible Milestones"
                />
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SECTION: CONTACT PAGE */}
          {/* ============================================================ */}
          {activeSection === "contact" && (
            <div className="space-y-6 text-xs font-mono">
              <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-3">
                <div className="text-cyan-400 font-bold">هيرو صفحة اتصل بنا (Contact Page Hero)</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1 text-[10px]">الشارة</label>
                    <input
                      type="text"
                      value={contact.heroBadge}
                      onChange={(e) => setContact({ ...contact, heroBadge: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-slate-400 block mb-1 text-[10px]">العنوان</label>
                    <input
                      type="text"
                      value={contact.heroTitle}
                      onChange={(e) => setContact({ ...contact, heroTitle: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white font-bold text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 text-[10px]">الوصف</label>
                  <textarea
                    rows={2}
                    value={contact.heroSubtitle}
                    onChange={(e) => setContact({ ...contact, heroSubtitle: e.target.value })}
                    className="w-full bg-obsidian-900 border border-white/10 rounded p-2 text-white font-sans text-xs"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-3">
                <div className="text-emerald-400 font-bold">بطاقة التواصل السريع ومواعيد العمل</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">البريد الإلكتروني المباشر</label>
                    <input
                      type="text"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">العنوان والمقر</label>
                    <input
                      type="text"
                      value={contact.address}
                      onChange={(e) => setContact({ ...contact, address: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">مواعيد العمل (Working Hours)</label>
                    <input
                      type="text"
                      value={contact.workingHours}
                      onChange={(e) => setContact({ ...contact, workingHours: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">ملاحظة التوافر الإضافية</label>
                    <input
                      type="text"
                      value={contact.workingHoursSub}
                      onChange={(e) => setContact({ ...contact, workingHoursSub: e.target.value })}
                      className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">متوسط سرعة الرد</label>
                  <input
                    type="text"
                    value={contact.responseTime}
                    onChange={(e) => setContact({ ...contact, responseTime: e.target.value })}
                    className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-emerald-400 text-xs"
                  />
                </div>
              </div>

              {/* FAQs */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300 font-bold">الأسئلة الشائعة FAQs ({contact.faqs.length})</span>
                  <button
                    type="button"
                    onClick={() => {
                      setContact({
                        ...contact,
                        faqs: [
                          ...contact.faqs,
                          { q: "New Question?", a: "Detailed answer goes here..." },
                        ],
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold cursor-pointer hover:bg-indigo-500/30"
                  >
                    + إضافة سؤال جديد
                  </button>
                </div>

                <div className="space-y-3">
                  {contact.faqs.map((faq, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-obsidian-950 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-cyan-400 font-bold">سؤال #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newFaqs = contact.faqs.filter((_, i) => i !== idx);
                            setContact({ ...contact, faqs: newFaqs });
                          }}
                          className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                        >
                          ✕ حذف
                        </button>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => {
                            const newFaqs = [...contact.faqs];
                            newFaqs[idx].q = e.target.value;
                            setContact({ ...contact, faqs: newFaqs });
                          }}
                          className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 text-white font-bold text-xs"
                          placeholder="نص السؤال"
                        />
                      </div>
                      <div>
                        <textarea
                          rows={2}
                          value={faq.a}
                          onChange={(e) => {
                            const newFaqs = [...contact.faqs];
                            newFaqs[idx].a = e.target.value;
                            setContact({ ...contact, faqs: newFaqs });
                          }}
                          className="w-full bg-obsidian-900 border border-white/10 rounded p-2 text-slate-300 font-sans text-xs"
                          placeholder="نص الإجابة"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SECTION: FOOTER */}
          {/* ============================================================ */}
          {activeSection === "footer" && (
            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-300 block mb-1">النبذة التعريفية في الفوتر (Brand Bio)</label>
                <textarea
                  rows={3}
                  value={footer.brandBio}
                  onChange={(e) => setFooter({ ...footer, brandBio: e.target.value })}
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl p-3 text-white font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">العنوان والمقر (Address & Delivery)</label>
                  <input
                    type="text"
                    value={footer.address}
                    onChange={(e) => setFooter({ ...footer, address: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">البريد الإلكتروني المذكور في الفوتر</label>
                  <input
                    type="text"
                    value={footer.emails}
                    onChange={(e) => setFooter({ ...footer, emails: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">نص حقوق الملكية (Copyright Statement)</label>
                  <input
                    type="text"
                    value={footer.copyrightNotice}
                    onChange={(e) => setFooter({ ...footer, copyrightNotice: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-emerald-400 block mb-1">شارة الحالة المباشرة (Live Status Badge)</label>
                  <input
                    type="text"
                    value={footer.statusBadge}
                    onChange={(e) => setFooter({ ...footer, statusBadge: e.target.value })}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-emerald-400 font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Save Bar */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-mono">
              ⚡ التعديلات تحفظ وتُطبق لحظياً على الصفحات
            </span>
            <button
              onClick={() => handleSave(activeSection)}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-mono font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              <span>{saving ? "جاري الحفظ..." : "💾 حفظ التعديلات"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
