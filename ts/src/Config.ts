
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'PublicTime',
        slug: "public-time",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://public-api.siyukatu.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      time: {
      },

      timestamp: {
      },

    }
  }


  entity = {
    "time": {
      "fields": [
        {
          "format": "int64",
          "name": "time",
          "req": true,
          "short": "The current UNIX timestamp in milliseconds",
          "type": "`$INTEGER`"
        }
      ],
      "name": "time",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/time.json",
              "segments": [
                {
                  "lit": "time.json"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "time.json"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/time.txt",
              "segments": [
                {
                  "lit": "time.txt"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "time.txt"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "timestamp": {
      "fields": [],
      "name": "timestamp",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 500,
                    "kind": "query",
                    "name": "interval",
                    "orig": "interval",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/time/events",
              "segments": [
                {
                  "lit": "time"
                },
                {
                  "lit": "events"
                }
              ],
              "select": {
                "exist": [
                  "interval"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "time",
                "events"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "example": 500,
                    "kind": "query",
                    "name": "interval",
                    "orig": "interval",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/time/socket",
              "segments": [
                {
                  "lit": "time"
                },
                {
                  "lit": "socket"
                }
              ],
              "select": {
                "exist": [
                  "interval"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "time",
                "socket"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/time.css",
              "segments": [
                {
                  "lit": "time.css"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "time.css"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

