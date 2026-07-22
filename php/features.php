<?php
declare(strict_types=1);

// PublicTime SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PublicTimeFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PublicTimeBaseFeature();
            case "test":
                return new PublicTimeTestFeature();
            default:
                return new PublicTimeBaseFeature();
        }
    }
}
