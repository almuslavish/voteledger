"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

export function ResetDemoButton() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function reset() {
    if (!window.confirm("Reset all in-memory demonstration reports and simulated interactions?")) return;
    setBusy(true);
    const response = await fetch("/api/demo/reset", { method: "POST", headers: { "x-demo-reset": "confirm" } });
    setMessage(response.ok ? "Demo data reset." : "Reset request was not accepted.");
    setBusy(false);
    if (response.ok) window.location.reload();
  }

  return <div className="reset-control"><button type="button" className="button button-outline" onClick={() => void reset()} disabled={busy}><RotateCcw size={15} />{busy ? "Resetting…" : "Reset demo data"}</button>{message && <span role="status">{message}</span>}</div>;
}