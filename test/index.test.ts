import assert from 'assert'
import { firstFunc } from '../src'

describe('validate:', () => {
  /**
   * firstFunc
   */
  describe('firstFunc', () => {
    test(' return rollup ', () => {
      assert.strictEqual(firstFunc('rollup'), 'rollup')
    })
  })
})
