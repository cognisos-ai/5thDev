---
name: fabric-agent
description: Use for relevant code discovery, caller/dependency investigation, and scoped change analysis; explicit Fabric/Fractal continuity, governance, or handoff; and before material release, deployment, migration, privacy, destructive, or blast-radius decisions. Route material decisions through Fabric status, scoped query, and impact before delegation or broad repository inspection. Keep self-contained edits and unrelated chat quiet; code lookup does not authorize memory writes.
---

# Fabric Agent

Apply the repository's Fabric Agent product contract while helping with coding
work. The canonical source package includes source-verified, default-off
lifecycle adapters. The Codex adapter observes non-content session and
compaction events. The Claude Code public beta candidate adapter observes a broader lifecycle
but persists only allowlisted metadata. The Cursor source candidate translates
its own native hooks into the same metadata event contract; installed activation
and cloud-session coverage are not yet proven. Inspect the installed package and claim
only the components it actually contains. Exact installation, trust, native
execution, and release support remain unproven until separately evidenced.

## Product boundary

- Treat `Prod_Fabric` as the sole implementation, packaging, verification, and
  release authority for this plugin.
- Treat public distribution mirrors as deterministic exports, not as a second
  implementation or release authority. External material may be non-normative
  design context only.
- Treat the coding harness as owner of model execution, permissions, context,
  and orchestration. Claim only the lifecycle events and controls the harness
  actually exposes.
- Keep experimental coordination separate from core memory, privacy,
  governance, evidence, and adapter readiness.
- Never infer content capture from a lifecycle adapter. The Claude adapter may
  receive prompt, tool, assistant, error, and subagent fields from the harness,
  but it discards them and persists only the allowlist documented in
  `references/adapter-capabilities.md`. The Cursor adapter also discards
  content-bearing native fields. Every local event log is opt-in.

## Selective activation

- Use bounded **code-evidence lookup** when a coding, debugging, or review task
  needs unknown symbols, callers, dependencies, or cross-repository impact,
  without the user naming Fabric or an MCP tool. Load the Code Indexer route
  in `references/tool-routing.md`. This is evidence retrieval, not a reason to
  begin a Fractal session, capture memory, or promote work to governed mode.
- Activate for an explicit Fabric Agent, Fabric/Fractal continuity, governed
  evidence-status, or durable handoff request.
- Activate before delegation or broad repository inspection for a material release,
  deployment, migration, privacy-sensitive, destructive, or blast-radius
  decision when Fabric indexed evidence could change the decision or a
  required check. A named code target can be a symbol, path, or named behavior.
  The initial route is
  `fabric_status -> fabric_query -> fabric_impact`; ordinary repository search
  follows as an independent control. A later impact-only call does not satisfy
  this route.
- Stay quiet when indexed evidence cannot help: self-contained local edits,
  supplied-code explanations, prose changes, known test commands, or unrelated
  chat. The task category alone does not prohibit useful retrieval. Do not run
  Fabric status or continuity calls as ceremony.
- Load only the reference needed for the active request. An explicit status,
  continuity, or governance command is an opt-in to that bounded workflow, not
  permission to activate the other planes.

Use this discrimination at the boundary:

| Request | Activation | First route |
|---|---|---|
| Rename a supplied local variable, explain supplied code, update prose, or run a known unit test | quiet | ordinary repository tools |
| Locate an unfamiliar implementation or investigate callers/dependencies during ordinary coding or review | code evidence only | scoped `fabric_status`, then the useful indexed lookup; no memory workflow |
| Decide whether to release, deploy, migrate, delete, change an auth/privacy boundary, or accept a named blast radius | active | `fabric_status -> fabric_query -> fabric_impact` before broad repository inspection |
| Resume in a fresh or restarted agent process | active | `fractal_status -> fractal_begin -> fractal_recall` |
| Restore context inside the same open agent session | active | `fractal_status -> fractal_rehydrate -> fractal_recall` |

If the harness denies an activated Fabric tool, report the denied evidence once
and continue with ordinary tools only when the risk boundary allows it. Never
claim the denied call ran, and never replace missing indexed evidence with an
unsupported Fabric claim.

For material work delegated to another agent, the parent keeps responsibility
for activation. Before issuing `Agent` or `Task`, complete
`fabric_status -> fabric_query -> fabric_impact` for the named symbol, path, or
behavior. An empty query result does not waive the impact call; preserve the
empty result and assess the named target honestly. Never invent a target identifier
to complete this route: use the named target only if the observed schema
supports it; otherwise report the impact prerequisite unavailable and withhold
the material sign-off or delegation that depends on it. Then give the delegate
the exact repository scope, target, evidence refs, and freshness. Require it to
return exact Fabric receipts for independent graph work; a prose statement
that it used Fabric is not a receipt. A read-only continuity delegate follows
the same fresh-session versus in-session distinction and must not turn a
no-persistence instruction into permission for `fractal_begin` or
`fractal_rehydrate`.

## Workflow

1. Ground the exact repository, branch, source revision, installed plugin
   version, harness, and available evidence. Label missing identities.
2. Classify the request:
   - `passive`: read-only explanation or exploration with no material effect.
   - `tracked`: small reversible work that benefits from continuity.
   - `governed`: meaningful, risky, external, destructive, privacy-sensitive,
     release, or migration work requiring named evidence.
