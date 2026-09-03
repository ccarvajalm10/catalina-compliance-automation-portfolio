# Cryptography Policy

**Owner:** Head of Platform · **Version:** 1.1 · **Approved:** 2024-12-05 · **Next review:** 2025-12-05

## Data in transit
All external connections use TLS 1.2 or higher. Internal service-to-service traffic in the
production VPC uses mTLS. Plaintext protocols are disabled.

## Data at rest
- Customer Data in the primary database and object storage is encrypted with AES-256 using
  AWS KMS customer-managed keys.
- Endpoint disks are encrypted (FileVault / BitLocker) and enforced by MDM.
- Backups are encrypted with a separate KMS key.

## Key management
KMS keys are rotated annually. Key administration is restricted to the platform team via a
dedicated IAM role and every key-policy change is logged in CloudTrail. There is no
hardware security module requirement at this time.

## Certificates
TLS certificates are issued and renewed automatically via AWS Certificate Manager.
Expiry is monitored and alerts fire 21 days before expiry.
