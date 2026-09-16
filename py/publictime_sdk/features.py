# PublicTime SDK feature factory

from publictime_sdk.feature.base_feature import PublicTimeBaseFeature
from publictime_sdk.feature.ratelimit_feature import PublicTimeRatelimitFeature
from publictime_sdk.feature.retry_feature import PublicTimeRetryFeature
from publictime_sdk.feature.test_feature import PublicTimeTestFeature
from publictime_sdk.feature.timeout_feature import PublicTimeTimeoutFeature


_FEATURES = {
    "base": lambda: PublicTimeBaseFeature(),
    "ratelimit": lambda: PublicTimeRatelimitFeature(),
    "retry": lambda: PublicTimeRetryFeature(),
    "test": lambda: PublicTimeTestFeature(),
    "timeout": lambda: PublicTimeTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
