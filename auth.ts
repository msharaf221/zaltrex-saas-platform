import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        let user = await prisma.user.findUnique({
          where: { email },
        });

        // Auto-provision initial admin on fresh database deployments
        const defaultAdminEmail = (process.env.ADMIN_EMAIL || "muhamedhussein1105@gmail.com").toLowerCase().trim();
        const defaultAdminPass = process.env.ADMIN_PASSWORD || "Muhamed@3512139M";

        if (!user && email === defaultAdminEmail && password === defaultAdminPass) {
          try {
            const hashedPassword = await bcrypt.hash(defaultAdminPass, 10);
            user = await prisma.user.create({
              data: {
                name: "Muhamed Hussein (Primary Admin)",
                email: defaultAdminEmail,
                password: hashedPassword,
                role: "ADMIN",
              },
            });
          } catch (createErr) {
            console.warn("Auto-provision admin error:", createErr);
          }
        }

        if (!user || user.role !== "ADMIN") {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name ?? "System Administrator",
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as unknown as { role?: string }).role = token.role as string;
        (session.user as unknown as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "zaltrex-enterprise-super-secret-key-prod-omega-2026",
  trustHost: true,
});
