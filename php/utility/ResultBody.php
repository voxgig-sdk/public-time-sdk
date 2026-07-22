<?php
declare(strict_types=1);

// PublicTime SDK utility: result_body

class PublicTimeResultBody
{
    public static function call(PublicTimeContext $ctx): ?PublicTimeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
