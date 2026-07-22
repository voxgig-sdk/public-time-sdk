<?php
declare(strict_types=1);

// PublicTime SDK base feature

class PublicTimeBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(PublicTimeContext $ctx, array $options): void {}
    public function PostConstruct(PublicTimeContext $ctx): void {}
    public function PostConstructEntity(PublicTimeContext $ctx): void {}
    public function SetData(PublicTimeContext $ctx): void {}
    public function GetData(PublicTimeContext $ctx): void {}
    public function GetMatch(PublicTimeContext $ctx): void {}
    public function SetMatch(PublicTimeContext $ctx): void {}
    public function PrePoint(PublicTimeContext $ctx): void {}
    public function PreSpec(PublicTimeContext $ctx): void {}
    public function PreRequest(PublicTimeContext $ctx): void {}
    public function PreResponse(PublicTimeContext $ctx): void {}
    public function PreResult(PublicTimeContext $ctx): void {}
    public function PreDone(PublicTimeContext $ctx): void {}
    public function PreUnexpected(PublicTimeContext $ctx): void {}
}
