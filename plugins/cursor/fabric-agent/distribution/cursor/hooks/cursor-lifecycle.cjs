#!/usr/bin/env node

'use strict'

const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')

const CONTRACT_VERSION = '1.0.0-draft.1'
const ADAPTER_VERSION = '0.1.0-cursor-metadata-candidate'
const ENABLE_ENV = 'FABRIC_AGENT_LIFECYCLE_LOG'
const DATA_ENV = 'FABRIC_AGENT_CURSOR_LOG_DIR'
const LOG_FILE = 'fabric-agent-events-v1.jsonl'
const MAX_INPUT_BYTES = 512 * 1024

const EVENTS = Object.freeze({
  sessionStart: ['session.started', 'full', []],
  sessionEnd: ['session.ended', 'partial', ['error_message']],
  preToolUse: ['action.proposed', 'partial', ['tool_input', 'agent_message']],
  postToolUse: ['action.succeeded', 'partial', ['tool_input', 'tool_output']],
  postToolUseFailure: ['action.failed', 'partial', ['tool_input', 'error_message']],
  subagentStart: ['delegation.started', 'partial', ['task', 'subagent_model']],
  subagentStop: ['delegation.completed', 'partial', ['task', 'summary', 'modified_files']],
  preCompact: ['context.loss_imminent', 'full', []],
  stop: ['response.completed', 'full', []],
})

function stableId(value, label) {
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,255}$/.test(value)) {
    throw new Error(`invalid_${label}`)
  }
  return value
}

function oneOf(value, choices) {
  if (!choices.includes(value)) throw new Error('invalid_native_metadata')
  return value
}

function payloadFor(nativeEvent, input) {
  switch (nativeEvent) {
    case 'sessionStart':
      return typeof input.is_background_agent === 'boolean'
        ? { background_agent: input.is_background_agent }
        : {}
    case 'sessionEnd':
      return {
        reason_code: 'host_session_end',
        reason: oneOf(input.reason, ['completed', 'aborted', 'error', 'window_close', 'user_close']),
      }
    case 'preToolUse':
      return { tool_name: stableId(input.tool_name, 'tool_name'), content_policy: 'metadata_only' }
    case 'postToolUse':
      return { tool_name: stableId(input.tool_name, 'tool_name'), outcome: 'success', content_policy: 'metadata_only' }
    case 'postToolUseFailure':
      return {
        tool_name: stableId(input.tool_name, 'tool_name'),
        outcome: 'failure',
        failure_type: oneOf(input.failure_type, ['error', 'timeout', 'permission_denied']),
        content_policy: 'metadata_only',
      }
    case 'subagentStart':
      return { agent_type: stableId(input.subagent_type, 'subagent_type'), content_policy: 'metadata_only' }
    case 'subagentStop':
      return {
        agent_type: stableId(input.subagent_type, 'subagent_type'),
        outcome: oneOf(input.status, ['completed', 'error', 'aborted']),
        content_policy: 'metadata_only',
      }
    case 'preCompact':
      return { reason_code: 'native_compaction', trigger: oneOf(input.trigger, ['manual', 'auto']) }
    case 'stop':
      return { outcome: oneOf(input.status, ['completed', 'error', 'aborted']) }
    default:
      throw new Error('unsupported_hook_event')
  }
}

function projectLifecycleEvent(nativeEvent, input, observedAt = new Date()) {
  if (!Object.hasOwn(EVENTS, nativeEvent) || !input || input.hook_event_name !== nativeEvent) {
    throw new Error('unsupported_hook_event')
  }
  const [eventType, status, missingFields] = EVENTS[nativeEvent]
  const context = {
    session_id: stableId(input.conversation_id ?? input.session_id, 'session_id'),
  }
  if (input.generation_id !== undefined) context.turn_id = stableId(input.generation_id, 'turn_id')
  if (input.tool_use_id !== undefined) context.tool_use_id = stableId(input.tool_use_id, 'tool_use_id')
  if (input.subagent_id !== undefined) context.agent_id = stableId(input.subagent_id, 'agent_id')
  const harnessVersion = stableId(input.cursor_version, 'cursor_version')
  if (harnessVersion.length > 64) throw new Error('invalid_cursor_version')
  const timestamp = observedAt.toISOString()
  return {
    schema: 'prod_fabric.fabric_agent.agent-event',
    schema_version: 1,
    contract_version: CONTRACT_VERSION,
    event_id: `fabric-agent:${crypto.randomUUID()}`,
    event_type: eventType,
    occurred_at: timestamp,
    observed_at: timestamp,
    source: {
      harness: 'cursor',
      harness_version: harnessVersion,
      adapter_id: 'fabric-cursor',
      adapter_version: ADAPTER_VERSION,
      native_event: nativeEvent,
      transport: 'plugin_hook',
      observation: 'exact',
    },
    context,
    authority: { mode: 'individual', policy_refs: [] },
    capability: { mode: 'observe' },
    degradation: {
      status,
      reason_code: status === 'partial' ? 'content_excluded_by_policy' : null,
      missing_fields: missingFields,
    },
    payload: payloadFor(nativeEvent, input),
  }
}

function appendEvent(directory, event) {
  if (typeof directory !== 'string' || !path.isAbsolute(directory)) {
    throw new Error('log_directory_unavailable')
  }
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 })
  const directoryStat = fs.lstatSync(directory)
  if (!directoryStat.isDirectory() || directoryStat.isSymbolicLink()
    || (directoryStat.mode & 0o077) !== 0
    || (typeof process.getuid === 'function' && directoryStat.uid !== process.getuid())) {
    throw new Error('unsafe_log_directory')
  }
  const logPath = path.join(directory, LOG_FILE)
  if (fs.lstatSync(logPath, { throwIfNoEntry: false })?.isSymbolicLink()) {
    throw new Error('unsafe_log_path')
  }
  const flags = fs.constants.O_WRONLY | fs.constants.O_APPEND | fs.constants.O_CREAT
    | (fs.constants.O_NOFOLLOW ?? 0)
  const descriptor = fs.openSync(logPath, flags, 0o600)
  try {
    const stat = fs.fstatSync(descriptor)
    if (!stat.isFile() || (stat.mode & 0o077) !== 0
      || (typeof process.getuid === 'function' && stat.uid !== process.getuid())) {
      throw new Error('unsafe_log_path')
    }
    fs.writeSync(descriptor, `${JSON.stringify(event)}\n`)
  } finally {
    fs.closeSync(descriptor)
  }
}

function neutralResponse(nativeEvent) {
  return nativeEvent === 'preToolUse' || nativeEvent === 'subagentStart'
    ? { permission: 'allow' }
    : {}
}

function reportSkipped(error) {
  const code = error instanceof Error && /^[a-z0-9_]+$/.test(error.message)
    ? error.message
    : 'invalid_hook_input'
  process.stderr.write(`Fabric Agent Cursor lifecycle observation skipped (${code}).\n`)
}

function run() {
  const nativeEvent = process.argv[2]
  const respond = () => process.stdout.write(`${JSON.stringify(neutralResponse(nativeEvent))}\n`)
  if (process.env[ENABLE_ENV] !== '1') {
    respond()
    return
  }
  if (!Object.hasOwn(EVENTS, nativeEvent)) {
    reportSkipped(new Error('unsupported_event'))
    respond()
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
      appendEvent(process.env[DATA_ENV], event)
    } catch (error) {
      reportSkipped(error)
    }
    respond()
  })
  process.stdin.resume()
}

if (require.main === module) run()

module.exports = { DATA_ENV, ENABLE_ENV, EVENTS, LOG_FILE, projectLifecycleEvent }
