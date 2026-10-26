import { NextResponse } from "next/server";
import { getCampaign, recordSimulatedContribution } from "@/lib/data";
import { isSameOriginRequest } from "@/lib/security/origin";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  const body = await request.json().catch(() => null) as { campaignId?: unknown } | null;
  if (!body || typeof body.campaignId !== "string" || !getCampaign(body.campaignId)) {
    return NextResponse.json({ error: "Choose an available demonstration campaign." }, { status: 400 });
  }
  recordSimulatedContribution();
  return NextResponse.json({
    mode: "SIMULATION",
    message: "Demo interaction recorded. No invoice was created and no Bitcoin was sent.",
  });
}