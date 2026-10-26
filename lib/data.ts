import { randomUUID } from "node:crypto";
import { hashReport } from "@/lib/hash";
import type { Campaign, Report } from "@/lib/types";
import type { ReportInput } from "@/lib/validation";

const reportSeeds: Omit<Report, "hash">[] = [
  {
    id: "demo-queue",
    reference: "VL-DEMO-001",
    state: "Lagos",
    lga: "Ikeja",
    pollingUnit: "DEMO-PU-014",
    category: "Queue observation",
    description: "Demonstration-only sample describing a queue observation. This fictional record is included to exercise the report and verification flows.",
    referenceNote: "SAMPLE ONLY",
    submittedAt: "2026-10-20T09:30:00.000Z",
    reviewStatus: "Awaiting Review",
    commitmentStatus: "Not prepared",
  },
  {
    id: "demo-accessibility",
    reference: "VL-DEMO-002",
    state: "Kano",
    lga: "Nasarawa",
    pollingUnit: "DEMO-PU-032",
    category: "Accessibility",
    description: "Fictional accessibility checklist entry for interface demonstration. No real incident or election location is being asserted by this sample.",
    submittedAt: "2026-10-19T12:15:00.000Z",
    reviewStatus: "Reviewed",
    commitmentStatus: "Simulated",
  },
  {
    id: "demo-process",
    reference: "VL-DEMO-003",
    state: "Enugu",
    lga: "Nsukka",
    category: "Process",
    description: "Sample process note created for product testing only. It contains no official result, endorsement, or claim about an actual polling unit.",
    submittedAt: "2026-10-18T08:45:00.000Z",
    reviewStatus: "Submitted",
    commitmentStatus: "Not prepared",
  },
];

const reportStore = new Map<string, Report>();
const campaigns: Campaign[] = [
  {
    id: "open-data",
    title: "Open civic data workshops",
    description: "A fictional demonstration campaign for community sessions on reading and responsibly sharing public-interest data.",
    organizerRef: "DEMO-ORG-01",
    targetSats: 180000,
    confirmedSats: 42000,
    simulatedSats: 12000,
    status: "Active",
    expenditures: [{ item: "Sample venue deposit", amountNgn: 85000, publishedAt: "2026-10-12" }],
  },
  {
    id: "accessibility-kit",
    title: "Accessible reporting toolkit",
    description: "A fictional campaign to prototype accessible, low-bandwidth civic reporting materials.",
    organizerRef: "DEMO-ORG-02",
    targetSats: 250000,
    confirmedSats: 96000,
    simulatedSats: 18000,
    status: "Active",
    expenditures: [{ item: "Sample print proof", amountNgn: 42000, publishedAt: "2026-10-08" }],
  },
  {
    id: "community-training",
    title: "Community verification sessions",
    description: "A fictional example of a small training initiative with an openly listed sample expense.",
    organizerRef: "DEMO-ORG-03",
    targetSats: 90000,
    confirmedSats: 90000,
    simulatedSats: 0,
    status: "Completed",
    expenditures: [{ item: "Sample workshop materials", amountNgn: 64000, publishedAt: "2026-10-03" }],
  },
];

let simulatedContributionCount = 2;

function seedReports(): Map<string, Report> {
  return new Map(reportSeeds.map((report) => [report.id, { ...report, hash: hashReport(report) }]));
}

function ensureInitialized() {
  if (reportStore.size === 0) {
    for (const [id, report] of seedReports()) reportStore.set(id, report);
  }
}

export function listReports(): Report[] {
  ensureInitialized();
  return [...reportStore.values()].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function getReport(idOrReference: string): Report | undefined {
  ensureInitialized();
  return [...reportStore.values()].find((report) => report.id === idOrReference || report.reference.toLowerCase() === idOrReference.toLowerCase());
}

export function addReport(input: ReportInput): Report {
  ensureInitialized();
  const submittedAt = new Date().toISOString();
  const reference = `VL-${new Date().getUTCFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const report: Report = {
    id: randomUUID(),
    reference,
    ...input,
    submittedAt,
    reviewStatus: "Submitted",
    commitmentStatus: "Not prepared",
    hash: "",
  };
  report.hash = hashReport(report);
  reportStore.set(report.id, report);
  return report;
}

export function listCampaigns(): Campaign[] {
  return campaigns;
}

export function getCampaign(id: string): Campaign | undefined {
  return campaigns.find((campaign) => campaign.id === id);
}

export function getDashboardData() {
  const reports = listReports();
  return {
    reports,
    totalReports: reports.length,
    awaitingReview: reports.filter((report) => report.reviewStatus === "Awaiting Review" || report.reviewStatus === "Submitted").length,
    simulatedCommitments: reports.filter((report) => report.commitmentStatus === "Simulated").length,
    confirmedContributionsSats: campaigns.reduce((sum, campaign) => sum + campaign.confirmedSats, 0),
    simulatedContributionCount,
    activeCampaigns: campaigns.filter((campaign) => campaign.status === "Active").length,
    publishedExpenses: campaigns.reduce((sum, campaign) => sum + campaign.expenditures.length, 0),
    campaigns,
  };
}

export function recordSimulatedContribution() {
  simulatedContributionCount += 1;
}

export function resetDemoData() {
  reportStore.clear();
  simulatedContributionCount = 2;
  ensureInitialized();
}