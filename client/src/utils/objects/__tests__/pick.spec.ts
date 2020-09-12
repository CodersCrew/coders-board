import { pick } from '../pick';

describe('pick', () => {
  it('should pick selected properties', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const value = pick(object, ['a', 'd']);

    expect(value).toEqual({ a: 1, d: 4 });
  });
});
