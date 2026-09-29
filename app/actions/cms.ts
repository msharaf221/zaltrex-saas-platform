"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Helper: Ensure the caller is an authenticated ADMIN
async function verifyAdmin() {
  const session = await auth();
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin privileges required.");
  }
}

// ----------------------------------------------------
// PROJECT ACTIONS
// ----------------------------------------------------
export interface ProjectInput {
  title: string;
  slug?: string;
  category: string;
  description: string;
  content?: string;
  imageUrl: string;
  tags?: string;
  client?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export async function createProject(data: ProjectInput) {
  try {
    await verifyAdmin();

    const slug =
      data.slug?.trim() ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
        "-" +
        Date.now().toString(36);

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug,
        category: data.category || "Web & Cloud Solutions",
        description: data.description,
        content: data.content || null,
        imageUrl: data.imageUrl || "/Max_a_هات_الباكدج_مفصلة.png",
        tags: data.tags || null,
        client: data.client || null,
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        featured: Boolean(data.featured),
      },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin");
    return { success: true, project };
  } catch (error: any) {
    console.error("Error creating project:", error);
    return { success: false, error: error.message || "Failed to create project." };
  }
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  try {
    await verifyAdmin();

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
        content: data.content,
        imageUrl: data.imageUrl,
        tags: data.tags,
        client: data.client,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        featured: data.featured,
      },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.id}`);
    if (project.slug) revalidatePath(`/projects/${project.slug}`);
    revalidatePath("/admin");
    return { success: true, project };
  } catch (error: any) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message || "Failed to update project." };
  }
}

export async function deleteProject(id: string) {
  try {
    await verifyAdmin();

    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message || "Failed to delete project." };
  }
}

export async function toggleProjectFeatured(id: string, featured: boolean) {
  try {
    await verifyAdmin();

    await prisma.project.update({
      where: { id },
      data: { featured },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ----------------------------------------------------
// BLOG POST ACTIONS
// ----------------------------------------------------
export interface PostInput {
  title: string;
  slug?: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: string;
  readTime?: string;
  published?: boolean;
}

export async function createPost(data: PostInput) {
  try {
    await verifyAdmin();

    const slug =
      data.slug?.trim() ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
        "-" +
        Date.now().toString(36);

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug,
        category: data.category || "Technology",
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || "/Max_a_عندنا_شركة_it_اسمها_.png",
        author: data.author || "Zaltrex Team",
        readTime: data.readTime || "4 min read",
        published: data.published ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: true, post };
  } catch (error: any) {
    console.error("Error creating post:", error);
    return { success: false, error: error.message || "Failed to create post." };
  }
}

export async function updatePost(id: string, data: Partial<PostInput>) {
  try {
    await verifyAdmin();

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        author: data.author,
        readTime: data.readTime,
        published: data.published,
      },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin");
    return { success: true, post };
  } catch (error: any) {
    console.error("Error updating post:", error);
    return { success: false, error: error.message || "Failed to update post." };
  }
}

export async function deletePost(id: string) {
  try {
    await verifyAdmin();

    await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return { success: false, error: error.message || "Failed to delete post." };
  }
}

export async function togglePostPublished(id: string, published: boolean) {
  try {
    await verifyAdmin();

    await prisma.post.update({
      where: { id },
      data: { published },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ----------------------------------------------------
// INQUIRY ACTIONS
// ----------------------------------------------------
export async function updateRequestStatus(id: string, status: string) {
  try {
    await verifyAdmin();

    await prisma.request.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating request status:", error);
    return { success: false, error: error.message || "Failed to update status." };
  }
}

export async function deleteRequest(id: string) {
  try {
    await verifyAdmin();

    await prisma.request.delete({
      where: { id },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting request:", error);
    return { success: false, error: error.message || "Failed to delete request." };
  }
}

// ----------------------------------------------------
// AI AGENT CONFIGURATION ACTIONS
// ----------------------------------------------------
export interface AgentConfigInput {
  botName: string;
  welcomeMessage: string;
  systemPrompt: string;
  knowledgeBase: string;
  modelName?: string;
  geminiApiKey?: string | null;
  defaultTone?: string;
  isActive?: boolean;
}

export async function updateAgentConfig(data: AgentConfigInput) {
  try {
    await verifyAdmin();

    const config = await prisma.agentConfig.upsert({
      where: { id: "default_config" },
      update: {
        botName: data.botName,
        welcomeMessage: data.welcomeMessage,
        systemPrompt: data.systemPrompt,
        knowledgeBase: data.knowledgeBase,
        modelName: data.modelName || "gemini-2.5-flash",
        geminiApiKey: data.geminiApiKey,
        defaultTone: data.defaultTone || "auto",
        isActive: data.isActive ?? true,
      },
      create: {
        id: "default_config",
        botName: data.botName,
        welcomeMessage: data.welcomeMessage,
        systemPrompt: data.systemPrompt,
        knowledgeBase: data.knowledgeBase,
        modelName: data.modelName || "gemini-2.5-flash",
        geminiApiKey: data.geminiApiKey,
        defaultTone: data.defaultTone || "auto",
        isActive: data.isActive ?? true,
      },
    });

    revalidatePath("/admin");
    return { success: true, config };
  } catch (error: any) {
    console.error("Error updating agent config:", error);
    return { success: false, error: error.message || "Failed to update AI Agent config." };
  }
}

// ----------------------------------------------------
// TESTIMONIAL ACTIONS
// ----------------------------------------------------
export interface TestimonialInput {
  clientName: string;
  clientRole: string;
  company: string;
  feedback: string;
  rating?: number;
  avatarUrl?: string;
  featured?: boolean;
}

export async function createTestimonial(data: TestimonialInput) {
  try {
    await verifyAdmin();

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName: data.clientName,
        clientRole: data.clientRole,
        company: data.company,
        feedback: data.feedback,
        rating: data.rating ?? 5,
        avatarUrl: data.avatarUrl || "/Zpfp.png",
        featured: data.featured ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, testimonial };
  } catch (error: any) {
    console.error("Error creating testimonial:", error);
    return { success: false, error: error.message || "Failed to create testimonial." };
  }
}

export async function updateTestimonial(id: string, data: Partial<TestimonialInput>) {
  try {
    await verifyAdmin();

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        clientName: data.clientName,
        clientRole: data.clientRole,
        company: data.company,
        feedback: data.feedback,
        rating: data.rating,
        avatarUrl: data.avatarUrl,
        featured: data.featured,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, testimonial };
  } catch (error: any) {
    console.error("Error updating testimonial:", error);
    return { success: false, error: error.message || "Failed to update testimonial." };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await verifyAdmin();

    await prisma.testimonial.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting testimonial:", error);
    return { success: false, error: error.message || "Failed to delete testimonial." };
  }
}

