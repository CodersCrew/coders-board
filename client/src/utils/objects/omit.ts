/* eslint-disable no-restricted-syntax */

export const omit = <T, K extends keyof T>(obj: T, keys: K[]) => {
  const ret = { ...obj };

  for (const key of keys) {
    delete ret[key];
  }

  return ret as Omit<T, K>;
};
