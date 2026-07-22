# ProjectName SDK exists test

import pytest
from publictime_sdk import PublicTimeSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PublicTimeSDK.test(None, None)
        assert testsdk is not None
