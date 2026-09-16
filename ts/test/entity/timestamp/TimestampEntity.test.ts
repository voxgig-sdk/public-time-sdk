

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PublicTimeSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('TimestampEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PUBLIC_TIME_TEST_LIVE=TRUE.
  afterEach(liveDelay('PUBLIC_TIME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PublicTimeSDK.test()
    const ent = testsdk.Timestamp()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PUBLIC_TIME_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'timestamp.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"timestamp","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":500,"kind":"query","name":"interval","orig":"interval","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /time/events","json":"{\"operationId\":\"getTimestampEvents\",\"parameters\":[{\"description\":\"Specifies the transmission frequency in milliseconds. Valid values: 50, 100, 200, 250, 500, 1000, 2000, 5000. Defaults to 500 if omitted.\",\"in\":\"query\",\"name\":\"interval\",\"required\":false,\"schema\":{\"default\":500,\"enum\":[50,100,200,250,500,1000,2000,5000],\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/event-stream\":{\"schema\":{\"description\":\"SSE event stream with event: time and data: <timestamp>\",\"example\":\"event: time\\ndata: 1234567890123\\n\\nevent: time\\ndata: 1234567890500\\n\\n\",\"type\":\"string\"}}},\"description\":\"Server-Sent Events stream of timestamps\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/time/events","segments":[{"lit":"time"},{"lit":"events"}],"select":{"exist":["interval"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":500,"kind":"query","name":"interval","orig":"interval","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /time/socket","json":"{\"operationId\":\"getTimestampWebSocket\",\"parameters\":[{\"description\":\"Specifies the transmission frequency in milliseconds. Valid values: 50, 100, 200, 250, 500, 1000, 2000, 5000. Defaults to 500 if omitted.\",\"in\":\"query\",\"name\":\"interval\",\"required\":false,\"schema\":{\"default\":500,\"enum\":[50,100,200,250,500,1000,2000,5000],\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"101\":{\"content\":{\"application/json\":{\"examples\":{\"connected\":{\"value\":{\"type\":\"connected\"}},\"pong\":{\"value\":{\"reply_to\":123,\"time\":1234567890123,\"type\":\"pong\"}},\"time\":{\"value\":{\"time\":1234567890123,\"type\":\"time\"}}},\"schema\":{\"oneOf\":[{\"properties\":{\"type\":{\"description\":\"Initial connection message\",\"enum\":[\"connected\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},{\"properties\":{\"time\":{\"description\":\"The current UNIX timestamp in milliseconds\",\"format\":\"int64\",\"type\":\"integer\"},\"type\":{\"description\":\"Periodic timestamp message\",\"enum\":[\"time\"],\"type\":\"string\"}},\"required\":[\"type\",\"time\"],\"type\":\"object\"},{\"properties\":{\"reply_to\":{\"description\":\"The id from the ping request (omitted if no id was sent)\",\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]},\"time\":{\"description\":\"The current UNIX timestamp in milliseconds\",\"format\":\"int64\",\"type\":\"integer\"},\"type\":{\"description\":\"Response to ping message\",\"enum\":[\"pong\"],\"type\":\"string\"}},\"required\":[\"type\",\"time\"],\"type\":\"object\"}]}}},\"description\":\"WebSocket connection established. Sends initial connected message, followed by periodic time updates.\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/time/socket","segments":[{"lit":"time"},{"lit":"socket"}],"select":{"exist":["interval"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{},"contract":{"id":"GET /time.css","json":"{\"operationId\":\"getTimestampCss\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/css\":{\"example\":\":root { --timestamp: 1234567890123 }\",\"schema\":{\"example\":\":root { --timestamp: 1234567890123 }\",\"type\":\"string\"}}},\"description\":\"Successfully returned current timestamp as CSS custom property\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/time.css","segments":[{"lit":"time.css"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"timestamp","name__orig":"timestamp","Name":"Timestamp","name_":"timestamp","name-":"timestamp","NAME":"TIMESTAMP","index$":1}, {"active":true,"entity":"timestamp","key$":"BasicTimestampFlow","kind":"basic","name":"BasicTimestampFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"timestamp_ref01","srcdatavar":"timestamp_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-timestamp_ref01"}}],"index$":0}]}, 'Timestamp')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let timestamp_ref01_data = Object.values(setup.data.existing.timestamp)[0] as any

    // LOAD
    const timestamp_ref01_ent = client.Timestamp()
    const timestamp_ref01_match_dt0: any = {}
    const timestamp_ref01_data_dt0 = (await timestamp_ref01_ent.load(timestamp_ref01_match_dt0)).data()
    assert(null != timestamp_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/timestamp/TimestampTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PublicTimeSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['timestamp01','timestamp02','timestamp03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PUBLIC_TIME_TEST_TIMESTAMP_ENTID': idmap,
    'PUBLIC_TIME_TEST_LIVE': 'FALSE',
    'PUBLIC_TIME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PUBLIC_TIME_TEST_TIMESTAMP_ENTID']

  const live = 'TRUE' === env.PUBLIC_TIME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PUBLIC_TIME_TEST_TIMESTAMP_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PublicTimeSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.PUBLIC_TIME_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
