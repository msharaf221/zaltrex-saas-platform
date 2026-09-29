"use client";

import React, { useState } from "react";
import { updateAgentConfig } from "@/app/actions/cms";

export interface AgentConfigRecord {
  id: string;
  botName: string;
  welcomeMessage: string;
  systemPrompt: string;
  knowledgeBase: string;
  modelName: string;
  geminiApiKey?: string | null;
  defaultTone?: string;
  isActive: boolean;
}

interface AdminAiAgentManagerProps {
  initialConfig: AgentConfigRecord | null;
  aiLeads: any[];
}

export default function AdminAiAgentManager({
  initialConfig,
  aiLeads,
}: AdminAiAgentManagerProps) {
  const [config, setConfig] = useState<AgentConfigRecord>(
    initialConfig || {
      id: "default_config",
      botName: "Zaltrex AI Advisor",
      welcomeMessage:
        "أهلاً بحضرتك في Zaltrex! ⚡ أنا المستشار التقني الذكي. أقدر أجاوبك بكل اللهجات (المصرية، الخليجية، الفصحى، أو الإنجليزية) عن خدماتنا البرمجية وتكلفة المشاريع. كيف تحب نبدأ اليوم؟",
      systemPrompt:
        "You are the official AI Technical Consultant and Client Representative for Zaltrex, an elite IT Solutions & Software Development startup. Answer prospective client questions clearly, accurately, and professionally based on the company knowledge base. You speak both English and Arabic fluently. If a client wants to start a project or request a quote, politely ask for their Name, Email, and Phone/WhatsApp number or direct them to our Contact page / WhatsApp chat.",
      knowledgeBase: `# ZALTREX IT SOLUTIONS — COMPANY KNOWLEDGE BASE

## About Zaltrex:
Zaltrex is an emerging IT Solutions & Software Development startup based in Cairo, Egypt, providing engineering services locally across Egypt, the MENA region (UAE, Saudi Arabia, Qatar), and globally.

## Core Services & Capabilities:
1. Web & SaaS Platform Development (Next.js, React, Node.js, TypeScript, PostgreSQL)
2. Custom Enterprise Software & ERP (Tailored business portals, inventory, supply chain)
3. Mobile App Development (Cross-platform Flutter & React Native for iOS/Android)
4. AI Solutions & Process Automation (Custom RAG bots, document extraction, workflows)
5. Cloud Infrastructure & DevOps (AWS, Azure, Docker, Kubernetes, CI/CD pipelines)
6. Cybersecurity & Code Audits (Zero-trust, OWASP Top 10 security)

## Pricing Guidelines & Timelines:
- Rapid MVP: $5,000 - $15,000 (delivered in 2-6 weeks)
- Enterprise Platform / ERP: $15,000 - $35,000+ (2-4 months)
- 100% IP & Source Code Ownership belongs to the client.

## Contact Channels:
- WhatsApp: +20 100 123 4567
- Email: contact@zaltrex.cloud`,
      modelName: "gemini-2.5-flash",
      geminiApiKey: "",
      defaultTone: "auto",
      isActive: true,
    }
  );

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Playground simulation state
  const [testInput, setTestInput] = useState("");
  const [testDialect, setTestDialect] = useState("auto");
  const [testMessages, setTestMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isTestLoading, setIsTestLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);

    const res = await updateAgentConfig({
      botName: config.botName,
      welcomeMessage: config.welcomeMessage,
      systemPrompt: config.systemPrompt,
      knowledgeBase: config.knowledgeBase,
      modelName: config.modelName,
      geminiApiKey: config.geminiApiKey || null,
      defaultTone: config.defaultTone || "auto",
      isActive: config.isActive,
    });

    setIsSaving(false);
    if (res.success) {
      setSaveMessage({ type: "success", text: "تم حفظ وتحديث إعدادات الـ AI Agent بنجاح!" });
      setTimeout(() => setSaveMessage(null), 4000);
    } else {
      setSaveMessage({ type: "error", text: res.error || "حدث خطأ أثناء الحفظ" });
    }
  };

  const handleTestSend = async () => {
    if (!testInput.trim() || isTestLoading) return;
    const userMsg = { role: "user", content: testInput.trim() };
    const newHistory = [...testMessages, userMsg];
    setTestMessages(newHistory);
    setTestInput("");
    setIsTestLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory,
          userDialectPreference: testDialect,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setTestMessages([
          ...newHistory,
          {
            role: "assistant",
            content: `[اللهجة: ${data.detectedDialect || "تلقائي"}] ${data.reply}`,
          },
        ]);
      }
    } catch (err) {
      setTestMessages([
        ...newHistory,
        { role: "assistant", content: "خطأ في الاتصال بالسيرفر التجريبي" },
      ]);
    } finally {
      setIsTestLoading(false);
    }
  };

  return (
    <div className="space-y-10 font-sans">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-obsidian-900 to-cyan-950/60 border border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🤖</span>
            <h2 className="text-xl font-black text-white font-sans">
              Zaltrex Autonomous AI Agent
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
              Multi-Dialect Core
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            مساعد الذكاء الاصطناعي يتحدث مع عملائك بالعامية المصرية، الخليجية، الشامية، الفصحى، والإنجليزية بناءً على قاعدة البيانات الحية، ويسجل بياناتهم ومشاريعهم كطلبات استشارة فورية.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">
            {config.isActive ? "🟢 الـ Agent مفعّل بالموقع" : "🔴 الـ Agent متوقف"}
          </span>
          <button
            type="button"
            onClick={() => setConfig({ ...config, isActive: !config.isActive })}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
              config.isActive
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-red-500/20 text-red-300 border-red-500/40"
            }`}
          >
            {config.isActive ? "تعطيل مؤقت" : "تفعيل الآن"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Settings & Knowledge Base Form (7 Cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-obsidian-900/80 border border-white/[0.08] space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <span>⚙️</span>
              <span>الإعدادات الأساسية وشخصية الـ Agent</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  اسم البوت للعملاء (Bot Display Name)
                </label>
                <input
                  type="text"
                  value={config.botName}
                  onChange={(e) => setConfig({ ...config, botName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  الأسلوب الافتراضي (Default Dialect / Tone)
                </label>
                <select
                  value={config.defaultTone || "auto"}
                  onChange={(e) => setConfig({ ...config, defaultTone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none cursor-pointer"
                >
                  <option value="auto">🌐 تكيف ذكي تلقائي (Auto-Detect Dialect)</option>
                  <option value="egyptian">🇪🇬 مصري راقي وودود (Egyptian Friendly)</option>
                  <option value="gulf">🇸🇦 خليجي فخم ومضياف (Gulf Executive)</option>
                  <option value="levantine">🇸🇾 شامي لطيف ومهذب (Levantine)</option>
                  <option value="formal">🏛️ فصحى رسمية للمؤسسات (Corporate Arabic)</option>
                  <option value="english">🇺🇸 English (Silicon Valley SaaS)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                رسالة الترحيب الأولى للزائر (Welcome Message)
              </label>
              <textarea
                rows={2}
                value={config.welcomeMessage}
                onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Google Gemini API Key (اختياري)
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy... (اتركه فارغاً لاستخدام الـ Fallback المجاني)"
                  value={config.geminiApiKey || ""}
                  onChange={(e) => setConfig({ ...config, geminiApiKey: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  إذا أدخلت مفتاحك، سيعمل بنموذج Gemini 2.5 مباشرة بدون الحاجة لإعادة تشغيل السيرفر.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  AI Model
                </label>
                <input
                  type="text"
                  value={config.modelName}
                  onChange={(e) => setConfig({ ...config, modelName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Knowledge Base Editor */}
          <div className="p-6 rounded-3xl bg-obsidian-900/80 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🧠</span>
                  <span>قاعدة المعرفة الحية للشركة (Knowledge Base)</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  أي معلومات، أسعار، سياسات، أو عروض تضيفها هنا، سيستخدمها الـ AI كمصدر حقيقة مطلق للرد على العملاء.
                </p>
              </div>
            </div>

            <div>
              <textarea
                rows={12}
                value={config.knowledgeBase}
                onChange={(e) => setConfig({ ...config, knowledgeBase: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-obsidian-950 border border-white/10 text-slate-200 text-xs font-mono leading-relaxed focus:border-cyan-400 focus:outline-none"
                placeholder="# اكتب هنا معلومات Zaltrex، الخدمات، الأسعار، وأرقام التواصل..."
                required
              />
            </div>

            {saveMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 ${
                  saveMessage.type === "success"
                    ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300"
                    : "bg-red-500/15 border border-red-500/40 text-red-300"
                }`}
              >
                <span>{saveMessage.type === "success" ? "✓" : "⚠️"}</span>
                <span>{saveMessage.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs transition-all shadow-xl shadow-indigo-600/30 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? "جاري الحفظ وتحديث الـ Agent..." : "حفظ التعديلات ونشرها فوراً للـ Agent ✦"}
            </button>
          </div>
        </form>

        {/* Right Column: Simulator Playground & Captured Leads (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Live Dialect Simulator */}
          <div className="p-6 rounded-3xl bg-obsidian-900/80 border border-cyan-500/20 flex flex-col h-[460px]">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">🧪</span>
                <h3 className="text-xs font-bold text-white font-sans">
                  مختبر تجربة اللهجات (Agent Simulator)
                </h3>
              </div>

              <select
                value={testDialect}
                onChange={(e) => setTestDialect(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-obsidian-950 border border-white/10 text-[10px] text-cyan-300 font-mono focus:outline-none cursor-pointer"
              >
                <option value="auto">🌐 تلقائي</option>
                <option value="egyptian">🇪🇬 مصري</option>
                <option value="gulf">🇸🇦 خليجي</option>
                <option value="levantine">🇸🇾 شامي</option>
                <option value="formal">🏢 فصحى</option>
                <option value="english">🇺🇸 English</option>
              </select>
            </div>

            {/* Test Messages Stream */}
            <div className="flex-grow overflow-y-auto space-y-2.5 p-2 text-xs font-sans">
              {testMessages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 text-xs px-4">
                  <span>💡 جرب كتابة جملة بالمصري أو الخليجي:</span>
                  <span className="text-slate-400 mt-1 italic">
                    "عايز اعمل تطبيق بكام؟" أو "ودي أسوي منصة سحابية وشلون تبدون؟"
                  </span>
                </div>
              )}

              {testMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600/30 border border-indigo-500/30 text-white ml-6 text-right"
                      : "bg-obsidian-950 border border-cyan-500/20 text-slate-200 mr-6 text-right"
                  }`}
                >
                  <div className="text-[9px] font-mono text-cyan-400 mb-1">
                    {msg.role === "user" ? "أنت (العميل):" : "رد الـ Agent:"}
                  </div>
                  {msg.content}
                </div>
              ))}

              {isTestLoading && (
                <div className="p-2 text-xs font-mono text-cyan-400 flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  <span>Agent is formulating response...</span>
                </div>
              )}
            </div>

            {/* Test Input */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2">
              <input
                type="text"
                placeholder="اكتب رسالة تجريبية..."
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTestSend()}
                className="flex-grow px-3 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={handleTestSend}
                disabled={isTestLoading || !testInput.trim()}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
              >
                جرب
              </button>
            </div>
          </div>

          {/* 2. Captured Leads Stream from AI Chat */}
          <div className="p-6 rounded-3xl bg-obsidian-900/80 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <span>🎯</span>
                <span>عملاء تم التقاطهم عبر الـ AI Chat ({aiLeads.length})</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Live Lead Pipeline
              </span>
            </div>

            {aiLeads.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">
                لا توجد طلبات ملتقطة عبر الشات حالياً. عندما يشارك أي عميل هاتفه أو إيميله مع الـ AI، ستظهر المحادثة وتفاصيل مشروعه هنا فوراً!
              </p>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {aiLeads.slice(0, 5).map((lead: any) => (
                  <div
                    key={lead.id}
                    className="p-3.5 rounded-2xl bg-obsidian-950 border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{lead.name}</span>
                      <span className="text-[9px] font-mono text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-cyan-300">
                      📞 {lead.phone || lead.email}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {lead.projectDetails}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
