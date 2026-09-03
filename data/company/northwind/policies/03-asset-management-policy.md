# Asset Management Policy

**Owner:** IT Manager · **Version:** 1.6 · **Approved:** 2024-11-15 · **Next review:** 2025-11-15

## Asset inventory
- Endpoints are enrolled in the MDM (Kandji for macOS, Intune for Windows) and inventoried automatically.
- Cloud assets are inventoried via AWS Config and tagged with `owner` and `data-class`.
- SaaS applications are tracked in a register maintained by IT, reviewed twice a year.
- Each asset has a named owner recorded in the inventory.

## Information classification
Information is classified as **Public**, **Internal**, **Confidential**, or **Customer Data**.
Handling rules for each class (storage, sharing, encryption, retention) are defined in the
classification standard appendix.

## Acceptable use
Covered by the separate Acceptable Use Policy.

## Return of assets
On offboarding, IT recovers company laptops and hardware keys and records their return in the
offboarding checklist. Cloud access removal is covered by the Access Control Policy.

## Media
Company devices use full-disk encryption. Portable media (USB drives) are blocked by MDM policy.

> **Note:** A labelling scheme for classified documents and emails has been drafted but is
> not yet rolled out. Target: Q3 2025.
