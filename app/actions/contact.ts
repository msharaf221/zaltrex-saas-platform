"use server";

import prisma from "@/lib/prisma";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import { Resend } from "resend";

export async function submitContactRequest(formData: ContactFormData) {
  try {
    const validated = contactSchema.safeParse(formData);

    if (!validated.success) {
      const fieldErrors = validated.error.flatten().fieldErrors;
      return {
        success: false,
        error: "Validation failed. Please verify your inputs.",
        fieldErrors,
      };
    }

    const { name, email, projectDetails, budget } = validated.data;

    // 1. Save Request to Database
    const newRequest = await prisma.request.create({
      data: {
        name,
        email,
        projectDetails,
        budget: budget ?? "Unspecified",
        status: "PENDING",
      },
    });

    // 2. Send Email Notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "admin@zaltrex.cloud";

    if (resendApiKey && !resendApiKey.startsWith("re_mock")) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Zaltrex Cloud Intelligence <onboarding@resend.dev>",
          to: adminEmail,
          subject: `⚡ [NEW ENTERPRISE REQUEST] - ${name} (${budget ?? "General"})`,
          html: `
            <div style="background-color: #090d16; color: #f1f5f9; padding: 32px; font-family: 'JetBrains Mono', monospace; border-radius: 12px; border: 1px solid #1e2d4f;">
              <h2 style="color: #38bdf8; margin-top: 0; font-size: 22px;">⚡ New Enterprise Project Request</h2>
              <p style="color: #94a3b8; font-size: 13px;">A new request has been submitted from the sovereign platform landing page.</p>
              
              <hr style="border: 0; border-top: 1px solid #1e2d4f; margin: 24px 0;" />
              
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="color: #64748b; padding: 8px 0; width: 140px;">Client Name:</td>
                  <td style="color: #ffffff; font-weight: bold; padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 8px 0;">Client Email:</td>
                  <td style="color: #38bdf8; padding: 8px 0;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 8px 0;">Estimated Budget:</td>
                  <td style="color: #2dd4bf; padding: 8px 0; font-weight: bold;">${budget ?? "Unspecified"}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 8px 0;">Tracking ID:</td>
                  <td style="color: #a855f7; padding: 8px 0;">${newRequest.id}</td>
                </tr>
              </table>

              <div style="margin-top: 24px; padding: 16px; background-color: #05070d; border-radius: 8px; border: 1px solid #17223c;">
                <div style="color: #64748b; font-size: 12px; margin-bottom: 8px; text-transform: uppercase;">Project Specification:</div>
                <div style="color: #cbd5e1; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${projectDetails}</div>
              </div>

              <div style="margin-top: 32px; font-size: 11px; color: #475569; border-top: 1px solid #1e2d4f; padding-top: 16px;">
                Zaltrex Autonomous Mesh • Real-Time Telemetry Dispatch • Timestamp: ${new Date().toISOString()}
              </div>
            </div>
          `,
        });
        console.log(`✔ Resend email dispatched to ${adminEmail} for request: ${newRequest.id}`);
      } catch (emailErr) {
        console.warn("Resend email dispatch warning (handled gracefully):", emailErr);
      }
    } else {
      console.log(
        `[DEV MODE] Simulated Resend email to ${adminEmail} for ${name} (${email}): ${newRequest.id}`
      );
    }

    return {
      success: true,
      message: "Request successfully dispatched to Zaltrex engineering leadership.",
      requestId: newRequest.id,
    };
  } catch (error) {
    console.error("Error submitting contact request:", error);
    return {
      success: false,
      error: "An unexpected error occurred while processing your request. Please try again.",
    };
  }
}
