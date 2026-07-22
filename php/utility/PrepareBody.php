<?php
declare(strict_types=1);

// PublicTime SDK utility: prepare_body

class PublicTimePrepareBody
{
    public static function call(PublicTimeContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
