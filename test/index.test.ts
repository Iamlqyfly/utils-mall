import assert from 'assert';
import { sleep, timestamp } from '../src'

describe('timestamp', () => {
    it('returns a number', () => {
      expect(typeof timestamp()).toBe('number');
    });
  
    it('returns a value close to the current timestamp', () => {
      const now = Date.now();
      const result = timestamp();
      expect(result).toBeGreaterThanOrEqual(now - 100); // Allow for a 100ms difference
      expect(result).toBeLessThanOrEqual(now + 100); // Allow for a 100ms difference
    });
  });