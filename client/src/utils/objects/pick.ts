/* eslint-disable no-restricted-syntax */

/**
 * Creates an object composed of the picked object properties.
 * @param obj The source object.
 * @param keys Properties to pick.
 */
export const pick = <T, K extends keyof T>(obj: T, keys: K[]) => {
  const ret = {} as Pick<T, K>;

  for (const key of keys) {
    ret[key] = obj[key];
  }

  return ret;
};
