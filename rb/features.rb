# PublicTime SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PublicTimeFeatures
  def self.make_feature(name)
    case name
    when "base"
      PublicTimeBaseFeature.new
    when "ratelimit"
      PublicTimeRatelimitFeature.new
    when "retry"
      PublicTimeRetryFeature.new
    when "test"
      PublicTimeTestFeature.new
    when "timeout"
      PublicTimeTimeoutFeature.new
    else
      PublicTimeBaseFeature.new
    end
  end
end
