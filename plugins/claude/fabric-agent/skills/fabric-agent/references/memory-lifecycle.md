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

Choose the situation before searching for tools:

- Wording such as **fresh session**, **new process**, **restart**, **reconnect**,
  or **resume the previous session** selects the new-session row. When the
  authority gate passes, request `fractal_begin` in the tool set and execute
  `fractal_status -> fractal_begin -> fractal_recall` in that order. Never use
  `fractal_rehydrate` as a shortcut or substitute.
- Wording such as **same open session**, **after compaction**, or **restore this
  session's context** selects the in-session row. When the authority gate
  passes, execute `fractal_status -> fractal_rehydrate -> fractal_recall` in
  that order. Never use `fractal_begin` as a substitute.
- If the request is ambiguous and the choice matters, ask whether the agent
  process is fresh. Do not infer a fresh process merely from an empty recall.

Every route above that invokes `fractal_recall` uses bounded retrieval scoped to
the current project and task, requesting only the minimum results needed for
the decision. `fractal_begin` and `fractal_rehydrate` are permitted only when
`fractal_status` confirms that the route is available through an authorized
write surface. Otherwise, do not call them: use `fractal_status` followed by
bounded `fractal_recall`, label the result `read_only_recall`, and report that
the lifecycle acknowledgment is unavailable. A synthetic observer,
`backend_semantics_proven: false`, or an explicitly read-only request does not
authorize an acknowledgment merely so an invocation test can observe one.

An empty established store is honest genesis, not remembered context. If begin
or rehydrate fails because bootstrap authority is absent, surface the failure
once and do not retry blindly.

## Durable closure

Prepare a reviewed 150–600 word `handoff_text`, formatted as one string with
the exact labels `Delta: ... Anchors: ... Next: ...` in that order, containing
only:

- the bounded outcome and decisions;
- exact source revision and relevant evidence references;
- load-bearing limitations or blockers; and
- the next concrete action.

Durable closure is an explicit local-write workflow. Continue only when the
user requested it and `fractal_status` proves the current repository scope, an
authorized write surface, and both `fractal_remember` and `fractal_finish`. Use
one stable current `session_id` and preserve its exact `acknowledgment_ref`; if
that acknowledgment ref is not already proved, call `fractal_rehydrate` once
before writing and preserve the ref it returns because closure is occurring in
the same open session.

Then use exactly this approved composed route:

1. Call `fractal_remember` once with `kind: retrieval` and
   `evidence_refs: [acknowledgment_ref]`. Keep the finding bounded to evidence
   that changed the work and state any evidence limitation in its text.
2. After PASS, preserve its `judgment_ref`. Call `fractal_remember` once with
   `kind: evaluation` and
   `evidence_refs: [acknowledgment_ref, retrieval_ref]`.
3. After PASS, preserve its `judgment_ref`. Call `fractal_remember` once with
   `kind: decision` and
   `evidence_refs: [acknowledgment_ref, retrieval_ref, evaluation_ref]` in that
   order. After every Remember PASS, require an exact, unique `judgment_ref`
   and confirm its returned evidence preserves the expected ordered suffix
   before making the next write.
4. After PASS, call `fractal_finish` exactly once with `text` set to the bounded
   literal final response, `handoff_text` set to the reviewed 150–600 word
   labeled handoff, `evidence_refs: [acknowledgment_ref]`,
   `cognitive_chain_status: captured`, the three ordered memory refs as
   `cognitive_chain_refs`, and `runtime_tick: false`. Supply
   `handoff_supersedes_ref` when replacing a prior handoff and omit
   `remember_text`.

Never put a raw transcript, prompt, tool input or response, secret, credential,
denied content, or unbounded file excerpt into any of the three memories or the
handoff. `fractal_remember` and `fractal_finish` are non-idempotent on the
required runtime. After a failure, timeout, malformed response, or partial
receipt, stop writes and never blindly retry. Inspect only with bounded
`fractal_status` and `fractal_recall`, retain every returned ref and stage, and
report the result as indeterminate unless durable state proves it.

Finish PASS plus an exact admitted handoff ref proves that closure was Fabric
Recorded. It does not by itself prove fresh-process recovery. That later proof
uses exactly `fractal_status -> fractal_begin -> fractal_recall` in a genuinely
fresh process and must recover the exact decision or handoff ref. Do not
substitute `fractal_rehydrate` in the fresh process, and do not repeat Finish
because this verification is pending or stale.

When any prerequisite is absent, return
`durable_closure_path_unavailable`. A Git commit, Markdown handoff, or plugin
event log may preserve work operationally, but none qualifies as `Fabric
Recorded` without an exact durable judgment/receipt reference.

## Required attribution

A successful continuity report names the harness, agent/session identity,
scope, authority, close time, handoff reference, handoff digest or commitment,
and evidence references. Team visibility always requires a separate explicit
sharing action and receipt.
