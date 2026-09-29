import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  email: z
    .string()
    .email({ message: "Please provide a valid email address." }),
  phone: z.string().optional(),
  service: z.string().optional(),
  projectDetails: z
    .string()
    .min(10, { message: "Project details must be at least 10 characters." })
    .max(5000, { message: "Project details cannot exceed 5000 characters." }),
  budget: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