3. When scoped code evidence could answer an unresolved task question, use
   `references/tool-routing.md` without starting a memory workflow. For a
   governed material code decision with a named target, load
   `references/tool-routing.md` and run the early
   `fabric_status -> fabric_query -> fabric_impact` route before broad
   repository inspection. Then use ordinary repository search as an
   independent control. Stop and label the indexed evidence unavailable when
   scope, freshness, tool availability, or permission prevents that route.
4. For tracked or governed work that depends on prior project context, apply
   the activation and continuity workflow in
   `references/memory-lifecycle.md`. Do not treat Git state, the lifecycle JSONL
   log, or an empty tool result as a Fractal handoff.
5. For governed work, state the required checks before implementation. Preserve
   missing, failed, stale, or unobservable checks as blockers.
6. Perform only the authorized work. Do not infer a successful validation from
   an agent statement or from the presence of a config file.
7. Report status using only the canonical vocabulary:
   - `Fabric Recorded`: durable admission and exact receipt/ref exist.
   - `Evidence Complete`: every check in the named evidence profile passed.
   - `Fabric Verified`: an independent verifier validated the exact evidence
     packet and identities.
8. End governed work with the result, evidence references, limitations,
   overrides, and a concise handoff when continuity is useful.

Read `references/tool-routing.md` when code-index evidence, exact Fractal tool
routing, or Shared Fabric boundaries matter. Read
`references/adapter-capabilities.md` before making a hook, privacy, or
cross-harness capability claim.

## Continuity boundary

- Keep unrelated passive work quiet; do not begin or close a memory workflow.
- Before required recall, verify the Fractal authority with `fractal_status`.
  A configured path or healthy code index does not establish memory authority.
- Decide the lifecycle mode from the request before selecting tools. Explicit
  fresh-session, new-process, restarted-agent, reconnect, or previous-session
  language selects `fractal_begin`; do not substitute `fractal_rehydrate`.
  Explicit same-open-session, compaction, or context-restoration language
  selects `fractal_rehydrate`; do not substitute `fractal_begin`.
- For a new-session resume use exactly `fractal_status -> fractal_begin ->
  fractal_recall`. For in-session restoration use exactly `fractal_status ->
  fractal_rehydrate -> fractal_recall`. Both acknowledgments may write and
  therefore require an authorized write surface. An explicitly read-only
  request, or unavailable write authority, permits bounded recall without an
  acknowledgment only when read permission and exact source scope are proven.
  Label it `read_only_recall`, not a resumed lifecycle. If read permission or
  source scope is unproven, stop recall and report the access/scope gap.
- Close material tracked or governed work only when the user requested durable
  closure and status proves the current scope, an authorized local write
  surface, `fractal_remember`, and `fractal_finish`. Use the command's approved
  composed route: exactly three reviewed, bounded, serial memories in the same
  session—`retrieval -> evaluation -> decision`—then exactly one Finish with
  `text` set to the bounded literal final response, a 150–600 word
  `handoff_text` formatted in exact `Delta: ... Anchors: ... Next: ...` order,
  `evidence_refs: [acknowledgment_ref]`, their ordered refs,
  `cognitive_chain_status: captured`, and `runtime_tick: false`. The retrieval
  cites the current session acknowledgment; the evaluation cites that
  acknowledgment then the retrieval ref; the decision cites that acknowledgment,
  retrieval ref, and evaluation ref in that order.
- Never copy a raw transcript, prompt, tool input or response, secret,
  credential, denied content, or unbounded file excerpt into any memory or
  handoff. A correction cites the exact superseded handoff when applicable.
- `fractal_remember` and `fractal_finish` are non-idempotent on the required
  runtime. After any failure, timeout, malformed response, or partial receipt,
  stop writes and never blindly retry; use bounded status/recall inspection and
  preserve every returned ref and stage. Claim `Fabric Recorded` only after a
  PASS with an exact admitted handoff ref.
- Prove later cross-session recovery in a genuinely fresh process with exactly
  `fractal_status -> fractal_begin -> fractal_recall`. Do not substitute
  `fractal_rehydrate`; that acknowledgment is for restoration in the same open
  session. If any prerequisite for the composed route is missing, report
  `durable_closure_path_unavailable`, preserve a repository handoff as a
  non-Fabric fallback, and do not claim `Fabric Recorded`.
- Never write team memory directly. Team continuity requires an explicit share
  workflow and its own grant/receipt.
- A lifecycle hook event proves only that the named metadata event was locally
  observed. It is not a durable memory admission or completion receipt.

## Claim discipline

- Source, unit tests, synthetic fixtures, installation, host trust, native hook
  execution, independent exercise, and supported release are separate facts.
- Never promote a source-only or synthetic result into installed or public
  product evidence.
- Use plain `recorded`, `complete`, or `verified` only when the surrounding text
  names what was recorded, completed, or verified.
- If evidence is incomplete, say `blocked` or `unproven` and name the next
  concrete check.

The normative maintainer contract lives at
`docs/adr/0002-fabric-agent-plugin-product-contract.md` in the authoritative
`Prod_Fabric` source repository. The bundled workflow above is the operational
contract for skills-only distributions.
