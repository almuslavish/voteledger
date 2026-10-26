import Link from "next/link";
import { ArrowUpRight, Blocks, CircleHelp, LayoutDashboard, ShieldCheck } from "lucide-react";

const links = [
  { href: "/reports", label: "Reports" },
  { href: "/verify", label: "Verify" },
  { href: "/funding", label: "Funding" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="VoteLedger home">
          <span className="brand-mark"><Blocks size={19} strokeWidth={2.3} /></span>
          <span>voteledger<span className="brand-period">.</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <Link href="/about">About</Link>
        </nav>
        <Link className="header-cta" href="/reports/new">Submit a report <ArrowUpRight size={15} /></Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div><Link className="brand footer-brand" href="/"><span className="brand-mark"><Blocks size={18} /></span><span>voteledger<span className="brand-period">.</span></span></Link><p>Every report matters. Every record is verifiable.</p></div>
        <div className="footer-links"><Link href="/about"><CircleHelp size={15} /> Methodology</Link><Link href="/dashboard"><LayoutDashboard size={15} /> Public dashboard</Link><Link href="/verify"><ShieldCheck size={15} /> Verify a record</Link></div>
      </div>
      <div className="disclaimer"><strong>Independent prototype.</strong> VoteLedger is not affiliated with INEC and does not publish official election results. Cryptographic verification checks record integrity, not factual truth.</div>
      <div className="footer-bottom"><span>© 2026 VoteLedger demo</span><span>Built for public-interest transparency <span aria-hidden="true">·</span> <Link href="/about">Read limitations</Link></span></div>
    </footer>
  );
}