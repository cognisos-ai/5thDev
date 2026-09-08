#!/usr/bin/env node

'use strict'

const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')

const CONTRACT_VERSION = '1.0.0-draft.1'
const ADAPTER_VERSION = '0.2.0-metadata-only'
const LOG_FILE = 'fabric-agent-events-v1.jsonl'
const MAX_INPUT_BYTES = 512 * 1024
const ENABLE_ENV = 'FABRIC_AGENT_LIFECYCLE_LOG'
const OPTION_ENV = 'CLAUDE_PLUGIN_OPTION_LIFECYCLE_OBSERVATION'

const DEGRADATIONS = Object.freeze({
  SessionStart: { status: 'full', reason_code: null, missing_fields: [] },
  UserPromptSubmit: {
    status: 'partial',
    reason_code: 'content_excluded_by_policy',
    missing_fields: ['prompt'],
  },
  PreToolUse: {
    status: 'partial',
    reason_code: 'content_excluded_by_policy',
    missing_fields: ['tool_input'],
  },
  PostToolUse: {
    status: 'partial',
    reason_code: 'content_excluded_by_policy',
    missing_fields: ['tool_input', 'tool_response'],
  },
  PostToolUseFailure: {
    status: 'partial',
    reason_code: 'content_excluded_by_policy',
    missing_fields: ['tool_input', 'error'],
  },
  Stop: {
    status: 'partial',
    reason_code: 'content_excluded_by_policy',
    missing_fields: ['last_assistant_message', 'background_task_details', 'session_cron_details'],
  },
  SubagentStart: { status: 'full', reason_code: null, missing_fields: [] },
  SubagentStop: {
    status: 'partial',
    reason_code: 'content_excluded_by_policy',
    missing_fields: ['agent_transcript_path', 'last_assistant_message'],
  },
  PreCompact: {
    status: 'partial',
    reason_code: 'content_excluded_by_policy',
    missing_fields: ['custom_instructions'],
  },
  PostCompact: {
    status: 'partial',
    reason_code: 'content_excluded_by_policy',
    missing_fields: ['compact_summary'],
  },
  SessionEnd: { status: 'full', reason_code: null, missing_fields: [] },
})

const ALLOWED_VALUES = Object.freeze({
  SessionStart: { field: 'source', values: ['startup', 'resume', 'clear', 'compact', 'fork'] },
  PreCompact: { field: 'trigger', values: ['manual', 'auto'] },
  PostCompact: { field: 'trigger', values: ['manual', 'auto'] },
  SessionEnd: {
    field: 'reason',
    values: ['clear', 'resume', 'logout', 'prompt_input_exit', 'other'],
  },
})

function stableId(value, label) {
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,255}$/.test(value)) {
    throw new Error(`invalid_${label}`)
  }
  return value
}

function optionalStableId(target, key, value) {
  if (value !== undefined) target[key] = stableId(value, key)
}

function optionalDuration(payload, value) {
  if (value === undefined) return
  if (!Number.isFinite(value) || value < 0 || value > 86_400_000) {
    throw new Error('invalid_duration_ms')
  }
  payload.duration_ms = Math.round(value)
}

function requireNativeShape(nativeEvent, input) {
  if (!input || input.hook_event_name !== nativeEvent || !Object.hasOwn(DEGRADATIONS, nativeEvent)) {
    throw new Error('unsupported_hook_event')
  }

  const allowed = ALLOWED_VALUES[nativeEvent]
  if (allowed && !allowed.values.includes(input[allowed.field])) {
    throw new Error('invalid_native_metadata')
  }

  if (nativeEvent === 'UserPromptSubmit' && typeof input.prompt !== 'string') {
    throw new Error('invalid_native_metadata')
  }
  if (['PreToolUse', 'PostToolUse', 'PostToolUseFailure'].includes(nativeEvent)) {
    stableId(input.tool_name, 'tool_name')
    stableId(input.tool_use_id, 'tool_use_id')
  }
  if (nativeEvent === 'Stop' && typeof input.stop_hook_active !== 'boolean') {
    throw new Error('invalid_native_metadata')
  }
  if (['SubagentStart', 'SubagentStop'].includes(nativeEvent)) {
    stableId(input.agent_id, 'agent_id')
    stableId(input.agent_type, 'agent_type')
  }
}

function payloadFor(nativeEvent, input) {
  const payload = {}
  switch (nativeEvent) {
    case 'SessionStart':
      payload.source = input.source
      break
    case 'UserPromptSubmit':
      payload.content_policy = 'metadata_only'
      break
    case 'PreToolUse':
      payload.tool_name = stableId(input.tool_name, 'tool_name')
      payload.content_policy = 'metadata_only'
      break
    case 'PostToolUse':
      payload.tool_name = stableId(input.tool_name, 'tool_name')
      payload.outcome = 'success'
      optionalDuration(payload, input.duration_ms)
      payload.content_policy = 'metadata_only'
      break
    case 'PostToolUseFailure':
      payload.tool_name = stableId(input.tool_name, 'tool_name')
      payload.outcome = 'failure'
      payload.interrupted = input.is_interrupt === true
      optionalDuration(payload, input.duration_ms)
      payload.content_policy = 'metadata_only'
      break
    case 'Stop':
      payload.background_task_count = Array.isArray(input.background_tasks)
        ? input.background_tasks.length
        : 0
      payload.session_cron_count = Array.isArray(input.session_crons)
        ? input.session_crons.length
        : 0
      payload.content_policy = 'metadata_only'
      break
    case 'SubagentStart':
      payload.agent_type = stableId(input.agent_type, 'agent_type')
      break
    case 'SubagentStop':
      payload.agent_type = stableId(input.agent_type, 'agent_type')
      payload.content_policy = 'metadata_only'
      break
    case 'PreCompact':
    case 'PostCompact':
      payload.reason_code = 'native_compaction'
      payload.trigger = input.trigger
      break
    case 'SessionEnd':
      payload.reason_code = 'host_session_end'
      payload.reason = input.reason
      break
    default:
      throw new Error('unsupported_hook_event')
  }
  return payload
}

