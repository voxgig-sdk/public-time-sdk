package voxgigpublictimesdk

import (
	"github.com/voxgig-sdk/public-time-sdk/go/core"
	"github.com/voxgig-sdk/public-time-sdk/go/entity"
	"github.com/voxgig-sdk/public-time-sdk/go/feature"
	_ "github.com/voxgig-sdk/public-time-sdk/go/utility"
)

// Type aliases preserve external API.
type PublicTimeSDK = core.PublicTimeSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PublicTimeEntity = core.PublicTimeEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PublicTimeError = core.PublicTimeError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewTimeEntityFunc = func(client *core.PublicTimeSDK, entopts map[string]any) core.PublicTimeEntity {
		return entity.NewTimeEntity(client, entopts)
	}
	core.NewTimestampEntityFunc = func(client *core.PublicTimeSDK, entopts map[string]any) core.PublicTimeEntity {
		return entity.NewTimestampEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPublicTimeSDK = core.NewPublicTimeSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewPublicTimeSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *PublicTimeSDK  { return NewPublicTimeSDK(nil) }
func Test() *PublicTimeSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
