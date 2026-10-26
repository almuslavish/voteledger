"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

const states = ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Federal Capital Territory", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"];

export function ReportForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [reportId, setReportId] = useState("");

  async function submit(formData: FormData) {
    setPending(true);
    setError("");
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/reports", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to submit this report.");
      setReference(result.report.reference);
      setReportId(result.report.id);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "A network error prevented submission.");
    } finally {
      setPending(false);
    }
  }

  if (reference) return <div className="success-panel"><CheckCircle2 size={24} /><div><h2>Report recorded</h2><p>Reference: <strong>{reference}</strong></p><Link href={`/reports/${reportId}`} className="text-button">View report and hash →</Link></div></div>;

  return (
    <form className="report-form" action={submit}>
      <div className="form-note"><AlertCircle size={17} /><p>Demo submission only. This prototype simulates observer authorization; it is not official accreditation. Do not include names, phone numbers, or confidential evidence.</p></div>
      <div className="form-grid">
        <label>State <select name="state" required defaultValue=""><option value="" disabled>Select state</option>{states.map((state) => <option key={state}>{state}</option>)}</select></label>
        <label>Local government area <input name="lga" required minLength={2} maxLength={80} placeholder="e.g. Ikeja" /></label>
        <label>Polling-unit reference <input name="pollingUnit" maxLength={80} placeholder="Optional; avoid live personal location" /></label>
        <label>Report category <select name="category" required defaultValue="Queue observation"><option>Accessibility</option><option>Queue observation</option><option>Materials</option><option>Process</option><option>Other</option></select></label>
        <label className="form-span">What did you observe? <textarea name="description" required minLength={20} maxLength={1200} rows={6} placeholder="Describe an observation without personal details or claims you cannot support." /></label>
        <label className="form-span">Non-sensitive reference note <input name="referenceNote" maxLength={100} placeholder="Optional short reference" /></label>
        <fieldset className="form-span evidence-field"><legend>Supporting evidence</legend><p>Evidence upload is disabled in this demo. Private or identifying material should not be submitted.</p><label className="check-line"><input type="checkbox" required /> I understand this report is demonstration data and is not an official election record.</label></fieldset>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-green submit-button" type="submit" disabled={pending}>{pending ? <><LoaderCircle className="spin" size={17} /> Recording…</> : <>Create report commitment <ArrowRight size={17} /></>}</button>
    </form>
  );
}