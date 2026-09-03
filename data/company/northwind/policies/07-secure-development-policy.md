# Secure Development Policy

**Owner:** CTO · **Version:** 1.2 · **Approved:** 2025-01-30 · **Next review:** 2026-01-30

## Environments
Development, staging and production are separate AWS accounts. Developers have no standing
access to production. Production data is never copied into lower environments.

## Change management
All changes go through pull request with at least one peer review and a passing CI pipeline.
CI runs unit tests, dependency vulnerability scanning (Dependabot), static analysis
(Semgrep), and secret scanning. Deployments to production are automated and logged, and
can be rolled back.

## Secure coding
Engineers follow the internal secure coding guide (input validation, output encoding,
parameterised queries, no secrets in code). Secure-coding training is annual.

## Testing
- SAST and SCA run on every pull request.
- Dynamic application security testing (DAST) runs weekly against staging.
- An external penetration test is performed annually and findings are tracked to closure.

## Source code protection
Repositories are private. Branch protection is enforced on `main`. Access is by team
membership and reviewed with the quarterly access review.

> **Not yet formalised:** threat modelling is done informally for large features but there
> is no documented requirement or template. Secure architecture principles are not written down.
