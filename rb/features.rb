# PublicTime SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PublicTimeFeatures
  def self.make_feature(name)
    case name
    when "base"
      PublicTimeBaseFeature.new
    when "test"
      PublicTimeTestFeature.new
    else
      PublicTimeBaseFeature.new
    end
  end
end
