-- Time entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("public-time_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("TimeEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Time(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = time_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "time." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set PUBLIC_TIME_TEST_TIME_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local time_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.time")))
    local time_ref01_data = nil
    if #time_ref01_data_raw > 0 then
      time_ref01_data = helpers.to_map(time_ref01_data_raw[1][2])
    end

    -- LOAD
    local time_ref01_ent = client:Time(nil)
    local time_ref01_match_dt0 = {}
    local time_ref01_data_dt0_loaded, err = time_ref01_ent:load(time_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(time_ref01_data_dt0_loaded)

  end)
end)

function time_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/time/TimeTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read time test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "time01", "time02", "time03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("PUBLIC_TIME_TEST_TIME_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["PUBLIC_TIME_TEST_TIME_ENTID"] = idmap,
    ["PUBLIC_TIME_TEST_LIVE"] = "FALSE",
    ["PUBLIC_TIME_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["PUBLIC_TIME_TEST_TIME_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["PUBLIC_TIME_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["PUBLIC_TIME_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["PUBLIC_TIME_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
