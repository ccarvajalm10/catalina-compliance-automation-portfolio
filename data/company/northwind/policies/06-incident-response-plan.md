# Incident Response Plan

**Owner:** CISO · **Version:** 2.0 · **Approved:** 2025-04-12 · **Next review:** 2026-04-12
**Tested:** 2025-05-20 (tabletop exercise, report filed)

## Roles
- **Incident Commander:** on-call security engineer, escalates to CISO.
- **Comms Lead:** Head of Legal (customer/regulator notification).
- **Scribe:** assigned at declaration; maintains the incident timeline.

## Detection and reporting
Staff report suspected incidents via the `#security-incidents` Slack channel or
security@northwind.example. Alerts also arrive from the SIEM and the cloud provider.
All reports are logged as tickets within 15 minutes.

## Classification
Events are triaged and assigned severity SEV-1 to SEV-3 using the severity matrix.
The Incident Commander decides whether an event is an incident.

## Response
Documented runbooks exist for: account compromise, data exposure, ransomware/malware,
and DDoS. Containment, eradication and recovery steps are recorded in the incident ticket.

## Notification
Customer and regulatory notification decisions are made by the Comms Lead with Legal.
The GDPR 72-hour assessment clock starts at confirmation of a personal-data breach.

## Post-incident
A post-incident review is held within 10 working days for all SEV-1 and SEV-2 incidents.
Actions are tracked to closure and themes are reported to the Steering Committee quarterly.

## Evidence
Where an incident may lead to legal action, the Incident Commander preserves logs and
disk images following the forensic-readiness checklist and maintains a chain-of-custody record.
