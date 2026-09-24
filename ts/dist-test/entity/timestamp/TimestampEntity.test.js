"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TimestampEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PUBLIC_TIME_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PUBLIC_TIME_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PublicTimeSDK.test();
        const ent = testsdk.Timestamp();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PUBLIC_TIME_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'timestamp.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "timestamp", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /time/events", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 500, "k": "query", "n": "interval", "or": "interval", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/time/events", "q": { "exist": ["interval"] }, "r": {}, "s": [{ "lit": "time" }, { "lit": "events" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /time/socket", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 500, "k": "query", "n": "interval", "or": "interval", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/time/socket", "q": { "exist": ["interval"] }, "r": {}, "s": [{ "lit": "time" }, { "lit": "socket" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /time.css", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/time.css", "q": {}, "r": {}, "s": [{ "lit": "time.css" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "timestamp", "name__orig": "timestamp", "Name": "Timestamp", "name_": "timestamp", "name-": "timestamp", "NAME": "TIMESTAMP", "index$": 1 }, { "active": true, "entity": "timestamp", "key$": "BasicTimestampFlow", "kind": "basic", "name": "BasicTimestampFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "timestamp_ref01", "srcdatavar": "timestamp_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-timestamp_ref01" } }], "index$": 0 }] }, 'Timestamp', { "GET /time/events": { "protocol": "http", "operationId": "getTimestampEvents", "responses": { "200": { "description": "Server-Sent Events stream of timestamps", "content": { "text/event-stream": { "schema": { "type": "string", "description": "SSE event stream with event: time and data: <timestamp>", "example": "event: time\ndata: 1234567890123\n\nevent: time\ndata: 1234567890500\n\n" } } } } }, "parameters": [{ "name": "interval", "in": "query", "description": "Specifies the transmission frequency in milliseconds. Valid values: 50, 100, 200, 250, 500, 1000, 2000, 5000. Defaults to 500 if omitted.", "required": false, "schema": { "type": "integer", "enum": [50, 100, 200, 250, 500, 1000, 2000, 5000], "default": 500 }, "index$": 0 }], "securitySource": "unspecified" }, "GET /time/socket": { "protocol": "http", "operationId": "getTimestampWebSocket", "responses": { "101": { "description": "WebSocket connection established. Sends initial connected message, followed by periodic time updates.", "content": { "application/json": { "schema": { "oneOf": [{ "type": "object", "properties": { "type": { "type": "string", "enum": ["connected"], "description": "Initial connection message" } }, "required": ["type"] }, { "type": "object", "properties": { "type": { "type": "string", "enum": ["time"], "description": "Periodic timestamp message" }, "time": { "type": "integer", "format": "int64", "description": "The current UNIX timestamp in milliseconds" } }, "required": ["type", "time"] }, { "type": "object", "properties": { "type": { "type": "string", "enum": ["pong"], "description": "Response to ping message" }, "reply_to": { "oneOf": [{ "type": "integer" }, { "type": "string" }], "description": "The id from the ping request (omitted if no id was sent)" }, "time": { "type": "integer", "format": "int64", "description": "The current UNIX timestamp in milliseconds" } }, "required": ["type", "time"] }] }, "examples": { "connected": { "value": { "type": "connected" } }, "time": { "value": { "type": "time", "time": 1234567890123 } }, "pong": { "value": { "type": "pong", "reply_to": 123, "time": 1234567890123 } } } } } } }, "parameters": [{ "name": "interval", "in": "query", "description": "Specifies the transmission frequency in milliseconds. Valid values: 50, 100, 200, 250, 500, 1000, 2000, 5000. Defaults to 500 if omitted.", "required": false, "schema": { "type": "integer", "enum": [50, 100, 200, 250, 500, 1000, 2000, 5000], "default": 500 }, "index$": 0 }], "securitySource": "unspecified" }, "GET /time.css": { "protocol": "http", "operationId": "getTimestampCss", "responses": { "200": { "description": "Successfully returned current timestamp as CSS custom property", "content": { "text/css": { "schema": { "type": "string", "example": ":root { --timestamp: 1234567890123 }" }, "example": ":root { --timestamp: 1234567890123 }" } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let timestamp_ref01_data = Object.values(setup.data.existing.timestamp)[0];
        // LOAD
        const timestamp_ref01_ent = client.Timestamp();
        const timestamp_ref01_match_dt0 = {};
        const timestamp_ref01_data_dt0 = (await timestamp_ref01_ent.load(timestamp_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != timestamp_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/timestamp/TimestampTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PublicTimeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['timestamp01', 'timestamp02', 'timestamp03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PUBLIC_TIME_TEST_TIMESTAMP_ENTID': idmap,
        'PUBLIC_TIME_TEST_LIVE': 'FALSE',
        'PUBLIC_TIME_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PUBLIC_TIME_TEST_TIMESTAMP_ENTID'];
    const live = 'TRUE' === env.PUBLIC_TIME_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PUBLIC_TIME_TEST_TIMESTAMP_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PublicTimeSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=TimestampEntity.test.js.map