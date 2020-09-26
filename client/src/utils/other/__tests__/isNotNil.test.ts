import { isNotNil } from '../isNotNil';

describe('isNotNil', () => {
  it('should return `false` for nullish values', () => {
    expect(isNotNil(null)).toBe(false);
    expect(isNotNil()).toBe(false);
    expect(isNotNil(undefined)).toBe(false);
  });

  it('should return `true` for non-nullish values', () => {
    expect(isNotNil([1, 2, 3])).toBe(true);
    expect(isNotNil(true)).toBe(true);
    expect(isNotNil(new Date())).toBe(true);
    expect(isNotNil(new Error())).toBe(true);
    expect(isNotNil({ a: 1 })).toBe(true);
    expect(isNotNil(1)).toBe(true);
    expect(isNotNil(/x/)).toBe(true);
    expect(isNotNil('a')).toBe(true);
  });
});
