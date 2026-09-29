import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import HeroSection from "@/components/sections/HeroSection";
import TechMarquee from "@/components/sections/TechMarquee";
import ServicesPreview from "@/components/sections/ServicesPreview";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import LatestBlogPosts from "@/components/sections/LatestBlogPosts";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [featuredProjects, recentPosts] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      take: 3,
    }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  // Fallback to latest projects if none marked featured
  const displayProjects =
    featuredProjects.length > 0
      ? featuredProjects
      : await prisma.project.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
        });

  return (
    <>
      {/* Background Interactive Ambient Effects */}
      <BackgroundEffects />

      {/* Main Glassmorphic Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-grow z-20">
        <HeroSection />
        <TechMarquee />
        <ServicesPreview />
        <FeaturedProjects projects={displayProjects as any} />
        <WhyChooseUs />
        <LatestBlogPosts posts={recentPosts as any} />
        <ConsultationCTA />
      </main>

      {/* Main Footer */}
      <Footer />
    </>
  );
}
