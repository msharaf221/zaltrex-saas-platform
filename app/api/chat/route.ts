import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { messages, userDialectPreference } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Message history required." },
        { status: 400 }
      );
    }

    // 1. Fetch AI Agent Settings, Dynamic Projects, and Testimonials from Database
    const [agentConfig, projects, testimonials] = await Promise.all([
      prisma.agentConfig.findFirst({
        where: { id: "default_config" },
      }),
      prisma.project.findMany({
        take: 8,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        select: {
          title: true,
          description: true,
          category: true,
          tags: true,
          client: true,
          liveUrl: true,
        },
      }),
      prisma.testimonial.findMany({
        take: 4,
        where: { featured: true },
        select: {
          clientName: true,
          company: true,
          clientRole: true,
          feedback: true,
          rating: true,
        },
      }),
    ]);

    const botName = agentConfig?.botName || "Zaltrex AI Assistant";
    const baseSystemPrompt =
      agentConfig?.systemPrompt ||
      "You are the official AI Technical Consultant and Client Representative for Zaltrex IT Solutions.";
    const knowledgeBase = agentConfig?.knowledgeBase || "";
    const modelName = agentConfig?.modelName || "gemini-2.5-flash";
    const defaultTone = userDialectPreference || agentConfig?.defaultTone || "auto";

    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // 2. Dialect & Language Detection
    const detectedDialect = detectUserDialect(lastUserMessage, defaultTone);

    // 3. Lead Capture Auto-Detection:
    // Check if the user shared an email or phone in their message and log to Request
    const emailMatch = lastUserMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = lastUserMessage.match(/(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s-]{7,15}/);
    let leadCaptured = false;

    if (emailMatch || (phoneMatch && phoneMatch[0].replace(/\D/g, "").length >= 8)) {
      try {
        const detectedEmail = emailMatch ? emailMatch[0] : "chat-lead@zaltrex.cloud";
        const detectedPhone = phoneMatch ? phoneMatch[0].trim() : null;

        await prisma.request.create({
          data: {
            name: "AI Chat Prospect (" + detectedDialect + ")",
            email: detectedEmail,
            phone: detectedPhone,
            service: "AI Chat Lead",
            projectDetails: `Inquiry captured via Zaltrex AI Agent [Dialect: ${detectedDialect}]:\n"${lastUserMessage}"\n\nFull conversation transcript:\n${messages
              .map((m: any) => `${m.role.toUpperCase()}: ${m.content}`)
              .join("\n")}`,
            budget: "Discussing with AI",
            status: "PENDING",
          },
        });
        leadCaptured = true;
      } catch (err) {
        console.warn("Auto lead capture warning (non-fatal):", err);
      }
    }

    // 4. Build Live Knowledge Grounding String
    const projectsSummary = projects
      .map(
        (p, i) =>
          `${i + 1}. **${p.title}** (${p.category}): ${p.description} [Tech: ${p.tags || "Modern Web"}]`
      )
      .join("\n");

    const testimonialsSummary = testimonials
      .map(
        (t) =>
          `- ${t.clientName} (${t.clientRole}, ${t.company}): "${t.feedback}" [Rating: ${t.rating}/5★]`
      )
      .join("\n");

    // 5. Dialect Persona Master Directives
    const dialectDirectives = `
## DIALECT & TONE ADAPTATION RULES:
The client is currently interacting in: [${detectedDialect}].
Always mirror the customer's dialect, tone, and language naturally, warmly, and with deep technical authority:

- **Egyptian Arabic (المصري):**
  Use friendly, smart, hospitable Egyptian conversational tone ("يا هلا بيك يا فندم! نورت زالتريكس..", "طبعاً نقدر ننفذ لحضرتك ده بأعلى كفاءة وأمان", "الـ MVP نقدر نسلمه لحضرتك في غضون أسابيع..", "حابب نحدد معاد ميتنج فني أو ندردش على واتساب؟").
  Avoid stiff or robotic translations; sound like an elite Egyptian software engineering consultant.

- **Gulf / Saudi / Emirati / Khaleeji (الخليجي):**
  Use dignified, hospitable, generous Khaleeji business phrasing ("يا هلا والله ومسهلا فيك يا غالي!", "أبد ما تشيل هم، نقدر نصمم لك النظام من الصفر بأحدث التقنيات السحابية", "تسليم الكود سورس والملكية 100% لك", "حياك بأي وقت نتواصل واتساب أو نسوي ميتنج زووم").

- **Levantine / Shami (الشامي - سوري/لبناني/أردني):**
  Use courteous, polite, clear Levantine tone ("أهلاً وسهلاً بحضرتك نورتنا", "تكرم عينك بنقدر نقدملك أفضل دراسة تقنية", "فيك تشاركنا التفاصيل وبنرسلك عرض سعر ومراحل تنفيذ دقيقة").

- **North African / Maghrebi (المغاربي):**
  Understand their terms (تطبيقات، سيت ويب، ديفلوبمون) and reply in a smooth, accessible, clear modern Arabic that resonates with them.

- **Modern Standard Arabic (الفصحى المؤسسية):**
  If the inquiry is formal or from an enterprise organization, use crisp, professional corporate Arabic with clear bullet points.

- **English (Global / Tech Startup):**
  Use crisp Silicon Valley tech-startup language. Clear value propositions, modern engineering stacks, and rapid execution timeframes.
`;

    const fullSystemInstruction = `${baseSystemPrompt}

${dialectDirectives}

## CURRENT VERIFIED KNOWLEDGE BASE:
${knowledgeBase}

## VERIFIED LIVE PORTFOLIO PROJECTS (ACTUAL WORK DONE BY ZALTREX):
${projectsSummary || "Various enterprise and SaaS platforms implemented with Next.js, Node.js, and Mobile."}

## CLIENT TESTIMONIALS & TRUST METRICS:
${testimonialsSummary || "Over 99.8% client satisfaction rate across Egypt and the Gulf."}

## CORE CONVERSATIONAL OBJECTIVES:
1. Provide accurate, helpful, and concise answers based on the knowledge base and projects above.
2. If the user asks about price, timelines, or services, share our realistic numbers (e.g. MVP starts $5k-$15k in 2-6 weeks, Enterprise ERP $15k-$35k+).
3. If the user is interested in starting a project, ask for their Project Scope, Name, and WhatsApp/Phone or Email so the engineering team can prepare a scoped proposal.
4. Provide the option to connect on WhatsApp: +20 100 123 4567.
`;

    // 6. Try Calling Google Gemini API
    // Priority: Database saved API Key -> Environment Variable (GEMINI_API_KEY / GOOGLE_API_KEY)
    const geminiKey =
      agentConfig?.geminiApiKey?.trim() ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY;

    if (geminiKey && !geminiKey.startsWith("re_mock")) {
      try {
        const contents = messages.map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: fullSystemInstruction }],
              },
              contents,
              generationConfig: {
                temperature: 0.75,
                maxOutputTokens: 1200,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I'm here to assist you! Could you please share more details about your project?";

          return NextResponse.json({
            reply: replyText,
            botName,
            detectedDialect,
            leadCaptured,
            provider: "gemini",
          });
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn("Gemini API call failed with status", response.status, errData);
        }
      } catch (apiError) {
        console.warn("Gemini API error, falling back to smart knowledge responder:", apiError);
      }
    }

    // 7. Multi-Dialect Smart Knowledge Fallback Engine
    // (Operates seamlessly when API key is not configured or in offline test mode)
    const reply = generateMultiDialectFallbackReply(
      lastUserMessage,
      detectedDialect,
      knowledgeBase,
      projects,
      botName,
      leadCaptured
    );

    return NextResponse.json({
      reply,
      botName,
      detectedDialect,
      leadCaptured,
      provider: "smart-knowledge-engine",
    });
  } catch (error: any) {
    console.error("Error in AI chat route:", error);
    return NextResponse.json(
      {
        reply:
          "أهلاً بك في Zaltrex! يسعدنا دائماً تواصلك معنا مباشرة عبر الواتساب على +20 100 123 4567 أو عبر صفحة اتصل بنا وسيقوم مهندسونا بالتواصل معك مباشرة.",
        leadCaptured: false,
      },
      { status: 200 }
    );
  }
}

