import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { listReports } from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";

export const dynamic = "force-dynamic";

export default function ReportsPage() {
  const reports = listReports();
  return <main className="page-wrap content-page"><div className="eyebrow eyebrow-dark">PUBLIC REGISTER <span className="demo-dot" /> DEMONSTRATION DATA</div><div className="page-heading-row"><div><h1 className="page-title">Reports</h1><p className="page-intro">Structured community observations. A published record is not an official election result.</p></div><Link className="button button-green" href="/reports/new"><Plus size={17} /> New report</Link></div><div className="filter-row"><span>{reports.length} sample records</span><span>Review status and Bitcoin commitment are tracked separately.</span></div><div className="report-table report-table-page"><div className="table-head"><span>Reference / area</span><span>Category</span><span>Review status</span><span>Commitment</span><span /></div>{reports.map((report) => <Link className="report-row" href={`/reports/${report.id}`} key={report.id}><div><strong>{report.reference}</strong><small>{report.lga}, {report.state}{report.pollingUnit ? ` · ${report.pollingUnit}` : ""}</small></div><span className="row-category">{report.category}</span><StatusBadge label={report.reviewStatus} /><StatusBadge label={report.commitmentStatus} /><ArrowUpRight className="row-arrow" size={16} /></Link>)}</div><div className="notice-box compact-notice"><span className="demo-dot" /><p>All reports are fictional. A hash match can detect changes to record content; it does not establish factual accuracy.</p></div></main>;
}