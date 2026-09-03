# Access Control Policy

**Owner:** Head of Platform · **Version:** 2.4 · **Approved:** 2025-03-01 · **Next review:** 2026-03-01

## Identity lifecycle
- Identities are created from the HR system of record (BambooHR) via an automated
  joiner workflow. Each person has one unique named account. Shared accounts are prohibited.
- Movers: role changes trigger an access review by the new manager within 5 working days.
- Leavers: accounts are disabled within 2 hours of the termination event and deleted after 30 days.

## Authentication
- Single sign-on (Okta) is mandatory for all corporate and production applications.
- Multi-factor authentication is enforced for all users on all SSO logins.
- Password policy: minimum 14 characters, screened against breached-password lists, no forced rotation.
- Production infrastructure access requires hardware security keys (FIDO2).

## Authorisation
- Access is granted by role via Okta groups mapped to least-privilege application roles.
- Requests are raised in the ticket system and approved by the resource owner.
- Privileged/admin access to production is time-bound (max 8 hours) and requested
  just-in-time through the PAM tool; all privileged sessions are recorded.

## Reviews
- User access to production systems and customer data is reviewed quarterly by resource owners.
- Privileged access is reviewed monthly.
- Review completion is tracked by the CISO; incomplete reviews are escalated to the Steering Committee.

## Source code
Access to the Git organisation is granted by team. Write access to the `main` branch is
blocked; changes require pull request and one review.
