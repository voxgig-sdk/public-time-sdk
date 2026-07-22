
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PublicTimeSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await PublicTimeSDK.test()
    equal(null !== testsdk, true)
  })

})
