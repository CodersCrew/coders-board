/* eslint-disable lodash/prefer-lodash-method */

import { isFunction } from 'lodash-es';

/**
 * Creates an object composed of keys generated from the results of running each element of array through iteratee.
 * @param arr The array to iterate over.
 * @param fn The iteratee to transform keys.
 */
export const groupBy = <T, K extends string>(arr: T[], fn: (item: T) => K) =>
  arr.map(isFunction(fn) ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {} as Record<K, T[]>);
