"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, CircleHelp, LoaderCircle, ShieldAlert } from "lucide-react";

type Result = { status: "MATCH" | "MISMATCH" | "PENDING" | "UNAVAILABLE"; reference?: string; recordedHash?: string; calculatedHash?: string; commitmentStatus?: string; tamperedCopy?: boolean; error?: string };

export function VerificationPanel({ initialReference = "VL-DEMO-001" }: { initialReference?: string }) {
  const [reference, setReference] = useState(initialReference);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [tamper, setTamper] = useState(false);

  async function verify(useTamper = false) {
    setBusy(true);
    setTamper(useTamper);
    try {
      const params = new URLSearchParams({ reference: reference.trim() });
      if (useTamper) params.set("tamper", "TAMPERED DEMONSTRATION COPY. The published record was not changed.");
      const response = await fetch(`/api/verify?${params}`);
      setResult(await response.json());
    } catch {
      setResult({ status: "UNAVAILABLE", error: "Could not reach the verification service." });
    } finally {
      setBusy(false);
    }
  }

  const resultClass = result?.status === "MATCH" ? "result-match" : result?.status === "MISMATCH" ? "result-mismatch" : "result-pending";
  const ResultIcon = result?.status === "MATCH" ? CheckCircle2 : result?.status === "MISMATCH" ? ShieldAlert : result?.status === "PENDING" ? CircleHelp : AlertTriangle;

  return (
    <div className="verification-layout">
      <div className="verify-controls">
        <label htmlFor="verify-reference">Report reference</label>
        <div className="verify-input"><input id="verify-reference" value={reference} onChange={(event) => setReference(event.target.value)} placeholder="VL-DEMO-001" onKeyDown={(event) => { if (event.key === "Enter") void verify(); }} /><button type="button" className="button button-dark" onClick={() => void verify()} disabled={busy || !reference.trim()}>{busy ? <LoaderCircle className="spin" size={16} /> : null}Verify record</button></div>
        <div className="demo-callout"><strong>Try a controlled tampering demo</strong><p>This changes only a copy in your browser request. The saved record is untouched.</p><button type="button" className="text-button" onClick={() => void verify(true)} disabled={busy || !reference.trim()}>Modify copy and compare <span>→</span></button></div>
        <p className="small-muted">Try sample references: VL-DEMO-001, VL-DEMO-002, VL-DEMO-003</p>
      </div>
      <div className="verification-result" aria-live="polite">
        {result ? <>
          <div className={`result-banner ${resultClass}`}><ResultIcon size={22} /><div><strong>{result.status}</strong><span>{result.error ?? (result.tamperedCopy ? "Changed copy does not match the stored hash." : "Calculated hash compared with the recorded hash.")}</span></div></div>
          {result.recordedHash && <div className="hash-list"><div><span>Stored commitment</span><code>{result.recordedHash}</code></div><div><span>{tamper ? "Tampered copy hash" : "Calculated hash"}</span><code>{result.calculatedHash}</code></div></div>}
          {result.reference && <div className="result-meta"><span>{result.reference}</span><span>Bitcoin status: {result.commitmentStatus === "Simulated" ? "SIMULATED · NOT ON-CHAIN" : result.commitmentStatus?.toUpperCase()}</span></div>}
        </> : <div className="result-empty"><span className="result-icon"><ShieldAlert size={22} /></span><strong>Verification result</strong><p>Enter a report reference to compare its current canonical hash with the stored hash.</p></div>}
        <p className="integrity-note">A match indicates that these canonical fields have not changed since this demo record was hashed. It does not prove the report is true.</p>
      </div>
    </div>
  );
}