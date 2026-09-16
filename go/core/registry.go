package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewTimeEntityFunc func(client *PublicTimeSDK, entopts map[string]any) PublicTimeEntity

var NewTimestampEntityFunc func(client *PublicTimeSDK, entopts map[string]any) PublicTimeEntity

