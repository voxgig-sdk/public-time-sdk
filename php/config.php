<?php
declare(strict_types=1);

// PublicTime SDK configuration

class PublicTimeConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "PublicTime",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'active' => true,
              'name' => 'time',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 0,
            ],
          ],
          'name' => 'time',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/time.json',
                  'parts' => [
                    'time.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/time.txt',
                  'parts' => [
                    'time.txt',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'load',
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
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 500,
                        'kind' => 'query',
                        'name' => 'interval',
                        'orig' => 'interval',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/time/events',
                  'parts' => [
                    'time',
                    'events',
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
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 500,
                        'kind' => 'query',
                        'name' => 'interval',
                        'orig' => 'interval',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/time/socket',
                  'parts' => [
                    'time',
                    'socket',
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
                  'index$' => 1,
                ],
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/time.css',
                  'parts' => [
                    'time.css',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 2,
                ],
              ],
              'key$' => 'load',
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
