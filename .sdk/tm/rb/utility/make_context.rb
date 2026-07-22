# PublicTime SDK utility: make_context
require_relative '../core/context'
module PublicTimeUtilities
  MakeContext = ->(ctxmap, basectx) {
    PublicTimeContext.new(ctxmap, basectx)
  }
end
