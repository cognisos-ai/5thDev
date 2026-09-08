---
description: Resume relevant Fabric continuity or close a bounded governed handoff
allowed-tools:
  - mcp__fabric__fractal_status
  - mcp__fabric__fractal_begin
  - mcp__fabric__fractal_recall
  - mcp__fabric__fractal_rehydrate
  - mcp__fabric__fractal_ask
  - mcp__fabric__fractal_finish
---

# Fabric Continuity

Follow the Fabric Agent memory lifecycle for the current task only.

1. Call `fractal_status` and verify the exact store, repository scope,
   authority mode, product health, and available tools.
2. For a new-session resume, call `fractal_begin` only when status confirms an
   authorized write surface. For in-session context restoration, use
   `fractal_rehydrate` under the same gate.
3. Use bounded `fractal_recall` or `fractal_ask` for only the prior decisions
   that could change the current work. Distinguish admitted evidence from
   inference and treat an empty established store as honest genesis.
4. For closure, prepare a reviewed 150–600 word handoff with the bounded
   outcome, decisions, exact source revision, evidence references, material
   limitations, and next action.
5. Use only the activated product's approved curated `fractal_finish` path.
   Preserve the exact operation and receipt references it returns.

Never copy a raw transcript, prompt, tool payload, secret, denied content, or
unbounded file content into memory. Never call raw `fractal_remember`. If no
approved durable closure path is available, report
`durable_closure_path_unavailable`, preserve a repository handoff only as a
non-Fabric fallback, and do not claim Fabric Recorded.
