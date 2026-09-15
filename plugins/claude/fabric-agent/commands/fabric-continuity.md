---
description: Resume relevant Fabric continuity or close a bounded governed handoff; for a compound code blast-radius request, complete Fabric status, query, and impact before delegation
allowed-tools:
  - mcp__fabric__fabric_status
  - mcp__fabric__fabric_query
  - mcp__fabric__fabric_impact
  - mcp__fabric__fractal_status
  - mcp__fabric__fractal_begin
  - mcp__fabric__fractal_recall
  - mcp__fabric__fractal_rehydrate
  - mcp__fabric__fractal_ask
  - mcp__fabric__fractal_remember
  - mcp__fabric__fractal_finish
---

# Fabric Continuity

Follow the Fabric Agent memory lifecycle for the current task only.

1. First classify whether this is a compound request. If the same request also
   asks for a material release, deployment, migration, privacy, destructive,
   or blast-radius decision about a named symbol, path, or behavior, complete
   `fabric_status -> fabric_query -> fabric_impact` before `Agent`, `Glob`,
   `Read`, `Grep`, or other broad repository inspection. The parent agent owns
   this code-evidence route and must preserve its exact receipts when
   reconciling delegated work. An empty `fabric_query` result does not waive
   `fabric_impact`; assess the named target and preserve the empty result as a
   limitation. Use ordinary repository search afterward as a control.
   Otherwise remain on the Fractal continuity plane and do not call Code
   Indexer tools merely because they are allowlisted.
2. Before selecting continuity tools, classify that part of the invocation as
   exactly one mode:
   - **new session** when the request says fresh session, new process, restart,
     reconnect, or resume the previous session;
   - **in-session restoration** when it says the same open session, compaction,
     or restore this session's context; or
   - **closure** when it asks to finish or hand off current work.
   If resume wording is ambiguous, ask which session mode applies.
3. Call `fractal_status` and verify the exact store, repository scope,
   authority mode, product health, and available tools.
4. For **new session**, when the status gate passes, execute exactly
   `fractal_status -> fractal_begin -> fractal_recall`; include
   `fractal_begin` when selecting tools and never substitute
   `fractal_rehydrate`. For **in-session restoration**, when the gate passes,
   execute exactly `fractal_status -> fractal_rehydrate -> fractal_recall` and
   never substitute `fractal_begin`.
5. An explicitly read-only request or a status that does not prove an
   authorized write surface must not call either acknowledgment. Continue with
   bounded recall only when allowed, label it `read_only_recall`, and do not
   claim the lifecycle was resumed. A synthetic observer does not authorize a
   write acknowledgment.
6. Use bounded `fractal_recall` or `fractal_ask` for only the prior decisions
   that could change the current work. Distinguish admitted evidence from
   inference and treat an empty established store as honest genesis.
7. For **closure**, continue only when the user requested durable closure and
   `fractal_status` proves the current repository scope, an authorized local
   write surface, and both `fractal_remember` and `fractal_finish`. Use one
   stable current `session_id` and preserve its exact `acknowledgment_ref`. If
   that session does not already have a proved acknowledgment ref, call
   `fractal_rehydrate` once before writing and preserve the ref it returns;
   this is the same-open-session acknowledgment, not the fresh-process recovery
   route.
8. Prepare a reviewed 150–600 word `handoff_text` with the bounded outcome,
   decisions, exact source revision, evidence references, material limitations,
   and next action. Format it as one string with these exact labels in order:
   `Delta: ... Anchors: ... Next: ...`. Exclude every raw transcript, prompt,
   tool input or response, secret, credential, denied item, and unbounded file
   excerpt.
9. Call `fractal_remember` exactly three times, serially, for this closure:
   - one bounded `retrieval` containing only the evidence that changed the
     work with `evidence_refs: [acknowledgment_ref]`;
   - one bounded `evaluation` with
     `evidence_refs: [acknowledgment_ref, retrieval_ref]`; and
   - one bounded `decision` with
     `evidence_refs: [acknowledgment_ref, retrieval_ref, evaluation_ref]`.
   Preserve each returned `judgment_ref`. Do not make the next write unless the
   preceding call returned `PASS` with an exact, unique ref and retained the
   expected ordered evidence suffix. Do not use these writes to store a
   transcript or to manufacture evidence.
10. Call `fractal_finish` exactly once with `text` set to the bounded literal
    final response, `handoff_text` set to the reviewed 150–600 word labeled
    handoff, `evidence_refs: [acknowledgment_ref]`, the three ordered memory refs
    as `cognitive_chain_refs`,
    `cognitive_chain_status: captured`, and `runtime_tick: false`. Include the
    exact prior handoff as `handoff_supersedes_ref` when this closure replaces
    one. Do not also supply `remember_text`.
11. Treat every `fractal_remember` and `fractal_finish` as non-idempotent. After
    a failure, timeout, malformed response, or partial receipt, stop writes and
    never blindly retry. Inspect only with bounded `fractal_status` and
    `fractal_recall`, preserve every returned ref and stage, and report the
    result as indeterminate unless the durable state proves it.
12. Report `Fabric Recorded` only when Finish returns `PASS` and an exact
    admitted handoff ref. Cross-session readiness is a separate claim: in a
    genuinely fresh process prove it with exactly `fractal_status ->
    fractal_begin -> fractal_recall`, using the new session id and a query that
    returns the exact decision or handoff ref. Never substitute
    `fractal_rehydrate` in that fresh process and never repeat Finish merely
    because recovery proof is pending.

If any closure prerequisite is absent, report
`durable_closure_path_unavailable`, preserve a repository handoff only as a
non-Fabric fallback, and do not claim Fabric Recorded.
