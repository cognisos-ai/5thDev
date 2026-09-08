# Fabric Agent for Claude Code

Fabric Agent adds governed-work classification, evidence-status language, and
continuity guidance to Claude Code. Version `0.2.0` is the larger public beta
candidate: it adds native status, continuity, and governance commands plus
an opt-in metadata-only Claude lifecycle adapter.

The package does not bundle another MCP server or handle credentials. Install
and authenticate Fabric MCP separately, then start a new Claude Code session so
the skill, commands, hooks, and Fabric tools are discovered together.

## Requirement

- Fabric MCP `0.2.0-rc.56.4`

## Run the 0.2.0 candidate package

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
- `/fabric-agent:fabric-continuity` performs the bounded status, resume/recall,
  and approved-finish workflow.
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
