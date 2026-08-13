# frozen_string_literal: true

# Typed models for the PublicTime SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Time entity data model.
#
# @!attribute [rw] time
#   @return [Integer]
TimeType = Struct.new(
  :time,
  keyword_init: true
)

# Request payload for Time#load.
#
# @!attribute [rw] time
#   @return [Integer, nil]
TimeLoadMatch = Struct.new(
  :time,
  keyword_init: true
)

# Timestamp entity data model.
class Timestamp
end

# Request payload for Timestamp#load.
class TimestampLoadMatch
end

