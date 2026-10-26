import { z } from "zod";

export const reportInputSchema = z.object({
  state: z.string().trim().min(2, "Choose a state.").max(60),
  lga: z.string().trim().min(2, "Enter a local government area.").max(80),
  pollingUnit: z.string().trim().max(80).optional().default(""),
  category: z.enum(["Accessibility", "Queue observation", "Materials", "Process", "Other"]),
  description: z.string().trim().min(20, "Add at least 20 characters of detail.").max(1200),
  referenceNote: z.string().trim().max(100, "Keep the reference under 100 characters.").optional().default(""),
});

export const verificationSchema = z.object({
  reference: z.string().trim().min(1).max(40),
  descriptionOverride: z.string().max(1200).optional(),
});

export type ReportInput = z.infer<typeof reportInputSchema>;