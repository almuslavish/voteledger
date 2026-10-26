import { createHash } from "node:crypto";
import type { Report } from "@/lib/types";

export type CanonicalReport = Pick<Report, "reference" | "state" | "lga" | "pollingUnit" | "category" | "description" | "referenceNote" | "submittedAt">;

export function canonicalReport(report: CanonicalReport): string {
  return JSON.stringify({
    reference: report.reference,
    state: report.state,
    lga: report.lga,
    pollingUnit: report.pollingUnit ?? "",
    category: report.category,
    description: report.description,
    referenceNote: report.referenceNote ?? "",
    submittedAt: report.submittedAt,
  });
}

export function hashReport(report: CanonicalReport): string {
  return createHash("sha256").update(canonicalReport(report), "utf8").digest("hex");
}