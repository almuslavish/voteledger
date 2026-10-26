export type ReviewStatus = "Submitted" | "Awaiting Review" | "Reviewed" | "Independently Verified";
export type CommitmentStatus = "Not prepared" | "Simulated";

export type Report = {
  id: string;
  reference: string;
  state: string;
  lga: string;
  pollingUnit?: string;
  category: string;
  description: string;
  referenceNote?: string;
  submittedAt: string;
  reviewStatus: ReviewStatus;
  hash: string;
  commitmentStatus: CommitmentStatus;
};

export type Expenditure = { item: string; amountNgn: number; publishedAt: string };
export type Campaign = {
  id: string;
  title: string;
  description: string;
  organizerRef: string;
  targetSats: number;
  confirmedSats: number;
  simulatedSats: number;
  status: "Active" | "Completed";
  expenditures: Expenditure[];
};