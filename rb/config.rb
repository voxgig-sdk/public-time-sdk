# PublicTime SDK configuration

module PublicTimeConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "PublicTime",
        "slug" => "public-time",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://public-api.siyukatu.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "time" => {},
          "timestamp" => {},
        },
      },
      "entity" => {
        "time" => {
          "fields" => [
            {
              "name" => "time",
              "title" => "Time",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "The current UNIX timestamp in milliseconds",
              "format" => "int64",
            },
          ],
          "name" => "time",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/time.json",
                  "segments" => [
                    {
                      "lit" => "time.json",
                    },
                  ],
                  "parts" => [
                    "time.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/time.txt",
                  "segments" => [
                    {
                      "lit" => "time.txt",
                    },
                  ],
                  "parts" => [
                    "time.txt",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "timestamp" => {
          "fields" => [],
          "name" => "timestamp",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/time/events",
                  "segments" => [
                    {
                      "lit" => "time",
                    },
                    {
                      "lit" => "events",
                    },
                  ],
                  "parts" => [
                    "time",
                    "events",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "interval",
                        "orig" => "interval",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 500,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "interval",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/time/socket",
                  "segments" => [
                    {
                      "lit" => "time",
                    },
                    {
                      "lit" => "socket",
                    },
                  ],
                  "parts" => [
                    "time",
                    "socket",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "interval",
                        "orig" => "interval",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 500,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "interval",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/time.css",
                  "segments" => [
                    {
                      "lit" => "time.css",
                    },
                  ],
                  "parts" => [
                    "time.css",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    PublicTimeFeatures.make_feature(name)
  end
end
