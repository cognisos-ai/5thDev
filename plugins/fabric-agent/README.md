# Fabric Agent for Claude Code

Fabric Agent adds governed-work classification, evidence-status language, and
continuity guidance to Claude Code.

This first Claude package is deliberately skills-only. It does not bundle an
MCP server or lifecycle hooks. Install and authenticate Fabric MCP separately,
then start a new Claude Code session so the skill and the Fabric tools are both
discovered.

## Requirement

- Fabric MCP `0.2.0-rc.56.4`

## Install from the 5thDev marketplace

```sh
claude plugin marketplace add cognisos-ai/5thDev
claude plugin install fabric-agent@5thdev
```

Restart Claude Code after installation. In the new session, ask Claude to
classify a coding task as passive, tracked, or governed, then confirm it can
call the installed Fabric status tools.

## Package boundary

`Prod_Fabric` is the implementation, verification, and release authority.
This directory is a deterministic public export whose `PROVENANCE.json`
records the exact source revision and file digests. The export intentionally
omits Codex hooks, Claude hooks, and `.mcp.json`.
