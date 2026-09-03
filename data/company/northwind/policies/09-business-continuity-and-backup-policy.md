# Business Continuity & Backup Policy

**Owner:** CTO · **Version:** 1.0 · **Approved:** 2024-10-01 · **Next review:** 2025-10-01

## Objectives
- Recovery Time Objective (RTO) for the SaaS platform: 4 hours.
- Recovery Point Objective (RPO): 1 hour.

## Backups
- The primary database is backed up continuously (point-in-time recovery, 35-day window).
- Object storage uses cross-region replication to eu-central-1.
- Infrastructure is defined as code (Terraform) and can be rebuilt in a second region.

## Resilience
Production runs across three availability zones in eu-west-1. The database is
multi-AZ with automatic failover.

## Continuity planning
A business continuity plan exists covering loss of the primary AWS region, loss of the
office, and loss of key staff. It names alternate arrangements for each scenario.

> **Gaps flagged by internal review:**
> - Backup restoration has not been tested end-to-end; only automated backup success is monitored.
> - The continuity plan has not been exercised since it was written.
> - ICT continuity requirements (A.5.30) are not mapped to specific recovery procedures.
