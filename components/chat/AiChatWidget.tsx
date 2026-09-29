"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  dialect?: string;
  isLeadCaptured?: boolean;
}

const QUICK_PROMPTS = [
  { label: "💼 نماذج مشاريعنا", prompt: "ممكن توريني نماذج من مشاريعكم السابقة؟" },
  { label: "💰 تكلفة الـ MVP", prompt: "بكام تكلفة بناء MVP سريع لتطبيقي وموقع شركتي؟" },
  { label: "📱 تطبيق موبايل", prompt: "عايز اعمل تطبيق موبايل لـ iOS و Android بمواصفات احترافية" },
  { label: "📅 استشارة مجانية", prompt: "حابب احجز جلسة استشارة فنية مع مهندسيكم لمناقشة فكرة مشروع" },
];

const DIALECT_OPTIONS = [
  { id: "auto", label: "⚡ تكيف ذكي مع لهجتك", flag: "🌐" },
  { id: "egyptian", label: "🇪🇬 مصري راقي وودود", flag: "🇪🇬" },
  { id: "gulf", label: "🇸🇦 خليجي فخم ومضياف", flag: "🇸🇦" },
  { id: "levantine", label: "🇸🇾 شامي لطيف ومهذب", flag: "🇸🇾" },
  { id: "formal", label: "🏢 فصحى رسمية للشركات", flag: "🏛️" },
  { id: "english", label: "🇺🇸 English (Tech SaaS)", flag: "🇺🇸" },
];

