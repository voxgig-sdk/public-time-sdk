# PublicTime SDK feature factory

from publictime_sdk.feature.base_feature import PublicTimeBaseFeature
from publictime_sdk.feature.test_feature import PublicTimeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PublicTimeBaseFeature(),
        "test": lambda: PublicTimeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
