/* eslint-disable no-restricted-syntax */

export const pick = <T, K extends keyof T>(obj: T, keys: K[]) => {
  const ret = {} as Pick<T, K>;

  for (const key of keys) {
    ret[key] = obj[key];
  }

  return ret;
};