// Pure Web Audio Synth Sound FX (Zero external dependencies)
function playCyberSound(type: "open" | "send" | "receive" | "success") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === "open") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === "send") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "receive") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(659.25, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === "success") {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.06);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.06 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.15);
      });
    }
  } catch (err) {
    // Audio context may be restricted by autoplay policy
  }
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTeaserVisible, setIsTeaserVisible] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedDialect, setSelectedDialect] = useState("auto");
  const [showDialectMenu, setShowDialectMenu] = useState(false);

  // In-chat consultation quick form state
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadDetails, setLeadDetails] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      content:
        "أهلاً بحضرتك في Zaltrex! ⚡ أنا المستشار التقني الذكي. أقدر أجاوبك بكل اللهجات (المصرية، الخليجية، الفصحى، أو الإنجليزية) عن خدماتنا البرمجية، تكلفة الـ MVP، أو نبدأ مشروعك فوراً. كيف تحب نبدأ اليوم؟",
      timestamp: "الآن",
      dialect: "auto",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, showLeadForm]);

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setIsTeaserVisible(false);
      if (soundEnabled) playCyberSound("open");
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    if (soundEnabled) playCyberSound("send");

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userDialectPreference: selectedDialect,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (soundEnabled) playCyberSound(data.leadCaptured ? "success" : "receive");

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply || "يسعدني مساعدتك! هل تحب نشاركك تفاصيل أكثر أو نتواصل على واتساب؟",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          dialect: data.detectedDialect,
          isLeadCaptured: data.leadCaptured,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("Chat response failed");
      }
    } catch {
      if (soundEnabled) playCyberSound("receive");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "شكراً لتواصلك مع Zaltrex! 🚀 فريقنا الهندسي جاهز لمساعدتك دائماً. يمكنك أيضاً التحدث معنا مباشرة عبر الواتساب على +20 100 123 4567 لسرعة الرد.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadContact.trim() || isSubmittingLead) return;

    setIsSubmittingLead(true);
    const summary = `طلب استشارة من الشات: الاسم: ${leadName || "عميل مهتم"} - التواصل: ${leadContact} - تفاصيل الفكرة: ${leadDetails || "استشارة عامة"}`;

    await handleSend(summary);
    setShowLeadForm(false);
    setLeadName("");
    setLeadContact("");
    setLeadDetails("");
    setIsSubmittingLead(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "fresh-welcome",
        role: "assistant",
        content: "تم بدء محادثة جديدة. كيف يمكنني خدمة مشروعك اليوم؟ ⚡",
        timestamp: "الآن",
      },
    ]);
  };

  const currentDialectObj =
    DIALECT_OPTIONS.find((d) => d.id === selectedDialect) || DIALECT_OPTIONS[0];

  return (
    <aside aria-label="Zaltrex AI Assistant" className="fixed bottom-6 right-6 z-50 font-sans select-none">
      {/* 1. FLOATING TEASER NOTIFICATION (Attracts high-value clicks) */}
      {!isOpen && isTeaserVisible && (
        <div className="absolute -top-14 right-0 flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-obsidian-900/95 border border-cyan-500/30 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </span>
          <span className="text-[11px] font-medium text-slate-200 whitespace-nowrap font-sans">
            مستشارك التقني الذكي هنا ✦ جاهز لخدمتك
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsTeaserVisible(false);
            }}
            className="text-slate-400 hover:text-white text-xs px-1 hover:bg-white/10 rounded transition-colors"
            title="إغلاق التنبيه"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. COLLAPSED TRIGGER BUTTON (Sleek Cyber Orb) */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          aria-expanded={false}
          aria-haspopup="dialog"
          aria-label="Open Zaltrex AI chat assistant"
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-obsidian-900 via-indigo-950 to-obsidian-900 border border-cyan-500/40 text-white font-bold text-xs shadow-[0_10px_35px_rgba(6,182,212,0.25)] hover:shadow-[0_15px_45px_rgba(6,182,212,0.4)] hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          {/* Ambient Cyber Light Ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Glowing Status Dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></span>
          </span>

          {/* Bot Avatar Icon */}
          <div className="relative w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs shadow-md">
            🤖
          </div>

          <div className="flex flex-col text-right leading-tight z-10">
            <span className="text-[11px] font-bold text-white tracking-wide font-sans">
              تحدث مع Zaltrex AI
            </span>
            <span className="text-[9px] font-mono text-cyan-400 flex items-center gap-1">
              <span>● نشط الآن بكل اللهجات</span>
            </span>
          </div>
        </button>
      )}

      {/* 3. EXPANDED CYBER CHAT WINDOW */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Zaltrex AI Chat Window"
          className="w-[360px] sm:w-[410px] h-[580px] max-h-[88vh] rounded-3xl bg-obsidian-950/95 border border-cyan-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(6,182,212,0.18)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Top Header */}
          <div className="p-4 bg-obsidian-900/90 border-b border-white/[0.08] flex items-center justify-between relative z-20">
            <div className="flex items-center gap-3">
              {/* Glowing Neural Avatar */}
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full rounded-[14px] bg-obsidian-950 flex items-center justify-center text-lg">
                  🤖
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-obsidian-950 shadow-[0_0_8px_#34d399]"></span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-white leading-tight font-sans tracking-wide">
                    Zaltrex AI Advisor
                  </h3>
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    v2.5
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-sans flex items-center gap-1.5 mt-0.5">
                  <span className="text-emerald-400">● متاح فوري</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-cyan-400/90 font-mono text-[9px]">
                    Multi-Dialect AI
                  </span>
                </div>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1.5">
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-xl border transition-all text-xs cursor-pointer ${
                  soundEnabled
                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                    : "bg-white/[0.04] border-white/10 text-slate-500"
                }`}
                title={soundEnabled ? "كتم المؤثرات الصوتية" : "تفعيل الأصوات التفاعلية"}
              >
                {soundEnabled ? "🔊" : "🔇"}
              </button>

              {/* WhatsApp Bridge */}
              <a
                href="https://wa.me/201001234567?text=مرحباً%20Zaltrex،%20أود%20الاستفسار%20عن%20خدماتكم%20البرمجية"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs transition-colors"
                title="تواصل مباشر عبر الواتساب"
              >
                💬
              </a>

              {/* Clear Chat */}
              <button
                onClick={clearChat}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs"
                title="إعادة ضبط المحادثة"
              >
                🔄
              </button>

              {/* Close Button */}
              <button
                onClick={toggleOpen}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs font-mono"
                title="تصغير الشات"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Dialect Selector Banner */}
          <div className="px-4 py-2 bg-obsidian-900/60 border-b border-white/[0.05] flex items-center justify-between text-[11px] font-sans relative z-10">
            <span className="text-slate-400 text-[10px] flex items-center gap-1">
              <span>الأسلوب واللهجة:</span>
            </span>

            <div className="relative">
              <button
                onClick={() => setShowDialectMenu(!showDialectMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-cyan-300 font-mono text-[10px] transition-all cursor-pointer"
              >
                <span>{currentDialectObj.flag}</span>
                <span>{currentDialectObj.label}</span>
                <span className="text-[8px] text-slate-400">▼</span>
              </button>

              {showDialectMenu && (
                <div className="absolute top-8 left-0 w-52 rounded-2xl bg-obsidian-900/98 border border-white/15 shadow-2xl p-1.5 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {DIALECT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedDialect(opt.id);
                        setShowDialectMenu(false);
                      }}
                      className={`w-full text-right px-2.5 py-1.5 rounded-xl text-[11px] font-sans flex items-center justify-between transition-colors cursor-pointer ${
                        selectedDialect === opt.id
                          ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                          : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="text-xs">{opt.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 text-xs font-sans scroll-smooth">
            {messages.map((m) => {
              const isUser = m.role === "user";
              const isArabic = /[\u0600-\u06FF]/.test(m.content);

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"} group`}
                >
                  <div
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`max-w-[88%] px-4 py-3 rounded-2xl leading-relaxed whitespace-pre-wrap transition-all ${
                      isUser
                        ? "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 text-white rounded-br-none shadow-[0_5px_20px_rgba(79,70,229,0.25)] border border-white/15"
                        : "bg-obsidian-900/95 border border-white/[0.08] text-slate-100 rounded-bl-none shadow-sm hover:border-white/15"
                    }`}
                  >
                    {m.content}

                    {/* Inline Lead Success Badge */}
                    {m.isLeadCaptured && (
                      <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] flex items-center gap-2">
                        <span>✅</span>
                        <span>تم توثيق طلبك رسمياً في نظام المشروعات وسيتواصل معك مهندسونا فوراً.</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1 px-1 text-[9px] font-mono text-slate-500">
                    <span>{m.timestamp}</span>
                    {!isUser && m.dialect && m.dialect !== "auto" && (
                      <span className="px-1.5 py-0.2 rounded bg-white/[0.04] text-cyan-400 border border-white/[0.06]">
                        {m.dialect}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Quick Action Chips (Shown when only welcome message is present) */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider text-right">
                  ✦ أسئلة شائعة وبداية سريعة:
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {QUICK_PROMPTS.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(item.prompt)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-cyan-500/20 text-[11px] text-slate-300 hover:text-cyan-300 text-right transition-all cursor-pointer hover:border-cyan-400 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inline Quick Consultation Form Toggle */}
            {!showLeadForm && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-cyan-950/40 border border-cyan-500/20 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-300">
                  <span>📅</span>
                  <span>تريد حجز جلسة استشارة فنية؟</span>
                </div>
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold transition-all cursor-pointer text-[10px]"
                >
                  سجل بياناتك
                </button>
              </div>
            )}

            {/* In-Chat Quick Consultation Form */}
            {showLeadForm && (
              <form
                onSubmit={handleQuickLeadSubmit}
                dir="rtl"
                className="p-4 rounded-2xl bg-obsidian-900 border border-cyan-500/30 space-y-3 shadow-xl animate-in fade-in duration-200"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>طلب استشارة وعرض فني مباشر</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="اسم حضرتك الكريم..."
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="رقم الواتساب أو البريد الإلكتروني (مطلوب)..."
                    required
                    value={leadContact}
                    onChange={(e) => setLeadContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="فكرة مشروعك باختصار (موقع، تطبيق، ERP، ذكاء اصطناعي)..."
                    rows={2}
                    value={leadDetails}
                    onChange={(e) => setLeadDetails(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingLead || !leadContact.trim()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-600/30"
                >
                  {isSubmittingLead ? "جاري الإرسال وتوثيق الطلب..." : "إرسال وتحديد ميعاد الاستشارة ✦"}
                </button>
              </form>
            )}

            {/* Thinking / Loading Animation */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] w-fit">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] font-mono ml-1 text-cyan-300">
                  Zaltrex AI is formulating response...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-obsidian-900/90 border-t border-white/[0.08] flex items-center gap-2 relative z-20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب استفسارك بأي لهجة أو لغة تحبها..."
              dir="auto"
              className="flex-grow px-4 py-2.5 rounded-2xl bg-obsidian-950 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs transition-all disabled:opacity-40 cursor-pointer shadow-md hover:scale-105 active:scale-95 flex items-center justify-center"
              title="إرسال"
            >
              <span>➤</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
