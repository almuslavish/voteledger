export type LightningInvoice = {
  paymentRequest: string;
  providerReference: string;
  expiresAt: string;
};

export type LightningPaymentStatus = "pending" | "settled" | "expired" | "failed";

export interface LightningPaymentService {
  createInvoice(input: { campaignId: string; amountSats: number }): Promise<LightningInvoice>;
  getPaymentStatus(providerReference: string): Promise<LightningPaymentStatus>;
  verifyWebhook(request: Request): Promise<{ providerReference: string; status: LightningPaymentStatus }>;
}