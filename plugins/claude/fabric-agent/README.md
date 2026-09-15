# Fabric Agent for Claude Code

Fabric Agent adds governed-work classification, evidence-status language, and
continuity guidance to Claude Code. Version `0.2.1` hardens the public beta
candidate with selective activation and exact-source export checks while
retaining the native status, continuity, and governance commands plus the
opt-in metadata-only Claude lifecycle adapter from `0.2.0`.

The skill is selectively activated for explicit Fabric/Fractal continuity,
governance, evidence-status, or durable-handoff requests. It also activates
before broad repository inspection for material release, deployment,
migration, privacy, destructive, or blast-radius decisions, routing a named
target through Fabric status, scoped query, and impact first. Ordinary
implementation, review, documentation, tests, explanation, and read-only
exploration stay quiet. The explicit commands below remain available whenever
you choose them.

The package does not bundle another MCP server or handle credentials. Install
and authenticate Fabric MCP separately, then start a new Claude Code session so
the skill, commands, hooks, and Fabric tools are discovered together.

## Requirement

- Fabric MCP `0.2.0-rc.56.5`

## Run the 0.2.1 candidate package

Export this package from the exact reviewed `Prod_Fabric` revision, then launch
Claude Code with the resulting directory:

```sh
npm run export:fabric-agent-claude -- /absolute/path/to/artifacts/claude/fabric-agent
FABRIC_AGENT_LIFECYCLE_LOG=1 claude --plugin-dir /absolute/path/to/artifacts/claude/fabric-agent
```

Run the launch command from the project whose Fabric MCP registration you want
to exercise. The environment flag enables metadata-only lifecycle observation
for that session; omit it to test the commands and skill with observation off.

## Install from the 5thDev marketplace

The commands below install the version currently published by 5thDev. Before a
candidate's 5thDev release PR merges, they continue to resolve to the preceding
public version. Confirm the selected version after installation rather than
assuming candidate bytes are already public:

```sh
claude plugin marketplace add cognisos-ai/5thDev
claude plugin install fabric-agent@5thdev
```

Restart Claude Code after installation. In the new session, ask Claude to
classify a coding task as passive, tracked, or governed, then confirm it can
call the installed Fabric status tools.

## Commands

- `/fabric-agent:fabric-status` checks the Code Indexer and Fractal memory
  authority without conflating their daemon states.
- `/fabric-agent:fabric-continuity` performs bounded status and recall. When
  durable closure is explicitly requested and the local write authority is
  ready, it admits exactly one reviewed retrieval, evaluation, and decision,
  carrying the current session acknowledgment through that ordered chain, then
  calls Finish once with the same acknowledgment, a bounded literal response,
  a 150–600 word `Delta: ... Anchors: ... Next: ...` handoff, the three memory
  refs, captured chain status, and foreground runtime ticking disabled. It never stores raw
  transcripts, prompts, tool payloads, secrets, credentials, denied content, or
  unbounded excerpts, and it never blindly retries an ambiguous or partially
  admitted write. Fresh or restarted sessions—including post-closure recovery
  proof—use
  `status -> begin -> recall`; context restoration inside the same open session
  uses `status -> rehydrate -> recall`. A successful Finish proves only the
  returned durable admission; claim cross-session readiness only after the
  fresh-process route recalls the exact ref. Restart Claude after installing or
  updating the plugin so this routing is loaded.
- `/fabric-agent:fabric-govern` gathers code evidence and reports the honest
  governance result for a proposed change.

## Lifecycle observation

Lifecycle observation is off by default. To enable it, open `/plugin`, select
Fabric Agent, configure `Lifecycle observation`, and reload plugins or start a
new session. For a one-session development smoke, this equivalent environment
flag is also supported:

```sh
FABRIC_AGENT_LIFECYCLE_LOG=1 claude
```

When enabled, Claude Code writes `fabric-agent-events-v1.jsonl` beneath the
plugin's persistent data directory. The adapter observes session, prompt,
tool, completion, subagent, and compaction boundaries, but persists only
allowlisted metadata such as native event, opaque identifiers, tool name,
outcome, duration, and compaction trigger. It does not persist prompts, tool
inputs or responses, assistant or subagent messages, transcript paths, working
directories, model names, file paths, file contents, errors, or credentials.

The hook is non-blocking and local-only. It never calls Fabric MCP, writes
Fractal memory, starts a daemon, or makes a network request. Oversized or
malformed events are skipped with a bounded debug warning. Disabling the option
stops new observation; uninstalling the final plugin scope removes Claude's
persistent plugin-data directory unless the user explicitly keeps it.

This adapter is a public-beta-candidate source implementation. Installation and
deterministic tests do not prove privacy across every product path, completion
enforcement, cross-harness parity, or supported-release status. See
`contracts/claude-capability-matrix.md` for the exact implemented and missing
surface.

## Package boundary

`Prod_Fabric` is the implementation, verification, and release authority.
This directory is a deterministic public export whose `PROVENANCE.json`
records the exact source revision and file digests. The export includes the
reviewed Claude adapter and intentionally omits Codex hooks and `.mcp.json`.
