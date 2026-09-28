import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@zaltrex.cloud";
  const rawPassword = process.env.ADMIN_PASSWORD || "adminpassword123";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "ADMIN",
      password: hashedPassword,
    },
    create: {
      name: "Zaltrex System Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✔ Admin created/verified: ${admin.email} (Role: ${admin.role})`);

  // 2. Seed Portfolio Projects
  const projectsData = [
    {
      title: "Modular Full-Stack Enterprise Package",
      description:
        "Complete multi-tier enterprise architecture. Features autonomous microservice mesh, synchronized telemetry, automated data pipelines, and executive dashboards.",
      imageUrl: "/Max_a_هات_الباكدج_مفصلة.png",
      category: "Architecture",
      tags: "Rust, eBPF, Raft, WASM",
      featured: true,
      order: 1,
    },
    {
      title: "Zaltrex Cloud Mesh & Global Infrastructure",
      description:
        "Ultra-resilient multi-region cloud topology with dynamic load rebalancing, container orchestration, and real-time failover mechanisms.",
      imageUrl: "/Max_a_عندنا_شركة_it_اسمها_.png",
      category: "Infrastructure",
      tags: "Kubernetes, mTLS, Zero-Trust",
      featured: true,
      order: 2,
    },
    {
      title: "AI Copilot & Systems Identity",
      description:
        "Integrated generative and predictive inference models running directly on customer edge clusters with zero telemetry leakage.",
      imageUrl: "/gemini-3.1-flash-lite-image (nano-banana-2-lite)_b_حلو_اوي_اللوجو_و_الك.jpeg",
      category: "Intelligence",
      tags: "LLM, Vector DB, Real-Time Inference",
      featured: true,
      order: 3,
    },
  ];

  for (const proj of projectsData) {
    const existing = await prisma.project.findFirst({
      where: { title: proj.title },
    });
    if (!existing) {
      await prisma.project.create({ data: proj });
    }
  }
  console.log("✔ Portfolio projects seeded.");

  // 3. Seed Sample Customer Requests
  const requestsData = [
    {
      name: "Tariq Al-Mansoor",
      email: "tariq@fintech-dubai.ae",
      projectDetails:
        "We need a sovereign high-frequency transaction mesh with <5ms cross-region latency for our digital banking infrastructure.",
      budget: "$50,000 - $100,000",
      status: "PENDING",
    },
    {
      name: "Sarah Jenkins",
      email: "s.jenkins@omni-health.co.uk",
      projectDetails:
        "Migrating legacy health diagnostics pipelines to an autonomous private cluster compliant with NHS and GDPR standards.",
      budget: "$100,000+",
      status: "CONTACTED",
    },
  ];

  for (const req of requestsData) {
    const existing = await prisma.request.findFirst({
      where: { email: req.email },
    });
    if (!existing) {
      await prisma.request.create({ data: req });
    }
  }
  console.log("✔ Sample customer requests seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
