-- PublicTime SDK error

local PublicTimeError = {}
PublicTimeError.__index = PublicTimeError


function PublicTimeError.new(code, msg, ctx)
  local self = setmetatable({}, PublicTimeError)
  self.is_sdk_error = true
  self.sdk = "PublicTime"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PublicTimeError:error()
  return self.msg
end


function PublicTimeError:__tostring()
  return self.msg
end


return PublicTimeError
