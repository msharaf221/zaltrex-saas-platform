"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// Helper: Ensure the caller is an authenticated ADMIN
async function verifyAdmin() {
  const session = await auth();
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin privileges required.");
  }
  return session;
}

// ----------------------------------------------------
// CLIENT REQUESTS (INQUIRIES)
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
// ADMIN USERS MANAGEMENT
// ----------------------------------------------------
export interface CreateAdminInput {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER";
}

export async function createAdminUser(data: CreateAdminInput) {
  try {
    await verifyAdmin();

    const email = data.email.toLowerCase().trim();
    if (!email || !data.password) {
      return { success: false, error: "البريد الإلكتروني وكلمة المرور مطلوبان." };
    }

    if (data.password.length < 6) {
      return { success: false, error: "كلمة المرور يجب أن لا تقل عن 6 أحرف." };
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return { success: false, error: "هذا البريد الإلكتروني مسجل بالفعل لمستخدم آخر." };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: data.name?.trim() || "Admin Member",
        email,
        password: hashedPassword,
        role: data.role || "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    revalidatePath("/admin");
    return { success: true, user: newUser };
  } catch (error: any) {
    console.error("Error creating admin user:", error);
    return { success: false, error: error.message || "Failed to create admin user." };
  }
}

export async function deleteAdminUser(id: string) {
  try {
    const session = await verifyAdmin();

    const targetUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return { success: false, error: "المستخدم غير موجود." };
    }

    // Protect primary super admin
    if (targetUser.email.toLowerCase() === "muhamedhussein1105@gmail.com") {
      return { success: false, error: "لا يمكن حذف حساب المسؤول الأساسي للموقع." };
    }

    // Protect current logged in user from deleting themselves
    const currentUserId = (session.user as { id?: string })?.id;
    const currentUserEmail = (session.user as { email?: string })?.email?.toLowerCase();
    if (targetUser.id === currentUserId || targetUser.email.toLowerCase() === currentUserEmail) {
      return { success: false, error: "لا يمكنك حذف حسابك الحالي أثناء تسجيل الدخول منه." };
    }

    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting admin user:", error);
    return { success: false, error: error.message || "Failed to delete admin." };
  }
}

export async function updateAdminPassword(id: string, newPassword: string) {
  try {
    await verifyAdmin();

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: "كلمة المرور يجب أن لا تقل عن 6 أحرف." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating admin password:", error);
    return { success: false, error: error.message || "Failed to update password." };
  }
}

export async function updateAdminRole(id: string, role: "ADMIN" | "USER") {
  try {
    await verifyAdmin();

    const target = await prisma.user.findUnique({ where: { id } });
    if (target?.email.toLowerCase() === "muhamedhussein1105@gmail.com" && role !== "ADMIN") {
      return { success: false, error: "لا يمكن تغيير رتبة المسؤول الأساسي." };
    }

    await prisma.user.update({
      where: { id },
      data: { role },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating admin role:", error);
    return { success: false, error: error.message || "Failed to update role." };
  }
}
