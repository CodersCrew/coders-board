/* eslint-disable no-restricted-syntax */

/**
 * Creates an object composed of properties of object that are not omitted.
 * @param obj The source object.
 * @param keys Properties to omit.
 */
export const omit = <T, K extends keyof T>(obj: T, keys: K[]) => {
  const ret = { ...obj };

  for (const key of keys) {
    delete ret[key];
  }

  return ret as Omit<T, K>;
};
