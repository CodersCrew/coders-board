import { keysIn } from '../keysIn';

describe('keysIn', () => {
  it('should return keys of the provided object', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const keys = keysIn(object);

    expect(keys).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should return empty array for empty objects', () => {
    const object = {};
    const keys = keysIn(object);

    expect(keys).toEqual([]);
  });
});
