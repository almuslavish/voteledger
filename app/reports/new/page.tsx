import Link from "next/link";
import { ArrowLeft, FilePlus2 } from "lucide-react";
import { ReportForm } from "@/components/report-form";

export default function NewReportPage() {
  return <main className="page-wrap content-page narrow-page"><Link className="back-link" href="/reports"><ArrowLeft size={15} /> All reports</Link><div className="eyebrow eyebrow-dark"><FilePlus2 size={14} /> NEW RECORD · DEMO MODE</div><h1 className="page-title">Submit an observation</h1><p className="page-intro">Create a structured demonstration report. A SHA-256 fingerprint is generated when the report is recorded.</p><ReportForm /><p className="form-bottom-note">You are not submitting an official incident report. This prototype is not monitored as an emergency or election-response service.</p></main>;
}