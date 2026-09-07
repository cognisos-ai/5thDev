# Fabric Agent memory lifecycle

Use this workflow only when the Fabric Agent task is tracked or governed and
prior context or a durable handoff could materially help. The lifecycle adapter
remains content-free and separate from this memory workflow.

## Activation gate

1. Call `fractal_status` and inspect the exact store, authority mode, repository
   scope, product health, and available tools.
2. Treat missing configuration, an unestablished store, failed bootstrap
   authority, a mismatched scope, or an unavailable approved closure path as a
   visible memory-authority gap.
3. Do not use code-index health, Shared Fabric package visibility, a local JSONL
   event, or a config file's presence as evidence that continuity is ready.
4. Low-risk work may continue when memory is degraded. Required recall or a
   governed handoff gap blocks `Evidence Complete` and `Fabric Verified`.

## Recall routing

| Situation | Requirement | Curated sequence |
|---|---|---|
| Prior work affects a decision | required | `fractal_status -> fractal_recall` |
| New session resumes a handoff | required | `fractal_status -> fractal_begin -> fractal_recall` |
| Context restored in an open session | required | `fractal_status -> fractal_rehydrate -> fractal_recall` |
| Correction or supersession | required | recall the current record before replacement |
| Governed completion handoff | required | resolve the latest continuity before closure |
| Tracked project exploration | optional | recall only when it can materially help |
| Unrelated passive work | unnecessary | stay quiet |

An empty established store is honest genesis, not remembered context. If begin
or rehydrate fails because bootstrap authority is absent, surface the failure
once and do not retry blindly.

## Durable closure

Prepare a reviewed 150–600 word handoff containing only:

- the bounded outcome and decisions;
- exact source revision and relevant evidence references;
- load-bearing limitations or blockers; and
- the next concrete action.

Use only the activated product's approved curated finish path. Preserve its
operation ID and exact partial-stage references when returned. Retry only under
the tool's stated exact-input recovery contract.

Do not invoke raw `fractal_remember`. When the runtime requires prior typed
records but the activated product exposes no approved composed route, return
`durable_closure_path_unavailable`. A Git commit, Markdown handoff, or plugin
event log may preserve work operationally, but none qualifies as `Fabric
Recorded` without an exact durable judgment/receipt reference.

## Required attribution

A successful continuity report names the harness, agent/session identity,
scope, authority, close time, handoff reference, handoff digest or commitment,
and evidence references. Team visibility always requires a separate explicit
sharing action and receipt.
