export const groupBy = <T, K extends string>(arr: T[], fn: (item: T) => K) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {} as Record<K, T[]>);
