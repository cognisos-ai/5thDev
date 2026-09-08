# Fabric Agent tool routing

Use one authenticated `fabric` connector as three deliberately separate
planes. Tool availability is runtime evidence; this reference does not make a
missing tool exist.

## Code Indexer

Use `fabric_status` before relying on indexed evidence. A strong code claim
requires the relevant index to be ready and fresh for the active project.

- `fabric_query` finds symbols and structural neighbors.
- `fabric_text_search` finds exact prose, literals, and error strings.
- `fabric_explain` returns one symbol's callers, callees, tests, contracts, and
  debt.
- `fabric_slice` creates bounded task context.
- `fabric_impact` assesses refactor, deletion, and signature-change reach.
- `fabric_staleness` checks whether indexed evidence trails local edits.
- `fabric_recent_changes`, `fabric_contracts`, and `fabric_debt` provide
  focused supporting evidence.
- `fabric_govern` evaluates a proposed change against the available rules and
  evidence. It does not prove implementation correctness.
- `fabric_govern_add` mutates durable policy and requires an explicit user
  request.

Use ordinary repository search as a control when files are unindexed, exact raw
text matters, or the status scope does not match the active repository.

## Fractal continuity

Follow `memory-lifecycle.md`. The supported workflow may expose
`fractal_status`, `fractal_begin`, `fractal_recall`, `fractal_rehydrate`,
`fractal_ask`, `fractal_semantic_layer_registry`, `fractal_finish`, and
`fractal_trace_workspace`. Treat the activated tool list as authoritative.

Do not invoke raw `fractal_remember`. Use only the approved composed closure
path exposed by the activated product. If no such path exists, report
`durable_closure_path_unavailable` and do not claim Fabric Recorded.

The Fractal memory engine is required for continuity. Its background capture
daemon is separate, optional, and off by default; `not_running` alone is not an
installation failure.

## Shared Fabric

`shared_fabric_status` and `shared_fabric_list` inspect the explicit
teammate-package lane. Call `shared_fabric_accept` only with the exact package
ID the user selected or supplied. Never guess a package or accept all packages.
Importing a package is a separate, explicit action; it is not ordinary personal
recall or automatic team synthesis.

## Forbidden legacy surface

Do not use obsolete hosted `fabric_recall`, `fabric_remember`,
`fabric_compress`, or `fabric_decompress` tools. Do not request or embed a
bearer credential, register a second hosted connector, or start background
capture merely to make status look healthy.
