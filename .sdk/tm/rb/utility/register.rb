# PublicTime SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PublicTimeUtility.registrar = ->(u) {
  u.clean = PublicTimeUtilities::Clean
  u.done = PublicTimeUtilities::Done
  u.make_error = PublicTimeUtilities::MakeError
  u.feature_add = PublicTimeUtilities::FeatureAdd
  u.feature_hook = PublicTimeUtilities::FeatureHook
  u.feature_init = PublicTimeUtilities::FeatureInit
  u.fetcher = PublicTimeUtilities::Fetcher
  u.make_fetch_def = PublicTimeUtilities::MakeFetchDef
  u.make_context = PublicTimeUtilities::MakeContext
  u.make_options = PublicTimeUtilities::MakeOptions
  u.make_request = PublicTimeUtilities::MakeRequest
  u.make_response = PublicTimeUtilities::MakeResponse
  u.make_result = PublicTimeUtilities::MakeResult
  u.make_point = PublicTimeUtilities::MakePoint
  u.make_spec = PublicTimeUtilities::MakeSpec
  u.make_url = PublicTimeUtilities::MakeUrl
  u.param = PublicTimeUtilities::Param
  u.prepare_auth = PublicTimeUtilities::PrepareAuth
  u.prepare_body = PublicTimeUtilities::PrepareBody
  u.prepare_headers = PublicTimeUtilities::PrepareHeaders
  u.prepare_method = PublicTimeUtilities::PrepareMethod
  u.prepare_params = PublicTimeUtilities::PrepareParams
  u.prepare_path = PublicTimeUtilities::PreparePath
  u.prepare_query = PublicTimeUtilities::PrepareQuery
  u.result_basic = PublicTimeUtilities::ResultBasic
  u.result_body = PublicTimeUtilities::ResultBody
  u.result_headers = PublicTimeUtilities::ResultHeaders
  u.transform_request = PublicTimeUtilities::TransformRequest
  u.transform_response = PublicTimeUtilities::TransformResponse
}
