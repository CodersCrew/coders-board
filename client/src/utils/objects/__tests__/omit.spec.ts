import { omit } from '../omit';

describe('omit', () => {
  it('should omit selected properties', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const value = omit(object, ['a', 'd']);

    expect(value).toEqual({ b: 2, c: 3 });
  });
});