// ----------------------------------------------------
// Dialect Detection Helper
// ----------------------------------------------------
function detectUserDialect(text: string, defaultTone: string): string {
  if (defaultTone !== "auto") return defaultTone;

  const lower = text.toLowerCase();
  const isArabic = /[\u0600-\u06FF]/.test(text);

  if (!isArabic) return "english";

  // Egyptian markers
  if (
    lower.includes("عايز") ||
    lower.includes("عاوز") ||
    lower.includes("ازيك") ||
    lower.includes("ازيكوا") ||
    lower.includes("كده") ||
    lower.includes("كدا") ||
    lower.includes("بكام") ||
    lower.includes("ايه") ||
    lower.includes("ليه") ||
    lower.includes("دلوقتي") ||
    lower.includes("عشان") ||
    lower.includes("شغالين") ||
    lower.includes("شاطر") ||
    lower.includes("فندم") ||
    lower.includes("باشا") ||
    lower.includes("حاجة")
  ) {
    return "egyptian";
  }

  // Gulf / Khaleeji markers
  if (
    lower.includes("ودي") ||
    lower.includes("ابي") ||
    lower.includes("أبي") ||
    lower.includes("أبغى") ||
    lower.includes("ابغى") ||
    lower.includes("شلون") ||
    lower.includes("شلونكم") ||
    lower.includes("كم يكلف") ||
    lower.includes("لاهنت") ||
    lower.includes("لا هنت") ||
    lower.includes("ارحب") ||
    lower.includes("يا هلا والله") ||
    lower.includes("وشو") ||
    lower.includes("وش رايكم") ||
    lower.includes("يسوي") ||
    lower.includes("نسوي") ||
    lower.includes("زين") ||
    lower.includes("وايد")
  ) {
    return "gulf";
  }

  // Levantine / Shami markers
  if (
    lower.includes("بدي") ||
    lower.includes("شو") ||
    lower.includes("قديش") ||
    lower.includes("كيفك") ||
    lower.includes("هيك") ||
    lower.includes("يعطيك العافية") ||
    lower.includes("كتير") ||
    lower.includes("عم نعمل") ||
    lower.includes("منيح")
  ) {
    return "levantine";
  }

  // Formal Arabic default for other Arabic inputs
  return "formal";
}

