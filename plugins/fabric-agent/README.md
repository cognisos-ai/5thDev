# Fabric Agent for ChatGPT and Codex

Fabric Agent adds governed-work classification, evidence-status language, and
continuity guidance to supported ChatGPT and Codex plugin surfaces. This
`0.2.1` candidate contains the shared Fabric Agent skill plus Codex-compatible,
opt-in metadata-only lifecycle hooks.

The package does not bundle Fabric MCP or credentials. Install and authenticate
Fabric MCP separately, then start a new conversation so the skill and available
Fabric tools are discovered together.

## Requirement

- Fabric MCP `0.2.0-rc.56.5`

## Candidate installation

The public 5thDev repository is the distribution boundary. A repository
marketplace installation for Codex uses:

```sh
codex plugin marketplace add cognisos-ai/5thDev
codex plugin add fabric-agent@5thdev
```

Start a new Codex session after installation. Review and trust the four
Fabric Agent hook definitions before enabling lifecycle observation.

ChatGPT and Codex share the OpenAI plugin directory, but repository publication
is not proof that this candidate has been accepted into that public directory.
Web installation also does not deploy local hook scripts. Treat public-directory
listing, MCP connection/authentication, local hook trust, and native hook firing
as separate evidence gates.

## Lifecycle observation

Lifecycle observation is off by default. For a one-session Codex smoke, launch:

```sh
FABRIC_AGENT_LIFECYCLE_LOG=1 codex
```

When enabled, the hooks append only allowlisted session and compaction metadata
to the harness-provided plugin data directory. They exclude working directories,
transcript paths, prompts, tool input/output, assistant messages, model names,
file paths, file contents, errors, and credentials. The hooks make no network
requests and do not write Fractal memory.

## Evidence boundary

`PROVENANCE.json` binds every exported file to the exact private Prod_Fabric
source revision and SHA-256 digest. Deterministic export and manifest validation
do not prove public-directory acceptance, installed activation, Fabric MCP
readiness, cross-harness parity, or supported-release status.
