-- PublicTime SDK exists test

local sdk = require("public-time_sdk")

describe("PublicTimeSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
