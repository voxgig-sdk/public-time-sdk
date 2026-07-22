<?php
declare(strict_types=1);

// PublicTime SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PublicTimeMakeContext
{
    public static function call(array $ctxmap, ?PublicTimeContext $basectx): PublicTimeContext
    {
        return new PublicTimeContext($ctxmap, $basectx);
    }
}