// ----------------------------------------------------
// Smart Multi-Dialect Fallback Engine
// ----------------------------------------------------
function generateMultiDialectFallbackReply(
  userText: string,
  dialect: string,
  knowledge: string,
  projects: any[],
  botName: string,
  leadCaptured: boolean
): string {
  const text = userText.toLowerCase();

  // If user provided contact info in this turn
  if (leadCaptured) {
    if (dialect === "egyptian") {
      return `تسلم يا فندم! سجلنا بيانات حضرتك فوراً في النظام. أحد مهندسينا ومسؤولي المشروعات في Zaltrex هيتواصل مع حضرتك هاتفياً أو عبر الواتساب في أقل من ساعتين لمناقشة التفاصيل وتحديد الخطوات الجاية. تحب تكلمنا على واتساب دلوقتي مباشرة (+20 100 123 4567)؟`;
    }
    if (dialect === "gulf") {
      return `يا هلا والله وتسلم يدك يا غالي! تم استلام بياناتك وتوثيقها بطلب رسمي عندنا. أحد كبار المهندسين التقنيين بـ Zaltrex بيتواصل معك عبر الواتساب أو اتصال مباشر خلال ساعتين كحد أقصى لترتيب تفاصيل المشروع وعرض العمل. وإذا ودك تواصل فوري حياك على الواتساب: +20 100 123 4567.`;
    }
    if (dialect === "levantine") {
      return `تكرم عينك! استلمنا بيانات حضرتك وسجلناها بالمشروع، ورح يتواصل معك أحد مهندسينا التقنيين خلال وقت قصير جداً لنرتب كل التفاصيل. فيك كمان تحاكينا مباشرة عبر الواتساب (+20 100 123 4567).`;
    }
    if (dialect === "formal") {
      return `شكراً جزيلاً لاهتمامكم بشركة Zaltrex. تم تسجيل بياناتكم بنجاح وسيتواصل معكم فريق الاستشارات الهندسية خلال ساعتين لمناقشة نطاق المشروع وتقديم المقترح الفني والمالي. يسعدنا أيضاً التواصل المباشر عبر الواتساب: +20 100 123 4567.`;
    }
    return `Thank you! We've captured your contact information securely. A senior technical architect from Zaltrex will reach out within 2 hours to discuss your project specifications and schedule a discovery call. You can also message us directly on WhatsApp at +20 100 123 4567.`;
  }

  // 1. Projects & Portfolio Question
  if (
    text.includes("project") ||
    text.includes("work") ||
    text.includes("portfolio") ||
    text.includes("مشاريع") ||
    text.includes("سابقة أعمال") ||
    text.includes("شغلكم") ||
    text.includes("عملتوا ايه") ||
    text.includes("نماذج")
  ) {
    const projectList = projects.slice(0, 3).map((p) => `• ${p.title} (${p.category}): ${p.description}`).join("\n");

    if (dialect === "egyptian") {
      return `يا هلا بيك! إحنا في Zaltrex نفذنا مشاريع وأنظمة متكاملة لعملاء في مصر والخليج، ومن أحدث أعمالنا:
${projectList || "• منصات SaaS مؤسسية وتطبيقات موبايل سريعة ومحمية."}

حابب تشوف نماذج معينة في مجال الـ E-Commerce، الـ ERP، أو تطبيقات الموبايل؟ وكمان نقدر نفتح لحضرتك ديمو حي!`;
    }

    if (dialect === "gulf") {
      return `يا هلا والله ومسهلا فيك! نفذنا بـ Zaltrex حلول برمجية ومنصات سحابية قوية بالسعودية والخليج ومصر، وأبرزها:
${projectList || "• منصات مؤسسية متقدمة وتطبيقات موبايل فائقة السرعة."}

إذا ودك تستعرض تفاصيل أي مشروع أو نجرب ديمو لايف، علمني وبخدمك فوراً!`;
    }

    return `At Zaltrex, our engineering track record spans enterprise systems, SaaS platforms, and mobile apps:
${projectList || "• Enterprise cloud fabrics, multi-tenant SaaS, and mission-critical portals."}
Would you like to explore a live demo or case study matching your industry?`;
  }

  // 2. Pricing & Budget Question
  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("budget") ||
    text.includes("سعر") ||
    text.includes("تكلفة") ||
    text.includes("بكام") ||
    text.includes("فلوس") ||
    text.includes("كم يكلف") ||
    text.includes("قديش")
  ) {
    if (dialect === "egyptian") {
      return `أهلاً بحضرتك يا فندم! التسعير عندنا في Zaltrex شفاف ومبني على مراحل الإنجاز (Milestones):
- باقات الـ MVP السريعة: تبدأ غالباً من 5,000$ إلى 15,000$ مع تسليم في 2-6 أسابيع.
- الأنظمة المؤسسية الكبيرة و ERP: تتراوح بين 15,000$ إلى 35,000$+ حسب التعقيد والـ Integrations.
والأهم إن الكود والملكية الفكرية بالكامل بتكون ملك لحضرتك 100%.
تحب تشاركني فكرة مشروعك ونديك تقدير دقيق في خلال دقايق؟`;
    }

    if (dialect === "gulf") {
      return `حياك الله يا غالي! التسعير عندنا بـ Zaltrex واضح ومقسم على دفعات مرتبطة بمراحل الإنجاز (Milestone-based):
- تطوير نموذج العمل الأولي (MVP): يبدأ غالباً من $5,000 إلى $15,000 (خلال 2 إلى 6 أسابيع).
- المنصات المؤسسية وأنظمة ERP المتكاملة: من $15,000 إلى $35,000+ حسب المعايير والربط السحابي.
والكود المصدري وكل حقوق الملكية تكون ملكك بالكامل.
شاركني فكرة مشروعك وأبشر بتقدير فني ومالي مفصل!`;
    }

    if (dialect === "levantine") {
      return `أهلاً بحضرتك! أسعارنا بتعتمد على مراحل التسليم ووضوح المواصفات:
- نماذج الـ MVP السريعة: بين 5,000$ و 15,000$ (تسليم خلال 2 - 6 أسابيع).
- الأنظمة والمنصات الكبيرة: من 15,000$ إلى 35,000$+ حسب الخدمات والربط السحابي.
مع ملكية كاملة 100% للكود لك.
حابب تشاركنا فكرة التطبيق أو الموقع لنعطيك تفصيل زمني وتكلفة دقيقة؟`;
    }

    return `At Zaltrex, our pricing is transparent and tied to deliverable milestones:
- Rapid MVP Development: Typically $5,000 - $15,000 (delivered in 2-6 weeks).
- Enterprise SaaS & Custom ERP: Typically $15,000 - $35,000+ depending on architecture.
- 100% IP & Code Ownership retained by you.
Would you like to share your project scope for a free technical breakdown?`;
  }

  // 3. Mobile App Development
  if (
    text.includes("mobile") ||
    text.includes("app") ||
    text.includes("تطبيق") ||
    text.includes("موبايل") ||
    text.includes("ابلكيشن") ||
    text.includes("أبلكيشن")
  ) {
    if (dialect === "egyptian") {
      return `طبعاً يا فندم! بنبني تطبيقات موبايل Native و Cross-Platform فائقة السرعة بـ Flutter و React Native لـ iOS و Android.
التطبيقات بتشمل مزامنة أوفلاين (Offline Sync)، إشعارات لحظية، بوابات دفع، وأمان عالي جداً.
التطبيق اللي في بالك موجه للجمهور والعملاء (B2C) ولا لإدارة الموظفين والشركات (B2B)؟`;
    }

    if (dialect === "gulf") {
      return `أبشر يا غالي! نبني تطبيقات جوال عالية الأداء بـ Flutter و React Native للآيفون والأندرويد بمواصفات عالمية، مع ربط بوابات الدفع (مدى، Apple Pay، وغيرها) ونظام إشعارات ذكي.
هل فكرة التطبيق متجر أو منصة خدمات أو نظام داخلي للشركة؟`;
    }

    return `Yes! We develop native-grade mobile apps for iOS & Android with Flutter and React Native. Includes biometric auth, Apple Pay / payment gateway integrations, and offline capabilities. Tell us about your app concept!`;
  }

  // 4. WhatsApp & Direct Contact
  if (
    text.includes("whatsapp") ||
    text.includes("call") ||
    text.includes("contact") ||
    text.includes("واتساب") ||
    text.includes("تواصل") ||
    text.includes("تليفون") ||
    text.includes("رقم") ||
    text.includes("كلمنا")
  ) {
    if (dialect === "egyptian") {
      return `يشرفنا جداً تواصلك المباشر معانا!
• واتساب فوري: +20 100 123 4567
• إيميل: contact@zaltrex.cloud
تقدر كمان تسيب اسمك ورقم تليفونك هنا في الشات وهنكلمك خلال ساعتين بالظبط!`;
    }

    if (dialect === "gulf") {
      return `يا هلا والله ويسعدنا تواصلك بأي لحظة:
• واتساب مباشر: +20 100 123 4567
• بريد رسمي: contact@zaltrex.cloud
أو اترك اسمك ورقمك هنا وأبشر بتواصل سريع من كبار مهندسينا!`;
    }

    return `We'd love to connect directly!
- Direct WhatsApp: +20 100 123 4567
- Email: contact@zaltrex.cloud
Or drop your contact number right here, and we'll reach out within 2 hours!`;
  }

  // General Welcome / Fallback
  if (dialect === "egyptian") {
    return `يا هلا بحضرتك في Zaltrex! أنا المستشار التقني الذكي، موجود هنا لمساعدتك في أي سؤال يخص تطوير المواقع، تطبيقات الموبايل، الأنظمة السحابية أو تكاليف المشاريع.
قولي فكرة مشروعك إيه وندردش فيها سوا؟`;
  }

  if (dialect === "gulf") {
    return `يا هلا ومسهلا فيك بـ Zaltrex! أنا مستشارك التقني الذكي، يسعدني أخدمك في كل ما يتعلق ببناء المنصات السحابية، تطبيقات الجوال، أو تقدير تكاليف وتفاصيل مشروعك.
وش نوع المشروع اللي تفكر فيه حالياً؟`;
  }

  if (dialect === "levantine") {
    return `أهلاً وسهلاً بحضرتك في Zaltrex! أنا مستشارك التقني، موجود لمساعدتك بأي استفسار عن خدماتنا البرمجية، المواقع والتطبيقات وتقديرات التكلفة.
كيف بقدر ساعدك بمشروعك اليوم؟`;
  }

  if (dialect === "formal") {
    return `أهلاً ومرحباً بكم في Zaltrex لحلول التحول الرقمي والبرمجيات المؤسسية. أنا المستشار التقني الذكي، مستعد للإجابة على استفساراتكم بشأن خدماتنا السحابية وتطبيقات الويب والموبايل. كيف يمكننا خدمة مشروعكم اليوم؟`;
  }

  return `Welcome to Zaltrex IT Solutions! I'm ${botName}. I can provide details on our software engineering services, pricing models, tech stacks, or help you schedule a scoping call. What are you looking to build?`;
}
