---
name: fabric-agent
description: Classify coding work as passive, tracked, or governed; identify evidence requirements; report Fabric Recorded, Evidence Complete, or Fabric Verified status without overclaiming. Use for implementation, review, migration, release, privacy, continuity, or handoff work governed by the Fabric Agent product contract.
---

# Fabric Agent

Apply the repository's Fabric Agent product contract while helping with coding
work. The canonical source package includes source-verified, default-off
lifecycle adapters. The Codex adapter observes non-content session and
compaction events. The Claude Code public beta candidate adapter observes a broader lifecycle
but persists only allowlisted metadata. Inspect the installed package and claim
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
  `references/adapter-capabilities.md`. Every local event log is opt-in.

## Workflow

1. Ground the exact repository, branch, source revision, installed plugin
   version, harness, and available evidence. Label missing identities.
2. Classify the request:
   - `passive`: read-only explanation or exploration with no material effect.
   - `tracked`: small reversible work that benefits from continuity.
   - `governed`: meaningful, risky, external, destructive, privacy-sensitive,
     release, or migration work requiring named evidence.
3. For tracked or governed work that depends on prior project context, apply
   the activation and continuity workflow in
   `references/memory-lifecycle.md`. Do not treat Git state, the lifecycle JSONL
   log, or an empty tool result as a Fractal handoff.
4. For governed work, state the required checks before implementation. Preserve
   missing, failed, stale, or unobservable checks as blockers.
5. Perform only the authorized work. Do not infer a successful validation from
   an agent statement or from the presence of a config file.
6. Report status using only the canonical vocabulary:
   - `Fabric Recorded`: durable admission and exact receipt/ref exist.
   - `Evidence Complete`: every check in the named evidence profile passed.
   - `Fabric Verified`: an independent verifier validated the exact evidence
     packet and identities.
7. End governed work with the result, evidence references, limitations,
   overrides, and a concise handoff when continuity is useful.

Read `references/tool-routing.md` when code-index evidence, exact Fractal tool
routing, or Shared Fabric boundaries matter. Read
`references/adapter-capabilities.md` before making a hook, privacy, or
cross-harness capability claim.

## Continuity boundary

- Keep unrelated passive work quiet; do not begin or close a memory workflow.
- Before required recall, verify the Fractal authority with `fractal_status`.
  A configured path or healthy code index does not establish memory authority.
- For a new-session resume use `fractal_begin` followed by bounded
  `fractal_recall`. For in-session context restoration use `fractal_rehydrate`
  followed by bounded `fractal_recall`. Both begin and rehydrate may admit a
  local acknowledgment and therefore require an authorized write surface.
- Close material tracked or governed work only through the approved curated
  finish path, with a reviewed bounded handoff and evidence references. Never
  copy a raw transcript, prompt, tool payload, secret, or denied content into a
  handoff.
- Do not invoke raw `fractal_remember`. If the exact activated product surface
  requires a cognitive chain but offers no approved composed route to create
  it, report `durable_closure_path_unavailable`; preserve a repository handoff
  as a non-Fabric fallback and do not claim `Fabric Recorded`.
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
