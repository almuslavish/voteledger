import { Check, Clock3, CircleDashed, ShieldCheck } from "lucide-react";

const styles: Record<string, { className: string; icon: typeof Check }> = {
  Submitted: { className: "status-neutral", icon: CircleDashed },
  "Awaiting Review": { className: "status-pending", icon: Clock3 },
  Reviewed: { className: "status-reviewed", icon: Check },
  "Independently Verified": { className: "status-verified", icon: ShieldCheck },
  "Not prepared": { className: "status-neutral", icon: CircleDashed },
  Prepared: { className: "status-pending", icon: Clock3 },
  Simulated: { className: "status-simulated", icon: CircleDashed },
  Active: { className: "status-active", icon: Check },
  Completed: { className: "status-neutral", icon: Check },
};

export function StatusBadge({ label }: { label: string }) {
  const status = styles[label] ?? styles.Submitted;
  const Icon = status.icon;
  return <span className={`status-badge ${status.className}`}><Icon size={13} />{label}</span>;
}