"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateRequestStatus(id: string, status: string) {
  try {
    await prisma.request.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating request status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

export async function deleteRequest(id: string) {
  try {
    await prisma.request.delete({
      where: { id },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting request:", error);
    return { success: false, error: "Failed to delete request." };
  }
}
