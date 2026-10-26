import { NextResponse } from "next/server";
import { getReport } from "@/lib/data";
import { hashReport } from "@/lib/hash";
import { verificationSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = verificationSchema.safeParse({
    reference: url.searchParams.get("reference") ?? "",
    descriptionOverride: url.searchParams.get("tamper") ?? undefined,
  });
  if (!parsed.success) return NextResponse.json({ status: "UNAVAILABLE", error: "Enter a valid report reference." }, { status: 400 });

  const report = getReport(parsed.data.reference);
  if (!report) return NextResponse.json({ status: "UNAVAILABLE", error: "No report was found for that reference." }, { status: 404 });

  const calculatedHash = hashReport({
    ...report,
    description: parsed.data.descriptionOverride ?? report.description,
  });
  return NextResponse.json({
    status: calculatedHash === report.hash ? "MATCH" : "MISMATCH",
    reference: report.reference,
    recordedHash: report.hash,
    calculatedHash,
    commitmentStatus: report.commitmentStatus,
    tamperedCopy: parsed.data.descriptionOverride !== undefined,
  });
}