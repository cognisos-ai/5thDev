---
description: Check Fabric code-index and Fractal continuity readiness without conflating their daemons
allowed-tools:
  - mcp__fabric__fabric_status
  - mcp__fabric__fractal_status
---

# Fabric Status

Call `fabric_status` and `fractal_status` from the authenticated `fabric`
connector.

Report:

1. the exact project and repository scope each status covers;
2. Code Indexer daemon, phase, watcher, and freshness state;
3. Fractal store, authority mode, product health, and available continuity
   tools; and
4. Fractal background capture separately.

Do not use a ready Code Indexer as proof that Fractal continuity is ready. The
Code Indexer must be ready and fresh for strong indexed-code claims. The
Fractal memory engine must be established and correctly scoped before required
recall or handoff, but its optional background capture daemon may be
`not_running` without being an installation failure.

If either status covers a different project or repository than the current
task, say so and use ordinary repository tools for that missing evidence.
