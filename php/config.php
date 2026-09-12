<?php
declare(strict_types=1);

// PublicTime SDK configuration

class PublicTimeConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "PublicTime",
                "slug" => "public-time",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://public-api.siyukatu.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "time" => [],
                    "timestamp" => [],
                ],
            ],
            "entity" => [
        'time' => [
          'fields' => [
            [
              'format' => 'int64',
              'name' => 'time',
              'req' => true,
              'short' => 'The current UNIX timestamp in milliseconds',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'time',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/time.json',
                  'segments' => [
                    [
                      'lit' => 'time.json',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'time.json',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/time.txt',
                  'segments' => [
                    [
                      'lit' => 'time.txt',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'time.txt',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'timestamp' => [
          'fields' => [],
          'name' => 'timestamp',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 500,
                        'kind' => 'query',
                        'name' => 'interval',
                        'orig' => 'interval',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/time/events',
                  'segments' => [
                    [
                      'lit' => 'time',
                    ],
                    [
                      'lit' => 'events',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'interval',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'time',
                    'events',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 500,
                        'kind' => 'query',
                        'name' => 'interval',
                        'orig' => 'interval',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/time/socket',
                  'segments' => [
                    [
                      'lit' => 'time',
                    ],
                    [
                      'lit' => 'socket',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'interval',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'time',
                    'socket',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/time.css',
                  'segments' => [
                    [
                      'lit' => 'time.css',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'time.css',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return PublicTimeFeatures::make_feature($name);
    }
}
