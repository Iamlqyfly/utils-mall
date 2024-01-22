import assert from 'assert'
import { firstFunc } from '../src'
import { add } from '../src/add'

describe('validate:', () => {
  /**
   * firstFunc
   */
  describe('firstFunc', () => {
    test(' return rollup ', () => {
      assert.strictEqual(firstFunc('rollup'), 'rollup')
    })
  }),

  describe('add', () => {
    test(' return 2 ', () => {
      assert.strictEqual(add(), 2)
    })
  })
})
