# PublicTime SDK feature factory

from feature.base_feature import PublicTimeBaseFeature
from feature.test_feature import PublicTimeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PublicTimeBaseFeature(),
        "test": lambda: PublicTimeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
