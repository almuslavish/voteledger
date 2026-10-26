import { NextResponse } from "next/server";
import { addReport, listReports } from "@/lib/data";
import { isSameOriginRequest } from "@/lib/security/origin";
import { reportInputSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ reports: listReports(), dataMode: "DEMO" });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  const body: unknown = await request.json().catch(() => null);
  const parsed = reportInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the report fields and try again.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  return NextResponse.json({ report: addReport(parsed.data), dataMode: "DEMO" }, { status: 201 });
}