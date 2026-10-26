"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Copy, LoaderCircle, Zap } from "lucide-react";

export function ContributionFlow({ campaignId }: { campaignId: string }) {
  const [mode, setMode] = useState<"demo" | "real">("demo");
  const [amount, setAmount] = useState(1000);
  const [paid, setPaid] = useState(false);
  const [busy, setBusy] = useState(false);

  async function simulate() {
    setBusy(true);
    try {
      const response = await fetch("/api/contributions/simulate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ campaignId }) });
      if (response.ok) setPaid(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="payment-panel">
      <div className="mode-toggle" role="group" aria-label="Payment mode">
        <button type="button" className={mode === "demo" ? "mode-active" : ""} onClick={() => setMode("demo")}>Demonstration</button>
        <button type="button" className={mode === "real" ? "mode-active" : ""} onClick={() => setMode("real")}>Real integration</button>
      </div>
      {mode === "real" ? <div className="provider-empty"><AlertCircle size={20} /><div><strong>Provider not configured</strong><p>No Lightning provider credentials or webhook verification are configured in this prototype. No real invoice can be created here.</p></div></div> : paid ? <div className="payment-success"><CheckCircle2 size={24} /><div><strong>Simulation complete</strong><p>No Lightning invoice was created and no Bitcoin was sent. This interaction is not counted as a confirmed contribution.</p><button className="text-button" onClick={() => setPaid(false)}>Run demo again</button></div></div> : <>
        <div className="simulation-banner"><Zap size={16} /><strong>SIMULATION — NO REAL BITCOIN PAYMENT</strong></div>
        <label className="amount-field">Illustrative amount <span><input type="number" min={100} max={100000} step={100} value={amount} onChange={(event) => setAmount(Number(event.target.value))} /> sats</span></label>
        <div className="mock-invoice"><div className="invoice-label"><span>Mock invoice representation</span><Copy size={15} /></div><code>DEMO ONLY · {campaignId.toUpperCase()} · {amount.toLocaleString()} SATS</code><small>This is not a BOLT11 invoice and cannot be paid.</small></div>
        <button type="button" className="button button-green full-button" onClick={() => void simulate()} disabled={busy}>{busy ? <LoaderCircle className="spin" size={16} /> : <Zap size={16} />}Demonstrate simulated flow</button>
        <p className="payment-footnote">No invoice, payment, transaction ID, or confirmed contribution is generated.</p>
      </>}
    </div>
  );
}