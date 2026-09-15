# Fabric Agent tool routing

Use one authenticated `fabric` connector as three deliberately separate
planes. Tool availability is runtime evidence; this reference does not make a
missing tool exist.

## Code Indexer

Use `fabric_status` before relying on indexed evidence. A strong code claim
requires the relevant index to be ready and fresh for the active project.

For a material release, deployment, migration, privacy, destructive, or
blast-radius decision about a named code target, activate before broad
repository inspection and use this initial sequence:

1. `fabric_status` to establish exact project scope, readiness, and freshness;
2. `fabric_query` to locate the named symbol or path in that scope; and
3. `fabric_impact` to assess the proposed behavioral, refactor, deletion, or
   signature-change reach.

Use ordinary repository search afterward as an independent control. A lone
`fabric_impact` call after broad `Glob`, `Read`, or `Grep` exploration does not
satisfy the early indexed-evidence route. If tool permission, availability,
scope, or freshness blocks the sequence, name that gap rather than pretending
the call executed or treating ordinary search as Fabric evidence.

For a delegated material code decision, the parent establishes this route
before broad inspection or delegation, passes the exact scoped evidence to the
delegate, and asks the delegate to return exact Fabric tool receipts for any
independent graph work. Reconcile receipts and current repository evidence;
do not accept a subagent's prose-only assertion as indexed evidence.

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
`fractal_ask`, `fractal_remember`, `fractal_semantic_layer_registry`,
`fractal_finish`, and `fractal_trace_workspace`. Treat the activated tool list
as authoritative.

`fractal_remember` is allowed only inside the explicit durable-closure route:
exactly one reviewed retrieval citing the current session acknowledgment, one
evaluation citing the acknowledgment then retrieval, and one decision citing
the acknowledgment, retrieval, and evaluation in that order. Follow with
exactly one Finish using `evidence_refs: [acknowledgment_ref]`, the three ordered
memory refs, `text` set to the bounded literal final response, `handoff_text`
set to a 150–600 word string in exact `Delta: ... Anchors: ... Next: ...` order,
`cognitive_chain_status: captured`, and `runtime_tick: false`. Never use
Remember for ordinary capture. Never persist transcripts, prompts, tool
payloads, secrets, credentials, denied content, or unbounded excerpts. Remember
and Finish are non-idempotent on the required runtime: after any ambiguous or
partial result, stop writes, inspect with bounded status/recall, and never
blindly retry. If no such route exists, report
`durable_closure_path_unavailable` and do not claim Fabric Recorded.

A new or restarted process recovers through `fractal_status -> fractal_begin ->
fractal_recall`; `fractal_rehydrate` is only the same-open-session restoration
route. Recovery proof never authorizes repeating Finish.

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
