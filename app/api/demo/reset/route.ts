import { NextResponse } from "next/server";
import { resetDemoData } from "@/lib/data";
import { isSameOriginRequest } from "@/lib/security/origin";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request) || request.headers.get("x-demo-reset") !== "confirm") {
    return NextResponse.json({ error: "Demo reset request was not accepted." }, { status: 403 });
  }
  resetDemoData();
  return NextResponse.json({ mode: "DEMO", message: "Demonstration data reset." });
}