import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Zap } from "lucide-react";
import { getCampaign } from "@/lib/data";
import { ContributionFlow } from "@/components/contribution-flow";

export default async function ContributePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = getCampaign(id);
  if (!campaign) notFound();
  return <main className="page-wrap content-page narrow-page"><Link className="back-link" href={`/funding/${campaign.id}`}><ArrowLeft size={15} /> Campaign details</Link><div className="eyebrow eyebrow-dark"><Zap size={13} /> LIGHTNING CONTRIBUTION</div><h1 className="page-title">Support the initiative</h1><p className="page-intro">{campaign.title}<br />All flow controls are demonstration-only unless a verified provider is configured.</p><ContributionFlow campaignId={campaign.id} /><p className="integrity-note">No custodial wallet, private-key handling, invoice creation, or payment-status claims are part of this prototype.</p></main>;
}