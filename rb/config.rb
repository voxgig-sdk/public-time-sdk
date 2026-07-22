# PublicTime SDK configuration

module PublicTimeConfig
  def self.make_config
    {
      "main" => {
        "name" => "PublicTime",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "active" => true,
              "name" => "time",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
          ],
          "name" => "time",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/time.json",
                  "parts" => [
                    "time.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/time.txt",
                  "parts" => [
                    "time.txt",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "load",
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
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => 500,
                        "kind" => "query",
                        "name" => "interval",
                        "orig" => "interval",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/time/events",
                  "parts" => [
                    "time",
                    "events",
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
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => 500,
                        "kind" => "query",
                        "name" => "interval",
                        "orig" => "interval",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/time/socket",
                  "parts" => [
                    "time",
                    "socket",
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
                  "index$" => 1,
                },
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/time.css",
                  "parts" => [
                    "time.css",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 2,
                },
              ],
              "key$" => "load",
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
