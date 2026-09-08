# Claude Code adapter capability matrix

Stage: public beta candidate

Product contract: `1.0.0-draft.1`

Required runtime: Fabric MCP `0.2.0-rc.56.4`

| Lifecycle need | Claude native event | Current adapter behavior | Control | Status |
|---|---|---|---|---|
| Session start/resume | `SessionStart` | Records source and opaque session identity | observe | implemented in source |
| User intent | `UserPromptSubmit` | Records opaque prompt identity; discards prompt | observe | partial by policy |
| Proposed action | `PreToolUse` | Records tool name and opaque tool-use identity; discards input | observe only | partial by policy |
| Successful action | `PostToolUse` | Records tool name, outcome, and duration; discards input/response | observe | partial by policy |
| Failed action | `PostToolUseFailure` | Records tool name, outcome, duration, and interrupt flag; discards input/error | observe | partial by policy |
| Main response completion | `Stop` | Records completion boundary and only counts of in-flight background/cron work | observe only | partial by policy |
| Delegation | `SubagentStart`, `SubagentStop` | Records opaque agent identity/type and boundary; discards transcript/messages | observe only | partial by policy |
| Context loss/restoration | `PreCompact`, `PostCompact` | Records trigger; discards instructions and generated summary | observe only | implemented in source |
| Session termination | `SessionEnd` | Records exact documented exit reason | observe | implemented in source |
| Permission decision | `PermissionRequest`, `PermissionDenied` | Not registered | none | absent |
| File changes outside tools | `FileChanged` | Not registered | none | absent |
| Validation semantics | none universal | Tool success/failure is not relabeled as validation evidence | none | absent |
| Completion governance | `Stop` can block | Adapter deliberately never blocks | none | absent |
| Memory admission | Fabric MCP workflow | Skill/command guidance only; hooks never write memory | harness/tool dependent | degraded when unavailable |
| Evidence receipt | Fabric MCP workflow | Reports only exact refs returned by an approved product path | harness/tool dependent | degraded when unavailable |

## Claim boundary

The event schema and source tests establish deterministic source behavior only.
They do not establish host trust, real native firing, secret exclusion across
all enabled product paths, latency conformance on all platforms, independent
exercise, cross-harness parity, or supported public release.

The adapter fails open: malformed, oversized, or unwritable events are skipped
without blocking Claude. This is correct for local metadata observation and is
not sufficient for a future fail-closed governance gate.
