# PublicTime SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "PublicTime",
            "slug": "public-time",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://public-api.siyukatu.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "time": {},
                "timestamp": {},
            },
        },
        "entity": {
      "time": {
        "fields": [
          {
            "format": "int64",
            "name": "time",
            "req": True,
            "short": "The current UNIX timestamp in milliseconds",
            "type": "`$INTEGER`",
          },
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
                    "lit": "time.json",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "time.json",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/time.txt",
                "segments": [
                  {
                    "lit": "time.txt",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "time.txt",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/time/events",
                "segments": [
                  {
                    "lit": "time",
                  },
                  {
                    "lit": "events",
                  },
                ],
                "select": {
                  "exist": [
                    "interval",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "time",
                  "events",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "example": 500,
                      "kind": "query",
                      "name": "interval",
                      "orig": "interval",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/time/socket",
                "segments": [
                  {
                    "lit": "time",
                  },
                  {
                    "lit": "socket",
                  },
                ],
                "select": {
                  "exist": [
                    "interval",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "time",
                  "socket",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/time.css",
                "segments": [
                  {
                    "lit": "time.css",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "time.css",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
