import { Fingerprint } from "lucide-react";
import { VerificationPanel } from "@/components/verification-panel";

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const params = await searchParams;
  return <main className="page-wrap content-page"><div className="eyebrow eyebrow-dark"><Fingerprint size={14} /> RECORD INTEGRITY</div><h1 className="page-title">Verify a record</h1><p className="page-intro">Recalculate a report fingerprint and compare it with the recorded SHA-256 hash.</p><div className="verify-panel"><VerificationPanel initialReference={params.reference ?? "VL-DEMO-001"} /></div><div className="explain-strip"><div><strong>01 / Canonicalize</strong><p>Report fields are serialized in a fixed order.</p></div><div><strong>02 / Hash</strong><p>SHA-256 creates a fingerprint from those fields.</p></div><div><strong>03 / Compare</strong><p>A match checks integrity, not the truth of the report.</p></div></div></main>;
}