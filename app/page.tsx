"use client";

import React, { useState, useEffect } from "react";
import BackgroundEffects from "../components/ui/BackgroundEffects";
import CommandPalette from "../components/ui/CommandPalette";
import BlueprintModal from "../components/ui/BlueprintModal";
import TelemetryBar from "../components/layout/TelemetryBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import TechMarquee from "../components/sections/TechMarquee";
import KeyMetrics from "../components/sections/KeyMetrics";
import DeveloperConsole from "../components/sections/DeveloperConsole";
import PortfolioSection from "../components/sections/PortfolioSection";
import BenchmarkSimulator from "../components/sections/BenchmarkSimulator";
import ContactSection from "../components/sections/ContactSection";
import CallToAction from "../components/sections/CallToAction";

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    imgSrc: string;
    title: string;
    desc: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
        setModalData(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Background Interactive Canvases & Grids */}
      <BackgroundEffects />

      {/* Top Telemetry & Status Bar */}
      <TelemetryBar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Glassmorphism Header */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-grow z-20">
        <HeroSection />
        <TechMarquee />
        <KeyMetrics />
        <DeveloperConsole />
        <PortfolioSection onOpenModal={(data) => setModalData(data)} />
        <BenchmarkSimulator />
        <ContactSection />
        <CallToAction />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <BlueprintModal
        isOpen={modalData !== null}
        data={modalData}
        onClose={() => setModalData(null)}
      />
    </>
  );
}
