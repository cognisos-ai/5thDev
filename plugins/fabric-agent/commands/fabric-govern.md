---
description: Assess a proposed code change with fresh bounded Fabric evidence and honest status
allowed-tools:
  - mcp__fabric__fabric_status
  - mcp__fabric__fabric_staleness
  - mcp__fabric__fabric_impact
  - mcp__fabric__fabric_contracts
  - mcp__fabric__fabric_debt
  - mcp__fabric__fabric_slice
  - mcp__fabric__fabric_govern
---

# Fabric Govern

Assess the user's proposed change without treating a governance result as proof
that the implementation is correct.

1. Call `fabric_status` and verify that its project scope matches the active
   repository and that indexed evidence is ready and fresh.
2. Call `fabric_staleness` for known target paths. Use ordinary repository
   search as a control for unindexed or stale files.
3. Gather the smallest relevant evidence with `fabric_impact`,
   `fabric_contracts`, `fabric_debt`, or `fabric_slice`.
4. Call `fabric_govern` with the exact proposed change and bounded evidence.
5. Report the decision, reason codes, evidence scope, freshness, missing checks,
   and limitations.

Do not add or change governance policy unless the user explicitly asks. Do not
label a passed governance check as Evidence Complete or Fabric Verified unless
the named evidence and verification profiles independently satisfy those
statuses.
