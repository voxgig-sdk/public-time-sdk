<?php
declare(strict_types=1);

// PublicTime SDK utility: result_headers

class PublicTimeResultHeaders
{
    public static function call(PublicTimeContext $ctx): ?PublicTimeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
