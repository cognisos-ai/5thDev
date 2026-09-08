# Fabric Agent adapter capabilities

Contract version: `1.0.0-draft.1`

This reference separates source implementation from activation and release
evidence. A hook definition on disk is not proof that a host trusted or fired
it.

## Codex source adapter

The Codex source adapter registers `SessionStart`, `PreCompact`,
`PostCompact`, and `SessionEnd`. It is off by default and projects only
allowlisted session and compaction metadata into a local plugin-data JSONL
file. It does not observe prompts, tool calls, permissions, assistant output,
or subagent output.

## Claude Code public beta candidate adapter

The Claude Code source adapter registers:

- `SessionStart` and `SessionEnd`;
- `UserPromptSubmit` without the prompt text;
- `PreToolUse`, `PostToolUse`, and `PostToolUseFailure` without tool input,
  response, or error content;
- `Stop` without assistant content, task descriptions, commands, or cron
  prompts;
- `SubagentStart` and `SubagentStop` without transcripts or messages; and
- `PreCompact` and `PostCompact` without instructions or generated summaries.

The allowlist is limited to the native event name, event time, opaque session,
prompt, tool-use, and agent identifiers when present, tool name, success/failure
outcome, bounded duration, interrupt flag, subagent type, session-end reason,
and compaction trigger. The adapter excludes the working directory, transcript
paths, model, session title, prompt, tool payloads, assistant and subagent
messages, file paths and contents, raw errors, task descriptions and commands,
cron expressions and prompts, compaction instructions, and compaction summary.

The adapter always exits successfully. It does not make policy decisions,
block actions or completion, call an MCP tool, admit memory, start a daemon, or
make a network request. Content-bearing native events therefore carry an
explicit `content_excluded_by_policy` degradation in their projected metadata.

## Evidence ladder

Keep these claims separate:

1. implemented at an exact source revision;
2. deterministically tested from source;
3. installed and trusted in an exact harness version;
4. observed firing in a real host session;
5. independently exercised; and
6. supported as a public release.

Only the evidence actually collected may be claimed. In particular, plugin
installation is not cross-harness conformance, privacy proof for every Fabric
path, completion enforcement, Evidence Complete, or Fabric Verified.
