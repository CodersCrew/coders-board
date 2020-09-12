import { groupBy } from '../groupBy';

describe('groupBy', () => {
  it('should transform keys by `iteratee`', () => {
    const value = groupBy([6.1, 4.2, 6.3], Math.floor);

    expect(value).toEqual({ '4': [4.2], '6': [6.1, 6.3] });
  });

  it('should work with `_.property` shorthands', () => {
    const value = groupBy(['one', 'two', 'three'], 'length');

    expect(value).toEqual({ '3': ['one', 'two'], '5': ['three'] });
  });
});
