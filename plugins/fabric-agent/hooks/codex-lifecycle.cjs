#!/usr/bin/env node

'use strict'

const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')

const CONTRACT_VERSION = '1.0.0-draft.1'
const ADAPTER_VERSION = '0.1.1-compaction-trigger-fidelity'
const LOG_FILE = 'fabric-agent-events-v1.jsonl'
const MAX_INPUT_BYTES = 64 * 1024
const ENABLE_ENV = 'FABRIC_AGENT_LIFECYCLE_LOG'

const PROJECTIONS = Object.freeze({
  SessionStart: { eventType: 'session.started', capability: 'advise', payload: () => ({}) },
  PreCompact: {
    eventType: 'context.loss_imminent',
    capability: 'advise',
    payload: (input) => ({ reason_code: 'native_compaction', trigger: input.trigger }),
  },
  PostCompact: {
    eventType: 'context.restored',
    capability: 'advise',
    payload: (input) => ({ reason_code: 'native_compaction', trigger: input.trigger }),
  },
  SessionEnd: {
    eventType: 'session.ended',
    capability: 'observe',
    payload: () => ({ reason_code: 'host_session_end' }),
  },
})

const NATIVE_FIELDS = Object.freeze({
  SessionStart: { field: 'source', allowed: ['startup', 'resume', 'clear'] },
  PreCompact: { field: 'trigger', allowed: ['manual', 'auto'] },
  PostCompact: { field: 'trigger', allowed: ['manual', 'auto'] },
  SessionEnd: { field: 'reason', allowed: ['other'] },
})

function stableId(value, label) {
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(value)) {
    throw new Error(`invalid_${label}`)
  }
  return value
}

function projectLifecycleEvent(nativeEvent, input, observedAt = new Date()) {
  const projection = PROJECTIONS[nativeEvent]
  if (!projection || input?.hook_event_name !== nativeEvent) throw new Error('unsupported_hook_event')
  const nativeField = NATIVE_FIELDS[nativeEvent]
  if (!nativeField.allowed.includes(input[nativeField.field])) throw new Error('invalid_native_metadata')

  const context = { session_id: stableId(input.session_id, 'session_id') }
  if (input.turn_id !== undefined) context.turn_id = stableId(input.turn_id, 'turn_id')

  const timestamp = observedAt.toISOString()

  return {
    schema: 'prod_fabric.fabric_agent.agent-event',
    schema_version: 1,
    contract_version: CONTRACT_VERSION,
    event_id: `fabric-agent:${crypto.randomUUID()}`,
    event_type: projection.eventType,
    occurred_at: timestamp,
    observed_at: timestamp,
    source: {
      harness: 'codex',
      harness_version: 'codex-hooks',
      adapter_id: 'fabric-codex',
      adapter_version: ADAPTER_VERSION,
      native_event: nativeEvent,
      transport: 'plugin_hook',
      observation: 'exact',
    },
    context,
    authority: { mode: 'individual', policy_refs: [] },
    capability: { mode: projection.capability },
    degradation: { status: 'full', reason_code: null, missing_fields: [] },
    payload: projection.payload(input),
  }
}

function appendEvent(pluginData, event) {
  if (typeof pluginData !== 'string' || !path.isAbsolute(pluginData)) {
    throw new Error('plugin_data_unavailable')
  }
  fs.mkdirSync(pluginData, { recursive: true, mode: 0o700 })
  const logPath = path.join(pluginData, LOG_FILE)
  fs.appendFileSync(logPath, `${JSON.stringify(event)}\n`, { encoding: 'utf8', mode: 0o600 })
  fs.chmodSync(logPath, 0o600)
}

function reportSkipped(code) {
  process.stderr.write(`Fabric Agent lifecycle observation skipped (${code}).\n`)
}

function run() {
  if (process.env[ENABLE_ENV] !== '1') return

  const nativeEvent = process.argv[2]
  if (!Object.hasOwn(PROJECTIONS, nativeEvent)) {
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
      appendEvent(process.env.PLUGIN_DATA, event)
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

module.exports = { ENABLE_ENV, LOG_FILE, PROJECTIONS, projectLifecycleEvent }
