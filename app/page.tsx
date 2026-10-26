import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Fingerprint, LockKeyhole, RadioTower, ShieldCheck, Zap } from "lucide-react";
import { listCampaigns, listReports } from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const reports = listReports().slice(0, 3);
  const campaigns = listCampaigns().slice(0, 2);
  return (
    <>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner page-wrap">
          <div className="hero-copy"><span className="eyebrow"><span className="live-dot" /> OPEN CIVIC RECORDS · NIGERIA</span>
            <h1>Every report matters.<br /><em>Every record</em> is verifiable.</h1>
            <p>VoteLedger helps communities publish structured election observations and check whether a record has changed. It makes no claim that a report is true or an official result.</p>
            <div className="hero-actions"><Link className="button button-green" href="/reports">Explore reports <ArrowRight size={17} /></Link><Link className="button button-hero-outline" href="/verify"><Fingerprint size={17} /> Verify a record</Link></div>
            <div className="hero-proof"><span><Check size={14} /> Real SHA-256 hashes</span><span><Check size={14} /> Independent prototype</span><span><Check size={14} /> Privacy-conscious by design</span></div>
          </div>
          <div className="hero-visual" aria-label="Illustration of a report record and its cryptographic fingerprint">
            <div className="record-preview"><div className="record-top"><span className="tiny-label">PUBLIC RECORD / DEMO</span><span className="record-index">001 — 024</span></div><div className="record-rule" /><div className="record-loc"><span className="record-pin">01</span><div><small>OBSERVATION AREA</small><strong>Ikeja, Lagos</strong></div><StatusBadge label="Awaiting Review" /></div><div className="record-line"><span>Category</span><strong>Queue observation</strong></div><div className="record-line"><span>Reference</span><strong>VL-DEMO-001</strong></div><div className="hash-preview"><div><Fingerprint size={15} /><span>SHA-256 · LOCAL HASH</span></div><code>{reports[0]?.hash.slice(0, 12)}...{reports[0]?.hash.slice(-12)}</code><small>Integrity check available <ArrowUpRight size={12} /></small></div></div>
            <div className="hero-stamp"><ShieldCheck size={17} /><span>RECORD<br />INTEGRITY</span></div>
            <div className="hero-note"><span className="note-line" />No claim of truth.<br />Just a checkable record.</div>
          </div>
        </div>
        <div className="hero-bottom page-wrap"><span>INDEPENDENT CIVIC TECHNOLOGY</span><span>DEMONSTRATION DATA ONLY <ArrowDownRight size={13} /></span></div>
      </section>

      <section className="section page-wrap" aria-labelledby="recent-heading">
        <div className="section-heading"><div><span className="eyebrow eyebrow-dark">THE PUBLIC REGISTER</span><h2 id="recent-heading">Recent reports</h2></div><Link className="text-link" href="/reports">View all reports <ArrowRight size={16} /></Link></div>
        <div className="report-table"><div className="table-head"><span>Reference / area</span><span>Category</span><span>Review status</span><span>Submitted</span></div>{reports.map((report) => <Link className="report-row" href={`/reports/${report.id}`} key={report.id}><div><strong>{report.reference}</strong><small>{report.lga}, {report.state}</small></div><span className="row-category">{report.category}</span><span><StatusBadge label={report.reviewStatus} /></span><span className="row-date">{new Date(report.submittedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}<ArrowUpRight size={15} /></span></Link>)}</div>
        <p className="table-note"><span className="demo-dot" /> Every record shown here is fictional demonstration data.</p>
      </section>

      <section className="section section-tint"><div className="page-wrap"><div className="section-heading"><div><span className="eyebrow eyebrow-dark">COMMUNITY INITIATIVES</span><h2>Support the work</h2></div><Link className="text-link" href="/funding">Explore campaigns <ArrowRight size={16} /></Link></div><div className="campaign-grid">{campaigns.map((campaign) => <Link className="campaign-card" key={campaign.id} href={`/funding/${campaign.id}`}><div className="campaign-card-top"><span className="campaign-symbol"><Zap size={17} /></span><StatusBadge label={campaign.status} /></div><h3>{campaign.title}</h3><p>{campaign.description}</p><div className="funding-progress"><div><strong>{campaign.confirmedSats.toLocaleString()} sats</strong><span>of {campaign.targetSats.toLocaleString()}</span></div><span className="progress-track"><span style={{ width: `${Math.min(100, (campaign.confirmedSats / campaign.targetSats) * 100)}%` }} /></span></div><div className="campaign-card-foot"><span>Confirmed demonstration total</span><ArrowUpRight size={16} /></div></Link>)}</div><p className="table-note">Confirmed totals are sample values. Simulated amounts are shown separately on campaign pages.</p></div></section>

      <section className="section page-wrap how-section"><div className="section-heading"><div><span className="eyebrow eyebrow-dark">A SMALL, HONEST TOOL</span><h2>How VoteLedger works</h2></div><Link className="text-link" href="/about">Read the methodology <ArrowRight size={16} /></Link></div><div className="steps-grid"><article className="step-card"><span className="step-number">01</span><div className="step-icon"><RadioTower size={20} /></div><h3>Report an observation</h3><p>Share structured notes with only the geographic detail needed. Private evidence and observer identities stay out of this demo.</p></article><article className="step-card"><span className="step-number">02</span><div className="step-icon"><Fingerprint size={20} /></div><h3>Create a fingerprint</h3><p>SHA-256 hashes a canonical report representation. A later change produces a different fingerprint.</p></article><article className="step-card"><span className="step-number">03</span><div className="step-icon"><LockKeyhole size={20} /></div><h3>Verify the record</h3><p>Compare the published fields with the stored hash. A match checks integrity, not truth, accuracy, or official status.</p></article></div></section>

      <section className="bitcoin-band"><div className="page-wrap bitcoin-inner"><div><span className="eyebrow">BITCOIN, WITH CLEAR LIMITS</span><h2>Integrity first.<br /><em>Anchoring later.</em></h2><p>This prototype computes genuine local hashes. No report is written to Bitcoin, and no Lightning invoice or payment is created.</p><Link className="button button-light" href="/about">Understand the limits <ArrowRight size={16} /></Link></div><div className="bitcoin-diagram"><div className="diagram-node"><Fingerprint size={21} /><span>LOCAL HASH</span><strong>SHA-256</strong></div><span className="diagram-dash">··········</span><div className="diagram-node diagram-muted"><LockKeyhole size={21} /><span>BITCOIN</span><strong>Not connected</strong></div><span className="diagram-dash">··········</span><div className="diagram-node diagram-muted"><Zap size={21} /><span>LIGHTNING</span><strong>Simulation only</strong></div></div></div></section>
      <section className="home-last page-wrap"><span className="eyebrow eyebrow-dark">START WITH A RECORD</span><h2>Curiosity is a good first step.</h2><div><Link className="text-link" href="/reports/new">Submit a demonstration report <ArrowRight size={16} /></Link><Link className="text-link" href="/dashboard">See the public dashboard <ArrowRight size={16} /></Link></div></section>
    </>
  );
}