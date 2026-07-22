<?php
declare(strict_types=1);

// PublicTime SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

PublicTimeUtility::setRegistrar(function (PublicTimeUtility $u): void {
    $u->clean = [PublicTimeClean::class, 'call'];
    $u->done = [PublicTimeDone::class, 'call'];
    $u->make_error = [PublicTimeMakeError::class, 'call'];
    $u->feature_add = [PublicTimeFeatureAdd::class, 'call'];
    $u->feature_hook = [PublicTimeFeatureHook::class, 'call'];
    $u->feature_init = [PublicTimeFeatureInit::class, 'call'];
    $u->fetcher = [PublicTimeFetcher::class, 'call'];
    $u->make_fetch_def = [PublicTimeMakeFetchDef::class, 'call'];
    $u->make_context = [PublicTimeMakeContext::class, 'call'];
    $u->make_options = [PublicTimeMakeOptions::class, 'call'];
    $u->make_request = [PublicTimeMakeRequest::class, 'call'];
    $u->make_response = [PublicTimeMakeResponse::class, 'call'];
    $u->make_result = [PublicTimeMakeResult::class, 'call'];
    $u->make_point = [PublicTimeMakePoint::class, 'call'];
    $u->make_spec = [PublicTimeMakeSpec::class, 'call'];
    $u->make_url = [PublicTimeMakeUrl::class, 'call'];
    $u->param = [PublicTimeParam::class, 'call'];
    $u->prepare_auth = [PublicTimePrepareAuth::class, 'call'];
    $u->prepare_body = [PublicTimePrepareBody::class, 'call'];
    $u->prepare_headers = [PublicTimePrepareHeaders::class, 'call'];
    $u->prepare_method = [PublicTimePrepareMethod::class, 'call'];
    $u->prepare_params = [PublicTimePrepareParams::class, 'call'];
    $u->prepare_path = [PublicTimePreparePath::class, 'call'];
    $u->prepare_query = [PublicTimePrepareQuery::class, 'call'];
    $u->result_basic = [PublicTimeResultBasic::class, 'call'];
    $u->result_body = [PublicTimeResultBody::class, 'call'];
    $u->result_headers = [PublicTimeResultHeaders::class, 'call'];
    $u->transform_request = [PublicTimeTransformRequest::class, 'call'];
    $u->transform_response = [PublicTimeTransformResponse::class, 'call'];
});
