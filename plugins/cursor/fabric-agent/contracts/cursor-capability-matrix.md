# Cursor Fabric Agent capability matrix

Contract: `1.0.0-draft.1` · Adapter: `0.1.0-cursor-metadata-candidate` · Stage: source candidate

| Cursor native event | Shared projection | Source status | Limitation |
|---|---|---|---|
| `sessionStart`, `sessionEnd` | `session.started`, `session.ended` | implemented in source | Not available in ordinary Cursor cloud agents; native firing unproven |
| `preToolUse`, `postToolUse`, `postToolUseFailure` | `action.proposed`, `action.succeeded`, `action.failed` | implemented in source | Observation only; inputs, outputs, and raw errors excluded |
| `subagentStart`, `subagentStop` | `delegation.started`, `delegation.completed` | implemented in source | Observation only; Fabric does not spawn or block subagents |
| `preCompact` | `context.loss_imminent` | implemented in source | No documented `postCompact` restoration event |
| `stop` | `response.completed` | implemented in source | No completion gate or receipt emitted by this hook |
| Prompt submission and file reads | none | unavailable in this candidate | No content capture or pre-read sensitive-path enforcement claim |

All source statuses require exact installed package, Cursor version, host trust,
native event, privacy, latency, restart, and recovery evidence before promotion.
The package does not register `beforeReadFile` or `beforeSubmitPrompt`, and does
not change Cursor permissions. Cursor cloud and local results must be reported
separately. This matrix follows the official [Cursor hooks](https://cursor.com/docs/hooks)
and [plugin reference](https://cursor.com/docs/reference/plugins); host behavior
must still be measured at the exact tested version.
