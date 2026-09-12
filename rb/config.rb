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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "format" => "int64",
              "name" => "time",
              "req" => true,
              "short" => "The current UNIX timestamp in milliseconds",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "time",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/time.json",
                  "segments" => [
                    {
                      "lit" => "time.json",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "time.json",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/time.txt",
                  "segments" => [
                    {
                      "lit" => "time.txt",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "time.txt",
                  ],
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
                  "args" => {
                    "query" => [
                      {
                        "example" => 500,
                        "kind" => "query",
                        "name" => "interval",
                        "orig" => "interval",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
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
                  "select" => {
                    "exist" => [
                      "interval",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "time",
                    "events",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 500,
                        "kind" => "query",
                        "name" => "interval",
                        "orig" => "interval",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
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
                  "select" => {
                    "exist" => [
                      "interval",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "time",
                    "socket",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/time.css",
                  "segments" => [
                    {
                      "lit" => "time.css",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "time.css",
                  ],
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
