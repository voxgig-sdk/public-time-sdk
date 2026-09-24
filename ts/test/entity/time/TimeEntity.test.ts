

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TimeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PUBLIC_TIME_TEST_LIVE=TRUE.
  afterEach(liveDelay('PUBLIC_TIME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PublicTimeSDK.test()
    const ent = testsdk.Time()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PUBLIC_TIME_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'time.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"time":{"a":true,"fo":"int64","h":"Time","n":"time","r":true,"sh":"The current UNIX timestamp in milliseconds","t":"`$INTEGER`","key$":"time","index$":0}},"name":"time","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /time.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/time.json","q":{},"r":{},"s":[{"lit":"time.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /time.txt","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/time.txt","q":{},"r":{},"s":[{"lit":"time.txt"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"time","name__orig":"time","Name":"Time","name_":"time","name-":"time","NAME":"TIME","index$":0}, {"active":true,"entity":"time","key$":"BasicTimeFlow","kind":"basic","name":"BasicTimeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"time_ref01","srcdatavar":"time_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-time_ref01"}}],"index$":0}]}, 'Time', {"GET /time.json":{"protocol":"http","operationId":"getTimestampJson","responses":{"200":{"description":"Successfully returned current UNIX timestamp in JSON format","content":{"application/json":{"schema":{"type":"object","properties":{"time":{"description":"The current UNIX timestamp in milliseconds","example":1234567890123,"format":"int64","key$":"time","type":"integer"}},"required":["time"],"index$":0},"example":{"time":1234567890123}}}}},"parameters":[],"securitySource":"unspecified"},"GET /time.txt":{"protocol":"http","operationId":"getTimestampText","responses":{"200":{"description":"Successfully returned current UNIX timestamp in text format","content":{"text/vnd.sykt-api":{"schema":{"type":"string","example":"1234567890123"},"example":"1234567890123"}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let time_ref01_data = Object.values(setup.data.existing.time)[0] as any

    // LOAD
    const time_ref01_ent = client.Time()
    const time_ref01_match_dt0: any = {}
    const time_ref01_data_dt0 = (await time_ref01_ent.load(time_ref01_match_dt0)).data()
    assert(null != time_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/time/TimeTestData.json')

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
    ['time01','time02','time03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PUBLIC_TIME_TEST_TIME_ENTID': idmap,
    'PUBLIC_TIME_TEST_LIVE': 'FALSE',
    'PUBLIC_TIME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PUBLIC_TIME_TEST_TIME_ENTID']

  const live = 'TRUE' === env.PUBLIC_TIME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PUBLIC_TIME_TEST_TIME_ENTID']
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
  
