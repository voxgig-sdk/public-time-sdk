
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PublicTimeSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PublicTimeSDK.test()
    equal(testsdk instanceof PublicTimeSDK, true,
      'PublicTimeSDK.test() must return a client synchronously')
  })

})
