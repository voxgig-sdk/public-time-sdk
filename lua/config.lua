-- PublicTime SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "PublicTime",
      slug = "public-time",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://public-api.siyukatu.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["time"] = {},
        ["timestamp"] = {},
      },
    },
    entity = {
      ["time"] = {
        ["fields"] = {
          {
            ["name"] = "time",
            ["title"] = "Time",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "The current UNIX timestamp in milliseconds",
            ["format"] = "int64",
          },
        },
        ["name"] = "time",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/time.json",
                ["segments"] = {
                  {
                    ["lit"] = "time.json",
                  },
                },
                ["parts"] = {
                  "time.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/time.txt",
                ["segments"] = {
                  {
                    ["lit"] = "time.txt",
                  },
                },
                ["parts"] = {
                  "time.txt",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["timestamp"] = {
        ["fields"] = {},
        ["name"] = "timestamp",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/time/events",
                ["segments"] = {
                  {
                    ["lit"] = "time",
                  },
                  {
                    ["lit"] = "events",
                  },
                },
                ["parts"] = {
                  "time",
                  "events",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "interval",
                      ["orig"] = "interval",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 500,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "interval",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/time/socket",
                ["segments"] = {
                  {
                    ["lit"] = "time",
                  },
                  {
                    ["lit"] = "socket",
                  },
                },
                ["parts"] = {
                  "time",
                  "socket",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "interval",
                      ["orig"] = "interval",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 500,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "interval",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/time.css",
                ["segments"] = {
                  {
                    ["lit"] = "time.css",
                  },
                },
                ["parts"] = {
                  "time.css",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
