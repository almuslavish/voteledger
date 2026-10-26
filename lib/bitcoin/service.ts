export type BitcoinAnchorStage = "prepared" | "submitted" | "confirmed" | "verified";

export interface BitcoinAnchorService {
  prepareCommitment(localHash: string): Promise<{ payload: string }>;
  submitCommitment(payload: string): Promise<{ transactionId: string }>;
  getConfirmation(transactionId: string): Promise<{ confirmed: boolean; blockHeight?: number }>;
  verifyCommitment(transactionId: string, expectedHash: string): Promise<boolean>;
}

export type BitcoinCommitment = {
  localHash: string;
  prepared: false;
  submitted: false;
  confirmed: false;
  mode: "demo";
};

export function describeDemoCommitment(localHash: string): BitcoinCommitment {
  return { localHash, prepared: false, submitted: false, confirmed: false, mode: "demo" };
}