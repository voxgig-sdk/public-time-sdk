# PublicTime SDK utility: prepare_body
require_relative 'media'
module PublicTimeUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return PublicTimeUtilities.raw_body(ctx.reqdata) if PublicTimeUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
