# Fabric Agent for Cursor — source candidate

This Prod_Fabric-owned Cursor Plugin packages the shared Fabric Agent skill and
a Cursor-native metadata-only hook adapter. It does not bundle Fabric MCP,
credentials, a memory engine, or a policy-enforcement hook. Install and
authenticate Fabric MCP separately for the project being tested.

The repository marketplace entry is `.cursor-plugin/marketplace.json`. For an
isolated local source check, copy an exact exported package into
`~/.cursor/plugins/local/fabric-agent`, then reload or restart Cursor and inspect
**Customize → Hooks**. Local plugin imports may be disabled by team policy; a
marketplace plugin of the same name may take precedence. Neither source tests
nor this install procedure establish native hook execution.

Lifecycle logging is off by default. For a controlled local smoke, launch Cursor
with `FABRIC_AGENT_LIFECYCLE_LOG=1` and set
`FABRIC_AGENT_CURSOR_LOG_DIR` to a dedicated, absolute, current-user-owned
directory with mode `0700`. The adapter creates
`fabric-agent-events-v1.jsonl` there with mode `0600`. Without both settings it
does not persist events. Disable logging by removing the environment flag;
remove the test log directory separately after reviewing its contents.

The adapter emits neutral JSON responses so it does not intentionally deny or
modify Cursor actions. It records only allowlisted metadata and never sends a
network request. See `contracts/cursor-capability-matrix.md` for event coverage,
cloud limitations, and what remains unproven. Do not infer Fabric Recorded,
Evidence Complete, Fabric Verified, or release support from these hooks.
