# VoteLedger

**Every Report Matters. Every Record Is Verifiable.**

VoteLedger is an independent civic technology prototype for structured election-related reports, record-integrity checks, and transparent civic funding examples. It is not affiliated with INEC and does not publish official election results.

## Run locally

Requirements: Node.js 22+ and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. No API credentials or external services are required for demonstration mode.

## Validate

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

GitHub Actions runs these checks on pull requests and pushes to `main`, using Node.js 22.

## Demo flow

1. Open **Reports** and inspect the fictional sample records.
2. Submit a report at **New report**. The API validates the fields, assigns a reference, computes a SHA-256 hash, and stores it in the process-local demonstration store.
3. Open the new record and copy its reference. In **Verify**, run a normal check, then use **Modify copy and compare**. The tamper demo changes only a request copy; it does not alter the stored report.
4. Visit a fictional funding campaign. The demonstration mode never creates an invoice or sends Bitcoin. The real integration mode is intentionally unavailable until a provider is selected, configured, and reviewed.
5. Review the **Dashboard**. Its values are sample data. Use **Reset demo data** to restore the seed reports and simulated interaction count.

## Architecture

- `app/` contains Next.js App Router pages and server API routes.
- `components/` contains client interactions and shared UI.
- `lib/hash.ts` defines canonical report serialization and Node.js SHA-256 hashing.
- `lib/validation.ts` validates API input with Zod.
- `lib/data.ts` is the replaceable in-memory demonstration data adapter.
- `lib/bitcoin/service.ts` defines a deliberately non-broadcasting Bitcoin boundary.
- `lib/lightning/service.ts` defines the provider contract without a configured provider.
- `lib/security/origin.ts` protects state-changing demo endpoints from cross-origin requests.
- `tests/` checks deterministic hashing and tamper detection.

The in-memory adapter is not persistent. Data can be lost on restart and may differ between server instances. Replace it with a database adapter before multi-instance use; do not assume process memory behaves as shared storage.

## Integrity and Bitcoin limits

The app computes genuine SHA-256 hashes over a fixed-order JSON representation of public report fields. Verification recalculates that hash and returns `MATCH`, `MISMATCH`, or `UNAVAILABLE`. A matching digest means the compared fields match the stored digest. It does **not** prove a report is factual, complete, unbiased, officially reviewed, or an election result.

Bitcoin commitment stages are distinct: local hash, prepared commitment, submitted transaction, block confirmation, and verified commitment. This build performs only the local hash step. It does not fabricate transaction IDs or present sample metadata as on-chain confirmation. No report or private evidence is sent to a public blockchain.

The Bitcoin adapter is an integration boundary, not a configured wallet or broadcaster. A production anchoring design needs a privacy review, confirmation policy, error/reorg handling, and an operator-controlled broadcast path. It must anchor only a suitable non-sensitive commitment.

## Lightning limits

The sample campaigns and displayed contribution figures are fictional. A demo interaction creates no BOLT11 invoice and sends no funds. Its mock text is explicitly not a payable invoice and simulated values do not count as confirmed totals.

No Lightning provider was selected because there are no credentials or provider environment to verify. Real mode is disabled. A real integration must create invoices server-side, validate provider responses and authenticated webhooks, handle expiry/idempotency, and update confirmed totals only after provider-verified settlement. Never accept payment status from the browser or expose credentials in client code. Do not use custodial wallets or private-key storage in this prototype.

## Privacy and security

- Do not submit personal information, private contact details, exact live locations, or confidential evidence.
- Evidence uploads are disabled. Observer authorization is simulated and is not official accreditation.
- Report endpoints validate input, but this demo has no user accounts, moderation, rate limiting, durable audit log, or production access controls.
- The reset endpoint is same-origin checked and intended only for the demonstration interface; process-local data is not a production store.
- Payment processing, webhooks, and blockchain transaction handling are not implemented.
- This prototype is not production-ready and needs independent security, privacy, accessibility, and operational review before real civic use.

## Routes

`/` · `/about` · `/reports` · `/reports/new` · `/reports/[id]` · `/verify` · `/funding` · `/funding/[id]` · `/funding/[id]/contribute` · `/dashboard`
