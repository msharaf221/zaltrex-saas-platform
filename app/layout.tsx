import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "../components/audio/SoundContext";
import { ToastProvider } from "../components/ui/ToastContext";
import AiChatWrapper from "../components/chat/AiChatWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ZALTREX — Next-Gen Distributed Cloud & Autonomous Systems",
  description:
    "Stop assembling fragmented cloud tools. Zaltrex orchestrates distributed microservice fabrics, real-time AI telemetry, and sub-millisecond data paths in one unified sovereign platform.",
  icons: {
    icon: "/Max_a_هات_لوجو_صغير.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth dark ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="selection:bg-cyan-500/30 selection:text-cyan-200 antialiased relative min-h-screen flex flex-col bg-obsidian-950 text-slate-100 overflow-x-hidden font-sans">
        <SoundProvider>
          <ToastProvider>
            {children}
            <AiChatWrapper />
          </ToastProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
