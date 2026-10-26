import { describe, expect, it } from "vitest";
import { canonicalReport, hashReport } from "../lib/hash";
import { isSameOriginRequest } from "../lib/security/origin";

const sample = {
  reference: "VL-TEST-001",
  state: "Lagos",
  lga: "Ikeja",
  category: "Process",
  description: "A fictional report used to test canonical hashing.",
  submittedAt: "2026-01-01T00:00:00.000Z",
};

describe("report hashing", () => {
  it("uses stable canonical fields and returns a SHA-256 digest", () => {
    const digest = hashReport(sample);
    expect(digest).toMatch(/^[a-f0-9]{64}$/);
    expect(hashReport({ ...sample })).toBe(digest);
    expect(canonicalReport(sample)).toContain('"pollingUnit":""');
  });

  it("changes when a canonical report field changes", () => {
    expect(hashReport({ ...sample, description: `${sample.description} Edited.` })).not.toBe(hashReport(sample));
  });
});

describe("same-origin mutation guard", () => {
  it("accepts the browser-facing origin behind a forwarded host", () => {
    const request = new Request("http://internal:3000/api/reports", {
      method: "POST",
      headers: {
        origin: "https://voteledger.example",
        host: "internal:3000",
        "x-forwarded-host": "voteledger.example",
        "x-forwarded-proto": "https",
      },
    });
    expect(isSameOriginRequest(request)).toBe(true);
  });

  it("rejects a different browser origin", () => {
    const request = new Request("http://localhost:3000/api/reports", {
      method: "POST",
      headers: { origin: "https://attacker.example", host: "localhost:3000" },
    });
    expect(isSameOriginRequest(request)).toBe(false);
  });
});