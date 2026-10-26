import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Fingerprint, ShieldCheck } from "lucide-react";
import { getReport } from "@/lib/data";
import { describeDemoCommitment } from "@/lib/bitcoin/service";
import { StatusBadge } from "@/components/status-badge";

export const dynamic = "force-dynamic";

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = getReport(id);
  if (!report) notFound();
  const commitment = describeDemoCommitment(report.hash);
  return <main className="page-wrap content-page narrow-page"><Link className="back-link" href="/reports"><ArrowLeft size={15} /> Report register</Link><div className="eyebrow eyebrow-dark">PUBLIC RECORD <span className="demo-dot" /> DEMONSTRATION DATA</div><div className="detail-heading"><div><h1 className="page-title">{report.reference}</h1><p>{report.category} · {report.lga}, {report.state}</p></div><StatusBadge label={report.reviewStatus} /></div><div className="detail-panel"><div className="detail-meta"><div><span>Submitted</span><strong>{new Date(report.submittedAt).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" })} UTC</strong></div><div><span>Polling-unit reference</span><strong>{report.pollingUnit || "Not provided"}</strong></div><div><span>Review status</span><StatusBadge label={report.reviewStatus} /></div><div><span>Bitcoin commitment</span><StatusBadge label={report.commitmentStatus} /></div></div><section className="detail-description"><h2>Observation</h2><p>{report.description}</p>{report.referenceNote && <small>Reference note: {report.referenceNote}</small>}</section><section className="hash-section"><div className="hash-heading"><span className="method-icon"><Fingerprint size={18} /></span><div><h2>Local SHA-256 hash</h2><p>Calculated from canonical report fields. Not a Bitcoin transaction.</p></div></div><code className="full-hash">{report.hash}</code><div className="commitment-steps"><span className="step-done"><ShieldCheck size={14} /> Local hash calculated</span><span><span className="step-empty" /> Commitment prepared: {commitment.prepared ? "yes" : "no"}</span><span><span className="step-empty" /> Transaction submitted: {commitment.submitted ? "yes" : "no"}</span><span><span className="step-empty" /> Block confirmed: {commitment.confirmed ? "yes" : "no"}</span></div></section></div><div className="page-actions"><Link className="button button-dark" href={`/verify?reference=${encodeURIComponent(report.reference)}`}>Verify this record <ArrowUpRight size={16} /></Link><Link className="text-link" href="/about">What verification means</Link></div><p className="integrity-note"><strong>Important:</strong> A matching hash only shows that these fields match the stored fingerprint. It cannot prove the original observation is factual.</p></main>;
}