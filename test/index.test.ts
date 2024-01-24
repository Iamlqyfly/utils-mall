import assert from 'assert';
import { firstFunc, sayHello } from '../src';

describe('validate:', () => {
  /**
   * firstFunc
   */
  describe('firstFunc', () => {
    test(' return rollup ', () => {
      assert.strictEqual(firstFunc('rollup'), 'rollup');
    });
  }),
    describe('sayHello', () => {
      test('return hello rollup', () => {
        assert.strictEqual(sayHello('rollup'), 'hello rollup');
      });
    });
});