const EVENT_TYPES = Object.freeze({
  SessionStart: 'session.started',
  UserPromptSubmit: 'intent.observed',
  PreToolUse: 'action.proposed',
  PostToolUse: 'action.succeeded',
  PostToolUseFailure: 'action.failed',
  Stop: 'response.completed',
  SubagentStart: 'delegation.started',
  SubagentStop: 'delegation.completed',
  PreCompact: 'context.loss_imminent',
  PostCompact: 'context.restored',
  SessionEnd: 'session.ended',
})

function projectLifecycleEvent(nativeEvent, input, observedAt = new Date()) {
  requireNativeShape(nativeEvent, input)

  const context = { session_id: stableId(input.session_id, 'session_id') }
  optionalStableId(context, 'prompt_id', input.prompt_id)
  optionalStableId(context, 'tool_use_id', input.tool_use_id)
  optionalStableId(context, 'agent_id', input.agent_id)

  const timestamp = observedAt.toISOString()
  return {
    schema: 'prod_fabric.fabric_agent.agent-event',
    schema_version: 1,
    contract_version: CONTRACT_VERSION,
    event_id: `fabric-agent:${crypto.randomUUID()}`,
    event_type: EVENT_TYPES[nativeEvent],
    occurred_at: timestamp,
    observed_at: timestamp,
    source: {
      harness: 'claude_code',
      harness_version: 'claude-code-hooks-v2',
      adapter_id: 'fabric-claude-code',
      adapter_version: ADAPTER_VERSION,
      native_event: nativeEvent,
      transport: 'plugin_hook',
      observation: 'exact',
    },
    context,
    authority: { mode: 'individual', policy_refs: [] },
    capability: { mode: 'observe' },
    degradation: DEGRADATIONS[nativeEvent],
    payload: payloadFor(nativeEvent, input),
  }
}

function appendEvent(pluginData, event) {
  if (typeof pluginData !== 'string' || !path.isAbsolute(pluginData)) {
    throw new Error('plugin_data_unavailable')
  }
  fs.mkdirSync(pluginData, { recursive: true, mode: 0o700 })
  const dataStat = fs.lstatSync(pluginData)
  if (!dataStat.isDirectory() || dataStat.isSymbolicLink()) throw new Error('unsafe_plugin_data')

  const logPath = path.join(pluginData, LOG_FILE)
  if (fs.existsSync(logPath)) {
    const logStat = fs.lstatSync(logPath)
    if (!logStat.isFile() || logStat.isSymbolicLink()) throw new Error('unsafe_log_path')
  }
  fs.appendFileSync(logPath, `${JSON.stringify(event)}\n`, { encoding: 'utf8', mode: 0o600 })
  fs.chmodSync(logPath, 0o600)
}

function isEnabled(environment = process.env) {
  const option = String(environment[OPTION_ENV] ?? '').toLowerCase()
  return environment[ENABLE_ENV] === '1' || option === '1' || option === 'true'
}

function reportSkipped(code) {
  process.stderr.write(`Fabric Agent Claude lifecycle observation skipped (${code}).\n`)
}

function run() {
  if (!isEnabled()) return

  const nativeEvent = process.argv[2]
  if (!Object.hasOwn(DEGRADATIONS, nativeEvent)) {
    reportSkipped('unsupported_event')
    return
  }

  let input = ''
  let oversized = false
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (chunk) => {
    if (oversized) return
    input += chunk
    if (Buffer.byteLength(input, 'utf8') > MAX_INPUT_BYTES) {
      oversized = true
      input = ''
    }
  })
  process.stdin.on('end', () => {
    try {
      if (oversized) throw new Error('input_too_large')
      const event = projectLifecycleEvent(nativeEvent, JSON.parse(input))
      appendEvent(process.env.CLAUDE_PLUGIN_DATA, event)
    } catch (error) {
      const code = error instanceof Error && /^[a-z0-9_]+$/.test(error.message)
        ? error.message
        : 'invalid_hook_input'
      reportSkipped(code)
    }
  })
  process.stdin.resume()
}

if (require.main === module) run()

module.exports = {
  ADAPTER_VERSION,
  DEGRADATIONS,
  ENABLE_ENV,
  EVENT_TYPES,
  LOG_FILE,
  OPTION_ENV,
  isEnabled,
  projectLifecycleEvent,
}
